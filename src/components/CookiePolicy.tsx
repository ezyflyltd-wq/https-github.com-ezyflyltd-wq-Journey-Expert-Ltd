import { useEffect } from 'react';

export function CookiePolicy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Cookie Policy | Journey Expert Ltd.';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const openPrivacySettings = () => window.dispatchEvent(new Event('jel:open-privacy-settings'));

  return (
    <main className="min-h-[70vh] bg-[#F8FAF9] px-4 py-12 text-[#18352B] sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0B6B53]">Journey Expert Ltd.</p>
        <h1 className="mt-3 font-serif text-3xl font-black text-[#093F31] sm:text-4xl">Cookie and Analytics Policy</h1>
        <p className="mt-3 text-sm text-[#666666]">Last updated: 8 October 2026</p>

        <div className="mt-8 space-y-7 leading-7">
          <section>
            <h2 className="text-xl font-bold text-[#093F31]">About this policy</h2>
            <p className="mt-2">This page explains the browser storage and optional analytics measurement currently used on journeyexpertltd.com. It supplements, rather than replaces, any broader privacy information that applies to your use of our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#093F31]">Essential browser storage</h2>
            <p className="mt-2">The site stores your analytics choice in browser local storage under <code className="rounded bg-[#F8FAF9] px-1.5 py-0.5 text-sm">jel_cookie_consent</code>, using the value “accepted” or “declined.” This preference is stored in your browser and is not itself a cookie. If storage is unavailable, optional analytics remains disabled.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#093F31]">Optional Meta Pixel analytics</h2>
            <p className="mt-2">When the Pixel is configured, it is loaded only after you choose “Accept analytics.” The current integration measures page views and selected outbound clicks to WhatsApp, Facebook, Instagram, YouTube, and LinkedIn. Its custom event details identify the event and channel, not the destination address or message text.</p>
            <p className="mt-2">Meta Pixel is provided by Meta Platforms, Inc. Loading it can transmit information such as your browser, device, page URL, and network information to Meta. Meta may use cookies or similar technologies under its own policies. See <a className="font-semibold text-[#0B6B53] underline" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta’s Privacy Policy</a> for information about Meta’s processing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#093F31]">Change or withdraw your choice</h2>
            <p className="mt-2">You can change your choice at any time using the “Privacy settings” control shown on the site. If you withdraw consent, the site records the choice and tells Meta Pixel to revoke consent; our site stops sending further analytics events. Clearing browser storage removes the saved preference, after which the site will ask again before optional analytics is enabled.</p>
            <button type="button" onClick={openPrivacySettings} className="mt-4 rounded-lg bg-[#0B6B53] px-4 py-2 font-semibold text-white hover:bg-[#095842] focus:outline-none focus:ring-2 focus:ring-[#0B6B53]">Open privacy settings</button>
          </section>

          <p className="border-t border-[#ECECEC] pt-5 text-sm text-[#666666]">This page describes the analytics integration currently represented in the website code. Other service providers may use essential storage when you use their features.</p>
        </div>

        <p className="mt-8"><a href="/" className="font-semibold text-[#0B6B53] underline">Return to Journey Expert</a></p>
      </article>
    </main>
  );
}
