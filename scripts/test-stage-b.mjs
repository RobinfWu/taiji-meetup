import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { webcrypto } from 'node:crypto';
import assert from 'node:assert/strict';

// Compile and exercise production functions, not copied implementations.
if (!globalThis.crypto) globalThis.crypto = webcrypto;
execFileSync('npx', ['tsc', 'functions/lib/auth.ts', 'functions/lib/rateLimit.ts', '--outDir', '.test-dist', '--module', 'es2022', '--target', 'es2022', '--moduleResolution', 'node', '--skipLibCheck'], { stdio: 'inherit', shell: process.platform === 'win32' });
const auth = await import('../.test-dist/lib/auth.js');
const rate = await import('../.test-dist/lib/rateLimit.js');
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); console.log('PASS:', message); checks++; };
const secret = 'a'.repeat(64);
const password = 'test-only-password';
const hash = await auth.hashPassword(password);
check(await auth.verifyPassword(password, hash), 'password verification');
check(!(await auth.verifyPassword('incorrect', hash)), 'wrong password');
check(!(await auth.verifyPassword(password, hash.replace(/:(\d+):/, ':250000garbage:'))), 'strict iteration validation');
check(!(await auth.verifyPassword(password, hash.replace(/:[0-9a-f]{32}:/, ':' + 'z'.repeat(32) + ':'))), 'strict salt validation');
check(!(await auth.verifyPassword(password, undefined)), 'missing hash fails closed');
const token = await auth.createSessionToken(secret);
check((await auth.verifySessionToken(token, secret)).valid, 'valid session');
check(!(await auth.verifySessionToken(token, 'other-secret')).valid, 'wrong signature');
check(!(await auth.verifySessionToken(await auth.createSessionToken(secret, 43201), secret)).valid, 'overlong session rejected');
check(!(await auth.verifySessionToken(await auth.createSessionToken(secret, -1), secret)).valid, 'expired session rejected');
const req = (origin, url = 'http://localhost:8788/api/admin/auth/login') => new Request(url, { method: 'POST', headers: { Origin: origin, 'X-Admin-Action': '1' } });
check(auth.verifyCsrf(req('http://localhost:8788')), 'same-origin login');
check(!auth.verifyCsrf(req('http://localhost:3000')), 'different localhost port rejected');
check(!auth.verifyCsrf(req('https://attacker.example')), 'foreign origin rejected');
check(auth.isRequestSecure(new Request('https://chentaijilab.ca/admin')), 'production secure cookie');
check(!(await auth.authenticateAdmin(new Request('https://chentaijilab.ca/api/students', { headers: { Cookie: `taiji_admin_session=${token}` } }), { INSTRUCTOR_SESSION_SECRET: '' })).authorized, 'missing session secret');
check((await auth.authenticateAdmin(new Request('https://chentaijilab.ca/api/admin/booking-emails/process', { method: 'POST', headers: { Authorization: 'Bearer test-token' } }), { ADMIN_API_TOKEN: 'test-token' })).authorized, 'scheduler bearer preserved');
check(!(await auth.authenticateAdmin(new Request('https://chentaijilab.ca/api/students', { headers: { Cookie: 'taiji_admin_session=%ZZ' } }), { INSTRUCTOR_SESSION_SECRET: secret })).authorized, 'malformed cookie rejected');
check((await rate.deriveClientKey(new Request('http://localhost:8788/'), secret)).length === 64, 'local client key');
await assert.rejects(() => rate.deriveClientKey(new Request('https://chentaijilab.ca/'), secret)); checks++; console.log('PASS: missing production IP rejected');
await assert.rejects(() => rate.deriveClientKey(new Request('http://localhost:8788/'), '')); checks++; console.log('PASS: missing rate secret rejected');

// SQLite-backed D1 adapter: runs the actual parameterized production SQL.
const sqlite = new DatabaseSync(':memory:');
sqlite.exec('CREATE TABLE admin_login_attempts (key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, window_start TEXT NOT NULL, blocked_until TEXT, updated_at TEXT NOT NULL)');
const db = { prepare(sql) { return { bind(...params) { const statement = sqlite.prepare(sql); return { async run() { statement.run(...params); }, async first() { return statement.get(...params) ?? null; } }; } }; } };
const key = 'test-ip';
const admissions = await Promise.all(Array.from({ length: 20 }, () => rate.reserveLoginAttempt(db, key)));
check(admissions.filter(x => x.allowed).length === 5, '20 concurrent attempts admit exactly five');
check(admissions.filter(x => !x.allowed).length === 15, '15 concurrent attempts rejected');
check((await rate.reserveLoginAttempt(db, key)).allowed === false, 'lockout persists');
check(sqlite.prepare('SELECT attempts FROM admin_login_attempts WHERE key=?').get(key).attempts === 6, 'blocked counter bounded');
await assert.rejects(() => rate.reserveLoginAttempt(null, key)); checks++; console.log('PASS: missing database fails closed');
// Move lockout and window into the past to exercise expiry/reset.
sqlite.prepare('UPDATE admin_login_attempts SET blocked_until=?, window_start=? WHERE key=?').run(String(Date.now()-1000), String(Date.now()-1000000), key);
check((await rate.reserveLoginAttempt(db, key)).allowed, 'expired lockout resets');
console.log(`Stage B security tests passed: ${checks}`);
