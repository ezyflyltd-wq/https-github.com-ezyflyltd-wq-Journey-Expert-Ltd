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

const languageFor = () => 'bn';

const fallback = (message = '') => {
  const query = String(message || '').toLowerCase();
  const asksContact = /যোগাযোগ|ফোন|নাম্বার|হোয়াটসঅ্যাপ|ঠিকানা|অফিস|contact|phone|address|office/.test(query);
  const asksCompany = /journey expert|জার্নি এক্সপার্ট|company|কোম্পানি|about|স্লোগান/.test(query);
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
  if (asksBrand) return 'Journey Expert Limited-এর পরিচিত brand/co-brand-এর মধ্যে JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla রয়েছে। কোন brand বা service সম্পর্কে জানতে চান বললে নির্দিষ্ট তথ্য দেব।';
  if (asksTour) return 'Journey Expert Limited tours, hotels এবং travel package support দেয়। Destination, approximate date, traveller count ও budget দিলে উপযোগী plan-এর কাঠামো দিতে পারি; live hotel/flight availability supplier থেকে যাচাই করতে হবে।';
  if (asksCompany) return 'Journey Expert Limited বাংলাদেশের একটি travel ও education service company। Slogan: “Your Journey, Our Expertise.” Core services-এর মধ্যে air ticketing, visa assistance, tours/hotels, Hajj & Umrah, halal tourism, medical tourism, insurance, corporate travel, Meet & Greet এবং Study Abroad রয়েছে।';
  return 'আমি অ্যাঞ্জেলা, Journey Expert Limited-এর বাংলা AI সহকারী। JEL-এর air ticketing, visa assistance, tours/hotels, Hajj & Umrah, halal tourism, medical tourism, insurance, corporate travel, Meet & Greet, Study Abroad এবং company information সম্পর্কে প্রশ্ন করুন—আমি প্রশ্ন অনুযায়ী নির্দিষ্ট উত্তর দেব।';
};

async function liveToken(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const origin = request.headers.get('origin');
  const url = new URL(request.url);
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);
  const key = (env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'live_voice_not_configured' }, 503);

  const model = 'gemini-3.8-live';
  const expireTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
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
        liveConnectConstraints: {
          model: 'models/gemini-3.8-live',
          config: {
            sessionResumption: {},
            responseModalities: ['AUDIO'],
          },
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
  const language = languageFor();
  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();
  if (!key) return json({ reply: fallback(message), language, mode: 'fallback' });

  const system = `You are Angela, the official female AI Assistant of Journey Expert Ltd. (JEL), Bangladesh, on journeyexpertltd.com.
JEL verified knowledge has priority. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh. WhatsApp/hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.
Core services: air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, and Study Abroad. Detailed education counselling is handled by JEL Study Abroad at journeyexpertbd.com.
Always answer in natural Bengali script. The user may speak or type Bangla, Banglish, or English, but Angela is Bangla-only in production.
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
      if (reply && /[\u0980-\u09FF]/.test(reply)) {
        return json({ reply, language, mode: 'ai', providerModel: model, grounded: Boolean(candidate?.groundingMetadata), groundingEnabled });
      }
    }
  } catch {
    // Bounded Gemini failure falls through to verified JEL fallback.
  } finally {
    clearTimeout(timer);
  }
  return json({ reply: fallback(message), language, mode: 'fallback' });
}

async function transcribe(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const origin = request.headers.get('origin');
  if (origin && origin !== ALLOWED_ORIGIN && origin !== new URL(request.url).origin) return json({ error: 'origin_not_allowed' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'json_required' }, 415);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 3_600_000) return json({ error: 'audio_too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'invalid_json' }, 400); }
  const audio = typeof body?.audio === 'string' ? body.audio.trim() : '';
  const language = 'bn';
  const mimeTypeRaw = typeof body?.mimeType === 'string' ? body.mimeType : 'audio/webm';
  const mimeType = mimeTypeRaw.split(';')[0].toLowerCase();
  if (!audio) return json({ error: 'audio_required' }, 400);
  if (!/^audio\/(webm|wav|mpeg|mp3|ogg|opus|aac|flac|m4a|mp4)$/i.test(mimeType)) return json({ error: 'audio_type_not_supported' }, 415);

  const keys = [...new Set([env.GEMINI_API_KEY, env.GEMINI_TTS_API_KEY].map((value) => String(value || '').trim()).filter(Boolean))];
  if (!keys.length) return json({ error: 'transcription_not_configured' }, 503);

  const prompt = 'Transcribe this customer speech accurately. The customer may use Bangla, Banglish, or English. Return only a natural Bengali-script transcript where possible, preserving proper names and brand names such as Journey Expert, JEL, visa, ticket, university and country names when appropriate. Do not answer the question and do not add commentary.';

  const models = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-2.5-flash'];
  for (const model of models) {
    for (const key of keys) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      try {
        const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: audio } },
              ],
            }],
            generationConfig: { temperature: 0, maxOutputTokens: 256 },
          }),
        });
        if (!upstream.ok) continue;
        const data = await upstream.json();
        const transcript = data?.candidates?.[0]?.content?.parts
          ?.filter((part) => !part.thought && typeof part.text === 'string')
          .map((part) => part.text)
          .join('')
          .replace(/^[\"'\s]+|[\"'\s]+$/g, '')
          .trim();
        if (!transcript) continue;
        if (!/[\u0980-\u09FF]/.test(transcript)) continue;
        return json({ transcript: transcript.slice(0, 1200), language, mode: 'ai', providerModel: model });
      } catch {
        // Try the next configured model/key.
      } finally {
        clearTimeout(timer);
      }
    }
  }

  return json({ error: 'transcription_unavailable' }, 503);
}

async function speech(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await readJson(request); } catch { return json({ error: 'invalid_json' }, 400); }
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, 1200) : '';
  if (!text) return json({ error: 'text_required' }, 400);
  const key = (env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY || '').trim();
  if (!key || env.ANGELA_SERVER_VOICE === 'off') return json({ error: 'female_voice_not_configured' }, 503);

  const models = [...new Set([
    env.GEMINI_TTS_MODEL,
    'gemini-3.1-flash-tts-preview',
    'gemini-2.5-flash-preview-tts',
    'gemini-2.5-pro-preview-tts',
  ].filter(Boolean))];

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

  let sawQuota = false;
  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    try {
      const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          model,
          input: 'Speak the following transcript exactly in its original language, naturally, warmly, clearly, and in a professional adult female voice. Do not translate, summarize, answer, or add words:\n' + text,
          response_format: { type: 'audio' },
          generation_config: {
            speech_config: [{ voice: 'Kore' }],
          },
        }),
      });
      if (!upstream.ok) {
        if (upstream.status === 429) sawQuota = true;
        continue;
      }
      const data = await upstream.json();
      const audio = findAudio(data);
      if (!audio?.data) continue;
      const raw = Uint8Array.from(atob(audio.data), (character) => character.charCodeAt(0));
      if (!raw.length) continue;
      return new Response(pcmToWav(raw), {
        headers: {
          'content-type': 'audio/wav',
          'cache-control': 'no-store',
          'access-control-allow-origin': ALLOWED_ORIGIN,
          'x-content-type-options': 'nosniff',
          'x-angela-voice': 'Kore',
          'x-angela-voice-model': model,
        },
      });
    } catch {
      // Try next supported Google TTS model.
    } finally {
      clearTimeout(timer);
    }
  }

  return json({ error: sawQuota ? 'voice_quota_exceeded' : 'female_voice_unavailable' }, sawQuota ? 429 : 503);
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
    if (url.pathname === '/angela/chat') return chat(request, env);
    if (url.pathname === '/angela/transcribe') return transcribe(request, env);
    if (url.pathname === '/angela/speech') return speech(request, env);
    if (url.pathname === '/angela/live-token') return liveToken(request, env);
    if (url.pathname === '/api/ai/voice-agent' || url.pathname === '/api/ai-assistant') {
      const action = url.searchParams.get('action');
      if (action === 'speech') return speech(request, env);
      if (action === 'live-token') return liveToken(request, env);
      return chat(request, env);
    }
    if (url.pathname === '/api/voice/gemini') return speech(request, env);
    if (url.pathname === '/api/gemini/live-token') return liveToken(request, env);
    if (url.pathname === '/api/health' || url.pathname === '/api/healthz') return json({
      status: 'online',
      service: 'JEL Angela Pages Worker',
      languages: ['bn'],
      femaleVoiceConfigured: Boolean(env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY),
      femaleLiveFallbackConfigured: Boolean(env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY),
      liveFemaleVoiceConfigured: Boolean(env.GEMINI_API_KEY),
      model: 'gemini-3.8-flash',
      googleSearchGrounding: env.GOOGLE_SEARCH_GROUNDING === 'true',
    });
    return env.ASSETS.fetch(request);
  },
};
