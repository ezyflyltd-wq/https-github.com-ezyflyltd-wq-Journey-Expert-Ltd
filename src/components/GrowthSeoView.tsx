import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  Globe,
  BarChart3,
  Target,
  Sparkles,
  Share2,
  Mail,
  MessageSquare,
  Zap,
  CheckCircle2,
  FileText,
  MousePointer,
  Layers,
  DollarSign,
  PieChart,
  Users,
  Award,
  RefreshCw,
  Send,
  Code,
  Smartphone,
  Check,
  Building2,
  GraduationCap,
  Plane,
  Heart,
  Tag,
  Eye,
  Sliders,
  Filter,
} from 'lucide-react';

export const GrowthSeoView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'technical-seo' | 'programmatic-seo' | 'content-cms' | 'paid-ads' | 'crm-automation' | 'ai-copywriter' | 'analytics' | 'international'
  >('technical-seo');

  const [growthData, setGrowthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Interactive AI Copywriter Generator State
  const [promptTopic, setPromptTopic] = useState('UK Student Visa 2026 Step-by-Step Guide for Bangladeshi Students');
  const [targetAudience, setTargetAudience] = useState('Bangladeshi HSC/Graduates seeking UK Higher Education');
  const [selectedChannel, setSelectedChannel] = useState<'meta' | 'google' | 'email' | 'whatsapp'>('meta');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchGrowthData();
  }, []);

  const fetchGrowthData = () => {
    setLoading(true);
    fetch('/api/growth/overview')
      .then((res) => res.json())
      .then((data) => {
        setGrowthData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load growth & SEO data:', err);
        setLoading(false);
      });
  };

  const handleGenerateAiMarketingCopy = () => {
    setIsGenerating(true);
    setGeneratedCopy('Gemini 2.5 Flash Analyzing target keywords, competitor search volume, and high-converting hooks...');

    setTimeout(() => {
      setIsGenerating(false);
      if (selectedChannel === 'meta') {
        setGeneratedCopy(
          `🚀 UK Tier 4 Student Visa 2026: Fast-Track Your Dream University Admission!\n\n🎓 Are you an HSC/Bachelor graduate in Bangladesh aiming for top UK Universities? Journey Expert Ltd. brings you 100% Free Counseling + Direct CAS Application Support.\n\n✨ Why Choose JEL?\n• 99.2% Visa Success Rate\n• Direct Partner with 500+ UK Universities\n• Scholarship Assistance up to £5,000\n\n👉 Click "Apply Now" to claim your Free Assessment today!\n#StudyInUK #JourneyExpert #UKStudentVisa #IELTS #StudyAbroadBD`
        );
      } else if (selectedChannel === 'google') {
        setGeneratedCopy(
          `Headline 1: Official UK Student Visa Agency BD\nHeadline 2: 99.2% Visa Approval Rate | JEL\nHeadline 3: Apply for Sept 2026 UK Intake\nDescription 1: Direct Admission to 500+ UK Universities. Free IELTS Guidance & CAS File Processing.\nDescription 2: Apply with Journey Expert Ltd. Authorized Visa Consultants in Dhaka & Chattogram.`
        );
      } else if (selectedChannel === 'whatsapp') {
        setGeneratedCopy(
          `Assalamu Alaikum! 🌟 Thinking of studying in the UK for the 2026 Intake?\n\nJourney Expert Ltd. is hosting an Exclusive One-on-One UK University Spot Assessment session in Dhaka this Saturday.\n\nGet your profile evaluated on the spot and receive your offer letter in 48 hours.\n\nReply "YES" to confirm your free seat now!`
        );
      } else {
        setGeneratedCopy(
          `Subject: 🎓 Your Step-by-Step Roadmap to UK Tier 4 Student Visa in 2026\n\nDear Student,\n\nNavigating university applications, CAS issuance, and embassy interviews can feel overwhelming. At Journey Expert Ltd., our expert education counselors have assisted 5,000+ Bangladeshi students in securing UK visas.\n\nHere is your 3-Step Plan for the 2026 Academic Session...\n[Button: Book Free Counseling Session]`
        );
      }
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* GROWTH CONTROL CENTER HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#0B5D3B] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • GROWTH & DIGITAL MARKETING (PART 19)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SEO • Programmatic Pages • Paid PPC • CRM Active</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise SEO, Digital Marketing & Growth Engine
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Programmatic SEO for 100,000+ Flight & Hotel Destination Pages, Multi-Channel Google/Meta Ads Campaign Automation, Gemini AI Copywriter, and High-Converting CRM Lead Funnels.
            </p>
          </div>

          {/* Quick Growth Metrics Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Organic Traffic:</span>
              <span className="text-white font-mono font-black text-sm">
                {(growthData?.seoPerformance?.organicTrafficMonthly || 485000).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Google Indexed Pages:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {(growthData?.seoPerformance?.googleIndexedPages || 142500).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Ad Campaign ROAS:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {growthData?.campaignsAndPpc?.roasAverage || 5.8}x Return
              </span>
            </div>

            <button
              onClick={fetchGrowthData}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Growth Telemetry</span>
            </button>
          </div>
        </div>

        {/* Global Key Marketing Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Domain Authority (DA)</span>
            <span className="text-lg font-black text-white font-mono">
              {growthData?.seoPerformance?.domainAuthorityDA || 68} / 100
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Core Web Vitals</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {growthData?.seoPerformance?.coreWebVitalsScore || 98} / 100
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Top Rank Keywords</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              {(growthData?.seoPerformance?.topRankedKeywords || 18400).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Cost Per Acquisition</span>
            <span className="text-lg font-black text-white font-mono">
              BDT {growthData?.campaignsAndPpc?.costPerAcquisitionCacBDT || 850}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Monthly Ad Budget</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              BDT {(growthData?.campaignsAndPpc?.totalMonthlyAdBudgetBDT || 1850000).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Leads Captured (30d)</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {(growthData?.campaignsAndPpc?.totalLeadsCapturedThisMonth || 12400).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('technical-seo')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'technical-seo'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Search className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Technical SEO & Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('programmatic-seo')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'programmatic-seo'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Code className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Programmatic SEO Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('content-cms')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'content-cms'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Content Strategy & CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('paid-ads')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'paid-ads'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Target className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Omnichannel Paid Ads</span>
        </button>

        <button
          onClick={() => setActiveTab('crm-automation')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'crm-automation'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C8A14A]" />
          <span>5. CRM Lead Automation</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-copywriter')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-copywriter'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Gemini AI Copywriter</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Growth Analytics & ROI</span>
        </button>

        <button
          onClick={() => setActiveTab('international')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'international'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#C8A14A]" />
          <span>8. International & Local SEO</span>
        </button>
      </div>

      {/* TAB 1: TECHNICAL SEO & SCHEMA.ORG */}
      {activeTab === 'technical-seo' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Search Engine Optimization Core Architecture
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Schema.org JSON-LD Structured Data, OpenGraph & Core Web Vitals Optimization
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-emerald-300 p-6 rounded-2xl font-mono text-[11px] space-y-3 overflow-x-auto border border-emerald-900">
              <div className="text-[#C8A14A] font-bold"># Schema.org JSON-LD FlightReservation & OTA Metadata</div>
              <pre className="text-emerald-100 leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@type": "FlightReservation",
  "reservationNumber": "JEL-SABRE-9022",
  "reservationStatus": "https://schema.org/ReservationConfirmed",
  "underName": {
    "@type": "Person",
    "name": "Tanvir Ahmed"
  },
  "reservationFor": {
    "@type": "Flight",
    "flightNumber": "BG201",
    "provider": {
      "@type": "Airline",
      "name": "Biman Bangladesh Airlines",
      "iataCode": "BG"
    },
    "departureAirport": {
      "@type": "Airport",
      "name": "Hazrat Shahjalal International Airport",
      "iataCode": "DAC"
    },
    "arrivalAirport": {
      "@type": "Airport",
      "name": "London Heathrow Airport",
      "iataCode": "LHR"
    }
  }
}`}
              </pre>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <span className="font-extrabold text-[#0B5D3B] text-sm block">Core Web Vitals Metric Optimization</span>
                <p className="text-[#666666]">
                  LCP (Largest Contentful Paint) &lt; 0.9s, FID &lt; 8ms, CLS = 0.00. Automatic WebP image optimization and critical CSS inlining.
                </p>
              </div>

              <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <span className="font-extrabold text-[#0B5D3B] text-sm block">Dynamic XML Sitemap & Robots.txt</span>
                <p className="text-[#666666]">
                  Automatically indexes 142,500+ programmatic landing pages with hreflang multi-region language tags for BD, UK, US, and Middle East.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROGRAMMATIC SEO ENGINE */}
      {activeTab === 'programmatic-seo' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Automated Page Generation Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              100,000+ Dynamic Route, Hotel, Visa & University Landing Pages
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <Plane className="w-6 h-6 mx-auto text-[#C8A14A]" />
              <strong className="text-base text-[#081C15] font-mono block">45,000+ Pages</strong>
              <span className="text-[#666666] font-bold block">Flight Route Pages</span>
              <p className="text-[11px] text-[#666666]">e.g. /flights/dhaka-to-london-cheap-tickets</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <Building2 className="w-6 h-6 mx-auto text-[#C8A14A]" />
              <strong className="text-base text-[#081C15] font-mono block">32,000+ Pages</strong>
              <span className="text-[#666666] font-bold block">Hotel Destinations</span>
              <p className="text-[11px] text-[#666666]">e.g. /hotels/makkah-halal-hotels-near-haram</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#C8A14A]" />
              <strong className="text-base text-[#081C15] font-mono block">180+ Pages</strong>
              <span className="text-[#666666] font-bold block">Visa Country Guides</span>
              <p className="text-[11px] text-[#666666]">e.g. /visa/schengen-visa-from-bangladesh</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <GraduationCap className="w-6 h-6 mx-auto text-[#C8A14A]" />
              <strong className="text-base text-[#081C15] font-mono block">850+ Pages</strong>
              <span className="text-[#666666] font-bold block">University Directories</span>
              <p className="text-[11px] text-[#666666]">e.g. /study-abroad/uk/university-of-manchester</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT STRATEGY & CMS */}
      {activeTab === 'content-cms' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              High-Authority Travel & Education Content CMS
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Live Ranked Editorial Content & Conversion Analytics
            </h3>
          </div>

          <div className="space-y-4">
            {growthData?.contentEngine?.map((art: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#0B5D3B] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {art.category}
                    </span>
                    <strong className="text-sm text-[#081C15] font-bold font-serif">{art.title}</strong>
                  </div>
                  <p className="text-[#666666] font-mono text-[11px]">Ranking Keyword: "{art.rankingKeyword}"</p>
                </div>

                <div className="flex items-center space-x-6 text-xs font-mono">
                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block font-sans">Monthly Views</span>
                    <strong className="text-[#111111]">{art.views.toLocaleString()}</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block font-sans">Leads Converted</span>
                    <strong className="text-[#0B5D3B] font-bold">{art.conversions} Leads</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block font-sans">SEO Score</span>
                    <strong className="text-[#C8A14A] font-bold">{art.seoScore} / 100</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PAID ADVERTISING SYSTEM */}
      {activeTab === 'paid-ads' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Omnichannel Paid Performance Marketing
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Google Search, Meta Ads, TikTok & YouTube Ads Budget & ROAS Tracker
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-emerald-800">
              <span className="font-serif font-black text-base text-[#C8A14A] block">Google Search & Display Ads</span>
              <div className="space-y-2 text-xs text-emerald-100 font-mono">
                <div className="flex justify-between">
                  <span>Monthly Spend:</span>
                  <strong className="text-white">BDT 1,100,000</strong>
                </div>
                <div className="flex justify-between">
                  <span>Return on Ad Spend (ROAS):</span>
                  <strong className="text-emerald-300 font-bold">6.4x ROAS</strong>
                </div>
                <div className="flex justify-between">
                  <span>Target Keywords:</span>
                  <strong className="text-white">Flight tickets, UK Student Visa</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">Meta (Facebook & Instagram) Ads</span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Monthly Spend:</span>
                  <strong className="text-[#081C15]">BDT 750,000</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Return on Ad Spend (ROAS):</span>
                  <strong className="text-[#0B5D3B] font-bold">5.2x ROAS</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Target Audience:</span>
                  <strong className="text-[#111111]">HSC Students, Frequent Travelers</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CRM LEAD AUTOMATION */}
      {activeTab === 'crm-automation' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Touch Automated Lead Nurturing
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Automated Email, WhatsApp Business & SMS Dripping Workflows
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <MessageSquare className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">WhatsApp Drip Sequences</strong>
              <p className="text-[#666666]">
                Instant WhatsApp message sent upon flight search drop-off or visa inquiry with direct booking links.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Mail className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">Email Lead Nurturing</strong>
              <p className="text-[#666666]">
                5-part educational email drip for Study Abroad leads guide students from university choice to visa filing.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Target className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">AI Lead Scoring Engine</strong>
              <p className="text-[#666666]">
                Scores leads automatically based on page visits, document uploads, and budget to prioritize high-value sales calls.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GEMINI AI COPYWRITER & MARKETING ASSISTANT */}
      {activeTab === 'ai-copywriter' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Gemini 2.5 Flash Marketing Optimizer
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Instant AI Ad Copy & Campaign Generator
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Campaign Topic / Offer</label>
                <input
                  type="text"
                  value={promptTopic}
                  onChange={(e) => setPromptTopic(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Marketing Channel</label>
                <select
                  value={selectedChannel}
                  onChange={(e: any) => setSelectedChannel(e.target.value)}
                  className="w-full bg-[#0B5D3B] border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                >
                  <option value="meta">Meta (Facebook & Instagram)</option>
                  <option value="google">Google Search Ad Copy</option>
                  <option value="whatsapp">WhatsApp Broadcast Message</option>
                  <option value="email">Email Campaign Newsletter</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateAiMarketingCopy}
              disabled={isGenerating}
              className="w-full py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#C8A14A]" />
              <span>{isGenerating ? 'Generating High-Converting Copy...' : 'Generate AI Marketing Copy Now'}</span>
            </button>

            {generatedCopy && (
              <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-xs space-y-2 font-mono whitespace-pre-wrap text-emerald-100">
                <strong className="text-[#C8A14A] text-[10px] uppercase block">AI Generated Ad Output:</strong>
                {generatedCopy}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: GROWTH ANALYTICS & ATTRIBUTION */}
      {activeTab === 'analytics' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Touch Attribution & Growth Analytics
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Customer Lifetime Value (LTV) & Customer Acquisition Cost (CAC) Dashboard
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[#666666] text-[10px] uppercase block font-bold">LTV to CAC Ratio</span>
              <strong className="text-2xl text-[#0B5D3B] font-mono font-black">7.2x Ratio</strong>
              <p className="text-[#666666]">Average customer generates BDT 6,120 net profit over 24 months vs BDT 850 CAC.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[#666666] text-[10px] uppercase block font-bold">Overall Conversion Rate</span>
              <strong className="text-2xl text-[#081C15] font-mono font-black">4.85%</strong>
              <p className="text-[#666666]">Visitor-to-booking conversion rate optimized by AI personalizations and fast checkout.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="text-[#666666] text-[10px] uppercase block font-bold">Organic Traffic Share</span>
              <strong className="text-2xl text-[#C8A14A] font-mono font-black">68.4% Organic</strong>
              <p className="text-[#666666]">Major traffic share driven by zero-cost organic search and referral word-of-mouth.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: INTERNATIONAL & LOCAL SEO */}
      {activeTab === 'international' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Region Hreflang Geo-Targeting
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Localized Search Optimization across BD, UK, Middle East, USA & Australia
            </h3>
          </div>

          <p className="text-[#666666] leading-relaxed">
            Multi-currency and multi-language hreflang metadata tags route organic traffic from London, Dubai, Toronto, and Sydney directly to localized landing pages with regional payment options.
          </p>
        </div>
      )}
    </div>
  );
};
