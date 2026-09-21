import { healthResponse } from '../_health';

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

const DEFAULT_AI_STUDIO_ORIGIN = 'https://journey-expert-ltd.ai.studio';
const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1/text-to-speech';
const PRIVATE_PATHS = new Set([
  '/api/b2b/overview',
  '/api/admin/overview',
  '/api/corporate/overview',
]);

function jsonResponse(body: unknown, status = 200, request?: Request): Response {
  const origin = request?.headers.get('origin');
  const allowedOrigin = origin === 'https://journeyexpertltd.com' ? origin : 'https://journeyexpertltd.com';
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': allowedOrigin,
      'access-control-allow-headers': 'Content-Type, Authorization',
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'x-content-type-options': 'nosniff',
    },
  });
}

function jsonError(message: string, status: number, request?: Request, extra: Record<string, unknown> = {}): Response {
  return jsonResponse({ error: message, ...extra }, status, request);
}


function detectAngelaLanguage(message: string, requested?: string): 'bn' | 'en' | 'hi' {
  if (requested === 'bn' || requested === 'en' || requested === 'hi') return requested;
  if (/[\u0980-\u09FF]/.test(message)) return 'bn';
  if (/[\u0900-\u097F]/.test(message)) return 'hi';
  if (/\b(ami|amar|apni|apnar|chai|kivabe|koto|ki|keno|hobe|lagbe|bolen|diben|pari|visa|ticket|tour|umrah|hajj)\b/i.test(message)) return 'bn';
  return 'en';
}

function fastFallback(message: string, language: 'bn' | 'en' | 'hi') {
  if (language === 'bn') {
    return { reply: 'আমি অ্যাঞ্জেলা, Journey Expert Ltd.-এর AI সহকারী। এয়ার টিকিট, ভিসা, ট্যুরস অ্যান্ড ট্রাভেলস, হজ ও ওমরাহ, মেডিকেল ও হালাল ট্যুরিজম, হোটেল, ইন্স্যুরেন্স এবং কর্পোরেট ট্রাভেল সম্পর্কে সাহায্য করতে পারি। আপনার গন্তব্য, তারিখ ও প্রয়োজনীয় সার্ভিস লিখুন।', language, mode: 'fast_fallback' };
  }
  if (language === 'hi') {
    return { reply: 'मैं एंजेला, Journey Expert Ltd. की AI सहायक हूँ। मैं एयर टिकट, वीज़ा सहायता, टूर, हज और उमराह, मेडिकल व हलाल टूरिज़्म, होटल, इंश्योरेंस और कॉर्पोरेट ट्रैवल के बारे में जानकारी दे सकती हूँ। कृपया गंतव्य, तारीख और आवश्यक सेवा बताइए।', language, mode: 'fast_fallback' };
  }
  return { reply: 'I am Angela, Journey Expert Ltd.\'s AI assistant. I can help with air tickets, visa assistance, tours and travel, Hajj and Umrah, medical and halal tourism, hotels, insurance and corporate travel. Please share your destination, date and required service.', language, mode: 'fast_fallback' };
}

async function handleDirectAngela(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  let payload: any;
  try { payload = await request.json(); } catch { return jsonError('Request body must be valid JSON.', 400, request); }
  const message = typeof payload?.message === 'string' ? payload.message.trim().slice(0, 6000) : '';
  if (!message) return jsonError('Message is required.', 400, request);
  const language = detectAngelaLanguage(message, payload?.language);
  const key = (env.GEMINI_API_KEY || '').trim();

  if (key) {
    const prompt = language === 'bn'
      ? 'Respond in concise natural Bengali script.'
      : language === 'hi'
        ? 'Respond in concise natural Hindi.'
        : 'Respond in concise natural English.';
    const system = `You are Angela, the official AI Travel and Mobility Assistant of Journey Expert Ltd. in Bangladesh. Help with air tickets, visa-document guidance, tours and travel, hotels, Hajj and Umrah, medical tourism, halal tourism, insurance, corporate travel and Meet & Greet. Never guarantee visas, fares, seat inventory, consular outcomes, or unverified live prices. For study-abroad counselling, direct users to journeyexpertbd.com. ${prompt}`;
    const models = [env.GEMINI_EDGE_MODEL || 'gemini-3.5-flash-lite', env.GEMINI_MODEL || 'gemini-3.8-flash'];
    for (const model of [...new Set(models)]) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      try {
        const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents: [{ role: 'user', parts: [{ text: message }] }],
            generationConfig: { temperature: 0.25, maxOutputTokens: 512 }
          }),
        });
        if (!upstream.ok) continue;
        const data: any = await upstream.json();
        const reply = data?.candidates?.[0]?.content?.parts?.filter((p: any) => !p.thought).map((p: any) => p.text || '').join('').trim();
        if (reply) return jsonResponse({ reply, language, mode: 'ai', providerModel: model }, 200, request);
      } catch { /* try next model */ } finally { clearTimeout(timer); }
    }
  }

  // Bound the legacy AI Studio fallback so a slow upstream cannot freeze the widget.
  const origin = (env.AI_STUDIO_ORIGIN || DEFAULT_AI_STUDIO_ORIGIN).replace(/\/$/, '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5500);
  try {
    const upstream = await fetch(`${origin}/api/ai/voice-agent`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'Origin': 'https://journeyexpertltd.com' },
      body: JSON.stringify({ ...payload, language }),
    });
    if (upstream.ok) {
      const data: any = await upstream.json();
      const reply = String(data?.reply || data?.response || '').trim();
      if (reply) return jsonResponse({ ...data, reply, language: data?.language || language }, 200, request);
    }
  } catch { /* use fast fallback */ } finally { clearTimeout(timer); }

  return jsonResponse(fastFallback(message, language), 200, request);
}

function pcmToWav(pcm: Uint8Array): ArrayBuffer {
  const output = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(output);
  const bytes = new Uint8Array(output);
  const label = (offset: number, value: string) => { for (let i = 0; i < value.length; i++) bytes[offset + i] = value.charCodeAt(i); };
  label(0, 'RIFF'); view.setUint32(4, 36 + pcm.length, true); label(8, 'WAVE');
  label(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, 24000, true); view.setUint32(28, 48000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  label(36, 'data'); view.setUint32(40, pcm.length, true); bytes.set(pcm, 44);
  return output;
}

async function handleGeminiFemaleTts(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  let payload: any;
  try { payload = await request.json(); } catch { return jsonError('Request body must be valid JSON.', 400, request); }
  const text = typeof payload?.text === 'string' ? payload.text.trim().slice(0, 1800) : '';
  if (!text) return jsonError('Text is required.', 400, request);
  const key = (env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY || '').trim();
  if (!key) return jsonError('Gemini female voice is not configured on Cloudflare Pages.', 503, request, { configured: false });

  const model = env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Read the following exactly in its original language, naturally and clearly. Do not add or translate text:\n' + text }] }],
        generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } } }
      })
    });
    if (!upstream.ok) return jsonError('Gemini female voice unavailable.', upstream.status === 429 ? 429 : 502, request);
    const data: any = await upstream.json();
    const audio = data?.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData?.data)?.inlineData;
    if (!audio?.data) return jsonError('Invalid audio response.', 502, request);
    const raw = Uint8Array.from(atob(audio.data), ch => ch.charCodeAt(0));
    return new Response(pcmToWav(raw), { status: 200, headers: {
      'Content-Type': 'audio/wav', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': 'https://journeyexpertltd.com'
    }});
  } catch {
    return jsonError(controller.signal.aborted ? 'Gemini female voice timeout.' : 'Gemini female voice unavailable.', 503, request);
  } finally { clearTimeout(timer); }
}

function elevenLabsConfigured(env: Record<string, string | undefined>): boolean {
  return Boolean(env.ELEVENLABS_API_KEY && env.ELEVENLABS_VOICE_ID);
}

function handleVoiceStatus(request: Request, env: Record<string, string | undefined>): Response {
  return jsonResponse({
    provider: 'elevenlabs',
    configured: elevenLabsConfigured(env),
    fallback: 'browser-speech-synthesis',
    voiceId: env.ELEVENLABS_VOICE_ID ? 'configured' : 'not-configured',
  }, 200, request);
}

async function handleElevenLabs(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  if (!elevenLabsConfigured(env)) {
    return jsonError('ElevenLabs is not configured; use browser speech fallback.', 503, request, {
      configured: false,
      fallback: 'browser-speech-synthesis',
    });
  }

  let payload: { text?: unknown; language?: unknown };
  try {
    payload = await request.json() as { text?: unknown; language?: unknown };
  } catch {
    return jsonError('Request body must be valid JSON.', 400, request);
  }

  const text = typeof payload.text === 'string' ? payload.text.trim().slice(0, 5000) : '';
  const language = payload.language === 'bn' ? 'bn' : 'en';
  if (!text) return jsonError('Text is required.', 400, request);

  const voiceId = env.ELEVENLABS_VOICE_ID as string;
  const modelId = env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
  const outputFormat = env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128';

  try {
    const upstream = await fetch(`${ELEVENLABS_API_BASE}/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(outputFormat)}`, {
      method: 'POST',
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': env.ELEVENLABS_API_KEY as string,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        language_code: language,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!upstream.ok) {
      return jsonError('ElevenLabs request failed; use browser speech fallback.', 502, request, {
        configured: true,
        fallback: 'browser-speech-synthesis',
      });
    }

    const headers = new Headers(upstream.headers);
    headers.set('cache-control', 'no-store');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('access-control-allow-origin', 'https://journeyexpertltd.com');
    return new Response(upstream.body, { status: 200, headers });
  } catch {
    return jsonError('ElevenLabs service is unavailable; use browser speech fallback.', 502, request, {
      configured: true,
      fallback: 'browser-speech-synthesis',
    });
  }
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': 'https://journeyexpertltd.com',
        'access-control-allow-methods': 'GET,POST,OPTIONS',
        'access-control-allow-headers': 'content-type, authorization',
        'access-control-max-age': '86400',
      },
    });
  }

  const requestUrl = new URL(request.url);
  const pathname = requestUrl.pathname;

  if (pathname === '/api/ai/voice-agent' || pathname === '/api/ai-assistant') return handleDirectAngela(request, env);
  if (pathname === '/api/voice/gemini') return handleGeminiFemaleTts(request, env);

  if (pathname === '/api/voice/status') {
    if (request.method !== 'GET' && request.method !== 'HEAD') return jsonError('Method Not Allowed', 405, request, { allow: 'GET, HEAD' });
    return handleVoiceStatus(request, env);
  }
  if (pathname === '/api/voice/elevenlabs') return handleElevenLabs(request, env);

  if (PRIVATE_PATHS.has(pathname)) {
    return jsonError('Private tenant-scoped data service is not configured for public access.', 503, request, {
      status: 'not_configured',
      action: 'configure_authenticated_server_service',
    });
  }

  if (pathname === '/api/health' || pathname === '/api/healthz') {
    if (request.method !== 'GET' && request.method !== 'HEAD') return jsonError('Method Not Allowed', 405, request, { allow: 'GET, HEAD' });
    if (request.method === 'HEAD') return healthResponse(request);
    return jsonResponse({
      status: 'online',
      service: 'Journey Expert Ltd. (JEL) API Gateway',
      version: '2.6.0-angela-edge',
      directGeminiConfigured: Boolean(env.GEMINI_API_KEY),
      femaleTtsConfigured: Boolean(env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY),
      aiStudioFallbackConfigured: Boolean(env.AI_STUDIO_ORIGIN || DEFAULT_AI_STUDIO_ORIGIN),
    }, 200, request);
  }

  const origin = (env.AI_STUDIO_ORIGIN || DEFAULT_AI_STUDIO_ORIGIN).replace(/\/$/, '');
  const targetUrl = `${origin}${pathname}${requestUrl.search}`;
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('x-forwarded-host', requestUrl.host);
  headers.set('x-forwarded-proto', requestUrl.protocol.replace(':', ''));
  let body: ArrayBuffer | undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') body = await request.arrayBuffer();

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: 'manual',
    });
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set('cache-control', 'no-store');
    responseHeaders.set('access-control-allow-origin', 'https://journeyexpertltd.com');
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch {
    return jsonError('Upstream AI Studio service is unavailable.', 502, request);
  }
};
