import React, { useEffect, useState } from 'react';

type ConsentChoice = 'accepted' | 'declined' | null;
const STORAGE_KEY = 'jel_cookie_consent';

function readStoredChoice(): ConsentChoice {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(readStoredChoice);
  const [preferencesOpen, setPreferencesOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    const requested = new URLSearchParams(window.location.search).get('privacy-settings') === '1';
    return requested || readStoredChoice() === null;
  });
  const [storageUnavailable, setStorageUnavailable] = useState(false);

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener('jel:open-privacy-settings', openPreferences);
    return () => window.removeEventListener('jel:open-privacy-settings', openPreferences);
  }, []);

  const save = (value: Exclude<ConsentChoice, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
      if (value === 'accepted') {
        // Without a persisted choice, optional analytics stays off.
        setPreferencesOpen(true);
        return;
      }
    }

    setChoice(value);
    setPreferencesOpen(false);
    window.dispatchEvent(new CustomEvent('jel:cookie-consent', { detail: value }));
  };

  return (
    <>
      {preferencesOpen ? (
        <div role="dialog" aria-label="Analytics consent preferences" aria-modal="false" className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-700">
              <strong className="text-slate-950">Cookie preferences</strong>
              <p className="mt-1 leading-6">
                Essential browser storage supports site operation. With your permission, Meta Pixel may measure page visits and selected enquiry and social-link actions.
                {' '}<a className="font-semibold text-emerald-700 underline" href="/cookies/">Cookie Policy</a>
              </p>
              {choice && <p className="mt-1 text-xs" aria-live="polite">Analytics consent is currently {choice === 'accepted' ? 'on' : 'off'}. You can change it here at any time.</p>}
              {storageUnavailable && <p className="mt-1 text-xs text-amber-800" role="status">Your browser blocked preference storage. Optional analytics remains off unless your choice can be saved.</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => save('declined')} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">Decline analytics</button>
              <button type="button" onClick={() => save('accepted')} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Accept analytics</button>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setPreferencesOpen(true)} aria-label="Open privacy settings" className="fixed bottom-4 right-4 z-[90] rounded-full border border-emerald-800/30 bg-white px-4 py-2 text-xs font-bold text-emerald-800 shadow-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-700">
          Privacy settings
        </button>
      )}
    </>
  );
}
