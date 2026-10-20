import React from 'react';
import { Info } from 'lucide-react';

interface DemoNoticeProps {
  /** What on this page is illustrative, e.g. "fares" or "hotels and prices". */
  subject: string;
  className?: string;
}

export const JEL_WHATSAPP_NUMBER = '8801926400400';
export const JEL_WHATSAPP_DISPLAY = '+880 1926 400400';

/**
 * Honest label for pages that still render sample data.
 * Remove it from a page once that page is connected to a live supplier feed.
 */
export const DemoNotice: React.FC<DemoNoticeProps> = ({ subject, className = '' }) => (
  <div
    role="note"
    className={`flex items-start gap-3 rounded-2xl border border-[#C7A44D]/50 bg-[#FFFBEA] p-4 text-xs text-[#5A4A12] ${className}`}
  >
    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#C7A44D]" aria-hidden="true" />
    <p className="leading-relaxed">
      <strong className="font-extrabold">Sample {subject} for illustration.</strong>{' '}
      Live availability, prices and rules are confirmed by a Journey Expert consultant before anything is booked. No payment
      is taken on this page. Contact us on WhatsApp{' '}
      <a
        className="font-bold underline"
        href={`https://wa.me/${JEL_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {JEL_WHATSAPP_DISPLAY}
      </a>
      .
      <span lang="bn" className="mt-1 block">
        এখানে দেখানো {subject === 'fares' ? 'ভাড়া' : 'তথ্য'} শুধু উদাহরণ। বুকিংয়ের আগে আমাদের কনসালট্যান্ট সঠিক তথ্য ও দাম নিশ্চিত করবেন। এই পেজে কোনো পেমেন্ট নেওয়া হয় না।
      </span>
    </p>
  </div>
);
