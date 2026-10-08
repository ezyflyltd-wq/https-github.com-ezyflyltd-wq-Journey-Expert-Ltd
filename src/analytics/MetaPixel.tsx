import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_ID = '973366755816560';
const CONSENT_KEY = 'jel_analytics_consent';
const SCRIPT_ID = 'jel-meta-pixel-script';

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

function hasAnalyticsConsent() {
  return typeof window !== 'undefined' && window.localStorage.getItem(CONSENT_KEY) === 'granted';
}

function grantAnalyticsConsent() {
  window.localStorage.setItem(CONSENT_KEY, 'granted');
  window.dispatchEvent(new CustomEvent('jel:analytics-consent', { detail: 'granted' }));
}

function denyAnalyticsConsent() {
  window.localStorage.setItem(CONSENT_KEY, 'denied');
  window.dispatchEvent(new CustomEvent('jel:analytics-consent', { detail: 'denied' }));
}

function loadPixel() {
  if (typeof window === 'undefined' || document.getElementById(SCRIPT_ID)) return;

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
  fbq('init', PIXEL_ID);
}

function track(...args: unknown[]) {
  if (hasAnalyticsConsent()) window.fbq?.(...args);
}

function trackContact(target: HTMLAnchorElement) {
  const href = target.href.toLowerCase();
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('wa.me/') || href.includes('whatsapp.com/')) {
    track('track', 'Contact', { content_name: 'website_contact_link', content_category: href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : 'whatsapp' });
  }
}

export function MetaPixel() {
  const location = useLocation();
  const [consent, setConsent] = useState<'unknown' | 'granted' | 'denied'>(() => {
    if (typeof window === 'undefined') return 'unknown';
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unknown';
  });
  const initialized = useRef(false);

  useEffect(() => {
    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<'granted' | 'denied'>).detail;
      setConsent(value);
      if (value === 'granted') loadPixel();
    };
    window.addEventListener('jel:analytics-consent', onConsent);
    return () => window.removeEventListener('jel:analytics-consent', onConsent);
  }, []);

  useEffect(() => {
    if (consent !== 'granted') return;
    loadPixel();
    const timer = window.setTimeout(() => {
      track('track', 'PageView');
      initialized.current = true;
    }, 0);
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

  if (consent !== 'unknown') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-[#0B6B53]/20 bg-white/95 p-4 shadow-2xl backdrop-blur" role="dialog" aria-label="Analytics consent">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[#18352B] sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl leading-6">
          We use essential browser storage to operate this site. With your permission, Meta Pixel may measure page visits and selected enquiry actions. See our <a className="font-semibold underline" href="/cookies">Cookie Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="rounded-lg border border-[#0B6B53]/30 px-3 py-2 font-semibold" onClick={denyAnalyticsConsent}>Decline analytics</button>
          <button type="button" className="rounded-lg bg-[#0B6B53] px-3 py-2 font-semibold text-white" onClick={grantAnalyticsConsent}>Accept analytics</button>
        </div>
      </div>
    </div>
  );
}

export function trackLead() {
  track('track', 'Lead', { content_name: 'website_enquiry' });
}
