const ALLOWED_ORIGIN = 'https://journeyexpertltd.com';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': ALLOWED_ORIGIN,
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'Content-Type',
    'x-content-type-options': 'nosniff',
  },
});

const languageFor = (value) => value === 'en' ? 'en' : 'bn';

const fallback = (language) => language === 'bn'
  ? 'আমি অ্যাঞ্জেলা, Journey Expert Ltd.-এর AI সহকারী। এয়ার টিকিট, ভিসা সহায়তা, ট্যুরস অ্যান্ড ট্রাভেলস, হজ ও ওমরাহ, মেডিকেল ও হালাল ট্যুরিজম, হোটেল, ইন্স্যুরেন্স এবং কর্পোরেট ট্রাভেল সম্পর্কে সাহায্য করতে পারি। আপনার গন্তব্য, তারিখ ও প্রয়োজনীয় সার্ভিস লিখুন।'
  : "I am Angela, Journey Expert Ltd.'s AI assistant. I can help with air tickets, visa assistance, tours and travel, Hajj and Umrah, medical and halal tourism, hotels, insurance and corporate travel. Please share your destination, date and required service.";

const pcmToWav = (pcm) => {
  const output = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(output);
  const bytes = new Uint8Array(output);
  const label = (offset, value) => { for (let i = 0; i < value.length; i += 1) bytes[offset + i] = value.charCodeAt(i); };
  label(0, 'RIFF'); view.setUint32(4, 36 + pcm.length, true); label(8, 'WAVE');
  label(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, 24000, true);
  view.setUint32(28, 48000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  label(36, 'data'); view.setUint32(40, pcm.length, true); bytes.set(pcm, 44);
  return output;
};

async function readJson(request) {
  const text = await request.text();
  if (new TextEncoder().encode(text).length > 32768) throw new Error('too_large');
  return JSON.parse(text);
}

async function chat(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await readJson(request); } catch { return json({ error: 'invalid_json' }, 400); }
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 5000) : '';
  if (!message) return json({ error: 'message_required' }, 400);
  const language = languageFor(body?.language);
  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();
  if (!key) return json({ reply: fallback(language), language, mode: 'fallback' });

  const system = `You are Angela, the official female AI Travel Assistant of Journey Expert Ltd. (JEL), Bangladesh, on journeyexpertltd.com.
Use these verified JEL facts as your corporate source of truth: slogan "Your Journey, Our Expertise."; office 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh; WhatsApp/hotline +8801926400400; telephone +8802 9830404; email journeyexpertbd@gmail.com. Core services: air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, and study-abroad guidance. Detailed education support is also available through JEL Study Abroad at journeyexpertbd.com.
Answer only in ${language === 'bn' ? 'natural Bengali script' : 'professional English'}, matching the language explicitly selected in the interface. Never switch to Hindi, Arabic, or another language.
Answer the customer's actual question first. For a voice request, normally use 2-4 short sentences and no more than about 90 spoken words unless the customer explicitly asks for detail. Ask at most one useful follow-up question.
Never invent or imply live fares, schedules, seats, hotel inventory, package availability, visa rules, fees, processing times, embassy decisions, university partnerships, admission results, scholarships, payments, bookings, or refunds. If information is current, case-specific, or not present in the verified JEL facts, say it requires verification from the relevant official/source system or a JEL consultant. Do not request passport numbers, card/bank details, passwords, OTPs, or sensitive document contents.`;

  const history = Array.isArray(body?.history)
    ? body.history
        .filter((turn) => turn && typeof turn === 'object' && typeof turn.content === 'string' && turn.content.trim())
        .slice(-8)
        .map((turn) => ({ role: turn.role === 'assistant' ? 'model' : 'user', parts: [{ text: turn.content.trim().slice(0, 1800) }] }))
    : [];
  const models = [env.GEMINI_MODEL, 'gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-flash-lite'].filter(Boolean);
  for (const model of [...new Set(models)]) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    try {
      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [...history, { role: 'user', parts: [{ text: message }] }],
          generationConfig: { temperature: 0.15, maxOutputTokens: 360 },
        }),
      });
      if (!upstream.ok) continue;
      const data = await upstream.json();
      const reply = data?.candidates?.[0]?.content?.parts?.filter((part) => !part.thought).map((part) => part.text || '').join('').trim();
      if (!reply) continue;
      if (language === 'bn' && !/[\u0980-\u09FF]/.test(reply)) continue;
      if (language === 'en' && /[\u0980-\u09FF]/.test(reply)) continue;
      return json({ reply, language, mode: 'ai', providerModel: model });
    } catch {
      // Try the next bounded model.
    } finally {
      clearTimeout(timer);
    }
  }
  return json({ reply: fallback(language), language, mode: 'fallback' });
}

async function speech(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await readJson(request); } catch { return json({ error: 'invalid_json' }, 400); }
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, 1200) : '';
  const language = languageFor(body?.language);
  if (!text) return json({ error: 'text_required' }, 400);
  const key = (env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'female_voice_not_configured' }, 503);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const model = env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Speak this ${language === 'bn' ? 'Bengali' : 'English'} transcript exactly, warmly and clearly. Do not translate or add words:\n${text}` }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      }),
    });
    if (!upstream.ok) return json({ error: upstream.status === 429 ? 'voice_quota_exceeded' : 'female_voice_unavailable' }, upstream.status === 429 ? 429 : 502);
    const data = await upstream.json();
    const audio = data?.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data)?.inlineData;
    if (!audio?.data) return json({ error: 'invalid_audio' }, 502);
    const raw = Uint8Array.from(atob(audio.data), (character) => character.charCodeAt(0));
    return new Response(pcmToWav(raw), {
      headers: {
        'content-type': 'audio/wav',
        'cache-control': 'no-store',
        'access-control-allow-origin': ALLOWED_ORIGIN,
        'x-content-type-options': 'nosniff',
      },
    });
  } catch {
    return json({ error: controller.signal.aborted ? 'female_voice_timeout' : 'female_voice_unavailable' }, 503);
  } finally {
    clearTimeout(timer);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': ALLOWED_ORIGIN,
        'access-control-allow-methods': 'GET,POST,OPTIONS',
        'access-control-allow-headers': 'Content-Type',
      },
    });
    if (url.pathname === '/api/ai/voice-agent' || url.pathname === '/api/ai-assistant') return chat(request, env);
    if (url.pathname === '/api/voice/gemini') return speech(request, env);
    if (url.pathname === '/api/health' || url.pathname === '/api/healthz') return json({
      status: 'online',
      service: 'JEL Angela Pages Worker',
      languages: ['bn', 'en'],
      femaleVoiceConfigured: Boolean(env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY),
    });
    return env.ASSETS.fetch(request);
  },
};
