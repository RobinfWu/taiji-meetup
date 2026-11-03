// Integration regression: execute the production booking handler and its real SQL
// against an isolated in-memory SQLite database. No production/local D1 mutation.
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { webcrypto } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');

if (!globalThis.crypto) globalThis.crypto = webcrypto;
const root = resolve(import.meta.dirname, '..');
const output = join(root, '.test-waiver-dist');
const sources = ['functions/api/public/book.ts', 'functions/lib/emailVerification.ts', 'functions/lib/validation.ts', 'functions/types/env.ts'];
mkdirSync(output, { recursive: true });
try {
  for (const source of sources) {
    const dest = join(output, source.replace(/\.ts$/, '.mjs'));
    mkdirSync(dirname(dest), { recursive: true });
    const js = ts.transpileModule(readFileSync(join(root, source), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
    }).outputText.replace(/(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g, (_, a, path, b) => `${a}${path}.mjs${b}`);
    writeFileSync(dest, js);
  }
  const { onRequestPost } = await import(pathToFileURL(join(output, 'functions/api/public/book.mjs')).href);
  const { hash } = await import(pathToFileURL(join(output, 'functions/lib/emailVerification.mjs')).href);
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const file of ['0001_initial_schema.sql','0002_reservations.sql','0003_membership_overlap_guards.sql','0004_payments.sql','0005_email_verification.sql','0006_booking_emails.sql','0007_admin_rate_limits.sql','0008_student_waivers.sql']) {
    sqlite.exec(readFileSync(join(root, 'migrations', file), 'utf8'));
  }
  const now = new Date();
  const later = new Date(now.getTime() + 7 * 86400000).toISOString();
  const end = new Date(now.getTime() + 7 * 86400000 + 5400000).toISOString();
  sqlite.prepare("INSERT INTO class_templates (id,title,weekday,start_time,end_time,location,capacity) VALUES ('tpl-test','Test class',6,'10:30','12:00','Test venue',10)").run();
  for (const id of ['sess-one','sess-two','sess-three']) sqlite.prepare("INSERT INTO class_sessions(id,template_id,start_at,end_at,location,capacity) VALUES (?,'tpl-test',?,?,'Test venue',10)").run(id,later,end);
  sqlite.prepare("INSERT INTO waiver_versions(version,title,body,created_at) VALUES ('v-current','Test','Current test waiver',?)").run(now.toISOString());
  sqlite.prepare("INSERT INTO waiver_versions(version,title,body,created_at) VALUES ('v-old','Test','Old test waiver',?)").run(now.toISOString());
  const db = {
    prepare(sql) { return { bind(...args) { const statement = sqlite.prepare(sql); return {
      async first() { return statement.get(...args) ?? null; },
      async run() { const result = statement.run(...args); return {meta:{changes:Number(result.changes)}}; }
    }; } }; },
    async batch(statements) {
      sqlite.exec('BEGIN IMMEDIATE');
      try {
        const results=[];
        for (const statement of statements) results.push(await statement.run());
        sqlite.exec('COMMIT'); return results;
      } catch (e) { sqlite.exec('ROLLBACK'); throw e; }
    }
  };
  const email = 'waiver-regression@example.com';
  const token = 'a'.repeat(72);
  const tokenHash = await hash(token);
  const expires = new Date(now.getTime()+3600000).toISOString();
  sqlite.prepare(`INSERT INTO email_verifications(email,code_hash,token_hash,expires_at,verified_until,window_started_at,last_sent_at,created_at)
    VALUES (?,'unused',?,?,?,?,?,?)`).run(email,tokenHash,expires,expires,now.toISOString(),now.toISOString(),now.toISOString());
  const counts = () => Object.fromEntries(['students','student_waivers','reservations','payments','booking_emails'].map(table=>[table,sqlite.prepare(`SELECT count(*) AS n FROM ${table}`).get().n]));
  const base = {first_name:'Waiver',last_name:'Tester',email,session_id:'sess-one',method:'cash',pricing_category:'regular',website:'',verification_token:token,waiver_version:'v-current'};
  const request = async (data, config={}) => {
    const req = new Request('http://localhost:8788/api/public/book', {method:'POST',headers:{Origin:'http://localhost:8788','Content-Type':'application/json'},body:JSON.stringify(data)});
    const res = await onRequestPost({request:req,env:{DB:db,PUBLIC_BOOKING_ENABLED:'true',WAIVER_APPROVED_VERSION:'v-current',...config}});
    return {status:res.status,body:await res.json()};
  };
  let tests=0;
  async function rejects(label, data, expectedStatus) {
    const before=counts(); const result=await request(data);
    assert.equal(result.status,expectedStatus,`${label}: ${JSON.stringify(result.body)}`);
    assert.deepEqual(counts(),before,`${label}: unexpected database write`);
    console.log('PASS:',label); tests++;
  }
  await rejects('Unsigned verified student cannot reserve',base,409);
  await rejects('Signature without acknowledgments rejected',{...base,waiver_signed_name:'Waiver Tester'},409);
  await rejects('Adult checkbox missing rejected',{...base,waiver_signed_name:'Waiver Tester',waiver_accepted:true},409);
  await rejects('Release checkbox missing rejected',{...base,waiver_signed_name:'Waiver Tester',waiver_adult_confirmed:true},409);
  await rejects('Wrong signature rejected',{...base,waiver_signed_name:'Another Person',waiver_accepted:true,waiver_adult_confirmed:true},400);
  await rejects('Old version cannot be substituted',{...base,waiver_version:'v-old',waiver_signed_name:'Waiver Tester',waiver_accepted:true,waiver_adult_confirmed:true},409);
  await rejects('Invalid verification token rejected',{...base,verification_token:'b'.repeat(72),waiver_signed_name:'Waiver Tester',waiver_accepted:true,waiver_adult_confirmed:true},409);
  const signed = await request({...base,waiver_signed_name:'Waiver Tester',waiver_accepted:true,waiver_adult_confirmed:true});
  assert.equal(signed.status,201,JSON.stringify(signed.body));
  assert.equal(counts().student_waivers,1); assert.equal(counts().reservations,1);
  console.log('PASS: valid signature saves waiver and reservation atomically'); tests++;
  // Booking consumes verification token. Refresh it to simulate the returning student's new verification.
  sqlite.prepare('UPDATE email_verifications SET token_hash=?,verified_until=? WHERE email=?').run(tokenHash,expires,email);
  const returning = await request({...base,session_id:'sess-two'});
  assert.equal(returning.status,201,JSON.stringify(returning.body));
  assert.equal(counts().student_waivers,1); assert.equal(counts().reservations,2);
  console.log('PASS: verified returning student books without a second signature'); tests++;
  // An old signature is not sufficient when the required waiver version changes.
  sqlite.prepare("DELETE FROM student_waivers WHERE version='v-current'").run();
  sqlite.prepare("INSERT INTO student_waivers(id,student_id,version,signed_name,signed_at,verification_email,adult_confirmed,release_acknowledged) SELECT 'old-signature',id,'v-old','Waiver Tester',?,email,1,1 FROM students WHERE email=?").run(now.toISOString(),email);
  sqlite.prepare('UPDATE email_verifications SET token_hash=?,verified_until=? WHERE email=?').run(tokenHash,expires,email);
  await rejects('Prior-version waiver cannot authorize new booking',{...base,session_id:'sess-three'},409);
  console.log(`Waiver booking security tests passed: ${tests}`);
} finally { rmSync(output,{recursive:true,force:true}); }
