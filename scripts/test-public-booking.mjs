import assert from 'node:assert/strict';
import { createBookingFixture } from './lib/public-booking-fixture.mjs';
const fixture=await createBookingFixture();
const realFetch=globalThis.fetch;
globalThis.fetch=()=>{throw Error('External delivery/network is forbidden in booking regression tests.');};
let checks=0;
const check=(condition,message)=>{assert(condition,message);checks++;console.log('PASS:',message);};
const counts=()=>Object.fromEntries(['reservations','payments','student_waivers'].map(table=>[table,fixture.sqlite.prepare(`SELECT count(*) AS n FROM ${table}`).get().n]));
async function quote(email,token){return fixture.json('/api/public/waiver/status',{email,verification_token:token});}
function booking(email,token,session='sess-one',extra={}){return fixture.json('/api/public/book',{first_name:'Test',last_name:'Visitor',email,verification_token:token,session_id:session,method:'etransfer',pricing_category:'regular',expected_amount_cents:0,waiver_version:'fixture-v1',waiver_signed_name:'Test Visitor',waiver_accepted:true,waiver_adult_confirmed:true,...extra});}
try {
  const initial=counts(),email='new@example.test';
  const sent=await fixture.json('/api/public/verification/request',{email});
  check(sent.status===200&&!!sent.body.dev_code,'local verification uses only dev code');
  assert.deepEqual(counts(),initial);check(true,'requesting code does not hold a seat');
  const wrong=await fixture.json('/api/public/verification/confirm',{email,code:'not-a-code'});check(wrong.status===400,'invalid code rejected');
  const confirmed=await fixture.json('/api/public/verification/confirm',{email,code:sent.body.dev_code});
  check(confirmed.status===200,'correct code verifies email');assert.deepEqual(counts(),initial);check(true,'verifying email does not reserve or charge');
  const token=confirmed.body.verification_token;
  const invalid=await quote(email,'f'.repeat(72));check(invalid.status===403,'price eligibility requires valid email proof');
  const first=await quote(email,token);check(first.body.pricing.first_reservation_free&&first.body.already_signed===false,'verified new visitor is free and must sign waiver');
  const unsigned=await booking(email,token,'sess-one',{waiver_signed_name:undefined,waiver_accepted:undefined,waiver_adult_confirmed:undefined});check(unsigned.status===409,'free visitor still requires waiver');
  const reserved=await booking(email,token);check(reserved.status===201&&reserved.body.pricing.amount_cents===0&&reserved.body.payment===null,'first booking is confirmed at $0 without payment');
  const consumed=await quote(email,token);check(consumed.status===403,'booking consumes email proof');
  for(const [email,category,amount,method] of [['returning@example.test','regular',2000,'etransfer'],['senior@example.test','regular',2000,'cash'],['student@example.test','regular',2000,'etransfer'],['cancelled@example.test','regular',2000,'cash']]) {
    const proof=await fixture.verify(email),price=await quote(email,proof);
    check(price.status===200&&!price.body.pricing.first_reservation_free&&price.body.already_signed,'returning eligibility and signed waiver: '+email);
    check(price.body.pricing.paid_rates[category]===amount,'verified quoted rate matches category: '+category);
    const result=await booking(email,proof,'sess-two',{pricing_category:category,method,expected_amount_cents:amount,waiver_signed_name:undefined,waiver_accepted:undefined,waiver_adult_confirmed:undefined});
    check(result.status===201&&result.body.pricing.amount_cents===amount&&result.body.payment.method===method&&result.body.payment.status==='unpaid','returning price, payment preference and unpaid status preserved: '+email);
  }
  const regularEmail='regular-price-only@example.test';fixture.returning(regularEmail);const regularProof=await fixture.verify(regularEmail),regularBefore=counts();
  for(const removedCategory of ['student','senior']){const rejected=await booking(regularEmail,regularProof,'sess-two',{pricing_category:removedCategory,expected_amount_cents:1700});check(rejected.status===400,'removed discount category is rejected: '+removedCategory);assert.deepEqual(counts(),regularBefore);}
  const staleDiscount=await booking(regularEmail,regularProof,'sess-two',{expected_amount_cents:1700});check(staleDiscount.status===409,'old discounted quote cannot silently become a regular-price booking');assert.deepEqual(counts(),regularBefore);
  const changedEmail='price-change@example.test',changedProof=await fixture.verify(changedEmail);
  check((await quote(changedEmail,changedProof)).body.pricing.first_reservation_free,'new visitor initially receives a free quote');
  fixture.returning(changedEmail,false,false); // A separate reservation arrives after the quote.
  const priceBefore=counts(),stale=await booking(changedEmail,changedProof);
  check(stale.status===409,'stale free quote cannot silently create a paid reservation');
  assert.equal(counts().reservations,priceBefore.reservations);assert.equal(counts().payments,priceBefore.payments);
  check(!(await quote(changedEmail,changedProof)).body.pricing.first_reservation_free,'same proof can retrieve the changed price');
  const reviewed=await booking(changedEmail,changedProof,'sess-one',{expected_amount_cents:2000});
  check(reviewed.status===201&&reviewed.body.pricing.amount_cents===2000,'reviewed price can be explicitly confirmed');
  const noMethodEmail='no-payment-method@example.test', noMethodProof=await fixture.verify(noMethodEmail);
  const noMethod=await booking(noMethodEmail,noMethodProof,'sess-one',{method:undefined});
  check(noMethod.status===201&&noMethod.body.payment===null,'legacy first-free booking also needs no payment method');
  const paidNoMethodEmail='paid-no-method@example.test';fixture.returning(paidNoMethodEmail);
  const paidNoMethodProof=await fixture.verify(paidNoMethodEmail);
  const paidNoMethod=await booking(paidNoMethodEmail,paidNoMethodProof,'sess-two',{method:undefined,expected_amount_cents:2000});
  check(paidNoMethod.status===409,'paid returning booking cannot omit a payment method');
  const expiredEmail='expired@example.test';
  const expiredCode=await fixture.json('/api/public/verification/request',{email:expiredEmail});
  fixture.sqlite.prepare("UPDATE email_verifications SET expires_at='2000-01-01T00:00:00.000Z' WHERE email=?").run(expiredEmail);
  check((await fixture.json('/api/public/verification/confirm',{email:expiredEmail,code:expiredCode.body.dev_code})).status===400,'expired email code rejected');
  const availability=await fixture.json('/api/classes');
  check(!availability.body.some(s=>['sess-past','sess-cancelled'].includes(s.id)),'past and cancelled sessions excluded');
  check(availability.body.find(s=>s.id==='sess-full').available_spots===0,'full session reports no spots');
  const retryEmail='unavailable@example.test',retryToken=await fixture.verify(retryEmail),before=counts();
  for(const session of ['sess-full','sess-cancelled','sess-past','missing']){const result=await booking(retryEmail,retryToken,session);check(result.status===409,'unavailable session rejected: '+session);assert.deepEqual(counts(),before);}
  const retry=await booking(retryEmail,retryToken,'sess-template');check(retry.status===201,'same verified visitor can choose an available session after rejection');
  const duplicateProof=await fixture.verify(email),duplicateBefore=counts();const duplicate=await booking(email,duplicateProof);check(duplicate.status===409,'duplicate reservation rejected');assert.deepEqual(counts(),duplicateBefore);
  const one='last-one@example.test',two='last-two@example.test',oneProof=await fixture.verify(one),twoProof=await fixture.verify(two);
  const simultaneous=await Promise.all([booking(one,oneProof,'sess-last'),booking(two,twoProof,'sess-last')]);
  check(simultaneous.filter(r=>r.status===201).length===1&&simultaneous.filter(r=>r.status===409).length===1,'simultaneous attempts cannot overbook final place');
  check(fixture.sqlite.prepare("SELECT count(*) AS n FROM reservations WHERE session_id='sess-last' AND status='confirmed'").get().n===1,'final-place capacity enforced in SQL');
  console.log(`Public booking regression checks passed: ${checks}`);
} finally { globalThis.fetch=realFetch;fixture.close(); }
