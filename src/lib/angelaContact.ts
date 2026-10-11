// Verified public company details do not depend on a generative provider.
export function getAngelaContactReply(prompt: string, language: 'bn' | 'en'): string | null {
  const question = prompt.toLowerCase().replace(/\s+/g, ' ').trim();
  const contact = /whatsapp|phone|hotline|contact|office|address|email|হোয়াটসঅ্যাপ|হোয়াটসঅ্যাপ|ফোন|হটলাইন|যোগাযোগ|অফিস|ঠিকানা|ইমেইল|নম্বর|নাম্বার/.test(question);
  const company = /\bjel\b|journey expert|your|you|আপনাদের|তোমাদের|আপনার|জার্নি|কোম্পানি/.test(question);
  const unrelated = /embassy|consulate|university|hospital|hotel|এম্বাসি|দূতাবাস|কনস্যুলেট|বিশ্ববিদ্যালয়|বিশ্ববিদ্যালয়|হাসপাতাল|হোটেল/.test(question);
  if (!contact || !company || unrelated) return null;
  return language === 'bn'
    ? 'আমাদের হটলাইন ও হোয়াটসঅ্যাপ নম্বর 01926400400 (+8801926400400)। অফিস: ১৮৯/এ (২য় তলা), আব্দুল মতিন কমপ্লেক্স, হাজী মরণ আলী রোড, নাবিস্কো মোড়, তেজগাঁও, ঢাকা-১২১৫। ইমেইল: journeyexpertltd@gmail.com। স্টাডি অ্যাব্রড: journeyexpertbd@gmail.com।'
    : 'Our hotline and WhatsApp number is 01926400400 (+8801926400400). Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. Email: journeyexpertltd@gmail.com. Study Abroad: journeyexpertbd@gmail.com.';
}
