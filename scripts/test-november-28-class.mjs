import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBookingFixture} from './lib/public-booking-fixture.mjs';
const RealDate=Date,realFetch=globalThis.fetch;
globalThis.Date=class extends RealDate {
  constructor(...args){super(...(args.length?args:['2026-11-25T17:00:00.000Z']));}
  static now(){return new RealDate('2026-11-25T17:00:00.000Z').getTime();}
};
globalThis.fetch=()=>{throw Error('External mail/network forbidden');};
const f=await createBookingFixture();
try{
  f.sqlite.exec('UPDATE class_sessions SET is_public=0');
  f.sqlite.exec(readFileSync('seed.sql','utf8'));
  f.sqlite.exec(readFileSync('scripts/publish-intro-class.sql','utf8'));
  const old=f.sqlite.prepare("SELECT * FROM class_sessions WHERE id='sess-2026-11-21-saturday'").get();
  const history=f.sqlite.prepare('SELECT * FROM reservations ORDER BY id').all();
  const publish=readFileSync('scripts/publish-november-28-class.sql','utf8');
  f.sqlite.exec(publish);f.sqlite.exec(publish);
  assert.deepEqual(f.sqlite.prepare("SELECT * FROM class_sessions WHERE id='sess-2026-11-21-saturday'").get(),old);
  assert.deepEqual(f.sqlite.prepare('SELECT * FROM reservations ORDER BY id').all(),history);
  const listing=await f.json('/api/classes');
  assert.equal(listing.status,200);assert.equal(listing.body.length,1);
  const session=listing.body[0];
  assert.equal(session.start_at,'2026-11-28T18:00:00.000Z');assert.equal(session.end_at,'2026-11-28T19:00:00.000Z');
  assert.equal(session.capacity,12);assert.equal(session.price_cents,null);assert.equal(session.available_spots,12);
  assert(session.location.includes('Lake Ontario Park'));
  console.log('PASS: idempotent publication, correct 1–2 EST session, capacity 12, standard pricing; old event/history unchanged.');
  for(const [email,amount] of [['new-nov28@example.test',0],['returning@example.test',2000]]){
    const proof=await f.verify(email);
    const quote=await f.json('/api/public/waiver/status',{email,verification_token:proof,session_id:session.id});
    assert.equal(quote.body.pricing.amount_cents,amount);
    const booked=await f.json('/api/public/book',{email,first_name:'Test',last_name:'Visitor',session_id:session.id,verification_token:proof,expected_amount_cents:amount,...(amount?{method:'etransfer'}:{}),waiver_version:'fixture-v1',waiver_signed_name:'Test Visitor',waiver_accepted:true,waiver_adult_confirmed:true});
    assert.equal(booked.status,201,JSON.stringify(booked.body));assert.equal(booked.body.pricing.amount_cents,amount);
    if(amount){assert.equal(booked.body.payment.amount_cents,2000);assert.equal(booked.body.payment.status,'unpaid');}
    else assert.equal(booked.body.payment,null);
    const message=f.confirmationText({first_name:'Test',session_title:session.template.title,...booked.body.session,amount_cents:amount||null,method:amount?'etransfer':null,reference:'TEST-ONLY'},'school@example.test').text;
    for(const fragment of ['November 28, 2026','1:00','2:00','EST','pavilion','nearby grassy area'])assert(message.includes(fragment),fragment);
  }
  assert.equal((await f.json('/api/classes')).body[0].available_spots,10);
  console.log('PASS: first visit free without payment, returning visit $20 unpaid, waiver/verification and park confirmations preserved.');
}finally{f.close();globalThis.Date=RealDate;globalThis.fetch=realFetch;}
