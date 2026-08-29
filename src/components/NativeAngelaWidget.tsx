import { useEffect, useRef, useState } from 'react';
import { normalizePath } from '../routing/routes';

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;
type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const CONSENT_STORAGE_KEY = 'jel-native-angela-consent-v1';
const PUBLIC_WIDGET_PATHS = new Set([
  '/', '/flights', '/hotels', '/packages', '/visa', '/study-abroad', '/hajj-umrah',
  '/healthcare-insurance', '/concierge', '/craft-bangla', '/corporate-travel',
  '/dmc-marketplace', '/b2b-marketplace', '/mobile-apps', '/seo-growth',
  '/customer-support', '/international-expansion', '/innovation-lab', '/business-units',
  '/developer', '/ai/travel-planner', '/ai-agent-ecosystem', '/enterprise/blueprint',
  '/enterprise/design-system', '/enterprise/cms-knowledge',
]);

export function isPublicNativeAngelaRoute(pathname: string): boolean {
  return PUBLIC_WIDGET_PATHS.has(normalizePath(pathname));
}

function readConsent(): boolean {
  try {
    return window.sessionStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function getRecognition(): SpeechRecognitionLike | null {
  const speechWindow = window as SpeechWindow;
  const Constructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
  return Constructor ? new Constructor() : null;
}

function speak(text: string, lang: string): void {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.96;
  window.speechSynthesis.speak(utterance);
}

export function NativeAngelaWidget() {
  const [hasConsent, setHasConsent] = useState(readConsent);
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('Press the microphone and speak in Bangla or English.');
  const [status, setStatus] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (!hasConsent) return;
    const recognition = getRecognition();
    if (!recognition) {
      setStatus('Voice is unavailable in this browser. Use text chat or call +880 1926-400400.');
      return;
    }
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = navigator.language.toLowerCase().startsWith('bn') ? 'bn-BD' : 'en-US';
    recognition.onstart = () => { setListening(true); setStatus('Listening… / শুনছি…'); };
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setListening(false);
      setStatus(`Microphone error: ${event.error}`);
    };
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.trim();
      if (!text) return;
      setMessage(`You: ${text}`);
      setBusy(true);
      setStatus('Angela is thinking… / Angela উত্তর তৈরি করছে…');
      void fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ prompt: text }),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(`AI endpoint returned ${response.status}`);
          const data = await response.json() as { reply?: string };
          const reply = data.reply || 'Please call +880 1926-400400 for human support.';
          setMessage(reply);
          setStatus('Ready');
          speak(reply, recognition.lang);
        })
        .catch(() => {
          const fallback = 'I am temporarily unavailable. Please call Journey Expert human support at +880 1926-400400.';
          setMessage(fallback);
          setStatus('Fallback support available');
          speak(fallback, 'en-US');
        })
        .finally(() => setBusy(false));
    };
    recognitionRef.current = recognition;
    return () => {
      recognition.stop();
      window.speechSynthesis?.cancel();
      recognitionRef.current = null;
    };
  }, [hasConsent]);

  const acceptDisclosure = () => {
    try { window.sessionStorage.setItem(CONSENT_STORAGE_KEY, 'accepted'); } catch { /* continue */ }
    setHasConsent(true);
    setDisclosureOpen(false);
  };

  const startListening = () => {
    if (!recognitionRef.current || listening || busy) return;
    try { recognitionRef.current.start(); } catch { setStatus('Microphone is already active.'); }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();
  };

  if (!hasConsent) {
    return (
      <>
        <button type="button" className="fixed bottom-4 right-4 z-[60] inline-flex min-h-14 items-center gap-3 bg-[#093F31] px-4 py-3 text-left text-white shadow-2xl ring-1 ring-[#C7A44D]/70 transition-colors hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2 sm:bottom-6 sm:right-6" aria-label="Open Angela AI assistant disclosure" onClick={() => setDisclosureOpen(true)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C7A44D] text-lg text-[#093F31]" aria-hidden="true">✦</span>
          <span><span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#E6CA65]">JEL AI Wizard</span><span className="block text-sm font-bold">Talk to Angela · কথা বলুন</span></span>
        </button>
        {disclosureOpen && (
          <div className="fixed inset-0 z-[70] flex items-end justify-end bg-black/30 px-4 py-4 sm:px-6 sm:py-6" role="presentation">
            <aside role="dialog" aria-modal="true" aria-labelledby="native-angela-disclosure-title" className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto border border-[#C7A44D]/60 bg-[#FFFDF6] p-5 text-left shadow-2xl sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Journey Expert Ltd. AI support</p>
              <h2 id="native-angela-disclosure-title" className="mt-1 text-xl font-bold text-[#093F31]">Before you talk with Angela</h2>
              <p className="mt-3 text-sm leading-6 text-[#333333]">Angela is an AI assistant, not a human. Your microphone audio is used by your browser’s speech-recognition service to convert speech to text. The text is sent to JEL’s AI assistant endpoint for a reply, which is then read aloud by your device.</p>
              <p className="mt-3 text-sm leading-6 text-[#333333]" lang="bn">Angela একজন AI সহকারী, মানুষ নন। আপনার browser-এর speech-recognition service কথা থেকে text তৈরি করবে। সেই text JEL-এর AI assistant endpoint-এ পাঠিয়ে উত্তর নেওয়া হবে এবং আপনার device উত্তরটি পড়ে শোনাবে।</p>
              <p className="mt-3 text-xs leading-5 text-[#555555]">Do not share passport, bank, card, payment, OTP, password, or other sensitive information. Visa, travel, booking, and admission decisions remain with the relevant authorities and providers.</p>
              <div className="mt-4 flex flex-col gap-3 border-t border-[#E8E1CF] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" className="inline-flex min-h-11 items-center justify-center bg-[#093F31] px-5 py-3 text-sm font-bold text-white hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2" onClick={acceptDisclosure}>Agree and continue / সম্মত হয়ে চালিয়ে যান</button>
                <button type="button" className="text-sm font-semibold text-[#0B6B53] underline underline-offset-2" onClick={() => setDisclosureOpen(false)}>Not now / এখন নয়</button>
              </div>
              <p className="mt-4 text-sm text-[#333333]">Human support: <a className="font-bold text-[#0B6B53] underline" href="tel:+8801926400400">+880 1926-400400</a></p>
            </aside>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <div className="w-full max-w-sm border border-[#C7A44D]/70 bg-[#FFFDF6] p-4 text-left shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0B6B53]">Angela · JEL AI Voice</p>
        <p className="mt-2 max-h-32 overflow-y-auto whitespace-pre-wrap text-sm leading-6 text-[#333333]" aria-live="polite">{message}</p>
        <div className="mt-3 flex gap-2">
          <button type="button" className="min-h-11 flex-1 bg-[#093F31] px-3 py-2 text-sm font-bold text-white hover:bg-[#0B6B53] disabled:cursor-not-allowed disabled:opacity-50" onClick={startListening} disabled={listening || busy || !recognitionRef.current}>🎙 Speak</button>
          <button type="button" className="min-h-11 border border-[#093F31] px-3 py-2 text-sm font-bold text-[#093F31] disabled:opacity-50" onClick={stopListening} disabled={!listening}>Stop</button>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-[#555555]" role="status">{status}</p>
        <a className="mt-2 inline-block text-xs font-bold text-[#0B6B53] underline" href="tel:+8801926400400">Need a human? +880 1926-400400</a>
      </div>
    </div>
  );
}
