import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  Globe2,
  Eye,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  Zap,
  Glasses,
  Lock,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Database,
  ExternalLink,
  Sliders,
  Award,
  Video,
  Heart,
  HelpCircle,
  FileText,
  User,
  Radio,
  Share2,
} from 'lucide-react';

export const InnovationLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'ai-2030' | 'digital-identity' | 'immersive-arvr' | 'smart-tourism' | 'rd-roadmap'
  >('ai-2030');

  const [labData, setLabData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Journey AI 2030 Intent Simulator State
  const [promptInput, setPromptInput] = useState<string>(
    'Plan my complete 5-day London graduation trip for 3 people, including flights from Dhaka, 4-star hotel near Coventry University, UK student visa document check, and halal food dining plan.'
  );
  const [isSimulatingAi, setIsSimulatingAi] = useState<boolean>(false);
  const [ai2030Output, setAi2030Output] = useState<any>(null);

  // Digital Identity Verification State
  const [zkpVerified, setZkpVerified] = useState<boolean>(false);

  useEffect(() => {
    fetchLabOverview();
  }, []);

  const fetchLabOverview = () => {
    setLoading(true);
    fetch('/api/innovation-lab/overview')
      .then((res) => res.json())
      .then((data) => {
        setLabData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load innovation lab overview:', err);
        setLoading(false);
      });
  };

  const handleSimulateAi2030 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingAi(true);
    setAi2030Output(null);

    setTimeout(() => {
      setIsSimulatingAi(false);
      setAi2030Output({
        intentParsed: 'COMPLETE_MULTI_DESTINATION_MOBILITY_PACKAGE',
        destination: 'London (LHR) & Coventry, UK',
        passengers: 3,
        flightRecommendation: 'Biman BG-201 Direct DAC-LHR (3 Seats Reserved via Sabre GDS)',
        accommodation: 'The Clermont London Victoria (Family Suite, 4 Nights) + Coventry Shuttle',
        visaCompliance: 'CAS Letter Verified with Coventry Uni API • Bank Statement Maturity: 28 Days Passed',
        halalDiningRoute: '12 Certified Halal Restaurants Booked near Hotel & University Campus',
        biometricPassportsSynced: 'Zero-Knowledge Biometric Credentials Issued for e-Gate Clearance',
        totalEstimatedBudgetBdt: 'BDT 8,45,000 (~$7,050 USD for 3 Travelers)'
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - JOURNEY EXPERT INNOVATION LAB (PART 43) */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • INNOVATION LAB & FUTURE TECH (PART 43)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <BrainCircuit className="w-3 h-3 text-[#C8A14A]" />
                <span>2030 AUTONOMOUS TRAVEL MOBILITY LAB</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Journey Expert Future Mobility & AI Research Lab
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Pioneering Next-Gen Travel AI 2030, Decentralized Biometric Passports, AR/VR Metaverse Previews, Smart Destination IoT, and Autonomous Halal & Medical Mobility Systems.
            </p>
          </div>

          {/* Quick Metrics Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active R&D Projects:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {labData?.metrics?.activeResearchProjects || 14} Projects
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Patents Filed & Pending:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {labData?.metrics?.patentsFiledOrPending || 6} Patents
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>2030 AI Companion Users:</span>
              <span className="text-amber-300 font-mono font-black text-xs">
                {labData?.metrics?.ai2030CompanionUsers?.toLocaleString() || '84,200'}
              </span>
            </div>

            <button
              onClick={fetchLabOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Lab R&D Telemetry</span>
            </button>
          </div>
        </div>

        {/* Lab KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Biometric Wallets Issued</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {labData?.metrics?.digitalIdentityWalletsIssued?.toLocaleString() || '125,000'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Spatial 3D Metaverse Tours</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">
              {labData?.metrics?.vrMetaverseTourSessions24h?.toLocaleString() || '3,410'} / 24h
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Smart Destination Partners</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">
              {labData?.metrics?.smartTourismPartners || 88} Destinations
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Quantum Security Encryption</span>
            <strong className="text-white font-mono text-xs mt-0.5">ZKP & AES-256</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Lab Status</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">R&D PIPELINE ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('ai-2030')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-2030'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Journey AI 2030 Autonomous Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('digital-identity')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'digital-identity'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Digital Identity & Biometric Passport Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('immersive-arvr')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'immersive-arvr'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Glasses className="w-4 h-4 text-[#C8A14A]" />
          <span>3. AR/VR Spatial Metaverse Previews</span>
        </button>

        <button
          onClick={() => setActiveTab('smart-tourism')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'smart-tourism'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Smart Destination IoT & Halal Intelligence</span>
        </button>

        <button
          onClick={() => setActiveTab('rd-roadmap')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'rd-roadmap'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Cpu className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Innovation Research & Patent Roadmap</span>
        </button>
      </div>

      {/* TAB 1: JOURNEY AI 2030 AUTONOMOUS ASSISTANT */}
      {activeTab === 'ai-2030' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Human-Intent Natural Language Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey AI 2030 Autonomous Companion Simulator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleSimulateAi2030} className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
              <h4 className="font-bold text-[#081C15] font-serif text-sm">Enter Complex Travel / Study Intent Prompt</h4>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Natural Language Human Prompt:</label>
                <textarea
                  rows={4}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <button
                type="submit"
                disabled={isSimulatingAi}
                className="w-full py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C8A14A]" />
                <span>{isSimulatingAi ? 'Journey AI 2030 Synthesizing...' : 'Execute AI 2030 End-to-End Orchestration'}</span>
              </button>
            </form>

            <div className="bg-[#081C15] text-white p-6 rounded-2xl border border-[#C8A14A]/40 space-y-4 shadow-xl flex flex-col justify-between font-mono">
              <div>
                <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                  <span className="text-[#C8A14A] font-serif text-sm font-bold flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-[#C8A14A]" />
                    <span>AI 2030 Orchestration Engine</span>
                  </span>
                  <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded">
                    INTENT ACTIVE
                  </span>
                </div>

                {ai2030Output ? (
                  <div className="space-y-3 pt-3 text-xs">
                    <div className="bg-black/40 p-3 rounded-xl border border-emerald-800 space-y-1">
                      <strong className="text-amber-300 block text-[11px]">Flight: {ai2030Output.flightRecommendation}</strong>
                      <strong className="text-emerald-200 block text-[11px]">Hotel: {ai2030Output.accommodation}</strong>
                    </div>

                    <div className="space-y-1 text-[11px] text-emerald-100">
                      <p>🎓 <strong className="text-white">Visa Check:</strong> {ai2030Output.visaCompliance}</p>
                      <p>🍱 <strong className="text-white">Halal Dining:</strong> {ai2030Output.halalDiningRoute}</p>
                      <p>🔐 <strong className="text-white">Biometrics:</strong> {ai2030Output.biometricPassportsSynced}</p>
                      <p>💰 <strong className="text-amber-300 font-bold">Total Budget:</strong> {ai2030Output.totalEstimatedBudgetBdt}</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-emerald-400/60 font-sans text-xs">
                    Click "Execute AI 2030 End-to-End Orchestration" to test multi-intent autonomous planning.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL IDENTITY & BIOMETRIC PASSPORT WALLET */}
      {activeTab === 'digital-identity' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Decentralized Verifiable Credentials
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Zero-Knowledge Proof Digital Passport & Document Vault
            </h3>
          </div>

          <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <strong className="text-base font-bold text-[#081C15] font-serif block">
                  Verify Digital Biometric Credential
                </strong>
                <p className="text-xs text-[#666666]">
                  Cryptographic verification of Passport, Visa Approvals, Immunization Records & CAS Letters.
                </p>
              </div>

              <button
                onClick={() => setZkpVerified(!zkpVerified)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                  zkpVerified
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-[#081C15] text-white hover:bg-[#0B5D3B]'
                }`}
              >
                <Lock className="w-4 h-4 text-[#C8A14A]" />
                <span>{zkpVerified ? 'ZKP Credential Verified ✅' : 'Run Zero-Knowledge Verification'}</span>
              </button>
            </div>

            {zkpVerified && (
              <div className="p-4 bg-emerald-950 text-emerald-100 border border-emerald-500/40 rounded-xl space-y-1 font-mono text-xs">
                <p>✅ Biometric Hash Match: <span className="text-white">sha256:8f4a12...c9d01</span></p>
                <p>✅ ICAO e-Passport Cryptographic Signature Valid</p>
                <p>✅ UK Home Office CAS Letter Verifiable Credential Attached</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: AR/VR SPATIAL METAVERSE PREVIEWS */}
      {activeTab === 'immersive-arvr' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Spatial Computing & Metaverse
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              3D Virtual Reality Destination & University Campus Previews
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] block">Luxury Resort & Villa Tour</strong>
              <p className="text-xs text-[#666666]">360-degree spatial tour of Maldives Overwater Bungalows & Dubai Penthouses.</p>
              <button className="w-full py-2 bg-[#0B5D3B] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1">
                <Glasses className="w-3.5 h-3.5 text-[#C8A14A]" />
                <span>Launch 3D WebVR Preview</span>
              </button>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] block">University Campus Walkthrough</strong>
              <p className="text-xs text-[#666666]">Virtual stroll across Coventry University, Monash, and University of York campuses.</p>
              <button className="w-full py-2 bg-[#081C15] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1">
                <Glasses className="w-3.5 h-3.5 text-[#C8A14A]" />
                <span>Explore Campus VR</span>
              </button>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] block">Hajj & Umrah Tawaf Ritual VR</strong>
              <p className="text-xs text-[#666666]">Interactive step-by-step 3D guidance for Makkah Tawaf & Sa'i rituals.</p>
              <button className="w-full py-2 bg-[#0B5D3B] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1">
                <Glasses className="w-3.5 h-3.5 text-[#C8A14A]" />
                <span>Start Pilgrimage VR</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SMART DESTINATION IOT & HALAL INTELLIGENCE */}
      {activeTab === 'smart-tourism' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Smart Tourism Infrastructure
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Smart Destination IoT, Airport Automation & AI Halal Finder
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] block">AI Halal Dining & Prayer Radar</strong>
              <p className="text-xs text-[#666666]">Real-time location-based certified Halal food detection, Qibla compass, and Mosque prayer alerts.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] block">Airport Robot Check-in Integrations</strong>
              <p className="text-xs text-[#666666]">Automated luggage drop-off sync with DAC Hazrat Shahjalal International Airport & Dubai DXB kiosks.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INNOVATION RESEARCH & PATENT ROADMAP */}
      {activeTab === 'rd-roadmap' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Intellectual Property & R&D
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Patents Filed, Technology Innovation Pillars & 2030 Vision
            </h3>
          </div>

          <div className="space-y-3">
            {labData?.pillars?.map((pil: any, pIdx: number) => (
              <div key={pIdx} className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#081C15] font-serif">{pil.name}</strong>
                  <span className="bg-[#0B5D3B] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {pil.status}
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{pil.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
