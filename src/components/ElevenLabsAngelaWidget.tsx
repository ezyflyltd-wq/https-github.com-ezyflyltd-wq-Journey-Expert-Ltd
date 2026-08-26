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

const SUPPORT_PHONE = '+8801926400400';

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
  if (!isPublicAngelaRoute(pathname)) return null;
  return <AngelaPrivateSdkProvider />;
}
