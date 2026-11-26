import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBookingFixture} from './lib/public-booking-fixture.mjs';
const f=await createBookingFixture(),originalFetch=globalThis.fetch;
globalThis.fetch=()=>{throw Error('Real mail/network forbidden');};
const admin={method:'PATCH',headers:{Authorization:'Bearer fixture-admin-only'}};
try{
 f.sqlite.exec('UPDATE class_sessions SET is_public=0');f.sqlite.exec(readFileSync('scripts/publish-november-28-class.sql','utf8'));
 const id='sess-2026-11-28-saturday';
 const update={id,action:'edit',start_at:'2030-11-23T17:00:00.000Z',end_at:'2030-11-23T18:00:00.000Z',location:'Lake Ontario Park, 920 King St. W., Kingston, Ontario',capacity:12};
 assert.equal((await f.json('/api/admin/classes/manage',update,admin)).status,200);
 let session=(await f.json('/api/classes')).body[0];assert.equal(session.start_at,update.start_at);assert.equal(session.end_at,update.end_at);
 const content=f.confirmationText({first_name:'Test',session_title:session.template.title,...session,amount_cents:null,method:null,reference:null}).text;
 for(const text of ['12:00','1:00','EST','pavilion'])assert(content.includes(text),text);
 console.log('PASS actual admin time update immediately reaches public API and confirmation, with park instructions preserved.');
 assert.equal((await f.json('/api/admin/classes/manage',{...update,location:'123 Princess Street, Kingston, ON'},admin)).status,200);
 session=(await f.json('/api/classes')).body[0];assert.equal(session.location,'123 Princess Street, Kingston, ON');
 const moved=f.confirmationText({first_name:'Test',session_title:session.template.title,...session,amount_cents:null,method:null,reference:null}).text;
 assert(!moved.includes('pavilion'));assert(moved.includes('123 Princess Street'));
 console.log('PASS changed venue reaches API and confirmation without stale park instructions.');
 assert.equal((await f.json('/api/admin/classes/manage',{id,action:'cancel'},admin)).status,200);
 assert.equal((await f.json('/api/classes')).body.length,0);
 console.log('PASS cancelled session disappears; no historical/static fallback.');
}finally{globalThis.fetch=originalFetch;f.close();}
