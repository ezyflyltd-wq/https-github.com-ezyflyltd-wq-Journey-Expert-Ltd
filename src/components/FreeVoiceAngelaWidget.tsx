import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, RefreshCw, Send, Volume2, VolumeX, X } from 'lucide-react';
import { normalizePath } from '../routing/routes';
import { fetchAngelaLiveFemaleSpeech } from '../lib/angelaLiveVoice';

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
const BANGLA_WELCOME = 'আসসালামু আলাইকুম! আমি অ্যাঞ্জেলা, Journey Expert Ltd.-এর AI ভয়েস সহকারী। ভ্রমণ বা বিদেশে উচ্চশিক্ষা নিয়ে আপনাকে কীভাবে সাহায্য করতে পারি?';
const ENGLISH_WELCOME = "Assalamu Alaikum! I am Angela, Journey Expert Ltd.'s AI voice assistant. How can I help with travel or study abroad?";
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

function detectReplyLanguage(text: string): 'bn' | 'en' {
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/\b(ami|amar|amake|apni|apnar|tumi|tomar|chai|jabo|jete|koto|kivabe|ki|keno|kobe|hobe|korbo|korte|lagbe|bolen|diben|pari|parbo|visa|ticket|tour|umrah|hajj)\b/i.test(text)) return 'bn';
  return 'en';
}

const FEMALE_VOICE_HINTS: Record<'en' | 'bn', string[]> = {
  bn: ['nabanita', 'female', 'woman', 'heera'],
  en: ['zira', 'aria', 'jenny', 'sonia', 'samantha', 'victoria', 'ava', 'allison', 'karen', 'susan', 'hazel', 'libby', 'natasha', 'serena', 'moira', 'fiona', 'tessa', 'veena', 'female', 'woman', 'google uk english female'],
};

async function loadSpeechVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  const synthesis = window.speechSynthesis;
  let voices = synthesis.getVoices();
  if (voices.length) return voices;

  await new Promise<void>((resolve) => {
    const finish = () => {
      window.clearTimeout(timeout);
      synthesis.removeEventListener('voiceschanged', onVoices);
      resolve();
    };
    const onVoices = () => {
      if (synthesis.getVoices().length) finish();
    };
    const timeout = window.setTimeout(finish, 1500);
    synthesis.addEventListener('voiceschanged', onVoices);
    onVoices();
  });

  voices = synthesis.getVoices();
  return voices;
}

function getPreferredFemaleVoice(voices: SpeechSynthesisVoice[], language: 'en' | 'bn'): SpeechSynthesisVoice | null {
  const prefix = language === 'bn' ? 'bn' : 'en';
  const hints = FEMALE_VOICE_HINTS[language];
  return voices.find((voice) => {
    const name = voice.name.toLowerCase();
    const languageMatch = voice.lang.toLowerCase().startsWith(prefix);
    return languageMatch && hints.some((hint) => name.includes(hint));
  }) || voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix)) || null;
}

function getFallbackReply(_prompt: string, selectedLanguage: 'bn' | 'en'): string {
  const bn = selectedLanguage === 'bn';
  return bn
    ? 'আমি অ্যাঞ্জেলা, Journey Expert Ltd.-এর AI সহকারী। এয়ার টিকিট, ভিসা, ট্যুরস অ্যান্ড ট্রাভেলস, হজ ও ওমরাহ, মেডিকেল ট্যুরিজম, হালাল ট্যুরিজম, হোটেল, ইন্স্যুরেন্স ও কর্পোরেট ট্রাভেল সম্পর্কে সাধারণ তথ্য দিতে পারি। যাচাই করা লাইভ কোটেশন বা কেস রিভিউয়ের জন্য +8801926400400 নম্বরে যোগাযোগ করুন।'
    : 'I am Angela, Journey Expert Ltd.\'s AI assistant. I can help with air tickets, visas, tours and travel, Hajj and Umrah, medical tourism, halal tourism, hotels, insurance and corporate travel. For a verified live quotation or case review, contact +8801926400400.';
}

export function FreeVoiceAngelaWidget() {
  const [hasAcceptedDisclosure, setHasAcceptedDisclosure] = useState(readStoredConsent);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState<'en' | 'bn'>('bn');
  const [input, setInput] = useState('');
  const [lastTranscript, setLastTranscript] = useState('');
  const [lastReply, setLastReply] = useState('');
  const [error, setError] = useState('');
  const [conversationId] = useState(() => `angela-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
  const [history, setHistory] = useState<ConversationTurn[]>([]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const recognitionSupported = Boolean(getSpeechRecognition());

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      audioRef.current?.pause();
      if (audioRef.current) URL.revokeObjectURL(audioRef.current.src);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, []);


  useEffect(() => {
    if (!isOpen) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  }, [isOpen]);

  const unlockAudio = async () => {
    if (typeof window === 'undefined' || !window.AudioContext) return null;
    try {
      let context = audioContextRef.current;
      if (!context || context.state === 'closed') {
        context = new window.AudioContext();
        audioContextRef.current = context;
      }
      if (context.state === 'suspended') await context.resume();
      if (context.state === 'running') {
        const buffer = context.createBuffer(1, 1, 22050);
        const source = context.createBufferSource();
        const gain = context.createGain();
        gain.gain.value = 0;
        source.buffer = buffer;
        source.connect(gain);
        gain.connect(context.destination);
        source.start(0);
      }
      return context;
    } catch {
      return null;
    }
  };

  const welcomeText = () => language === 'bn' ? BANGLA_WELCOME : ENGLISH_WELCOME;

  const acceptDisclosure = () => {
    void unlockAudio();
    storeConsent();
    setHasAcceptedDisclosure(true);
    setIsOpen(true);
    const greeting = welcomeText();
    setLastReply(greeting);
    void speakWithBrowser(greeting);
  };

  const openAssistant = () => {
    void unlockAudio();
    setIsOpen(true);
    if (!lastReply) {
      const greeting = welcomeText();
      setLastReply(greeting);
      void speakWithBrowser(greeting);
    }
  };

  async function speakWithBrowser(text: string) {
    if (typeof window === 'undefined') return;
    const effectiveLanguage = language;
    const cleanText = text.replace(/[*#_`]/g, '').replace(/\s+/g, ' ').trim().slice(0, 520);

    // Use the same server-rendered Angela female voice on desktop and mobile.
    // Browser voices differ by OS and must never silently fall back to a male voice.
    try {
      setError('');
      const response = await fetch('/angela/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, language: effectiveLanguage }),
      });
      if (!response.ok) throw new Error('female_tts_unavailable');
      const blob = await response.blob();
      const context = await unlockAudio();
      if (context?.state === 'running') {
        const decoded = await context.decodeAudioData(await blob.arrayBuffer());
        const source = context.createBufferSource();
        source.buffer = decoded;
        source.connect(context.destination);
        source.onended = () => setIsSpeaking(false);
        setIsSpeaking(true);
        source.start(0);
      } else {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current?.pause();
        if (audioRef.current) URL.revokeObjectURL(audioRef.current.src);
        audioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          if (audioRef.current === audio) audioRef.current = null;
        };
        await audio.play();
      }
    } catch {
      // Primary Gemini TTS may hit quota or a transient timeout. Before degrading
      // to text, try a second verified Google female voice through Gemini Live.
      try {
        const liveController = new AbortController();
        const liveTimer = window.setTimeout(() => liveController.abort(), 6500);
        const liveBlob = await fetchAngelaLiveFemaleSpeech(cleanText, liveController.signal);
        window.clearTimeout(liveTimer);
        const context = await unlockAudio();
        if (context?.state === 'running') {
          const decoded = await context.decodeAudioData(await liveBlob.arrayBuffer());
          const source = context.createBufferSource();
          source.buffer = decoded;
          source.connect(context.destination);
          source.onended = () => setIsSpeaking(false);
          setIsSpeaking(true);
          source.start(0);
          return;
        }
        const url = URL.createObjectURL(liveBlob);
        const audio = new Audio(url);
        audioRef.current?.pause();
        if (audioRef.current) URL.revokeObjectURL(audioRef.current.src);
        audioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          if (audioRef.current === audio) audioRef.current = null;
        };
        setIsSpeaking(true);
        await audio.play();
        return;
      } catch {
        // Cross-device invariant: never let the OS/browser silently substitute
        // an unknown or male voice. If both verified female cloud paths fail,
        // keep the answer visible as text.
        if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
        setIsSpeaking(false);
        setError(effectiveLanguage === 'bn'
          ? 'Angela-র verified female voice সাময়িকভাবে পাওয়া যাচ্ছে না। উত্তরটি লেখা আকারে দেখানো হচ্ছে।'
          : 'Angela verified female voice is temporarily unavailable. The answer remains available as text.');
      }
    }
  }

  const speak = async (text: string) => {
    if (!voiceEnabled) return;
    await speakWithBrowser(text);
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
        signal: AbortSignal.timeout(18000),
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
      const reply = String(data.reply || data.response || getFallbackReply(cleanPrompt, language));
      setHistory((turns) => [
        ...turns,
        { role: 'user', content: cleanPrompt },
        { role: 'assistant', content: reply },
      ].slice(-12));
      setLastReply(reply);
      void speak(reply);
    } catch {
      const fallback = getFallbackReply(cleanPrompt, language);
      setLastReply(fallback);
      setError(language === 'bn' ? 'লাইভ AI সাময়িকভাবে অনুপলব্ধ; যাচাইকৃত JEL fallback দেখানো হচ্ছে।' : 'Live AI is temporarily unavailable; a verified JEL fallback is shown.');
      void speak(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setError('Voice input is not available in this browser. You can type your question below.');
      return;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* already ended */ }
      recognitionRef.current = null;
    }
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
      if (recognitionRef.current === recognition) recognitionRef.current = null;
      setIsListening(false);
      setError('Voice input could not be heard. Please try again or type your question.');
    };
    recognition.onend = () => {
      if (recognitionRef.current === recognition) recognitionRef.current = null;
      setIsListening(false);
    };
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
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    try { recognition?.stop(); } catch { /* already ended */ }
    setIsListening(false);
  };

  const resetConversation = () => {
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    try { recognition?.stop(); } catch { /* already ended */ }
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    setIsSpeaking(false);
    setHistory([]);
    setLastTranscript('');
    setLastReply('');
    setError('');
    setIsListening(false);
  };

  useEffect(() => {
    const openFromSite = () => openAssistant();
    window.addEventListener('jel:open-angela', openFromSite);
    return () => window.removeEventListener('jel:open-angela', openFromSite);
  }, [hasAcceptedDisclosure, lastReply, language]);

  const assistantState = error ? 'ERROR' : isListening ? 'LISTENING' : isLoading ? 'THINKING' : isSpeaking ? 'SPEAKING' : 'READY';
  const stateText = language === 'bn'
    ? ({ READY: 'প্রস্তুত', LISTENING: 'শুনছি', THINKING: 'ভাবছি', SPEAKING: 'বলছি', ERROR: 'সমস্যা' } as const)[assistantState]
    : assistantState;

  if (!hasAcceptedDisclosure) {
    return (
      <>
        <button
          type="button"
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[60] flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#0B5D3B] via-[#0D7A4D] to-[#D4AF37] text-white shadow-2xl ring-2 ring-white/50 transition-all hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
          aria-label="Open free Angela voice assistant"
          onClick={() => setIsOpen(true)}
        >
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 opacity-50 blur-sm animate-pulse" aria-hidden="true"></span>
          <span className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-white p-1">
            <img src="/logo.svg" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500" aria-hidden="true"><Mic className="h-2.5 w-2.5" /></span><span className="sr-only">Talk to Angela · কথা বলুন</span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-end justify-end bg-black/30 px-4 py-4 sm:px-6 sm:py-6" role="presentation">
            <aside role="dialog" aria-modal="true" aria-labelledby="free-angela-disclosure-title" className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto border border-[#C7A44D]/60 bg-[#FFFDF6] p-5 text-left shadow-2xl sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Journey Expert Ltd. AI support</p>
              <h2 id="free-angela-disclosure-title" className="mt-1 text-xl font-bold text-[#093F31]">Before you talk with Angela</h2>
              <p className="mt-3 text-sm leading-6 text-[#333333]">Angela is an AI assistant, not a human. Voice input may be processed by your browser’s speech service, and the transcript is sent to Journey Expert’s AI endpoint to generate a reply. Angela uses Journey Expert's server-rendered female voice when available; an unknown browser default voice is never substituted.</p>
              <p className="mt-3 text-sm leading-6 text-[#333333]" lang="bn">অ্যাঞ্জেলা একজন AI সহকারী, মানুষ নন। আপনার ব্রাউজারের speech service ভয়েস ইনপুট প্রক্রিয়া করতে পারে এবং উত্তর তৈরির জন্য transcript Journey Expert-এর AI endpoint-এ পাঠানো হয়। Angela server-rendered female voice ব্যবহার করে; অজানা browser default voice কখনো substitute করা হয় না।</p>
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
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section role="dialog" aria-label="Angela AI voice assistant" className="flex h-[min(640px,85dvh)] w-[calc(100vw-24px)] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl">
          <header className="relative flex items-center justify-between overflow-hidden bg-gradient-to-r from-[#0B5D3B] via-[#0D6D45] to-[#074028] px-3 py-3 text-white shadow-md sm:px-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[#D4AF37] bg-white p-1 shadow-md"><img src="/logo.svg" alt="" className="h-full w-full object-contain" /></span>
              <div>
                <div className="flex items-center gap-1.5"><h2 className="text-sm font-bold sm:text-base">Angela</h2><span className="rounded border border-[#D4AF37]/40 bg-[#D4AF37]/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-200">AI Voice</span></div>
                <p className="text-[10px] text-emerald-200/90 sm:text-[11px]">Journey Expert Limited</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="mr-1 flex items-center rounded-lg bg-white/10 p-0.5 text-[10px]">
                <button type="button" className={`rounded px-1.5 py-0.5 ${language === 'en' ? 'bg-white font-bold text-[#0B5D3B]' : 'text-white/80'}`} onClick={() => setLanguage('en')}>EN</button>
                <button type="button" className={`rounded px-1.5 py-0.5 ${language === 'bn' ? 'bg-white font-bold text-[#0B5D3B]' : 'text-white/80'}`} onClick={() => setLanguage('bn')}>বাংলা</button>
              </div>
              <button type="button" aria-label={voiceEnabled ? 'Mute spoken replies' : 'Enable spoken replies'} onClick={() => setVoiceEnabled((value) => !value)} className="rounded-lg p-1.5 text-amber-300 hover:bg-white/10">{voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-white/60" />}</button>
              <button type="button" aria-label="New chat" onClick={resetConversation} className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white"><RefreshCw className="h-4 w-4" /></button>
              <button type="button" aria-label="Close Angela assistant" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-white/80 hover:bg-white/10"><X className="h-5 w-5" /></button>
            </div>
          </header>
          <div className={`flex items-center gap-2 border-b px-3 py-1.5 text-[11px] font-medium ${
            assistantState === 'LISTENING' ? 'border-rose-200 bg-rose-50 text-rose-800' :
            assistantState === 'THINKING' ? 'border-amber-200 bg-amber-50 text-amber-800' :
            assistantState === 'SPEAKING' ? 'border-blue-200 bg-blue-50 text-blue-800' :
            assistantState === 'ERROR' ? 'border-red-200 bg-red-50 text-red-700' :
            'border-emerald-100 bg-emerald-50/70 text-emerald-800'
          }`}>
            <span className={`h-2 w-2 rounded-full ${assistantState === 'LISTENING' ? 'bg-rose-500 animate-ping' : assistantState === 'THINKING' ? 'bg-amber-500 animate-pulse' : assistantState === 'SPEAKING' ? 'bg-blue-500 animate-bounce' : assistantState === 'ERROR' ? 'bg-red-500' : 'bg-emerald-500'}`} />
            <strong className="text-[10px] tracking-wider">{stateText}</strong>
            <span className="truncate text-slate-500">{language === 'bn' ? (assistantState === 'READY' ? 'মাইক্রোফোনে বলুন অথবা লিখুন' : assistantState === 'LISTENING' ? 'আপনার কথা শুনছি' : assistantState === 'THINKING' ? 'JEL তথ্য দিয়ে উত্তর তৈরি হচ্ছে' : assistantState === 'SPEAKING' ? 'উত্তর পড়ে শোনাচ্ছি' : 'লিখে সহায়তা নিন') : (assistantState === 'READY' ? 'Tap mic or type below' : assistantState === 'LISTENING' ? 'Listening to you' : assistantState === 'THINKING' ? 'Answering with JEL knowledge' : assistantState === 'SPEAKING' ? 'Speaking response' : 'Text chat remains available')}</span>
          </div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 text-xs text-[#333333]">
            <p className="rounded-xl bg-[#F8FAF9] p-3 leading-5">{recognitionSupported ? 'Ask Angela a question in Bangla, Banglish, or English. She will keep the conversation context.' : 'Voice input is not supported in this browser. Type your question below.'}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B6B53]" data-testid="voice-provider-status">
              Voice output: Angela female · {language === 'bn' ? 'বাংলা' : 'English'}
            </p>
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
        <button type="button" onClick={openAssistant} className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#0B5D3B] via-[#0D7A4D] to-[#D4AF37] text-white shadow-2xl ring-2 ring-white/50 transition-all hover:scale-105 active:scale-95" aria-label="Open Angela AI voice assistant">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 opacity-50 blur-sm transition group-hover:opacity-90 animate-pulse" aria-hidden="true"></span>
          <span className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-white p-1"><img src="/logo.svg" alt="" className="h-full w-full object-contain" /></span>
          <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500" aria-hidden="true"><Mic className="h-2.5 w-2.5" /></span><span className="sr-only">Talk to Angela · কথা বলুন</span>
        </button>
      )}
    </div>
  );
}
