import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createBookingFixture } from './lib/public-booking-fixture.mjs';

// Fixed clock: this one-time event stays testable after its actual date.
const RealDate = Date, realFetch = globalThis.fetch;
globalThis.Date = class extends RealDate {
  constructor(...args) { super(...(args.length ? args : ['2026-11-16T12:00:00.000Z'])); }
  static now() { return new RealDate('2026-11-16T12:00:00.000Z').getTime(); }
};
globalThis.fetch = () => { throw Error('Real network/email forbidden'); };
const f = await createBookingFixture();
let checks = 0;
const check = (value, message) => { assert(value, message); checks++; console.log('PASS:', message); };
const publish = readFileSync(new URL('./publish-intro-class.sql', import.meta.url), 'utf8');
const introId = 'existing-intro-id';
const production = route => ({ url: 'https://chentaijilab.ca'+route, headers: {Origin:'https://chentaijilab.ca'}, env: {EMAIL_VERIFICATION_DEV_MODE:'false'} });
try {
  f.sqlite.exec('UPDATE class_sessions SET is_public=0');
  f.sqlite.exec(readFileSync(new URL('../seed.sql', import.meta.url), 'utf8'));
  f.sqlite.exec(`UPDATE class_sessions SET id='${introId}',capacity=7 WHERE id='sess-2026-11-21-saturday'`);
  const existingStudent=f.returning('existing-intro@example.test');
  f.sqlite.prepare("INSERT INTO reservations(id,student_id,session_id,source,status) VALUES ('existing-intro-res',?,?,'drop_in','confirmed')").run(existingStudent,introId);
  const existingReservation=f.sqlite.prepare("SELECT * FROM reservations WHERE id='existing-intro-res'").get();
  f.sqlite.exec(publish);
  assert.deepEqual(f.sqlite.prepare("SELECT * FROM reservations WHERE id='existing-intro-res'").get(),existingReservation);
  check(true,'existing event reservation remains byte-for-byte unchanged');
  const session = f.sqlite.prepare('SELECT * FROM class_sessions WHERE id=?').get(introId);
  check(session.capacity===7 && session.start_at==='2026-11-21T16:00:00.000Z' && session.end_at==='2026-11-21T17:30:00.000Z', 'existing November 21 ID and capacity retained; EST times correct');
  f.sqlite.exec(publish);
  check(f.sqlite.prepare("SELECT COUNT(*) n FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-21'").get().n===1, 'publication SQL can be rerun without duplicates');
  f.sqlite.exec('SAVEPOINT missing_event');
  f.sqlite.exec("DELETE FROM reservations WHERE id='existing-intro-res'; DELETE FROM class_sessions WHERE id='existing-intro-id'");
  f.sqlite.exec(publish);
  check(f.sqlite.prepare("SELECT capacity FROM class_sessions WHERE id='sess-2026-11-21-saturday'").get().capacity===10,'missing event uses configured template capacity');
  f.sqlite.exec('ROLLBACK TO missing_event; RELEASE missing_event');
  f.sqlite.exec('SAVEPOINT ambiguous_event');
  f.sqlite.exec("INSERT INTO class_sessions(id,template_id,start_at,end_at,location,capacity) VALUES ('ambiguous','fixture','2026-11-21T18:00:00.000Z','2026-11-21T19:30:00.000Z','Other',10)");
  assert.throws(()=>f.sqlite.exec(publish),/CHECK constraint/);
  check(f.sqlite.prepare("SELECT capacity FROM class_sessions WHERE id='existing-intro-id'").get().capacity===7,'ambiguous date aborts before updating the event');
  f.sqlite.exec('ROLLBACK TO ambiguous_event; RELEASE ambiguous_event');
  const listing = await f.json('/api/classes', undefined, production('/api/classes'));
  check(listing.status===200 && listing.body.length===1 && listing.body[0].id===introId && listing.body[0].price_cents===0, 'production-host API lists only the published free introductory event');
  check(listing.body[0].location==='Lake Ontario Park, 920 King St. W., Kingston, Ontario' && listing.body[0].available_spots===6, 'address and availability correct');
  async function book(email, sessionId=introId, extra={}) {
    const token=await f.verify(email);
    const quoted=await f.json('/api/public/waiver/status',{email,verification_token:token,session_id:sessionId});
    const response=await f.json('/api/public/book',{first_name:'Test',last_name:'Visitor',email,session_id:sessionId,verification_token:token,expected_amount_cents:0,waiver_version:'fixture-v1',waiver_signed_name:'Test Visitor',waiver_accepted:true,waiver_adult_confirmed:true,...extra},production('/api/public/book'));
    return {quoted,response};
  }
  const beforePayments=f.sqlite.prepare('SELECT COUNT(*) n FROM payments').get().n;
  for (const email of ['intro-new@example.test','returning@example.test']) {
    const {quoted,response}=await book(email);
    check(quoted.status===200 && quoted.body.pricing.amount_cents===0, 'verified free quote for '+email);
    check(response.status===201 && response.body.pricing.amount_cents===0 && response.body.payment===null, 'free reservation without payment method for '+email);
    check(response.body.session.start_at===session.start_at && response.body.session.location===session.location, 'confirmation contains actual event date and location');
  }
  check(f.sqlite.prepare('SELECT COUNT(*) n FROM payments').get().n===beforePayments, 'no payment rows created, including for a returning student');
  check((await book('intro-new@example.test')).response.status===409, 'duplicate event reservation rejected');
  for (const id of ['sess-one','sess-past','sess-cancelled','missing']) check((await book('blocked@example.test',id)).response.status===409, 'direct booking rejects unpublished/past/cancelled/missing session: '+id);
  f.sqlite.exec(`UPDATE class_sessions SET capacity=4 WHERE id='${introId}'`);
  const last = await Promise.all([book('intro-last-a@example.test'),book('intro-last-b@example.test')]);
  check(last.filter(r=>r.response.status===201).length===1 && last.filter(r=>r.response.status===409).length===1, 'concurrent final-place bookings respect capacity');
  const message=f.confirmationText({first_name:'Test',session_title:listing.body[0].template.title,...session,amount_cents:null,method:null,reference:null}).text;
  for (const fragment of ['November 21, 2026','11:00','12:30','EST','920 King St. W.','pavilion','nearby grassy area','https://www.google.com/maps/dir/','weather-dependent','$0 CAD','1:00 PM']) check(message.includes(fragment), 'email contains '+fragment);
  check(!message.includes('Send payment to:'), 'free confirmation has no payment instructions');
  f.sqlite.prepare('UPDATE class_sessions SET capacity=10 WHERE id=?').run(introId);
  const originalBatch=f.env.DB.batch;
  f.env.DB.batch=async statements=>{f.sqlite.prepare('UPDATE class_sessions SET is_public=0 WHERE id=?').run(introId);return originalBatch(statements);};
  const beforeRace=f.sqlite.prepare('SELECT COUNT(*) n FROM reservations').get().n;
  check((await book('publication-race@example.test')).response.status===409,'transaction rechecks publication after preflight');
  check(f.sqlite.prepare('SELECT COUNT(*) n FROM reservations').get().n===beforeRace,'publication race creates no reservation');
  f.env.DB.batch=originalBatch;
  f.sqlite.prepare('UPDATE class_sessions SET is_public=1 WHERE id=?').run(introId);
  f.sqlite.exec("UPDATE class_templates SET is_active=0 WHERE id='tpl-intro-2026-11-21'");
  check((await f.json('/api/classes')).body.length===0 && (await book('inactive-intro@example.test')).response.status===409,'inactive-template event hidden and unbookable');
  f.sqlite.exec("UPDATE class_templates SET is_active=1 WHERE id='tpl-intro-2026-11-21'");
  f.sqlite.exec(`UPDATE class_sessions SET capacity=10,is_public=0 WHERE id='${introId}'`);
  check((await book('unpublished@example.test')).response.status===409, 'unpublishing blocks direct booking');
  f.sqlite.exec(`UPDATE class_sessions SET is_public=1,status='cancelled' WHERE id='${introId}'`);
  check((await f.json('/api/classes')).body.length===0 && (await book('cancelled-intro@example.test')).response.status===409, 'cancelled published event hidden and unbookable');
  f.sqlite.exec(`UPDATE class_sessions SET status='scheduled',start_at='2026-11-16T11:30:00.000Z' WHERE id='${introId}'`);
  check((await f.json('/api/classes')).body.length===0 && (await book('started-intro@example.test')).response.status===409, 'already-started event cannot be booked even before its end');
  console.log(`Introductory class checks passed: ${checks}`);
} finally { f.close(); globalThis.fetch=realFetch; globalThis.Date=RealDate; }
