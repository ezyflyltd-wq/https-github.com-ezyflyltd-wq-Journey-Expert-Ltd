export type AngelaErrorKind = 'quota' | 'microphone' | 'auth' | 'provider';

export class AngelaSessionError extends Error {
  readonly kind: AngelaErrorKind;
  readonly status?: number;

  constructor(kind: AngelaErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'AngelaSessionError';
    this.kind = kind;
    this.status = status;
  }
}

function classifyText(value: unknown): AngelaErrorKind {
  const text = typeof value === 'string'
    ? value
    : value instanceof Error
      ? value.message
      : '';
  const normalized = text.toLowerCase();

  if (/quota|credit|included minutes|concurr|rate limit|too many requests|payment required|\b429\b|\b402\b/.test(normalized)) {
    return 'quota';
  }
  if (/microphone|permission|notallowederror|audio input|user denied|denied/.test(normalized)) {
    return 'microphone';
  }
  if (/unauthorized|forbidden|authentication|signed url|token/.test(normalized)) {
    return 'auth';
  }
  return 'provider';
}

export function classifyAngelaError(error: unknown): AngelaErrorKind {
  if (error instanceof AngelaSessionError) return error.kind;
  return classifyText(error);
}

type SignedUrlPayload = { signedUrl?: unknown; error?: unknown };

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export async function fetchAngelaSignedUrl(
  idToken: string,
  fetchImpl: FetchLike = fetch,
): Promise<string> {
  const response = await fetchImpl('/api/elevenlabs/signed-url', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${idToken}`,
    },
    credentials: 'same-origin',
  });

  let payload: SignedUrlPayload = {};
  try {
    payload = await response.json() as SignedUrlPayload;
  } catch {
    // Keep the user-facing error generic; do not display HTML or raw provider data.
  }

  if (response.status === 401 || response.status === 403) {
    throw new AngelaSessionError('auth', 'Angela authentication is required.', response.status);
  }
  if (response.status === 402 || response.status === 429) {
    throw new AngelaSessionError('quota', 'Angela voice service usage limit reached.', response.status);
  }
  if (!response.ok) {
    throw new AngelaSessionError('provider', 'Angela voice service is temporarily unavailable.', response.status);
  }

  if (typeof payload.signedUrl !== 'string' || payload.signedUrl.length < 20 || !payload.signedUrl.startsWith('wss://')) {
    throw new AngelaSessionError('provider', 'Angela returned an invalid session.', response.status);
  }

  return payload.signedUrl;
}
