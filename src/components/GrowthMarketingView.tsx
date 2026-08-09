import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Globe,
  Zap,
  Target,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Send,
  MessageSquare,
  BarChart3,
  Search,
  Bot,
  Megaphone,
  Share2,
  Users,
  Award,
  Sliders,
  DollarSign,
  ArrowRight,
  PieChart,
  Copy,
  Layers,
  FileText,
  MousePointerClick,
  Mail,
  Smartphone,
  ShieldCheck,
  BrainCircuit,
} from 'lucide-react';

export const GrowthMarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'attribution' | 'programmatic-seo' | 'crm-whatsapp' | 'ad-optimizer' | 'ai-marketing'
  >('attribution');

  const [marketingData, setMarketingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // AI Content Generator State
  const [contentType, setContentType] = useState<'blog' | 'meta-ad' | 'whatsapp' | 'video-script'>('meta-ad');
  const [targetTopic, setTargetTopic] = useState<string>('UK Student Visa Sept 2026 Intake');
  const [targetAudience, setTargetAudience] = useState<string>('Bangladeshi Students & Parents');
  const [generatingContent, setGeneratingContent] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  // CRM Campaign Trigger State
  const [crmTriggerType, setCrmTriggerType] = useState<string>('abandoned_booking');
  const [crmChannel, setCrmChannel] = useState<'whatsapp' | 'email' | 'omnichannel'>('whatsapp');
  const [crmSimulating, setCrmSimulating] = useState<boolean>(false);
  const [crmSuccess, setCrmSuccess] = useState<boolean>(false);

  // Performance Marketing Budget Simulator State
  const [googleAdBudgetBDT, setGoogleAdBudgetBDT] = useState<number>(150000);
  const [metaAdBudgetBDT, setMetaAdBudgetBDT] = useState<number>(120000);
  const [whatsappBudgetBDT, setWhatsappBudgetBDT] = useState<number>(30000);

  useEffect(() => {
    fetchMarketingOverview();
  }, []);

  const fetchMarketingOverview = () => {
    setLoading(true);
    fetch('/api/growth-marketing/overview')
      .then((res) => res.json())
      .then((data) => {
        setMarketingData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load growth marketing telemetry:', err);
        setLoading(false);
      });
  };

  // AI Content Generation Simulator Handler
  const handleGenerateContent = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingContent(true);
    setGeneratedResult(null);

    setTimeout(() => {
      setGeneratingContent(false);
      if (contentType === 'meta-ad') {
        setGeneratedResult({
          headline: `✈️ Apply for ${targetTopic} with 100% Admission & CAS Support!`,
          primaryText: `Planning to study in the UK for the upcoming intake? Journey Expert Ltd. offers free profile evaluation, university application processing, and 100% guided student visa assistance for ${targetAudience}.`,
          callToAction: 'Book Free Counseling Today',
          hashtags: '#StudyInUK #JourneyExpert #StudentVisaBD #StudyAbroad2026',
          predictedCtr: '4.8% High CTR',
          qualityScore: '9.6/10'
        });
      } else if (contentType === 'blog') {
        setGeneratedResult({
          headline: `Ultimate Guide: ${targetTopic} - Requirements, Fees & Scholarship Options`,
          seoMetaDescription: `Complete 2026 checklist for ${targetTopic}. Learn about CAS issuance, financial proof requirements, and step-by-step visa appointment booking.`,
          estimatedWords: '2,400 words (Programmatic SEO optimized)',
          targetKeywords: [`${targetTopic.toLowerCase()} requirements`, 'uk student visa bangladesh', 'journey expert study abroad'],
          predictedOrganicRank: 'Top 3 on Google Search (within 14 days)'
        });
      } else if (contentType === 'whatsapp') {
        setGeneratedResult({
          message: `Hello! 🌟 Don't miss out on ${targetTopic}! Journey Expert Ltd. is offering exclusive cash rebates on Biman & Emirates flight tickets for students this month. Tap to chat with our senior counselor now!`,
          deliverability: '99.4% Verified WhatsApp API',
          expectedConversion: '14.2% Reply Rate'
        });
      } else {
        setGeneratedResult({
          scriptTitle: `3 Things You MUST Know Before Applying for ${targetTopic}`,
          hook: 'Stop! Before you apply for your UK student visa in 2026, here are 3 costly mistakes Bangladeshi students make...',
          body: '1. Bank statement maturity rules\n2. Credibility interview preparation\n3. Pre-departure accommodation setup with Journey Expert.',
          cta: 'Comment "VISA" or tap the link in bio for a free consultation!',
          platformFormat: 'YouTube Shorts & TikTok (9:16 Vertical)'
        });
      }
    }, 1000);
  };

  // CRM Broadcast Simulator Handler
  const handleSimulateCrm = (e: React.FormEvent) => {
    e.preventDefault();
    setCrmSimulating(true);
    setCrmSuccess(false);

    setTimeout(() => {
      setCrmSimulating(false);
      setCrmSuccess(true);
    }, 1200);
  };

  // Performance Marketing Calculations
  const totalMonthlyAdSpendBDT = googleAdBudgetBDT + metaAdBudgetBDT + whatsappBudgetBDT;
  const estimatedLeadsMonthly = Math.round((googleAdBudgetBDT / 2800) * 1.2 + (metaAdBudgetBDT / 2150) * 1.1 + (whatsappBudgetBDT / 180) * 2.5);
  const estimatedRevenueBDT = Math.round(totalMonthlyAdSpendBDT * 5.84);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - GLOBAL MARKETING & GROWTH ENGINE */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • GROWTH ENGINE & AI MARKETING (PART 40)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Globe className="w-3 h-3 text-[#C8A14A]" />
                <span>GLOBAL CUSTOMER ACQUISITION & PROGRAMMATIC SEO ENGINE</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Global Growth Engine & Autonomous Marketing System
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Omnichannel customer acquisition platform powering Travel OTA, Study Abroad, Visa Consultancy, Corporate Travel & Craft Bangla. Driven by Programmatic SEO, AI Ad Optimization, WhatsApp Business Automation & Journey Marketing AI.
            </p>
          </div>

          {/* Key Telemetry Quick Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Organic Traffic:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {marketingData?.kpis?.monthlyOrganicTraffic || '1,420,000'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Blended CAC (BDT):</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {marketingData?.kpis?.blendedCacBDT || '৳ 1,850 BDT'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>LTV / CAC Efficiency:</span>
              <span className="text-amber-300 font-mono font-black text-xs">
                {marketingData?.kpis?.ltvCacRatio || '7.68x'}
              </span>
            </div>

            <button
              onClick={fetchMarketingOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Growth Telemetry</span>
            </button>
          </div>
        </div>

        {/* Growth KPIs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Overall ROAS</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {marketingData?.kpis?.overallRoas || '5.84x Return'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">24h Generated Leads</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">
              {marketingData?.kpis?.totalLeadsGenerated24h?.toLocaleString() || '3,840'} Leads
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Indexed SEO Pages</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">
              {marketingData?.programmaticSeoStats?.indexedPages || '28,400 Pages'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">WhatsApp Open Rate</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {marketingData?.crmAutomationMetrics?.whatsappMessageOpenRate || '94.8%'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Status</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">AUTONOMOUS MARKETING ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('attribution')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'attribution'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Growth Dashboard & Channel Attribution</span>
        </button>

        <button
          onClick={() => setActiveTab('programmatic-seo')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'programmatic-seo'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Search className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Programmatic SEO & AI Content Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('crm-whatsapp')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'crm-whatsapp'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#C8A14A]" />
          <span>3. CRM & WhatsApp Business Automation</span>
        </button>

        <button
          onClick={() => setActiveTab('ad-optimizer')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ad-optimizer'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Megaphone className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Performance Marketing & AI Ad Optimizer</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-marketing')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-marketing'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Journey Marketing AI Assistant</span>
        </button>
      </div>

      {/* TAB 1: GROWTH DASHBOARD & CHANNEL ATTRIBUTION */}
      {activeTab === 'attribution' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Touch Channel Attribution
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Customer Acquisition Channels & Unit Economics
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] uppercase text-[10px] font-bold">
                  <th className="p-3">Acquisition Channel</th>
                  <th className="p-3">Traffic Share</th>
                  <th className="p-3">Avg CAC (BDT)</th>
                  <th className="p-3">Conversion Rate</th>
                  <th className="p-3">Return on Ad Spend (ROAS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC] text-xs">
                {marketingData?.channels?.map((ch: any, idx: number) => (
                  <tr key={idx} className="hover:bg-[#F8FAF9]/80 transition-colors">
                    <td className="p-3 font-bold text-[#081C15] flex items-center space-x-2">
                      <Target className="w-4 h-4 text-[#0B5D3B]" />
                      <span>{ch.channel}</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#081C15]">{ch.trafficShare}</td>
                    <td className="p-3 font-mono font-bold text-emerald-800">{ch.cacBDT}</td>
                    <td className="p-3 font-mono font-bold text-[#081C15]">{ch.conversionRate}</td>
                    <td className="p-3 font-mono font-bold text-amber-700">{ch.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PROGRAMMATIC SEO & AI CONTENT ENGINE */}
      {activeTab === 'programmatic-seo' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Automated Content Generation
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Programmatic SEO & AI Content Marketing Generator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Form */}
            <form onSubmit={handleGenerateContent} className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
              <h4 className="font-bold text-[#081C15] font-serif text-sm">Campaign Creative Parameters</h4>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Target Content Format:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setContentType('meta-ad')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                      contentType === 'meta-ad' ? 'bg-[#0B5D3B] text-white' : 'bg-white border text-[#666]'
                    }`}
                  >
                    Meta Ad Copy
                  </button>

                  <button
                    type="button"
                    onClick={() => setContentType('blog')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                      contentType === 'blog' ? 'bg-[#0B5D3B] text-white' : 'bg-white border text-[#666]'
                    }`}
                  >
                    SEO Blog Post
                  </button>

                  <button
                    type="button"
                    onClick={() => setContentType('whatsapp')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                      contentType === 'whatsapp' ? 'bg-[#0B5D3B] text-white' : 'bg-white border text-[#666]'
                    }`}
                  >
                    WhatsApp Message
                  </button>

                  <button
                    type="button"
                    onClick={() => setContentType('video-script')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                      contentType === 'video-script' ? 'bg-[#0B5D3B] text-white' : 'bg-white border text-[#666]'
                    }`}
                  >
                    Short Video Script
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Target Topic / Route / Destination:</label>
                <input
                  type="text"
                  value={targetTopic}
                  onChange={(e) => setTargetTopic(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Target Audience Segment:</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <button
                type="submit"
                disabled={generatingContent}
                className="w-full py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C8A14A]" />
                <span>{generatingContent ? 'Generating AI Creative Content...' : 'Generate AI Campaign Copy'}</span>
              </button>
            </form>

            {/* Generated Output Preview */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl border border-[#C8A14A]/40 space-y-4 shadow-xl flex flex-col justify-between font-mono">
              <div>
                <span className="text-[#C8A14A] font-serif text-sm font-bold block mb-2">AI Generated Creative Copy</span>

                {generatedResult ? (
                  <div className="space-y-3 text-xs bg-black/40 p-4 rounded-xl border border-emerald-900 text-emerald-100">
                    <strong className="text-white font-serif text-sm block">{generatedResult.headline || generatedResult.scriptTitle}</strong>

                    {generatedResult.primaryText && <p className="text-emerald-200">{generatedResult.primaryText}</p>}
                    {generatedResult.seoMetaDescription && <p className="text-emerald-200">{generatedResult.seoMetaDescription}</p>}
                    {generatedResult.message && <p className="text-emerald-200">{generatedResult.message}</p>}
                    {generatedResult.hook && (
                      <div className="space-y-1 text-emerald-200">
                        <p><strong>Hook:</strong> {generatedResult.hook}</p>
                        <p><strong>Body:</strong> {generatedResult.body}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-emerald-800 text-[11px] text-amber-300">
                      <span>Predicted Performance: {generatedResult.predictedCtr || generatedResult.predictedOrganicRank || generatedResult.deliverability || generatedResult.estimatedWords}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-emerald-400/60 font-sans text-xs">
                    Configure campaign parameters and click "Generate AI Campaign Copy" to view AI marketing outputs.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CRM & WHATSAPP BUSINESS AUTOMATION */}
      {activeTab === 'crm-whatsapp' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Omnichannel Lifecycle Marketing
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              CRM Marketing & WhatsApp Business Automation Triggers
            </h3>
          </div>

          <form onSubmit={handleSimulateCrm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Automation Flow Trigger:</label>
                <select
                  value={crmTriggerType}
                  onChange={(e) => setCrmTriggerType(e.target.value)}
                  className="w-full p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                >
                  <option value="abandoned_booking">Flight Abandoned Booking Recovery (5% Promo Code)</option>
                  <option value="student_visa_followup">Study Abroad Lead 48h Follow-up Series</option>
                  <option value="post_travel_review">Post-Travel Review & Loyalty Points Credit</option>
                  <option value="umrah_predeparture">Hajj & Umrah Pre-departure Checklist Broadcast</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Delivery Channel:</label>
                <select
                  value={crmChannel}
                  onChange={(e) => setCrmChannel(e.target.value as any)}
                  className="w-full p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                >
                  <option value="whatsapp">WhatsApp Business API (94% Open Rate)</option>
                  <option value="email">Transactional Email Gateway</option>
                  <option value="omnichannel">Omnichannel SMS + WhatsApp + Email</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={crmSimulating}
              className="px-6 py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4 text-[#C8A14A]" />
              <span>{crmSimulating ? 'Executing CRM Broadcast Trigger...' : 'Trigger Automated CRM Broadcast'}</span>
            </button>
          </form>

          {crmSuccess && (
            <div className="p-5 bg-emerald-950 text-white border border-emerald-500/40 rounded-2xl space-y-2 font-mono text-xs animate-fade-in">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C8A14A]" />
                <span>Automated Flow Broadcast Successfully Executed!</span>
              </div>
              <p className="text-emerald-100">
                Trigger: <strong className="text-white">{crmTriggerType}</strong> via <strong className="text-white uppercase">{crmChannel}</strong>. Queued 1,240 personalized messages. Verified deliverability rate: 99.2%.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PERFORMANCE MARKETING & AI AD OPTIMIZER */}
      {activeTab === 'ad-optimizer' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Budget & ROAS Simulator
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Paid Search, Social & AI Dynamic Ad Budget Allocator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
              <h4 className="font-bold text-[#081C15] font-serif text-sm">Monthly Ad Spend Distribution</h4>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Google Search & PMax Budget (BDT):</label>
                <input
                  type="number"
                  step="10000"
                  value={googleAdBudgetBDT}
                  onChange={(e) => setGoogleAdBudgetBDT(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Meta (Facebook & IG) Budget (BDT):</label>
                <input
                  type="number"
                  step="10000"
                  value={metaAdBudgetBDT}
                  onChange={(e) => setMetaAdBudgetBDT(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">WhatsApp & Remarketing Budget (BDT):</label>
                <input
                  type="number"
                  step="5000"
                  value={whatsappBudgetBDT}
                  onChange={(e) => setWhatsappBudgetBDT(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-mono font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-[#081C15] text-white p-6 rounded-2xl border border-[#C8A14A]/40 space-y-4 shadow-xl flex flex-col justify-between font-mono">
              <div>
                <span className="text-[#C8A14A] font-serif text-sm font-bold block mb-3">Projected Marketing Return</span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Total Monthly Ad Budget:</span>
                    <strong className="text-white">৳ {totalMonthlyAdSpendBDT.toLocaleString()} BDT</strong>
                  </div>

                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Projected Monthly Leads:</span>
                    <strong className="text-amber-300">{estimatedLeadsMonthly.toLocaleString()} Qualified Leads</strong>
                  </div>

                  <div className="flex justify-between border-b border-emerald-900 pb-1.5">
                    <span className="text-emerald-300">Target ROAS Multiplier:</span>
                    <strong className="text-emerald-200">5.84x Return</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C8A14A]/40">
                <span className="text-xs font-bold text-white uppercase font-sans block text-emerald-300">Estimated Gross Attributable GMV:</span>
                <strong className="text-2xl font-black text-[#C8A14A]">৳ {estimatedRevenueBDT.toLocaleString()} BDT</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: JOURNEY MARKETING AI ASSISTANT */}
      {activeTab === 'ai-marketing' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Growth Strategy
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey Marketing AI Recommendations & Campaign Planning
            </h3>
          </div>

          <div className="space-y-4">
            {marketingData?.aiMarketingGrowthRecommendations?.map((rec: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                    {rec.channel}
                  </span>
                  <span className="text-emerald-700 font-bold font-mono text-xs">
                    Outcome: {rec.projectedOutcome}
                  </span>
                </div>

                <p className="text-sm font-bold text-[#081C15] font-serif">{rec.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
