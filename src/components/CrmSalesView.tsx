import React, { useState, useEffect } from 'react';
import {
  Users,
  Target,
  TrendingUp,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Mail,
  Zap,
  CheckCircle2,
  Clock,
  DollarSign,
  Filter,
  Search,
  RefreshCw,
  Award,
  ChevronRight,
  Send,
  FileText,
  Building2,
  GraduationCap,
  Plane,
  ShieldCheck,
  UserCheck,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  BarChart3,
  Flame,
  ArrowUpRight,
  UserPlus,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';

export const CrmSalesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'lead-dashboard' | 'sales-pipelines' | 'ai-sales-assistant' | 'customer-360' | 'revenue-analytics'
  >('lead-dashboard');

  const [crmData, setCrmData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // AI Sales Followup Generator state
  const [selectedLead, setSelectedLead] = useState<string>('JEL-LEAD-901');
  const [leadService, setLeadService] = useState<string>('Study Abroad (UK CAS & Visa)');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [generatingAiResponse, setGeneratingAiResponse] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  // Search in Lead Table
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('ALL');

  useEffect(() => {
    fetchCrmOverview();
  }, []);

  const fetchCrmOverview = () => {
    setLoading(true);
    fetch('/api/crm/overview')
      .then((res) => res.json())
      .then((data) => {
        setCrmData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load CRM data:', err);
        setLoading(false);
      });
  };

  const handleGenerateAiFollowup = () => {
    setGeneratingAiResponse(true);
    setTimeout(() => {
      setGeneratedMessage(
        `Dear Dr. Rafiqul Islam, greetings from Journey Expert Ltd.\n\n` +
          `Following up on your UK Higher Education query for University of Manchester (MSc Data Science). ` +
          `Our AI Study Abroad Advisor has prepared your 2026 CAS Deposit & NHS Surcharge breakdown.\n\n` +
          `📅 Next Step: Book your 1-on-1 Senior Student Counselor session today or reply "YES" to receive the PDF checklist on WhatsApp.\n\n` +
          `Best regards,\nJourney Sales AI • Journey Expert Ltd.`
      );
      setGeneratingAiResponse(false);
    }, 1100);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - CRM, LEAD MANAGEMENT & SALES AUTOMATION */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE CRM & REVENUE PLATFORM (PART 29)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Users className="w-3 h-3 text-[#C8A14A]" />
                <span>3,840 LEADS • AI SCORING • MULTI-PIPELINE AUTOMATION</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise CRM & Sales Automation Suite
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Unified Customer 360, AI Lead Scoring, Trilingual WhatsApp Automation, Multi-Service Sales Pipelines & Real-Time Revenue Intelligence.
            </p>
          </div>

          {/* Quick CRM Metrics Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active Pipeline Value:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                ৳{(crmData?.crmMetrics?.pipelineValueBDT / 1000000 || 184.5).toFixed(1)}M BDT
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Conversion Rate:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {crmData?.crmMetrics?.monthlyConversionRate || '32.8%'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>AI Follow-ups Today:</span>
              <span className="text-white font-mono font-black text-sm">
                {crmData?.crmMetrics?.aiFollowupsCompletedToday || 1280} Sent
              </span>
            </div>

            <button
              onClick={fetchCrmOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh CRM Pipeline Data</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Total Active Leads</span>
            <span className="text-lg font-black text-white font-mono">
              {(crmData?.crmMetrics?.totalActiveLeads || 3840).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Hot Lead Queue</span>
            <span className="text-lg font-black text-amber-300 font-mono flex items-center space-x-1">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{crmData?.crmMetrics?.hotLeadsCount || 612}</span>
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Avg AI Lead Score</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {crmData?.crmMetrics?.avgLeadScore || 84}/100
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Sales Pipelines</span>
            <span className="text-lg font-black text-white font-mono">4 Active</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Avg Deal Cycle</span>
            <span className="text-lg font-black text-amber-300 font-mono">14 Days</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Customer Retention</span>
            <span className="text-lg font-black text-emerald-300 font-mono">78.4%</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('lead-dashboard')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'lead-dashboard'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Target className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Unified Lead Management & AI Scoring</span>
        </button>

        <button
          onClick={() => setActiveTab('sales-pipelines')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'sales-pipelines'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Multi-Service Sales Pipelines</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-sales-assistant')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-sales-assistant'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Gemini AI Sales Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab('customer-360')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'customer-360'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Customer 360 Lifecycle Profiles</span>
        </button>

        <button
          onClick={() => setActiveTab('revenue-analytics')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'revenue-analytics'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Sales Forecasting & Retention</span>
        </button>
      </div>

      {/* TAB 1: UNIFIED LEAD MANAGEMENT & AI SCORING */}
      {activeTab === 'lead-dashboard' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Real-Time Lead Stream
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                AI Classified & Scored Sales Inquiries
              </h3>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#666666] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search lead or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <select
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                className="bg-[#F8FAF9] border border-[#ECECEC] rounded-xl px-3 py-2 text-xs font-bold text-[#081C15] focus:outline-none focus:border-[#0B5D3B]"
              >
                <option value="ALL">All Categories</option>
                <option value="HOT">Hot Leads</option>
                <option value="WARM">Warm Leads</option>
                <option value="HIGH_VALUE_CORP">High Value Corporate</option>
              </select>
            </div>
          </div>

          {/* Lead Cards Grid */}
          <div className="space-y-3">
            {crmData?.recentLeads
              ?.filter((lead: any) => {
                const matchesSearch =
                  lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lead.service.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory =
                  selectedClassification === 'ALL' || lead.classification === selectedClassification;
                return matchesSearch && matchesCategory;
              })
              .map((lead: any) => (
                <div
                  key={lead.id}
                  className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#0B5D3B] transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold text-[#666666]">{lead.id}</span>
                      <strong className="text-sm font-bold text-[#081C15] font-serif">{lead.name}</strong>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          lead.classification === 'HOT'
                            ? 'bg-rose-100 text-rose-800'
                            : lead.classification === 'HIGH_VALUE_CORP'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {lead.classification}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666]">
                      <span className="flex items-center space-x-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#0B5D3B]" />
                        <span>{lead.service}</span>
                      </span>
                      <span>•</span>
                      <span>Source: <strong className="text-[#081C15]">{lead.source}</strong></span>
                      <span>•</span>
                      <span>Pipeline Stage: <strong className="text-[#0B5D3B]">{lead.pipelineStage}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#ECECEC]">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#666666] uppercase block">Lead Value</span>
                      <strong className="text-sm font-mono font-black text-[#0B5D3B]">
                        ৳{(lead.valueBDT / 1000).toLocaleString()}K BDT
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#666666] uppercase block">AI Intent Score</span>
                      <strong className="text-sm font-mono font-black text-amber-600">
                        {lead.leadScore}/100
                      </strong>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedLead(lead.id);
                        setLeadService(lead.service);
                        setActiveTab('ai-sales-assistant');
                      }}
                      className="px-3.5 py-2 bg-[#081C15] text-white hover:bg-[#0B5D3B] rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                    >
                      <span>Copilot</span>
                      <ChevronRight className="w-3 h-3 text-[#C8A14A]" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-SERVICE SALES PIPELINES */}
      {activeTab === 'sales-pipelines' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Domain Sales Operations
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Active Sales Pipeline Velocity & Conversion
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crmData?.salesPipelines?.map((pipeline: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                <div className="border-b border-[#ECECEC] pb-3 flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#081C15] font-serif">{pipeline.name}</strong>
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Active Deals:</span>
                    <strong className="font-mono text-xs text-[#081C15]">{pipeline.activeDeals}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Avg Cycle:</span>
                    <strong className="font-mono text-xs text-amber-600">{pipeline.avgDealCycleDays} Days</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Win Rate:</span>
                    <strong className="font-mono text-xs text-emerald-700">{pipeline.conversionRate}</strong>
                  </div>
                </div>

                <button className="w-full py-2 bg-white border border-[#ECECEC] hover:bg-[#0B5D3B] hover:text-white rounded-xl text-xs font-bold text-[#081C15] transition-all">
                  View Kanban Board
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GEMINI AI SALES COPILOT */}
      {activeTab === 'ai-sales-assistant' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Automated Sales Outreach & Follow-up Generator
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey Sales AI — Automated Customer Communication
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <Sparkles className="w-5 h-5 text-[#C8A14A]" />
                <strong className="font-serif font-black text-sm text-[#C8A14A]">
                  AI Sales Outreach Studio
                </strong>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-emerald-200 font-bold uppercase block">Target Lead ID:</label>
                  <input
                    type="text"
                    value={selectedLead}
                    onChange={(e) => setSelectedLead(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white text-xs font-mono focus:outline-none focus:border-[#C8A14A]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-emerald-200 font-bold uppercase block">Inquired Service:</label>
                  <input
                    type="text"
                    value={leadService}
                    onChange={(e) => setLeadService(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-[#C8A14A]"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateAiFollowup}
                disabled={generatingAiResponse}
                className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Zap className={`w-4 h-4 text-[#C8A14A] ${generatingAiResponse ? 'animate-spin' : ''}`} />
                <span>{generatingAiResponse ? 'Synthesizing Response...' : 'Generate WhatsApp / Email Follow-up'}</span>
              </button>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <strong className="font-serif font-black text-lg text-[#081C15]">Generated Follow-up Message</strong>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                  WHATSAPP READY
                </span>
              </div>

              {generatedMessage ? (
                <div className="space-y-4">
                  <pre className="bg-white p-4 rounded-2xl border border-[#ECECEC] font-sans text-xs text-[#081C15] whitespace-pre-wrap leading-relaxed">
                    {generatedMessage}
                  </pre>

                  <button
                    onClick={() => handleCopy(generatedMessage)}
                    className="w-full py-2.5 bg-[#081C15] text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5"
                  >
                    {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C8A14A]" />}
                    <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy WhatsApp Message'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-[#666666] space-y-2">
                  <MessageSquare className="w-8 h-8 text-[#0B5D3B] mx-auto opacity-40" />
                  <p className="text-xs">Click "Generate WhatsApp / Email Follow-up" to test live AI synthesis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMER 360 LIFECYCLE PROFILES */}
      {activeTab === 'customer-360' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Unified Customer Record
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Customer 360 Profile & Lifetime History
            </h3>
          </div>

          <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
              <div>
                <strong className="text-base font-bold text-[#081C15] font-serif block">Dr. Rafiqul Islam</strong>
                <span className="text-[11px] text-[#666666]">Dhaka, Bangladesh • VIP Corporate & Education Client</span>
              </div>
              <span className="bg-[#0B5D3B] text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                LTV: ৳4,850,000 BDT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-[#ECECEC]">
                <span className="text-[10px] text-[#666666] font-bold block uppercase">Past Bookings</span>
                <strong className="text-sm font-bold text-[#081C15]">3 Flights (Biman/Emirates)</strong>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#ECECEC]">
                <span className="text-[10px] text-[#666666] font-bold block uppercase">Visa Records</span>
                <strong className="text-sm font-bold text-emerald-700">UK & Schengen Approved</strong>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#ECECEC]">
                <span className="text-[10px] text-[#666666] font-bold block uppercase">Education Pipeline</span>
                <strong className="text-sm font-bold text-amber-700">Son Enrolled in University of Manchester</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SALES FORECASTING & RETENTION */}
      {activeTab === 'revenue-analytics' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              AI Revenue Operations
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Sales Forecasting & Repeat Customer Campaigns
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[10px] font-bold text-[#666666] uppercase">Q3 Forecast</span>
              <strong className="text-xl font-mono font-black text-[#0B5D3B] block">৳240M BDT</strong>
              <span className="text-[10px] text-emerald-700 font-bold">+18.5% YoY Growth</span>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[10px] font-bold text-[#666666] uppercase">Customer Churn Risk</span>
              <strong className="text-xl font-mono font-black text-[#081C15] block">4.2% Low</strong>
              <span className="text-[10px] text-emerald-700 font-bold">AI Reactivation Active</span>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[10px] font-bold text-[#666666] uppercase">Active Follow-up Automation</span>
              <strong className="text-xl font-mono font-black text-[#C8A14A] block">1,280 Daily</strong>
              <span className="text-[10px] text-[#666666]">WhatsApp, Email, SMS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
