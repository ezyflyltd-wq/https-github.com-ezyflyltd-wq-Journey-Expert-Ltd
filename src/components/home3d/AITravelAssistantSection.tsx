import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Plane,
  FileCheck2,
  GraduationCap,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Globe2,
} from 'lucide-react';

interface AITravelAssistantSectionProps {
  onOpenFullAIModal: () => void;
  onNavigateToModule: (module: string) => void;
}

interface AIResponseCard {
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  suggestedAction: {
    label: string;
    module: string;
  };
}

export const AITravelAssistantSection: React.FC<AITravelAssistantSectionProps> = ({
  onOpenFullAIModal,
  onNavigateToModule,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeResponse, setActiveResponse] = useState<AIResponseCard | null>({
    title: 'Multi-Destination AI Travel & Visa Pathways',
    category: 'JEL Intelligence Suite',
    summary:
      'Our intelligent neural engine cross-references Sabre/Amadeus GDS schedules, 40+ embassy visa requirement databases, and 500+ university partner portals to structure bespoke journeys.',
    highlights: [
      'Live airfare optimization across 900+ global carriers with zero hidden agency fees',
      'Embassy document readiness scoring and appointment tracking for UK, Canada & Schengen',
      'Direct CAS & I-20 application assistance for students with guaranteed scholarship review',
      'Exclusive VIP 5-Star clock tower hotel packages for Umrah with guided Ziyarat tours',
    ],
    suggestedAction: {
      label: 'Explore Flight Booking Engine',
      module: 'flights',
    },
  });

  const promptSuggestions = [
    { label: 'Find flights to Toronto', query: 'What are the best flight routes and baggage policies from Dhaka to Toronto (YYZ)?' },
    { label: 'Study in Australia', query: 'How can I apply for Subclass 500 student visa in Australian Group of Eight universities?' },
    { label: 'Explore UK universities', query: 'Which UK universities offer September/January intakes with scholarships for Bangladeshi students?' },
    { label: 'Plan an Umrah journey', query: 'Show me VIP executive Umrah packages with 5-star clock tower accommodation and Nusuk visa.' },
    { label: 'Find a visa pathway', query: 'What are the bank statement and documentation requirements for a Schengen tourist visa?' },
    { label: 'Build my holiday', query: 'Plan a 7-day luxury holiday in Dubai and Singapore including flights and tours.' },
  ];

  const handleAskAI = (promptText: string) => {
    setInputQuery(promptText);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (promptText.toLowerCase().includes('toronto') || promptText.toLowerCase().includes('flight')) {
        setActiveResponse({
          title: 'Dhaka (DAC) ➔ Toronto (YYZ) Flight Intelligence',
          category: 'Aviation & Global Mobility',
          summary:
            'Optimal routes identified via Emirates (via DXB), Qatar Airways (via DOH), and Turkish Airlines (via IST). Total transit time approx 17h–20h.',
          highlights: [
            'Economy baggage allowance: 2 pieces (23 kg each) standard on most long-haul carriers',
            'Transit visa: No transit visa required for airside layovers under 24 hours in DXB/DOH',
            'Study Permit Holder support: JEL immigration desk provides airport pickup and orientation',
          ],
          suggestedAction: {
            label: 'Search Toronto Flights in GDS',
            module: 'flights',
          },
        });
      } else if (promptText.toLowerCase().includes('australia') || promptText.toLowerCase().includes('uk') || promptText.toLowerCase().includes('study')) {
        setActiveResponse({
          title: 'Global Education & Student Visa Pathway',
          category: 'JEL Study Abroad Intelligence',
          summary:
            'Direct access to 500+ universities across Australia (Go8), UK (Russell Group), Canada (U15), and USA.',
          highlights: [
            'Eligibility assessment: IELTS waiver available for selected English-medium graduates',
            'Scholarships: Up to 50% tuition merit grants assessed directly during pre-screening',
            'Visa processing: Complete Genuine Student (GS) statement drafting and financial audit',
          ],
          suggestedAction: {
            label: 'Open JEL Study Abroad Portal',
            module: 'study-abroad',
          },
        });
      } else if (promptText.toLowerCase().includes('umrah')) {
        setActiveResponse({
          title: 'Executive Hajj & Umrah Pilgrimage Solutions',
          category: 'Faith-Centered Travel',
          summary:
            'Tailored VIP 5-star packages directly facing the Holy Haram in Makkah (Clock Tower) and Madinah.',
          highlights: [
            'Nusuk platform direct visa processing with 24-hour turnaround',
            'Private GMC / bus transportation for airport transfers and historical Ziyarat',
            'Experienced Islamic scholar guides accompanying group and bespoke travelers',
          ],
          suggestedAction: {
            label: 'View Umrah & Hajj Packages',
            module: 'packages',
          },
        });
      } else {
        setActiveResponse({
          title: 'Comprehensive Global Travel Pathway',
          category: 'Custom Travel Intelligence',
          summary:
            'JEL AI has mapped your query against our travel infrastructure and expert team advisory.',
          highlights: [
            'Customized day-by-day travel itinerary with verified local DMC tour guides',
            'Accurate embassy checklist and visa file organization support',
            'Instant 24/7 flight monitoring and rebooking guarantee',
          ],
          suggestedAction: {
            label: 'Launch Visa Requirement Portal',
            module: 'visa',
          },
        });
      }
    }, 600);
  };

  return (
    <section className="relative py-20 bg-[#061711] text-white border-y border-[#0B5D3B]/40 overflow-hidden">
      {/* Decorative Atmosphere Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0B5D3B]/20 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C8A14A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-emerald-500/30">
            <Bot className="w-4 h-4 text-[#C8A14A]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              Next-Gen Neural Travel Assistant
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            MEET YOUR AI TRAVEL EXPERT
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            Tell us where you want to go. Our intelligent travel experience helps you explore routes, destinations, visa pathways, study options and travel solutions.
          </p>
        </div>

        {/* AI Interaction Container */}
        <div className="max-w-4xl mx-auto">
          {/* Main Search Input Form */}
          <div className="bg-[#081C15] border-2 border-[#0B5D3B]/70 rounded-3xl p-3 sm:p-4 shadow-2xl shadow-black/80 transition-all focus-within:border-[#C8A14A] relative">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#093F31] border border-[#C8A14A]/40 flex items-center justify-center text-[#C8A14A] shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputQuery.trim()) {
                    handleAskAI(inputQuery);
                  }
                }}
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-base sm:text-lg font-medium text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (inputQuery.trim()) {
                    handleAskAI(inputQuery);
                  }
                }}
                disabled={isProcessing}
                className="px-6 py-3 rounded-2xl bg-[#0B5D3B] hover:bg-[#0E7A4E] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0 cursor-pointer shadow-md hover:shadow-emerald-500/20"
              >
                <span>{isProcessing ? 'Thinking...' : 'Ask JEL AI'}</span>
                <Send className="w-3.5 h-3.5 text-[#C8A14A]" />
              </button>
            </div>

            {/* Suggested Prompt Chips */}
            <div className="mt-4 pt-3 border-t border-[#0B5D3B]/40 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-[#C8A14A] shrink-0 tracking-wider">
                Popular Inquiries:
              </span>
              {promptSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskAI(prompt.query)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#0B5D3B]/50 hover:text-white border border-white/10 hover:border-emerald-400/40 text-slate-300 text-[11px] font-medium transition-all shrink-0 cursor-pointer"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Display Box */}
          {activeResponse && (
            <div className="mt-6 bg-[#081C15]/95 border border-[#0B5D3B]/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b border-[#0B5D3B]/40 pb-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B5D3B] text-[#C8A14A] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white">{activeResponse.title}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                      {activeResponse.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenFullAIModal}
                  className="text-xs text-[#C8A14A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full AI Chat</span>
                  <Zap className="w-3 h-3" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{activeResponse.summary}</p>

              {/* Highlights List */}
              <div className="mt-4 space-y-2.5">
                {activeResponse.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-emerald-100/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A14A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Trigger Button */}
              <div className="mt-6 pt-4 border-t border-[#0B5D3B]/40 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  Verified by Journey Expert Ltd. Advisory Team
                </span>
                <button
                  onClick={() => onNavigateToModule(activeResponse.suggestedAction.module)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] font-black text-xs uppercase tracking-wider transition-all flex items-center space-x-2 cursor-pointer shadow-md shadow-amber-500/10"
                >
                  <span>{activeResponse.suggestedAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
