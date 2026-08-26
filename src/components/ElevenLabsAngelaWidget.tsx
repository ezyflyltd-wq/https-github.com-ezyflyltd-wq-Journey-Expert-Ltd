import { useCallback, useEffect, useState } from 'react';
import {
  ConversationProvider,
  useConversation,
  useConversationStatus,
} from '@elevenlabs/react';
import { useAuth } from '../firebase/authContext';
import { normalizePath } from '../routing/routes';
import {
  AngelaSessionError,
  classifyAngelaError,
  fetchAngelaSignedUrl,
  type AngelaErrorKind,
} from '../lib/angelaSession';
import { friendlyAngelaMessage } from '../lib/angelaMessages';

export const ANGELA_AGENT_ID = 'agent_4301m0ypmnzzepdvcte0zqg7sfdh';
const SUPPORT_PHONE = '+8801926400400';
const DISCLOSURE_URL = 'https://elevenlabs.io/docs/eleven-agents/legal/disclosure-requirement';

const PUBLIC_WIDGET_PATHS = new Set([
  '/', '/flights', '/hotels', '/packages', '/visa', '/study-abroad',
  '/hajj-umrah', '/healthcare-insurance', '/concierge', '/craft-bangla',
  '/corporate-travel', '/dmc-marketplace', '/b2b-marketplace', '/mobile-apps',
  '/seo-growth', '/customer-support', '/international-expansion',
  '/innovation-lab', '/business-units', '/developer', '/ai/travel-planner',
  '/ai-agent-ecosystem', '/enterprise/blueprint', '/enterprise/design-system',
  '/enterprise-cms-knowledge',
]);

export function isPublicAngelaRoute(pathname: string): boolean {
  return PUBLIC_WIDGET_PATHS.has(normalizePath(pathname));
}

function PrivateAngelaDisclosure({ onAccept }: { onAccept: () => void }) {
  return (
    <aside
      className="mx-auto my-6 max-w-3xl border border-[#C7A44D]/50 bg-[#FFFDF6] px-5 py-5 text-left shadow-sm sm:px-7"
      aria-labelledby="angela-private-disclosure-title"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Journey Expert Ltd. AI support</p>
          <h2 id="angela-private-disclosure-title" className="mt-1 text-xl font-bold text-[#093F31]">
            Before you talk with Anjela
          </h2>
        </div>
        <p className="text-sm leading-6 text-[#333333]">
          Anjela is an AI assistant of Journey Expert Ltd., not a human. By selecting “Agree and continue,” you acknowledge that your conversation may be recorded, stored, viewed, and shared with ElevenLabs and third-party large language model providers to provide, improve, and secure this service and comply with applicable law.
        </p>
        <p className="text-sm leading-6 text-[#333333]" lang="bn">
          Anjela Journey Expert Ltd.-এর একটি AI সহকারী, মানুষ নয়। “সম্মত হয়ে চালিয়ে যান” নির্বাচন করলে আপনি স্বীকার করছেন যে পরিষেবা দেওয়া, উন্নত করা, নিরাপদ রাখা এবং আইন মেনে চলার জন্য আপনার কথোপকথন রেকর্ড, সংরক্ষণ, দেখা এবং ElevenLabs ও তৃতীয় পক্ষের বড় ভাষা মডেল সরবরাহকারীদের সঙ্গে শেয়ার করা হতে পারে।
        </p>
        <p className="text-xs leading-5 text-[#555555]">
          Replies may be incomplete or inaccurate. Do not share passport, bank, payment, or other sensitive documents. Visa and travel decisions remain with the relevant authorities. Read the{' '}
          <a className="font-semibold text-[#0B6B53] underline underline-offset-2" href={DISCLOSURE_URL} target="_blank" rel="noreferrer">
            ElevenLabs disclosure guidance
          </a>
          .
        </p>
        <p className="text-xs leading-5 text-[#555555]" lang="bn">
          উত্তর অসম্পূর্ণ বা ভুল হতে পারে। পাসপোর্ট, ব্যাংক, পেমেন্ট বা অন্য কোনো সংবেদনশীল নথি শেয়ার করবেন না। ভিসা ও ভ্রমণ সংক্রান্ত সিদ্ধান্ত সংশ্লিষ্ট কর্তৃপক্ষের।
        </p>
        <div className="flex flex-col gap-3 border-t border-[#E8E1CF] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center bg-[#093F31] px-5 py-3 text-sm font-bold text-white hover:bg-[#0B6B53] focus:outline-none focus:ring-2 focus:ring-[#C7A44D] focus:ring-offset-2"
            onClick={onAccept}
          >
            Agree and continue / সম্মত হয়ে চালিয়ে যান
          </button>
          <p className="text-sm text-[#333333]">
            Need human support?{' '}
            <a className="font-bold text-[#0B6B53] underline underline-offset-2" href={`tel:${SUPPORT_PHONE}`}>
              Call +880 1926-400400
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}

function PrivateAngelaControls() {
  const { user, signInWithGoogle } = useAuth();
  const [errorKind, setErrorKind] = useState<AngelaErrorKind | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { startSession, endSession } = useConversation({
    onError: (error) => setErrorKind(classifyAngelaError(error)),
  });
  const { status } = useConversationStatus();

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting' || isOpening;

  useEffect(() => {
    if (isConnected) setErrorKind(null);
  }, [isConnected]);

  const signIn = useCallback(async () => {
    setIsSigningIn(true);
    setErrorKind(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrorKind(classifyAngelaError(error));
    } finally {
      setIsSigningIn(false);
    }
  }, [signInWithGoogle]);

  const startAngela = useCallback(async () => {
    if (isConnecting || isConnected) return;
    if (!user) {
      setErrorKind('auth');
      return;
    }

    setIsOpening(true);
    setErrorKind(null);
    try {
      const idToken = await user.getIdToken();
      const signedUrl = await fetchAngelaSignedUrl(idToken);
      await startSession({ signedUrl, connectionType: 'websocket' });
    } catch (error) {
      setErrorKind(error instanceof AngelaSessionError ? error.kind : classifyAngelaError(error));
    } finally {
      setIsOpening(false);
    }
  }, [isConnected, isConnecting, startSession, user]);

  const stopAngela = useCallback(async () => {
    try {
      await endSession();
    } catch (error) {
      setErrorKind(classifyAngelaError(error));
    }
  }, [endSession]);

  return (
    <aside aria-label="Angela AI Concierge" className="fixed bottom-5 right-5 z-50 max-w-[calc(100vw-2rem)]">
      <div className="space-y-2">
        {errorKind && (
          <div role="alert" aria-live="assertive" className="max-w-80 rounded-lg bg-white px-3 py-2 text-xs text-[#081C15] shadow">
            <p className="font-bold">{friendlyAngelaMessage(errorKind)}</p>
            <p className="mt-1">
              Please try again later or call{' '}
              <a href={`tel:${SUPPORT_PHONE}`} className="font-bold underline">+880 1926-400400</a>.
            </p>
          </div>
        )}

        {isConnected ? (
          <button type="button" onClick={stopAngela} className="rounded-full bg-[#081C15] px-5 py-3 text-sm font-bold text-white shadow-lg">
            End conversation
          </button>
        ) : user ? (
          <button
            type="button"
            onClick={startAngela}
            disabled={isConnecting}
            aria-busy={isConnecting}
            className="rounded-full bg-[#081C15] px-5 py-3 text-sm font-bold text-white shadow-lg disabled:cursor-wait disabled:opacity-70"
          >
            {isConnecting ? 'Connecting to Angela…' : 'Talk to Angela'}
          </button>
        ) : (
          <button
            type="button"
            onClick={signIn}
            disabled={isSigningIn}
            aria-busy={isSigningIn}
            className="rounded-full bg-[#081C15] px-5 py-3 text-sm font-bold text-white shadow-lg disabled:cursor-wait disabled:opacity-70"
          >
            {isSigningIn ? 'Signing in…' : 'Sign in to talk to Angela'}
          </button>
        )}
      </div>
    </aside>
  );
}

export function AngelaPrivateSdkProvider() {
  return (
    <ConversationProvider>
      <PrivateAngelaControls />
    </ConversationProvider>
  );
}

export function AngelaPrivateSdkMount({ pathname }: { pathname: string }) {
  const [hasAcceptedDisclosure, setHasAcceptedDisclosure] = useState(false);
  if (!isPublicAngelaRoute(pathname)) return null;
  if (!hasAcceptedDisclosure) return <PrivateAngelaDisclosure onAccept={() => setHasAcceptedDisclosure(true)} />;
  return <AngelaPrivateSdkProvider />;
}
