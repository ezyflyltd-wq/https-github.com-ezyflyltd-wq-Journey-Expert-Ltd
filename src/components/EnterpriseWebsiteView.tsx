import React, { useState, useEffect } from 'react';
import {
  Palette,
  Layout,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Search,
  Plane,
  Hotel,
  Compass,
  FileCheck,
  GraduationCap,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Code2,
  Gauge,
  Sliders,
  Type,
  Maximize2,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Sparkle,
  Cpu,
  Monitor,
} from 'lucide-react';

export const EnterpriseWebsiteView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'design-tokens' | 'component-library' | 'multi-brand' | 'sitemap-architecture' | 'seo-performance'
  >('design-tokens');

  const [designData, setDesignData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Interactive Booking Widget Preview State
  const [widgetTab, setWidgetTab] = useState<'flight' | 'hotel' | 'visa' | 'study'>('flight');

  useEffect(() => {
    fetchDesignSystem();
  }, []);

  const fetchDesignSystem = () => {
    setLoading(true);
    fetch('/api/website/design-system')
      .then((res) => res.json())
      .then((data) => {
        setDesignData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Design System Data:', err);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - ENTERPRISE WEBSITE & DESIGN SYSTEM */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE FRONTEND UX/UI & DESIGN SYSTEM (PART 27)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Palette className="w-3 h-3 text-[#C8A14A]" />
                <span>APPLE & STRIPE-LEVEL UX • LIGHTHOUSE 98+ SCORE</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise Website & Brand Design System
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Global Multi-Brand Digital Architecture uniting Luxury OTA, Study Abroad, Visa Consultancy, Corporate Travel, Craft Bangla & VIP Airport Concierge.
            </p>
          </div>

          {/* Quick Design System Specs */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Primary Brand Palette:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">#0B5D3B & #C8A14A</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Display Typography:</span>
              <span className="text-white font-mono font-bold text-xs">Space Grotesk / Manrope</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Core Web Vitals LCP:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">&lt; 1.2s (Pass)</span>
            </div>

            <button
              onClick={fetchDesignSystem}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Design System Tokens</span>
            </button>
          </div>
        </div>

        {/* Design System Key Standards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Grid Architecture</span>
            <span className="text-sm font-black text-white font-mono">8pt Metric System</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Accessibility</span>
            <span className="text-sm font-black text-emerald-300 font-mono">WCAG 2.1 AA</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Component Scale</span>
            <span className="text-sm font-black text-amber-300 font-mono">48+ Atomic Components</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Multi-Brand Hub</span>
            <span className="text-sm font-black text-white font-mono">5 Sister Brands</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Structured SEO</span>
            <span className="text-sm font-black text-emerald-300 font-mono">Schema.org Rich</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Motion System</span>
            <span className="text-sm font-black text-[#C8A14A] font-mono">Framer Motion</span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('design-tokens')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'design-tokens'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Palette className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Brand Tokens & Color Palette</span>
        </button>

        <button
          onClick={() => setActiveTab('component-library')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'component-library'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layout className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Hero Search & Component Library</span>
        </button>

        <button
          onClick={() => setActiveTab('multi-brand')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'multi-brand'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Multi-Brand Sister Ecosystem</span>
        </button>

        <button
          onClick={() => setActiveTab('sitemap-architecture')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'sitemap-architecture'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Master Sitemap & UX Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('seo-performance')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'seo-performance'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Gauge className="w-4 h-4 text-[#C8A14A]" />
          <span>5. SEO, Vitals & Accessibility</span>
        </button>
      </div>

      {/* TAB 1: DESIGN TOKENS & COLOR PALETTE */}
      {activeTab === 'design-tokens' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Luxury Brand Visual System
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Design Tokens & Color Palette Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl border border-[#ECECEC] space-y-3 bg-[#0B5D3B] text-white shadow-md">
              <span className="text-[10px] font-bold uppercase opacity-80 block">Primary Green</span>
              <strong className="text-lg font-mono font-black block">#0B5D3B</strong>
              <p className="text-[11px] opacity-90">Core OTA Brand Identity, Trust, Luxury Travel Canvas</p>
            </div>

            <div className="p-4 rounded-2xl border border-[#ECECEC] space-y-3 bg-[#C8A14A] text-[#081C15] shadow-md">
              <span className="text-[10px] font-bold uppercase opacity-80 block">Secondary Gold</span>
              <strong className="text-lg font-mono font-black block">#C8A14A</strong>
              <p className="text-[11px] opacity-90">VIP Elite Badges, Crown Icons, Accents & CTAs</p>
            </div>

            <div className="p-4 rounded-2xl border border-[#ECECEC] space-y-3 bg-[#D62828] text-white shadow-md">
              <span className="text-[10px] font-bold uppercase opacity-80 block">Accent Crimson</span>
              <strong className="text-lg font-mono font-black block">#D62828</strong>
              <p className="text-[11px] opacity-90">Urgency Tags, Craft Bangla Heritage, Special Deals</p>
            </div>

            <div className="p-4 rounded-2xl border border-[#ECECEC] space-y-3 bg-[#081C15] text-white shadow-md">
              <span className="text-[10px] font-bold uppercase opacity-80 block">Deep Emerald Canvas</span>
              <strong className="text-lg font-mono font-black block">#081C15</strong>
              <p className="text-[11px] opacity-90">Dark Luxury Hero Backgrounds, Footer & Concierge Modals</p>
            </div>

            <div className="p-4 rounded-2xl border border-[#ECECEC] space-y-3 bg-[#FFFFFF] text-[#111111] shadow-md">
              <span className="text-[10px] font-bold uppercase text-[#666666] block">Pure White Background</span>
              <strong className="text-lg font-mono font-black block">#FFFFFF</strong>
              <p className="text-[11px] text-[#666666]">Crisp Light Canvas, High-Contrast Typography</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#ECECEC]">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Type className="w-5 h-5 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Typography Scale & Hierarchy</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                Display: Space Grotesk (Hero & Metrics) • Headings: Manrope (Section Titles) • Body: Inter (Crisp Legibility). Perfect Fourth ratio (1.333) ensures mathematical typographic harmony.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Sliders className="w-5 h-5 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">8pt Spatial Grid & Glassmorphism</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                All padding, margins, and component heights adhere strictly to the 8px multiplier grid. Backdrop blur filters (`backdrop-blur-md`) are calibrated for subtle glass effects.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPONENT LIBRARY & HERO SEARCH */}
      {activeTab === 'component-library' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Interactive Booking Components
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Universal Multi-Vertical Booking Widget Showcase
              </h3>
            </div>
            <div className="flex space-x-1 bg-[#F8FAF9] p-1 rounded-2xl border border-[#ECECEC]">
              <button
                onClick={() => setWidgetTab('flight')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  widgetTab === 'flight' ? 'bg-[#0B5D3B] text-white' : 'text-[#666666]'
                }`}
              >
                Flight
              </button>
              <button
                onClick={() => setWidgetTab('hotel')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  widgetTab === 'hotel' ? 'bg-[#0B5D3B] text-white' : 'text-[#666666]'
                }`}
              >
                Hotel
              </button>
              <button
                onClick={() => setWidgetTab('visa')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  widgetTab === 'visa' ? 'bg-[#0B5D3B] text-white' : 'text-[#666666]'
                }`}
              >
                Visa
              </button>
              <button
                onClick={() => setWidgetTab('study')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  widgetTab === 'study' ? 'bg-[#0B5D3B] text-white' : 'text-[#666666]'
                }`}
              >
                Study Abroad
              </button>
            </div>
          </div>

          {/* Simulated Booking Card Component */}
          <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-serif font-black text-sm text-[#C8A14A] flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>
                  {widgetTab === 'flight' && 'Instant Multi-GDS Flight Search (Sabre • Amadeus • Duffel)'}
                  {widgetTab === 'hotel' && 'Global Hotelbeds & Expedia Partner Search'}
                  {widgetTab === 'visa' && 'Direct Embassy Visa Eligibility Check'}
                  {widgetTab === 'study' && 'Global University Course & Scholarship Matcher'}
                </span>
              </span>
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-2.5 py-0.5 rounded-full">
                AI SMART ROUTE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 space-y-1">
                <span className="text-[10px] text-emerald-200 uppercase font-bold block">From / Origin</span>
                <strong className="text-sm font-bold text-white block">Dhaka (DAC) - Bangladesh</strong>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 space-y-1">
                <span className="text-[10px] text-emerald-200 uppercase font-bold block">To / Destination</span>
                <strong className="text-sm font-bold text-white block">
                  {widgetTab === 'flight' || widgetTab === 'hotel' ? 'London Heathrow (LHR)' : 'United Kingdom'}
                </strong>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 space-y-1">
                <span className="text-[10px] text-emerald-200 uppercase font-bold block">Travel Date</span>
                <strong className="text-sm font-bold text-white block">15 Sep 2026</strong>
              </div>

              <button className="bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold rounded-2xl p-3 shadow-lg flex items-center justify-center space-x-2">
                <span>Search {widgetTab.toUpperCase()}</span>
                <ChevronRight className="w-4 h-4 text-[#C8A14A]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-BRAND SISTER ECOSYSTEM */}
      {activeTab === 'multi-brand' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Brand Architecture
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey Expert Group Sister Ventures
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designData?.multiBrandArchitecture?.map((b: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <strong className="font-serif font-black text-sm text-[#081C15]">{b.brand}</strong>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{b.tagline}</p>
                <span className="text-[10px] font-mono font-bold text-[#0B5D3B] block">Integrated under Single Sign-On (SSO)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MASTER SITEMAP & UX FLOW */}
      {activeTab === 'sitemap-architecture' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Global Platform Navigation Matrix
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Enterprise Sitemap & UX Routing Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {designData?.siteMapOverview?.map((cat: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <strong className="font-serif font-black text-sm text-[#081C15] border-b border-[#ECECEC] pb-2 block">
                  {cat.category}
                </strong>
                <ul className="space-y-2 text-xs font-mono text-[#666666]">
                  {cat.pages.map((p: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-center space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#0B5D3B]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SEO, CORE WEB VITALS & ACCESSIBILITY */}
      {activeTab === 'seo-performance' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Performance Engineering & Standards
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              SEO, Core Web Vitals & Accessibility Compliance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <Gauge className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Lighthouse 98+ Goal</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                Largest Contentful Paint (LCP) &lt; 1.2s • Cumulative Layout Shift (CLS) = 0.00 • First Input Delay (FID) &lt; 50ms.
              </p>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">WCAG 2.1 AA Compliant</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                4.5:1 minimum contrast ratio for body copy, keyboard navigation support, screen reader ARIA labels on all interactive controls.
              </p>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <Code2 className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Schema.org Rich Snippets</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                Structured JSON-LD markup embedded for TripReservation, TravelAgency, EducationalOrganization, and ProductCatalog.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
