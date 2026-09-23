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
    return { reply: 'আমি অ্যাঞ্জেলা, Journey Expert Limited-এর AI সহকারী। এয়ার টিকিট, fare quotation, reissue/refund, ভিসা সহায়তা, ট্যুর ও হোটেল, হজ ও ওমরাহ, হালাল ট্যুরিজম, মেডিকেল ট্যুরিজম, ট্রাভেল ইন্স্যুরেন্স, কর্পোরেট ট্রাভেল, Meet & Greet এবং Study Abroad সম্পর্কে JEL-এর যাচাইকৃত তথ্য দিয়ে সাহায্য করতে পারি। আপনার নির্দিষ্ট প্রশ্নটি বলুন।', language, mode: 'fast_fallback' };
  }
  if (language === 'hi') {
    return { reply: 'मैं एंजेला, Journey Expert Ltd. की AI सहायक हूँ। मैं एयर टिकट, वीज़ा सहायता, टूर, हज और उमराह, मेडिकल व हलाल टूरिज़्म, होटल, इंश्योरेंस और कॉर्पोरेट ट्रैवल के बारे में जानकारी दे सकती हूँ। कृपया गंतव्य, तारीख और आवश्यक सेवा बताइए।', language, mode: 'fast_fallback' };
  }
  return { reply: 'I am Angela, Journey Expert Limited\'s AI assistant. I can help with air tickets and fare quotation, reissue/refund, visa assistance, tours and hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel, Meet & Greet, and Study Abroad using verified JEL information. Please ask your specific question.', language, mode: 'fast_fallback' };
}

async function handleDirectAngela(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  let payload: any;
  try { payload = await request.json(); } catch { return jsonError('Request body must be valid JSON.', 400, request); }
  const message = typeof payload?.message === 'string' ? payload.message.trim().slice(0, 6000) : '';
  if (!message) return jsonError('Message is required.', 400, request);
  const language = detectAngelaLanguage(message, payload?.language);
  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();

  if (key) {
    const prompt = language === 'bn'
      ? 'Respond in concise, professional natural Bengali script. Keep common brand and technical names in English where natural.'
      : language === 'hi'
        ? 'Respond in concise professional Hindi.'
        : 'Respond in concise professional English.';

    const system = `You are Angela, the official AI Assistant of Journey Expert Ltd. (JEL), Bangladesh, on journeyexpertltd.com.

JEL VERIFIED KNOWLEDGE HAS PRIORITY:
- Slogan: "Your Journey, Our Expertise."
- Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh.
- WhatsApp/Hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.
- Core services: air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, and Study Abroad.
- Detailed education counselling is handled by JEL Study Abroad at journeyexpertbd.com.
- JEL Study Abroad covers profile assessment, country/course/university selection, admissions, scholarships, SOP guidance, English tests, student-visa documents, pre-departure and post-arrival guidance.

BEHAVIOUR:
- Answer the user's actual question first and keep normal voice answers short: usually 2-5 sentences.
- For JEL questions, use the verified JEL facts above as the source of truth. Never invent company facts, partnerships, prices, availability, booking status, visa outcomes, admission outcomes, or processing times.
- You may answer general knowledge questions professionally. For current or time-sensitive public facts, only state them as current when web grounding is actually available in this request; otherwise say they should be verified.
- Never claim access to all of Google, Wikipedia, or the whole internet unless a search tool was actually used.
- Never guarantee visa approval, fare, seat inventory, hotel inventory, university admission, scholarship, refund, or consular outcome.
- Do not request passwords, OTPs, card/bank details, or sensitive document contents.
${prompt}`;

    const history = Array.isArray(payload?.history)
      ? payload.history
          .filter((turn: any) => turn && typeof turn.content === 'string' && turn.content.trim())
          .slice(-8)
          .map((turn: any) => ({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.content.trim().slice(0, 1800) }],
          }))
      : [];

    const model = 'gemini-3.8-flash';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const body: any = {
        systemInstruction: { parts: [{ text: system }] },
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        generationConfig: { temperature: 0.15, maxOutputTokens: 420 }
      };
      // Google Search grounding is intentionally opt-in because Gemini 3 search
      // queries can be billable. Set GOOGLE_SEARCH_GROUNDING=true in production
      // only when the project is approved for that usage.
      const groundingEnabled = env.GOOGLE_SEARCH_GROUNDING === 'true';
      if (groundingEnabled) body.tools = [{ google_search: {} }];

      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify(body),
      });
      if (upstream.ok) {
        const data: any = await upstream.json();
        const candidate = data?.candidates?.[0];
        const reply = candidate?.content?.parts
          ?.filter((p: any) => !p.thought && typeof p.text === 'string')
          .map((p: any) => p.text)
          .join('')
          .trim();
        const grounded = Boolean(candidate?.groundingMetadata);
        if (reply) return jsonResponse({ reply, language, mode: 'ai', providerModel: model, grounded, groundingEnabled }, 200, request);
      }
    } catch { /* bounded provider failure falls through to verified JEL fallback */ } finally { clearTimeout(timer); }
  }

  // Do not chain another remote AI hop after the bounded direct Gemini attempt.
  // A fast, domain-safe response keeps Angela responsive even during provider latency.
  return jsonResponse(fastFallback(message, language), 200, request);
}

async function handleGeminiLiveToken(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  const origin = request.headers.get('origin');
  const url = new URL(request.url);
  if (origin && origin !== url.origin) return jsonError('Origin not allowed.', 403, request);
  const key = (env.GEMINI_API_KEY || '').trim();
  if (!key) return jsonError('Gemini Live female voice is not configured.', 503, request, { configured: false });

  const model = 'gemini-3.8-live';
  const expireTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const newSessionExpireTime = new Date(Date.now() + 60 * 1000).toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
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
      if (upstream.status === 429) return jsonError('live_voice_quota_exceeded', 429, request);
      return jsonError('live_voice_unavailable', 424, request);
    }
    const data: any = await upstream.json();
    const token = typeof data?.name === 'string' ? data.name : '';
    if (!token) return jsonError('live_voice_unavailable', 424, request);
    return jsonResponse({ token, model, expiresAt: expireTime }, 200, request);
  } catch {
    return jsonError(controller.signal.aborted ? 'live_voice_timeout' : 'live_voice_unavailable', 503, request);
  } finally {
    clearTimeout(timer);
  }
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
  const text = typeof payload?.text === 'string' ? payload.text.trim().slice(0, 1200) : '';
  if (!text) return jsonError('Text is required.', 400, request);
  const key = (env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY || '').trim();
  if (!key) return jsonError('Gemini female voice is not configured on Cloudflare Pages.', 503, request, { configured: false });

  const model = env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  const findAudio = (value: any): { data: string; mimeType?: string } | null => {
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
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key,
      },
      body: JSON.stringify({
        model,
        input: 'Speak the following transcript exactly in its original language, naturally, warmly, and clearly. Do not translate, summarize, answer, or add words:\n' + text,
        response_format: { type: 'audio' },
        generation_config: {
          speech_config: [{ voice: 'Kore' }],
        },
      }),
    });

    if (!upstream.ok) {
      return jsonError('Gemini female voice unavailable.', upstream.status === 429 ? 429 : 502, request, { providerStatus: upstream.status });
    }

    const data: any = await upstream.json();
    const audio = findAudio(data);
    if (!audio?.data) return jsonError('Invalid audio response.', 502, request);
    const raw = Uint8Array.from(atob(audio.data), ch => ch.charCodeAt(0));
    const wav = pcmToWav(raw);
    return new Response(wav, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': 'https://journeyexpertltd.com',
      },
    });
  } catch {
    return jsonError(controller.signal.aborted ? 'Gemini female voice timeout.' : 'Gemini female voice unavailable.', 503, request);
  } finally {
    clearTimeout(timer);
  }
}

function elevenLabsConfigured(env: Record<string, string | undefined>): boolean {
  return Boolean(env.ELEVENLABS_API_KEY && env.ELEVENLABS_VOICE_ID);
}

function handleVoiceStatus(request: Request, env: Record<string, string | undefined>): Response {
  return jsonResponse({
    provider: 'elevenlabs',
    configured: elevenLabsConfigured(env),
    fallback: 'text-only',
    voiceId: env.ELEVENLABS_VOICE_ID ? 'configured' : 'not-configured',
  }, 200, request);
}

async function handleElevenLabs(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  if (!elevenLabsConfigured(env)) {
    return jsonError('ElevenLabs is not configured; use verified Gemini female voice or text.', 503, request, {
      configured: false,
      fallback: 'text-only',
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

  if (pathname === '/api/ai/voice-agent' || pathname === '/api/ai-assistant') {
    const action = requestUrl.searchParams.get('action');
    if (action === 'speech') return handleGeminiFemaleTts(request, env);
    if (action === 'live-token') return handleGeminiLiveToken(request, env);
    return handleDirectAngela(request, env);
  }
  if (pathname === '/api/voice/gemini') return handleGeminiFemaleTts(request, env);
  if (pathname === '/api/gemini/live-token') return handleGeminiLiveToken(request, env);

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
      femaleLiveFallbackConfigured: Boolean(env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY),
      liveFemaleVoiceConfigured: Boolean(env.GEMINI_API_KEY),
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
