import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Mic,
  Volume2,
  Database,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Calendar,
  DollarSign,
  Compass,
  Plane,
  Building2,
  Globe2,
  Cpu,
  Lock,
  MessageSquare,
  Users,
} from 'lucide-react';

export const AIEngineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'planner' | 'voice-ai' | 'agents-suite' | 'rag-vector' | 'automation-control'
  >('planner');

  // AI Planner State
  const [planDestination, setPlanDestination] = useState('London & Edinburgh, UK');
  const [planDays, setPlanDays] = useState(7);
  const [planBudgetBDT, setPlanBudgetBDT] = useState(380000);
  const [planStyle, setPlanStyle] = useState('Family Luxury & Halal Dining');
  const [planLoading, setPlanLoading] = useState(false);
  const [planResult, setPlanResult] = useState<any>({
    destination: 'London & Edinburgh, UK',
    days: 7,
    totalEstimatedCostBDT: 380000,
    totalEstimatedCostUSD: 3166,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in London (Heathrow) & Luxury Check-in',
        morning: 'Land at London Heathrow via Biman Bangladesh BG-201 / Emirates EK-029.',
        afternoon: 'Private chauffeur transfer to The Chesterfield Mayfair (Halal-friendly dining).',
        evening: 'Evening walk through Hyde Park & Dinner at Dishoom Mayfair.',
        estimatedCostBDT: 45000,
      },
      {
        day: 2,
        title: 'London Historic Landmarks & Thames River Cruise',
        morning: 'Big Ben, Westminster Abbey & Houses of Parliament guided walking tour.',
        afternoon: 'London Eye Fast-track Experience & Halal Afternoon Tea at The Milestone Hotel.',
        evening: 'Thames Sunset Sightseeing Cruise towards Tower Bridge.',
        estimatedCostBDT: 32000,
      },
      {
        day: 3,
        title: 'Oxford University & Cotswold Village Excursion',
        morning: 'Luxury Coach Day Trip to Oxford University & Christ Church College.',
        afternoon: 'Explore Bourton-on-the-Water & Traditional Cotswold Bakery.',
        evening: 'Return to London & Dinner at Benares Michelin-starred Halal Indian Restaurant.',
        estimatedCostBDT: 38000,
      },
      {
        day: 4,
        title: 'First-Class LNER Train to Edinburgh, Scotland',
        morning: 'First Class LNER Train from King\'s Cross to Edinburgh Waverley (Scenic Coastal Route).',
        afternoon: 'Check-in at The Balmoral Hotel & Edinburgh Castle Historic Visit.',
        evening: 'Royal Mile Stroll & Halal Scottish-Lebanese Grill Dinner.',
        estimatedCostBDT: 52000,
      },
    ],
    recommendedFlights: [
      { airline: 'Biman Bangladesh Airlines', route: 'DAC - LHR Direct', priceBDT: 88500 },
      { airline: 'Emirates', route: 'DAC - DXB - LHR (1 Stop)', priceBDT: 92400 },
    ],
    travelTips: [
      'Apply for UK Standard Visitor Visa 8-10 weeks before departure via JEL Visa Portal.',
      'Carry contactless debit/credit card; London transit (TfL) is 100% cashless.',
      'JEL 24/7 UK Emergency Support Line active throughout trip.',
    ],
  });

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlanLoading(true);

    try {
      const res = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: planDestination,
          days: planDays,
          budgetBDT: planBudgetBDT,
          travelStyle: planStyle,
        }),
      });

      const data = await res.json();
      setPlanResult(data);
    } catch (err) {
      console.error('Planner error:', err);
    } finally {
      setPlanLoading(false);
    }
  };

  // Voice AI Angela State
  const [voiceLang, setVoiceLang] = useState<'en' | 'bn' | 'ar'>('bn');
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>(
    'শুভরাত্রি! আমি জর্নি এক্সপার্ট লিমিটেড-এর ভয়েস এআই "অ্যাঞ্জেলা"। ইউকে ও কানাডা ভিসা ফাইলিং সংক্রান্ত সকল তথ্য তৈরি রয়েছে।'
  );

  const handleSimulateVoice = async (queryText?: string) => {
    const q = queryText || voiceQuery || 'Check UK Visa status';
    setVoiceActive(true);

    try {
      const res = await fetch('/api/ai/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, language: voiceLang }),
      });

      const data = await res.json();
      setVoiceTranscript(data.response);
    } catch (err) {
      console.error('Voice AI error:', err);
    } finally {
      setTimeout(() => setVoiceActive(false), 2000);
    }
  };

  // RAG Search State
  const [ragQuery, setRagQuery] = useState('UK student visa bank statement rule 28 days');
  const [ragResults, setRagResults] = useState<any>({
    query: 'UK student visa bank statement rule 28 days',
    vectorDb: 'Pinecone-v2-Cluster (Index: jel-knowledge-base-768dim)',
    semanticScore: 0.964,
    retrievedChunks: [
      {
        id: 'chunk-uk-vis-802',
        source: 'UK Visas & Immigration (UKVI) Official Appendix Finance 2026',
        content:
          'The required funds must have been held in the applicant\'s bank account for a continuous 28-day period ending no more than 31 days before the date of application. For London study: £1,334/month (up to 9 months) + unpaid tuition fee.',
        similarityScore: 0.982,
      },
      {
        id: 'chunk-[#JEL-SOP-104]',
        source: 'JEL Consular SOP Manual Section 4.2 - Bangladesh Bank Verification',
        content:
          'Bank statement must bear official seal, branch manager signature, and solvency certificate. High Commission cross-checks solvency certificate with Bangladesh Bank electronic portal.',
        similarityScore: 0.941,
      },
    ],
  });

  const handleRagSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/ai/rag-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ragQuery }),
      });
      const data = await res.json();
      setRagResults(data);
    } catch (err) {
      console.error('RAG Search error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6">
      {/* Header Banner */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#C7A44D] tracking-wider uppercase">
            <BrainCircuit className="w-4 h-4" />
            <span>JEL Enterprise AI Engine & Intelligent Automation • Part 11</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-serif">
            Context-Aware Multi-Agent AI Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 font-medium max-w-2xl leading-relaxed">
            Powering Travel Itinerary Generation, Angela Voice AI (English, Bangla, Arabic), RAG Vector Knowledge Base, and Automated Consular & CRM Workflows.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 shrink-0 text-xs">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <span className="text-[10px] text-emerald-200/80 block uppercase font-bold">LLM Gateway</span>
            <span className="font-mono font-extrabold text-white">Gemini 3.6 Flash Active</span>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('planner')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'planner'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#C7A44D]" />
          <span>1. AI Travel Planner</span>
        </button>

        <button
          onClick={() => setActiveTab('voice-ai')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'voice-ai'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Mic className="w-4 h-4 text-[#C7A44D]" />
          <span>2. Angela Voice AI Agent</span>
        </button>

        <button
          onClick={() => setActiveTab('agents-suite')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'agents-suite'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C7A44D]" />
          <span>3. Specialized Agents Suite</span>
        </button>

        <button
          onClick={() => setActiveTab('rag-vector')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'rag-vector'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Database className="w-4 h-4 text-[#C7A44D]" />
          <span>4. RAG Vector Knowledge Base</span>
        </button>

        <button
          onClick={() => setActiveTab('automation-control')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'automation-control'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Zap className="w-4 h-4 text-[#C7A44D]" />
          <span>5. AI Control Center & Workflows</span>
        </button>
      </div>

      {/* TAB 1: AI TRAVEL PLANNER */}
      {activeTab === 'planner' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs text-[#111111]">
          {/* Planner Inputs */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-[#0B6B53] font-bold">
              <Sparkles className="w-5 h-5 text-[#C7A44D]" />
              <span className="text-sm">AI Travel Itinerary Generator</span>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-3">
              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Destination</label>
                <input
                  type="text"
                  value={planDestination}
                  onChange={(e) => setPlanDestination(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#111111]"
                  required
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Duration (Days)</label>
                <input
                  type="number"
                  value={planDays}
                  onChange={(e) => setPlanDays(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-mono font-bold text-[#111111]"
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Total Budget (BDT)</label>
                <input
                  type="number"
                  value={planBudgetBDT}
                  onChange={(e) => setPlanBudgetBDT(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-mono font-bold text-[#111111]"
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Travel Style & Preferences</label>
                <input
                  type="text"
                  value={planStyle}
                  onChange={(e) => setPlanStyle(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#111111]"
                />
              </div>

              <button
                type="submit"
                disabled={planLoading}
                className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#C7A44D]" />
                <span>{planLoading ? 'Synthesizing Itinerary...' : 'Generate AI Travel Itinerary'}</span>
              </button>
            </form>
          </div>

          {/* Planner Output Results */}
          <div className="lg:col-span-2 space-y-6">
            {planResult && (
              <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#0B6B53] tracking-wider uppercase block">
                      AI Generated Custom Itinerary
                    </span>
                    <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                      {planResult.destination} ({planResult.days} Days)
                    </h3>
                  </div>

                  <div className="bg-[#F8FAF9] px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-right">
                    <span className="text-[10px] text-[#666666] font-extrabold block">Est. Budget</span>
                    <span className="font-black text-[#0B6B53] text-sm font-mono">
                      ৳ {planResult.totalEstimatedCostBDT.toLocaleString()} (${planResult.totalEstimatedCostUSD})
                    </span>
                  </div>
                </div>

                {/* Day-by-day Itinerary */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#093F31] text-sm">Day-by-Day Customized Schedule</h4>
                  <div className="space-y-3">
                    {planResult.itinerary.map((dayItem: any) => (
                      <div key={dayItem.day} className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                          <span className="font-black text-[#0B6B53] text-xs">Day {dayItem.day}: {dayItem.title}</span>
                          <span className="font-mono text-[10px] text-[#666666]">
                            Est: ৳ {dayItem.estimatedCostBDT.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[#111111]"><span className="font-bold text-[#093F31]">Morning:</span> {dayItem.morning}</p>
                        <p className="text-[#111111]"><span className="font-bold text-[#093F31]">Afternoon:</span> {dayItem.afternoon}</p>
                        <p className="text-[#111111]"><span className="font-bold text-[#093F31]">Evening:</span> {dayItem.evening}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Tips & Flight Recommendation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#093F31] text-white p-4 rounded-2xl space-y-2">
                    <span className="font-bold text-[#C7A44D] text-xs block">AI Recommended Flights</span>
                    {planResult.recommendedFlights.map((f: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs border-b border-white/10 pb-1">
                        <span>{f.airline} ({f.route})</span>
                        <span className="font-mono text-[#C7A44D] font-bold">৳ {f.priceBDT.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                    <span className="font-extrabold text-[#093F31] text-xs block">Consular & Local Travel Tips</span>
                    <ul className="space-y-1 text-[#666666]">
                      {planResult.travelTips.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-[#0B6B53] font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ANGELA VOICE AI AGENT */}
      {activeTab === 'voice-ai' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Multilingual Voice AI Assistant
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Angela AI Voice Specialist (English • Bangla বাংলা • Arabic العربية)
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setVoiceLang('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                  voiceLang === 'en' ? 'bg-[#0B6B53] text-white' : 'bg-[#F8FAF9] text-[#666666]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setVoiceLang('bn')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                  voiceLang === 'bn' ? 'bg-[#0B6B53] text-white' : 'bg-[#F8FAF9] text-[#666666]'
                }`}
              >
                Bangla বাংলা
              </button>
              <button
                onClick={() => setVoiceLang('ar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                  voiceLang === 'ar' ? 'bg-[#0B6B53] text-white' : 'bg-[#F8FAF9] text-[#666666]'
                }`}
              >
                Arabic العربية
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audio Wave Synthesizer Box */}
            <div className="bg-[#093F31] text-white rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-[#C7A44D] animate-bounce" />
                  <span className="font-extrabold text-white text-sm">Angela Voice Synthesis Studio</span>
                </div>
                <span className="bg-[#C7A44D] text-[#093F31] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  48kHz Ultra-HD Voice
                </span>
              </div>

              {/* Simulated Waveform animation */}
              <div className="h-20 bg-black/30 rounded-2xl border border-white/10 flex items-center justify-center px-4 space-x-1">
                {[40, 70, 30, 90, 50, 80, 20, 60, 100, 45, 85, 35, 75, 55, 95, 25, 65].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${voiceActive ? h : 20}%` }}
                    className="w-1.5 bg-[#C7A44D] rounded-full transition-all duration-300"
                  />
                ))}
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-200/80 font-mono block">Live Voice Output Transcript</span>
                <p className="font-medium text-white text-xs leading-relaxed">{voiceTranscript}</p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={voiceQuery}
                  onChange={(e) => setVoiceQuery(e.target.value)}
                  placeholder="Type voice query or speak..."
                  className="flex-grow bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-emerald-100/50 text-xs focus:outline-none"
                />
                <button
                  onClick={() => handleSimulateVoice()}
                  className="px-4 py-2 bg-[#C7A44D] text-[#093F31] font-black rounded-xl text-xs hover:bg-amber-400 transition-all"
                >
                  Speak / Send
                </button>
              </div>
            </div>

            {/* Quick Voice Scenarios */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#093F31] text-sm">Simulate Real Voice Calls</h4>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    handleSimulateVoice(
                      'I want to inquire about UK Student Visa document checklist and bank statement requirement'
                    )
                  }
                  className="w-full text-left p-3.5 bg-[#F8FAF9] hover:bg-emerald-50 rounded-2xl border border-[#ECECEC] transition-all"
                >
                  <span className="font-extrabold text-[#093F31] block">1. Inbound Lead: UK Student Visa Inquiry</span>
                  <span className="text-[11px] text-[#666666]">
                    Angela qualifies lead, checks IELTS score, and sends WhatsApp document list.
                  </span>
                </button>

                <button
                  onClick={() =>
                    handleSimulateVoice('Book 5-star Umrah Executive Package in Makkah for 4 family members')
                  }
                  className="w-full text-left p-3.5 bg-[#F8FAF9] hover:bg-emerald-50 rounded-2xl border border-[#ECECEC] transition-all"
                >
                  <span className="font-extrabold text-[#093F31] block">2. Inbound Call: Executive Umrah Booking</span>
                  <span className="text-[11px] text-[#666666]">
                    Angela verifies hotel proximity to Haram and calculates instant package price in BDT.
                  </span>
                </button>

                <button
                  onClick={() =>
                    handleSimulateVoice('Check my flight booking status for Biman BG-201 to London Heathrow')
                  }
                  className="w-full text-left p-3.5 bg-[#F8FAF9] hover:bg-emerald-50 rounded-2xl border border-[#ECECEC] transition-all"
                >
                  <span className="font-extrabold text-[#093F31] block">3. Support Call: Flight Status & Baggage Rules</span>
                  <span className="text-[11px] text-[#666666]">
                    Angela reads live PNR status and confirms 2x23kg baggage allowance.
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPECIALIZED AGENTS SUITE */}
      {activeTab === 'agents-suite' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#111111]">
          {[
            {
              name: 'Journey AI Assistant',
              role: 'General OTA & Trip Planner',
              description: 'Cross-references Sabre, Amadeus, and Galileo for flight searches, hotel rooms, and halal tours.',
              accuracy: '99.2%',
              model: 'Gemini 3.6 Flash',
            },
            {
              name: 'Angela AI Voice Agent',
              role: 'Voice Lead Qualification',
              description: 'Handles 24/7 voice conversations in English, Bangla, and Arabic for instant booking support.',
              accuracy: '98.5%',
              model: 'Custom Voice LLM',
            },
            {
              name: 'AI Visa Advisor',
              role: 'Consular Risk Assessment',
              description: 'Analyzes passport MRZ OCR, bank liquid statements, and travel history to predict approval odds.',
              accuracy: '99.7%',
              model: 'Gemini 3.6 + OCR Engine',
            },
            {
              name: 'AI Study Abroad Counselor',
              role: '500+ University Matcher',
              description: 'Matches student GPA & IELTS scores against admission criteria in UK, USA, Canada & Australia.',
              accuracy: '99.1%',
              model: 'RAG Embeddings Engine',
            },
            {
              name: 'AI Sales Agent',
              role: 'Lead Qualification & Quotations',
              description: 'Predicts conversion probability and generates personalized B2C/B2B flight & visa quotes.',
              accuracy: '97.8%',
              model: 'Predictive Sales Agent',
            },
            {
              name: 'AI CRM Engine',
              role: 'Automated Reminders & Churn Guard',
              description: 'Automates WhatsApp & Email reminders for visa document submission and payment deadlines.',
              accuracy: '98.9%',
              model: 'Workflow Agent',
            },
          ].map((agent, idx) => (
            <div key={idx} className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-4 shadow-sm hover:border-[#0B6B53]/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#093F31] p-0.5 flex items-center justify-center text-[#C7A44D]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {agent.accuracy} Accuracy
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-[#093F31] text-base font-serif">{agent.name}</h4>
                <span className="text-[10px] font-bold text-[#0B6B53] uppercase tracking-wider block">{agent.role}</span>
                <p className="text-[#666666] mt-2 font-medium leading-relaxed">{agent.description}</p>
              </div>

              <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between text-[10px] text-[#666666]">
                <span>Base Model: <strong className="text-[#093F31]">{agent.model}</strong></span>
                <span className="text-emerald-600 font-bold">● Active</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: RAG VECTOR KNOWLEDGE BASE */}
      {activeTab === 'rag-vector' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Enterprise Vector Knowledge Base & RAG Architecture
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Pinecone / Qdrant Knowledge Retrieval Engine
              </h3>
            </div>

            <span className="bg-[#F8FAF9] px-4 py-2 rounded-xl border border-[#ECECEC] font-mono font-bold text-[#093F31]">
              Index: jel-knowledge-base-768dim (14,280 Embeddings)
            </span>
          </div>

          <form onSubmit={handleRagSearch} className="flex gap-3">
            <input
              type="text"
              value={ragQuery}
              onChange={(e) => setRagQuery(e.target.value)}
              placeholder="Search RAG Knowledge Base (e.g. UK student visa bank statement rule)..."
              className="flex-grow bg-[#F8FAF9] border border-[#ECECEC] rounded-xl px-4 py-3 font-semibold text-[#111111]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0B6B53] text-white font-extrabold rounded-xl hover:bg-[#093F31] transition-all"
            >
              Run Vector Search
            </button>
          </form>

          {ragResults && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#F8FAF9] p-3 rounded-xl border border-[#ECECEC] text-[11px]">
                <span className="font-bold text-[#093F31]">Query Vector: "{ragResults.query}"</span>
                <span className="font-mono text-[#0B6B53] font-bold">Cosine Similarity: {ragResults.semanticScore}</span>
              </div>

              <div className="space-y-3">
                {ragResults.retrievedChunks.map((chunk: any) => (
                  <div key={chunk.id} className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                    <div className="flex justify-between items-center border-b border-[#ECECEC] pb-2">
                      <span className="font-extrabold text-[#093F31]">{chunk.source}</span>
                      <span className="bg-[#0B6B53] text-white font-mono text-[10px] font-black px-2 py-0.5 rounded">
                        Score: {chunk.similarityScore}
                      </span>
                    </div>
                    <p className="text-[#111111] font-medium leading-relaxed">{chunk.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AI CONTROL CENTER & AUTOMATION WORKFLOWS */}
      {activeTab === 'automation-control' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[#666666] font-bold text-[10px] uppercase block">Daily Automations Handled</span>
              <span className="text-3xl font-black text-[#093F31] font-serif">1,420 / Day</span>
              <span className="text-emerald-600 font-bold block">100% On-Time Execution</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[#666666] font-bold text-[10px] uppercase block">LLM Gateway Cost Monitoring</span>
              <span className="text-3xl font-black text-[#0B6B53] font-mono">$42.18 / Mo</span>
              <span className="text-[#666666] font-medium block">Gemini 3.6 Flash Optimized</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[#666666] font-bold text-[10px] uppercase block">PII & Prompt Firewall</span>
              <span className="text-3xl font-black text-[#C7A44D] font-serif">ACTIVE</span>
              <span className="text-emerald-600 font-bold block">Passport & Credit Card Obfuscation</span>
            </div>
          </div>

          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-black text-[#093F31] font-serif border-b border-[#ECECEC] pb-3">
              Automated CRM & Communication Triggers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                <span className="font-extrabold text-[#093F31] block">1. WhatsApp Auto-Reminder</span>
                <p className="text-[#666666]">Triggers 3 days before visa document submission deadline.</p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                <span className="font-extrabold text-[#093F31] block">2. Email Quotation Generator</span>
                <p className="text-[#666666]">Instantly emails flight & hotel PDFs when lead is qualified.</p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                <span className="font-extrabold text-[#093F31] block">3. Churn Risk Warning</span>
                <p className="text-[#666666]">Alerts consultant if client file has been pending &gt; 48 hours.</p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                <span className="font-extrabold text-[#093F31] block">4. Human Approval Queue</span>
                <p className="text-[#666666]">Requires senior officer sign-off before visa submission.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
