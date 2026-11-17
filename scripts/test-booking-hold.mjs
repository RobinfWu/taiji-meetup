// Run actual Functions against isolated SQLite. No production data or real email.
import assert from 'node:assert/strict';
import { createBookingFixture } from './lib/public-booking-fixture.mjs';

const fixture = await createBookingFixture();
const originalFetch = globalThis.fetch;
let networkCalls = 0, checks = 0;
globalThis.fetch = async () => { networkCalls++; throw Error('Network delivery forbidden in this test'); };
try {
  const snapshot = () => Object.fromEntries(['students','reservations','student_waivers','payments','email_verifications','booking_emails'].map(table => [table,fixture.sqlite.prepare(`SELECT * FROM ${table} ORDER BY id`.replace('email_verifications ORDER BY id','email_verifications ORDER BY email')).all()]));
  const before = snapshot();
  for (const scenario of [
    { origin: 'https://taiji-lab.pages.dev', env: { PUBLIC_BOOKING_ENABLED: undefined } },
    { origin: 'https://taiji-lab.pages.dev', env: { PUBLIC_BOOKING_ENABLED: 'false', EMAIL_VERIFICATION_DEV_MODE: 'false' } },
    { origin: 'http://localhost:4192', env: { PUBLIC_BOOKING_ENABLED: 'false', EMAIL_VERIFICATION_DEV_MODE: 'false' } },
    { origin: 'http://localhost:4192', env: { PUBLIC_BOOKING_ENABLED: undefined, EMAIL_VERIFICATION_DEV_MODE: undefined } },
    { origin: 'http://localhost:4192', env: { PUBLIC_BOOKING_ENABLED: 'false' } },
  ]) {
    const options = route => ({ url: scenario.origin + route, env: scenario.env, headers: { Origin: scenario.origin } });
    const classes = await fixture.json('/api/classes',undefined,options('/api/classes'));
    assert.deepEqual(classes,{status:200,body:[]}); checks++;
    for (const route of ['/api/public/verification/request','/api/public/verification/confirm','/api/public/waiver/status','/api/public/book']) {
      const result = await fixture.json(route,{email:'held@example.test',session_id:'sess-one'},options(route));
      assert.equal(result.status,503,route+' must be blocked when the booking switch is off'); checks++;
    }
    assert.deepEqual(snapshot(),before,'held requests must not change existing records');
  }
  const local = await fixture.json('/api/classes');
  assert(local.body.some(session=>session.id==='sess-one')); checks++;
  assert.equal(networkCalls,0); checks++;
  console.log(`Booking hold checks passed: ${checks}. Public sessions hidden; verification/booking blocked; existing records preserved; local fixture flow retained.`);
} finally { globalThis.fetch = originalFetch; fixture.close(); }
