import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_ID = '973366755816560';
const CONSENT_KEY = 'jel_analytics_consent';
const SCRIPT_ID = 'jel-meta-pixel-script';

type Consent = 'unknown' | 'granted' | 'denied';
let inMemoryConsent: Exclude<Consent, 'unknown'> | undefined;
type Fbq = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  version?: string;
  queue?: unknown[];
  callMethod?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function readConsent(): Consent {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unknown';
  } catch {
    return inMemoryConsent ?? 'unknown';
  }
}

function hasAnalyticsConsent() {
  return readConsent() === 'granted';
}

function setAnalyticsConsent(value: Exclude<Consent, 'unknown'>) {
  inMemoryConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // If storage is unavailable, tracking remains disabled because the choice cannot be persisted.
  }
  window.dispatchEvent(new CustomEvent('jel:analytics-consent', { detail: value }));
}

function loadPixel() {
  if (typeof window === 'undefined') return;

  if (window.fbq) {
    window.fbq('consent', 'grant');
    return;
  }
  if (document.getElementById(SCRIPT_ID)) return;

  const fbq: Fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue = fbq.queue || [];
      fbq.queue.push(args);
    }
  }) as Fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  fbq('consent', 'grant');
  fbq('init', PIXEL_ID);
}

function revokePixelConsent() {
  window.fbq?.('consent', 'revoke');
}

function track(...args: unknown[]) {
  if (hasAnalyticsConsent()) window.fbq?.(...args);
}

function trackContact(target: HTMLAnchorElement) {
  const href = target.href.toLowerCase();
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('wa.me/') || href.includes('whatsapp.com/')) {
    const channel = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : 'whatsapp';
    track('track', 'Contact', { content_name: 'website_contact_link', content_category: channel });
  }
}

export function MetaPixel() {
  const location = useLocation();
  const [consent, setConsent] = useState<Consent>(readConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(() => readConsent() === 'unknown');

  useEffect(() => {
    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<Exclude<Consent, 'unknown'>>).detail;
      if (value !== 'granted' && value !== 'denied') return;
      setConsent(value);
      setPreferencesOpen(false);
      if (value === 'granted') loadPixel();
      else revokePixelConsent();
    };
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener('jel:analytics-consent', onConsent);
    window.addEventListener('jel:open-privacy-settings', openPreferences);
    return () => {
      window.removeEventListener('jel:analytics-consent', onConsent);
      window.removeEventListener('jel:open-privacy-settings', openPreferences);
    };
  }, []);

  useEffect(() => {
    if (consent !== 'granted') return;
    loadPixel();
    const timer = window.setTimeout(() => track('track', 'PageView'), 0);
    return () => window.clearTimeout(timer);
  }, [consent, location.pathname, location.search]);

  useEffect(() => {
    if (consent !== 'granted') return;
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a');
      if (target instanceof HTMLAnchorElement) trackContact(target);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [consent]);

  return (
    <>
      {preferencesOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-[#0B6B53]/20 bg-white/95 p-4 shadow-2xl backdrop-blur" role="dialog" aria-label="Analytics consent preferences">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[#18352B] sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl leading-6">
              <p>We use essential browser storage to operate this site. With your permission, Meta Pixel may measure page visits and selected enquiry-link clicks. See our <a className="font-semibold underline" href="/cookies">Cookie Policy</a>.</p>
              {consent !== 'unknown' && <p className="mt-1 text-xs" aria-live="polite">Analytics consent is currently {consent === 'granted' ? 'on' : 'off'}. You can change it here at any time.</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" className="rounded-lg border border-[#0B6B53]/30 px-3 py-2 font-semibold" onClick={() => setAnalyticsConsent('denied')}>Decline analytics</button>
              <button type="button" className="rounded-lg bg-[#0B6B53] px-3 py-2 font-semibold text-white" onClick={() => setAnalyticsConsent('granted')}>Accept analytics</button>
            </div>
          </div>
        </div>
      )}
      {!preferencesOpen && (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-[90] rounded-full border border-[#0B6B53]/30 bg-white px-4 py-2 text-xs font-bold text-[#0B6B53] shadow-lg hover:bg-[#F8FAF9] focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
          aria-label="Open privacy settings"
          onClick={() => setPreferencesOpen(true)}
        >
          Privacy settings
        </button>
      )}
    </>
  );
}
