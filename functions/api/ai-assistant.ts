type WorkersAI = {
  run: (
    model: string,
    input: {
      messages: Array<{ role: 'system' | 'user'; content: string }>;
      max_tokens?: number;
      temperature?: number;
    },
  ) => Promise<{ response?: string }>;
};

type PagesEnv = {
  AI?: WorkersAI;
};

const MODEL = '@cf/meta/llama-3.1-8b-instruct';
const MAX_PROMPT_LENGTH = 1200;
const SYSTEM_PROMPT = `You are Angela, the AI travel and global-mobility assistant for Journey Expert Ltd. Answer in Bangla or English according to the user's language. Help with public information about flights, hotels, tours, visa-information preparation, study-abroad pathways, and human support. You are not human. Never promise visa approval, admission, scholarship, fare availability, booking issuance, refunds, payment success, or any government or airline decision. Never request or accept passport numbers, bank/card details, OTPs, passwords, or confidential documents. If the user asks for payment, booking issuance, a legal or immigration determination, or anything uncertain, direct them to human support at +880 1926-400400 or journeyexpertltd@gmail.com. Keep answers concise and clearly label estimates or general information.`;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

export const onRequestPost = async ({ request, env }: { request: Request; env: PagesEnv }): Promise<Response> => {
  let body: { prompt?: unknown; systemContext?: unknown };
  try {
    body = await request.json() as { prompt?: unknown; systemContext?: unknown };
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) return json({ error: 'Prompt is required' }, 400);
  if (prompt.length > MAX_PROMPT_LENGTH) return json({ error: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer` }, 413);

  if (!env.AI) {
    return json({ error: 'Workers AI binding is not configured' }, 503);
  }

  const systemContext = typeof body.systemContext === 'string' && body.systemContext.trim().length <= 4000
    ? body.systemContext.trim()
    : SYSTEM_PROMPT;

  try {
    const result = await env.AI.run(MODEL, {
      messages: [
        { role: 'system', content: systemContext },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.4,
    });

    return json({
      reply: result.response || 'I could not generate a response right now. Please call +880 1926-400400.',
      sources: ['JEL AI Gateway (Cloudflare Workers AI)', 'JEL public service information'],
    });
  } catch (error) {
    console.error('Workers AI request failed', error);
    return json({ error: 'AI service temporarily unavailable' }, 503);
  }
};
