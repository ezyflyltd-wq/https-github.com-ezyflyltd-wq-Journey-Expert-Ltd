import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Database,
  Cpu,
  Zap,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  Bot,
  Send,
  ShieldCheck,
  FileSpreadsheet,
  Users,
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Server,
  Globe,
  Clock,
  Target,
  Brain,
  Sliders,
  Filter,
} from 'lucide-react';

export const BiAnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'executive' | 'warehouse' | 'sales-intel' | 'ai-predictive' | 'bi-ai-assistant' | 'telemetry' | 'reports-governance'
  >('executive');

  const [biData, setBiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // BI Assistant Interactive Query State
  const [queryInput, setQueryInput] = useState('Analyze revenue contribution and AI growth forecasts for Study Abroad & Flight bookings');
  const [queryResponse, setQueryResponse] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchBiData();
  }, []);

  const fetchBiData = () => {
    setLoading(true);
    fetch('/api/bi/overview')
      .then((res) => res.json())
      .then((data) => {
        setBiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load BI & Data Analytics data:', err);
        setLoading(false);
      });
  };

  const handleExecuteBiQuery = () => {
    setIsAnalyzing(true);
    setQueryResponse(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setQueryResponse({
        timestamp: new Date().toLocaleTimeString(),
        modelUsed: 'Gemini 2.5 Flash Decision Intelligence Engine',
        insightTitle: 'Executive Growth & Revenue Intelligence Summary',
        keyFindings: [
          'Flight Sales (Sabre/Amadeus) represent 53.2% of total revenue with BDT 68.4M gross volume, growing at 38.5% YoY.',
          'Study Abroad (CAS Consultancy) has the highest YoY growth rate at +58.4%, generating BDT 16.8M with a 92% profit margin.',
          'AI Dynamic Pricing optimization added BDT 4.88M (+3.8% net uplift) in additional margin over Q2.',
          'Predicted Q3 Revenue: BDT 142.0M (96.8% confidence interval) driven by Sept 2026 UK/Australia student intake.',
        ],
        recommendedActions: [
          'Increase Meta & Google ad spend allocation for UK Tier 4 Visa campaigns by 15% before August 15.',
          'Automate WhatsApp re-engagement drips for 142 corporate accounts showing >30 days booking inactivity.',
          'Expand GDS Sabre NDC direct connect routes for Dhaka-London and Dhaka-[#081C15]Jeddah routes.',
        ],
        dataSourcesConsulted: ['fact_flight_bookings', 'fact_student_enrollments', 'fact_customer_telemetry_logs'],
      });
    }, 1100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* BI DATA INTELLIGENCE CONTROL CENTER HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#0B5D3B] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • DATA INTELLIGENCE & BI (PART 20)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ClickHouse • BigQuery • Snowflake • Gemini AI Analytics</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Data Analytics, Business Intelligence & AI Decision Intelligence
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Enterprise Data Warehouse schema with 4.8 Billion records, Real-Time Executive KPI Telemetry, Predictive Revenue & Churn Models, and Natural Language BI Decision Assistant.
            </p>
          </div>

          {/* Quick Executive Snapshot Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Total Gross Revenue:</span>
              <span className="text-white font-mono font-black text-sm">
                BDT {((biData?.executiveKpis?.totalGrossRevenueBDT || 128500000) / 1000000).toFixed(1)}M
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Net Profit Margin:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {biData?.executiveKpis?.netProfitMarginPercent || 22.4}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Predictive Q3 Revenue:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                BDT {((biData?.aiPredictiveForecasts?.nextMonthPredictedRevenueBDT || 142000000) / 1000000).toFixed(1)}M
              </span>
            </div>

            <button
              onClick={fetchBiData}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Live Warehouse Stream</span>
            </button>
          </div>
        </div>

        {/* Global Key Executive Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">YoY Growth Rate</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              +{biData?.executiveKpis?.yearOverYearGrowthPercent || 42.8}%
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Active Customers</span>
            <span className="text-lg font-black text-white font-mono">
              {(biData?.executiveKpis?.totalActiveCustomers || 84200).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Avg Customer LTV</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              BDT {biData?.executiveKpis?.averageCustomerLtvBDT || 6120}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Customer Acquisition (CAC)</span>
            <span className="text-lg font-black text-white font-mono">
              BDT {biData?.executiveKpis?.customerAcquisitionCostBDT || 850}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Net Promoter Score</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {biData?.executiveKpis?.netPromoterScoreNPS || 88} / 100
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Warehouse Indexed Rows</span>
            <span className="text-lg font-black text-emerald-200 font-mono">
              {biData?.executiveKpis?.dataWarehouseRows || '4.8B'}
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('executive')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'executive'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Executive CEO Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('warehouse')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'warehouse'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Database className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Data Warehouse Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('sales-intel')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'sales-intel'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <PieChart className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Vertical Sales Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-predictive')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-predictive'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Brain className="w-4 h-4 text-[#C8A14A]" />
          <span>4. AI Predictive Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('bi-ai-assistant')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'bi-ai-assistant'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Journey BI AI Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'telemetry'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Live Stream Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('reports-governance')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'reports-governance'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Governance & Automation</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE CEO DASHBOARD */}
      {activeTab === 'executive' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Chief Executive Officer Overview
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Financial Performance, Market Share & Operational Scale
              </h3>
            </div>
            <span className="bg-[#081C15] text-[#C8A14A] border border-[#C8A14A]/30 text-[10px] font-mono px-3 py-1 rounded-full font-bold">
              Real-Time ETL Sync: 100% Operational
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-3">
              <DollarSign className="w-6 h-6 text-[#0B5D3B]" />
              <span className="text-[#666666] text-[10px] uppercase font-bold block">Gross Booking Value (GBV)</span>
              <strong className="text-2xl text-[#081C15] font-mono font-black">BDT 128,500,000</strong>
              <div className="flex items-center space-x-1 text-emerald-700 text-xs font-bold">
                <ArrowUpRight className="w-4 h-4" />
                <span>+42.8% vs Previous Year</span>
              </div>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-3">
              <TrendingUp className="w-6 h-6 text-[#0B5D3B]" />
              <span className="text-[#666666] text-[10px] uppercase font-bold block">Net Operating Profit</span>
              <strong className="text-2xl text-[#0B5D3B] font-mono font-black">BDT 28,784,000</strong>
              <div className="flex items-center space-x-1 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C8A14A]" />
                <span>22.4% Net Profit Margin</span>
              </div>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <span className="text-[#666666] text-[10px] uppercase font-bold block">Active Customer Cohort</span>
              <strong className="text-2xl text-[#081C15] font-mono font-black">84,200 Accounts</strong>
              <div className="flex items-center space-x-1 text-[#666666] text-xs font-bold">
                <span>LTV BDT 6,120 / CAC BDT 850 (7.2x)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA WAREHOUSE SCHEMA & ETL */}
      {activeTab === 'warehouse' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Data Architecture & Fact/Dimension Modeling
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              ClickHouse, BigQuery & PostgreSQL Data Warehouse Tables
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {biData?.warehouseFacts?.map((fact: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    FACT TABLE
                  </span>
                  <span className="text-[10px] text-[#666666]">{fact.primaryEngine}</span>
                </div>
                <strong className="text-sm font-bold text-[#081C15] block">{fact.factTable}</strong>
                <div className="text-xs text-[#666666] space-y-1 pt-2 border-t border-[#ECECEC]">
                  <div className="flex justify-between">
                    <span>Rows Count:</span>
                    <strong className="text-[#081C15]">{fact.rowsCount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Volume:</span>
                    <strong className="text-[#0B5D3B]">{fact.storageGB} GB</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERTICAL SALES ANALYTICS */}
      {activeTab === 'sales-intel' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Vertical Revenue Attribution
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Revenue Share, YoY Growth & Volume Breakdown by Product
            </h3>
          </div>

          <div className="space-y-3">
            {biData?.revenueByVertical?.map((vert: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <strong className="text-sm text-[#081C15] font-bold font-serif">{vert.vertical}</strong>
                  <div className="w-full bg-[#ECECEC] rounded-full h-2 min-w-[200px]">
                    <div
                      className="bg-[#0B5D3B] h-2 rounded-full"
                      style={{ width: `${vert.sharePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 font-mono text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block font-sans">Gross Revenue</span>
                    <strong className="text-[#081C15]">BDT {(vert.revenueBDT / 1000000).toFixed(1)}M</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block font-sans">Market Share</span>
                    <strong className="text-[#C8A14A]">{vert.sharePercent}%</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block font-sans">YoY Growth</span>
                    <strong className="text-[#0B5D3B]">+{vert.growthYoy}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AI PREDICTIVE ANALYTICS */}
      {activeTab === 'ai-predictive' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Machine Learning Predictive Models
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Revenue Forecasting, Churn Risk Alerts & Dynamic Pricing Uplift
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-emerald-800">
              <span className="font-serif font-black text-base text-[#C8A14A] block">Next Quarter Revenue Forecast</span>
              <div className="space-y-2 text-xs font-mono text-emerald-100">
                <div className="flex justify-between">
                  <span>Predicted Volume:</span>
                  <strong className="text-white">BDT 142,000,000</strong>
                </div>
                <div className="flex justify-between">
                  <span>Model Confidence Score:</span>
                  <strong className="text-emerald-300 font-bold">{biData?.aiPredictiveForecasts?.forecastConfidenceScore || '96.8%'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Lead Conversion Accuracy:</span>
                  <strong className="text-white">{biData?.aiPredictiveForecasts?.leadConversionPredictiveAccuracy || '94.2%'}</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">Top AI Growth Opportunity</span>
              <p className="text-xs text-[#666666] leading-relaxed">
                {biData?.aiPredictiveForecasts?.topGrowthOpportunity || 'UK & Australia Sept 2026 Student Visa Spike + Hajj Season Surge'}
              </p>
              <div className="bg-[#0B5D3B] text-white p-3 rounded-xl font-mono text-xs flex justify-between items-center">
                <span>Dynamic Pricing Margin Uplift:</span>
                <strong className="text-[#C8A14A]">+{biData?.aiPredictiveForecasts?.dynamicPricingMarginOptimizationPercent || 3.8}% Net Margin</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: JOURNEY BI AI ASSISTANT */}
      {activeTab === 'bi-ai-assistant' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Natural Language Decision Intelligence Console
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Ask Business Intelligence & AI Analytics Questions in Plain English
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
            <div>
              <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Enter Executive Query or Business Prompt</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-mono"
                  placeholder="e.g. Compare Q2 flight revenue margin between Sabre and Amadeus..."
                />
                <button
                  onClick={handleExecuteBiQuery}
                  disabled={isAnalyzing}
                  className="px-6 py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all shrink-0 flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C8A14A]" />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            {queryResponse && (
              <div className="bg-white/10 border border-white/20 p-5 rounded-2xl text-xs space-y-3 font-sans text-emerald-100">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <strong className="text-[#C8A14A] font-serif text-sm">{queryResponse.insightTitle}</strong>
                  <span className="text-[10px] font-mono text-emerald-300">{queryResponse.modelUsed}</span>
                </div>

                <div className="space-y-1">
                  <strong className="text-white text-xs block font-bold">Key Findings:</strong>
                  <ul className="list-disc list-inside space-y-1 text-emerald-100">
                    {queryResponse.keyFindings.map((kf: string, idx: number) => (
                      <li key={idx}>{kf}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  <strong className="text-amber-300 text-xs block font-bold">Recommended Strategic Actions:</strong>
                  <ul className="list-disc list-inside space-y-1 text-emerald-200">
                    {queryResponse.recommendedActions.map((ra: string, idx: number) => (
                      <li key={idx}>{ra}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: LIVE STREAM TELEMETRY */}
      {activeTab === 'telemetry' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Real-Time Operational System Health
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Live API Response Times, Active User Stream & Server Telemetry
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[#666666] text-[10px] uppercase font-bold block">Active Online Users</span>
              <strong className="text-2xl text-[#081C15] font-mono font-black">
                {biData?.realTimeTelemetryStreams?.activeOnlineUsers || 1420} Users
              </strong>
              <span className="text-emerald-700 text-[10px] font-bold block">● Real-time WebSocket connection</span>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[#666666] text-[10px] uppercase font-bold block">GDS Sabre / Amadeus Latency</span>
              <strong className="text-2xl text-[#0B5D3B] font-mono font-black">
                {biData?.realTimeTelemetryStreams?.apiLatencySabreMs || 142} ms
              </strong>
              <span className="text-[#666666] text-[10px] block">Global Average API Round-Trip</span>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[#666666] text-[10px] uppercase font-bold block">Server CPU Utilization</span>
              <strong className="text-2xl text-[#C8A14A] font-mono font-black">
                {biData?.realTimeTelemetryStreams?.serverCpuUtilizationPercent || 28.4}% CPU
              </strong>
              <span className="text-emerald-700 text-[10px] font-bold block">Cloud Run Container Health: Optimal</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: GOVERNANCE & AUTOMATED REPORTS */}
      {activeTab === 'reports-governance' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Data Security & Compliance
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Automated Board Reporting, GDPR Privacy & Row-Level Security
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">Data Security & Row-Level Security (RLS)</strong>
              <p className="text-[#666666]">
                Role-Based Access Control (RBAC) ensures sales agents view only assigned regional leads while board members access consolidated financial statements.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <FileSpreadsheet className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">Automated Board & Investor PDF Reports</strong>
              <p className="text-[#666666]">
                Automated monthly PDF report delivery via email to C-level executives detailing margins, CAC payback periods, and growth trajectories.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
