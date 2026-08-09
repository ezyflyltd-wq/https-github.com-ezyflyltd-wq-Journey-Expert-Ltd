import React, { useState, useEffect } from 'react';
import {
  FileText,
  BookOpen,
  Sparkles,
  Search,
  Globe,
  Database,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Zap,
  PenTool,
  Send,
  Languages,
  ShieldCheck,
  Tag,
  Clock,
  UserCheck,
  ChevronRight,
  FolderTree,
  Share2,
  Download,
  Filter,
  BarChart3,
  SearchCheck,
  Copy,
  Check,
  HelpCircle,
  FileCheck2,
  Lock,
} from 'lucide-react';

export const CmsKnowledgeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'content-repository' | 'ai-content-writer' | 'knowledge-base' | 'media-dam' | 'seo-multilingual'
  >('content-repository');

  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // AI Content Writer Simulator State
  const [articlePrompt, setArticlePrompt] = useState('Write an updated 2026 UK Student Visa CAS Maintenance Funds guide in English & Bengali');
  const [generatingArticle, setGeneratingArticle] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);

  // Search Filter in Content Repository
  const [searchTerm, setSearchTerm] = useState('');

  // Copied state
  const [copiedDoc, setCopiedDoc] = useState(false);

  useEffect(() => {
    fetchCmsOverview();
  }, []);

  const fetchCmsOverview = () => {
    setLoading(true);
    fetch('/api/cms/overview')
      .then((res) => res.json())
      .then((data) => {
        setCmsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load CMS data:', err);
        setLoading(false);
      });
  };

  const handleGenerateArticle = () => {
    setGeneratingArticle(true);
    setTimeout(() => {
      setGeneratedArticle({
        title: 'Complete UK Student Visa (Subclass Tier 4 / Student Route) Maintenance Requirements 2026',
        banglaTitle: 'যুক্তরাজ্য স্টুডেন্ট ভিসা ২০২৬: ব্যাংক ব্যালেন্স ও ক্যাশ স্পন্সরশিপ গাইড',
        arabicTitle: 'دليل التأشيرة الدراسية للمملكة المتحدة ٢٠٢٦',
        seoScore: 99,
        readabilityScore: 'Grade 8 (High Accessibility)',
        metaDescription: 'Step-by-step guide on 28-day bank balance rules, NHS Immigration Health Surcharge, CAS deposit verification, and London vs Outer-London maintenance calculations for Bangladeshi students.',
        suggestedTags: ['#UKStudyAbroad', '#StudentVisa2026', '#CASDeposit', '#JELStudyAbroad'],
        wordCount: 1850,
      });
      setGeneratingArticle(false);
    }, 1200);
  };

  const handleCopyDoc = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - CMS & KNOWLEDGE MANAGEMENT */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE HEADLESS CMS & KNOWLEDGE REPOSITORY (PART 28)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <FileText className="w-3 h-3 text-[#C8A14A]" />
                <span>1,420 ARTICLES • TRILINGUAL (EN/BN/AR) • AI WRITER</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise CMS & Knowledge Management Platform
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Centralized Headless Content Hub for Travel Guides, Visa Rules, University Profiles, Craft Bangla Heritage Stories, Internal SOPs & Gemini AI Auto-Publishing.
            </p>
          </div>

          {/* Quick CMS Specs Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Headless Architecture:</span>
              <span className="text-white font-mono font-black text-sm">GraphQL + REST API</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Supported Languages:</span>
              <span className="text-amber-300 font-mono font-bold text-xs">EN • BN • AR</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Avg. SEO Content Score:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {cmsData?.cmsStats?.seoScoreAverage || 96}/100
              </span>
            </div>

            <button
              onClick={fetchCmsOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Content Repository</span>
            </button>
          </div>
        </div>

        {/* Global Key CMS Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Total Articles</span>
            <span className="text-lg font-black text-white font-mono">
              {(cmsData?.cmsStats?.totalArticles || 1420).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Published Pages</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {cmsData?.cmsStats?.publishedPages || 380} Pages
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Knowledge Base Docs</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {cmsData?.cmsStats?.knowledgeBaseDocs || 850} Docs
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Media Assets (DAM)</span>
            <span className="text-lg font-black text-white font-mono">
              {(cmsData?.cmsStats?.mediaAssetsCount || 12400).toLocaleString()} Files
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">AI Draft Queue</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {cmsData?.cmsStats?.aiGeneratedDrafts || 94} Pending
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Trilingual Engine</span>
            <span className="text-sm font-black text-emerald-300 font-mono">
              Active Sync
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('content-repository')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'content-repository'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Database className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Headless Content Repository</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-content-writer')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-content-writer'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Gemini AI Content Writer</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge-base')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'knowledge-base'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Internal Knowledge Base & SOPs</span>
        </button>

        <button
          onClick={() => setActiveTab('media-dam')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'media-dam'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Digital Asset Vault (DAM)</span>
        </button>

        <button
          onClick={() => setActiveTab('seo-multilingual')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'seo-multilingual'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#C8A14A]" />
          <span>5. SEO Schema & Multilingual Hub</span>
        </button>
      </div>

      {/* TAB 1: HEADLESS CONTENT REPOSITORY */}
      {activeTab === 'content-repository' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Enterprise Content Types
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Headless Content Models & Publishing Status
              </h3>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#666666] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search content types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cmsData?.contentTypes
              ?.filter((c: any) => c.type.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((ct: any, idx: number) => (
                <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                    <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {ct.status}
                    </span>
                    <span className="text-xs font-mono font-black text-[#081C15]">
                      {ct.itemsCount} Records
                    </span>
                  </div>

                  <strong className="text-sm font-bold text-[#081C15] font-serif block">{ct.type}</strong>

                  <div className="flex items-center justify-between text-[11px] text-[#666666] pt-2 border-t border-[#ECECEC]">
                    <span>Languages:</span>
                    <span className="font-mono font-bold text-[#0B5D3B]">
                      {ct.activeLanguages.join(' • ')}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: GEMINI AI CONTENT WRITER */}
      {activeTab === 'ai-content-writer' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Automated Article & Guide Generator
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Gemini AI Article Writer & SEO Auto-Optimizer
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prompt Input Box */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <Sparkles className="w-5 h-5 text-[#C8A14A]" />
                <strong className="font-serif font-black text-sm text-[#C8A14A]">
                  AI Content Generation Studio
                </strong>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-emerald-200 font-bold uppercase block">Article Prompt / Topic:</label>
                <textarea
                  rows={4}
                  value={articlePrompt}
                  onChange={(e) => setArticlePrompt(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#C8A14A]"
                />
              </div>

              <button
                onClick={handleGenerateArticle}
                disabled={generatingArticle}
                className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Zap className={`w-4 h-4 text-[#C8A14A] ${generatingArticle ? 'animate-spin' : ''}`} />
                <span>{generatingArticle ? 'Synthesizing Trilingual Article...' : 'Generate SEO-Optimized Article'}</span>
              </button>
            </div>

            {/* Live Generated Result Card */}
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <span className="font-serif font-black text-lg text-[#081C15]">Live Draft Output</span>
                {generatedArticle && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                    SEO SCORE: {generatedArticle.seoScore}/100
                  </span>
                )}
              </div>

              {generatedArticle ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#666666] uppercase block">English Title:</span>
                    <strong className="text-xs font-bold text-[#081C15] block">{generatedArticle.title}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#666666] uppercase block">Bengali Title (বাংলা):</span>
                    <strong className="text-xs font-bold text-[#0B5D3B] block">{generatedArticle.banglaTitle}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#666666] uppercase block">Meta Description:</span>
                    <p className="text-[11px] text-[#666666] leading-relaxed">{generatedArticle.metaDescription}</p>
                  </div>

                  <div className="pt-2 border-t border-[#ECECEC] flex flex-wrap gap-1.5">
                    {generatedArticle.suggestedTags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="bg-white border border-[#ECECEC] text-[#081C15] text-[10px] font-mono px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopyDoc(generatedArticle.title)}
                    className="w-full py-2 bg-[#081C15] text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 mt-2"
                  >
                    {copiedDoc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C8A14A]" />}
                    <span>{copiedDoc ? 'Copied to Clipboard!' : 'Copy Generated Draft'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-[#666666] space-y-2">
                  <BookOpen className="w-8 h-8 text-[#0B5D3B] mx-auto opacity-40" />
                  <p className="text-xs">Click "Generate SEO-Optimized Article" to view live trilingual synthesis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTERNAL KNOWLEDGE BASE & SOPS */}
      {activeTab === 'knowledge-base' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Internal Knowledge Repository & Operations Manuals
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Knowledge Repository & AI Chatbot Training Corpus
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsData?.knowledgeBaseRepository?.map((doc: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SOP DOCUMENT
                  </span>
                  <span className="text-[10px] font-mono text-[#666666]">Updated: {doc.lastUpdated}</span>
                </div>
                <strong className="text-sm font-bold text-[#081C15] block">{doc.topic}</strong>
                <p className="text-[11px] text-[#666666]">
                  Target Audience: <strong className="text-[#0B5D3B]">{doc.audience}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DIGITAL ASSET VAULT (DAM) */}
      {activeTab === 'media-dam' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Cloudinary Asset Vault & Media CDN
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Digital Asset Management (DAM) & Auto Image Optimization
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] text-center space-y-2">
              <ImageIcon className="w-6 h-6 text-[#0B5D3B] mx-auto" />
              <strong className="text-xs font-bold text-[#081C15] block">Destination Photos</strong>
              <span className="text-[10px] font-mono text-[#666666]">6,400 Files (WebP/AVIF)</span>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] text-center space-y-2">
              <FileText className="w-6 h-6 text-[#0B5D3B] mx-auto" />
              <strong className="text-xs font-bold text-[#081C15] block">University Prospectuses</strong>
              <span className="text-[10px] font-mono text-[#666666]">1,850 PDF Documents</span>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] text-center space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#0B5D3B] mx-auto" />
              <strong className="text-xs font-bold text-[#081C15] block">Embassy Visa Checklists</strong>
              <span className="text-[10px] font-mono text-[#666666]">1,200 Official Forms</span>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] text-center space-y-2">
              <Tag className="w-6 h-6 text-[#0B5D3B] mx-auto" />
              <strong className="text-xs font-bold text-[#081C15] block">Craft Bangla Products</strong>
              <span className="text-[10px] font-mono text-[#666666]">2,950 Ultra-HD Photos</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SEO SCHEMA & MULTILINGUAL HUB */}
      {activeTab === 'seo-multilingual' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Trilingual Publishing Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Multilingual SEO & Dynamic Schema.org Generator
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
            <span className="font-serif font-black text-sm text-[#C8A14A] block">Sample JSON-LD Structured Schema Output</span>
            <pre className="bg-black/50 p-4 rounded-2xl font-mono text-[11px] text-emerald-300 overflow-x-auto border border-white/10">
{`{
  "@context": "https://schema.org",
  "@type": "TripReservation",
  "reservationNumber": "JEL-RESERV-8820",
  "underName": { "@type": "Person", "name": "Engr. Tanvir Ahmed" },
  "reservationFor": {
    "@type": "Flight",
    "flightNumber": "EK-583",
    "provider": "Emirates",
    "departureAirport": { "name": "Dhaka Hazrat Shahjalal Intl", "iataCode": "DAC" },
    "arrivalAirport": { "name": "London Heathrow", "iataCode": "LHR" }
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
