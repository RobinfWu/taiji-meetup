import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { createBookingFixture } from './lib/public-booking-fixture.mjs';

const f = await createBookingFixture();
const realFetch = globalThis.fetch, realError = console.error;
const errors = [];
globalThis.fetch = () => { throw Error('Real network/email forbidden'); };
console.error = (...args) => errors.push(args.join(' '));
let checks = 0;
const check = (condition, text) => { assert(condition,text); checks++; console.log('PASS:',text); };
const admin = {headers:{Authorization:'Bearer fixture-admin-only'}};
const counts = () => Object.fromEntries(['reservations','payments','booking_emails'].map(t=>[t,f.sqlite.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n]));
const cancel = (id,body={},options=admin) => f.json(`/api/reservations/${id}/cancel`,body,options);
const roster = () => f.json('/api/admin/classes?session_id=sess-one',undefined,admin);
const processMail = () => f.json('/api/admin/booking-emails/process',{},admin);
async function book(email,session='sess-one',extra={},options) {
  const token=await f.verify(email);
  return f.json('/api/public/book',{first_name:'Local',last_name:'Visitor',email,session_id:session,verification_token:token,expected_amount_cents:0,waiver_version:'fixture-v1',waiver_signed_name:'Local Visitor',waiver_accepted:true,waiver_adult_confirmed:true,...extra},options);
}

try {
  // Verify a real migration of already populated/sent/failed jobs preserves all fields.
  const migrationDb = new DatabaseSync(':memory:');
  for (const name of readdirSync('migrations').filter(n=>n.endsWith('.sql')&&n<'0011').sort()) migrationDb.exec(readFileSync('migrations/'+name,'utf8'));
  migrationDb.exec(`INSERT INTO class_templates(id,title,weekday,start_time,end_time,location,capacity) VALUES ('t','Test',6,'11:00','12:30','Park',12);
    INSERT INTO class_sessions(id,template_id,start_at,end_at,location,capacity) VALUES ('s','t','2030-11-21T16:00:00.000Z','2030-11-21T17:30:00.000Z','Park',12);
    INSERT INTO students(id,first_name,last_name,email) VALUES ('st','Local','Visitor','local@example.test');`);
  for (const [i,status] of ['pending','sending','sent','failed'].entries()) {
    migrationDb.prepare("INSERT INTO reservations(id,student_id,session_id,source,status) VALUES (?,'st','s','drop_in','cancelled')").run('r'+i);
    migrationDb.prepare("INSERT INTO booking_emails(id,reservation_id,recipient_email,status,attempts,next_attempt_at,created_at,updated_at) VALUES (?,?,'local@example.test',?,2,'2030-01-01','2030-01-01','2030-01-01')").run('job'+i,'r'+i,status);
  }
  const oldJobs=migrationDb.prepare('SELECT * FROM booking_emails ORDER BY id').all();
  migrationDb.exec(readFileSync('migrations/0011_booking_notification_outbox.sql','utf8'));
  assert.deepEqual(migrationDb.prepare('SELECT * FROM booking_emails ORDER BY id').all(),oldJobs);
  check(true,'migration preserves existing outbox IDs, states, recipients, timestamps and attempts');
  migrationDb.close();

  f.sqlite.exec("UPDATE class_sessions SET price_cents=0,capacity=1 WHERE id='sess-one'");
  const email='cancel-rebook@example.test';
  const booked=await book(email);
  check(booked.status===201&&booked.body.payment===null,'free reservation created without payment details');
  const id=booked.body.reservation_id;
  const original=f.sqlite.prepare('SELECT * FROM reservations WHERE id=?').get(id);
  check(f.sqlite.prepare('SELECT COUNT(*) n FROM booking_emails WHERE reservation_id=?').get(id).n===2,'student and instructor jobs are queued only after booking is saved');
  const before=counts();
  for (const options of [{},{headers:{Authorization:'Bearer wrong-token'}}]) check((await cancel(id,{},options)).status===401,'unauthorized cancellation rejected');
  const cookie='taiji_admin_session='+await f.auth.createSessionToken(f.env.INSTRUCTOR_SESSION_SECRET);
  check((await cancel(id,{}, {headers:{Cookie:cookie}})).status===403,'browser cancellation without CSRF header rejected');
  check((await cancel(id,{}, {headers:{Cookie:cookie,'X-Admin-Action':'1',Origin:'https://attacker.example'}})).status===403,'cross-origin cancellation rejected');
  check((await f.json(`/api/reservations/${id}/cancel`,undefined,{...admin,method:'GET'})).status===405,'GET cannot cancel a reservation');
  assert.deepEqual(counts(),before);
  check((await cancel('bad!')).status===400,'invalid reservation ID rejected');
  check((await cancel('missing-id')).status===404,'missing reservation returns 404');
  check((await cancel(id,{cancellation_reason:'x'.repeat(501)})).status===400,'oversized cancellation reason rejected');
  const csrf={headers:{Cookie:cookie,'X-Admin-Action':'1'}};
  const cancelled=await cancel(id,{cancellation_reason:'Instructor test cancellation'},csrf);
  check(cancelled.status===200&&cancelled.body.status==='cancelled'&&cancelled.body.reserved_count===0,'authenticated cookie cancellation atomically releases the seat');
  check(cancelled.body.created_at===original.created_at&&cancelled.body.cancelled_at&&cancelled.body.cancellation_reason==='Instructor test cancellation','history and original booking timestamp preserved');
  const repeat=await Promise.all([cancel(id,{cancellation_reason:'changed'}),cancel(id)]);
  for(const response of repeat)assert.deepEqual(response.body,cancelled.body);
  check(true,'repeated and concurrent cancellations preserve original timestamp and reason');
  check((await roster()).body.reservations.some(r=>r.id===id&&r.status==='cancelled'&&r.email===email),'cancelled attendee remains visible in authenticated roster');
  check((await roster()).body.session.reserved_count===0,'roster confirmed count updates to zero');
  check((await f.json('/api/classes')).body.find(s=>s.id==='sess-one').available_spots===1,'public booking availability agrees with roster');
  check(counts().booking_emails===before.booking_emails&&counts().payments===before.payments,'cancellation creates no email or payment side effects');
  await processMail();await processMail();
  check(f.sqlite.prepare('SELECT COUNT(*) n FROM booking_emails WHERE reservation_id=? AND status=\'failed\' AND attempts=5').get(id).n===2,'cancelled reservation jobs are suppressed without sending or endless retries');
  const rebooked=await book(email);
  check(rebooked.status===201&&rebooked.body.reservation_id!==id&&rebooked.body.payment===null,'same email can rebook the free session with a new reservation ID');
  check(f.sqlite.prepare('SELECT status FROM reservations WHERE id=?').get(id).status==='cancelled','rebooking retains the original cancelled reservation');
  check(f.sqlite.prepare("SELECT COUNT(*) n FROM booking_emails WHERE reservation_id=? AND email_type='instructor_notification'").get(rebooked.body.reservation_id).n===1,'rebooking queues a new instructor notification');
  const beforeDuplicate=counts();
  check((await book(email)).status===409,'duplicate confirmed booking is still rejected');assert.deepEqual(counts(),beforeDuplicate);

  const sends=[];
  globalThis.fetch=async(url,options)=>{
    assert.equal(url,'https://api.resend.com/emails');
    const data=JSON.parse(options.body);sends.push({data,key:options.headers['Idempotency-Key']});
    return Response.json({id:'fake-provider-id'});
  };
  check((await processMail()).body.status==='sent'&&sends[0].data.to[0]===email,'normal student confirmation uses the existing provider first');
  globalThis.fetch=async(url,options)=>{
    assert.equal(url,'https://api.resend.com/emails');sends.push({data:JSON.parse(options.body),key:options.headers['Idempotency-Key']});
    return new Response('Test failure',{status:503});
  };
  check((await processMail()).body.status==='failed','instructor send failure is logged and scheduled for retry');
  check(sends[1].data.to[0]==='instructor@example.test'&&sends[1].data.subject.startsWith('New booking: Local Visitor'),'instructor recipient is server configuration and subject identifies the student');
  for(const fragment of ['Local Visitor','Local test class','EST']) {
    check(sends[1].data.text.includes(fragment),'instructor notification includes '+fragment);
  }
  const date=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',weekday:'long',month:'long',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date(rebooked.body.session.start_at));
  check(sends[1].data.text.includes(date),'notification uses the actual class date/time in Kingston');
  check(errors.some(message=>message.includes('instructor_notification')&&message.includes('Resend HTTP 503')),'instructor failure logged without exposing student data');
  check(f.sqlite.prepare('SELECT status FROM reservations WHERE id=?').get(rebooked.body.reservation_id).status==='confirmed','instructor send failure does not roll back booking');
  check(f.sqlite.prepare("SELECT status FROM booking_emails WHERE reservation_id=? AND email_type='booking_confirmation'").get(rebooked.body.reservation_id).status==='sent','instructor send failure does not alter student confirmation');
  const notification=f.sqlite.prepare("SELECT * FROM booking_emails WHERE reservation_id=? AND email_type='instructor_notification'").get(rebooked.body.reservation_id);
  f.sqlite.prepare("UPDATE booking_emails SET next_attempt_at='2000-01-01' WHERE id=?").run(notification.id);
  globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');sends.push({data:JSON.parse(options.body),key:options.headers['Idempotency-Key']});return Response.json({id:'fake-retry-id'});};
  check((await processMail()).body.status==='sent'&&sends[2].key===sends[1].key,'instructor delivery retry reuses the same provider idempotency key');
  check(sends[0].key!==sends[1].key,'instructor and student messages use separate provider idempotency keys');
  check((await processMail()).body.processed===0&&sends.length===3,'processing an already sent queue makes no additional send');
  const adminRebook=await cancel(rebooked.body.reservation_id);
  check(adminRebook.status===200,'bearer-authenticated instructor cancellation also works');
  const student=f.sqlite.prepare('SELECT id FROM students WHERE email=?').get(email);
  const manual=await f.json('/api/reservations',{student_id:student.id,session_id:'sess-one',source:'drop_in'},admin);
  check(manual.status===201,'instructor-created reservation remains supported');
  check(f.sqlite.prepare("SELECT COUNT(*) n FROM booking_emails WHERE reservation_id=? AND email_type='instructor_notification'").get(manual.body.id).n===1,'instructor-created confirmed reservation also notifies the instructor');
  check((await f.json('/api/reservations',{student_id:student.id,session_id:'sess-one',source:'drop_in'},admin)).status===409,'retrying instructor creation cannot duplicate notification');
  const sentBefore=sends.length;
  const workers=await Promise.all([processMail(),processMail()]);
  check(workers.filter(r=>r.body.status==='sent').length===1&&sends.length===sentBefore+1,'concurrent processors cannot send the same instructor job twice');
  check(sends.at(-1).key!==sends[1].key,'new confirmed reservation after cancellation has a new notification idempotency key');
  globalThis.fetch=()=>{throw Error('Real network forbidden');};
  const race=await Promise.all([cancel(manual.body.id),book('racer-one@example.test'),book('racer-two@example.test')]);
  check(race[0].status===200,'cancellation succeeds while other visitors book');
  const occupied=f.sqlite.prepare("SELECT COUNT(*) n FROM reservations WHERE session_id='sess-one' AND status='confirmed'").get().n;
  check(occupied<=1,'concurrent cancellation and bookings never exceed capacity');
  const publicCount=(await f.json('/api/classes')).body.find(s=>s.id==='sess-one');
  check(publicCount.reserved_count===occupied&&publicCount.available_spots===1-occupied&&(await roster()).body.session.reserved_count===occupied,'public and instructor counts agree after concurrent operations');
  const unsignedEmail='missing-waiver@example.test',unsignedToken=await f.verify(unsignedEmail);
  check((await f.json('/api/public/book',{first_name:'Local',last_name:'Visitor',email:unsignedEmail,session_id:'sess-two',method:'cash',verification_token:unsignedToken,waiver_version:'fixture-v1'})).status===409,'cancellation feature does not bypass public waiver enforcement');
  const missing=await book('missing-recipient@example.test','sess-two',{method:'cash'},{env:{CONTACT_TO_EMAIL:undefined}});
  check(missing.status===201&&f.sqlite.prepare('SELECT COUNT(*) n FROM booking_emails WHERE reservation_id=?').get(missing.body.reservation_id).n===1,'missing instructor address is logged but normal booking/student confirmation remains intact');
  check(errors.some(message=>message.includes('check CONTACT_TO_EMAIL')),'missing notification configuration is logged');
  console.log(`Reservation cancellation and notification checks passed: ${checks}`);
} finally {globalThis.fetch=realFetch;console.error=realError;f.close();}
