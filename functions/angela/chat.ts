type Context = { request: Request; env: Record<string, string | undefined> };

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  },
});

function detectLanguage(message: string, requested?: string): 'bn' | 'en' {
  if (requested === 'bn' || requested === 'en') return requested;
  if (/[\u0980-\u09FF]/.test(message)) return 'bn';
  if (/\b(ami|amar|amake|apni|apnar|tumi|tomar|chai|jabo|jete|koto|kivabe|ki|keno|kobe|hobe|korbo|korte|lagbe|bolen|diben|pari|parbo|visa|ticket|tour|umrah|hajj)\b/i.test(message)) return 'bn';
  return 'en';
}

const VERIFIED_JEL = `
Journey Expert Ltd. (JEL), Bangladesh.
Slogan: "Your Journey, Our Expertise."
Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh.
WhatsApp/Hotline: +8801926400400. Telephone: +8802 9830404. Email: journeyexpertbd@gmail.com.
Core services: air ticketing; fare quotation; reissue/refund support; visa-document assistance; tours and travel; hotels; Hajj and Umrah; halal tourism; medical tourism; travel insurance; corporate travel management; Meet & Greet; Study Abroad.
JEL Study Abroad services: profile assessment; country/course/university selection; admissions guidance; scholarships; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance.
Detailed Study Abroad portal: journeyexpertbd.com.
Main Journey Expert corporate portal: journeyexpertltd.com.
Known JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.
`;

function fallback(language: 'bn' | 'en') {
  return language === 'bn'
    ? 'আমি অ্যাঞ্জেলা, Journey Expert Limited-এর AI সহকারী। এয়ার টিকিট, ভিসা সহায়তা, ট্যুর ও হোটেল, হজ-ওমরাহ, মেডিকেল ও হালাল ট্যুরিজম, ইন্স্যুরেন্স, কর্পোরেট ট্রাভেল, Meet & Greet এবং Study Abroad বিষয়ে সাহায্য করতে পারি। আপনার নির্দিষ্ট প্রশ্নটি বলুন—যাচাই করা JEL তথ্যকে অগ্রাধিকার দিয়ে উত্তর দেব।'
    : "I am Angela, Journey Expert Limited's AI assistant. I can help with air tickets, visa assistance, tours and hotels, Hajj and Umrah, medical and halal tourism, insurance, corporate travel, Meet & Greet, and Study Abroad. Ask your specific question and I will prioritize verified JEL information.";
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid_json' }, 400); }

  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 6000) : '';
  if (!message) return json({ error: 'message_required' }, 400);

  const language = detectLanguage(message, body?.language);
  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();
  if (!key) return json({ reply: fallback(language), language, mode: 'fallback' });

  const history = Array.isArray(body?.history)
    ? body.history
        .filter((turn: any) => turn && typeof turn.content === 'string' && turn.content.trim())
        .slice(-10)
        .map((turn: any) => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.content.trim().slice(0, 2000) }],
        }))
    : [];

  const languageInstruction = language === 'bn'
    ? 'Reply in natural professional Bengali script. Keep brand names and technical terms in English where natural.'
    : 'Reply in concise professional English.';

  const system = `You are Angela, the official AI Assistant of Journey Expert Ltd. in Bangladesh.

VERIFIED JEL SOURCE OF TRUTH:
${VERIFIED_JEL}

RULES:
- Answer the user's actual question first.
- For Journey Expert Ltd. questions, the verified JEL facts above have priority. Never invent company facts, partnerships, prices, live inventory, booking status, payment status, visa outcomes, admission outcomes, scholarship outcomes, or processing times.
- You may answer general knowledge questions professionally using the model's knowledge.
- When a fact is current, time-sensitive, or may have changed, only call it current if Google Search grounding is enabled in this request; otherwise say it should be verified from the relevant official source.
- Never guarantee visa approval, immigration outcome, admission, scholarship, fare, seat, hotel inventory, refund, or consular decision.
- Never request passwords, OTPs, card numbers, bank credentials, or unnecessary sensitive document contents.
- Keep normal voice-friendly answers concise: usually 2-5 sentences unless the user asks for detail.
- Both journeyexpertltd.com and journeyexpertbd.com are JEL public portals. Answer verified JEL service questions directly on either portal instead of unnecessarily bouncing the user between sites.
- For detailed education counselling, journeyexpertbd.com is the dedicated JEL Study Abroad portal when useful.
${languageInstruction}`;

  const models = ['gemini-3.8-flash', 'gemini-3.5-flash'];
  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), model === 'gemini-3.8-flash' ? 9000 : 6500);
    try {
      const requestBody: any = {
        systemInstruction: { parts: [{ text: system }] },
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 720 },
      };
      if (model === 'gemini-3.8-flash') requestBody.generationConfig.thinkingConfig = { thinkingLevel: 'low' };
      const groundingEnabled = env.GOOGLE_SEARCH_GROUNDING === 'true';
      if (groundingEnabled) requestBody.tools = [{ google_search: {} }];

      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify(requestBody),
      });
      if (!upstream.ok) continue;

      const data: any = await upstream.json();
      const candidate = data?.candidates?.[0];
      const reply = candidate?.content?.parts
        ?.filter((part: any) => !part.thought && typeof part.text === 'string')
        .map((part: any) => part.text)
        .join('')
        .trim();

      if (!reply) continue;
      if (language === 'bn' && !/[\u0980-\u09FF]/.test(reply)) continue;
      if (language === 'en' && /[\u0980-\u09FF]/.test(reply)) continue;

      return json({
        reply,
        language,
        mode: 'ai',
        providerModel: model,
        grounded: Boolean(candidate?.groundingMetadata),
      });
    } catch {
      // Try the next bounded Gemini model.
    } finally {
      clearTimeout(timer);
    }
  }

  return json({ reply: fallback(language), language, mode: 'fallback' });
}
