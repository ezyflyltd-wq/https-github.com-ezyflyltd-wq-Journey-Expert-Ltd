type Context = { request: Request; env: Record<string, string | undefined> };

// [approved-production-change] Bangla-only Angela speech-first and intent-specific fallback reviewed.

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  },
});

function outputLanguage(): 'bn' {
  return 'bn';
}

const VERIFIED_JEL = `
Journey Expert Ltd. (JEL), Bangladesh.
Slogan: "Your Journey, Our Expertise."
Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh.
WhatsApp/Hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.
Core services: air ticketing; fare quotation; reissue/refund support; visa-document assistance; tours and travel; hotels; Hajj and Umrah; halal tourism; medical tourism; travel insurance; corporate travel management; Meet & Greet; Study Abroad.
JEL Study Abroad services: profile assessment; country/course/university selection; admissions guidance; scholarships; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance.
Detailed Study Abroad portal: journeyexpertbd.com.
Main Journey Expert corporate portal: journeyexpertltd.com.
Known JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.
`;

function fallback(message: string) {
  const query = message.toLowerCase();
  const asksContact = /যোগাযোগ|ফোন|নাম্বার|হোয়াটসঅ্যাপ|ঠিকানা|অফিস|contact|phone|address|office/.test(query);
  const asksCompany = /journey expert|জার্নি এক্সপার্ট|company|কোম্পানি|about|কে তোমরা|কারা/.test(query);
  const asksStudy = /study|student|university|course|admission|scholarship|sop|ielts|masters|bachelor|স্টাডি|স্টুডেন্ট|বিশ্ববিদ্যাল|অ্যাডমিশন|স্কলারশিপ/.test(query);
  const asksVisa = /visa|ভিসা|embassy|এম্বাসি|document|ডকুমেন্ট/.test(query);
  const asksTicket = /ticket|flight|fare|reissue|refund|টিকিট|ফ্লাইট|ভাড়া|ফেয়ার|রিইস্যু|রিফান্ড/.test(query);
  const asksHajj = /hajj|umrah|হজ|ওমরাহ|উমরাহ/.test(query);
  const asksTour = /tour|hotel|package|ট্যুর|হোটেল|প্যাকেজ/.test(query);
  const asksMedical = /medical tourism|medical|মেডিকেল ট্যুরিজম|মেডিকেল/.test(query);
  const asksHalal = /halal tourism|halal|হালাল ট্যুরিজম|হালাল/.test(query);
  const asksCorporate = /corporate travel|corporate|কর্পোরেট/.test(query);
  const asksInsurance = /insurance|ইন্স্যুরেন্স|বীমা/.test(query);
  const asksMeet = /meet.*greet|meet & greet|মিট.*গ্রিট/.test(query);
  const asksBrand = /craft bangla|compliance|advisory|brand|ব্র্যান্ড|ক্রাফট বাংলা/.test(query);
  const asksGuarantee = /guarantee|guaranteed|গ্যারান্টি|নিশ্চিত|100%|১০০%/.test(query);

  if (asksGuarantee) return 'Journey Expert Limited ভিসা, admission, scholarship, fare, seat, hotel inventory, refund বা কোনো সরকারি/consular সিদ্ধান্তের গ্যারান্টি দেয় না। আমরা যাচাইকৃত তথ্য, document guidance, application/travel support এবং প্রয়োজনীয় coordination দিই; চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট কর্তৃপক্ষ বা supplier-এর।';
  if (asksContact) return 'Journey Expert Limited-এর অফিস: ১৮৯/এ (২য় তলা), আব্দুল মতিন কমপ্লেক্স, হাজী মরণ আলী রোড, নাবিস্কো মোড়, তেজগাঁও, ঢাকা-১২১৫। WhatsApp/হটলাইন: +8801926400400, টেলিফোন: +8802 9830404, ইমেইল: journeyexpertbd@gmail.com।';
  if (asksStudy) return 'JEL Study Abroad প্রোফাইল মূল্যায়ন, দেশ/কোর্স/বিশ্ববিদ্যালয় নির্বাচন, admission guidance, scholarship guidance, SOP, English-language test guidance, student-visa document preparation এবং pre-departure/post-arrival guidance দেয়। আপনার বর্তমান qualification ও পছন্দের দেশ বললে পরবর্তী ধাপ সাজিয়ে দিতে পারি।';
  if (asksVisa) return 'Journey Expert Limited tourist, business, medical ও student visa-document assistance দেয়। Checklist দেশ ও visa type অনুযায়ী বদলে যায়; passport, photo, financial evidence, academic/employment records ও travel-purpose evidence সাধারণভাবে লাগতে পারে। চূড়ান্ত requirement সংশ্লিষ্ট embassy বা official source থেকে যাচাই করতে হবে।';
  if (asksTicket) return 'Journey Expert Limited air ticketing, fare quotation, reissue এবং refund support দেয়। Live fare, seat availability ও booking status পরিবর্তনশীল, তাই destination, travel date এবং passenger count দিলে পরবর্তী verified quotation workflow বলা যাবে।';
  if (asksHajj) return 'Journey Expert Limited Hajj ও Umrah service দেয়। Package, flight, hotel এবং visa-related requirement সময়ভেদে বদলাতে পারে; intended travel period ও traveller count দিলে প্রয়োজনীয় পরবর্তী ধাপ বলা যাবে।';
  if (asksMedical) return 'Journey Expert Limited medical tourism support দেয়। Hospital/doctor selection, appointment coordination ও travel preparation-এ সহায়তা করা যায়; treatment availability বা medical outcome official provider-এর মাধ্যমে যাচাই করতে হবে।';
  if (asksHalal) return 'Journey Expert Limited halal tourism support দেয়। Destination, travel date, family/group size এবং halal-friendly preference অনুযায়ী trip framework সাজানো যায়; live supplier availability আলাদাভাবে যাচাই করতে হবে।';
  if (asksCorporate) return 'Journey Expert Limited corporate travel management দেয়—business travel planning, ticketing coordination, hotel support, itinerary assistance এবং corporate travel workflow-এর সহায়তা করা হয়। Route, traveller count ও company travel policy requirement দিলে আরও নির্দিষ্টভাবে বলা যাবে।';
  if (asksInsurance) return 'Journey Expert Limited travel insurance assistance দেয়। Coverage, premium ও eligibility insurer এবং trip অনুযায়ী পরিবর্তিত হয়; destination, trip duration এবং traveller age দিলে কোন তথ্যগুলো যাচাই করতে হবে তা বলতে পারি।';
  if (asksMeet) return 'JEL Meet & Greet হলো Journey Expert Limited-এর একটি service/co-brand। Airport arrival/departure support বা related assistance-এর প্রয়োজন হলে airport, date, flight এবং passenger details অনুযায়ী service scope যাচাই করা যায়।';
  if (asksBrand) return 'Journey Expert Limited-এর পরিচিত brand/co-brand-এর মধ্যে JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla রয়েছে। প্রতিটির service scope আলাদা; কোন brand সম্পর্কে জানতে চান বললে নির্দিষ্ট তথ্য দেব।';
  if (asksTour) return 'Journey Expert Limited tours, hotels এবং travel package support দেয়। Destination, approximate date, traveller count ও budget দিলে উপযোগী plan-এর কাঠামো দিতে পারি; live hotel/flight availability supplier থেকে যাচাই করতে হবে।';
  if (asksCompany) return 'Journey Expert Limited বাংলাদেশের একটি travel ও education service company। Slogan: “Your Journey, Our Expertise.” Core services-এর মধ্যে air ticketing, visa assistance, tours/hotels, Hajj & Umrah, halal tourism, medical tourism, insurance, corporate travel, Meet & Greet এবং Study Abroad রয়েছে।';
  return 'আমি অ্যাঞ্জেলা, Journey Expert Limited-এর বাংলা AI সহকারী। JEL-এর air ticketing, visa assistance, tours/hotels, Hajj & Umrah, halal tourism, medical tourism, insurance, corporate travel, Meet & Greet, Study Abroad এবং company information সম্পর্কে প্রশ্ন করুন—আমি প্রশ্ন অনুযায়ী নির্দিষ্ট উত্তর দেব।';
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid_json' }, 400); }

  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 6000) : '';
  if (!message) return json({ error: 'message_required' }, 400);

  const language = outputLanguage();
  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();
  if (!key) return json({ reply: fallback(message), language, mode: 'fallback' });

  const history = Array.isArray(body?.history)
    ? body.history
        .filter((turn: any) => turn && typeof turn.content === 'string' && turn.content.trim())
        .slice(-10)
        .map((turn: any) => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.content.trim().slice(0, 2000) }],
        }))
    : [];

  const languageInstruction = 'Always reply in natural professional Bengali script. The user may speak or type Bangla, Banglish, or English, but Angela must answer in Bengali. Keep brand names and technical terms in English where natural.';

  const system = `You are Angela, the official AI Assistant of Journey Expert Ltd. in Bangladesh.

VERIFIED JEL SOURCE OF TRUTH:
${VERIFIED_JEL}

RULES:
- Answer the user's actual question first.
- For Journey Expert Ltd. questions, the verified JEL facts above have priority. Never invent company facts, partnerships, prices, live inventory, booking status, payment status, visa outcomes, admission outcomes, scholarship outcomes, or processing times.
- You may answer general knowledge questions professionally using the model's knowledge.
- When a fact is current, time-sensitive, or may have changed, only call it current if Google Search grounding is enabled in this request; otherwise say it should be verified from the relevant official source.
- Never guarantee visa approval, immigration outcome, admission, scholarship, fare, seat, hotel inventory, refund, or consular decision.
- Never request passwords, OTPs, card numbers, bank credentials, or unnecessary sensitive document contents.
- Keep normal voice-friendly answers concise: usually 2-5 sentences unless the user asks for detail.
- Both journeyexpertltd.com and journeyexpertbd.com are JEL public portals. Answer verified JEL service questions directly on either portal instead of unnecessarily bouncing the user between sites.
- For detailed education counselling, journeyexpertbd.com is the dedicated JEL Study Abroad portal when useful.
${languageInstruction}`;

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
      if (!/[\u0980-\u09FF]/.test(reply)) continue;

      return json({
        reply,
        language,
        mode: 'ai',
        providerModel: model,
        grounded: Boolean(candidate?.groundingMetadata),
      });
    } catch {
      // Try the next bounded Gemini model.
    } finally {
      clearTimeout(timer);
    }
  }

  return json({ reply: fallback(message), language, mode: 'fallback' });
}
