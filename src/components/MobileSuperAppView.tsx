import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Mic,
  Search,
  Sparkles,
  ShieldCheck,
  QrCode,
  Bell,
  Navigation,
  Wallet,
  Briefcase,
  Users,
  Building2,
  Plane,
  Hotel,
  Compass,
  FileCheck,
  GraduationCap,
  RefreshCw,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  WifiOff,
  AlertOctagon,
  Download,
  Fingerprint,
  Send,
  Layers,
  MapPin,
  Clock,
  ChevronRight,
  Globe,
} from 'lucide-react';

export const MobileSuperAppView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'customer-ai' | 'agent-corporate' | 'digital-vault' | 'push-gps' | 'tech-security'
  >('customer-ai');

  const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Natural Language AI Mobile Search Simulator
  const [nlQuery, setNlQuery] = useState<string>('Plan a 7-day family trip to Malaysia under 2 lakh taka');
  const [isAiSearching, setIsAiSearching] = useState<boolean>(false);
  const [aiSearchResult, setAiSearchResult] = useState<any>(null);

  // Digital Vault Simulated Download/Sync
  const [vaultPasses, setVaultPasses] = useState([
    {
      id: 'PASS-778',
      title: 'Biman Bangladesh BG-201 e-Boarding Pass',
      route: 'DAC -> LHR (Dhaka to London Heathrow)',
      passenger: 'Tanvir Ahmed',
      seat: '14A (Window)',
      status: 'OFFLINE_SYNCED',
      qrData: 'JEL-BG201-DAC-LHR-14A-778',
      date: '2026-09-15'
    },
    {
      id: 'VISA-882',
      title: 'United Kingdom Student Visa (eVisa)',
      route: 'CAS ID: 948201948 - University of Manchester',
      passenger: 'Tanvir Ahmed',
      status: 'OFFLINE_SYNCED',
      qrData: 'UK-EVISA-CAS-948201948',
      date: 'Valid till 2029'
    }
  ]);

  const [downloadingPassId, setDownloadingPassId] = useState<string | null>(null);

  useEffect(() => {
    fetchMobileOverview();
  }, []);

  const fetchMobileOverview = () => {
    setLoading(true);
    fetch('/api/mobile-superapp/overview')
      .then((res) => res.json())
      .then((data) => {
        setOverviewData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load mobile super app overview:', err);
        setLoading(false);
      });
  };

  const handleNlSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;

    setIsAiSearching(true);
    setAiSearchResult(null);

    setTimeout(() => {
      setAiSearchResult({
        packageName: 'Custom 7-Day Malaysia Family Super Package',
        budgetTotalBDT: '৳ 185,000 BDT (Saved ৳ 15,000 below budget)',
        flight: {
          airline: 'Batik Air (OD-161)',
          route: 'Dhaka (DAC) -> Kuala Lumpur (KUL) Roundtrip',
          baggage: '30kg Included',
          passengers: '2 Adults, 1 Child'
        },
        hotel: {
          name: 'Dorsett Kuala Lumpur (4-Star Family Suite)',
          nights: '6 Nights with Daily Halal Breakfast',
          location: 'Bukit Bintang, KL'
        },
        activities: [
          'Genting Highlands Cable Car & Skytropolis Day Pass',
          'Sunway Lagoon Theme Park Family Pass',
          'Kuala Lumpur City & Petronas Twin Towers Tour'
        ],
        visa: 'Malaysia e-Visa Express Processing Included for 3 Applicants'
      });
      setIsAiSearching(false);
    }, 1200);
  };

  const handleSyncOfflinePass = (id: string) => {
    setDownloadingPassId(id);
    setTimeout(() => {
      setVaultPasses((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'ENCRYPTED_VAULT_SAVED' } : p))
      );
      setDownloadingPassId(null);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - MOBILE SUPER APP ARCHITECTURE */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • MOBILE SUPER APP ECOSYSTEM (PART 38)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Smartphone className="w-3 h-3 text-[#C8A14A]" />
                <span>FLUTTER & REACT NATIVE • CROSS-PLATFORM B2C / B2B / PARTNER</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise Mobile Super App Ecosystem
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Unified mobile experience for B2C Travelers, B2B Sub-Agents, Corporate Managers, Suppliers & Field Operations. Featuring Natural Language Voice AI, Encrypted Digital Pass Vault & Airport Indoor GPS Navigation.
            </p>
          </div>

          {/* Quick Telemetry Widget */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active Installed Devices:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {overviewData?.activeDevicesInstalled || '348,200 Devices'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Push Stream Delivery:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {overviewData?.pushNotificationSuccessRate || '99.82%'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Offline Sync Latency:</span>
              <span className="text-white font-mono font-black text-xs">
                {overviewData?.offlineVaultSyncLatencyMs || '45ms'}
              </span>
            </div>

            <button
              onClick={fetchMobileOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Mobile Telemetry</span>
            </button>
          </div>
        </div>

        {/* Mobile App Suite Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Customer App</span>
            <strong className="text-white font-mono text-xs mt-0.5">240K Active Users</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">B2B Agent Portal</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">14.8K Agents</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Partner / Supplier</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">3.2K Vendors</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Corporate App</span>
            <strong className="text-white font-mono text-xs mt-0.5">620 Enterprises</strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Field Operations</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">1,150 Staff</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('customer-ai')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'customer-ai'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Smartphone className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Customer Super App & Natural Language AI</span>
        </button>

        <button
          onClick={() => setActiveTab('agent-corporate')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'agent-corporate'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Agent, Supplier & Corporate Apps</span>
        </button>

        <button
          onClick={() => setActiveTab('digital-vault')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'digital-vault'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Wallet className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Digital Wallet & Encrypted Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('push-gps')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'push-gps'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Navigation className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Push Streams & Airport Indoor GPS</span>
        </button>

        <button
          onClick={() => setActiveTab('tech-security')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'tech-security'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Fingerprint className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Tech Stack & Mobile Security</span>
        </button>
      </div>

      {/* TAB 1: CUSTOMER SUPER APP & NATURAL LANGUAGE AI SEARCH */}
      {activeTab === 'customer-ai' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Customer Mobile Experience
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                AI-Powered Natural Language & Voice Search Simulator
              </h3>
            </div>
            <span className="bg-[#F8FAF9] border border-[#ECECEC] px-3 py-1.5 rounded-xl font-mono text-[10px] text-emerald-800 font-bold flex items-center space-x-1 self-start sm:self-auto">
              <Mic className="w-3.5 h-3.5 text-[#C8A14A]" />
              <span>Bangla, English & Arabic Voice Support</span>
            </span>
          </div>

          <form onSubmit={handleNlSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={nlQuery}
                  onChange={(e) => setNlQuery(e.target.value)}
                  placeholder="e.g. Plan a 7-day family trip to Malaysia under 2 lakh taka..."
                  className="w-full p-4 pl-10 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
                <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-4" />
              </div>

              <button
                type="submit"
                disabled={isAiSearching}
                className="w-full sm:w-auto px-6 py-4 bg-[#081C15] text-white font-extrabold rounded-2xl hover:bg-[#0B5D3B] transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#C8A14A]" />
                <span>{isAiSearching ? 'AI Bundling Itinerary...' : 'Generate AI Package'}</span>
              </button>
            </div>
          </form>

          {/* AI SEARCH RESULT OUTPUT */}
          {aiSearchResult && (
            <div className="p-6 bg-[#081C15] text-white rounded-3xl border border-[#C8A14A]/40 space-y-4 shadow-xl animate-fade-in text-xs font-mono">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <div className="flex items-center space-x-2 text-[#C8A14A]">
                  <Sparkles className="w-5 h-5" />
                  <strong className="font-serif text-sm text-white">{aiSearchResult.packageName}</strong>
                </div>
                <span className="bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full font-bold">
                  {aiSearchResult.budgetTotalBDT}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                    <Plane className="w-4 h-4 text-[#C8A14A]" />
                    <span>Flight Reservation</span>
                  </div>
                  <p className="text-white text-xs">{aiSearchResult.flight.airline}</p>
                  <p className="text-emerald-100/70 text-[11px]">{aiSearchResult.flight.route}</p>
                  <p className="text-emerald-200 text-[10px]">{aiSearchResult.flight.passengers} • {aiSearchResult.flight.baggage}</p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                    <Hotel className="w-4 h-4 text-[#C8A14A]" />
                    <span>Hotel & Accommodation</span>
                  </div>
                  <p className="text-white text-xs">{aiSearchResult.hotel.name}</p>
                  <p className="text-emerald-100/70 text-[11px]">{aiSearchResult.hotel.location}</p>
                  <p className="text-emerald-200 text-[10px]">{aiSearchResult.hotel.nights}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                  <Compass className="w-4 h-4 text-[#C8A14A]" />
                  <span>Excursions & Visas Included</span>
                </div>
                <ul className="list-disc list-inside text-emerald-100/80 text-[11px] space-y-1">
                  {aiSearchResult.activities.map((act: string, idx: number) => (
                    <li key={idx}>{act}</li>
                  ))}
                  <li className="text-amber-300 font-bold">{aiSearchResult.visa}</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button className="px-5 py-2.5 bg-[#C8A14A] hover:bg-amber-500 text-[#081C15] font-black rounded-xl transition-all flex items-center space-x-2">
                  <span>1-Tap Mobile Instant Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AGENT, SUPPLIER & CORPORATE APPS */}
      {activeTab === 'agent-corporate' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise B2B & Internal Suite
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Dedicated Applications for B2B Agents, Suppliers & Corporate Desk
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B] font-bold">
                <Briefcase className="w-5 h-5 text-[#C8A14A]" />
                <span className="text-sm font-serif text-[#081C15]">B2B Sub-Agent Mobile Portal</span>
              </div>
              <p className="text-xs text-[#666666]">
                Instant ticket issuance via GDS, B2B sub-agent wallet top-up via bKash/Nagad/SSLCommerz, fare hold controls & automated commission statement generation.
              </p>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full inline-block">
                14,800 Active Agents
              </span>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B] font-bold">
                <Building2 className="w-5 h-5 text-[#C8A14A]" />
                <span className="text-sm font-serif text-[#081C15]">Partner & Supplier App</span>
              </div>
              <p className="text-xs text-[#666666]">
                Hoteliers, Tour operators & Transport vendors manage live inventory, confirm booking vouchers, override room pricing & review monthly payout settlements.
              </p>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full inline-block">
                3,200 Connected Vendors
              </span>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B] font-bold">
                <Users className="w-5 h-5 text-[#C8A14A]" />
                <span className="text-sm font-serif text-[#081C15]">Corporate Travel App</span>
              </div>
              <p className="text-xs text-[#666666]">
                Multi-level employee trip approval workflows, automated corporate budget cap enforcement, GST/VAT invoice generation & flight rebooking.
              </p>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full inline-block">
                620 Enterprise Accounts
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIGITAL WALLET & ENCRYPTED VAULT */}
      {activeTab === 'digital-vault' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Offline Security & Storage
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Digital Travel Wallet & Encrypted Offline Vault
              </h3>
            </div>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-mono text-[10px] font-bold flex items-center space-x-1">
              <WifiOff className="w-3.5 h-3.5 text-[#0B5D3B]" />
              <span>100% Offline Access Supported</span>
            </span>
          </div>

          <div className="space-y-4">
            {vaultPasses.map((pass) => (
              <div key={pass.id} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4 text-[#C8A14A]" />
                    <strong className="text-sm font-bold text-[#081C15] font-serif">{pass.title}</strong>
                  </div>
                  <p className="text-xs text-[#666666]">{pass.route}</p>
                  <p className="text-[10px] text-[#0B5D3B] font-mono">Passenger: {pass.passenger} • {pass.seat || pass.date}</p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {pass.status}
                  </span>
                  <button
                    onClick={() => handleSyncOfflinePass(pass.id)}
                    disabled={downloadingPassId === pass.id}
                    className="px-4 py-2 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <Download className={`w-3.5 h-3.5 ${downloadingPassId === pass.id ? 'animate-bounce' : ''}`} />
                    <span>{downloadingPassId === pass.id ? 'Encrypting...' : 'Sync to Device'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PUSH STREAMS & AIRPORT INDOOR GPS */}
      {activeTab === 'push-gps' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Real-Time Location & Alerts
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Airport Indoor GPS Navigation & Emergency Push Notifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B] font-bold">
                <Navigation className="w-5 h-5 text-[#C8A14A]" />
                <span className="text-sm font-serif text-[#081C15]">Airport Indoor GPS Navigation</span>
              </div>
              <p className="text-xs text-[#666666]">
                Step-by-step indoor map guidance for Hazrat Shahjalal International Airport (Dhaka Terminal 1 & 3), London Heathrow (LHR T4/T5), and Kuala Lumpur (KLIA1/2) including Gate countdown & lounge access.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B] font-bold">
                <Bell className="w-5 h-5 text-[#C8A14A]" />
                <span className="text-sm font-serif text-[#081C15]">Emergency SOS & Live Flight Stream</span>
              </div>
              <p className="text-xs text-[#666666]">
                Automated flight gate delay alerts, visa approval notifications & 1-tap SOS Emergency Help line connecting students and pilgrims directly to Journey Expert 24/7 Hotline.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TECH STACK & MOBILE SECURITY */}
      {activeTab === 'tech-security' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Engineering Architecture
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Flutter / React Native Cross-Platform Core & Security Enclave
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Hardware Enclave Biometrics</strong>
              <p className="text-xs text-[#666666]">
                iOS FaceID & Android Fingerprint API integration ensuring secure biometric session unlock and transaction signing.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Zero-Trust Mobile TLS 1.3</strong>
              <p className="text-xs text-[#666666]">
                Certificate pinning on API endpoints prevents Man-In-The-Middle (MITM) attacks on public airport Wi-Fi networks.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Offline SQLite WatermelonDB</strong>
              <p className="text-xs text-[#666666]">
                Reactive local database syncing e-tickets, boarding passes & passports in under 45ms upon background network reconnection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
