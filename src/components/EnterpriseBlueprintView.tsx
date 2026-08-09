import React, { useState, useEffect } from 'react';
import {
  Layers,
  Database,
  ShieldCheck,
  Cpu,
  Globe2,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  Workflow,
  Sparkles,
  RefreshCw,
  Award,
  FileText,
  BarChart2,
  Code,
  Globe,
  Terminal,
  Activity,
  ChevronRight,
  ExternalLink,
  Users,
  Briefcase,
  Building,
  Headphones,
  Smartphone,
  Plane,
  GraduationCap,
  HeartHandshake,
  Bot,
  BrainCircuit,
  Share2,
} from 'lucide-react';

export const EnterpriseBlueprintView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'master-layers' | 'module-map' | 'security-compliance' | 'tech-stack' | 'final-roadmap'
  >('master-layers');

  const [blueprintData, setBlueprintData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Module Category Filter
  const [selectedModuleCategory, setSelectedModuleCategory] = useState<string>('ALL');

  useEffect(() => {
    fetchBlueprintOverview();
  }, []);

  const fetchBlueprintOverview = () => {
    setLoading(true);
    fetch('/api/enterprise-blueprint/overview')
      .then((res) => res.json())
      .then((data) => {
        setBlueprintData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load enterprise blueprint overview:', err);
        setLoading(false);
      });
  };

  const all44Modules = [
    { id: 1, name: 'Enterprise Website & Brand Hub', category: 'Frontend', status: 'ACTIVE' },
    { id: 2, name: 'Sabre GDS Flight OTA Booking Engine', category: 'Core OTA', status: 'ACTIVE' },
    { id: 3, name: 'Amadeus & Travelport NDC Connectors', category: 'Core OTA', status: 'ACTIVE' },
    { id: 4, name: 'Wholesale Hotel & Resort Booking System', category: 'Core OTA', status: 'ACTIVE' },
    { id: 5, name: 'Holiday Packages & Custom Itinerary Planner', category: 'Core OTA', status: 'ACTIVE' },
    { id: 6, name: 'Study Abroad University Directory & Course Search', category: 'Education Mobility', status: 'ACTIVE' },
    { id: 7, name: 'CAS Letter & Offer Letter Verification Portal', category: 'Education Mobility', status: 'ACTIVE' },
    { id: 8, name: 'Global Scholarship & Financial Proof Vault', category: 'Education Mobility', status: 'ACTIVE' },
    { id: 9, name: 'Visa Application Tracker & Document Checklist', category: 'Visa Services', status: 'ACTIVE' },
    { id: 10, name: 'Embassy Appointment & OCR Verification', category: 'Visa Services', status: 'ACTIVE' },
    { id: 11, name: 'Nusuk Integrated Hajj & Umrah Portal', category: 'Religious Tourism', status: 'ACTIVE' },
    { id: 12, name: 'Makkah & Madinah Hotel Inventory Manager', category: 'Religious Tourism', status: 'ACTIVE' },
    { id: 13, name: 'Bangkok & Penang Medical Tourism Concierge', category: 'Healthcare Travel', status: 'ACTIVE' },
    { id: 14, name: 'Air Ambulance & Hospital Escort Dispatch', category: 'Healthcare Travel', status: 'ACTIVE' },
    { id: 15, name: 'Craft Bangla Artisan Heritage Marketplace', category: 'Digital Commerce', status: 'ACTIVE' },
    { id: 16, name: 'Customer Mobile SuperApp (iOS & Android)', category: 'Frontend', status: 'ACTIVE' },
    { id: 17, name: 'B2B Travel Agent Portal & Credit Wallet', category: 'B2B Platform', status: 'ACTIVE' },
    { id: 18, name: 'Master Franchise & Authorized Agent Portal', category: 'B2B Platform', status: 'ACTIVE' },
    { id: 19, name: 'White Label B2B SaaS OTA Engine', category: 'Enterprise SaaS', status: 'ACTIVE' },
    { id: 20, name: 'Corporate Self-Booking Tool (CSBT) & Expense Wallet', category: 'Corporate Travel', status: 'ACTIVE' },
    { id: 21, name: 'Corporate Group Flight & Invoicing Hub', category: 'Corporate Travel', status: 'ACTIVE' },
    { id: 22, name: 'Multi-Currency ERP Ledger & General Ledger', category: 'ERP & Finance', status: 'ACTIVE' },
    { id: 23, name: 'Automated Invoicing & Tax Compliance (NBR)', category: 'ERP & Finance', status: 'ACTIVE' },
    { id: 24, name: 'SSLCommerz, bKash & Stripe Gateway Proxy', category: 'Payment Gateway', status: 'ACTIVE' },
    { id: 25, name: 'Enterprise HRMS & Payroll System', category: 'HRMS', status: 'ACTIVE' },
    { id: 26, name: 'Employee Performance & Attendance Tracker', category: 'HRMS', status: 'ACTIVE' },
    { id: 27, name: 'Angela AI Autonomous Travel Agent', category: 'AI Intelligence', status: 'ACTIVE' },
    { id: 28, name: 'Multilingual Voice AI Contact Center (CCaaS)', category: 'AI Intelligence', status: 'ACTIVE' },
    { id: 29, name: 'AI Dynamic Pricing & Revenue Management', category: 'AI Intelligence', status: 'ACTIVE' },
    { id: 30, name: 'AI Fraud Detection & Risk Mitigation', category: 'AI Intelligence', status: 'ACTIVE' },
    { id: 31, name: 'Unified Single Customer Profile CRM (MDM)', category: 'CRM & MDM', status: 'ACTIVE' },
    { id: 32, name: 'Support Ticket System & WhatsApp Cloud API', category: 'Customer Support', status: 'ACTIVE' },
    { id: 33, name: 'Growth Marketing & Omnichannel Automation', category: 'Marketing', status: 'ACTIVE' },
    { id: 34, name: 'Zero-Trust Cybersecurity & WAF Shield', category: 'Security', status: 'ACTIVE' },
    { id: 35, name: 'PCI-DSS Tokenization & Vault Manager', category: 'Security', status: 'ACTIVE' },
    { id: 36, name: 'Real-Time Executive BI Dashboard & CEO Suite', category: 'Analytics', status: 'ACTIVE' },
    { id: 37, name: 'Data Warehouse & Predictive ML Pipeline', category: 'Analytics', status: 'ACTIVE' },
    { id: 38, name: 'International Expansion & Regional HQ Manager', category: 'Global Expansion', status: 'ACTIVE' },
    { id: 39, name: 'Global BD CRM & Partner Pipeline Manager', category: 'Global Expansion', status: 'ACTIVE' },
    { id: 40, name: 'Journey AI 2030 Future Companion Lab', category: 'Innovation Lab', status: 'ACTIVE' },
    { id: 41, name: 'Decentralized Digital Identity & Passport Vault', category: 'Innovation Lab', status: 'ACTIVE' },
    { id: 42, name: 'Spatial 3D Metaverse Destination Tour Engine', category: 'Innovation Lab', status: 'ACTIVE' },
    { id: 43, name: 'Smart Tourism IoT & Halal Dining Radar', category: 'Innovation Lab', status: 'ACTIVE' },
    { id: 44, name: 'Enterprise Master Architecture Blueprint & Orchestrator', category: 'Architecture', status: 'ACTIVE' }
  ];

  const filteredModules = all44Modules.filter((m) => {
    if (selectedModuleCategory === 'ALL') return true;
    return m.category === selectedModuleCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - MASTER SYSTEM INTEGRATION BLUEPRINT (PART 44) */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • FINAL MASTER SYSTEM BLUEPRINT (PART 44)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Workflow className="w-3 h-3 text-[#C8A14A]" />
                <span>COMPLETE 44-MODULE UNIFIED ARCHITECTURE</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise Global AI OTA System Integration Architecture
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              The Master Operating Blueprint connecting all 44 business modules into a single production-ready, AI-native, globally scalable, zero-trust certified ecosystem.
            </p>
          </div>

          {/* Quick Metrics Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Integrated System Modules:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {blueprintData?.metrics?.totalIntegratedModules || 44} / 44 Active
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Microservices Uptime SLA:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {blueprintData?.metrics?.microservicesHealthScorePct || 99.98}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>24h API Gateway Calls:</span>
              <span className="text-amber-300 font-mono font-black text-xs">
                {blueprintData?.metrics?.globalApiGatewayCalls24h?.toLocaleString() || '18,450,000'}
              </span>
            </div>

            <button
              onClick={fetchBlueprintOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Enterprise Architecture Telemetry</span>
            </button>
          </div>
        </div>

        {/* System Health Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Secured Database Clusters</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {blueprintData?.metrics?.activeSecuredDatabaseClusters || 12} Relational/NoSQL
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Zero-Trust Compliance</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">
              {blueprintData?.metrics?.zeroTrustComplianceScorePct || 100}% Certified
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Total Users Served</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">
              {blueprintData?.metrics?.totalGlobalUsersServed?.toLocaleString() || '2,450,000'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Industry Accreditations</span>
            <strong className="text-white font-mono text-xs mt-0.5">IATA • PCI-DSS • ISO 27001</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Ecosystem Status</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">FULLY INTEGRATED</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('master-layers')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'master-layers'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Architecture Layers & Data Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('module-map')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'module-map'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Workflow className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Complete 44-Module Integration Map</span>
        </button>

        <button
          onClick={() => setActiveTab('security-compliance')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'security-compliance'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Enterprise Security & Compliance</span>
        </button>

        <button
          onClick={() => setActiveTab('tech-stack')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'tech-stack'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Code className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Technology Stack & Cloud Infrastructure</span>
        </button>

        <button
          onClick={() => setActiveTab('final-roadmap')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'final-roadmap'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Final Implementation & Scaling Roadmap</span>
        </button>
      </div>

      {/* TAB 1: ARCHITECTURE LAYERS & DATA FLOW */}
      {activeTab === 'master-layers' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              System Topology
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              5-Layer Enterprise Integration & Synchronous Data Routing
            </h3>
          </div>

          <div className="space-y-4">
            {blueprintData?.ecosystemLayers?.map((lay: any, lIdx: number) => (
              <div key={lIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <strong className="text-base font-bold text-[#081C15] font-serif">{lay.layer}</strong>
                  <span className="bg-[#0B5D3B] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    LAYER {lIdx + 1} ONLINE
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{lay.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMPLETE 44-MODULE INTEGRATION MAP */}
      {activeTab === 'module-map' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Master Directory
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Complete 44 Active Enterprise Business Modules
              </h3>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {['ALL', 'Frontend', 'Core OTA', 'Education Mobility', 'Visa Services', 'AI Intelligence'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedModuleCategory(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedModuleCategory === c
                      ? 'bg-[#0B5D3B] text-white'
                      : 'bg-[#F8FAF9] text-[#666666] border border-[#ECECEC]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredModules.map((mod) => (
              <div key={mod.id} className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC] flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <span className="text-[10px] text-[#0B5D3B] font-mono font-bold block">
                    Part #{mod.id} • {mod.category}
                  </span>
                  <strong className="text-xs font-bold text-[#081C15] font-serif block line-clamp-1">{mod.name}</strong>
                </div>
                <span className="bg-emerald-800 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {mod.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ENTERPRISE SECURITY & COMPLIANCE */}
      {activeTab === 'security-compliance' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Certifications & Defense
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Zero-Trust Security, PCI-DSS, GDPR & ISO 27001 Accreditations
            </h3>
          </div>

          <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-500/40 space-y-3 font-mono">
            <strong className="text-[#C8A14A] font-serif text-base font-bold block">
              Official Enterprise Certifications & Compliance Status:
            </strong>
            <p className="text-emerald-100 text-xs leading-relaxed">
              {blueprintData?.systemCertification || 'IATA Certified OTA • Civil Aviation Approved • PCI-DSS Compliant • ISO 27001 Certified • GDPR Ready'}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: TECHNOLOGY STACK & CLOUD INFRASTRUCTURE */}
      {activeTab === 'tech-stack' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Tech Stack Specification
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Production Stack: React, TypeScript, Node.js, Express, PostgreSQL & Gemini AI
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Frontend & SuperApp</strong>
              <p className="text-xs text-[#666666]">React 18+, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Vite.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Backend & AI Engine</strong>
              <p className="text-xs text-[#666666]">Node.js Express, ESBuild CJS Bundle, @google/genai SDK, Sabre GDS APIs.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FINAL IMPLEMENTATION & SCALING ROADMAP */}
      {activeTab === 'final-roadmap' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Strategic Execution
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              5-Phase Master Deployment Roadmap (Phases 1 through 5 Complete)
            </h3>
          </div>

          <div className="space-y-3">
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Phase 1: Foundation & Core OTA (Parts 1 - 10)</strong>
              <p className="text-xs text-[#666666]">Sabre Flight Engine, Hotels, Visas, Study Abroad, CRM & Angela AI.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Phase 2: Business Verticals & Commerce (Parts 11 - 25)</strong>
              <p className="text-xs text-[#666666]">Hajj Nusuk, Medical Tourism, Craft Bangla, Corporate Travel, ERP & HRMS.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Phase 3: Platforms & Security (Parts 26 - 36)</strong>
              <p className="text-xs text-[#666666]">B2B Agent Portal, Mobile SuperApp, Cybersecurity, BI CEO Suite & Investor Deck.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Phase 4: Global Scale & Operations (Parts 37 - 42)</strong>
              <p className="text-xs text-[#666666]">Growth Marketing, Voice AI Contact Center & International Expansion Network.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <strong className="text-sm font-bold text-[#081C15] block">Phase 5: Future Innovation & Master Architecture (Parts 43 - 44)</strong>
              <p className="text-xs text-[#666666]">Journey AI 2030, Digital Identity Vault & Final Unified Enterprise Blueprint.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
