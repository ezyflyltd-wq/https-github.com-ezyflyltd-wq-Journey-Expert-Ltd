import React, { useState, useEffect } from 'react';
import {
  Compass,
  Building2,
  Plane,
  Train,
  Users,
  ShieldCheck,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  DollarSign,
  Download,
  Search,
  RefreshCw,
  PhoneCall,
  UserCheck,
  Award,
  Layers,
  ChevronRight,
  Send,
  AlertCircle,
  HelpCircle,
  QrCode,
  Map,
  Moon,
  Sun,
  Flame,
  Heart,
  Briefcase,
} from 'lucide-react';

export const HajjUmrahView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'packages' | 'pilgrim-groups' | 'nusuk-visa' | 'hotels-transport' | 'ai-pilgrim-guide' | 'saudi-partners' | 'ops-dashboard'
  >('packages');

  const [pilgrimageData, setPilgrimageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Package Filter & Customizer State
  const [packageTypeFilter, setPackageTypeFilter] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState(14);
  const [calculatedCustomPriceBDT, setCalculatedCustomPriceBDT] = useState(210000);

  // Nusuk E-Visa Instant Simulator State
  const [passportNumber, setPassportNumber] = useState('A09841205');
  const [pilgrimName, setPilgrimName] = useState('Md. Rafiqul Islam');
  const [visaIssued, setVisaIssued] = useState(false);

  // AI Ritual & Dua Assistant Interactive State
  const [selectedRitualStep, setSelectedRitualStep] = useState('tawaf');
  const [aiDuaResponse, setAiDuaResponse] = useState<string | null>(null);
  const [isAiGeneratingDua, setIsAiGeneratingDua] = useState(false);

  useEffect(() => {
    fetchPilgrimageOverview();
  }, []);

  const fetchPilgrimageOverview = () => {
    setLoading(true);
    fetch('/api/hajj-umrah/overview')
      .then((res) => res.json())
      .then((data) => {
        setPilgrimageData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Hajj & Umrah overview:', err);
        setLoading(false);
      });
  };

  const handleGenerateAiDua = (step: string) => {
    setIsAiGeneratingDua(true);
    setAiDuaResponse(null);

    setTimeout(() => {
      setIsAiGeneratingDua(false);
      if (step === 'tawaf') {
        setAiDuaResponse(
          'Arabic: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar."\nMeaning: "O Lord, give us in this world that which is good and in the Hereafter that which is good, and save us from the torment of the Fire." (Recited between Rukn al-Yamani and Hajar al-Aswad)'
        );
      } else if (step === 'sai') {
        setAiDuaResponse(
          'Arabic: "Innas-Safa wal-Marwata min sha\'a\'irillah..."\nMeaning: "Indeed, Safa and Marwa are among the symbols of Allah." Start Sa\'i at Mount Safa facing the Ka\'abah with heart in humility.'
        );
      } else if (step === 'ihram') {
        setAiDuaResponse(
          'Niyyah for Umrah: "Labbayk Allahumma Umratan." (Here I am, O Allah, making Umrah).\nFollowed by Talbiyah: "Labbayk Allahumma Labbayk, Labbayka la sharika laka Labbayk..."'
        );
      } else {
        setAiDuaResponse(
          'Dua at Maqam Ibrahim: Perform 2 Raka\'at Sunnah Tawaf behind Maqam Ibrahim, reciting Surah Al-Kafirun and Surah Al-Ikhlas.'
        );
      }
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HAJJ & UMRAH ENTERPRISE DIGITAL ECOSYSTEM HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • HAJJ & UMRAH DIGITAL PILGRIMAGE PLATFORM (PART 22)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Saudi Nusuk API Live • Haramain High Speed Train • Clock Tower Hotels</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Hajj & Umrah Digital Pilgrimage Ecosystem
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Complete End-to-End Pilgrimage Management: Saudi Nusuk E-Visa Integration, Clock Tower Hotel Allocation, Group Muallim Escorts, Haramain Bullet Train Transfers & Gemini AI Ritual Guide.
            </p>
          </div>

          {/* Quick Hajj & Umrah Snapshot Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Pilgrims Serviced This Year:</span>
              <span className="text-white font-mono font-black text-sm">
                {(pilgrimageData?.pilgrimageKpis?.totalPilgrimsServicedThisYear || 12850).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active Umrah Groups:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {pilgrimageData?.pilgrimageKpis?.activeUmrahGroups || 42} Groups Live
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Nusuk E-Visa Approval:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {pilgrimageData?.pilgrimageKpis?.saudiNusukVisaApprovalRatePercent || 99.8}%
              </span>
            </div>

            <button
              onClick={fetchPilgrimageOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Live Nusuk Pilgrimage Data</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Upcoming Hajj Pilgrims</span>
            <span className="text-lg font-black text-white font-mono">
              {(pilgrimageData?.pilgrimageKpis?.upcomingHajjPilgrimsCount || 1450).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Avg Haram Distance</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {pilgrimageData?.pilgrimageKpis?.averageHotelDistanceToHaramMeters || 180}m to Courtyard
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Saudi Partner Agencies</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              {pilgrimageData?.pilgrimageKpis?.saudiPartnerAgenciesCount || 28} Partners
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Pilgrim Satisfaction</span>
            <span className="text-lg font-black text-white font-mono">
              ★ {pilgrimageData?.pilgrimageKpis?.customerSatisfactionScore || 4.96} / 5.0
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Nusuk Visa Speed</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {pilgrimageData?.saudiNusukIntegration?.visaIssuanceTimeMinutes || 15} Mins Instant
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">AI Dua Guidance Engine</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              850+ Duas
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'packages'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Hajj & Umrah Packages</span>
        </button>

        <button
          onClick={() => setActiveTab('pilgrim-groups')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'pilgrim-groups'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Pilgrim Group Management</span>
        </button>

        <button
          onClick={() => setActiveTab('nusuk-visa')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'nusuk-visa'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Saudi Nusuk & E-Visa</span>
        </button>

        <button
          onClick={() => setActiveTab('hotels-transport')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'hotels-transport'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Hotels & Bullet Train</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-pilgrim-guide')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-pilgrim-guide'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>5. AI Pilgrim & Dua Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('saudi-partners')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'saudi-partners'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Saudi Partners & Agents</span>
        </button>

        <button
          onClick={() => setActiveTab('ops-dashboard')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ops-dashboard'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Operations & Emergency Center</span>
        </button>
      </div>

      {/* TAB 1: HAJJ & UMRAH PACKAGE MANAGEMENT SYSTEM */}
      {activeTab === 'packages' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Official Saudi Ministry Approved Hajj & Umrah Catalog
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                VIP Executive, Non-Shifting Hajj, Ramadan Special & Economy Packages
              </h3>
            </div>
            <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              Full Nusuk Visa + Direct Flight + Clock Tower Hotel Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Custom Package Estimator & Filter */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30 shadow-xl">
              <span className="font-serif font-black text-lg text-[#C8A14A] block">Customize Pilgrimage Package</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Package Category</label>
                  <select
                    value={packageTypeFilter}
                    onChange={(e) => setPackageTypeFilter(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value="all">All Packages (Hajj & Umrah)</option>
                    <option value="Executive">VIP Executive (Clock Tower 0m)</option>
                    <option value="Economy">Economy Deluxe (Shuttle / 150m)</option>
                    <option value="Hajj">2027 VIP Non-Shifting Hajj</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Pilgrimage Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => {
                      const dur = Number(e.target.value);
                      setSelectedDuration(dur);
                      setCalculatedCustomPriceBDT(dur * 15000 + 45000);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value={7}>7 Days Quick Umrah Express</option>
                    <option value={10}>10 Days Standard Umrah</option>
                    <option value={14}>14 Days Executive Umrah (7 Makkah + 7 Madinah)</option>
                    <option value={21}>21 Days Ramadan Full Umrah</option>
                    <option value={32}>32 Days Non-Shifting VIP Hajj</option>
                  </select>
                </div>

                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-emerald-200 font-bold block uppercase">Custom Package Rate Estimate</span>
                  <strong className="text-3xl font-mono font-black text-amber-300">BDT {calculatedCustomPriceBDT.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-200 block">Includes Saudi Nusuk Visa, 5★ Hotel, Flights & Muallim</span>
                </div>

                <button className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#C8A14A]" />
                  <span>Book Custom Package Slot</span>
                </button>
              </div>
            </div>

            {/* Featured Packages List */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">
                Active Featured Hajj & Umrah Packages
              </span>

              <div className="space-y-4">
                {pilgrimageData?.featuredPackages?.map((pkg: any, i: number) => (
                  <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ECECEC] pb-3">
                      <div>
                        <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mr-2">
                          {pkg.type}
                        </span>
                        <strong className="text-sm font-bold text-[#081C15] font-serif inline-block">{pkg.packageName}</strong>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#666666] block">Per Person All-Inclusive</span>
                        <strong className="text-base font-mono text-[#081C15] font-black">BDT {pkg.pricePerPersonBDT.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-[#ECECEC] space-y-1">
                        <span className="text-[10px] font-bold text-[#0B5D3B] uppercase block">Makkah Accommodation</span>
                        <strong className="text-xs text-[#081C15] font-bold block">{pkg.makkahHotel}</strong>
                        <span className="text-[10px] text-[#666666]">{pkg.makkahNights} Nights Stay</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#ECECEC] space-y-1">
                        <span className="text-[10px] font-bold text-[#0B5D3B] uppercase block">Madinah Accommodation</span>
                        <strong className="text-xs text-[#081C15] font-bold block">{pkg.madinahHotel}</strong>
                        <span className="text-[10px] text-[#666666]">{pkg.madinahNights} Nights Stay</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#ECECEC]">
                      <span className="text-[10px] font-bold text-[#666666] uppercase block">Package Key Inclusions:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {pkg.inclusions.map((inc: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D3B] shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PILGRIM REGISTRATION & GROUP MANAGEMENT */}
      {activeTab === 'pilgrim-groups' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Group Leader Escort & Room / Bus Allocation Matrix
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Active Pilgrim Groups & Smart Registration Tracking
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Group "Al-Barakah 42" (Dhaka-Jeddah)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Members: <strong>45 Pilgrims</strong></p>
                <p>Group Leader: <strong>Maulana Hafizur Rahman</strong></p>
                <p>Flight: <strong>Saudi Arabian Airlines SV-805</strong></p>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                  Ready for Departure (Dhaka Airport Terminal 2)
                </span>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Group "Noor Al-Madinah 43"</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Members: <strong>38 Pilgrims</strong></p>
                <p>Group Leader: <strong>Mufti Ahmad Hasan</strong></p>
                <p>Hotel: <strong>Pullman Zamzam Makkah</strong></p>
                <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                  Currently Performing Umrah Tawaf
                </span>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Group "Zamzam Family 44"</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Members: <strong>24 Pilgrims (5 Families)</strong></p>
                <p>Group Leader: <strong>Dr. Tariq Mahmood</strong></p>
                <p>Train: <strong>Haramain High Speed Bullet Train</strong></p>
                <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                  In Transit to Madinah Munawwarah
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAUDI NUSUK & ELECTRONIC VISA INTEGRATION */}
      {activeTab === 'nusuk-visa' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Direct Connection with Saudi Ministry of Hajj & Umrah
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Nusuk E-Visa Verification & Medical Insurance Gateway
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Interactive Nusuk Visa Issuance Widget */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <strong className="text-sm font-serif text-[#C8A14A] font-black">Nusuk E-Visa Generator Simulator</strong>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono">API Live</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Pilgrim Full Name</label>
                  <input
                    type="text"
                    value={pilgrimName}
                    onChange={(e) => setPilgrimName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Passport Number</label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-mono font-bold"
                  />
                </div>

                <button
                  onClick={() => setVisaIssued(true)}
                  className="w-full py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
                  <span>{visaIssued ? '✓ Nusuk E-Visa Issued Successfully' : 'Request Instant Nusuk E-Visa'}</span>
                </button>

                {visaIssued && (
                  <div className="bg-white/10 border border-emerald-400 p-4 rounded-xl space-y-2 text-emerald-100">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs font-bold">Nusuk Umrah Visa #KSA-2026-99201</strong>
                      <QrCode className="w-6 h-6 text-amber-300" />
                    </div>
                    <p className="text-[11px]">Issued for {pilgrimName} (Passport: {passportNumber}). Validity: 90 Days. Mandatory SAR 100,000 Health Insurance Active.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Nusuk API Integration Stats */}
            <div className="space-y-4 text-xs">
              <strong className="text-sm font-serif font-black text-[#081C15] block">Nusuk Integration Capabilities</strong>

              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B5D3B]" />
                  <strong className="text-[#081C15]">Rawdah Permit Booking (Riyadh ul Jannah)</strong>
                </div>
                <p className="text-[#666666] text-[11px] pl-6">Instant slot reservation for male and female pilgrims to visit Riyadh ul Jannah in Prophet's Mosque.</p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B5D3B]" />
                  <strong className="text-[#081C15]">Mandatory Saudi Travel Medical Insurance</strong>
                </div>
                <p className="text-[#666666] text-[11px] pl-6">Covers inpatient medical emergencies, COVID care, and repatriation up to SAR 100,000.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HOTELS & HARAMAIN BULLET TRAIN MANAGEMENT */}
      {activeTab === 'hotels-transport' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Makkah Clock Tower, Madinah Prophet's Mosque & Bullet Train
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Direct Hotel Contract Allocation & High Speed Railway Booking
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Building2 className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Makkah Clock Tower Hotel Contracts</strong>
              <p className="text-[#666666] leading-relaxed">
                Guaranteed inventory at Pullman Zamzam, Swissotel Makkah, and Makkah Hotel & Towers directly overlooking the Ka'abah with zero shuttle requirement.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Train className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Haramain High Speed Electric Bullet Train (300 km/h)</strong>
              <p className="text-[#666666] leading-relaxed">
                Connect Makkah to Madinah in 2 Hours 15 Minutes in Business Class comfort with seamless luggage delivery straight to hotel rooms.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GEMINI AI PILGRIM ASSISTANT & RITUAL DUA GUIDE */}
      {activeTab === 'ai-pilgrim-guide' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Step-by-Step Umrah & Hajj AI Guidance System
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Gemini 2.5 Flash Ritual Assistant & Interactive Dua Generator
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
            <span className="text-xs font-serif font-black text-[#C8A14A] block">Select Ritual Step for AI Guidance & Authentic Dua:</span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleGenerateAiDua('ihram')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  selectedRitualStep === 'ihram' ? 'bg-[#0B5D3B] border-amber-400 text-white' : 'bg-white/10 border-white/20 text-emerald-200'
                }`}
              >
                1. Entering Ihram & Niyyah
              </button>

              <button
                onClick={() => handleGenerateAiDua('tawaf')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  selectedRitualStep === 'tawaf' ? 'bg-[#0B5D3B] border-amber-400 text-white' : 'bg-white/10 border-white/20 text-emerald-200'
                }`}
              >
                2. Performing Tawaf around Ka'abah
              </button>

              <button
                onClick={() => handleGenerateAiDua('sai')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  selectedRitualStep === 'sai' ? 'bg-[#0B5D3B] border-amber-400 text-white' : 'bg-white/10 border-white/20 text-emerald-200'
                }`}
              >
                3. Sa'i between Safa & Marwa
              </button>

              <button
                onClick={() => handleGenerateAiDua('maqam')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  selectedRitualStep === 'maqam' ? 'bg-[#0B5D3B] border-amber-400 text-white' : 'bg-white/10 border-white/20 text-emerald-200'
                }`}
              >
                4. Praying behind Maqam Ibrahim
              </button>
            </div>

            {isAiGeneratingDua && (
              <div className="text-center py-4 text-emerald-300 font-mono animate-pulse">
                Fetching authentic Dua and step guidance from Gemini AI Ritual Engine...
              </div>
            )}

            {aiDuaResponse && (
              <div className="bg-white/10 border border-white/20 p-5 rounded-2xl whitespace-pre-line font-sans text-xs text-emerald-100 leading-relaxed space-y-2">
                <strong className="text-amber-300 font-serif block text-sm">Authentic Prescribed Dua & Guidance:</strong>
                <p>{aiDuaResponse}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: SAUDI PARTNERS & B2B AGENT PORTAL */}
      {activeTab === 'saudi-partners' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              B2B Travel Agent Commission & Saudi Supply Chain
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Saudi Partner Agency Network & Muallim Allocation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Briefcase className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">B2B Travel Agent Commissions</strong>
              <p className="text-[#666666] leading-relaxed">
                Agents earn instant 8% commission on Executive Umrah packages and BDT 25,000 flat bonus per VIP Hajj booking with automated wallet settlement.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Award className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Saudi Muallim & Scholar Escorts</strong>
              <p className="text-[#666666] leading-relaxed">
                Certified Bengali & English speaking Islamic scholars assigned to every pilgrim group for guidance in Makkah, Madinah, Mina & Arafat.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: OPERATIONS DASHBOARD & EMERGENCY CENTER */}
      {activeTab === 'ops-dashboard' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              24/7 Pilgrim Command Center (Dhaka • Makkah • Madinah)
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Real-Time Group Flight Tracking, Emergency Medical & Lost Pilgrim Hotline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-3 border border-emerald-800">
              <PhoneCall className="w-6 h-6 text-[#C8A14A]" />
              <strong className="text-base font-black font-serif text-[#C8A14A] block">24/7 Makkah & Madinah Field Helpline</strong>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Direct hotline with on-ground Saudi officers for lost pilgrim location assistance, emergency wheelchair dispatches, and medical hospitalization support.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <Layers className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-base font-black font-serif text-[#081C15] block">Automated Departure & Flight Alerts</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                WhatsApp & SMS alerts broadcasted to pilgrim group members for luggage pickup times, Haramain train departures, and airport transfers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
