import React from 'react';
import { Globe2, Sparkles, Zap } from 'lucide-react';
import { GLOBAL_DESTINATIONS } from './globeData';

interface GlobePosterProps {
  onEnableInteractive?: () => void;
  className?: string;
}

const markerPositions: Record<string, { left: string; top: string }> = {
  dac: { left: '54%', top: '55%' },
  lhr: { left: '47%', top: '34%' },
  yyz: { left: '28%', top: '30%' },
  dxb: { left: '56%', top: '44%' },
  mel: { left: '78%', top: '72%' },
  syd: { left: '82%', top: '68%' },
  cul: { left: '67%', top: '54%' },
  sin: { left: '70%', top: '58%' },
  ist: { left: '52%', top: '37%' },
  jed: { left: '56%', top: '49%' },
  ruh: { left: '58%', top: '44%' },
  jfk: { left: '22%', top: '35%' },
};

export const GlobePoster: React.FC<GlobePosterProps> = ({ onEnableInteractive, className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-full h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[580px] flex items-center justify-center overflow-hidden rounded-[2rem] bg-[#061910] ${className}`}
      role="img"
      aria-label="Static global travel route visualization connecting Dhaka to international destinations"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(16,185,129,0.34),transparent_31%),radial-gradient(circle_at_70%_65%,rgba(200,161,74,0.18),transparent_24%),linear-gradient(145deg,#071b13,#04100b)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(16,185,129,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.25)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative aspect-square w-[72%] max-w-[430px] rounded-full border border-emerald-300/25 bg-[radial-gradient(circle_at_40%_34%,rgba(16,185,129,0.36),rgba(4,27,18,0.96)_62%)] shadow-[0_0_100px_rgba(16,185,129,0.25),inset_-28px_-24px_60px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-[7%] rounded-full border border-emerald-200/20 [transform:rotate(22deg)_scaleX(0.66)]" />
        <div className="absolute inset-[7%] rounded-full border border-emerald-200/15 [transform:rotate(-24deg)_scaleY(0.7)]" />
        <div className="absolute inset-[20%] rounded-full border border-amber-200/15" />

        {GLOBAL_DESTINATIONS.map((destination) => {
          const position = markerPositions[destination.id] ?? { left: '50%', top: '50%' };
          return (
            <span
              key={destination.id}
              className="absolute h-2.5 w-2.5 rounded-full border border-white/70 shadow-[0_0_14px_currentColor]"
              style={{ left: position.left, top: position.top, backgroundColor: destination.color, color: destination.color }}
              title={`${destination.name} (${destination.code})`}
            />
          );
        })}

        <div className="absolute left-[54%] top-[55%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#C8A14A] bg-emerald-400 shadow-[0_0_28px_#C8A14A]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe2 className="h-20 w-20 text-emerald-200/20 sm:h-28 sm:w-28" strokeWidth={0.7} aria-hidden="true" />
        </div>
      </div>

      <div className="absolute left-3 right-3 top-3 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
        <div className="rounded-full border border-emerald-400/30 bg-[#081C15]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
          Dhaka hub • global routes
        </div>
        <Sparkles className="h-4 w-4 text-[#C8A14A]" aria-hidden="true" />
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
        <p className="max-w-[15rem] text-[10px] leading-relaxed text-emerald-100/75 sm:text-xs">
          Explore routes from Bangladesh to study, travel, business, and pilgrimage destinations.
        </p>
        {onEnableInteractive ? (
          <button
            type="button"
            onClick={onEnableInteractive}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#C8A14A]/60 bg-[#081C15]/90 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#E6CA65] shadow-lg backdrop-blur transition-colors hover:bg-[#0B5D3B] focus:outline-none focus:ring-2 focus:ring-[#C8A14A]"
          >
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Interactive globe
          </button>
        ) : null}
      </div>
    </div>
  );
};
