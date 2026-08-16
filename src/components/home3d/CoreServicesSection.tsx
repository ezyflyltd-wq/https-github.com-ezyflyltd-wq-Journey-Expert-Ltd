import React from 'react';
import {
  Plane,
  FileCheck2,
  GraduationCap,
  Compass,
  Moon,
  Globe2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';

interface CoreServicesSectionProps {
  onSelectService: (module: string) => void;
}

interface ServiceCardData {
  id: string;
  module: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  highlights: string[];
  gradient: string;
  accentColor: string;
}

export const CORE_SERVICES: ServiceCardData[] = [
  {
    id: 'flights',
    module: 'flights',
    title: 'FLIGHTS',
    tagline: 'International & Domestic Air Ticketing',
    description:
      'Direct Sabre, Amadeus & Galileo GDS connections. Search, compare, and instantly issue e-tickets across 900+ global airlines with seat selection and baggage clarity.',
    icon: Plane,
    badge: 'Multi-GDS Engine',
    highlights: ['Lowest Fare Guarantee', 'Instant E-Ticket Issuance', 'Baggage & Meal Customization'],
    gradient: 'from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A]',
    accentColor: '#10B981',
  },
  {
    id: 'visa',
    module: 'visa',
    title: 'VISA',
    tagline: 'Visa Consultancy & Application Support',
    description:
      'Comprehensive embassy file preparation, document audits, financial proof structuring, and biometric appointment booking for UK, USA, Canada, Schengen & Asia.',
    icon: FileCheck2,
    badge: '99.2% File Quality',
    highlights: ['Embassy Checklist Audit', 'SOP & Cover Letter Drafting', 'Appointment Tracking'],
    gradient: 'from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A]',
    accentColor: '#C8A14A',
  },
  {
    id: 'study-abroad',
    module: 'study-abroad',
    title: 'STUDY ABROAD',
    tagline: 'University Admission & International Education',
    description:
      'Official representative for 500+ universities across the UK, Canada, Australia, USA, Ireland & Europe. Complete scholarship matching, CAS offers & Student Visa guidance.',
    icon: GraduationCap,
    badge: '500+ Global Partners',
    highlights: ['Direct University Admissions', 'Up to 50% Scholarship Review', 'Pre-departure & Housing'],
    gradient: 'from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A]',
    accentColor: '#38BDF8',
  },
  {
    id: 'holidays',
    module: 'packages',
    title: 'HOLIDAYS',
    tagline: 'Curated Tours & Customized Travel Experiences',
    description:
      'Handcrafted bespoke itineraries, family packages, luxury cruises, honeymoon specials, and adventure tours across Europe, Middle East, Southeast Asia & the Americas.',
    icon: Compass,
    badge: 'Bespoke Itineraries',
    highlights: ['Verified 4-Star & 5-Star Stays', 'Certified Local English Guides', 'Airport Transfers Included'],
    gradient: 'from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A]',
    accentColor: '#EC4899',
  },
  {
    id: 'hajj-umrah',
    module: 'hajj-umrah',
    title: 'HAJJ & UMRAH',
    tagline: 'Faith-Centered Pilgrimage Travel Solutions',
    description:
      'Authorized Nusuk platform partner. Executive VIP 5-star packages directly facing the Holy Haram in Makkah (Clock Tower) & Madinah with dedicated Islamic scholar guides.',
    icon: Moon,
    badge: 'Executive 5-Star VIP',
    highlights: ['Clock Tower Haram Views', 'Private GMC Luxury Transfers', 'Historical Ziyarat Tours'],
    gradient: 'from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A]',
    accentColor: '#C8A14A',
  },
  {
    id: 'global-mobility',
    module: 'corporate',
    title: 'GLOBAL MOBILITY',
    tagline: 'Travel, Education & Relocation Support',
    description:
      'End-to-end corporate travel management, multinational employee relocation, international medical tourism facilitator, and VIP airport meet & assist concierges.',
    icon: Globe2,
    badge: 'Enterprise Ecosystem',
    highlights: ['Corporate Travel Desk', 'Medical Tourism Pathways', 'Tejgaon & Airport Concierge'],
    gradient: 'from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A]',
    accentColor: '#F59E0B',
  },
];

export const CoreServicesSection: React.FC<CoreServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section className="relative py-24 bg-[#081C15] text-white border-b border-[#0B5D3B]/40 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0B5D3B]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-[#10B981]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A14A]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              Complete Global Portfolio
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight">
            ONE PLATFORM. <br />
            <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
              EVERY JOURNEY.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            Whether booking an international flight, preparing complex embassy visa files, securing top university admissions, or performing Umrah — Journey Expert delivers excellence at every step.
          </p>
        </div>

        {/* 6 High-End Interactive 3D Depth Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.module)}
                className="group relative bg-[#051711] border border-[#0B5D3B]/50 hover:border-[#C8A14A]/70 rounded-3xl p-7 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#0B5D3B]/30 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-md"
              >
                {/* Glow Aura on Hover */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#0B5D3B]/20 group-hover:bg-[#C8A14A]/20 rounded-full blur-3xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#081C15] border border-[#0B5D3B]/60 group-hover:border-[#C8A14A] flex items-center justify-center text-[#C8A14A] shadow-md group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#C8A14A]" />
                    </div>

                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#0B5D3B]/50 border border-emerald-500/30 text-emerald-300">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-white group-hover:text-[#C8A14A] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wider">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-5 space-y-2 border-t border-[#0B5D3B]/40 pt-4">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[11px] text-emerald-200/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A14A]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Strip */}
                <div className="mt-6 pt-4 border-t border-[#0B5D3B]/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C8A14A] group-hover:text-white transition-colors">
                    Explore Service
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#0B5D3B]/50 group-hover:bg-[#C8A14A] group-hover:text-[#081C15] text-[#C8A14A] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
