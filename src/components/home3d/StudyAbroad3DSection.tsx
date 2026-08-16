import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award,
  BookOpen,
  CheckCircle2,
  Globe2,
  Users,
  Compass,
  FileCheck2,
} from 'lucide-react';

interface StudyAbroad3DSectionProps {
  onExploreStudyAbroad: () => void;
  onTalkToCounselor: () => void;
}

interface CountryStudyProfile {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  universitiesCount: string;
  scholarshipRange: string;
  popularCourses: string[];
  intakes: string;
  postStudyWork: string;
}

export const STUDY_COUNTRIES: CountryStudyProfile[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tagline: '1-Year Masters & Russell Group Excellence',
    universitiesCount: '140+ Partner Universities',
    scholarshipRange: '£2,000 to £10,000 merit grants',
    popularCourses: ['Data Science & AI', 'Business & MBA', 'LLM Law', 'Public Health'],
    intakes: 'September & January/May',
    postStudyWork: '2-Year Graduate Immigration Route (PSW)',
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    tagline: 'World-Class Degrees & High Permanent Residency Potential',
    universitiesCount: '90+ DLI Universities & Colleges',
    scholarshipRange: 'CAD $3,000 to $15,000 entrance awards',
    popularCourses: ['Software Engineering', 'Supply Chain', 'Project Management', 'Biotechnology'],
    intakes: 'Fall (Sept), Winter (Jan), Summer (May)',
    postStudyWork: 'Up to 3-Year Post-Graduation Work Permit (PGWP)',
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'Group of Eight Research & High Quality of Life',
    universitiesCount: '45+ Public & Go8 Universities',
    scholarshipRange: '20% to 50% Tuition Fee Reductions',
    popularCourses: ['Cybersecurity', 'Civil Engineering', 'Accounting', 'Nursing'],
    intakes: 'Semester 1 (Feb) & Semester 2 (July)',
    postStudyWork: '2 to 4-Year Temporary Graduate Visa (485)',
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    tagline: 'Global Innovation Hub & STEM OPT Extensions',
    universitiesCount: '200+ Accredited Universities',
    scholarshipRange: '$5,000 to Full-Ride Graduate Assistantships',
    popularCourses: ['Computer Science', 'Data Analytics', 'Finance', 'Biomedical Sciences'],
    intakes: 'Fall (Aug/Sept) & Spring (Jan)',
    postStudyWork: '3-Year STEM OPT Extension for tech majors',
  },
  {
    id: 'ireland',
    name: 'Ireland',
    flag: '🇮🇪',
    tagline: 'European Tech & Pharma Silicon Valley',
    universitiesCount: '25+ Public Universities & Institutes',
    scholarshipRange: '€2,000 to €8,000 Global Excellence',
    popularCourses: ['Cloud Computing', 'Fintech', 'Pharmaceutical Chemistry', 'Digital Marketing'],
    intakes: 'September & January',
    postStudyWork: '2-Year Third Level Graduate Scheme (Stamp 1G)',
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    tagline: 'Safe, Progressive & Top 3% Global Universities',
    universitiesCount: '8 World-Class Universities',
    scholarshipRange: 'NZ$ 5,000 to NZ$ 15,000 Dean Awards',
    popularCourses: ['Environmental Science', 'Agribusiness', 'Information Tech', 'Tourism'],
    intakes: 'February & July',
    postStudyWork: 'Up to 3-Year Post-Study Work Visa',
  },
  {
    id: 'europe',
    name: 'Europe & Schengen',
    flag: '🇪🇺',
    tagline: 'Low/No Tuition & Schengen Borderless Travel',
    universitiesCount: 'Germany, Sweden, Finland, Poland',
    scholarshipRange: 'Full DAAD, Erasmus+ & Regional fee waivers',
    popularCourses: ['Automotive Engineering', 'Renewable Energy', 'International Business'],
    intakes: 'Winter (Oct) & Summer (April)',
    postStudyWork: '18-Month Jobseeker Visa upon graduation',
  },
];

export const StudyAbroad3DSection: React.FC<StudyAbroad3DSectionProps> = ({
  onExploreStudyAbroad,
  onTalkToCounselor,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryStudyProfile>(STUDY_COUNTRIES[0]);

  return (
    <section className="relative py-24 bg-[#081C15] text-white border-b border-[#0B5D3B]/40 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#0B5D3B]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C8A14A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-emerald-500/30">
            <GraduationCap className="w-4 h-4 text-[#C8A14A]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              JEL International Education Division
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            YOUR FUTURE <br />
            <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
              HAS NO BORDER.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            Discover global education opportunities with expert guidance from application to arrival.
          </p>
        </div>

        {/* Interactive Country Grid Pills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-10">
          {STUDY_COUNTRIES.map((country) => {
            const isSelected = selectedCountry.id === country.id;
            return (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#C8A14A] text-[#081C15] shadow-lg shadow-amber-500/20 font-black scale-105'
                    : 'bg-[#051711] text-slate-300 hover:text-white hover:bg-[#0B5D3B]/50 border border-[#0B5D3B]/50'
                }`}
              >
                <span className="text-base">{country.flag}</span>
                <span>{country.name}</span>
              </button>
            );
          })}
        </div>

        {/* Country Detailed Interactive Showcase Card */}
        <div className="bg-gradient-to-br from-[#051711] via-[#081C15] to-[#040E0A] border-2 border-[#0B5D3B]/60 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Detail Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-2xl sm:text-4xl font-black font-serif text-white">
                    Study in {selectedCountry.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-0.5">
                    {selectedCountry.tagline}
                  </p>
                </div>
              </div>

              {/* Key Features Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#081C15] border border-[#0B5D3B]/50 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                    <Building2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Institution Network</span>
                  </div>
                  <p className="text-sm font-extrabold text-white">{selectedCountry.universitiesCount}</p>
                </div>

                <div className="bg-[#081C15] border border-[#0B5D3B]/50 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Scholarship Range</span>
                  </div>
                  <p className="text-sm font-extrabold text-[#C8A14A]">{selectedCountry.scholarshipRange}</p>
                </div>

                <div className="bg-[#081C15] border border-[#0B5D3B]/50 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upcoming Intakes</span>
                  </div>
                  <p className="text-xs font-bold text-white">{selectedCountry.intakes}</p>
                </div>

                <div className="bg-[#081C15] border border-[#0B5D3B]/50 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                    <FileCheck2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Post-Study Work</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-300">{selectedCountry.postStudyWork}</p>
                </div>
              </div>

              {/* Popular Majors */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Top Enrolled Subject Areas:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCountry.popularCourses.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#0B5D3B]/40 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={onExploreStudyAbroad}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 cursor-pointer group"
                >
                  <span>Explore Study Abroad</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onTalkToCounselor}
                  className="px-6 py-3.5 rounded-2xl bg-[#0B5D3B] hover:bg-[#0E7A4E] text-white font-bold text-xs uppercase tracking-wider border border-emerald-400/40 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#C8A14A]" />
                  <span>Talk to a Counselor</span>
                </button>
              </div>
            </div>

            {/* Right Academic Process Diagram */}
            <div className="lg:col-span-5 bg-[#081C15] border border-[#0B5D3B]/60 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#0B5D3B]/40 pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A14A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  JEL 6-Stage Student Roadmap
                </h4>
                <span className="text-[10px] font-mono text-emerald-400">100% Transparency</span>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { step: '01', title: 'Profile Evaluation & Course Shortlisting', desc: 'GPA, IELTS/PTE & career aspirations analysis' },
                  { step: '02', title: 'University Application & SOP Drafting', desc: 'Direct electronic submission to partner portals' },
                  { step: '03', title: 'Offer Letter & Scholarship Review', desc: 'Conditional / Unconditional offer issuance' },
                  { step: '04', title: 'Tuition Deposit & CAS / I-20 Issuance', desc: 'Secure bank telegraphic transfer verification' },
                  { step: '05', title: 'Student Visa File & Financial Audit', desc: 'Embassy documentation, mock interview prep' },
                  { step: '06', title: 'Pre-Departure Briefing & Air Ticket', desc: 'Airport transit assistance & student accommodation' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-xl bg-[#051711] border border-[#0B5D3B]/40">
                    <span className="text-xs font-black font-mono text-[#C8A14A] mt-0.5">{item.step}</span>
                    <div>
                      <strong className="text-white block font-medium">{item.title}</strong>
                      <span className="text-[10px] text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
