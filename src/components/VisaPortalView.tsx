import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { VisaCountry } from '../types';
import { MOCK_VISA_COUNTRIES } from '../data/mockData';

const RELATED_LINKS = [
  { href: '/', label: 'Journey Expert Ltd. home' },
  { href: '/flights', label: 'flight planning after visa approval' },
  { href: '/study-abroad', label: 'student visa and admissions support' },
  { href: '/ai/travel-planner', label: 'AI-assisted travel planning' },
] as const;

export const VisaPortalView: React.FC = () => {
  const countries = MOCK_VISA_COUNTRIES;
  const [activeTab, setActiveTab] = useState<'requirements' | 'process' | 'status'>('requirements');
  const [selectedCountryId, setSelectedCountryId] = useState(countries[0]?.id ?? '');

  const selectedCountry = useMemo<VisaCountry | undefined>(
    () => countries.find((country) => country.id === selectedCountryId) ?? countries[0],
    [countries, selectedCountryId],
  );

  if (!selectedCountry) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <section className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <FileCheck2 className="w-4 h-4 text-[#C7A44D]" />
            <span>Journey Expert Ltd. visa support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            Visa Information and Application Support for Bangladesh Travellers
          </h2>
          <p className="text-sm text-[#666666] mt-2 max-w-3xl leading-6">
            Organise destination research, document preparation, checklist review, and human-assisted application support. Requirements vary by destination, nationality, travel purpose, and current policy.
          </p>
        </div>

        <div className="flex items-start space-x-2 bg-[#F8FAF9] px-4 py-3 rounded-2xl border border-[#ECECEC] text-xs text-[#093F31] font-bold max-w-xs">
          <ShieldCheck className="w-5 h-5 text-[#0B6B53] shrink-0" />
          <span>No approval, admission, entry, or outcome is guaranteed. The relevant authority decides each application.</span>
        </div>
      </section>

      <nav aria-label="Visa information sections" className="flex flex-wrap items-center gap-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold">
        <button
          type="button"
          aria-pressed={activeTab === 'requirements'}
          onClick={() => setActiveTab('requirements')}
          className={`px-5 py-3 rounded-2xl flex items-center space-x-2 ${activeTab === 'requirements' ? 'bg-[#0B6B53] text-white shadow-md' : 'bg-white border border-[#ECECEC] text-[#666666]'}`}
        >
          <Search className="w-4 h-4 text-[#C7A44D]" />
          <span>Destination requirements</span>
        </button>
        <button
          type="button"
          aria-pressed={activeTab === 'process'}
          onClick={() => setActiveTab('process')}
          className={`px-5 py-3 rounded-2xl flex items-center space-x-2 ${activeTab === 'process' ? 'bg-[#0B6B53] text-white shadow-md' : 'bg-white border border-[#ECECEC] text-[#666666]'}`}
        >
          <FileText className="w-4 h-4 text-[#C7A44D]" />
          <span>Preparation process</span>
        </button>
        <button
          type="button"
          aria-pressed={activeTab === 'status'}
          onClick={() => setActiveTab('status')}
          className={`px-5 py-3 rounded-2xl flex items-center space-x-2 ${activeTab === 'status' ? 'bg-[#0B6B53] text-white shadow-md' : 'bg-white border border-[#ECECEC] text-[#666666]'}`}
        >
          <Clock3 className="w-4 h-4 text-[#C7A44D]" />
          <span>Official status and support</span>
        </button>
      </nav>

      {activeTab === 'requirements' && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#093F31]">Choose a destination starting point</h3>
            <p className="text-xs leading-5 text-[#666666]">
              These are planning categories only. Always confirm the current route with the official source before preparing documents or paying a fee.
            </p>
            <div className="space-y-2">
              {countries.map((country) => (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => setSelectedCountryId(country.id)}
                  aria-pressed={selectedCountry.id === country.id}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between ${selectedCountry.id === country.id ? 'bg-[#F8FAF9] border-[#0B6B53] shadow-md text-[#093F31]' : 'bg-white border-[#ECECEC] text-[#111111]'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#093F31]">{country.country}</h4>
                      <p className="text-[11px] text-[#666666]">{country.visaType} route information</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#0B6B53]" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <article className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-[#ECECEC] pb-5">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl" aria-hidden="true">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="text-xl font-black text-[#093F31] font-serif">{selectedCountry.country} {selectedCountry.visaType} route</h3>
                      <p className="text-xs text-[#666666] mt-1">Official-source starting point for current requirements</p>
                    </div>
                  </div>
                </div>
                <a
                  href={selectedCountry.officialSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0B6B53] underline decoration-[#C7A44D]/60 underline-offset-4"
                >
                  Check official requirements
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-[#093F31] flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#0B6B53]" />
                  <span>Preparation checklist — verify against the official route</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedCountry.requirements.map((requirement) => (
                    <div key={requirement} className="bg-[#F8FAF9] p-3.5 rounded-xl border border-[#ECECEC] flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                      <span className="text-[#111111] font-medium">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#093F31] text-white rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-[#C7A44D]">What Journey Expert can help coordinate</h4>
                <p className="text-xs leading-5 text-emerald-50">
                  We can help organise questions, explain the public information on this page, prepare a route-specific checklist for human review, and coordinate an approved next step. We do not access private applicant records or make decisions for an embassy, consulate, immigration authority, or university.
                </p>
              </div>
            </article>
          </div>
        </section>
      )}

      {activeTab === 'process' && (
        <section className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-[#093F31] font-serif">From enquiry to official submission</h3>
            <p className="text-sm text-[#666666] mt-2 max-w-3xl leading-6">
              Use this sequence as a planning guide. The official authority’s current instructions always take precedence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['1', 'Initial enquiry', 'Share destination, purpose, and broad timing without posting identity or financial document numbers in public chat.'],
              ['2', 'Route confirmation', 'Check the official authority or diplomatic mission for the correct visa route, jurisdiction, and current requirements.'],
              ['3', 'Document organisation', 'Prepare the requested documents and identify missing or unclear items for human review.'],
              ['4', 'Official submission and follow-up', 'Submit through the official or authorised channel and use its status process. Journey Expert cannot promise a decision or claim access to private case records.'],
            ].map(([number, title, description]) => (
              <div key={number} className="border border-[#ECECEC] rounded-2xl p-5 bg-[#F8FAF9]">
                <span className="text-xs font-black text-[#C7A44D]">STEP {number}</span>
                <h4 className="text-sm font-extrabold text-[#093F31] mt-1">{title}</h4>
                <p className="text-xs leading-5 text-[#666666] mt-2">{description}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#ECECEC] pt-5">
            <h4 className="text-sm font-extrabold text-[#093F31]">Fees and processing times</h4>
            <p className="text-xs leading-5 text-[#666666] mt-2">
              Government fees, service-centre charges, appointment availability, and processing times can change. Check the official source before paying or making non-refundable arrangements. Any separate Journey Expert service fee should be dated and confirmed by a human representative.
            </p>
          </div>
        </section>
      )}

      {activeTab === 'status' && (
        <section className="bg-[#093F31] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#C7A44D] shrink-0" />
            <div>
              <h3 className="text-xl font-black font-serif">Use the official status channel</h3>
              <p className="text-sm leading-6 text-emerald-50 mt-2">
                This public page does not connect to embassy, immigration, or customer records. Use the official status channel for the destination or contact Journey Expert through an approved human-assisted route.
              </p>
            </div>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5 text-xs leading-5 text-emerald-50">
            Do not send passport copies, passport numbers, bank statements, or other sensitive identity and financial records through the public AI widget. Ask a representative for the approved secure channel and share only what the selected route requires.
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold">
            <a href="mailto:journeyexpertltd@gmail.com" className="underline decoration-[#C7A44D]/60 underline-offset-4">journeyexpertltd@gmail.com</a>
            <a href="tel:+8801926400400" className="underline decoration-[#C7A44D]/60 underline-offset-4">+880 1926-400400</a>
          </div>
        </section>
      )}

      <section className="border-t border-[#ECECEC] pt-6">
        <h3 className="text-sm font-extrabold text-[#093F31]">Continue your journey</h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs font-semibold text-[#0B6B53]">
          {RELATED_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="underline decoration-[#C7A44D]/60 underline-offset-4">
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
