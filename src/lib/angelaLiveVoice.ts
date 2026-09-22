const LIVE_MODEL = 'gemini-3.8-live';

function base64ToBytes(value: string): Uint8Array {
  const raw = atob(value);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i);
  return output;
}

async function webSocketDataToText(data: unknown): Promise<string> {
  if (typeof data === 'string') return data;
  if (data instanceof Blob) return await data.text();
  if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
  return String(data);
}

function pcmChunksToWav(chunks: Uint8Array[]): Blob {
  const pcmLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const buffer = new ArrayBuffer(44 + pcmLength);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const label = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) bytes[offset + i] = value.charCodeAt(i);
  };

  label(0, 'RIFF');
  view.setUint32(4, 36 + pcmLength, true);
  label(8, 'WAVE');
  label(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, 24000, true);
  view.setUint32(28, 48000, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  label(36, 'data');
  view.setUint32(40, pcmLength, true);

  let offset = 44;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

export async function fetchAngelaLiveFemaleSpeech(text: string, signal: AbortSignal): Promise<Blob> {
  const tokenResponse = await fetch('/api/gemini/live-token', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
  });
  if (!tokenResponse.ok) {
    const data = await tokenResponse.json().catch(() => ({}));
    throw new Error(data.error || 'live_voice_unavailable');
  }

  const tokenData = await tokenResponse.json();
  const token = typeof tokenData?.token === 'string' ? tokenData.token : '';
  const model = typeof tokenData?.model === 'string' ? tokenData.model : LIVE_MODEL;
  if (!token) throw new Error('live_voice_unavailable');

  return await new Promise<Blob>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    let settled = false;
    let sentTranscript = false;
    const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained?access_token=${encodeURIComponent(token)}`;
    const socket = new WebSocket(wsUrl);
    socket.binaryType = 'arraybuffer';

    const cleanup = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', onAbort);
      try { socket.close(); } catch { /* already closed */ }
    };

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    const succeed = () => {
      if (settled) return;
      const total = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
      if (total < 2) return fail(new Error('live_voice_unavailable'));
      settled = true;
      const blob = pcmChunksToWav(chunks);
      cleanup();
      resolve(blob);
    };

    const onAbort = () => fail(new DOMException('Aborted', 'AbortError'));
    signal.addEventListener('abort', onAbort, { once: true });
    const timer = window.setTimeout(() => fail(new Error('live_voice_timeout')), 5000);

    socket.onopen = () => {
      socket.send(JSON.stringify({
        setup: {
          model: `models/${model}`,
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } },
            },
          },
          systemInstruction: {
            parts: [{
              text: 'You are Angela, a warm professional adult female voice. Render the supplied transcript verbatim in the same language. Do not translate, summarize, answer, or add words.',
            }],
          },
        },
      }));
    };

    socket.onmessage = async (event) => {
      try {
        const message = JSON.parse(await webSocketDataToText(event.data));
        if (message.setupComplete && !sentTranscript) {
          sentTranscript = true;
          socket.send(JSON.stringify({
            clientContent: {
              turns: [{
                role: 'user',
                parts: [{ text: `Speak this transcript exactly as written:\n${text}` }],
              }],
              turnComplete: true,
            },
          }));
          return;
        }

        const parts = message.serverContent?.modelTurn?.parts;
        if (Array.isArray(parts)) {
          for (const part of parts) {
            const audio = part?.inlineData;
            if (audio?.data && (!audio.mimeType || String(audio.mimeType).includes('audio'))) {
              chunks.push(base64ToBytes(audio.data));
            }
          }
        }

        if (message.serverContent?.generationComplete || message.serverContent?.turnComplete) succeed();
      } catch (error) {
        fail(error instanceof Error ? error : new Error('live_voice_unavailable'));
      }
    };

    socket.onerror = () => fail(new Error('live_voice_unavailable'));
    socket.onclose = () => {
      if (!settled) {
        if (chunks.length) succeed();
        else fail(new Error('live_voice_unavailable'));
      }
    };
  });
}
