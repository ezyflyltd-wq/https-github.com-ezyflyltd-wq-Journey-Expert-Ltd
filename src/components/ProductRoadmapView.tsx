import React, { useState, useEffect } from 'react';
import {
  Map,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  Zap,
  Bot,
  Layers,
  Rocket,
  Globe2,
  Calendar,
  AlertTriangle,
  PieChart,
  Target,
  RefreshCw,
  Cpu,
  Smartphone,
  Building2,
  Briefcase,
  Sliders,
  Check,
} from 'lucide-react';

export const ProductRoadmapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'roadmap-phases' | 'kpi-simulator' | 'team-structure' | 'budget-risk'
  >('roadmap-phases');

  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // KPI Simulator Interactive State
  const [targetMonth, setTargetMonth] = useState<number>(12); // Month 1 to 36
  const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState<number>(1500000); // BDT

  useEffect(() => {
    fetchRoadmapData();
  }, []);

  const fetchRoadmapData = () => {
    setLoading(true);
    fetch('/api/roadmap/overview')
      .then((res) => res.json())
      .then((data) => {
        setRoadmapData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load roadmap data:', err);
        setLoading(false);
      });
  };

  // KPI Projection Math
  const projectedTraffic = Math.floor(50000 + targetMonth * 22000 + (monthlyMarketingSpend / 100));
  const projectedBookings = Math.floor(projectedTraffic * 0.042);
  const projectedRevenueBDT = Math.floor(projectedBookings * 12500); // 12.5k avg margin + booking volume
  const projectedAgents = Math.min(1200, Math.floor(50 + targetMonth * 32));
  const projectedAiSavingsBDT = Math.floor(targetMonth * 400000);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - PRODUCT ROADMAP & MVP EXECUTION */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • EXECUTIVE PRODUCT ROADMAP (PART 33)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Rocket className="w-3 h-3 text-[#C8A14A]" />
                <span>5 DEVELOPMENT PHASES • 36-MONTH GLOBAL SCALING PLAN</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Product Roadmap, MVP Strategy & Execution Blueprint
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Strategic execution model transforming Journey Expert into the premier AI-driven OTA, Education & B2B Travel Ecosystem across Bangladesh, Middle East, UK & North America.
            </p>
          </div>

          {/* Quick Execution Status Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Phase 1 Foundation MVP:</span>
              <span className="text-emerald-300 font-mono font-black text-xs">100% COMPLETE</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Phase 2 OTA Expansion:</span>
              <span className="text-[#C8A14A] font-mono font-bold text-xs">65% IN PROGRESS</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>36-Month Target GMV:</span>
              <span className="text-white font-mono font-black text-sm">$25,000,000 USD</span>
            </div>

            <button
              onClick={fetchRoadmapData}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Roadmap Telemetry</span>
            </button>
          </div>
        </div>

        {/* Global Timeline Progress Bar */}
        <div className="pt-4 border-t border-emerald-900/80 space-y-2">
          <div className="flex justify-between text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider">
            <span>Phase 1: MVP (0–3m)</span>
            <span>Phase 2: OTA (3–6m)</span>
            <span>Phase 3: AI (6–12m)</span>
            <span>Phase 4: Enterprise (12–18m)</span>
            <span>Phase 5: Global (18–36m)</span>
          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex border border-white/20">
            <div className="h-full bg-emerald-500 w-[20%]" title="Phase 1: 100%"></div>
            <div className="h-full bg-[#C8A14A] w-[13%]" title="Phase 2: 65%"></div>
            <div className="h-full bg-white/20 w-[67%]" title="Future Phases"></div>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('roadmap-phases')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'roadmap-phases'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Map className="w-4 h-4 text-[#C8A14A]" />
          <span>1. 5-Phase Development Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('kpi-simulator')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'kpi-simulator'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Live Growth & KPI Projection Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('team-structure')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'team-structure'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Team Structure & Talent Allocation</span>
        </button>

        <button
          onClick={() => setActiveTab('budget-risk')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'budget-risk'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <PieChart className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Capital Budget & Risk Mitigation</span>
        </button>
      </div>

      {/* TAB 1: 5-PHASE DEVELOPMENT ROADMAP */}
      {activeTab === 'roadmap-phases' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              36-Month Scalability Master Plan
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Phased Implementation & Key Deliverable Milestones
            </h3>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-[#F8FAF9] border-2 border-emerald-600/40 p-6 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#ECECEC] pb-3">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B5D3B] text-white font-black flex items-center justify-center text-sm">
                    1
                  </span>
                  <div>
                    <h4 className="text-base font-black text-[#081C15] font-serif">Phase 1 — Foundation MVP (0–3 Months)</h4>
                    <span className="text-xs text-[#666666]">Core Digital Platform Launch & Lead Acquisition</span>
                  </div>
                </div>

                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                  STATUS: 100% LIVE & DEPLOYED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <strong className="text-xs font-bold text-[#0B5D3B] uppercase block">Core Deliverables Built:</strong>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Corporate Web Portal & Flight/Hotel Search Interface</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Amadeus & Sabre Direct GDS API Integration</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Angela AI 24/7 Digital Booking Concierge</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>SSLCommerz, bKash, Nagad & Stripe Payment Gateways</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-2 font-mono">
                  <strong className="text-[10px] font-bold text-[#666666] uppercase block">Phase 1 Target KPIs:</strong>
                  <div className="flex justify-between">
                    <span>Monthly Visitors:</span>
                    <strong className="text-[#0B5D3B]">150,000+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking Conversion:</span>
                    <strong className="text-[#081C15]">3.8%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Revenue BDT:</span>
                    <strong className="text-[#081C15]">৳25,000,000 BDT</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#F8FAF9] border-2 border-[#C8A14A] p-6 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#ECECEC] pb-3">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-full bg-[#C8A14A] text-[#081C15] font-black flex items-center justify-center text-sm">
                    2
                  </span>
                  <div>
                    <h4 className="text-base font-black text-[#081C15] font-serif">Phase 2 — OTA Platform Expansion (3–6 Months)</h4>
                    <span className="text-xs text-[#666666]">B2B Agent Portal, Mobile App & Wallet System</span>
                  </div>
                </div>

                <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300">
                  STATUS: 65% IN PROGRESS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <strong className="text-xs font-bold text-[#0B5D3B] uppercase block">Deliverables Underway:</strong>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>B2B Sub-Agent Portal with Commission & Top-Up Wallet</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>iOS & Android Native App Release</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#081C15]">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Dynamic Holiday Package Marketplace & Insurance</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-2 font-mono">
                  <strong className="text-[10px] font-bold text-[#666666] uppercase block">Phase 2 Target KPIs:</strong>
                  <div className="flex justify-between">
                    <span>Active B2B Sub-Agents:</span>
                    <strong className="text-[#0B5D3B]">450+ Partners</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile App Downloads:</span>
                    <strong className="text-[#081C15]">50,000+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly GMV BDT:</span>
                    <strong className="text-[#081C15]">৳75,000,000 BDT</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3, 4, 5 Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <strong className="text-sm font-bold text-[#081C15] font-serif block">Phase 3: AI Ecosystem (6–12m)</strong>
                <p className="text-xs text-[#666666]">
                  13 Gemini Multi-Agents, Voice AI Support, RAG Knowledge Vault & Cross-Departmental Automations.
                </p>
                <div className="font-mono text-[10px] text-[#0B5D3B] font-bold">Target: 95% Auto-Resolution</div>
              </div>

              <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <strong className="text-sm font-bold text-[#081C15] font-serif block">Phase 4: Enterprise SaaS (12–18m)</strong>
                <p className="text-xs text-[#666666]">
                  Corporate Expense Management, White-Label OTA Partner API & Data Warehouse.
                </p>
                <div className="font-mono text-[10px] text-[#0B5D3B] font-bold">Target: 120+ Corporate Clients</div>
              </div>

              <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <strong className="text-sm font-bold text-[#081C15] font-serif block">Phase 5: Global Expansion (18–36m)</strong>
                <p className="text-xs text-[#666666]">
                  Middle East, UK & US DMC Operations, Hajj/Umrah Global Hub & Craft Bangla Export.
                </p>
                <div className="font-mono text-[10px] text-[#0B5D3B] font-bold">Target: $25M USD Annual GMV</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE GROWTH & KPI PROJECTION SIMULATOR */}
      {activeTab === 'kpi-simulator' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Interactive Financial & Unit Economics Modeler
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Growth Trajectory & ROI Forecast Simulator
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <Sliders className="w-5 h-5 text-[#C8A14A]" />
                <strong className="font-serif font-black text-sm text-[#C8A14A]">
                  Simulation Input Parameters
                </strong>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-emerald-200 mb-1">
                    <span>Projected Timeline Month:</span>
                    <strong className="text-[#C8A14A]">Month {targetMonth}</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={36}
                    value={targetMonth}
                    onChange={(e) => setTargetMonth(parseInt(e.target.value))}
                    className="w-full accent-[#C8A14A]"
                  />
                  <div className="flex justify-between text-[10px] text-white/60 font-mono mt-1">
                    <span>Month 1 (Launch)</span>
                    <span>Month 12 (Year 1)</span>
                    <span>Month 36 (Year 3)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-emerald-200 mb-1">
                    <span>Monthly Digital Marketing Spend (BDT):</span>
                    <strong className="text-[#C8A14A]">৳{(monthlyMarketingSpend / 100000).toFixed(1)} Lakhs</strong>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={5000000}
                    step={250000}
                    value={monthlyMarketingSpend}
                    onChange={(e) => setMonthlyMarketingSpend(parseInt(e.target.value))}
                    className="w-full accent-[#C8A14A]"
                  />
                </div>
              </div>
            </div>

            {/* Projected Output */}
            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-4">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                Projected Unit Metrics at Month {targetMonth}
              </strong>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Monthly Web/App Traffic</span>
                  <span className="text-lg font-black text-[#081C15] font-mono">
                    {projectedTraffic.toLocaleString()}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Monthly Total Bookings</span>
                  <span className="text-lg font-black text-[#0B5D3B] font-mono">
                    {projectedBookings.toLocaleString()}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Projected Monthly Revenue</span>
                  <span className="text-lg font-black text-[#081C15] font-mono">
                    ৳{(projectedRevenueBDT / 1000000).toFixed(2)}M BDT
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">B2B Agent Network</span>
                  <span className="text-lg font-black text-amber-700 font-mono">
                    {projectedAgents} Sub-Agents
                  </span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <strong className="font-bold block">AI Agent Cost Efficiency Factor:</strong>
                <p>
                  At Month {targetMonth}, autonomous AI workforce reduces manual operational headcount expenses by approx{' '}
                  <strong className="text-[#0B5D3B] font-mono">৳{(projectedAiSavingsBDT / 100000).toFixed(1)} Lakhs BDT/month</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEAM STRUCTURE & TALENT ALLOCATION */}
      {activeTab === 'team-structure' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Organizational Blueprint
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Engineering, AI & Product Leadership Roster
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapData?.teamComposition?.map((team: any, tIdx: number) => (
              <div key={tIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <strong className="text-xs font-bold text-[#081C15] font-serif">{team.role}</strong>
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                    {team.count} Headcount
                  </span>
                </div>
                <p className="text-xs text-[#666666]">
                  Primary Focus: <span className="font-bold text-[#081C15]">{team.focus}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CAPITAL BUDGET & RISK MITIGATION */}
      {activeTab === 'budget-risk' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Financial Capital Allocation & Governance
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Seed/Series-A Budget Breakdown & Risk Protection
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-4">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                Capital Investment Allocation
              </strong>

              <ul className="space-y-3">
                <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#ECECEC]">
                  <span className="font-bold text-[#081C15]">Technology R&D & AI Infrastructure</span>
                  <span className="font-mono font-black text-[#0B5D3B]">40%</span>
                </li>
                <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#ECECEC]">
                  <span className="font-bold text-[#081C15]">Digital Marketing & Customer Acquisition</span>
                  <span className="font-mono font-black text-[#0B5D3B]">30%</span>
                </li>
                <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#ECECEC]">
                  <span className="font-bold text-[#081C15]">Agent Network & Onboarding Operations</span>
                  <span className="font-mono font-black text-[#0B5D3B]">15%</span>
                </li>
                <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#ECECEC]">
                  <span className="font-bold text-[#081C15]">Legal Compliance & Security Audits</span>
                  <span className="font-mono font-black text-[#0B5D3B]">10%</span>
                </li>
                <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#ECECEC]">
                  <span className="font-bold text-[#081C15]">Working Capital Emergency Reserve</span>
                  <span className="font-mono font-black text-[#0B5D3B]">5%</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-4">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                Enterprise Risk Mitigation Matrix
              </strong>

              <div className="space-y-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#ECECEC] space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-[#081C15]">GDS Downtime / API Latency</strong>
                    <span className="text-emerald-700 font-bold text-[10px]">Mitigated</span>
                  </div>
                  <p className="text-[#666666]">Fallback cache & multi-provider routing (Sabre + Amadeus + Duffel NDC).</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#ECECEC] space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-[#081C15]">Payment Chargebacks & Fraud</strong>
                    <span className="text-emerald-700 font-bold text-[10px]">Mitigated</span>
                  </div>
                  <p className="text-[#666666]">2FA OTP verification, SSLCommerz 3D-Secure & AI Fraud Velocity Scoring.</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#ECECEC] space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-[#081C15]">Foreign Exchange Volatility</strong>
                    <span className="text-emerald-700 font-bold text-[10px]">Mitigated</span>
                  </div>
                  <p className="text-[#666666]">Real-time USD/BDT rate hedging and automated fare locks via ERP.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
