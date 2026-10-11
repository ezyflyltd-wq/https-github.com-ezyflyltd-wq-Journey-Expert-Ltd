import test from 'node:test';
import assert from 'node:assert/strict';
import { getAngelaContactReply } from '../src/lib/angelaContact.ts';

test('Bangla company contact remains accurate without a provider', () => {
  const reply = getAngelaContactReply('আপনাদের WhatsApp নম্বর ও অফিসের ঠিকানা কী?', 'bn');
  assert.match(reply, /01926400400/);
  assert.match(reply, /ঢাকা-১২১৫/);
  assert.match(reply, /journeyexpertltd@gmail.com/);
});
test('English company address and hotline use the same public details', () => {
  assert.match(getAngelaContactReply('What is your office address?', 'en'), /189\/A \(2nd Floor\)/);
  assert.match(getAngelaContactReply('JEL WhatsApp number?', 'en'), /\+8801926400400/);
});
test('other organisations and unrelated questions continue to the AI', () => {
  for (const prompt of ['What is the embassy address?', 'আপনাদের মাধ্যমে হাসপাতালের ফোন নম্বর চাই', 'What services does JEL provide?', 'How do I change my email?']) {
    assert.equal(getAngelaContactReply(prompt, 'en'), null);
  }
});
