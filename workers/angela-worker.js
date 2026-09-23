const ALLOWED_ORIGIN = 'https://journeyexpertltd.com';
const PRIMARY_MODEL = 'gemini-3.8-flash';
const FALLBACK_MODEL = 'gemini-3.5-flash';
const GEMINI_TIMEOUT_MS = 8500;

const SYSTEM_PROMPT = `You are Angela, the official AI Travel and Mobility Assistant of Journey Expert Ltd. (JEL), Bangladesh, for the main website journeyexpertltd.com.
Answer the customer's actual question first, then ask at most one useful follow-up question. Reply only in the explicitly selected language: natural Bangla when language=bn, or English when language=en. Never reply in Hindi, Arabic, or any other language. Be warm, concise, professional, and easy to understand aloud.
Use only the retrieved JEL context and clearly identified general guidance. Never invent prices, schedules, availability, visa rules, processing times, admission results, booking status, or partner relationships. Never guarantee visa approval, admission, immigration, or refunds. Do not claim a booking, payment, quotation, reservation, or handoff is complete unless a connected system confirms it. Do not request passport numbers, card numbers, bank details, passwords, OTPs, or sensitive document contents. For case-specific, time-sensitive, booking, quotation, payment, complaint, urgent, complex visa, corporate, medical, or student-application requests, explain that a human consultant must review the request and set handoffRequired=true.
Return JSON only with keys: reply, language, intent, confidence, nextQuestion, lead, handoffRequired, handoffReason, usedSources.`;

const KNOWLEDGE = [
  { id: 'hajj_umrah', priority: 100, keywords: ['hajj','umrah','হজ','ওমরাহ','উমরাহ','makkah','madinah','মক্কা','মদিনা','nusuk','ziyarat','জিয়ারত','জিয়ারত'], text: 'JEL Hajj & Umrah scope: package planning, air-travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Exact price, availability, Saudi rules, quotas and dates require current official or supplier verification.', source: 'JEL Hajj and Umrah Service Guide' },
  { id: 'study_abroad', priority: 95, keywords: ['study abroad','student visa','student','study','university','admission','scholarship','sop','ielts','cas','coe','i-20','স্টাডি','স্টুডেন্ট','বিশ্ববিদ্যাল','অ্যাডমিশন','স্কলারশিপ'], text: 'JEL Study Abroad supports profile assessment, country/course/university selection, admissions, scholarship guidance, SOP, English-language tests, student-visa documents, and pre-/post-arrival guidance. Outcomes are not guaranteed.', source: 'JEL Study Abroad Service Guide' },
  { id: 'medical_tourism', priority: 92, keywords: ['medical tourism','medical visa','hospital','doctor','treatment','মেডিকেল ট্যুরিজম','মেডিকেল ভিসা','হাসপাতাল','ডাক্তার','চিকিৎসা'], text: 'JEL medical-tourism support can include hospital/doctor selection support, appointment coordination and travel preparation. Treatment availability and outcomes require provider verification.', source: 'JEL Medical Tourism Service Guide' },
  { id: 'air_ticketing', priority: 88, keywords: ['air ticket','ticketing','flight','fare','reissue','refund','ticket','টিকিট','ফ্লাইট','ফেয়ার','ফেয়ার','রিইস্যু','রিফান্ড'], text: 'JEL supports air tickets, fare quotation, reissue and refund. Live fare, seats, schedules, baggage and change/refund rules require current supplier verification.', source: 'JEL Air Ticketing Service Guide' },
  { id: 'visa', priority: 80, keywords: ['visa','embassy','immigration','ভিসা','এম্বাসি','ইমিগ্রেশন'], text: 'JEL provides visa-document assistance. Current requirements, fees, processing times, eligibility and decisions require official verification. JEL never guarantees approval.', source: 'JEL Visa Guidance Policy' },
  { id: 'tours_hotels', priority: 72, keywords: ['tour package','travel package','tour','hotel','package','holiday','ট্যুর','হোটেল','প্যাকেজ','ভ্রমণ'], text: 'JEL supports tours, hotels and travel packages. Live availability and prices require supplier verification.', source: 'JEL Tours and Hotels Guide' },
  { id: 'halal_tourism', priority: 70, keywords: ['halal tourism','halal travel','হালাল ট্যুরিজম'], text: 'JEL supports halal-tourism planning around destination, dates, group size and halal-friendly preferences. Live availability requires verification.', source: 'JEL Halal Tourism Guide' },
  { id: 'corporate_travel', priority: 68, keywords: ['corporate travel','business travel','corporate','কর্পোরেট'], text: 'JEL corporate-travel support includes business-travel planning, ticketing coordination, hotel support, itinerary assistance and travel workflow support.', source: 'JEL Corporate Travel Guide' },
  { id: 'insurance', priority: 66, keywords: ['travel insurance','insurance','ইন্স্যুরেন্স','বীমা'], text: 'JEL provides travel-insurance assistance. Coverage, premium and eligibility depend on insurer and trip and require case-specific verification.', source: 'JEL Travel Insurance Guide' },
  { id: 'meet_greet', priority: 64, keywords: ['meet & greet','meet and greet','airport assistance','airport support','মিট অ্যান্ড গ্রিট'], text: 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact scope depends on airport, date, flight and passenger details.', source: 'JEL Meet & Greet Guide' },
  { id: 'brands', priority: 55, keywords: ['craft bangla','compliance','advisory','brand','co-brand','ক্রাফট বাংলা','ব্র্যান্ড'], text: 'Verified JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.', source: 'JEL Brand Catalogue' },
  { id: 'company', priority: 40, keywords: ['journey expert','jel','company','about','slogan','office','address','contact','phone','whatsapp','email','জার্নি এক্সপার্ট','কোম্পানি','অফিস','ঠিকানা','যোগাযোগ'], text: 'Journey Expert Limited (JEL), Bangladesh. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. WhatsApp/Hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.', source: 'JEL Company Profile' },
];

function languageOf(text, requested) {
  if (requested === 'bn' || requested === 'en') return requested;
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/\b(ami|apni|chai|jabo|jete|koto|kivabe|ki|dhaka|dubai|visa|ticket|hobe|korbo|lagbe|den)\b/i.test(text)) return 'bn';
  return 'en';
}

function contextFor(query) {
  const normalized = String(query || '').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  const matches = KNOWLEDGE
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce((total, keyword) => normalized.includes(keyword.toLocaleLowerCase()) ? total + (keyword.includes(' ') ? 4 : 1) : total, 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => (b.score - a.score) || (b.entry.priority - a.entry.priority))
    .slice(0, 3);
  if (!matches.length) return { primary: null, ids: [], text: 'No exact JEL knowledge entry matched. Do not invent a JEL-specific fact.' };
  return {
    primary: matches[0].entry,
    ids: matches.map((item) => item.entry.id),
    text: matches.map((item) => '[' + item.entry.source + '] ' + item.entry.text).join('\n'),
  };
}

function safeLead(value) {
  if (!value || typeof value !== 'object') return {};
  const keys = ['destination', 'purpose', 'travelDate', 'travellers', 'duration', 'budget', 'service', 'name', 'phone', 'email'];
  return Object.fromEntries(keys.map((key) => [key, typeof value[key] === 'string' ? value[key].trim().slice(0, 240) : '']));
}

function fallback(message, language) {
  const bangla = language === 'bn';
  const retrieved = contextFor(message);
  const id = retrieved.primary?.id || 'unverified';
  const replies = {
    hajj_umrah: bangla ? 'Journey Expert Limited হজ ও ওমরাহ বিষয়ে package planning, air travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination এবং visa/document guidance-এ সহায়তা করে। নির্দিষ্ট price, availability ও Saudi rules current official source বা supplier থেকে যাচাই করতে হবে।' : 'Journey Expert Limited supports Hajj and Umrah package planning, air travel, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Current prices, availability, and Saudi rules must be verified.',
    study_abroad: bangla ? 'JEL Study Abroad profile assessment, দেশ/কোর্স/বিশ্ববিদ্যালয় নির্বাচন, admission ও scholarship guidance, SOP, English-language test guidance, student-visa documents এবং pre-departure/post-arrival guidance দেয়।' : 'JEL Study Abroad supports profile assessment, country/course/university selection, admissions and scholarship guidance, SOP, English-language tests, student-visa documents, and pre-/post-arrival guidance.',
    medical_tourism: bangla ? 'Journey Expert Limited medical-tourism support-এ hospital/doctor selection support, appointment coordination এবং travel preparation-এ সহায়তা করতে পারে।' : 'Journey Expert Limited can support medical-tourism enquiries with hospital/doctor selection support, appointment coordination, and travel preparation.',
    air_ticketing: bangla ? 'Journey Expert Limited air ticketing, fare quotation, reissue এবং refund support দেয়। Live fare, seat ও rules supplier data থেকে যাচাই করতে হবে।' : 'Journey Expert Limited provides air ticketing, fare quotation, reissue, and refund support. Live fares, seats, and rules require supplier verification.',
    visa: bangla ? 'Journey Expert Limited visa-document assistance দেয়। Current requirements, fee, processing time, eligibility ও decision official source থেকে যাচাই করতে হবে; JEL approval গ্যারান্টি দেয় না।' : 'Journey Expert Limited provides visa-document assistance. Current requirements, fees, processing times, eligibility, and decisions require official verification; JEL never guarantees approval.',
    tours_hotels: bangla ? 'Journey Expert Limited tours, hotels এবং travel package support দেয়। Live availability ও price supplier থেকে যাচাই করতে হবে।' : 'Journey Expert Limited supports tours, hotels, and travel packages. Live availability and prices require supplier verification.',
    halal_tourism: bangla ? 'Journey Expert Limited halal-tourism support দেয়; live availability যাচাই করতে হবে।' : 'Journey Expert Limited supports halal-tourism planning; live availability requires verification.',
    corporate_travel: bangla ? 'Journey Expert Limited corporate travel management-এ business-travel planning, ticketing coordination, hotel support ও itinerary assistance দেয়।' : 'Journey Expert Limited supports corporate travel with business-travel planning, ticketing coordination, hotel support, and itinerary assistance.',
    insurance: bangla ? 'Journey Expert Limited travel-insurance assistance দেয়। Coverage, premium ও eligibility case-specificভাবে যাচাই করতে হবে।' : 'Journey Expert Limited provides travel-insurance assistance. Coverage, premium, and eligibility require case-specific verification.',
    meet_greet: bangla ? 'JEL Meet & Greet airport arrival/departure-related assistance-এর service/co-brand।' : 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance.',
    brands: bangla ? 'Verified JEL brand/co-brand-এর মধ্যে JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla রয়েছে।' : 'Verified JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.',
    company: bangla ? 'Journey Expert Limited-এর অফিস: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215। WhatsApp/Hotline: +8801926400400; Telephone: +8802 9830404; Email: journeyexpertbd@gmail.com।' : 'Journey Expert Limited office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. WhatsApp/Hotline: +8801926400400; Telephone: +8802 9830404; Email: journeyexpertbd@gmail.com.',
    unverified: bangla ? 'আপনার প্রশ্নের নির্দিষ্ট তথ্যটি বর্তমান verified JEL knowledge-এ নেই। ভুল তথ্য দেওয়ার বদলে এই অংশটি verify করা প্রয়োজন।' : 'That specific detail is not present in the current verified JEL knowledge. Rather than invent an answer, that detail needs verification.',
  };
  return {
    reply: replies[id] || replies.unverified,
    language,
    intent: id,
    confidence: retrieved.primary ? 0.9 : 0.3,
    nextQuestion: '',
    lead: {},
    handoffRequired: id === 'unverified',
    handoffReason: id === 'unverified' ? 'The exact JEL-specific fact is not in the verified knowledge.' : '',
    usedSources: retrieved.primary ? [retrieved.primary.source] : ['JEL semantic safe fallback'],
    groundingIds: retrieved.ids,
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'access-control-allow-origin': ALLOWED_ORIGIN, 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'Content-Type' } });
}

async function fetchWithTimeout(url, options, timeoutMs = GEMINI_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini(env, model, message, language, history) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
  const contents = [...(Array.isArray(history) ? history : []).slice(-12).map((turn) => ({ role: turn && turn.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(turn && turn.content || '').slice(0, 2000) }] })), { role: 'user', parts: [{ text: message }] }];
  const response = await fetchWithTimeout(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: `${SYSTEM_PROMPT}\n\nRetrieved verified JEL context:\n${contextFor(message).text}\n\nSTRICT SEMANTIC ACCURACY CONTRACT:\n- Use only retrieved context for JEL-specific facts.\n- If the exact JEL fact is absent, say it is not verified; never fill the gap from model memory.\n- Do not substitute a neighbouring intent.\nLanguage hint: ${language}` }] }, contents, generationConfig: { temperature: 0.25, responseMimeType: 'application/json' } }) });
  if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
  if (!text) throw new Error('Gemini returned no text');
  const parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim());
  if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) throw new Error('Gemini JSON omitted reply');
  return { reply: parsed.reply.trim().slice(0, 4000), language, intent: typeof parsed.intent === 'string' ? parsed.intent.slice(0, 100) : 'GENERAL_TRAVEL_ENQUIRY', confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0.6)), nextQuestion: typeof parsed.nextQuestion === 'string' ? parsed.nextQuestion.slice(0, 500) : '', lead: safeLead(parsed.lead), handoffRequired: parsed.handoffRequired === true, handoffReason: typeof parsed.handoffReason === 'string' ? parsed.handoffReason.slice(0, 500) : '', usedSources: Array.isArray(parsed.usedSources) ? parsed.usedSources.filter((item) => typeof item === 'string').slice(0, 8) : ['JEL Service Catalogue'] };
}


function pcmToWav(pcm) {
  const output = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(output);
  const bytes = new Uint8Array(output);
  const label = (offset, value) => { for (let i = 0; i < value.length; i++) bytes[offset + i] = value.charCodeAt(i); };
  label(0, 'RIFF'); view.setUint32(4, 36 + pcm.length, true); label(8, 'WAVE');
  label(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, 24000, true); view.setUint32(28, 48000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  label(36, 'data'); view.setUint32(40, pcm.length, true); bytes.set(pcm, 44);
  return output;
}

async function handleFemaleTts(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }
  const text = String(body?.text || '').trim().slice(0, 1200);
  if (!text) return json({ error: 'Text is required' }, 400);
  const key = String(env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'voice_not_configured' }, 503);

  const model = env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  const findAudio = (value) => {
    if (!value || typeof value !== 'object') return null;
    if (value.type === 'audio' && typeof value.data === 'string') {
      return { data: value.data, mimeType: value.mime_type || value.mimeType };
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findAudio(item);
        if (found) return found;
      }
      return null;
    }
    for (const item of Object.values(value)) {
      const found = findAudio(item);
      if (found) return found;
    }
    return null;
  };

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        model,
        input: 'Speak the following transcript exactly in its original language, naturally, warmly, and clearly. Do not translate, summarize, answer, or add words:\n' + text,
        response_format: { type: 'audio' },
        generation_config: {
          speech_config: [{ voice: 'Kore' }],
        },
      }),
    });
    if (!response.ok) {
      return json({ error: response.status === 429 ? 'voice_quota_exceeded' : 'voice_provider_unavailable' }, response.status === 429 ? 429 : 502);
    }
    const data = await response.json();
    const audio = findAudio(data);
    if (!audio?.data) return json({ error: 'invalid_audio' }, 502);
    const raw = Uint8Array.from(atob(audio.data), ch => ch.charCodeAt(0));
    const wav = pcmToWav(raw);
    return new Response(wav, {
      status: 200,
      headers: {
        'content-type': 'audio/wav',
        'cache-control': 'no-store',
        'access-control-allow-origin': ALLOWED_ORIGIN,
        'x-content-type-options': 'nosniff',
      },
    });
  } catch {
    return json({ error: controller.signal.aborted ? 'voice_timeout' : 'voice_provider_unavailable' }, 503);
  } finally {
    clearTimeout(timer);
  }
}

async function handleLiveToken(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const origin = request.headers.get('origin');
  const url = new URL(request.url);
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  const key = String(env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'live_voice_not_configured' }, 503);

  const expireTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const newSessionExpireTime = new Date(Date.now() + 60 * 1000).toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        uses: 1,
        expireTime,
        newSessionExpireTime,
        liveConnectConstraints: {
          model: 'models/gemini-3.8-live',
          config: {
            sessionResumption: {},
            responseModalities: ['AUDIO'],
          },
        },
      }),
    });
    if (!upstream.ok) {
      return json({ error: upstream.status === 429 ? 'live_voice_quota_exceeded' : 'live_voice_unavailable' }, upstream.status === 429 ? 429 : 502);
    }
    const data = await upstream.json();
    const token = typeof data?.name === 'string' ? data.name : '';
    if (!token) return json({ error: 'live_voice_unavailable' }, 502);
    return json({ token, model: 'gemini-3.8-live', expiresAt: expireTime });
  } catch {
    return json({ error: controller.signal.aborted ? 'live_voice_timeout' : 'live_voice_unavailable' }, 503);
  } finally {
    clearTimeout(timer);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { 'access-control-allow-origin': ALLOWED_ORIGIN, 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'Content-Type' } });
    if (url.pathname === '/api/health' || url.pathname === '/api/healthz' || url.pathname === '/api/ai/health') return json({ status: 'online', service: 'Angela API Gateway', version: '4.2.0-final-female', aiConfigured: Boolean(env.GEMINI_API_KEY), femaleTtsConfigured: Boolean(env.GEMINI_API_KEY), models: [env.GEMINI_MODEL || PRIMARY_MODEL, env.GEMINI_FALLBACK_MODEL || FALLBACK_MODEL], timestamp: new Date().toISOString() });
    if (url.pathname === '/api/voice/gemini') return handleFemaleTts(request, env);
    if (url.pathname === '/api/gemini/live-token') return handleLiveToken(request, env);
    if (url.pathname !== '/api/ai-assistant' && url.pathname !== '/api/ai/voice-agent') return json({ error: 'Not found' }, 404);
    const action = url.searchParams.get('action');
    if (action === 'speech') return handleFemaleTts(request, env);
    if (action === 'live-token') return handleLiveToken(request, env);
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }
    const message = String(body?.message || body?.prompt || '').trim().slice(0, 4000);
    if (!message) return json({ error: 'Message is required' }, 400);
    const language = languageOf(message, body?.language);
    const conversationId = typeof body?.conversationId === 'string'
      ? body.conversationId.trim().slice(0, 120)
      : `angela-${Date.now()}`;
    const history = Array.isArray(body?.history)
      ? body.history
          .filter((turn) => turn && typeof turn === 'object')
          .map((turn) => ({
            role: turn.role === 'assistant' ? 'assistant' : 'user',
            content: String(turn.content || '').trim().slice(0, 2000),
          }))
          .filter((turn) => turn.content)
          .slice(-12)
      : [];
    let payload = null;
    if (env.GEMINI_API_KEY) {
      for (const model of [env.GEMINI_MODEL || PRIMARY_MODEL, env.GEMINI_FALLBACK_MODEL || FALLBACK_MODEL]) {
        try { payload = await callGemini(env, model, message, language, history); break; } catch (error) { console.error(`Angela model failed: ${model}`, error); }
      }
    }
    payload ||= fallback(message, language);
    if (payload.handoffRequired && env.HANDOFF_WEBHOOK_URL) {
      const handoffEvent = {
        event: 'angela.handoff',
        createdAt: new Date().toISOString(),
        conversationId,
        message,
        history,
        ai: payload,
        status: 'NEW',
      };
      ctx.waitUntil(fetchWithTimeout(env.HANDOFF_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(env.HANDOFF_WEBHOOK_SECRET ? { 'x-angela-webhook-secret': env.HANDOFF_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(handoffEvent),
      }, 5000).catch((error) => console.error('Handoff webhook failed', error)));
    }
    return json({ conversationId, ...payload, response: payload.reply, sources: payload.usedSources });
  },
};
