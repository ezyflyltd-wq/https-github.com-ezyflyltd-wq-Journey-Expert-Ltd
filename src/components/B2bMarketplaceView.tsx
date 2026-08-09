import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Globe,
  Building2,
  Key,
  Calculator,
  BrainCircuit,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Plus,
  Layers,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layout,
  Code2,
  Copy,
  ExternalLink,
  Users,
  Wallet,
  ArrowRight,
  Sliders,
  Award,
} from 'lucide-react';

export const B2bMarketplaceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'agent-portal' | 'white-label' | 'commission-calc' | 'api-reseller' | 'ai-partner'
  >('agent-portal');

  const [b2bData, setB2bData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // White Label Deployment Generator State
  const [wlPartnerName, setWlPartnerName] = useState<string>('Sylhet Global Travels');
  const [wlDomain, setWlDomain] = useState<string>('fly.sylhetglobal.com');
  const [wlMarkupFlightPct, setWlMarkupFlightPct] = useState<number>(5.5);
  const [wlMarkupHotelPct, setWlMarkupHotelPct] = useState<number>(8.0);
  const [wlDeploying, setWlDeploying] = useState<boolean>(false);
  const [wlDeploySuccess, setWlDeploySuccess] = useState<boolean>(false);

  // Interactive Live Commission Calculator State
  const [baseFareBDT, setBaseFareBDT] = useState<number>(95000);
  const [carrierCommissionPct, setCarrierCommissionPct] = useState<number>(7.0);
  const [agentCustomMarkupBDT, setAgentCustomMarkupBDT] = useState<number>(2500);

  useEffect(() => {
    fetchB2bOverview();
  }, []);

  const fetchB2bOverview = () => {
    setLoading(true);
    fetch('/api/b2b-marketplace/overview')
      .then((res) => res.json())
      .then((data) => {
        setB2bData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load B2B marketplace data:', err);
        setLoading(false);
      });
  };

  const handleDeployWhiteLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wlPartnerName || !wlDomain) return;

    setWlDeploying(true);
    setWlDeploySuccess(false);

    setTimeout(() => {
      setWlDeploying(false);
      setWlDeploySuccess(true);
    }, 1200);
  };

  // Commission Math Calculations
  const grossCommissionBDT = Math.round((baseFareBDT * carrierCommissionPct) / 100);
  const journeyExpertFeeBDT = Math.round(grossCommissionBDT * 0.15); // 15% platform split
  const netAgentCommissionBDT = grossCommissionBDT - journeyExpertFeeBDT;
  const totalAgentNetProfitBDT = netAgentCommissionBDT + agentCustomMarkupBDT;
  const finalCustomerPriceBDT = baseFareBDT + agentCustomMarkupBDT;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - B2B TRAVEL MARKETPLACE & WHITE LABEL OTA */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • B2B MARKETPLACE & WHITE LABEL OTA (PART 39)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Globe className="w-3 h-3 text-[#C8A14A]" />
                <span>GLOBAL TRAVEL DISTRIBUTION NETWORK • WHOLESALE & RESELLER API</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              B2B Travel Marketplace & White Label OTA SaaS Platform
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Empowering 14,800+ travel agencies, sub-agents, corporate desks & white-label partners with wholesale GDS net rates, automated commission calculation engines, prepaid/credit wallets & Journey Partner AI.
            </p>
          </div>

          {/* Telemetry Quick Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Verified Agencies:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {b2bData?.networkMetrics?.totalVerifiedAgents?.toLocaleString() || '14,820'} Agents
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>White Label Sites Live:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {b2bData?.networkMetrics?.whiteLabelActiveSites || 284} Sites
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>API Reseller Accounts:</span>
              <span className="text-white font-mono font-black text-xs">
                {b2bData?.networkMetrics?.apiResellersActive || 142} Partners
              </span>
            </div>

            <button
              onClick={fetchB2bOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh B2B Telemetry</span>
            </button>
          </div>
        </div>

        {/* Network Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Total B2B GMV (BDT)</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {b2bData?.networkMetrics?.totalB2bVolumeProcessedBDT || '৳ 3.24B BDT'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Sub-Agent Network</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">
              {b2bData?.networkMetrics?.subAgentBranches?.toLocaleString() || '48,500'} Branches
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">White Label Sites</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">284 Custom Domains</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">API Resellers</span>
            <strong className="text-white font-mono text-xs mt-0.5">142 REST/GraphQL</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Platform Status</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">GLOBAL DISTRIBUTION ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('agent-portal')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'agent-portal'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>1. B2B Agent Portal & Tier Hierarchy</span>
        </button>

        <button
          onClick={() => setActiveTab('white-label')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'white-label'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layout className="w-4 h-4 text-[#C8A14A]" />
          <span>2. White Label OTA SaaS Deployer</span>
        </button>

        <button
          onClick={() => setActiveTab('commission-calc')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'commission-calc'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Calculator className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Real-Time Commission & Yield Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('api-reseller')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'api-reseller'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Code2 className="w-4 h-4 text-[#C8A14A]" />
          <span>4. B2B Partner API Platform</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-partner')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-partner'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Journey Partner AI Assistant</span>
        </button>
      </div>

      {/* TAB 1: B2B AGENT PORTAL & TIER HIERARCHY */}
      {activeTab === 'agent-portal' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Agency Distribution Tiers
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Wholesale Agent Tiers, Credit Limits & Sub-Agent Hierarchy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2bData?.b2bTiers?.map((tr: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="bg-[#0B5D3B] text-white font-serif text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {tr.tier}
                  </span>
                  <Award className="w-4 h-4 text-[#C8A14A]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#666666] uppercase block">Min Monthly GMV:</span>
                  <strong className="text-base font-black text-[#081C15] font-mono block">{tr.minVolumeMonthlyBDT}</strong>
                </div>

                <div className="pt-2 border-t border-[#ECECEC] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Commission Override:</span>
                    <strong className="text-emerald-700 font-mono font-bold">{tr.commissionOverride}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#666666]">Credit Threshold:</span>
                    <strong className="text-amber-700 font-mono font-bold">{tr.creditLimitBDT}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#666666]">White Label OTA:</span>
                    <strong className="text-emerald-800 font-bold">{tr.whiteLabelIncluded ? 'Included FREE' : 'Add-on Option'}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: WHITE LABEL OTA SAAS DEPLOYER */}
      {activeTab === 'white-label' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Partner SaaS Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Deploy Custom Branded White Label OTA Instance
            </h3>
          </div>

          <form onSubmit={handleDeployWhiteLabel} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Partner / Agency Brand Name:</label>
                <input
                  type="text"
                  value={wlPartnerName}
                  onChange={(e) => setWlPartnerName(e.target.value)}
                  className="w-full p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Mapped Custom Domain:</label>
                <input
                  type="text"
                  value={wlDomain}
                  onChange={(e) => setWlDomain(e.target.value)}
                  className="w-full p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Flight Default Markup (%):</label>
                <input
                  type="number"
                  step="0.5"
                  value={wlMarkupFlightPct}
                  onChange={(e) => setWlMarkupFlightPct(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Hotel Default Markup (%):</label>
                <input
                  type="number"
                  step="0.5"
                  value={wlMarkupHotelPct}
                  onChange={(e) => setWlMarkupHotelPct(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={wlDeploying}
              className="px-6 py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center space-x-2"
            >
              <Layout className="w-4 h-4 text-[#C8A14A]" />
              <span>{wlDeploying ? 'Provisioning White Label Site...' : 'Provision White Label Instance'}</span>
            </button>
          </form>

          {wlDeploySuccess && (
            <div className="p-5 bg-emerald-950 text-white border border-emerald-500/40 rounded-2xl space-y-2 font-mono text-xs animate-fade-in">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C8A14A]" />
                <span>White Label OTA Site Successfully Provisioned!</span>
              </div>
              <p className="text-emerald-100">
                Custom Domain: <strong className="text-white underline">{wlDomain}</strong> • CNAME records routed to SSL Edge Gateway. Flight Markup: +{wlMarkupFlightPct}% • Hotel Markup: +{wlMarkupHotelPct}%.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-[#ECECEC]">
            <h4 className="font-bold text-[#081C15] mb-3 text-xs">Active White Label Deployments</h4>
            <div className="space-y-3">
              {b2bData?.whiteLabelDeployments?.map((wl: any, wIdx: number) => (
                <div key={wIdx} className="bg-[#F8FAF9] border border-[#ECECEC] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-bold text-[#081C15] block">{wl.partnerName}</strong>
                    <span className="text-xs text-[#0B5D3B] font-mono">{wl.customDomain}</span>
                  </div>

                  <div className="text-right">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full block">
                      {wl.status}
                    </span>
                    <span className="text-[10px] text-[#666666] mt-1 block">{wl.activeBookingsMonth} Bookings/Mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME COMMISSION & YIELD CALCULATOR */}
      {activeTab === 'commission-calc' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Margin & Commission Simulator
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Live Interactive Agent Net Profit & Markup Calculator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
              <h4 className="font-bold text-[#081C15] font-serif text-sm">Booking Fare Parameters</h4>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Carrier Base Fare (BDT):</label>
                <input
                  type="number"
                  step="1000"
                  value={baseFareBDT}
                  onChange={(e) => setBaseFareBDT(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Airline Commission (%):</label>
                <input
                  type="number"
                  step="0.5"
                  value={carrierCommissionPct}
                  onChange={(e) => setCarrierCommissionPct(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Agent Custom Markup (BDT):</label>
                <input
                  type="number"
                  step="500"
                  value={agentCustomMarkupBDT}
                  onChange={(e) => setAgentCustomMarkupBDT(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>
            </div>

            {/* Calculated Results Card */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl border border-[#C8A14A]/40 space-y-4 shadow-xl flex flex-col justify-between font-mono">
              <div>
                <span className="text-[#C8A14A] font-serif text-sm font-bold block mb-3">Profit & Revenue Breakdown</span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Carrier Gross Commission:</span>
                    <strong className="text-white">৳ {grossCommissionBDT.toLocaleString()} BDT</strong>
                  </div>

                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Journey Expert Platform Fee (15%):</span>
                    <strong className="text-amber-300">- ৳ {journeyExpertFeeBDT.toLocaleString()} BDT</strong>
                  </div>

                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Agent Net Base Commission:</span>
                    <strong className="text-emerald-200">৳ {netAgentCommissionBDT.toLocaleString()} BDT</strong>
                  </div>

                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Agent Custom Added Markup:</span>
                    <strong className="text-emerald-200">+ ৳ {agentCustomMarkupBDT.toLocaleString()} BDT</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C8A14A]/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white uppercase font-sans">Total Agent Net Profit:</span>
                  <strong className="text-2xl font-black text-[#C8A14A]">৳ {totalAgentNetProfitBDT.toLocaleString()} BDT</strong>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-emerald-300">Final Selling Price to End Customer:</span>
                  <strong className="text-white">৳ {finalCustomerPriceBDT.toLocaleString()} BDT</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: B2B PARTNER API PLATFORM */}
      {activeTab === 'api-reseller' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Developer Integration Sandbox
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              B2B Partner REST & GraphQL Reseller API Gateway
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-5 rounded-2xl border border-emerald-900 font-mono space-y-3">
            <div className="flex items-center justify-between text-emerald-300 text-xs">
              <span>GET /api/v1/b2b/flights/search</span>
              <span className="bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded text-[10px]">HTTP 200 OK</span>
            </div>
            <pre className="text-[11px] text-emerald-100 overflow-x-auto bg-black/40 p-3 rounded-xl">
              {`{\n  "status": "SUCCESS",\n  "partner_id": "PARTNER-B2B-98402",\n  "search_params": {\n    "origin": "DAC",\n    "destination": "LHR",\n    "depart_date": "2026-09-15"\n  },\n  "flights": [\n    {\n      "flight_number": "BG-201",\n      "carrier": "Biman Bangladesh Airlines",\n      "base_fare_bdt": 85000,\n      "wholesaler_net_rate_bdt": 79050,\n      "seat_availability": 14\n    }\n  ]\n}`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 5: JOURNEY PARTNER AI ASSISTANT */}
      {activeTab === 'ai-partner' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Agency Intelligence
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey Partner AI Assistant & Yield Advisor
            </h3>
          </div>

          <div className="space-y-4">
            {b2bData?.aiPartnerAssistantInsights?.map((ins: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                    {ins.topic}
                  </span>
                  <span className="text-emerald-700 font-bold font-mono text-xs">
                    Impact: {ins.projectedProfitAddBDT}
                  </span>
                </div>

                <p className="text-sm font-bold text-[#081C15] font-serif">{ins.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
