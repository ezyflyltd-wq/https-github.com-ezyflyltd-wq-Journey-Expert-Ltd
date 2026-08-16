import React from 'react';
import {
  ArrowRight,
  Bot,
  Sparkles,
  ShieldCheck,
  Plane,
  FileCheck2,
  GraduationCap,
  Globe2,
} from 'lucide-react';

interface CinematicCTASectionProps {
  onStartJourney: () => void;
  onTalkToAI: () => void;
}

export const CinematicCTASection: React.FC<CinematicCTASectionProps> = ({
  onStartJourney,
  onTalkToAI,
}) => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#081C15] via-[#051711] to-[#040E0A] text-white overflow-hidden">
      {/* Background Aurora Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0B5D3B]/25 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#C8A14A]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Top Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B5D3B]/50 border border-[#10B981]/40 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
            Journey Expert Limited • Global Aviation & Mobility
          </span>
        </div>

        {/* Cinematic Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[1.05]">
          YOUR NEXT JOURNEY <br />
          <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
            STARTS HERE.
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
          Travel smarter. Explore further. Move globally.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-2xl shadow-amber-500/25 cursor-pointer group"
          >
            <span>START YOUR JOURNEY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onTalkToAI}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B5D3B] hover:bg-[#0E7A4E] text-white font-bold text-sm uppercase tracking-wider border border-emerald-400/40 transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shadow-xl shadow-emerald-950/50"
          >
            <Bot className="w-4 h-4 text-[#C8A14A]" />
            <span>TALK TO JEL AI</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-emerald-900/50 flex items-center justify-center space-x-6 text-xs text-emerald-300/80 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            Direct Sabre & Amadeus GDS
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-[#C8A14A]" />
            500+ Universities
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            24/7 AI Assistance
          </span>
        </div>
      </div>
    </section>
  );
};
