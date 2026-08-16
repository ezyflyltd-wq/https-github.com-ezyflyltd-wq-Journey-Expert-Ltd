import React from 'react';
import {
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  MapPin,
  FolderLock,
  Send,
  Award,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface VisaJourneySectionProps {
  onCheckVisaOptions: () => void;
}

export const VisaJourneySection: React.FC<VisaJourneySectionProps> = ({ onCheckVisaOptions }) => {
  const steps = [
    {
      id: 1,
      name: 'Profile',
      title: 'Profile Assessment',
      icon: UserCheck,
      description: 'Travel history review, financial background mapping, and applicant eligibility scoring.',
      tag: 'Step 01',
    },
    {
      id: 2,
      name: 'Destination',
      title: 'Destination Matching',
      icon: MapPin,
      description: 'Selecting optimal visa category (Tourist, Student, Business, E-Visa, Transit).',
      tag: 'Step 02',
    },
    {
      id: 3,
      name: 'Documents',
      title: 'Documents Audit',
      icon: FolderLock,
      description: 'Bank statements verification, tax certificates, employer NOC, and cover letter drafting.',
      tag: 'Step 03',
    },
    {
      id: 4,
      name: 'Application',
      title: 'Embassy Submission',
      icon: Send,
      description: 'VFS/TLS biometric appointment booking, online portal filing, and barcode generation.',
      tag: 'Step 04',
    },
    {
      id: 5,
      name: 'Decision',
      title: 'Decision & Departure',
      icon: Award,
      description: 'Passport collection notification, visa sticker verification, and flight booking sync.',
      tag: 'Step 05',
    },
  ];

  return (
    <section className="relative py-24 bg-[#051711] text-white border-b border-[#0B5D3B]/40 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[500px] bg-[#0B5D3B]/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-emerald-500/30">
            <FileCheck2 className="w-4 h-4 text-[#C8A14A]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              Transparent Embassy Processing
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            VISAS WITHOUT <br />
            <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
              THE CONFUSION.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            A structured, 5-step transparent workflow eliminating documentation errors, embassy rejections, and bureaucratic delays.
          </p>
        </div>

        {/* 5-Step Visual Pipeline Cards with Connecting Path */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div
                key={step.id}
                className="relative bg-[#081C15] border border-[#0B5D3B]/60 hover:border-[#C8A14A] rounded-3xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#0B5D3B]/30 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#C8A14A] bg-[#051711] px-2.5 py-1 rounded-lg border border-[#0B5D3B]/50">
                      {step.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#0B5D3B]/50 group-hover:bg-[#C8A14A] group-hover:text-[#081C15] text-[#C8A14A] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-black font-serif text-white group-hover:text-[#C8A14A] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#0B5D3B]/40 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                  <span>{step.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Statutory Disclaimer Banner */}
        <div className="mt-12 bg-[#040E0A] border-2 border-emerald-900/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start space-x-4 max-w-3xl">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-[#C8A14A] shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#C8A14A]">
                Official Legal Disclaimer
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Visa decisions are made by the relevant government authorities. JEL provides consultancy and application support and does not guarantee visa approval.
              </p>
            </div>
          </div>

          <button
            onClick={onCheckVisaOptions}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] font-black text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0 cursor-pointer shadow-xl shadow-amber-500/20"
          >
            <span>Check Visa Options</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
