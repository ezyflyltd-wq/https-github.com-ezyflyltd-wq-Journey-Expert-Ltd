import { useEffect, useState } from 'react';
import { normalizePath } from '../routing/routes';

export const ANGELA_AGENT_ID = 'agent_4301m0ypmnzzepdvcte0zqg7sfdh';
const WIDGET_SCRIPT_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

const PUBLIC_WIDGET_PATHS = new Set([
  '/',
  '/flights',
  '/hotels',
  '/packages',
  '/visa',
  '/study-abroad',
  '/hajj-umrah',
  '/healthcare-insurance',
  '/concierge',
  '/craft-bangla',
  '/corporate-travel',
  '/dmc-marketplace',
  '/b2b-marketplace',
  '/mobile-apps',
  '/seo-growth',
  '/customer-support',
  '/international-expansion',
  '/innovation-lab',
  '/business-units',
  '/developer',
  '/ai/travel-planner',
  '/ai-agent-ecosystem',
  '/enterprise/blueprint',
  '/enterprise/design-system',
  '/enterprise/cms-knowledge',
]);

export function isPublicAngelaRoute(pathname: string): boolean {
  return PUBLIC_WIDGET_PATHS.has(normalizePath(pathname));
}

export function ElevenLabsAngelaWidget() {
  const [hasAcceptedDisclosure, setHasAcceptedDisclosure] = useState(false);

  useEffect(() => {
    if (!hasAcceptedDisclosure) return;
    if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;

    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }, [hasAcceptedDisclosure]);

  if (!hasAcceptedDisclosure) {
    return (
      <aside
        className="mx-auto my-6 max-w-3xl border border-[#C7A44D]/50 bg-[#FFFDF6] px-5 py-5 text-left shadow-sm sm:px-7"
        aria-labelledby="angela-disclosure-title"
      >
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B53]">Journey Expert Ltd. AI support</p>
            <h2 id="angela-disclosure-title" className="mt-1 text-xl font-bold text-[#093F31]">
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
            <a
              className="font-semibold text-[#0B6B53] underline underline-offset-2"
              href="https://elevenlabs.io/docs/eleven-agents/legal/disclosure-requirement"
              target="_blank"
              rel="noreferrer"
            >
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
              onClick={() => setHasAcceptedDisclosure(true)}
            >
              Agree and continue / সম্মত হয়ে চালিয়ে যান
            </button>
            <p className="text-sm text-[#333333]">
              Need human support?{' '}
              <a className="font-bold text-[#0B6B53] underline underline-offset-2" href="tel:+8801926400400">
                Call +880 1926-400400
              </a>
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <section aria-label="Anjela AI assistant" className="mx-auto my-6 max-w-3xl">
      <p className="mb-2 text-xs leading-5 text-[#555555]">
        You are now interacting with Anjela, an AI assistant of Journey Expert Ltd. This conversation may be recorded and shared with ElevenLabs and third-party AI providers. For human support call{' '}
        <a className="font-semibold text-[#0B6B53] underline underline-offset-2" href="tel:+8801926400400">
          +880 1926-400400
        </a>
        .
      </p>
      <p className="sr-only" lang="bn">
        আপনি এখন Journey Expert Ltd.-এর AI সহকারী Anjela-র সঙ্গে কথা বলছেন। এই কথোপকথন রেকর্ড ও ElevenLabs এবং তৃতীয় পক্ষের AI সরবরাহকারীদের সঙ্গে শেয়ার করা হতে পারে। মানব সহায়তার জন্য +880 1926-400400 নম্বরে কল করুন।
      </p>
      <elevenlabs-convai
        agent-id={ANGELA_AGENT_ID}
        aria-label="Talk with Anjela, Journey Expert Ltd.'s AI assistant"
      />
    </section>
  );
}
