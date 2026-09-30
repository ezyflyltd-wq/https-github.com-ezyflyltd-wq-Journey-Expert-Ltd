type Context = { request: Request; env: Record<string, string | undefined> };
// [approved-production-change] shared female TTS fallback; quota fail-fast reviewed 2026-09-29; production guard marker aligned

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

function pcmToWav(pcm: Uint8Array): ArrayBuffer {
  // Unary Gemini TTS already returns WAV; never wrap it as raw PCM.
  if (pcm.length >= 12 && String.fromCharCode(...pcm.slice(0, 4)) === 'RIFF' && String.fromCharCode(...pcm.slice(8, 12)) === 'WAVE') return new Uint8Array(pcm).buffer;
  const output = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(output);
  const bytes = new Uint8Array(output);
  const label = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) bytes[offset + i] = value.charCodeAt(i);
  };
  label(0, 'RIFF'); view.setUint32(4, 36 + pcm.length, true); label(8, 'WAVE');
  label(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, 24000, true); view.setUint32(28, 48000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  label(36, 'data'); view.setUint32(40, pcm.length, true); bytes.set(pcm, 44);
  return output;
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid_json' }, 400); }
  const text = typeof body?.text === 'string' ? body.text.replace(/\s+/g, ' ').trim().slice(0, 1200) : '';
  if (!text) return json({ error: 'text_required' }, 400);

  const keys = Array.from(new Set([
    env.GEMINI_TTS_API_KEY?.trim(),
    env.GEMINI_API_KEY?.trim(),
  ].filter((key): key is string => Boolean(key))));
  if (!keys.length || env.ANGELA_SERVER_VOICE === 'off') return json({ error: 'voice_not_configured' }, 503);
  const models = Array.from(new Set([
    env.GEMINI_TTS_MODEL,
    'gemini-3.8-flash-lite-tts',
  ].filter((model): model is string => Boolean(model))));
  const findAudio = (value: any): { data: string } | null => {
    if (!value || typeof value !== 'object') return null;
    if (value.type === 'audio' && typeof value.data === 'string') return { data: value.data };
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
  const localDeadline = Date.now() + 8000;
  localKeys: for (const key of keys) {
    for (const model of models) {
      const remaining = localDeadline - Date.now();
      if (remaining < 700) break localKeys;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), Math.min(4500, remaining));
      try {
      const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          model,
          input: [{ type: 'user_input', content: [{ type: 'text', text, annotations: [{ type: 'speech_metadata', style: 'Warm, natural, professional adult female delivery in the original language.' }] }] }],
          response_format: { type: 'audio' },
          generation_config: { speech_config: [{ voice: 'Aoede' }] },
        }),
      });

      if (!upstream.ok) {
        // Quota is shared by this credential; do not multiply 429 traffic by
        // retrying additional TTS models with the same key.
        if (upstream.status === 429) {
          sawQuota = true;
          // Quota/auth can be credential-specific. Move to the next configured
          // Gemini key instead of disabling Angela voice for the whole session.
          break;
        }
        if (upstream.status === 401 || upstream.status === 403) break;
        continue;
      }

      const data: any = await upstream.json();
      const audio = findAudio(data);
      if (!audio?.data) continue;
      const pcm = Uint8Array.from(atob(audio.data), (c) => c.charCodeAt(0));
      if (!pcm.length) continue;

      return new Response(pcmToWav(pcm), {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
          'X-Angela-Voice': 'Aoede',
          'X-Angela-Voice-Model': model,
        },
      });
      } catch {
        if (controller.signal.aborted) continue;
      } finally {
        clearTimeout(timer);
      }
    }
  }

  // The Study Abroad renderer is an independent same-brand female TTS path.
  // It must be attempted especially after corporate 429/quota exhaustion.
  try {
    const shared = await fetch('https://journeyexpertbd.com/angela/speech', {
      method: 'POST',
      signal: AbortSignal.timeout(5500),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (shared.ok && shared.headers.get('content-type')?.includes('audio/wav')) {
      const audio = await shared.arrayBuffer();
      if (audio.byteLength > 1000) {
        return new Response(audio, {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
            'X-Angela-Voice': shared.headers.get('X-Angela-Voice') || 'Aoede',
            'X-Angela-Voice-Model': 'jel-study-shared-' + (shared.headers.get('X-Angela-Voice-Model') || 'tts'),
          },
        });
      }
    }
  } catch {
    // Fall through to the client-side ranked female device voice.
  }

  if (sawQuota) {
    return Response.json({ error: 'voice_quota_exceeded' }, {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Retry-After': '60',
      },
    });
  }
  return json({ error: 'voice_provider_unavailable' }, 503);
}
