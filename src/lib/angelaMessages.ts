import type { AngelaErrorKind } from './angelaSession';

export function friendlyAngelaMessage(kind: AngelaErrorKind): string {
  switch (kind) {
    case 'quota':
      return 'Angela is temporarily unavailable because the voice service has reached its current usage limit.';
    case 'microphone':
      return 'Microphone access is needed to talk with Angela. Please allow access and try again.';
    case 'auth':
      return 'Angela needs a verified sign-in before starting a private conversation.';
    default:
      return 'Angela could not connect to the voice service right now.';
  }
}
