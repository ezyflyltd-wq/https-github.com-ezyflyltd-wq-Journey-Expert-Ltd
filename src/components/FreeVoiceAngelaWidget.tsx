import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, RefreshCw, Send, Volume2, VolumeX, X } from 'lucide-react';
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
// [approved-production-change] Cross-platform Angela voice/knowledge hardening reviewed for production.
const BANGLA_WELCOME = 'আসসালামু আলাইকুম। আমি অ্যাঞ্জেলা, Journey Expert Limited-এর AI সহকারী। আমি আপনাকে কীভাবে সাহায্য করতে পারি? এয়ার টিকিট, ভিসা সহায়তা, ট্যুর ও হোটেল, হজ ও ওমরাহ, হালাল ট্যুরিজম, মেডিকেল ট্যুরিজম, ইন্স্যুরেন্স, কর্পোরেট ট্রাভেল, Meet & Greet অথবা Study Abroad—যেকোনো বিষয়ে প্রশ্ন করতে পারেন।';
const ENGLISH_WELCOME = "Assalamu Alaikum. I am Angela, Journey Expert Limited's AI assistant. How can I help you today? You can ask me about air tickets, visa assistance, tours and hotels, Hajj and Umrah, halal tourism, medical tourism, insurance, corporate travel, Meet & Greet, or Study Abroad.";
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
  bn: ['nabanita', 'tanishaa', 'lekha', 'sangeeta', 'heera', 'female', 'woman', 'google bengali', 'google bangla', 'microsoft nabanita'],
  en: ['zira', 'aria', 'jenny', 'sonia', 'samantha', 'victoria', 'ava', 'allison', 'karen', 'susan', 'hazel', 'libby', 'natasha', 'serena', 'moira', 'fiona', 'tessa', 'veena', 'female', 'woman', 'google uk english female'],
};
const MALE_VOICE_HINTS: Record<'en' | 'bn', string[]> = {
  bn: ['pradeep', 'pradip', 'bhashkar', 'bhaskar', 'bashkar', 'male', 'man'],
  en: ['david', 'mark', 'george', 'daniel', 'guy', 'male', 'man'],
};

function getPreferredFemaleVoice(voices: SpeechSynthesisVoice[], language: 'en' | 'bn'): SpeechSynthesisVoice | null {
  // STRICT_FEMALE_ONLY: never use a language-only/default match. If the browser
  // cannot identify a known female voice, Angela remains text-only rather than
  // ever falling back to a male/default system voice.
  const hints = FEMALE_VOICE_HINTS[language];
  const maleHints = MALE_VOICE_HINTS[language];
  const eligible = voices.filter((voice) => {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();
    const femaleNamed = hints.some((hint) => name.includes(hint));
    const maleNamed = maleHints.some((hint) => name.includes(hint));
    const languageMatch = language === 'bn'
      ? (lang.startsWith('bn') || /bangla|bengali/.test(name))
      : lang.startsWith('en');
    return femaleNamed && !maleNamed && languageMatch;
  });
  const score = (voice: SpeechSynthesisVoice) => {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();
    let value = 0;
    if (language === 'bn') {
      if (lang.startsWith('bn-bd')) value += 130;
      else if (lang.startsWith('bn-in')) value += 120;
      else if (lang.startsWith('bn')) value += 110;
      else if (/bangla|bengali/.test(name)) value += 90;
    } else if (lang.startsWith('en')) {
      value += 110;
    }
    if (hints.some((hint) => name.includes(hint))) value += 100;
    if (voice.default) value += 4;
    if (voice.localService) value += 3;
    return value;
  };
  return eligible
    .map((voice) => ({ voice, score: score(voice) }))
    .sort((a, b) => b.score - a.score)[0]?.voice || null;
}

function getFallbackReply(prompt: string, selectedLanguage: 'bn' | 'en'): string {
  const bn = selectedLanguage === 'bn';
  const q = prompt.toLocaleLowerCase();
  const match = (...terms: string[]) => terms.some((term) => q.includes(term));

  if (match('hajj','umrah','হজ','ওমরাহ','উমরাহ','makkah','madinah','মক্কা','মদিনা','nusuk','ziyarat','জিয়ারত','জিয়ারত')) {
    return bn
      ? 'Journey Expert Limited হজ ও ওমরাহ বিষয়ে package planning, air travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination এবং visa/document guidance-এ সহায়তা করে। নির্দিষ্ট price, availability ও Saudi rules current official source বা supplier থেকে যাচাই করতে হবে।'
      : 'Journey Expert Limited supports Hajj and Umrah package planning, air travel, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Current prices, availability, and Saudi rules must be verified.';
  }
  if (match('study abroad','student visa','student','university','admission','scholarship','sop','ielts','cas','coe','i-20','স্টাডি','স্টুডেন্ট','বিশ্ববিদ্যাল','অ্যাডমিশন','স্কলারশিপ')) {
    return bn
      ? 'JEL Study Abroad profile assessment, দেশ/কোর্স/বিশ্ববিদ্যালয় নির্বাচন, admission ও scholarship guidance, SOP, English-language test guidance, student-visa documents এবং pre-departure/post-arrival guidance দেয়। Admission, scholarship বা visa outcome গ্যারান্টি করা হয় না।'
      : 'JEL Study Abroad supports profile assessment, country/course/university selection, admissions and scholarship guidance, SOP, English-language tests, student-visa documents, and pre-/post-arrival guidance. Outcomes are not guaranteed.';
  }
  if (match('medical tourism','medical visa','hospital','doctor','treatment','মেডিকেল ট্যুরিজম','মেডিকেল ভিসা','হাসপাতাল','ডাক্তার','চিকিৎসা')) {
    return bn
      ? 'Journey Expert Limited medical-tourism support-এ hospital/doctor selection support, appointment coordination এবং travel preparation-এ সহায়তা করতে পারে। Treatment availability ও medical outcome official provider-এর মাধ্যমে যাচাই করতে হবে।'
      : 'Journey Expert Limited can support medical-tourism enquiries with hospital/doctor selection support, appointment coordination, and travel preparation. Treatment availability and outcomes must be verified with the provider.';
  }
  if (match('air ticket','ticketing','flight','fare','reissue','refund','ticket','টিকিট','ফ্লাইট','ফেয়ার','ফেয়ার','রিইস্যু','রিফান্ড')) {
    return bn
      ? 'Journey Expert Limited air ticketing, fare quotation, reissue এবং refund support দেয়। Live fare, seat, schedule, baggage এবং change/refund rule supplier-এর live data থেকে যাচাই করতে হবে।'
      : 'Journey Expert Limited provides air ticketing, fare quotation, reissue, and refund support. Live fares, seats, schedules, baggage, and change/refund rules must be verified from supplier data.';
  }
  if (match('visa','embassy','immigration','ভিসা','এম্বাসি','ইমিগ্রেশন')) {
    return bn
      ? 'Journey Expert Limited visa-document assistance দেয়। Current checklist, fee, processing time, eligibility ও decision সংশ্লিষ্ট official source থেকে যাচাই করতে হবে; JEL visa approval গ্যারান্টি দেয় না।'
      : 'Journey Expert Limited provides visa-document assistance. Current checklists, fees, processing times, eligibility, and decisions must be verified from official sources; JEL never guarantees approval.';
  }
  if (match('travel insurance','insurance','ইন্স্যুরেন্স','বীমা')) {
    return bn
      ? 'Journey Expert Limited travel-insurance assistance দেয়। Coverage, premium ও eligibility insurer এবং trip অনুযায়ী যাচাই করতে হবে।'
      : 'Journey Expert Limited provides travel-insurance assistance. Coverage, premium, and eligibility must be verified for the specific insurer and trip.';
  }
  if (match('corporate travel','business travel','corporate','কর্পোরেট')) {
    return bn
      ? 'Journey Expert Limited corporate travel management-এ business-travel planning, ticketing coordination, hotel support ও itinerary assistance দেয়।'
      : 'Journey Expert Limited supports corporate travel with business-travel planning, ticketing coordination, hotel support, and itinerary assistance.';
  }
  if (match('halal tourism','halal travel','হালাল ট্যুরিজম')) {
    return bn
      ? 'Journey Expert Limited halal-tourism support দেয়। Destination, travel date, group size ও halal-friendly preference অনুযায়ী plan করা যায়; live availability যাচাই করতে হবে।'
      : 'Journey Expert Limited supports halal-tourism planning around destination, dates, group size, and halal-friendly preferences; live availability must be verified.';
  }
  if (match('meet & greet','meet and greet','airport assistance','মিট অ্যান্ড গ্রিট')) {
    return bn
      ? 'JEL Meet & Greet airport arrival/departure-related assistance-এর service/co-brand। Exact scope airport, date, flight ও passenger details অনুযায়ী যাচাই করতে হবে।'
      : 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact scope depends on airport, date, flight, and passenger details.';
  }
  if (match('craft bangla','compliance','advisory','brand','ক্রাফট বাংলা','ব্র্যান্ড')) {
    return bn
      ? 'Verified JEL brand/co-brand-এর মধ্যে JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla রয়েছে।'
      : 'Verified JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.';
  }
  if (match('tour','hotel','package','holiday','ট্যুর','হোটেল','প্যাকেজ','ভ্রমণ')) {
    return bn
      ? 'Journey Expert Limited tours, hotels এবং travel package support দেয়। Live availability ও price supplier থেকে যাচাই করতে হবে।'
      : 'Journey Expert Limited supports tours, hotels, and travel packages. Live availability and prices must be verified from suppliers.';
  }
  if (match('journey expert','jel','company','office','address','contact','phone','whatsapp','email','জার্নি এক্সপার্ট','কোম্পানি','অফিস','ঠিকানা','যোগাযোগ')) {
    return bn
      ? 'Journey Expert Limited-এর verified contact: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215। WhatsApp/Hotline: +8801926400400; Telephone: +8802 9830404; Email: journeyexpertbd@gmail.com।'
      : 'Journey Expert Limited verified contact: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. WhatsApp/Hotline: +8801926400400; Telephone: +8802 9830404; Email: journeyexpertbd@gmail.com.';
  }
  return bn
    ? 'আপনার প্রশ্নের নির্দিষ্ট তথ্যটি বর্তমান verified JEL knowledge-এ নেই। ভুল তথ্য দেওয়ার বদলে এই অংশটি verify করা প্রয়োজন।'
    : 'That specific detail is not present in the current verified JEL knowledge. Rather than invent an answer, that detail needs to be verified.';
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
  const recordingTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceCatalogRef = useRef<SpeechSynthesisVoice[]>([]);

  const recordingSupported = typeof window !== 'undefined'
    && typeof MediaRecorder !== 'undefined'
    && Boolean(navigator.mediaDevices?.getUserMedia);
  const voiceInputSupported = recordingSupported || Boolean(getSpeechRecognition());

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (recordingTimeoutRef.current) window.clearTimeout(recordingTimeoutRef.current);
      if (mediaRecorderRef.current?.state === 'recording') {
        try { mediaRecorderRef.current.stop(); } catch { /* already stopped */ }
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      audioRef.current?.pause();
      if (audioRef.current) URL.revokeObjectURL(audioRef.current.src);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, []);

  // Warm the OS/browser voice list before Angela is opened. Windows, Android,
  // macOS and iOS expose different voice orders, so never trust "first Bengali voice".
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const syncVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) voiceCatalogRef.current = voices;
    };
    syncVoices();
    window.speechSynthesis.addEventListener('voiceschanged', syncVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', syncVoices);
  }, []);


  useEffect(() => {
    if (!isOpen) {
      recognitionRef.current?.stop();
      if (recordingTimeoutRef.current) window.clearTimeout(recordingTimeoutRef.current);
      if (mediaRecorderRef.current?.state === 'recording') {
        try { mediaRecorderRef.current.stop(); } catch { /* already stopped */ }
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      setIsListening(false);
    }
  }, [isOpen]);

  const unlockAudio = async () => {
    if (typeof window === 'undefined') return null;
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return null;
    try {
      let context = audioContextRef.current;
      if (!context || context.state === 'closed') {
        context = new AudioContextCtor();
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
    if (!cleanText) return;

    setError('');
    const contextPromise = unlockAudio();

    // CLOUD_FEMALE_PRIMARY_FAST: use the same JEL-rendered female voice across
    // Windows, Android, macOS and iOS when free Gemini TTS is available.
    // Quota/provider failures fall back within five seconds instead of muting Angela.
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch('/angela/speech', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, language: effectiveLanguage }),
      });
      if (response.ok && response.headers.get('content-type')?.includes('audio/wav')) {
        const blob = await response.blob();
        const context = await contextPromise;
        if (context?.state === 'running') {
          const decoded = await context.decodeAudioData((await blob.arrayBuffer()).slice(0));
          const source = context.createBufferSource();
          source.buffer = decoded;
          source.connect(context.destination);
          source.onended = () => setIsSpeaking(false);
          setIsSpeaking(true);
          setError('');
          source.start(0);
          return;
        }

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
        setIsSpeaking(true);
        await audio.play();
        return;
      }
    } catch {
      // Continue immediately to device voice fallback.
    } finally {
      window.clearTimeout(timer);
    }

    // device voice fallback: rank female/localized voices and penalize known male
    // voices so free cloud quota exhaustion does not make Angela silent or robotic.
    try {
      if (!window.speechSynthesis) throw new Error('speech_synthesis_unavailable');
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume?.();

      const voices = voiceCatalogRef.current.length
        ? voiceCatalogRef.current
        : window.speechSynthesis.getVoices();
      const preferred = getPreferredFemaleVoice(voices, effectiveLanguage);
      if (!preferred) {
        setIsSpeaking(false);
        setError(effectiveLanguage === 'bn'
          ? 'Verified female device voice পাওয়া যায়নি। Male/default voice ব্যবহার না করে উত্তরটি text হিসেবে রাখা হয়েছে।'
          : 'A verified female device voice is unavailable. Angela will stay text-only rather than use a male/default voice.');
        return;
      }
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = preferred.lang || (effectiveLanguage === 'bn' ? 'bn-BD' : 'en-US');
      utterance.rate = effectiveLanguage === 'bn' ? 1.03 : 1.0;
      utterance.pitch = effectiveLanguage === 'bn' ? 1.12 : 1.04;
      utterance.voice = preferred;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setError('');
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setError('');
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setError(effectiveLanguage === 'bn'
          ? 'এই ডিভাইসের voice চালানো যায়নি। Browser/OS voice settings পরীক্ষা করুন।'
          : 'This device could not start speech output. Check the browser/OS voice settings.');
      };

      window.speechSynthesis.speak(utterance);
      return;
    } catch {
      setIsSpeaking(false);
      setError(effectiveLanguage === 'bn'
        ? 'Cloud voice সাময়িকভাবে পাওয়া যাচ্ছে না এবং এই browser-এ device voice নেই; উত্তরটি লেখা আকারে আছে।'
        : 'Cloud voice is temporarily unavailable and this browser has no device voice; the answer remains visible as text.');
    }
  }

  const speak = async (text: string) => {
    if (!voiceEnabled) return;
    await speakWithBrowser(text);
  };

  const askAssistant = async (prompt: string) => {
    void unlockAudio();
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || isLoading) return;
    setIsLoading(true);
    setError('');
    setLastTranscript(cleanPrompt);
    setInput('');

    try {
      const response = await fetch('/angela/chat', {
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

  const blobToBase64 = async (blob: Blob): Promise<string> => {
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)));
    }
    return btoa(binary);
  };

  const transcribeRecordedAudio = async (blob: Blob) => {
    if (!blob.size) throw new Error('empty_audio');
    if (blob.size > 2_500_000) throw new Error('audio_too_large');
    const audio = await blobToBase64(blob);
    const response = await fetch('/angela/transcribe', {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audio,
        mimeType: (blob.type || 'audio/webm').split(';')[0],
        language,
      }),
    });
    const data = await response.json().catch(() => ({}));
    const transcript = typeof data.transcript === 'string' ? data.transcript.trim() : '';
    if (!response.ok || !transcript) throw new Error(data.error || 'transcription_failed');
    return transcript;
  };

  const startBrowserRecognitionFallback = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setError(language === 'bn'
        ? 'এই ব্রাউজারে microphone transcription চালু করা যাচ্ছে না। নিচে লিখে প্রশ্ন করুন।'
        : 'Microphone transcription is unavailable in this browser. Please type your question.');
      setIsListening(false);
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
      setError(language === 'bn' ? 'আপনার কথা শোনা যায়নি। আবার চেষ্টা করুন বা লিখে প্রশ্ন করুন।' : 'Voice input could not be heard. Please try again or type your question.');
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
      setError(language === 'bn' ? 'Microphone চালু করা যায়নি। নিচে লিখে প্রশ্ন করুন।' : 'Microphone access could not be started. Please use the text box instead.');
    }
  };

  const startListening = async () => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setError('');
    void unlockAudio();

    if (!recordingSupported) {
      startBrowserRecognitionFallback();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
      const mimeType = candidates.find((type) => MediaRecorder.isTypeSupported(type)) || '';
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      mediaChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) mediaChunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        setIsListening(false);
        setError(language === 'bn' ? 'Microphone recording-এ সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Microphone recording failed. Please try again.');
      };
      recorder.onstop = async () => {
        if (recordingTimeoutRef.current) window.clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
        mediaRecorderRef.current = null;
        stream.getTracks().forEach((track) => track.stop());
        if (mediaStreamRef.current === stream) mediaStreamRef.current = null;
        const blob = new Blob(mediaChunksRef.current, { type: recorder.mimeType || mimeType || 'audio/webm' });
        mediaChunksRef.current = [];
        setIsListening(false);
        try {
          setIsLoading(true);
          const transcript = await transcribeRecordedAudio(blob);
          setIsLoading(false);
          await askAssistant(transcript);
        } catch {
          setIsLoading(false);
          setError(language === 'bn'
            ? 'আপনার কথাটি লেখা হিসেবে ধরতে পারিনি। আবার বলুন বা লিখে প্রশ্ন করুন।'
            : 'I could not transcribe that recording. Please try again or type your question.');
        }
      };

      recorder.start(250);
      setIsListening(true);
      recordingTimeoutRef.current = window.setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 12000);
    } catch (error: any) {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      setIsListening(false);
      if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
        setError(language === 'bn'
          ? 'Microphone permission বন্ধ আছে। Browser settings থেকে microphone Allow করুন, অথবা লিখে প্রশ্ন করুন।'
          : 'Microphone permission is blocked. Allow microphone access in browser settings, or type your question.');
        return;
      }
      startBrowserRecognitionFallback();
    }
  };

  const stopListening = () => {
    if (recordingTimeoutRef.current) window.clearTimeout(recordingTimeoutRef.current);
    recordingTimeoutRef.current = null;
    const recorder = mediaRecorderRef.current;
    if (recorder?.state === 'recording') {
      try { recorder.stop(); } catch { /* already stopped */ }
      return;
    }
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
              <p className="mt-3 text-sm leading-6 text-[#333333]">Angela is an AI assistant, not a human. Voice input is recorded only after you tap the microphone and is sent to Journey Expert’s Gemini endpoint for transcription and reply generation; browser speech recognition is used only as a compatibility fallback. Angela uses Journey Expert's cloud female voice as the primary cross-device voice when the free provider is available. If free cloud quota is unavailable, a ranked localized/female device voice is used as a fallback so the assistant does not become silent.</p>
              <p className="mt-3 text-sm leading-6 text-[#333333]" lang="bn">অ্যাঞ্জেলা একজন AI সহকারী, মানুষ নন। আপনি microphone চাপার পর ভয়েস রেকর্ডিং Journey Expert-এর Gemini endpoint-এ transcription ও উত্তর তৈরির জন্য পাঠানো হয়; browser speech recognition শুধু compatibility fallback হিসেবে ব্যবহৃত হতে পারে। Angela প্রথমে Journey Expert-এর cloud female voice ব্যবহার করে, যাতে Windows, Android, Mac ও iPhone-এ কণ্ঠ যতটা সম্ভব একই থাকে। Free cloud quota না থাকলে ranked localized/female device voice fallback ব্যবহার হবে, যাতে কথা বন্ধ না হয়।</p>
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
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6" data-voice-contract="cloud female primary; device voice fallback">
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
            <p className="rounded-xl bg-[#F8FAF9] p-3 leading-5">{voiceInputSupported ? 'Ask Angela a question in Bangla, Banglish, or English. She will keep the conversation context.' : 'Voice input is not supported in this browser. Type your question below.'}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B6B53]" data-testid="voice-provider-status">
              Voice output: Angela · cloud female + device fallback · {language === 'bn' ? 'বাংলা' : 'English'}
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
