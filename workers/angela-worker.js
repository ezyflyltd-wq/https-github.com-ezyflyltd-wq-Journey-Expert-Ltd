const ALLOWED_ORIGIN = 'https://journeyexpertltd.com';
const PRIMARY_MODEL = 'gemini-3.7-flash';
const FALLBACK_MODEL = 'gemini-3.6-flash';
const GEMINI_TIMEOUT_MS = 18000;

const SYSTEM_PROMPT = `You are Angela, the official AI Travel and Education Assistant of Journey Expert Ltd. (JEL), Bangladesh.
Answer the customer's actual question first, then ask at most one useful follow-up question. Reply in natural Bangla for Bangla or Banglish, English for English, and Arabic only when requested. Be warm, concise, professional, and easy to understand aloud.
Use only the retrieved JEL context and clearly identified general guidance. Never invent prices, schedules, availability, visa rules, processing times, admission results, booking status, or partner relationships. Never guarantee visa approval, admission, immigration, or refunds. Do not claim a booking, payment, quotation, reservation, or handoff is complete unless a connected system confirms it. Do not request passport numbers, card numbers, bank details, passwords, OTPs, or sensitive document contents. For case-specific, time-sensitive, booking, quotation, payment, complaint, urgent, complex visa, corporate, medical, or student-application requests, explain that a human consultant must review the request and set handoffRequired=true.
Return JSON only with keys: reply, language, intent, confidence, nextQuestion, lead, handoffRequired, handoffReason, usedSources.`;

const KNOWLEDGE = [
  ['service', 'Journey Expert Ltd. can assist with air tickets, hotels, tours, visa-document guidance, Hajj and Umrah, study abroad, medical, halal, corporate, group, and travel-insurance enquiries.', 'JEL Service Catalogue'],
  ['flight ticket বিমান ফ্লাইট টিকেট', 'JEL can assist with domestic and international air-ticket enquiries. Fare, seats, baggage, cancellation, reissue, and refund terms depend on live supplier rules and must be verified before purchase.', 'JEL Air Ticketing Service Guide'],
  ['hotel হোটেল room রুম', 'JEL can assist with hotel enquiries. Availability, room type, meal plan, cancellation, check-in, and price depend on dates, occupancy, category, and live inventory.', 'JEL Hotel Service Guide'],
  ['tour package ভ্রমণ ট্যুর প্যাকেজ dubai malaysia thailand singapore maldives', 'JEL can help plan destination tours and packages. A suitable option depends on destination, purpose, dates, travellers, duration, budget, hotel, flights, and visa needs.', 'JEL Tour Service Guide'],
  ['visa ভিসা embassy immigration', 'JEL can provide general visa-document guidance, but rules change and approval is decided by the relevant authority. Current requirements, fees, processing times, and eligibility must be verified from an official source.', 'JEL Visa Guidance Policy'],
  ['study student university ielts admission পড়াশোনা স্টুডেন্ট বিশ্ববিদ্যালয়', 'JEL can guide study-abroad enquiries. Country, subject, academic qualification, graduation year, English proficiency, intake, and budget are useful. Admission and visa outcomes cannot be guaranteed.', 'JEL Study Abroad Service Guide'],
  ['hajj umrah হজ ওমরাহ মক্কা মদিনা', 'JEL can assist with Hajj and Umrah enquiries, including packages, travel, accommodation, transport, and visa guidance. Price and availability must be confirmed for the requested season.', 'JEL Hajj and Umrah Service Guide'],
];

function languageOf(text, requested) {
  if (['bn', 'en', 'ar'].includes(requested)) return requested;
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/\b(ami|apni|chai|jabo|jete|koto|kivabe|ki|dhaka|dubai|visa|ticket|hobe|korbo|lagbe|den)\b/i.test(text)) return 'bn';
  return 'en';
}

function contextFor(query) {
  const normalized = query.toLocaleLowerCase();
  const matches = KNOWLEDGE.map(([keywords, text, source]) => ({ keywords, text, source, score: keywords.split(' ').filter((k) => normalized.includes(k)).length }))
    .filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  return matches.length ? matches.map((item) => `[${item.source}] ${item.text}`).join('\n') : 'No specific JEL knowledge entry matched. Do not invent an answer; explain what can be verified and offer human support.';
}

function safeLead(value) {
  if (!value || typeof value !== 'object') return {};
  const keys = ['destination', 'purpose', 'travelDate', 'travellers', 'duration', 'budget', 'service', 'name', 'phone', 'email'];
  return Object.fromEntries(keys.map((key) => [key, typeof value[key] === 'string' ? value[key].trim().slice(0, 240) : '']));
}

function fallback(message, language) {
  const bangla = language === 'bn';
  const visaRequest = /visa|embassy|immigration|eligib|fee|ভিসা|এম্বেসি|ইমিগ্রেশন|যোগ্যতা|ফি/i.test(message);
  if (visaRequest) {
    return {
      reply: bangla
        ? 'ভিসার নিয়ম, ফি এবং যোগ্যতা পরিবর্তনশীল; তাই বর্তমান তথ্য সংশ্লিষ্ট সরকারি উৎস থেকে যাচাই করা প্রয়োজন। আপনার কেসটি সঠিকভাবে পর্যালোচনা করার জন্য Journey Expert-এর একজন ভিসা কনসালট্যান্টের সহায়তা নিন: +880 1926-400400।'
        : 'Visa rules, fees, and eligibility can change and must be verified with the relevant official source. A Journey Expert visa consultant should review your case; contact +880 1926-400400.',
      language, intent: 'visa_info', confidence: 0.62,
      nextQuestion: bangla ? 'আপনি কোন দেশে, কোন উদ্দেশ্যে এবং আনুমানিক কবে ভ্রমণ করতে চান?' : 'Which country, purpose, and approximate travel date should we review?',
      lead: {}, handoffRequired: true,
      handoffReason: 'Current visa information and case-specific eligibility require official verification and human consultant review.',
      usedSources: ['JEL Visa Guidance Policy'],
    };
  }
  return {
    reply: bangla ? `আমি আপনার প্রশ্নটি বুঝেছি। নির্ভুলভাবে সাহায্য করতে গন্তব্য, ভ্রমণের তারিখ এবং কোন service প্রয়োজন তা জানাবেন? quotation বা booking যাচাই করতে Journey Expert consultant-এর সঙ্গে কথা বলুন: +880 1926-400400।` : `I understand your question. Please share your destination, travel date, and required service so I can guide you accurately. For a verified quotation or booking, contact a Journey Expert consultant at +880 1926-400400.`,
    language, intent: 'GENERAL_TRAVEL_ENQUIRY', confidence: 0.45,
    nextQuestion: bangla ? 'আপনার গন্তব্য, ভ্রমণের তারিখ এবং কোন service প্রয়োজন?' : 'What is your destination, travel date, and required service?',
    lead: {}, handoffRequired: false, handoffReason: '', usedSources: ['JEL safe fallback'],
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
  const response = await fetchWithTimeout(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: `${SYSTEM_PROMPT}\n\nRetrieved JEL context:\n${contextFor(message)}\n\nLanguage hint: ${language}` }] }, contents, generationConfig: { temperature: 0.25, responseMimeType: 'application/json' } }) });
  if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
  if (!text) throw new Error('Gemini returned no text');
  const parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim());
  if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) throw new Error('Gemini JSON omitted reply');
  return { reply: parsed.reply.trim().slice(0, 4000), language: ['bn', 'en', 'ar'].includes(parsed.language) ? parsed.language : language, intent: typeof parsed.intent === 'string' ? parsed.intent.slice(0, 100) : 'GENERAL_TRAVEL_ENQUIRY', confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0.6)), nextQuestion: typeof parsed.nextQuestion === 'string' ? parsed.nextQuestion.slice(0, 500) : '', lead: safeLead(parsed.lead), handoffRequired: parsed.handoffRequired === true, handoffReason: typeof parsed.handoffReason === 'string' ? parsed.handoffReason.slice(0, 500) : '', usedSources: Array.isArray(parsed.usedSources) ? parsed.usedSources.filter((item) => typeof item === 'string').slice(0, 8) : ['JEL Service Catalogue'] };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { 'access-control-allow-origin': ALLOWED_ORIGIN, 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'Content-Type' } });
    if (url.pathname === '/api/health' || url.pathname === '/api/healthz' || url.pathname === '/api/ai/health') return json({ status: 'online', service: 'Angela API Gateway', version: '4.0.0', aiConfigured: Boolean(env.GEMINI_API_KEY), models: [env.GEMINI_MODEL || PRIMARY_MODEL, env.GEMINI_FALLBACK_MODEL || FALLBACK_MODEL], timestamp: new Date().toISOString() });
    if (url.pathname !== '/api/ai-assistant' && url.pathname !== '/api/ai/voice-agent') return json({ error: 'Not found' }, 404);
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
