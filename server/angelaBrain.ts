export type AngelaRole = 'user' | 'assistant';

export type AngelaHistoryTurn = {
  role: AngelaRole;
  content: string;
};

export type AngelaLead = {
  destination?: string;
  purpose?: string;
  travelDate?: string;
  travellers?: string;
  duration?: string;
  budget?: string;
  service?: string;
  name?: string;
  phone?: string;
  email?: string;
};

export type AngelaResponse = {
  reply: string;
  language: 'bn' | 'en' | 'ar';
  intent: string;
  confidence: number;
  nextQuestion: string;
  lead: AngelaLead;
  handoffRequired: boolean;
  handoffReason: string;
  usedSources: string[];
};

export const ANGELA_SYSTEM_PROMPT = `You are Angela, the official AI Travel and Education Assistant of Journey Expert Ltd. (JEL), Bangladesh.

Your job is to understand the customer's spoken or typed question, answer the actual question first, ask only the next useful question, and guide the customer toward the correct JEL service.

LANGUAGE
- Reply in natural Bangla when the customer speaks Bangla or Banglish.
- Reply in English when the customer speaks English.
- Reply in Arabic only when the customer asks for Arabic.
- If languages are mixed, use the dominant language and keep common travel terms in English when natural.
- Voice replies must be short, clear, warm, and easy to understand aloud.

PERSONALITY
- Professional female travel consultant: calm, friendly, confident, respectful, and concise.
- Never sound robotic, argumentative, or overconfident.
- Do not repeat the full introduction on every turn. Introduce yourself only in the first turn or when asked.

SUPPORTED AREAS
- Air ticketing and flight planning.
- Hotel booking.
- Tour packages and destination guidance.
- Tourist, business, transit, and student visa guidance.
- Hajj and Umrah.
- Study abroad.
- Medical, halal, corporate, group, and travel-insurance services.

ANSWER POLICY
1. Use retrieved JEL knowledge first.
2. For time-sensitive information, use an approved official source or connected live API.
3. Never invent prices, schedules, availability, processing times, policies, discounts, visa rules, admission results, or booking status.
4. Clearly distinguish information, estimate, quotation, availability, reservation, confirmed booking, payment, and refund.
5. Never claim that a booking, payment, quotation, visa approval, university offer, refund, or reservation is completed unless a connected system confirms it.
6. If the answer cannot be verified, say so briefly and offer a consultant handoff.
7. Never guarantee visa approval, admission, processing time, or immigration outcome.

CONVERSATION BEHAVIOUR
- Answer the customer's question before asking a follow-up question.
- Ask at most one or two questions at a time.
- Preserve context from earlier turns. If the customer says “চারজন” or “আগামী ডিসেম্বর”, apply it to the destination and trip already being discussed.
- For a new travel request, collect progressively: destination, purpose, travel date, travellers, duration, budget, hotel/flight preference, and visa need.
- Do not ask for information unnecessary for the next step.

LEAD AND HANDOFF
- If the customer wants a booking, quotation, payment, refund, complaint resolution, urgent travel help, complex visa case, corporate/group/custom package, medical tourism, or student application, collect only the necessary requirement and contact details and set handoffRequired=true.
- Do not request passport number, card number, bank details, password, OTP, or sensitive document contents in chat or voice.
- Say that a Journey Expert consultant will review the request. Do not pretend that transfer already occurred unless a handoff tool confirms it.
- Human support phone: +880 1926-400400.

OUTPUT
Return valid JSON only with this exact shape:
{
  "reply": "spoken answer in the customer's language",
  "language": "bn|en|ar",
  "intent": "one concise intent label",
  "confidence": 0.0,
  "nextQuestion": "one optional next question or empty string",
  "lead": {"destination":"", "purpose":"", "travelDate":"", "travellers":"", "duration":"", "budget":"", "service":"", "name":"", "phone":"", "email":""},
  "handoffRequired": false,
  "handoffReason": "",
  "usedSources": []
}`;

const JEL_KNOWLEDGE: Array<{ keywords: string[]; text: string; source: string }> = [
  {
    keywords: ['journey expert', 'jel', 'company', 'জার্নি', 'কোম্পানি', 'অ্যাঞ্জেলা'],
    text: 'Journey Expert Ltd. is the customer-facing travel and global mobility brand represented by Angela. Angela can guide customers toward air tickets, hotels, tours, visa support, Hajj and Umrah, study abroad, medical tourism, halal tourism, corporate travel, and travel insurance services.',
    source: 'JEL Service Catalogue',
  },
  {
    keywords: ['flight', 'air ticket', 'ticket', 'বিমান', 'ফ্লাইট', 'টিকেট'],
    text: 'JEL can assist with domestic and international air-ticket enquiries. Fare, seat availability, baggage, cancellation, reissue, and refund terms depend on the route, airline, travel date, fare family, and current supplier rules and must be verified before purchase.',
    source: 'JEL Air Ticketing Service Guide',
  },
  {
    keywords: ['hotel', 'হোটেল', 'room', 'রুম'],
    text: 'JEL can assist with hotel enquiries. Availability, room type, meal plan, cancellation, check-in, and price depend on destination, dates, occupancy, hotel category, and live supplier inventory.',
    source: 'JEL Hotel Service Guide',
  },
  {
    keywords: ['tour', 'package', 'ভ্রমণ', 'ট্যুর', 'প্যাকেজ', 'dubai', 'malaysia', 'thailand', 'singapore', 'maldives'],
    text: 'JEL can help plan destination tours and packages. A suitable option depends on destination, purpose, travel dates, number of travellers, duration, budget, hotel preference, flight preference, and visa needs.',
    source: 'JEL Tour Service Guide',
  },
  {
    keywords: ['visa', 'ভিসা', 'embassy', 'ইমিগ্রেশন', 'immigration'],
    text: 'JEL can provide general visa-document guidance, but visa rules can change and approval is decided by the relevant authority. Current requirements, fees, processing times, and eligibility must be verified with the applicable official source before submission or payment.',
    source: 'JEL Visa Guidance Policy',
  },
  {
    keywords: ['study', 'student', 'university', 'ielts', 'admission', 'পড়াশোনা', 'স্টুডেন্ট', 'বিশ্ববিদ্যালয়'],
    text: 'JEL can guide study-abroad enquiries. Country, subject, academic qualification, graduation year, English proficiency, preferred intake, and budget are useful for the next step. Admission and visa outcomes cannot be guaranteed.',
    source: 'JEL Study Abroad Service Guide',
  },
  {
    keywords: ['hajj', 'umrah', 'হজ', 'ওমরাহ', 'মক্কা', 'মদিনা'],
    text: 'JEL can assist with Hajj and Umrah enquiries, including package requirements, travel, accommodation, transport, and visa guidance. Package details, availability, and price must be confirmed for the requested season and traveller profile.',
    source: 'JEL Hajj and Umrah Service Guide',
  },
];

function normalize(value: string): string {
  return value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
}

export function retrieveJelKnowledge(query: string): string {
  const normalized = normalize(query);
  const ranked = JEL_KNOWLEDGE
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce((score, keyword) => score + (normalized.includes(keyword) ? 1 : 0), 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!ranked.length) {
    return 'No specific JEL knowledge entry matched this question. Do not invent an answer; explain what can be verified and offer human support when the request is case-specific or time-sensitive.';
  }

  return ranked.map(({ entry }) => `[${entry.source}] ${entry.text}`).join('\n');
}

function detectLanguage(value: string, requested?: string): 'bn' | 'en' | 'ar' {
  if (requested === 'bn' || requested === 'ar' || requested === 'en') return requested;
  if (/[ -]/.test(value) && /[\u0600-\u06FF]/.test(value)) return 'ar';
  if (/[\u0980-\u09FF]/.test(value)) return 'bn';
  return 'en';
}

function fallbackReply(message: string, requestedLanguage?: string): AngelaResponse {
  const language = detectLanguage(message, requestedLanguage);
  const isBangla = language === 'bn';
  const isArabic = language === 'ar';
  return {
    reply: isBangla
      ? `আমি আপনার প্রশ্নটি বুঝেছি: “${message}”। নির্ভুল ও বর্তমান তথ্য যাচাই করার জন্য আপনার গন্তব্য, ভ্রমণের তারিখ এবং প্রয়োজনীয় service জানালে আমি পরবর্তী ধাপটি বুঝিয়ে দিতে পারি। quotation বা booking-এর জন্য Journey Expert consultant-এর সঙ্গে কথা বলুন: +880 1926-400400।`
      : isArabic
        ? `فهمت سؤالك: “${message}”. للحصول على معلومات دقيقة ومحدثة، أخبرني بالوجهة وتاريخ السفر والخدمة المطلوبة. للاستفسار عن السعر أو الحجز تواصل مع مستشار Journey Expert على الرقم +880 1926-400400.`
        : `I understand your question: “${message}”. To guide you accurately, please share your destination, travel date, and required service. For a verified quotation or booking, contact a Journey Expert consultant at +880 1926-400400.`,
    language,
    intent: 'GENERAL_TRAVEL_ENQUIRY',
    confidence: 0.52,
    nextQuestion: isBangla ? 'আপনার গন্তব্য, ভ্রমণের তারিখ এবং কোন service প্রয়োজন তা জানাবেন?' : 'What is your destination, travel date, and required service?',
    lead: {},
    handoffRequired: false,
    handoffReason: '',
    usedSources: ['JEL safe fallback'],
  };
}

function coerceString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeLead(value: unknown): AngelaLead {
  if (!value || typeof value !== 'object') return {};
  const source = value as Record<string, unknown>;
  return {
    destination: coerceString(source.destination),
    purpose: coerceString(source.purpose),
    travelDate: coerceString(source.travelDate),
    travellers: coerceString(source.travellers),
    duration: coerceString(source.duration),
    budget: coerceString(source.budget),
    service: coerceString(source.service),
    name: coerceString(source.name),
    phone: coerceString(source.phone),
    email: coerceString(source.email),
  };
}

export function parseAngelaResponse(raw: string, message: string, requestedLanguage?: string): AngelaResponse {
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    const reply = coerceString(parsed.reply);
    if (!reply) return fallbackReply(message, requestedLanguage);
    const language = detectLanguage(reply, coerceString(parsed.language) || requestedLanguage);
    const confidenceValue = Number(parsed.confidence);
    return {
      reply,
      language,
      intent: coerceString(parsed.intent) || 'GENERAL_TRAVEL_ENQUIRY',
      confidence: Number.isFinite(confidenceValue) ? Math.min(1, Math.max(0, confidenceValue)) : 0.6,
      nextQuestion: coerceString(parsed.nextQuestion),
      lead: sanitizeLead(parsed.lead),
      handoffRequired: parsed.handoffRequired === true,
      handoffReason: coerceString(parsed.handoffReason),
      usedSources: Array.isArray(parsed.usedSources) ? parsed.usedSources.filter((item): item is string => typeof item === 'string').slice(0, 8) : [],
    };
  } catch {
    return {
      ...fallbackReply(message, requestedLanguage),
      reply: raw.trim() || fallbackReply(message, requestedLanguage).reply,
      usedSources: ['JEL response safety fallback'],
    };
  }
}

export function sanitizeHistory(history: unknown): AngelaHistoryTurn[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item): item is { role: unknown; content: unknown } => Boolean(item) && typeof item === 'object')
    .map((item) => ({
      role: item.role === 'assistant' ? 'assistant' as const : 'user' as const,
      content: coerceString(item.content),
    }))
    .filter((item) => item.content.length > 0)
    .slice(-12);
}

export function fallbackAngelaResponse(message: string, requestedLanguage?: string): AngelaResponse {
  return fallbackReply(message, requestedLanguage);
}
