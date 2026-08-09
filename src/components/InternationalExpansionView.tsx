import React, { useState, useEffect } from 'react';
import {
  Globe,
  MapPin,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Plane,
  Hotel,
  GraduationCap,
  ShieldCheck,
  Award,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  PieChart,
  BarChart2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Bot,
  BrainCircuit,
  Zap,
  Layers,
  PhoneCall,
  Globe2,
  Building,
  Flag,
  Share2,
  Cpu,
  Shield,
  Send,
  Plus,
} from 'lucide-react';

export const InternationalExpansionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'roadmap' | 'partnerships' | 'franchise-whitelabel' | 'bd-crm' | 'ai-intelligence'
  >('roadmap');

  const [expansionData, setExpansionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Selected Country Detail State
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('BD');

  // Partner Filter State
  const [partnerTypeFilter, setPartnerTypeFilter] = useState<string>('ALL');

  // Franchise & White Label Simulator State
  const [franchiseType, setFranchiseType] = useState<'Master Franchise' | 'Regional Authorized Agent' | 'White Label SaaS'>(
    'Master Franchise'
  );
  const [selectedTerritory, setSelectedTerritory] = useState<string>('United Kingdom (London & Birmingham)');
  const [estimatedMonthlyBookings, setEstimatedMonthlyBookings] = useState<number>(1500);
  const [simulatedRevenue, setSimulatedRevenue] = useState<any>(null);

  // BD Pipeline Simulation State
  const [newPartnerName, setNewPartnerName] = useState<string>('Singapore Airlines Direct NDC');
  const [newPartnerCategory, setNewPartnerCategory] = useState<string>('Airline (NDC Direct)');
  const [newPartnerTerritory, setNewPartnerTerritory] = useState<string>('Southeast Asia');
  const [partnerAddedSuccess, setPartnerAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchExpansionOverview();
  }, []);

  const fetchExpansionOverview = () => {
    setLoading(true);
    fetch('/api/international-expansion/overview')
      .then((res) => res.json())
      .then((data) => {
        setExpansionData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load international expansion overview:', err);
        setLoading(false);
      });
  };

  // Franchise Revenue Calculator
  const handleCalculateFranchiseYield = (e: React.FormEvent) => {
    e.preventDefault();
    const avgBookingValueBdt = 65000; // ~ $550 USD avg flight/hotel/visa ticket
    const totalGrossVolume = estimatedMonthlyBookings * avgBookingValueBdt;
    let commissionPct = 0.04;
    if (franchiseType === 'Master Franchise') commissionPct = 0.06;
    if (franchiseType === 'White Label SaaS') commissionPct = 0.08;

    const monthlyGrossCommission = totalGrossVolume * commissionPct;
    const partnerShare = monthlyGrossCommission * 0.7;
    const journeyExpertShare = monthlyGrossCommission * 0.3;

    setSimulatedRevenue({
      totalGrossVolumeBdt: totalGrossVolume,
      commissionPct: (commissionPct * 100).toFixed(1),
      partnerMonthlyEarningBdt: partnerShare,
      journeyExpertMonthlyRoyaltyBdt: journeyExpertShare,
      annualEarningUsd: (partnerShare * 12) / 120 // approx 120 BDT = 1 USD
    });
  };

  // Add Partner Pipeline Simulation
  const handleAddPartnerPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerAddedSuccess(true);
    setTimeout(() => {
      setPartnerAddedSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - INTERNATIONAL EXPANSION & GLOBAL PARTNERSHIPS */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • GLOBAL EXPANSION STRATEGY (PART 42)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Globe2 className="w-3 h-3 text-[#C8A14A]" />
                <span>GLOBAL AI OTA & EDUCATION ECOSYSTEM</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              International Expansion & Global Partnership Strategy
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Global Market Entry Framework across South Asia, Middle East, UK, Australia, Canada, USA & Europe. Unifying Airline NDC Directs, Wholesale Hotel Networks, DMCs, Universities, Master Franchises & White-Label B2B Tech.
            </p>
          </div>

          {/* Quick Global Metrics Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active Expansion Countries:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {expansionData?.metrics?.activeCountries || 18} Markets
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Global Direct Partnerships:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {expansionData?.metrics?.activePartnerships || 485}+ Partners
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Global Franchise & Agents:</span>
              <span className="text-amber-300 font-mono font-black text-xs">
                {expansionData?.metrics?.franchiseAgentsNetwork?.toLocaleString() || '1,240'} Agents
              </span>
            </div>

            <button
              onClick={fetchExpansionOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Global Expansion Telemetry</span>
            </button>
          </div>
        </div>

        {/* Global Strategy KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Regional HQs & Offices</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {expansionData?.metrics?.globalOfficesAndHubs || 12} Regional Hubs
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">White-Label Deployments</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">
              {expansionData?.metrics?.whiteLabelDeployments || 34} Live Portals
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">International YoY Growth</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">
              +{expansionData?.metrics?.internationalYoYGrowthPct || 185.4}%
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Primary Target Corridors</span>
            <strong className="text-white font-mono text-xs mt-0.5">BD-GCC-UK-CA-AU</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">System Status</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">GLOBAL NETWORK ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'roadmap'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Flag className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Country-by-Country Expansion Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('partnerships')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'partnerships'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Global Partner Alliances & Contracting</span>
        </button>

        <button
          onClick={() => setActiveTab('franchise-whitelabel')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'franchise-whitelabel'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Share2 className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Master Franchise & White-Label B2B Model</span>
        </button>

        <button
          onClick={() => setActiveTab('bd-crm')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'bd-crm'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Global BD CRM & Pipeline Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-intelligence')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-intelligence'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#C8A14A]" />
          <span>5. AI Market Intelligence & Risk Analysis</span>
        </button>
      </div>

      {/* TAB 1: COUNTRY-BY-COUNTRY EXPANSION ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Phased Global Execution
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Country-by-Country Market Entry & Regional Operations
              </h3>
            </div>

            {/* Phase Selector Tabs */}
            <div className="flex space-x-2 overflow-x-auto">
              {expansionData?.phases?.map((p: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPhaseIdx(idx);
                    if (p.markets.length > 0) setSelectedCountryCode(p.markets[0].code);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedPhaseIdx === idx
                      ? 'bg-[#081C15] text-white shadow-sm'
                      : 'bg-[#F8FAF9] text-[#666666] hover:bg-[#ECECEC]'
                  }`}
                >
                  {p.phase.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Phase Details */}
          {expansionData?.phases && (
            <div className="space-y-6">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#666666] font-bold uppercase block">
                    Current Execution Phase
                  </span>
                  <h4 className="text-base font-black text-[#081C15] font-serif">
                    {expansionData.phases[selectedPhaseIdx].phase}
                  </h4>
                </div>
                <span className="bg-[#0B5D3B] text-white font-mono font-bold text-[10px] px-3 py-1 rounded-full">
                  STATUS: {expansionData.phases[selectedPhaseIdx].status}
                </span>
              </div>

              {/* Grid of Target Country Markets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expansionData.phases[selectedPhaseIdx].markets.map((m: any, mIdx: number) => (
                  <div
                    key={mIdx}
                    onClick={() => setSelectedCountryCode(m.code)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      selectedCountryCode === m.code
                        ? 'border-[#0B5D3B] bg-[#F8FAF9] shadow-md ring-2 ring-[#0B5D3B]/20'
                        : 'border-[#ECECEC] bg-white hover:border-[#0B5D3B]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-black bg-[#081C15] text-[#C8A14A] px-2 py-0.5 rounded">
                          {m.code}
                        </span>
                        <strong className="text-base font-bold text-[#081C15] font-serif">{m.country}</strong>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#0B5D3B]">
                        Rev Share: {m.revenueShare}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#666666]">
                      <div className="flex justify-between">
                        <span className="font-bold text-[#081C15]">Office / Hub Role:</span>
                        <span className="font-medium text-[#111111]">{m.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-[#081C15]">Partner Network Count:</span>
                        <span className="font-mono font-bold text-[#0B5D3B]">{m.partners} Entities</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-[#081C15]">Regulatory Certification:</span>
                        <span className="font-mono text-[11px] text-amber-800 font-bold">{m.regulatoryStatus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GLOBAL PARTNER ALLIANCES & CONTRACTING */}
      {activeTab === 'partnerships' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                B2B Strategic Alliances
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                International Partners, Airline Direct NDC, Wholesale Hotels & Universities
              </h3>
            </div>

            <div className="flex space-x-2">
              {['ALL', 'Airlines', 'Hotels', 'Universities', 'DMC'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPartnerTypeFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    partnerTypeFilter === cat
                      ? 'bg-[#0B5D3B] text-white'
                      : 'bg-[#F8FAF9] text-[#666666] border border-[#ECECEC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Partner Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expansionData?.partnerCategories?.map((cat: any, pIdx: number) => (
              <div key={pIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                    <strong className="text-sm font-bold text-[#081C15] font-serif">{cat.type}</strong>
                    <span className="bg-[#0B5D3B] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {cat.count} Direct Contracts
                    </span>
                  </div>
                  <p className="text-xs text-[#666666] mt-3 leading-relaxed">
                    <strong className="text-[#081C15] block mb-1">Key Strategic Partners:</strong>
                    {cat.highlights}
                  </p>
                </div>

                <button className="w-full py-2 mt-4 bg-white border border-[#ECECEC] hover:border-[#0B5D3B] text-[#081C15] font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1">
                  <span>Manage Contract API Integrations</span>
                  <ChevronRight className="w-3 h-3 text-[#C8A14A]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MASTER FRANCHISE & WHITE-LABEL B2B MODEL */}
      {activeTab === 'franchise-whitelabel' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Monetization & B2B Expansion
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Master Franchise, Authorized Agent & White-Label Global Platform
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Franchise Calculator Form */}
            <form onSubmit={handleCalculateFranchiseYield} className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
              <h4 className="font-bold text-[#081C15] font-serif text-sm">Franchise & White-Label Yield Calculator</h4>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Partnership Partnership Model:</label>
                <select
                  value={franchiseType}
                  onChange={(e) => setFranchiseType(e.target.value as any)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-bold focus:outline-none"
                >
                  <option value="Master Franchise">Country Master Franchise (Full Territory Rights)</option>
                  <option value="Regional Authorized Agent">Regional Authorized Agent (City / District Desk)</option>
                  <option value="White Label SaaS">White-Label OTA Tech Portal (B2B Travel Agency)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Target Country / Territory:</label>
                <select
                  value={selectedTerritory}
                  onChange={(e) => setSelectedTerritory(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                >
                  <option value="United Kingdom (London & Birmingham)">United Kingdom (London & Birmingham)</option>
                  <option value="United Arab Emirates (Dubai & Abu Dhabi)">United Arab Emirates (Dubai & Abu Dhabi)</option>
                  <option value="Saudi Arabia (Riyadh & Jeddah)">Saudi Arabia (Riyadh & Jeddah)</option>
                  <option value="Canada (Toronto & Vancouver)">Canada (Toronto & Vancouver)</option>
                  <option value="Australia (Sydney & Melbourne)">Australia (Sydney & Melbourne)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">
                  Estimated Monthly Ticket & Visa Bookings ({estimatedMonthlyBookings} units):
                </label>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={estimatedMonthlyBookings}
                  onChange={(e) => setEstimatedMonthlyBookings(Number(e.target.value))}
                  className="w-full accent-[#0B5D3B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <DollarSign className="w-4 h-4 text-[#C8A14A]" />
                <span>Simulate Monthly Franchise Revenue & Royalty</span>
              </button>
            </form>

            {/* Simulation Results Box */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl border border-[#C8A14A]/40 space-y-4 shadow-xl flex flex-col justify-between font-mono">
              <div>
                <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                  <span className="text-[#C8A14A] font-serif text-sm font-bold flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-[#C8A14A]" />
                    <span>Franchise ROI Projection</span>
                  </span>
                  <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded">
                    {franchiseType}
                  </span>
                </div>

                {simulatedRevenue ? (
                  <div className="space-y-3 pt-3 text-xs">
                    <div className="bg-black/40 p-3 rounded-xl border border-emerald-800 space-y-1">
                      <span className="text-emerald-300 font-bold block">Gross Booking Volume (GBV):</span>
                      <strong className="text-white text-base block">
                        BDT {simulatedRevenue.totalGrossVolumeBdt.toLocaleString()} / mo
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-700">
                        <span className="text-emerald-300 block text-[10px] uppercase font-bold">Partner Net Earning</span>
                        <strong className="text-amber-300 font-bold text-sm">
                          BDT {simulatedRevenue.partnerMonthlyEarningBdt.toLocaleString()} / mo
                        </strong>
                      </div>

                      <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-700">
                        <span className="text-emerald-300 block text-[10px] uppercase font-bold">Journey Expert Tech Royalty</span>
                        <strong className="text-emerald-200 font-bold text-sm">
                          BDT {simulatedRevenue.journeyExpertMonthlyRoyaltyBdt.toLocaleString()} / mo
                        </strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-900 text-right">
                      <span className="text-emerald-300 font-bold text-xs">
                        Annualized USD Partner Yield: ~ ${Math.round(simulatedRevenue.annualEarningUsd).toLocaleString()} USD / year
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-emerald-400/60 font-sans text-xs">
                    Click "Simulate Monthly Franchise Revenue" to run model projections.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GLOBAL BD CRM & PIPELINE MANAGER */}
      {activeTab === 'bd-crm' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Business Development Operations
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Global Partnership Deal Pipeline & Contract Lifecycle
            </h3>
          </div>

          <form onSubmit={handleAddPartnerPipeline} className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
            <h4 className="font-bold text-[#081C15] font-serif text-sm">Register New Partner Lead to BD Pipeline</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Partner Entity Name:</label>
                <input
                  type="text"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Category:</label>
                <select
                  value={newPartnerCategory}
                  onChange={(e) => setNewPartnerCategory(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                >
                  <option value="Airline (NDC Direct)">Airline (NDC Direct)</option>
                  <option value="Wholesale Hotel Chain">Wholesale Hotel Chain</option>
                  <option value="Global University Alliance">Global University Alliance</option>
                  <option value="Destination Management (DMC)">Destination Management (DMC)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Territory / Region:</label>
                <input
                  type="text"
                  value={newPartnerTerritory}
                  onChange={(e) => setNewPartnerTerritory(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4 text-[#C8A14A]" />
              <span>Add Lead to Global BD CRM</span>
            </button>
          </form>

          {partnerAddedSuccess && (
            <div className="p-5 bg-emerald-950 text-white border border-emerald-500/40 rounded-2xl space-y-2 font-mono text-xs animate-fade-in">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C8A14A]" />
                <span>Partner Lead Registered Successfully!</span>
              </div>
              <p className="text-emerald-100">
                Entity: <strong className="text-white">{newPartnerName}</strong> • Territory: <strong className="text-white">{newPartnerTerritory}</strong>. Assigned to Global BD Director.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AI MARKET INTELLIGENCE & RISK ANALYSIS */}
      {activeTab === 'ai-intelligence' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Market Analysis
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              AI Market Expansion Intelligence & Risk Scoring Engine
            </h3>
          </div>

          <div className="space-y-4">
            {expansionData?.aiMarketIntelligence?.map((intel: any, iIdx: number) => (
              <div key={iIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#081C15] font-serif">{intel.opportunity}</strong>
                  <span className="bg-[#0B5D3B] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {intel.status} (AI Confidence: {intel.confidence})
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{intel.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
