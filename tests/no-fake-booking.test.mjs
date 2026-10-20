import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

// Pages that still render sample data from src/data/mockData.ts must say so, and must never
// claim a booking, payment, ticket or voucher that did not happen.
const views = ['FlightBookingView', 'HotelBookingView', 'VisaPortalView', 'PackagesView', 'StudyAbroadView'];
const read = (name) => fs.readFileSync(`src/components/${name}.tsx`, 'utf8');

const forbidden = [
  /E-Ticket Successfully Issued/i,
  /Hotel Booking Confirmed/i,
  /Voucher sent to your email/i,
  /CONFIRMED \(OK\)/,
  /Instant (?:Multi-GDS Ticketing|Hotel Confirmation)/i,
  /Comparing live fares/i,
  /submitted for/i, // alert("... submitted ...") that sends nothing
  /JEL Wallet/i,
  /Math\.random\(\)/, // fabricated reference numbers
  /Tariqul|A08912345|tariqul@/i, // someone's name/passport/email pre-filled in forms
];

for (const name of views) {
  test(`${name} labels sample data and makes no false booking claims`, () => {
    const source = read(name);
    assert.match(source, /<DemoNotice\b/, `${name} must render <DemoNotice />`);
    for (const pattern of forbidden) assert.doesNotMatch(source, pattern, `${name} contains a false claim: ${pattern}`);
    assert.doesNotMatch(source, /\balert\(/, `${name} must not use alert() to pretend a request was sent`);
  });
}

test('flight and hotel flows never collect passport or card details on the page', () => {
  for (const name of ['FlightBookingView', 'HotelBookingView']) {
    assert.doesNotMatch(read(name), /passport(?:Number|Expiry)|cardNumber|cvv/i, `${name} must not collect sensitive details`);
  }
});

test('requests go to the verified Journey Expert WhatsApp number', () => {
  const notice = read('DemoNotice');
  assert.match(notice, /JEL_WHATSAPP_NUMBER = '8801926400400'/);
  for (const name of ['FlightBookingView', 'HotelBookingView', 'PackagesView', 'StudyAbroadView']) {
    assert.match(read(name), /wa\.me\/\$\{JEL_WHATSAPP_NUMBER\}/, `${name} must send enquiries to WhatsApp`);
  }
});
