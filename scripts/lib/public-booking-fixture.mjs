// Isolated SQLite/D1 fixture for exercising the actual Pages Functions.
// No live D1 connection, mail credentials, or external delivery is available.
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync, mkdirSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { dirname, join, resolve, sep, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(import.meta.dirname, '../..');

export async function createBookingFixture() {
  const output = mkdtempSync(join(tmpdir(), 'taiji-booking-fixture-'));
  const sources = ['api/classes', 'api/public/book', 'api/public/verification/request', 'api/public/verification/confirm', 'api/public/waiver/status', 'api/reservations/[id]/cancel', 'api/reservations/index', 'api/admin/classes/index', 'api/admin/auth/session', 'api/admin/overview/index', 'api/admin/booking-emails/process', 'lib/auth', 'lib/instructorBookingNotification', 'lib/emailVerification', 'lib/bookingConfirmation', 'lib/introClass', 'lib/validation', 'lib/publicBookingPricing', 'types/env'];
  for (const source of sources) {
    const dest = join(output, source + '.mjs');
    mkdirSync(dirname(dest), { recursive: true });
    const js = ts.transpileModule(readFileSync(join(root, 'functions', source + '.ts'), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText.replace(/(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g, (_, a, path, b) => `${a}${path}.mjs${b}`);
    writeFileSync(dest, js);
  }
  const handlers = new Map();
  for (const source of sources.filter(s => s.startsWith('api/'))) {
    const endpointModule = await import(pathToFileURL(join(output, source + '.mjs')).href);
    const handler = endpointModule.onRequest || (ctx => {
      const fn = ctx.request.method === 'GET' ? endpointModule.onRequestGet : ctx.request.method === 'POST' ? endpointModule.onRequestPost : null;
      return fn ? fn(ctx) : Response.json({error:'Method not allowed'},{status:405});
    });
    handlers.set('/' + source, handler);
    if (source.endsWith('/index')) handlers.set('/'+source.slice(0,-6),handler);
  }
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const migration of readdirSync(join(root, 'migrations')).filter(f => f.endsWith('.sql')).sort()) sqlite.exec(readFileSync(join(root, 'migrations', migration), 'utf8'));
  const now = new Date().toISOString();
  sqlite.prepare("INSERT INTO class_templates(id,title,weekday,start_time,end_time,location,capacity) VALUES ('fixture','Local test class',6,'10:30','12:00','123 Princess Street, Kingston, ON',10)").run();
  const base = Date.UTC(new Date().getUTCFullYear() + 1, 0, 9, 15, 30);
  function session(id, index, location, capacity=10, status='scheduled') {
    const start = base + index * 7 * 86400000 + (id === 'sess-two' ? 3600000 : 0);
    sqlite.prepare('INSERT INTO class_sessions(id,template_id,start_at,end_at,location,capacity,status) VALUES (?,\'fixture\',?,?,?,?,?)').run(id,new Date(start).toISOString(),new Date(start+5400000).toISOString(),location ?? "",capacity,status);
  }
  session('sess-one',0,'123 Princess Street, Kingston, ON');
  session('sess-two',1,'85 King Street East, Kingston, ON');
  session('sess-tbd',2,'[Placeholder: venue pending]');
  session('sess-template',3,null);
  session('sess-full',4,'100 Test Street, Kingston, ON',1);
  session('sess-last',5,'200 Test Street, Kingston, ON',1);
  session('sess-cancelled',6,'Cancelled fixture venue',10,'cancelled');
  sqlite.prepare("INSERT INTO class_sessions(id,template_id,start_at,end_at,location,capacity) VALUES ('sess-past','fixture','2020-01-01T15:30:00.000Z','2020-01-01T17:00:00.000Z','Past venue',50)").run();
  sqlite.exec("UPDATE class_sessions SET is_public=1");
  sqlite.prepare("INSERT INTO waiver_versions(version,title,body,created_at) VALUES ('fixture-v1','Local test waiver','LOCAL TEST ONLY. This is fixture text, not the school waiver.',?)").run(now);
  function returning(email, cancelled=false, signed=true) {
    const id = 'stu_' + crypto.randomUUID();
    sqlite.prepare('INSERT INTO students(id,first_name,last_name,email,created_at,updated_at) VALUES (?,\'Return\',\'Student\',?,?,?)').run(id,email,now,now);
    sqlite.prepare("INSERT INTO reservations(id,student_id,session_id,source,status,created_at,updated_at) VALUES (?,?,'sess-past','drop_in',?,?,?)").run('res_'+crypto.randomUUID(),id,cancelled?'cancelled':'confirmed',now,now);
    if (signed) sqlite.prepare("INSERT INTO student_waivers(id,student_id,version,signed_name,signed_at,verification_email,adult_confirmed,release_acknowledged) VALUES (?,?,'fixture-v1','Return Student',?,?,1,1)").run('wav_'+crypto.randomUUID(),id,now,email);
    return id;
  }
  for (const email of ['returning@example.test','senior@example.test','student@example.test']) returning(email);
  returning('cancelled@example.test',true);
  const fullStudent = returning('full@example.test');
  sqlite.prepare("INSERT INTO reservations(id,student_id,session_id,source,status,created_at,updated_at) VALUES ('full-seat',?,'sess-full','drop_in','confirmed',?,?)").run(fullStudent,now,now);
  let queue = Promise.resolve();
  const db = {
    prepare(sql) {
      const statement = (args=[]) => ({
        bind(...values) { return statement(values); },
        async first() { return sqlite.prepare(sql).get(...args) ?? null; },
        async all() { return { results: sqlite.prepare(sql).all(...args) }; },
        async run() { return { meta: { changes: Number(sqlite.prepare(sql).run(...args).changes) } }; },
      });
      return statement();
    },
    batch(statements) {
      const next = queue.then(async () => {
        sqlite.exec('BEGIN IMMEDIATE');
        try { const results=[]; for (const statement of statements) results.push(await statement.run()); sqlite.exec('COMMIT'); return results; }
        catch (error) { sqlite.exec('ROLLBACK'); throw error; }
      });
      queue = next.catch(() => {});
      return next;
    },
  };
  const env = { DB: db, PUBLIC_BOOKING_ENABLED: 'true', EMAIL_VERIFICATION_DEV_MODE: 'true', WAIVER_APPROVED_VERSION: 'fixture-v1', ADMIN_API_TOKEN: 'fixture-admin-only', INSTRUCTOR_SESSION_SECRET: 'fixture-session-secret-not-production', CONTACT_TO_EMAIL: 'instructor@example.test', RESEND_API_KEY: 'fixture-no-real-mail', BOOKING_FROM_EMAIL: 'fixture@example.test' };
  async function request(path, body, options={}) {
    const cancellation=path.match(/^\/api\/reservations\/([^/]+)\/cancel$/);
    const handler=handlers.get(cancellation ? '/api/reservations/[id]/cancel' : path.split('?')[0]);
    if (!handler) throw Error('Unknown fixture endpoint: '+path);
    const method=options.method || (body===undefined?'GET':'POST');
    const headers=new Headers({'Content-Type':'application/json',Origin:'http://localhost:4192'});
    for(const [key,value] of Object.entries(options.headers||{})) headers.set(key,value);
    return handler({request:new Request(options.url || 'http://localhost:4192'+path,{method,headers,...(body===undefined?{}:{body:JSON.stringify(body)})}),env:{...env,...options.env},params:cancellation?{id:cancellation[1]}:{}});
  }
  async function json(path, body, options) { const response=await request(path,body,options);return {status:response.status,body:await response.json()}; }
  async function verify(email) {
    // Advance only fixture cooldown state; no real timers or deliveries needed.
    sqlite.prepare("UPDATE email_verifications SET last_sent_at='2000-01-01T00:00:00.000Z' WHERE email=?").run(email);
    const code=await json('/api/public/verification/request',{email});
    if(code.status!==200 || !code.body.dev_code) throw Error('Fixture must use local dev-only codes: '+JSON.stringify(code));
    const verified=await json('/api/public/verification/confirm',{email,code:code.body.dev_code});
    if(verified.status!==200) throw Error(JSON.stringify(verified));
    return verified.body.verification_token;
  }
  return { sqlite, env, request, json, verify, returning, auth: await import(pathToFileURL(join(output, 'lib/auth.mjs')).href), confirmationText: (await import(pathToFileURL(join(output, 'lib/bookingConfirmation.mjs')).href)).confirmationText,
    close() { sqlite.close(); const absolute=resolve(output); if(!absolute.startsWith(resolve(tmpdir())+sep)||!basename(absolute).startsWith('taiji-booking-fixture-')) throw Error('Unexpected fixture cleanup path');rmSync(absolute,{recursive:true,force:true}); },
  };
}
