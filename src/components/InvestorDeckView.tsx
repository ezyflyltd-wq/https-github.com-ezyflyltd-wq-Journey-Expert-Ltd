import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  PieChart,
  ShieldCheck,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  Building2,
  Sliders,
  Award,
  Globe2,
  ArrowUpRight,
  Target,
  Sparkles,
  Bot,
  Users,
  Download,
  Lock,
} from 'lucide-react';

export const InvestorDeckView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'pitch-deck' | 'financial-model' | 'capital-allocation' | 'data-room'
  >('pitch-deck');

  const [investorData, setInvestorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Pitch Deck Slide State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Unit Economics Simulator State
  const [inputCacBDT, setInputCacBDT] = useState<number>(1850);
  const [inputLtvBDT, setInputLtvBDT] = useState<number>(14200);

  useEffect(() => {
    fetchInvestorOverview();
  }, []);

  const fetchInvestorOverview = () => {
    setLoading(true);
    fetch('/api/investors/overview')
      .then((res) => res.json())
      .then((data) => {
        setInvestorData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load investor data:', err);
        setLoading(false);
      });
  };

  // Math for Unit Economics
  const computedLtvCacRatio = (inputLtvBDT / Math.max(1, inputCacBDT)).toFixed(2);

  const slides = investorData?.pitchDeckSlides || [];
  const currentSlide = slides[currentSlideIndex] || {
    slideNumber: 1,
    title: 'Loading Pitch Deck...',
    category: 'Vision',
    summary: 'Preparing investor slides...',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - INVESTOR PRESENTATION & FUNDING FRAMEWORK */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • INVESTOR PRESENTATION & VALUATION (PART 34)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Briefcase className="w-3 h-3 text-[#C8A14A]" />
                <span>$3.5M USD SEED / SERIES-A RAISE • $18M POST-MONEY VALUATION</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Investor Presentation, Financial Model & Valuation Framework
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Institutional investor pitch deck, 3-year P&L model, CAC/LTV unit economics simulator & capital deployment strategy positioning Journey Expert Ltd. as South Asia's preeminent AI-native OTA and education mobility ecosystem.
            </p>
          </div>

          {/* Quick Fundraising Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Target Raise:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {investorData?.targetRaiseUSD || '$3,500,000 USD'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Post-Money Valuation:</span>
              <span className="text-white font-mono font-bold text-xs">
                {investorData?.postMoneyValuationUSD || '$18,000,000 USD'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Unit LTV/CAC Ratio:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {investorData?.unitEconomics?.ltvCacRatio || '7.68x'}
              </span>
            </div>

            <button
              onClick={fetchInvestorOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Investor Financials</span>
            </button>
          </div>
        </div>

        {/* Investment Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          {investorData?.keyInvestmentHighlights?.map((hl: string, idx: number) => (
            <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-[#C8A14A] shrink-0 mt-0.5" />
              <span className="text-[11px] font-medium text-emerald-100 leading-snug">{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('pitch-deck')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'pitch-deck'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Interactive Investor Pitch Deck</span>
        </button>

        <button
          onClick={() => setActiveTab('financial-model')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'financial-model'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#C8A14A]" />
          <span>2. 3-Year P&L & Unit Economics Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('capital-allocation')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'capital-allocation'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <PieChart className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Capital Deployment & Use of Funds</span>
        </button>

        <button
          onClick={() => setActiveTab('data-room')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'data-room'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Verified Investor Data Room</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE INVESTOR PITCH DECK */}
      {activeTab === 'pitch-deck' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Executive Pitch Deck Carousel
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Slide {currentSlide.slideNumber} of {slides.length}: {currentSlide.title}
              </h3>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                className="p-2.5 rounded-xl border border-[#ECECEC] bg-[#F8FAF9] hover:bg-emerald-50 text-[#081C15] disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-[#0B5D3B]" />
              </button>

              <span className="text-xs font-mono font-bold px-3">
                {currentSlideIndex + 1} / {slides.length}
              </span>

              <button
                disabled={currentSlideIndex === slides.length - 1}
                onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                className="p-2.5 rounded-xl border border-[#ECECEC] bg-[#F8FAF9] hover:bg-emerald-50 text-[#081C15] disabled:opacity-30 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-[#0B5D3B]" />
              </button>
            </div>
          </div>

          {/* Active Pitch Card Display */}
          <div className="bg-[#081C15] text-white p-8 sm:p-12 rounded-3xl border border-[#C8A14A]/40 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="bg-[#C8A14A] text-[#081C15] text-[10px] font-extrabold font-mono px-3 py-1 rounded-full uppercase">
                {currentSlide.category}
              </span>

              <span className="text-emerald-300 font-mono text-xs font-bold">
                Slide 0{currentSlide.slideNumber}
              </span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-white leading-tight">
                {currentSlide.title}
              </h2>

              <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
                {currentSlide.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[10px] text-emerald-300 uppercase block font-bold">Primary Market Focus</span>
                <strong className="text-white text-xs">South Asia & Global Expat Corridors</strong>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[10px] text-emerald-300 uppercase block font-bold">Competitive Moat</span>
                <strong className="text-amber-300 text-xs">13 Gemini AI Agents + Vector Vault</strong>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[10px] text-emerald-300 uppercase block font-bold">Monetization Engine</span>
                <strong className="text-emerald-300 text-xs">4-8% GDS + $1,500/Student Fee</strong>
              </div>
            </div>
          </div>

          {/* Slide Thumbnail Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {slides.map((s: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  currentSlideIndex === idx
                    ? 'border-[#0B5D3B] bg-emerald-50 text-[#081C15] font-bold shadow-md'
                    : 'border-[#ECECEC] bg-[#F8FAF9] text-[#666666] hover:bg-white'
                }`}
              >
                <span className="text-[10px] font-mono font-bold block text-[#0B5D3B]">Slide {s.slideNumber}</span>
                <strong className="text-xs truncate block mt-0.5">{s.title}</strong>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 3-YEAR P&L & UNIT ECONOMICS SIMULATOR */}
      {activeTab === 'financial-model' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Institutional Financial Projections
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              3-Year P&L Forecast & Dynamic CAC vs. LTV Unit Economics Simulator
            </h3>
          </div>

          {/* 3-Year Financial Table */}
          <div className="space-y-3">
            <strong className="text-sm font-bold text-[#081C15] font-serif block">
              3-Year Consolidated Profit & Loss Model (USD)
            </strong>

            <div className="overflow-x-auto border border-[#ECECEC] rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#081C15] text-white font-serif uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Fiscal Year</th>
                    <th className="p-3.5">Gross Booking Volume (GMV)</th>
                    <th className="p-3.5">Net Revenue (Margin & Fees)</th>
                    <th className="p-3.5">EBITDA</th>
                    <th className="p-3.5">Net Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC] font-mono">
                  {investorData?.threeYearFinancialsUSD?.map((fin: any, fIdx: number) => (
                    <tr key={fIdx} className="hover:bg-[#F8FAF9]">
                      <td className="p-3.5 font-bold text-[#081C15]">{fin.year}</td>
                      <td className="p-3.5 text-[#0B5D3B] font-black">{fin.grossBookingVolume}</td>
                      <td className="p-3.5 font-bold text-[#081C15]">{fin.netRevenue}</td>
                      <td className="p-3.5 font-bold text-amber-700">{fin.ebitda}</td>
                      <td className="p-3.5 font-bold text-emerald-700">{fin.netProfitMargin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Unit Economics Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-[#ECECEC]">
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <Sliders className="w-5 h-5 text-[#C8A14A]" />
                <strong className="font-serif font-black text-sm text-[#C8A14A]">
                  Unit Economics Input Controls
                </strong>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-emerald-200 mb-1">
                    <span>Blended Customer Acquisition Cost (CAC):</span>
                    <strong className="text-[#C8A14A]">৳{inputCacBDT.toLocaleString()} BDT</strong>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={inputCacBDT}
                    onChange={(e) => setInputCacBDT(parseInt(e.target.value))}
                    className="w-full accent-[#C8A14A]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-emerald-200 mb-1">
                    <span>Average Customer Lifetime Value (LTV):</span>
                    <strong className="text-[#C8A14A]">৳{inputLtvBDT.toLocaleString()} BDT</strong>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={30000}
                    step={500}
                    value={inputLtvBDT}
                    onChange={(e) => setInputLtvBDT(parseInt(e.target.value))}
                    className="w-full accent-[#C8A14A]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-4">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                Computed LTV / CAC Output Metrics
              </strong>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Computed LTV : CAC Ratio</span>
                  <span className="text-2xl font-black text-[#0B5D3B] font-mono">
                    {computedLtvCacRatio}x
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Payback Horizon</span>
                  <span className="text-2xl font-black text-[#081C15] font-mono">
                    2.1 Months
                  </span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                <strong className="font-bold block mb-1">Institutional Benchmark Standard:</strong>
                An LTV/CAC ratio above <strong className="text-[#0B5D3B] font-mono">3.0x</strong> indicates strong venture scalability. Journey Expert's projected <strong className="text-[#0B5D3B] font-mono">{computedLtvCacRatio}x</strong> ratio reflects high organic student referral retention and AI conversion efficiency.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAPITAL DEPLOYMENT & USE OF FUNDS */}
      {activeTab === 'capital-allocation' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              $3.5M USD Seed / Series-A Raise Breakdown
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Capital Deployment Plan & Use of Funds
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Technology & AI R&D (40%)</strong>
              <span className="text-lg font-black text-[#0B5D3B] font-mono block">$1,400,000 USD</span>
              <p className="text-xs text-[#666666]">
                Proprietary Gemini Agent training, Pinecone Vector Vault expansion, trilingual Voice AI synthesis & GDS NDC rails.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Growth Marketing & User Acquisition (25%)</strong>
              <span className="text-lg font-black text-[#0B5D3B] font-mono block">$875,000 USD</span>
              <p className="text-xs text-[#666666]">
                Performance marketing across South Asia, Middle East expat campaigns & university student onboarding events.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Team & Global Leadership (20%)</strong>
              <span className="text-lg font-black text-[#0B5D3B] font-mono block">$700,000 USD</span>
              <p className="text-xs text-[#666666]">
                Senior engineering talent, study abroad visa counselors & regional DMC operations managers.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Regulatory & Operational Licensing (10%)</strong>
              <span className="text-lg font-black text-[#0B5D3B] font-mono block">$350,000 USD</span>
              <p className="text-xs text-[#666666]">
                Direct supplier API integrations, PCI-DSS Level 1 compliance & official business registration.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Working Capital Reserve (5%)</strong>
              <span className="text-lg font-black text-[#0B5D3B] font-mono block">$175,000 USD</span>
              <p className="text-xs text-[#666666]">
                Emergency liquidity buffer for currency fluctuations and airline GDS deposit guarantees.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIED INVESTOR DATA ROOM */}
      {activeTab === 'data-room' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Institutional Due Diligence Repository
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Encrypted Investor Data Room & Audit Trail
            </h3>
          </div>

          <div className="space-y-3">
            {investorData?.dataRoomChecklist?.map((doc: any, dIdx: number) => (
              <div key={dIdx} className="bg-[#F8FAF9] border border-[#ECECEC] p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-[#0B5D3B]" />
                  <strong className="text-xs font-bold text-[#081C15]">{doc.docName}</strong>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{doc.status}</span>
                  </span>

                  <button className="px-3 py-1 bg-[#081C15] text-white text-[10px] font-bold rounded-xl hover:bg-[#0B5D3B] transition-all flex items-center space-x-1">
                    <Download className="w-3 h-3 text-[#C8A14A]" />
                    <span>Request Copy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
