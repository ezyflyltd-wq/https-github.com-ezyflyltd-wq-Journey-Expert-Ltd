// [approved-production-change] Meta transport is disabled until secrets and assets are configured.
export type MetaMessage = { channel: 'messenger' | 'instagram' | 'whatsapp'; asset: string; sender: string; id: string; text: string };
export type MetaEnv = Record<string, any>;
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
export const result = (status: number, value: string) => new Response(value, { status, headers });

export async function validSignature(raw: Uint8Array, signature: string | null, secret: string): Promise<boolean> {
  if (!secret || !signature || !/^sha256=[a-f0-9]{64}$/.test(signature)) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const bytes = Uint8Array.from(signature.slice(7).match(/../g)!, part => parseInt(part, 16));
  return crypto.subtle.verify('HMAC', key, bytes, raw);
}

export function messagesFrom(payload: any, env: MetaEnv): MetaMessage[] {
  const output: MetaMessage[] = [];
  if (!Array.isArray(payload?.entry)) return output;
  for (const entry of payload.entry) {
    if (payload.object === 'page' || payload.object === 'instagram') {
      const channel = payload.object === 'page' ? 'messenger' : 'instagram';
      const allowed = channel === 'messenger' ? env.META_PAGE_ID : env.META_INSTAGRAM_ID;
      if (!allowed || String(entry.id) !== allowed) continue;
      for (const event of Array.isArray(entry.messaging) ? entry.messaging : []) {
        if (!Number.isFinite(event.timestamp) || event.timestamp > Date.now() + 300_000 || event.timestamp < Date.now() - 23 * 3600_000) continue;
        if (event.message?.is_echo || event.message?.is_deleted || event.message?.is_unsupported) continue;
        if (String(event.recipient?.id) !== allowed || String(event.sender?.id) === allowed) continue;
        if (typeof event.message?.mid !== 'string' || typeof event.message?.text !== 'string' || !event.sender?.id) continue;
        output.push({ channel, asset: allowed, sender: String(event.sender.id), id: event.message.mid, text: event.message.text.trim().slice(0, 4000) });
      }
    } else if (payload.object === 'whatsapp_business_account') {
      if (!env.META_WABA_ID || String(entry.id) !== env.META_WABA_ID) continue;
      for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
        const value = change.value;
        if (change.field !== 'messages' || !env.META_WHATSAPP_PHONE_ID || value?.metadata?.phone_number_id !== env.META_WHATSAPP_PHONE_ID) continue;
        for (const message of Array.isArray(value.messages) ? value.messages : []) {
          const timestamp = Number(message.timestamp) * 1000;
          if (!Number.isFinite(timestamp) || timestamp > Date.now() + 300_000 || timestamp < Date.now() - 23 * 3600_000) continue;
          if (message.type !== 'text' || typeof message.text?.body !== 'string' || typeof message.id !== 'string' || !message.from) continue;
          output.push({ channel: 'whatsapp', asset: env.META_WHATSAPP_PHONE_ID, sender: String(message.from), id: message.id, text: message.text.body.trim().slice(0, 4000) });
        }
      }
    }
  }
  return output.filter(message => message.text);
}

export function sendConfiguration(message: MetaMessage, env: MetaEnv, reply: string) {
  if (!/^v\d+\.\d+$/.test(env.META_GRAPH_VERSION || '')) throw new Error('Missing Graph version');
  const token = message.channel === 'messenger' ? env.META_PAGE_ACCESS_TOKEN : message.channel === 'instagram' ? env.META_INSTAGRAM_ACCESS_TOKEN : env.META_WHATSAPP_ACCESS_TOKEN;
  if (!token) throw new Error('Missing messaging token');
  return {
    url: `https://graph.facebook.com/${env.META_GRAPH_VERSION}/${encodeURIComponent(message.asset)}/messages`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(message.channel === 'whatsapp'
        ? { messaging_product: 'whatsapp', to: message.sender, type: 'text', text: { body: reply.slice(0, 1800) } }
        : { recipient: { id: message.sender }, ...(message.channel === 'messenger' ? { messaging_type: 'RESPONSE' } : {}), message: { text: reply.slice(0, 1800) } }),
    },
  };
}

export async function eventKey(message: MetaMessage): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${message.channel}:${message.asset}:${message.id}`));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}
