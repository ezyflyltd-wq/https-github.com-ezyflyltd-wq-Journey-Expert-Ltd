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

async function liveToken(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const origin = request.headers.get('origin');
  const url = new URL(request.url);
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);
  const key = (env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'live_voice_not_configured' }, 503);

  const model = 'gemini-3.8-live';
  const expireTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const newSessionExpireTime = new Date(Date.now() + 2 * 60 * 1000).toISOString();
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
          model: `models/${model}`,
          config: { sessionResumption: {}, responseModalities: ['AUDIO'] },
        },
      }),
    });
    if (!upstream.ok) return json({ error: upstream.status === 429 ? 'live_voice_quota_exceeded' : 'live_voice_unavailable' }, upstream.status === 429 ? 429 : 424);
    const data = await upstream.json();
    const token = typeof data?.name === 'string' ? data.name : '';
    if (!token) return json({ error: 'live_voice_unavailable' }, 424);
    return json({ token, model, expiresAt: expireTime });
  } catch {
    return json({ error: controller.signal.aborted ? 'live_voice_timeout' : 'live_voice_unavailable' }, 503);
  } finally {
    clearTimeout(timer);
  }
}

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

  const system = `You are Angela, the official female AI Assistant of Journey Expert Ltd. (JEL), Bangladesh, on journeyexpertltd.com.
JEL verified knowledge has priority. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh. WhatsApp/hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.
Core services: air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, and Study Abroad. Detailed education counselling is handled by JEL Study Abroad at journeyexpertbd.com.
Answer only in ${language === 'bn' ? 'natural Bengali script' : 'professional English'}, matching the language explicitly selected in the interface.
Answer the user's actual question first. Keep normal spoken answers concise: 2-5 short sentences.
For JEL questions, use the verified facts above as the source of truth. Never invent company facts, partnerships, live fares, schedules, seats, hotel inventory, package availability, visa rules, fees, processing times, embassy decisions, admission results, scholarships, payments, bookings, or refunds.
You may answer general knowledge questions professionally. For current or time-sensitive public facts, only state them as current when Google Search grounding is actually enabled in this request; otherwise say the detail should be verified.
Never claim access to all of Google, Wikipedia, or the whole internet unless a search tool was actually used.
Do not request passport numbers, card/bank details, passwords, OTPs, or sensitive document contents.`;

  const history = Array.isArray(body?.history)
    ? body.history
        .filter((turn) => turn && typeof turn === 'object' && typeof turn.content === 'string' && turn.content.trim())
        .slice(-8)
        .map((turn) => ({ role: turn.role === 'assistant' ? 'model' : 'user', parts: [{ text: turn.content.trim().slice(0, 1800) }] }))
    : [];
  const model = 'gemini-3.8-flash';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const requestBody = {
      systemInstruction: { parts: [{ text: system }] },
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      generationConfig: { temperature: 0.15, maxOutputTokens: 420 },
    };
    const groundingEnabled = env.GOOGLE_SEARCH_GROUNDING === 'true';
    if (groundingEnabled) requestBody.tools = [{ google_search: {} }];
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(requestBody),
    });
    if (upstream.ok) {
      const data = await upstream.json();
      const candidate = data?.candidates?.[0];
      const reply = candidate?.content?.parts?.filter((part) => !part.thought).map((part) => part.text || '').join('').trim();
      if (reply && !(language === 'bn' && !/[\u0980-\u09FF]/.test(reply)) && !(language === 'en' && /[\u0980-\u09FF]/.test(reply))) {
        return json({ reply, language, mode: 'ai', providerModel: model, grounded: Boolean(candidate?.groundingMetadata), groundingEnabled });
      }
    }
  } catch {
    // Bounded Gemini failure falls through to verified JEL fallback.
  } finally {
    clearTimeout(timer);
  }
  return json({ reply: fallback(language), language, mode: 'fallback' });
}

async function speech(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await readJson(request); } catch { return json({ error: 'invalid_json' }, 400); }
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, 1200) : '';
  if (!text) return json({ error: 'text_required' }, 400);
  const key = (env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'female_voice_not_configured' }, 503);

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
    const model = env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        model,
        input: 'Speak the following transcript exactly in its original language, naturally, warmly, and clearly. Do not translate, summarize, answer, or add words:\n' + text,
        response_format: {
          type: 'audio',
          mime_type: 'audio/wav',
          sample_rate: 24000,
          delivery: 'inline',
        },
        generation_config: {
          speech_config: [{ voice: 'Kore' }],
        },
      }),
    });
    if (!upstream.ok) return json({ error: upstream.status === 429 ? 'voice_quota_exceeded' : 'female_voice_unavailable' }, upstream.status === 429 ? 429 : 502);
    const data = await upstream.json();
    const audio = findAudio(data);
    if (!audio?.data) return json({ error: 'invalid_audio' }, 502);
    const raw = Uint8Array.from(atob(audio.data), (character) => character.charCodeAt(0));
    return new Response(raw, {
      headers: {
        'content-type': audio.mimeType || 'audio/wav',
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
    if (url.pathname === '/api/gemini/live-token') return liveToken(request, env);
    if (url.pathname === '/api/health' || url.pathname === '/api/healthz') return json({
      status: 'online',
      service: 'JEL Angela Pages Worker',
      languages: ['bn', 'en'],
      femaleVoiceConfigured: Boolean(env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY),
      liveFemaleVoiceConfigured: Boolean(env.GEMINI_API_KEY),
      model: 'gemini-3.8-flash',
      googleSearchGrounding: env.GOOGLE_SEARCH_GROUNDING === 'true',
    });
    return env.ASSETS.fetch(request);
  },
};
