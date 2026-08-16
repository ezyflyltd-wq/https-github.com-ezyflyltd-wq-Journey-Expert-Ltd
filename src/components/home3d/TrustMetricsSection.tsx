import React from 'react';
import {
  ShieldCheck,
  Award,
  Globe2,
  Bot,
  Plane,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const TrustMetricsSection: React.FC = () => {
  const metrics = [
    {
      value: '10+',
      label: 'Travel Services',
      sublabel: 'Aviation, Visa, Study Abroad & Hajj/Umrah',
      icon: Plane,
    },
    {
      value: 'Global',
      label: 'Destination Network',
      sublabel: 'Direct Sabre & Amadeus GDS Hubs',
      icon: Globe2,
    },
    {
      value: 'AI-Powered',
      label: 'Travel Experience',
      sublabel: 'Neural Flight & Visa Route Optimizer',
      icon: Bot,
    },
    {
      value: '24/7',
      label: 'Digital Assistance',
      sublabel: 'Tejgaon HQ & Multilingual AI Support Desk',
      icon: Clock,
    },
  ];

  const trustBadges = [
    'Direct Multi-GDS Sabre & Amadeus API Gateway',
    '500+ Official University Representative Network',
    'Nusuk Authorized Umrah & Hajj Service Partner',
    'PCI-DSS Compliant Secure Payment Processing',
    'Ministry & Government Registered Travel Corporation',
  ];

  return (
    <section className="relative py-20 bg-[#081C15] text-white border-b border-[#0B5D3B]/40 overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0B5D3B]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-[#10B981]/30">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              Enterprise Trust & Integrity
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            BUILT ON EXPERTISE. <br />
            <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
              POWERED BY TECHNOLOGY.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            Bridging institutional travel acumen with cutting-edge artificial intelligence to empower travelers across Bangladesh and the global diaspora.
          </p>
        </div>

        {/* 4 Animated Counter Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-[#051711] border border-[#0B5D3B]/60 rounded-3xl p-6 sm:p-8 text-center space-y-3 transition-all duration-300 hover:border-[#C8A14A]/70 hover:-translate-y-1 shadow-xl hover:shadow-[#0B5D3B]/20 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#081C15] border border-[#0B5D3B]/70 mx-auto flex items-center justify-center text-[#C8A14A] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-3xl sm:text-4xl font-black font-serif text-white group-hover:text-[#C8A14A] transition-colors">
                  {m.value}
                </div>

                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  {m.label}
                </h4>

                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  {m.sublabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-12 pt-8 border-t border-[#0B5D3B]/40 flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center space-x-2 bg-[#051711] px-4 py-2 rounded-full border border-[#0B5D3B]/50">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
