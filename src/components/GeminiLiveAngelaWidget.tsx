import { useEffect, useRef, useState } from 'react';

const TOKEN_ENDPOINT = '/api/gemini/live-token';
const DEFAULT_MODEL = 'gemini-3.1-flash-live-preview';
const CONSENT_STORAGE_KEY = 'jel-gemini-angela-consent-v1';

type Status = 'idle' | 'connecting' | 'connected' | 'error';

type LiveTokenResponse = {
  token?: string;
  model?: string;
};

type ServerMessage = {
  serverContent?: {
    interrupted?: boolean;
    turnComplete?: boolean;
    inputTranscription?: { text?: string };
    outputTranscription?: { text?: string };
    modelTurn?: {
      parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }>;
    };
  };
};

const ALLOWED_ORIGINS = new Set([
  'https://journeyexpertltd.com',
  'https://www.journeyexpertltd.com',
]);

function readConsent(): boolean {
  try {
    return window.sessionStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function pcmBase64ToAudioBuffer(base64: string, context: AudioContext): AudioBuffer {
  const binary = window.atob(base64);
  const samples = new Int16Array(binary.length / 2);
  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = binary.charCodeAt(index * 2) | (binary.charCodeAt(index * 2 + 1) << 8);
  }
  const audio = context.createBuffer(1, samples.length, 24000);
  const channel = audio.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) {
    channel[index] = samples[index] / 32768;
  }
  return audio;
}

function floatToPcm16Base64(input: Float32Array): string {
  const bytes = new Uint8Array(input.length * 2);
  const view = new DataView(bytes.buffer);
  for (let index = 0; index < input.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, input[index]));
    view.setInt16(index * 2, sample < 0 ? sample * 32768 : sample * 32767, true);
  }
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)));
  }
  return window.btoa(binary);
}

export function GeminiLiveAngelaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(readConsent);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastTranscript, setLastTranscript] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mutedGainRef = useRef<GainNode | null>(null);
  const nextPlaybackTimeRef = useRef(0);

  const stopPlayback = () => {
    const outputContext = outputContextRef.current;
    if (!outputContext) return;
    nextPlaybackTimeRef.current = outputContext.currentTime;
  };

  const cleanup = () => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    mutedGainRef.current?.disconnect();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    inputContextRef.current?.close().catch(() => undefined);
    outputContextRef.current?.close().catch(() => undefined);
    socketRef.current?.close();
    processorRef.current = null;
    sourceRef.current = null;
    mutedGainRef.current = null;
    mediaStreamRef.current = null;
    inputContextRef.current = null;
    outputContextRef.current = null;
    socketRef.current = null;
    nextPlaybackTimeRef.current = 0;
  };

  useEffect(() => cleanup, []);

  const acceptConsent = () => {
    try {
      window.sessionStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    } catch {
      // The widget remains usable if storage is unavailable.
    }
    setHasConsent(true);
    setIsOpen(true);
  };

  const playPcmChunk = (base64: string) => {
    const context = outputContextRef.current;
    if (!context) return;
    const buffer = pcmBase64ToAudioBuffer(base64, context);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    const startAt = Math.max(context.currentTime + 0.02, nextPlaybackTimeRef.current);
    source.start(startAt);
    nextPlaybackTimeRef.current = startAt + buffer.duration;
  };

  const connect = async () => {
    if (status === 'connecting' || status === 'connected') return;
    setStatus('connecting');
    setErrorMessage('');
    setLastTranscript('');

    if (!ALLOWED_ORIGINS.has(window.location.origin)) {
      setStatus('error');
      setErrorMessage('This public widget is not enabled on the current origin.');
      return;
    }

    try {
      const tokenResponse = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
      });
      const tokenPayload = (await tokenResponse.json()) as LiveTokenResponse & { error?: string };
      if (!tokenResponse.ok || typeof tokenPayload.token !== 'string') {
        throw new Error(tokenPayload.error || 'Gemini Live is not available right now.');
      }

      const model = tokenPayload.model || DEFAULT_MODEL;
      const websocketUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?access_token=${encodeURIComponent(tokenPayload.token)}`;
      const socket = new WebSocket(websocketUrl);
      socketRef.current = socket;

      const outputContext = new AudioContext({ sampleRate: 24000 });
      outputContextRef.current = outputContext;
      await outputContext.resume();

      socket.onopen = async () => {
        socket.send(JSON.stringify({
          setup: {
            model: `models/${model}`,
            generationConfig: { responseModalities: ['AUDIO'] },
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
            },
            inputAudioTranscription: {
              languageCodes: ['bn-BD', 'en-US'],
              mode: 'SMART',
            },
            outputAudioTranscription: {},
          },
        }));

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        mediaStreamRef.current = stream;
        const inputContext = new AudioContext({ sampleRate: 16000 });
        inputContextRef.current = inputContext;
        const source = inputContext.createMediaStreamSource(stream);
        const processor = inputContext.createScriptProcessor(4096, 1, 1);
        const mutedGain = inputContext.createGain();
        mutedGain.gain.value = 0;
        source.connect(processor);
        processor.connect(mutedGain);
        mutedGain.connect(inputContext.destination);
        sourceRef.current = source;
        processorRef.current = processor;
        mutedGainRef.current = mutedGain;
        processor.onaudioprocess = (event) => {
          if (socket.readyState !== WebSocket.OPEN) return;
          socket.send(JSON.stringify({
            realtimeInput: {
              audio: {
                data: floatToPcm16Base64(event.inputBuffer.getChannelData(0)),
                mimeType: 'audio/pcm;rate=16000',
              },
            },
          }));
        };
        setStatus('connected');
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data) as ServerMessage;
        const content = message.serverContent;
        if (!content) return;
        if (content.interrupted) stopPlayback();
        if (content.inputTranscription?.text) setLastTranscript(content.inputTranscription.text);
        if (content.outputTranscription?.text) setLastTranscript(content.outputTranscription.text);
        for (const part of content.modelTurn?.parts || []) {
          if (part.inlineData?.data) playPcmChunk(part.inlineData.data);
        }
      };

      socket.onerror = () => {
        setStatus('error');
        setErrorMessage('The live voice connection encountered an error.');
        cleanup();
      };
      socket.onclose = () => {
        if (status !== 'error') setStatus('idle');
        cleanup();
      };
    } catch (error) {
      cleanup();
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Gemini Live is unavailable.');
    }
  };

  const endCall = () => {
    cleanup();
    setStatus('idle');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <button
        type="button"
        className="inline-flex min-h-14 items-center gap-3 bg-[#093F31] px-4 py-3 text-left text-white shadow-2xl ring-1 ring-[#C7A44D]/70 hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2"
        aria-label="Open Angela Gemini Live voice assistant"
        onClick={() => setIsOpen(true)}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C7A44D] text-lg text-[#093F31]" aria-hidden="true">✦</span>
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#E6CA65]">Angela Live</span>
          <span className="block text-sm font-bold">Talk in Bangla · English</span>
        </span>
      </button>

      {isOpen && !hasConsent && (
        <div className="fixed inset-0 z-[70] flex items-end justify-end bg-black/30 px-4 py-4 sm:px-6 sm:py-6" role="presentation">
          <aside role="dialog" aria-modal="true" aria-labelledby="gemini-angela-disclosure-title" className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto border border-[#C7A44D]/60 bg-[#FFFDF6] p-5 text-left shadow-2xl sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Journey Expert Ltd. AI support</p>
            <h2 id="gemini-angela-disclosure-title" className="mt-1 text-xl font-bold text-[#093F31]">Before you talk with Angela</h2>
            <p className="mt-3 text-sm leading-6 text-[#333333]">Angela is an AI assistant, not a human. Your microphone audio and conversation may be processed by Google to provide the live service.</p>
            <p className="mt-2 text-sm leading-6 text-[#333333]" lang="bn">Angela একজন AI সহকারী, মানুষ নন। Live service দেওয়ার জন্য আপনার microphone audio ও কথোপকথন Google-এর মাধ্যমে process হতে পারে।</p>
            <p className="mt-2 text-xs leading-5 text-[#555555]">Do not share passport, bank, payment, or other sensitive documents. Replies may be incomplete or inaccurate.</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#E8E1CF] pt-4">
              <button type="button" className="bg-[#093F31] px-5 py-3 text-sm font-bold text-white hover:bg-[#0B6B53]" onClick={acceptConsent}>Agree and continue / সম্মত হয়ে চালিয়ে যান</button>
              <button type="button" className="text-sm font-semibold text-[#0B6B53] underline" onClick={() => setIsOpen(false)}>Not now</button>
            </div>
          </aside>
        </div>
      )}

      {isOpen && hasConsent && (
        <div className="w-full max-w-sm border border-[#C7A44D]/60 bg-[#FFFDF6] p-4 text-left shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="gemini-angela-title">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Gemini Live</p>
              <h2 id="gemini-angela-title" className="text-lg font-bold text-[#093F31]">Angela · বাংলা / English</h2>
            </div>
            <button type="button" className="text-sm font-semibold text-[#0B6B53] underline" onClick={endCall}>Close</button>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#555555]">Microphone echo cancellation, noise suppression, and automatic gain control are requested where supported by your browser/device.</p>
          <p className="mt-3 text-sm font-semibold text-[#093F31]" aria-live="polite">{status === 'connected' ? 'Connected — কথা বলুন' : status === 'connecting' ? 'Connecting…' : status === 'error' ? 'Unavailable' : 'Ready'}</p>
          {lastTranscript && <p className="mt-2 text-xs leading-5 text-[#555555]" aria-live="polite">{lastTranscript}</p>}
          {errorMessage && <p className="mt-2 text-xs leading-5 text-[#A33A2B]" role="alert">{errorMessage}</p>}
          <div className="mt-4 flex gap-2">
            {status !== 'connected' && <button type="button" className="bg-[#093F31] px-4 py-2 text-sm font-bold text-white hover:bg-[#0B6B53]" onClick={connect}>Start voice / কথা শুরু করুন</button>}
            {status === 'connected' && <button type="button" className="bg-[#A33A2B] px-4 py-2 text-sm font-bold text-white" onClick={endCall}>End call / কল শেষ করুন</button>}
          </div>
        </div>
      )}
    </div>
  );
}
