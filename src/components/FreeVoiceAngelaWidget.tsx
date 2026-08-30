import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, X } from 'lucide-react';
import { normalizePath } from '../routing/routes';

type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type ConversationTurn = {
  role: 'user' | 'assistant';
  content: string;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const CONSENT_STORAGE_KEY = 'jel-free-angela-consent-v1';
const PUBLIC_WIDGET_PATHS = new Set([
  '/',
  '/flights',
  '/hotels',
  '/packages',
  '/visa',
  '/study-abroad',
  '/hajj-umrah',
  '/healthcare-insurance',
  '/concierge',
  '/craft-bangla',
  '/corporate-travel',
  '/dmc-marketplace',
  '/b2b-marketplace',
  '/mobile-apps',
  '/seo-growth',
  '/customer-support',
  '/international-expansion',
  '/innovation-lab',
  '/business-units',
  '/developer',
  '/ai/travel-planner',
  '/ai-agent-ecosystem',
  '/enterprise/blueprint',
  '/enterprise/design-system',
  '/enterprise/cms-knowledge',
]);

export function isPublicAngelaRoute(pathname: string): boolean {
  return PUBLIC_WIDGET_PATHS.has(normalizePath(pathname));
}

function readStoredConsent(): boolean {
  try {
    return window.sessionStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function storeConsent(): void {
  try {
    window.sessionStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
  } catch {
    // The assistant remains usable when browser storage is unavailable.
  }
}

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function getFallbackReply(prompt: string): string {
  return `I can help with flights, hotels, visa guidance, study abroad, Hajj and Umrah, and global mobility. For your request, “${prompt}”, please contact the Journey Expert support team at +880 1926-400400 for a verified quote or case review.`;
}

export function FreeVoiceAngelaWidget() {
  const [hasAcceptedDisclosure, setHasAcceptedDisclosure] = useState(readStoredConsent);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [input, setInput] = useState('');
  const [lastTranscript, setLastTranscript] = useState('');
  const [lastReply, setLastReply] = useState('');
  const [error, setError] = useState('');
  const [conversationId] = useState(() => `angela-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
  const [history, setHistory] = useState<ConversationTurn[]>([]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const recognitionSupported = Boolean(getSpeechRecognition());

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  }, [isOpen]);

  const acceptDisclosure = () => {
    storeConsent();
    setHasAcceptedDisclosure(true);
    setIsOpen(true);
  };

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_`]/g, ''));
    utterance.lang = language === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.98;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const askAssistant = async (prompt: string) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || isLoading) return;
    setIsLoading(true);
    setError('');
    setLastTranscript(cleanPrompt);
    setInput('');

    try {
      const response = await fetch('/api/ai/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleanPrompt,
          language,
          conversationId,
          history,
        }),
      });
      if (!response.ok) throw new Error('AI endpoint unavailable');
      const data = await response.json();
      const reply = String(data.reply || data.response || getFallbackReply(cleanPrompt));
      setHistory((turns) => [
        ...turns,
        { role: 'user', content: cleanPrompt },
        { role: 'assistant', content: reply },
      ].slice(-12));
      setLastReply(reply);
      speak(reply);
    } catch {
      const fallback = getFallbackReply(cleanPrompt);
      setLastReply(fallback);
      setError('Live AI is temporarily unavailable, so a safe support message is shown.');
      speak(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setError('Voice input is not available in this browser. You can type your question below.');
      return;
    }

    recognitionRef.current?.stop();
    const recognition = new Recognition();
    recognition.lang = language === 'bn' ? 'bn-BD' : 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index][0].transcript).join(' ').trim();
      setIsListening(false);
      if (transcript) void askAssistant(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setError('Voice input could not be heard. Please try again or type your question.');
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setError('');
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setError('Microphone access could not be started. Please use the text box instead.');
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const resetConversation = () => {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();
    setHistory([]);
    setLastTranscript('');
    setLastReply('');
    setError('');
    setIsListening(false);
  };

  if (!hasAcceptedDisclosure) {
    return (
      <>
        <button
          type="button"
          className="fixed bottom-4 right-4 z-[60] inline-flex min-h-14 items-center gap-3 bg-[#093F31] px-4 py-3 text-left text-white shadow-2xl ring-1 ring-[#C7A44D]/70 transition-colors hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2 sm:bottom-6 sm:right-6"
          aria-label="Open free Angela voice assistant"
          onClick={() => setIsOpen(true)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C7A44D] text-lg text-[#093F31]" aria-hidden="true">✦</span>
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#E6CA65]">JEL Free AI Voice</span>
            <span className="block text-sm font-bold">Talk to Angela · কথা বলুন</span>
          </span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-end justify-end bg-black/30 px-4 py-4 sm:px-6 sm:py-6" role="presentation">
            <aside role="dialog" aria-modal="true" aria-labelledby="free-angela-disclosure-title" className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto border border-[#C7A44D]/60 bg-[#FFFDF6] p-5 text-left shadow-2xl sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Journey Expert Ltd. AI support</p>
              <h2 id="free-angela-disclosure-title" className="mt-1 text-xl font-bold text-[#093F31]">Before you talk with Angela</h2>
              <p className="mt-3 text-sm leading-6 text-[#333333]">Angela is an AI assistant, not a human. Voice input may be processed by your browser’s speech service, and the transcript is sent to Journey Expert’s AI endpoint to generate a reply. This free version does not use ElevenLabs.</p>
              <p className="mt-3 text-sm leading-6 text-[#333333]" lang="bn">অ্যাঞ্জেলা একজন AI সহকারী, মানুষ নন। আপনার ব্রাউজারের speech service ভয়েস ইনপুট প্রক্রিয়া করতে পারে এবং উত্তর তৈরির জন্য transcript Journey Expert-এর AI endpoint-এ পাঠানো হয়। এই free version-এ ElevenLabs ব্যবহার করা হয় না।</p>
              <p className="mt-3 text-xs leading-5 text-[#555555]">Replies may be incomplete or inaccurate. Do not share passport, bank, payment, password, or other sensitive information. For verified support, call <a className="font-bold text-[#0B6B53] underline" href="tel:+8801926400400">+880 1926-400400</a>.</p>
              <div className="mt-4 flex flex-col gap-3 border-t border-[#E8E1CF] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" className="inline-flex min-h-11 items-center justify-center bg-[#093F31] px-5 py-3 text-sm font-bold text-white hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2" onClick={acceptDisclosure}>Agree and continue / সম্মত হয়ে চালিয়ে যান</button>
                <button type="button" className="text-sm font-semibold text-[#0B6B53] underline" onClick={() => setIsOpen(false)}>Not now / এখন নয়</button>
              </div>
            </aside>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section role="dialog" aria-label="Angela free AI voice assistant" className="w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-[#C7A44D]/60 bg-[#FFFDF6] shadow-2xl">
          <header className="flex items-center justify-between bg-[#093F31] px-4 py-3 text-white">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E6CA65]">JEL Free AI Voice</p>
              <h2 className="text-sm font-bold">Angela · অ্যাঞ্জেলা</h2>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={resetConversation} className="rounded-lg px-2 py-1 text-[10px] font-bold text-[#E6CA65] hover:bg-white/10">New chat</button>
              <button type="button" aria-label="Close Angela assistant" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 hover:bg-white/10"><X className="h-4 w-4" /></button>
            </div>
          </header>
          <div className="space-y-3 p-4 text-xs text-[#333333]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1">
                <button type="button" className={`rounded-lg px-2.5 py-1.5 font-bold ${language === 'en' ? 'bg-[#0B6B53] text-white' : 'bg-[#F1E9D3]'}`} onClick={() => setLanguage('en')}>English</button>
                <button type="button" className={`rounded-lg px-2.5 py-1.5 font-bold ${language === 'bn' ? 'bg-[#0B6B53] text-white' : 'bg-[#F1E9D3]'}`} onClick={() => setLanguage('bn')}>বাংলা</button>
              </div>
              <button type="button" aria-label={voiceEnabled ? 'Mute spoken replies' : 'Enable spoken replies'} onClick={() => setVoiceEnabled((value) => !value)} className="rounded-lg border border-[#E8E1CF] p-2 hover:bg-[#F1E9D3]">{voiceEnabled ? <Volume2 className="h-4 w-4 text-[#0B6B53]" /> : <VolumeX className="h-4 w-4 text-[#777777]" />}</button>
            </div>
            <p className="rounded-xl bg-[#F8FAF9] p-3 leading-5">{recognitionSupported ? 'Ask Angela a question in Bangla, Banglish, or English. She will keep the conversation context.' : 'Voice input is not supported in this browser. Type your question below.'}</p>
            <div className="flex justify-center">
              {isListening ? (
                <button type="button" onClick={stopListening} className="inline-flex items-center gap-2 rounded-full bg-[#B42318] px-5 py-3 font-bold text-white shadow-md"><MicOff className="h-4 w-4" /> Stop listening</button>
              ) : (
                <button type="button" onClick={startListening} disabled={isLoading} className="inline-flex items-center gap-2 rounded-full bg-[#0B6B53] px-5 py-3 font-bold text-white shadow-md disabled:opacity-50"><Mic className="h-4 w-4 text-[#E6CA65]" /> {isLoading ? 'Thinking…' : 'Start speaking'}</button>
              )}
            </div>
            {lastTranscript && <p className="border-l-2 border-[#C7A44D] pl-3 leading-5"><strong>You:</strong> {lastTranscript}</p>}
            {lastReply && <p className="border-l-2 border-[#0B6B53] pl-3 leading-5"><strong>Angela:</strong> {lastReply}</p>}
            {error && <p className="rounded-lg bg-[#FFF1F0] p-2 text-[#B42318]">{error}</p>}
            <form onSubmit={(event) => { event.preventDefault(); void askAssistant(input); }} className="flex gap-2 border-t border-[#E8E1CF] pt-3">
              <label htmlFor="free-angela-query" className="sr-only">Ask Angela</label>
              <input id="free-angela-query" value={input} onChange={(event) => setInput(event.target.value)} placeholder={language === 'bn' ? 'আপনার প্রশ্ন লিখুন…' : 'Type your question…'} className="min-w-0 flex-1 rounded-xl border border-[#E8E1CF] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#0B6B53]" />
              <button type="submit" aria-label="Send question" disabled={isLoading || !input.trim()} className="rounded-xl bg-[#0B6B53] p-2.5 text-white disabled:opacity-50"><Send className="h-4 w-4 text-[#E6CA65]" /></button>
            </form>
            <p className="text-[10px] leading-4 text-[#666666]">For bookings, payments, visa decisions, or sensitive cases, call human support: <a className="font-bold text-[#0B6B53] underline" href="tel:+8801926400400">+880 1926-400400</a>.</p>
          </div>
        </section>
      ) : (
        <button type="button" onClick={() => setIsOpen(true)} className="inline-flex min-h-14 items-center gap-3 rounded-xl bg-[#093F31] px-4 py-3 text-left text-white shadow-2xl ring-1 ring-[#C7A44D]/70 transition-colors hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2" aria-label="Open Angela free AI voice assistant">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C7A44D] text-lg text-[#093F31]" aria-hidden="true">✦</span>
          <span><span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#E6CA65]">JEL Free AI Voice</span><span className="block text-sm font-bold">Talk to Angela · কথা বলুন</span></span>
        </button>
      )}
    </div>
  );
}

