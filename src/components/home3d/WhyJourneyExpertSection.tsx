import React from 'react';
import {
  Users,
  Bot,
  Globe2,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface WhyJourneyExpertSectionProps {
  onExplore: () => void;
}

export const WhyJourneyExpertSection: React.FC<WhyJourneyExpertSectionProps> = ({ onExplore }) => {
  const features = [
    {
      title: 'HUMAN EXPERTISE',
      tagline: 'Senior Aviation & Embassy Counselors',
      description:
        'Over a decade of institutional expertise navigating intricate bilateral aviation regulations, embassy documentation nuances, and university admissions.',
      icon: Users,
      badge: 'Certified Specialists',
      highlight: 'Dedicated one-on-one counselor assignment for every traveler and student.',
    },
    {
      title: 'AI INTELLIGENCE',
      tagline: 'Predictive Routing & Document Auditing',
      description:
        'Our custom AI engine continuously evaluates multi-GDS fare changes, visa policy updates, and university intake requirements in real time.',
      icon: Bot,
      badge: 'Neural Engine',
      highlight: 'Instant eligibility matching and AI-assisted SOP structuring.',
    },
    {
      title: 'GLOBAL ACCESS',
      tagline: 'Direct Airline & University Gateways',
      description:
        'Direct API connections to Sabre, Amadeus, Galileo, and over 500 accredited universities spanning North America, Europe, Australia, and Asia.',
      icon: Globe2,
      badge: 'Global Footprint',
      highlight: 'Wholesale B2B fare access passed directly to our private clients.',
    },
    {
      title: 'PERSONAL SERVICE',
      tagline: 'Tailored to Your Life Aspirations',
      description:
        'No cookie-cutter packages. Every flight, holiday, student file, and pilgrimage is crafted around your personal schedule, budget, and long-term goals.',
      icon: HeartHandshake,
      badge: 'Bespoke Care',
      highlight: '24/7 emergency transit and airport concierge support across timezones.',
    },
  ];

  return (
    <section className="relative py-24 bg-[#061711] text-white border-b border-[#0B5D3B]/40 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#0B5D3B]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-[#C8A14A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-[#10B981]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A14A]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              The Journey Expert Distinction
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            WHY JOURNEY EXPERT
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            We merge the warmth and diligence of senior human advisors with the analytical speed and reach of enterprise artificial intelligence.
          </p>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#081C15] border border-[#0B5D3B]/60 hover:border-[#C8A14A] rounded-3xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#0B5D3B]/20 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#051711] border border-[#0B5D3B]/70 group-hover:border-[#C8A14A] flex items-center justify-center text-[#C8A14A] shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#0B5D3B]/50 border border-emerald-500/30 text-emerald-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-serif text-white group-hover:text-[#C8A14A] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wider">
                    {feat.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0B5D3B]/40 flex items-center space-x-2 text-xs text-emerald-200/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A14A] shrink-0" />
                  <span>{feat.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
