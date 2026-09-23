type Context = { request: Request; env: Record<string, string | undefined> };

// [approved-production-change] bilingual Hajj grounding reviewed.

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  },
});

function detectLanguage(message: string, requested?: string): 'bn' | 'en' {
  if (requested === 'bn' || requested === 'en') return requested;
  if (/[\u0980-\u09FF]/.test(message)) return 'bn';
  if (/\b(ami|amar|amake|apni|apnar|tumi|tomar|chai|jabo|jete|koto|kivabe|ki|keno|kobe|hobe|korbo|korte|lagbe|bolen|diben|pari|parbo)\b/i.test(message)) return 'bn';
  return 'en';
}

const VERIFIED_JEL = `
Journey Expert Ltd. (JEL), Bangladesh.
Slogan: "Your Journey, Our Expertise."
Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh.
WhatsApp/Hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.
Core services: air ticketing; fare quotation; reissue/refund support; visa-document assistance; tours and travel; hotels; Hajj and Umrah; halal tourism; medical tourism; travel insurance; corporate travel management; Meet & Greet; Study Abroad.
Hajj & Umrah verified service scope: pilgrimage package planning; air travel coordination; Makkah/Madinah accommodation; ground transport; Ziyarat planning; pilgrim/group coordination; visa/document guidance. Exact package inclusions, prices, availability, Saudi visa/permit/health requirements, quotas and dates are time-sensitive and must be verified before being presented as current.
JEL Study Abroad services: profile assessment; country/course/university selection; admissions guidance; scholarships; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance.
Detailed Study Abroad portal: journeyexpertbd.com.
Main Journey Expert corporate portal: journeyexpertltd.com.
Known JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.
`;


const JEL_SEMANTIC_KNOWLEDGE = [
  {
    id: 'hajj_umrah', priority: 100,
    keywords: ['hajj','umrah','হজ','ওমরাহ','উমরাহ','makkah','madinah','মক্কা','মদিনা','nusuk','নুসুক','ziyarat','জিয়ারত','জিয়ারত','rawda','rawdah'],
    facts: 'JEL Hajj & Umrah scope: pilgrimage package planning; air-travel coordination; Makkah/Madinah accommodation; ground transport; Ziyarat planning; pilgrim/group coordination; visa/document guidance. Exact package inclusions, prices, availability, Saudi visa/permit/health rules, quotas and dates are time-sensitive and must be verified from current official or supplier sources.',
    bn: 'Journey Expert Limited হজ ও ওমরাহ বিষয়ে package planning, air travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination এবং visa/document guidance-এ সহায়তা করে। নির্দিষ্ট price, availability, Saudi visa/permit/health rules, quota ও dates current official source বা supplier থেকে যাচাই করতে হবে।',
    en: 'Journey Expert Limited supports Hajj and Umrah package planning, air-travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Exact prices, availability, Saudi visa/permit/health rules, quotas, and dates must be verified from current official or supplier sources.'
  },
  {
    id: 'study_abroad', priority: 95,
    keywords: ['study abroad','student visa','student','study','university','course','admission','scholarship','sop','ielts','masters','bachelor','cas','coe','i-20','i20','স্টাডি','স্টুডেন্ট','বিশ্ববিদ্যাল','অ্যাডমিশন','স্কলারশিপ','পড়াশোনা','পড়াশোনা'],
    facts: 'JEL Study Abroad scope: profile assessment; country/course/university selection; admissions guidance; scholarship guidance; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance. Dedicated portal: journeyexpertbd.com. Admission, scholarship and visa outcomes are never guaranteed.',
    bn: 'JEL Study Abroad প্রোফাইল assessment, দেশ/কোর্স/বিশ্ববিদ্যালয় নির্বাচন, admission ও scholarship guidance, SOP, English-language test guidance, student-visa documents এবং pre-departure/post-arrival guidance দেয়। Admission, scholarship বা visa outcome গ্যারান্টি করা হয় না।',
    en: 'JEL Study Abroad supports profile assessment, country/course/university selection, admissions and scholarship guidance, SOP, English-language tests, student-visa documents, and pre-/post-arrival guidance. Admission, scholarship, and visa outcomes are not guaranteed.'
  },
  {
    id: 'medical_tourism', priority: 92,
    keywords: ['medical tourism','medical visa','hospital','doctor','treatment','মেডিকেল ট্যুরিজম','মেডিকেল ভিসা','হাসপাতাল','ডাক্তার','চিকিৎসা'],
    facts: 'JEL medical-tourism support can cover hospital/doctor selection support, appointment coordination and travel preparation. Treatment availability and medical outcomes must be verified with the official provider and are not guaranteed by JEL.',
    bn: 'Journey Expert Limited medical-tourism support-এ hospital/doctor selection support, appointment coordination এবং travel preparation-এ সহায়তা করতে পারে। Treatment availability ও medical outcome official provider-এর মাধ্যমে যাচাই করতে হবে।',
    en: 'Journey Expert Limited can support medical-tourism enquiries with hospital/doctor selection support, appointment coordination, and travel preparation. Treatment availability and medical outcomes must be verified with the official provider.'
  },
  {
    id: 'air_ticketing', priority: 88,
    keywords: ['air ticket','ticketing','flight','fare','reissue','refund','ticket','এয়ার টিকিট','এয়ার টিকিট','টিকিট','ফ্লাইট','ফেয়ার','ফেয়ার','রিইস্যু','রিফান্ড','ভাড়া','ভাড়া'],
    facts: 'JEL air-ticketing scope: air tickets; fare quotation; reissue support; refund support. Live fares, seats, schedules, baggage rules, change/refund rules and booking status are supplier-dependent and must be verified before being presented as current.',
    bn: 'Journey Expert Limited air ticketing, fare quotation, reissue এবং refund support দেয়। Live fare, seat, schedule, baggage, change/refund rule ও booking status supplier-এর live data থেকে যাচাই করতে হবে।',
    en: 'Journey Expert Limited provides air ticketing, fare quotation, reissue, and refund support. Live fares, seats, schedules, baggage, change/refund rules, and booking status must be verified from current supplier data.'
  },
  {
    id: 'visa', priority: 80,
    keywords: ['visa','embassy','immigration','document checklist','ভিসা','এম্বাসি','ইমিগ্রেশন','ডকুমেন্ট'],
    facts: 'JEL provides visa-document assistance. Requirements vary by country and visa type and may include passport, photographs, financial evidence, academic/employment records and travel-purpose evidence. Current requirements, fees, processing times, eligibility and decisions must be verified from relevant official sources; JEL never guarantees approval.',
    bn: 'Journey Expert Limited visa-document assistance দেয়। Requirement দেশ ও visa type অনুযায়ী বদলায়; current checklist, fee, processing time, eligibility ও decision official source থেকে যাচাই করতে হবে। JEL visa approval গ্যারান্টি দেয় না।',
    en: 'Journey Expert Limited provides visa-document assistance. Requirements vary by country and visa type; current checklists, fees, processing times, eligibility, and decisions must be verified from official sources. JEL never guarantees visa approval.'
  },
  {
    id: 'tours_hotels', priority: 72,
    keywords: ['tour package','travel package','tour','hotel','package','holiday','ট্যুর','হোটেল','প্যাকেজ','ভ্রমণ'],
    facts: 'JEL supports tours, hotels and travel packages. Planning depends on destination, approximate date, traveller count, duration, budget and preferences. Live hotel/flight/package availability and prices must be verified from suppliers.',
    bn: 'Journey Expert Limited tours, hotels এবং travel package support দেয়। Destination, date, traveller count, duration, budget ও preference অনুযায়ী plan করা যায়; live availability ও price supplier থেকে যাচাই করতে হবে।',
    en: 'Journey Expert Limited supports tours, hotels, and travel packages. Planning depends on destination, dates, traveller count, duration, budget, and preferences; live availability and prices must be verified from suppliers.'
  },
  {
    id: 'halal_tourism', priority: 70,
    keywords: ['halal tourism','halal travel','হালাল ট্যুরিজম','হালাল ট্রাভেল'],
    facts: 'JEL halal-tourism support can plan trips around destination, travel dates, family/group size and halal-friendly preferences. Live supplier availability must be verified.',
    bn: 'Journey Expert Limited halal-tourism support দেয়। Destination, travel date, family/group size এবং halal-friendly preference অনুযায়ী trip framework করা যায়; live supplier availability যাচাই করতে হবে।',
    en: 'Journey Expert Limited supports halal-tourism planning around destination, dates, family/group size, and halal-friendly preferences; live supplier availability must be verified.'
  },
  {
    id: 'corporate_travel', priority: 68,
    keywords: ['corporate travel','business travel','corporate','কর্পোরেট ট্রাভেল','কর্পোরেট'],
    facts: 'JEL corporate-travel scope includes business-travel planning, ticketing coordination, hotel support, itinerary assistance and corporate travel workflow support. Route, traveller count and company travel-policy requirements are useful inputs.',
    bn: 'Journey Expert Limited corporate travel management-এ business-travel planning, ticketing coordination, hotel support, itinerary assistance এবং corporate workflow support দেয়।',
    en: 'Journey Expert Limited supports corporate travel with business-travel planning, ticketing coordination, hotel support, itinerary assistance, and corporate workflow support.'
  },
  {
    id: 'insurance', priority: 66,
    keywords: ['travel insurance','insurance','ইন্স্যুরেন্স','বীমা'],
    facts: 'JEL provides travel-insurance assistance. Coverage, premium and eligibility depend on insurer and trip and must be verified for the specific traveller and itinerary.',
    bn: 'Journey Expert Limited travel-insurance assistance দেয়। Coverage, premium ও eligibility insurer এবং trip অনুযায়ী বদলায়, তাই specific traveller ও itinerary অনুযায়ী যাচাই করতে হবে।',
    en: 'Journey Expert Limited provides travel-insurance assistance. Coverage, premium, and eligibility depend on the insurer and trip and must be verified for the specific traveller and itinerary.'
  },
  {
    id: 'meet_greet', priority: 64,
    keywords: ['meet & greet','meet and greet','airport assistance','airport support','মিট অ্যান্ড গ্রিট','এয়ারপোর্ট সহায়তা','এয়ারপোর্ট সহায়তা'],
    facts: 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact service scope should be verified using airport, date, flight and passenger details.',
    bn: 'JEL Meet & Greet airport arrival/departure-related assistance-এর service/co-brand। Airport, date, flight ও passenger details অনুযায়ী exact service scope যাচাই করতে হবে।',
    en: 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact scope should be verified using airport, date, flight, and passenger details.'
  },
  {
    id: 'brands', priority: 55,
    keywords: ['craft bangla','compliance','advisory','brand','co-brand','ক্রাফট বাংলা','কমপ্লায়েন্স','ব্র্যান্ড'],
    facts: 'Known verified JEL brands/co-brands: JEL Study Abroad; JEL Meet & Greet; JEL Compliance & Advisory; Craft Bangla.',
    bn: 'Verified JEL brand/co-brand-এর মধ্যে JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla রয়েছে।',
    en: 'Verified JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.'
  },
  {
    id: 'company', priority: 40,
    keywords: ['journey expert','jel','company','about','slogan','office','address','contact','phone','whatsapp','email','জার্নি এক্সপার্ট','কোম্পানি','স্লোগান','অফিস','ঠিকানা','যোগাযোগ','ফোন','হোয়াটসঅ্যাপ','ইমেইল'],
    facts: 'Journey Expert Limited (JEL), Bangladesh. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh. WhatsApp/Hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com. Public portals: journeyexpertltd.com and journeyexpertbd.com.',
    bn: 'Journey Expert Limited (JEL), Bangladesh। Slogan: “Your Journey, Our Expertise.” অফিস: ১৮৯/এ (২য় তলা), আব্দুল মতিন কমপ্লেক্স, হাজী মরণ আলী রোড, নাবিস্কো মোড়, তেজগাঁও, ঢাকা-১২১৫। WhatsApp/Hotline: +8801926400400; Telephone: +8802 9830404; Email: journeyexpertbd@gmail.com।',
    en: 'Journey Expert Limited (JEL), Bangladesh. Slogan: “Your Journey, Our Expertise.” Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. WhatsApp/Hotline: +8801926400400; Telephone: +8802 9830404; Email: journeyexpertbd@gmail.com.'
  }
];

function retrieveJelKnowledge(query) {
  const normalized = String(query || '').toLocaleLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
  const scored = JEL_SEMANTIC_KNOWLEDGE
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce((total, keyword) => normalized.includes(keyword.toLocaleLowerCase()) ? total + (keyword.includes(' ') ? 4 : 1) : total, 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => (b.entry.priority - a.entry.priority) || (b.score - a.score));
  const primary = scored[0]?.entry || null;
  const selected = scored.slice(0, 3).map((item) => item.entry);
  return {
    primary,
    ids: selected.map((entry) => entry.id),
    text: selected.length
      ? selected.map((entry) => '[' + entry.id + '] ' + entry.facts).join('\n')
      : '[no_verified_match] No exact JEL knowledge entry matched. Do not invent a JEL-specific fact.',
  };
}

function semanticFallback(language, message) {
  const retrieved = retrieveJelKnowledge(message);
  const reply = retrieved.primary
    ? (language === 'bn' ? retrieved.primary.bn : retrieved.primary.en)
    : (language === 'bn'
      ? 'আপনার প্রশ্নের নির্দিষ্ট তথ্যটি বর্তমান verified JEL knowledge-এ নেই। ভুল তথ্য দেওয়ার বদলে এই অংশটি verify করা প্রয়োজন।'
      : 'That specific detail is not present in the current verified JEL knowledge. Rather than invent an answer, that detail needs to be verified.');
  return {
    reply,
    primaryIntent: retrieved.primary?.id || 'unverified',
    groundingIds: retrieved.ids,
  };
}

function fallback(language: 'bn' | 'en', message = '') { return semanticFallback(language, message); }

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid_json' }, 400); }

  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 6000) : '';
  if (!message) return json({ error: 'message_required' }, 400);

  const language = detectLanguage(message, body?.language);
  const retrievedKnowledge = retrieveJelKnowledge(message);
  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();
  if (!key) return json({ ...fallback(language, message), language, mode: 'fallback' });

  const history = Array.isArray(body?.history)
    ? body.history
        .filter((turn: any) => turn && typeof turn.content === 'string' && turn.content.trim())
        .slice(-10)
        .map((turn: any) => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.content.trim().slice(0, 2000) }],
        }))
    : [];

  const languageInstruction = language === 'bn'
    ? 'Reply in natural professional Bengali script. Keep brand names and technical terms in English where natural.'
    : 'Reply in concise professional English.';

  const system = `You are Angela, the official AI Assistant of Journey Expert Ltd. in Bangladesh.

VERIFIED JEL SOURCE OF TRUTH:
${VERIFIED_JEL}

RULES:
- Answer the user's actual question first.
- For Journey Expert Ltd. questions, the verified JEL facts above have priority. Never invent company facts, partnerships, prices, live inventory, booking status, payment status, visa outcomes, admission outcomes, scholarship outcomes, or processing times.
- When a query mentions Hajj or Umrah together with visa, hotel, flight, package, transport, Nusuk, permit, Makkah, Madinah or Ziyarat, treat Hajj/Umrah as the primary service context.
- You may answer general knowledge questions professionally using the model's knowledge.
- When a fact is current, time-sensitive, or may have changed, only call it current if Google Search grounding is enabled in this request; otherwise say it should be verified from the relevant official source.
- Never guarantee visa approval, immigration outcome, admission, scholarship, fare, seat, hotel inventory, refund, or consular decision.
- Never request passwords, OTPs, card numbers, bank credentials, or unnecessary sensitive document contents.
- Keep normal voice-friendly answers concise: usually 2-5 sentences unless the user asks for detail.
- Both journeyexpertltd.com and journeyexpertbd.com are JEL public portals. Answer verified JEL service questions directly on either portal instead of unnecessarily bouncing the user between sites.
- For detailed education counselling, journeyexpertbd.com is the dedicated JEL Study Abroad portal when useful.
${languageInstruction}\n\nRETRIEVED VERIFIED JEL CONTEXT:\n${retrievedKnowledge.text}\n\nSTRICT SEMANTIC ACCURACY CONTRACT:\n- For JEL-specific facts, use only the retrieved verified context.\n- If the exact JEL-specific fact is absent, say it is not verified; do not fill the gap from model memory.\n- Answer the exact service/topic asked about; do not substitute a neighbouring intent.\n- Changing facts such as price, inventory, rules, fees, dates and processing times require current official/supplier verification.`;

  const models = ['gemini-3.8-flash', 'gemini-3.5-flash'];
  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), model === 'gemini-3.8-flash' ? 9000 : 6500);
    try {
      const requestBody: any = {
        systemInstruction: { parts: [{ text: system }] },
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 720 },
      };
      if (model === 'gemini-3.8-flash') requestBody.generationConfig.thinkingConfig = { thinkingLevel: 'low' };
      const groundingEnabled = env.GOOGLE_SEARCH_GROUNDING === 'true';
      if (groundingEnabled) requestBody.tools = [{ google_search: {} }];

      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify(requestBody),
      });
      if (!upstream.ok) continue;

      const data: any = await upstream.json();
      const candidate = data?.candidates?.[0];
      const reply = candidate?.content?.parts
        ?.filter((part: any) => !part.thought && typeof part.text === 'string')
        .map((part: any) => part.text)
        .join('')
        .trim();

      if (!reply) continue;
      if (language === 'bn' && !/[\u0980-\u09FF]/.test(reply)) continue;
      if (language === 'en' && /[\u0980-\u09FF]/.test(reply)) continue;

      return json({
        reply,
        language,
        mode: 'ai',
        providerModel: model,
        grounded: Boolean(candidate?.groundingMetadata),
        primaryIntent: retrievedKnowledge.primary?.id || 'unverified',
        groundingIds: retrievedKnowledge.ids,
      });
    } catch {
      // Try the next bounded Gemini model.
    } finally {
      clearTimeout(timer);
    }
  }

  return json({ ...fallback(language, message), language, mode: 'fallback' });
}
