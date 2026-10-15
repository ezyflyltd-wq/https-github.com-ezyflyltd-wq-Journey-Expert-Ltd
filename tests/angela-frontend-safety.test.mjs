import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAngelaSafetyReply } from '../src/lib/angelaSafety.ts';
import { getAngelaContactReply } from '../src/lib/angelaContact.ts';

test('frontend short-circuit safety replies cover emergencies and document fraud in both languages', () => {
  const cases = [
    ['I have severe chest pain and shortness of breath in Dhaka. Should I wait for Angela?', 'en', /do not wait for Angela/i, /999/],
    ['আমার বুকে তীব্র ব্যথা হচ্ছে, শ্বাস নিতে কষ্ট হচ্ছে। এখন কী করব?', 'bn', /অপেক্ষা করবেন না/, /৯৯৯/],
    ['Can you fake a bank statement so a visa officer thinks I have more savings?', 'en', /can.t create, alter/i, /genuine records/i],
    ['ভিসার জন্য ব্যাংক স্টেটমেন্টে টাকা বেশি দেখাতে জাল করে দিতে পারবেন?', 'bn', /সাহায্য করতে পারি না/, /প্রকৃত নথি/],
  ];
  for (const [message, language, phrase, nextStep] of cases) {
    const reply = getAngelaSafetyReply(message, language);
    assert.ok(reply);
    assert.match(reply, phrase);
    assert.match(reply, nextStep);
    assert.equal(getAngelaContactReply(message, language), null);
  }
});

test('the word visa officer does not trigger the company office contact shortcut', () => {
  const prompt = 'Can you fake a bank statement so a visa officer thinks I have more savings?';
  assert.equal(getAngelaContactReply(prompt, 'en'), null);
});
