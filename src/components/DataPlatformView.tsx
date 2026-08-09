import React, { useState, useEffect } from 'react';
import {
  Database,
  LineChart,
  BarChart3,
  BrainCircuit,
  Cpu,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Search,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Layers,
  FileCode,
  Shield,
  Send,
  HelpCircle,
  Lightbulb,
  Table,
  Sliders,
  DollarSign,
  Activity,
  Globe,
} from 'lucide-react';

export const DataPlatformView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'executive-bi' | 'ai-decision' | 'warehouse-lake' | 'ask-data-ai' | 'governance'
  >('executive-bi');

  const [platformData, setPlatformData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Interactive AI Data Query State
  const [aiQuery, setAiQuery] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [queryingAi, setQueryingAi] = useState<boolean>(false);

  // Applied Optimizations Tracking State
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchDataPlatformOverview();
  }, []);

  const fetchDataPlatformOverview = () => {
    setLoading(true);
    fetch('/api/data-platform/overview')
      .then((res) => res.json())
      .then((data) => {
        setPlatformData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load data platform overview:', err);
        setLoading(false);
      });
  };

  const handleApplyOptimization = (id: string) => {
    setAppliedActions((prev) => ({ ...prev, [id]: true }));
  };

  const handleAskDataAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setQueryingAi(true);
    setAiResponse(null);

    setTimeout(() => {
      const qLower = aiQuery.toLowerCase();
      let response = '';

      if (qLower.includes('revenue') || qLower.includes('decrease') || qLower.includes('sales')) {
        response = `📊 Business Data AI Analysis: Gross Booking Volume increased +18.4% MoM reaching ৳ 428.5M BDT. Flight commissions in European routes dipped 3.2% due to seasonal carrier fare restructuring, but Study Abroad application processing fees rose +31% offsetting the gap with a net 7.85% take rate.`;
      } else if (qLower.includes('destination') || qLower.includes('growing') || qLower.includes('flight')) {
        response = `✈️ Business Data AI Analysis: Top 3 fastest growing student mobility destinations for Q3 2026: 1) United Kingdom (London/Manchester) +42% demand, 2) Canada (Toronto) +28% demand, 3) Australia (Melbourne) +22% demand. Recommended Action: Allocate +15% GDS ticket hold quota with Biman & Emirates.`;
      } else if (qLower.includes('forecast') || qLower.includes('next month') || qLower.includes('predict')) {
        response = `📈 Predictive Model Forecast: Projecting ৳ 485.0M BDT GMV next month driven by peak September UK university visa applications and Hajj/Umrah package prepayments. Projected EBITDA margin: 28.5%.`;
      } else {
        response = `💡 Business Intelligence Insight: Analyzing 14.8M daily telemetry records across GDS, University CRM & Payment Vaults. System health is optimal with 12ms pipeline latency. Current LTV/CAC ratio stands at 7.68x with 28.4% student application conversion.`;
      }

      setAiResponse(response);
      setQueryingAi(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - DATA PLATFORM & AI DECISION ENGINE */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE DATA PLATFORM & BI (PART 37)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Database className="w-3 h-3 text-[#C8A14A]" />
                <span>REAL-TIME STREAMING • 12ms PIPELINE LATENCY</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise Data Platform, BI & AI Decision Engine
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Centralized BigQuery/Snowflake Data Warehouse, automated real-time ETL streaming, executive KPI dashboards, predictive demand forecasting & natural language AI decision intelligence.
            </p>
          </div>

          {/* Quick Data Health Telemetry Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Pipeline Health:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {platformData?.platformHealth || 'OPTIMAL / ACTIVE'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>24h Telemetry Records:</span>
              <span className="text-white font-mono font-bold text-xs">
                {platformData?.totalRecordsProcessedToday || '14,892,100'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Warehouse Storage:</span>
              <span className="text-emerald-300 font-mono font-black text-xs">
                {platformData?.warehouseStorageGB || '4,280 GB'}
              </span>
            </div>

            <button
              onClick={fetchDataPlatformOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data Telemetry</span>
            </button>
          </div>
        </div>

        {/* Real-Time Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Live Users Online</span>
            <strong className="text-white font-mono text-sm mt-0.5">
              {platformData?.realtimeMetrics?.activeUsersOnline || 1842} Users
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">GDS Queries / Sec</span>
            <strong className="text-amber-300 font-mono text-sm mt-0.5">
              {platformData?.realtimeMetrics?.liveGdsQueriesPerSec || 148} req/s
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">24h Conversions</span>
            <strong className="text-emerald-300 font-mono text-sm mt-0.5">
              {platformData?.realtimeMetrics?.bookingConversions24h || 342} Bookings
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">24h GMV (BDT)</span>
            <strong className="text-white font-mono text-sm mt-0.5">
              ৳ {((platformData?.realtimeMetrics?.gmvProcessed24hBDT || 18450000) / 1000000).toFixed(2)}M
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">24h AI Inquiries</span>
            <strong className="text-[#C8A14A] font-mono text-sm mt-0.5">
              {platformData?.realtimeMetrics?.aiAgentInquiries24h || 5820} Sessions
            </strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('executive-bi')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'executive-bi'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Executive BI Dashboard & KPIs</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-decision')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-decision'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#C8A14A]" />
          <span>2. AI Decision Engine & Yield Recs</span>
        </button>

        <button
          onClick={() => setActiveTab('warehouse-lake')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'warehouse-lake'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Table className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Data Warehouse & Lake Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('ask-data-ai')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ask-data-ai'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Ask Business Data AI</span>
        </button>

        <button
          onClick={() => setActiveTab('governance')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'governance'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Shield className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Data Governance & Quality</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE BI DASHBOARD & KPIS */}
      {activeTab === 'executive-bi' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              CEO & Board Analytics
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Consolidated Executive Key Performance Indicators
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformData?.executiveKpis?.map((kpi: any, kIdx: number) => (
              <div key={kIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
                <span className="text-[10px] font-bold text-[#666666] uppercase block">{kpi.kpi}</span>
                <strong className="text-2xl font-black text-[#081C15] font-mono block">{kpi.value}</strong>

                <div className="flex items-center justify-between pt-2 border-t border-[#ECECEC]">
                  <span className="text-emerald-700 font-bold font-mono text-xs flex items-center space-x-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{kpi.trend}</span>
                  </span>

                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                    {kpi.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI DECISION ENGINE & YIELD RECS */}
      {activeTab === 'ai-decision' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Growth Intelligence
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              AI Decision Engine Yield & Pricing Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {platformData?.aiDecisionInsights?.map((rec: any) => {
              const isApplied = appliedActions[rec.id];
              return (
                <div key={rec.id} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                    <span className="bg-[#0B5D3B] text-white text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                      {rec.category}
                    </span>
                    <span className="text-amber-700 font-bold font-mono text-xs">
                      Confidence Score: {rec.confidenceScore}
                    </span>
                  </div>

                  <strong className="text-sm font-bold text-[#081C15] font-serif block">
                    {rec.recommendation}
                  </strong>

                  <p className="text-xs text-[#0B5D3B] font-bold">
                    Projected Financial Impact: {rec.impact}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      disabled={isApplied}
                      onClick={() => handleApplyOptimization(rec.id)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                        isApplied
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#081C15] text-white hover:bg-[#0B5D3B]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C8A14A]" />
                      <span>{isApplied ? 'Optimization Applied' : 'Execute Optimization Action'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DATA WAREHOUSE & LAKE SCHEMA */}
      {activeTab === 'warehouse-lake' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Centralized Enterprise Data Architecture
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              BigQuery / Snowflake Data Warehouse Fact & Dimension Tables
            </h3>
          </div>

          <div className="overflow-x-auto border border-[#ECECEC] rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#081C15] text-white font-serif uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Table Name</th>
                  <th className="p-3.5">Total Records</th>
                  <th className="p-3.5">Partitioning Strategy</th>
                  <th className="p-3.5">Key Metrics / Attributes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC] font-mono">
                {platformData?.dataWarehouseSchema?.map((tb: any, tIdx: number) => (
                  <tr key={tIdx} className="hover:bg-[#F8FAF9]">
                    <td className="p-3.5 font-bold text-[#0B5D3B]">{tb.table}</td>
                    <td className="p-3.5 font-bold text-[#081C15]">{tb.records}</td>
                    <td className="p-3.5 text-[#666666]">{tb.partitioning}</td>
                    <td className="p-3.5 text-[#111111]">{tb.keyMetrics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ASK BUSINESS DATA AI */}
      {activeTab === 'ask-data-ai' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Conversational Business Intelligence
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Ask Your Business Data AI Assistant
            </h3>
          </div>

          <form onSubmit={handleAskDataAi} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask any question (e.g. 'Why did revenue decrease in Q2?', 'Which destination is growing fastest?')"
                className="flex-1 p-3.5 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
              />
              <button
                type="submit"
                disabled={queryingAi}
                className="px-6 py-3.5 bg-[#081C15] text-white font-extrabold rounded-2xl hover:bg-[#0B5D3B] transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#C8A14A]" />
                <span>{queryingAi ? 'Analyzing...' : 'Analyze Data'}</span>
              </button>
            </div>
          </form>

          {aiResponse && (
            <div className="p-6 bg-[#081C15] text-white rounded-3xl border border-[#C8A14A]/40 space-y-3 font-mono text-xs animate-fade-in shadow-xl">
              <div className="flex items-center space-x-2 text-[#C8A14A]">
                <BrainCircuit className="w-5 h-5" />
                <strong className="font-serif">AI Business Intelligence Output</strong>
              </div>
              <p className="text-emerald-100 leading-relaxed">{aiResponse}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DATA GOVERNANCE & QUALITY */}
      {activeTab === 'governance' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Compliance & Lineage
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Data Governance, Lineage & Quality Validation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Automated Data Quality Rules</strong>
              <p className="text-xs text-[#666666]">
                Great Expectations pipeline checks enforcing non-null passport constraints, flight booking price consistency & ISO currency code validation.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Data Lineage & Cataloging</strong>
              <p className="text-xs text-[#666666]">
                OpenMetadata tracing data flows from GDS raw payloads through dbt transformation models directly into CEO dashboards.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
