type SafetyIntent = 'medical_emergency' | 'document_fraud';

function detectSafetyIntent(message: string): SafetyIntent | null {
  const q = message.toLocaleLowerCase().replace(/[’‘]/g, "'");
  const emergency =
    /\b(?:chest pain|my chest hurts|severe chest|shortness of breath|difficulty breathing|trouble breathing|can't breathe|cannot breathe|not breathing|unconscious|passed out|stroke symptoms?|seizure|heavy bleeding|severe bleeding|heart attack|severe allergic reaction|anaphylaxis)\b/i.test(q)
    || /(?:বুকে.{0,20}ব্যথা|বুকের.{0,20}ব্যথা|শ্বাসকষ্ট|শ্বাস নিতে.{0,24}কষ্ট|শ্বাস নিতে পারছি না|অজ্ঞান|অচেতন|স্ট্রোক|খিঁচুনি|প্রচুর রক্তপাত|রক্তপাত বন্ধ হচ্ছে না|হার্ট অ্যাটাক)/i.test(q)
    || /\b(?:buk(?:e|er)?\s*(?:e)?\s*(?:khub|tibro|prochondo|severe)?\s*betha|shash(?:kosto| nite koshto| nite kosto| nite partesi na)|ojnan|ochoton|khichuni|stroke|heart attack)\b/i.test(q);
  if (emergency) return 'medical_emergency';

  const document = /\b(?:bank statement|financial (?:statement|document|record|proof|evidence)|visa (?:document|application|paperwork)|proof of funds|supporting document)\b/i.test(q)
    || /(?:ব্যাংক.{0,12}স্টেটমেন্ট|আর্থিক নথি|ভিসা.{0,12}(?:নথি|কাগজপত্র)|ফান্ডের প্রমাণ)/i.test(q);
  const deceptive = /\b(?:fake|forge|falsif\w*|fabricat\w*|alter|edit|manipulat\w*|doctor\w*|inflate|misrepresent|make it look|hide (?:my|the) (?:funds|income|balance))\b/i.test(q)
    || /(?:জাল|নকল|ভুয়া|ভুয়া|বানোয়াট|বনানো|পরিবর্তন|সম্পাদনা|বাড়িয়ে|বাড়িয়ে|মিথ্যা.{0,12}(?:দেখ|লেখ|বল))/i.test(q);
  return document && deceptive ? 'document_fraud' : null;
}

export function getAngelaSafetyReply(message: string, language: 'bn' | 'en'): string | null {
  const intent = detectSafetyIntent(message);
  if (!intent) return null;
  if (intent === 'medical_emergency') return language === 'bn'
    ? "এটি এখন ঘটলে অ্যাঞ্জেলার উত্তরের জন্য অপেক্ষা করবেন না। বাংলাদেশে এখনই জাতীয় জরুরি সেবা ৯৯৯-এ ফোন করুন বা নিকটস্থ হাসপাতালের জরুরি বিভাগে যান। কাছের কাউকে সাহায্য করতে বলুন এবং নিজে গাড়ি চালাবেন না। বাংলাদেশের বাইরে থাকলে স্থানীয় জরুরি নম্বরে ফোন করুন। আমি রোগ নির্ণয় বা জরুরি চিকিৎসা দিতে পারি না।"
    : "If this is happening now, do not wait for Angela. In Bangladesh, call National Emergency Service 999 now or go to the nearest emergency department. Ask someone nearby to help and do not drive yourself. If you are outside Bangladesh, call your local emergency number. I cannot diagnose or provide emergency treatment.";
  return language === 'bn'
    ? "ভিসা বা আর্থিক নথি জাল, পরিবর্তন বা ভুলভাবে উপস্থাপন করতে আমি সাহায্য করতে পারি না। প্রকৃত নথি ব্যবহার করুন; স্টেটমেন্টে ভুল থাকলে ব্যাংকের কাছ থেকে আনুষ্ঠানিক সংশোধন নিন। JEL পরামর্শক সঠিকভাবে আবেদনপত্র প্রস্তুত করতে সহায়তা করতে পারেন।"
    : "I can’t create, alter, or help misrepresent financial or visa documents. Use genuine records; if a statement has an error, request an official correction from your bank. A JEL adviser can help you prepare an accurate application.";
}
