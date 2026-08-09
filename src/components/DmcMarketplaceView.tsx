import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  Building2,
  Bus,
  ShieldCheck,
  Award,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Layers,
  DollarSign,
  Sun,
  Camera,
  Heart,
  Utensils,
  Briefcase,
  Sliders,
  Send,
  PhoneCall,
  Clock,
  Navigation,
  Globe2,
  FileText,
  Zap,
} from 'lucide-react';

export const DmcMarketplaceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'packages' | 'ai-itinerary' | 'supplier-portal' | 'guide-management' | 'halal-corporate' | 'b2b-distribution' | 'ops-analytics'
  >('packages');

  const [dmcData, setDmcData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Package Builder Interactive State
  const [selectedDestinationCode, setSelectedDestinationCode] = useState('BKK');
  const [selectedTourType, setSelectedTourType] = useState('Family / Group');
  const [selectedDays, setSelectedDays] = useState(7);
  const [hotelTier, setHotelTier] = useState('4star');
  const [includePrivateVehicle, setIncludePrivateVehicle] = useState(true);
  const [includeHalalMeals, setIncludeHalalMeals] = useState(true);
  const [customPackagePriceBDT, setCustomPackagePriceBDT] = useState(62000);

  // AI Itinerary Generator Form State
  const [aiDestination, setAiDestination] = useState('Istanbul & Cappadocia, Turkey');
  const [aiDurationDays, setAiDurationDays] = useState(6);
  const [aiTravelStyle, setAiTravelStyle] = useState('Honeymoon & Cultural');
  const [aiBudgetPerPersonBDT, setAiBudgetPerPersonBDT] = useState(120000);
  const [generatedItineraryDays, setGeneratedItineraryDays] = useState<any[] | null>(null);
  const [isAiBuilding, setIsAiBuilding] = useState(false);

  useEffect(() => {
    fetchDmcOverview();
  }, []);

  const fetchDmcOverview = () => {
    setLoading(true);
    fetch('/api/dmc/overview')
      .then((res) => res.json())
      .then((data) => {
        setDmcData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load DMC overview:', err);
        setLoading(false);
      });
  };

  const calculatePackageEstimate = (days: number, tier: string, vehicle: boolean, halal: boolean) => {
    let basePerDay = 7500;
    if (tier === '5star') basePerDay = 14000;
    if (tier === 'luxury-villa') basePerDay = 22000;

    let total = basePerDay * days;
    if (vehicle) total += 12000;
    if (halal) total += 4000;

    setCustomPackagePriceBDT(total);
  };

  const handleGenerateAiItinerary = () => {
    setIsAiBuilding(true);
    setGeneratedItineraryDays(null);

    setTimeout(() => {
      setIsAiBuilding(false);
      setGeneratedItineraryDays([
        {
          day: 1,
          title: 'Arrival in Istanbul & Bosphorus Sunset Dinner Cruise',
          morning: 'VIP Airport Meet & Greet at Istanbul Airport (IST). Private Mercedes transfer to 5★ Deluxe Hotel near Hagia Sophia.',
          afternoon: 'Check-in, relax, and explore Sultanahmet Square with local guide.',
          evening: 'Luxury Bosphorus Strait Dinner Cruise with Turkish Folk Show & 100% Certified Halal Buffet.',
        },
        {
          day: 2,
          title: 'Historic Ottoman & Byzantine Heritage Walking Tour',
          morning: 'Guided visit to Hagia Sophia Grand Mosque, Blue Mosque, and ancient Hippodrome.',
          afternoon: 'Explore Topkapi Palace Museum and Holy Relics Section. Traditional Turkish Kebap lunch at Sultanahmet.',
          evening: 'Shopping & Spice Tasting at the famous Grand Bazaar (Kapalıçarşı) with private escort.',
        },
        {
          day: 3,
          title: 'Fly to Cappadocia & Fairy Chimney Cave Experience',
          morning: 'Private transfer to IST Airport for 1-hour flight to Nevşehir / Kayseri Cappadocia.',
          afternoon: 'Check-in to Authentic Luxury Cave Villa. Visit Göreme Open Air Museum & Pasabag Monks Valley.',
          evening: 'Panoramic sunset view over Pigeon Valley & Anatolian Lamb Testi Kebap Dinner.',
        },
        {
          day: 4,
          title: 'Sunrise Hot Air Balloon Flight & Underground City',
          morning: '05:30 AM Sunrise Hot Air Balloon Flight over Cappadocia Fairy Chimneys with Champagne ceremony.',
          afternoon: 'Explore Derinkuyu Underground City (8 levels below earth) & Uchisar Castle.',
          evening: 'Traditional Pottery Making Workshop in Avanos Town.',
        },
      ]);
    }, 1100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* DMC & GLOBAL TOUR MARKETPLACE HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • DESTINATION MANAGEMENT PLATFORM (PART 24)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>85 Global Destinations • 320 Local DMCs • Gemini AI Itinerary Builder</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Global Destination Management & Tour Marketplace
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              End-to-End Inbound & Outbound Tourism Ecosystem: Customized Holiday Packages, Halal Certified Dining, Licensed Multilingual Guides, Private Luxury Chauffeurs & B2B Wholesale Distribution.
            </p>
          </div>

          {/* Quick DMC KPI Snapshot Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Global Destinations Live:</span>
              <span className="text-white font-mono font-black text-sm">
                {dmcData?.dmcKpis?.totalGlobalDestinationsCovered || 85} Countries
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Verified DMC Partners:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {dmcData?.dmcKpis?.verifiedLocalDmcPartners || 320} DMCs
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Halal Tour Share:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {dmcData?.dmcKpis?.halalCertifiedTourSharePercent || 88.5}% Certified
              </span>
            </div>

            <button
              onClick={fetchDmcOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Live DMC Inventory</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Licensed Tour Guides</span>
            <span className="text-lg font-black text-white font-mono">
              {(dmcData?.dmcKpis?.licensedTourGuidesCount || 1250).toLocaleString()} Guides
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Annual Packages Sold</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {(dmcData?.dmcKpis?.annualTourPackagesSold || 28400).toLocaleString()} Trips
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Customer Rating</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              ★ {dmcData?.dmcKpis?.averageCustomerRating || 4.96} / 5.0
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Popular Hubs</span>
            <span className="text-lg font-black text-white font-mono">
              BKK • DXB • IST • BAL
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">AI Itinerary Speed</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              2 Seconds Instant
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">B2B Wholesale Margin</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              10-15% Profit
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
          <span>1. Tour Packages & Builder</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-itinerary')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-itinerary'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Gemini AI Travel Planner</span>
        </button>

        <button
          onClick={() => setActiveTab('supplier-portal')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'supplier-portal'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Local DMC Supplier Network</span>
        </button>

        <button
          onClick={() => setActiveTab('guide-management')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'guide-management'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Tour Guide Roster</span>
        </button>

        <button
          onClick={() => setActiveTab('halal-corporate')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'halal-corporate'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Utensils className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Halal Tourism & Corporate</span>
        </button>

        <button
          onClick={() => setActiveTab('b2b-distribution')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'b2b-distribution'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>6. B2B Wholesale Distribution</span>
        </button>

        <button
          onClick={() => setActiveTab('ops-analytics')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ops-analytics'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Operations & Analytics</span>
        </button>
      </div>

      {/* TAB 1: TOUR PACKAGES & DYNAMIC PACKAGE BUILDER */}
      {activeTab === 'packages' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Official Inbound & Outbound DMC Catalog
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Customized Holiday Packages, Luxury VVIP Tours & Beach Resorts
              </h3>
            </div>
            <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              Halal Meals Included • Private Driver & Licensed Guide
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Custom Dynamic Package Builder */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30 shadow-xl">
              <span className="font-serif font-black text-lg text-[#C8A14A] block">Build Custom Holiday Package</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Target Destination</label>
                  <select
                    value={selectedDestinationCode}
                    onChange={(e) => setSelectedDestinationCode(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value="BKK">Thailand (Bangkok, Phuket, Pattaya)</option>
                    <option value="DXB">UAE (Dubai, Abu Dhabi, Sharjah)</option>
                    <option value="TUR">Turkey (Istanbul, Cappadocia, Antalya)</option>
                    <option value="BAL">Indonesia (Bali, Ubud, Kuta Beach)</option>
                    <option value="KUL">Malaysia (Kuala Lumpur, Langkawi)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Duration & Hotel Class</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={selectedDays}
                      onChange={(e) => {
                        const days = Number(e.target.value);
                        setSelectedDays(days);
                        calculatePackageEstimate(days, hotelTier, includePrivateVehicle, includeHalalMeals);
                      }}
                      className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                    >
                      <option value={4}>4 Days Quick Getaway</option>
                      <option value={7}>7 Days Standard Tour</option>
                      <option value={10}>10 Days Extended Tour</option>
                    </select>

                    <select
                      value={hotelTier}
                      onChange={(e) => {
                        setHotelTier(e.target.value);
                        calculatePackageEstimate(selectedDays, e.target.value, includePrivateVehicle, includeHalalMeals);
                      }}
                      className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                    >
                      <option value="3star">3★ City Center</option>
                      <option value="4star">4★ Premium Hotel</option>
                      <option value="5star">5★ Luxury Resort</option>
                      <option value="luxury-villa">Private Pool Villa</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePrivateVehicle}
                      onChange={(e) => {
                        setIncludePrivateVehicle(e.target.checked);
                        calculatePackageEstimate(selectedDays, hotelTier, e.target.checked, includeHalalMeals);
                      }}
                      className="rounded border-white/20 text-[#0B5D3B] focus:ring-0"
                    />
                    <span>Private SUV Chauffeur Transfer</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHalalMeals}
                      onChange={(e) => {
                        setIncludeHalalMeals(e.target.checked);
                        calculatePackageEstimate(selectedDays, hotelTier, includePrivateVehicle, e.target.checked);
                      }}
                      className="rounded border-white/20 text-[#0B5D3B] focus:ring-0"
                    />
                    <span>100% Certified Halal Meal Plan</span>
                  </label>
                </div>

                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-emerald-200 font-bold block uppercase">Custom Package Rate Estimate</span>
                  <strong className="text-3xl font-mono font-black text-amber-300">BDT {customPackagePriceBDT.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-200 block">Includes Airport Transfer, Daily Sightseeing & Guide</span>
                </div>

                <button className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Compass className="w-4 h-4 text-[#C8A14A]" />
                  <span>Request Custom Itinerary Quote</span>
                </button>
              </div>
            </div>

            {/* Featured Packages Cards */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">
                Featured Verified Tour Packages Worldwide
              </span>

              <div className="space-y-4">
                {dmcData?.featuredTourPackages?.map((pkg: any, i: number) => (
                  <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ECECEC] pb-3">
                      <div>
                        <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mr-2">
                          {pkg.type}
                        </span>
                        <strong className="text-sm font-bold text-[#081C15] font-serif inline-block">{pkg.title}</strong>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#666666] block">Per Person All-Inclusive</span>
                        <strong className="text-base font-mono text-[#081C15] font-black">BDT {pkg.priceBDT.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-[#ECECEC]">
                        <span className="text-[10px] font-bold text-[#666666] uppercase block">Destination</span>
                        <strong className="text-xs text-[#081C15] font-bold block">{pkg.destination}</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#ECECEC]">
                        <span className="text-[10px] font-bold text-[#666666] uppercase block">Duration</span>
                        <strong className="text-xs text-[#081C15] font-bold block">{pkg.duration}</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#ECECEC]">
                        <span className="text-[10px] font-bold text-[#0B5D3B] uppercase block">Guaranteed Guide</span>
                        <strong className="text-xs text-[#081C15] font-bold block">{pkg.guaranteedGuide}</strong>
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

      {/* TAB 2: GEMINI AI DAY-BY-DAY ITINERARY PLANNER */}
      {activeTab === 'ai-itinerary' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              AI Powered Customized Travel Itinerary Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Gemini 2.5 Flash Dynamic Itinerary Generator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form Control */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <strong className="text-sm font-serif text-[#C8A14A] font-black block">Generate Custom Itinerary</strong>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Destination</label>
                  <input
                    type="text"
                    value={aiDestination}
                    onChange={(e) => setAiDestination(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Days</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={aiDurationDays}
                      onChange={(e) => setAiDurationDays(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Budget BDT</label>
                    <input
                      type="number"
                      step={5000}
                      value={aiBudgetPerPersonBDT}
                      onChange={(e) => setAiBudgetPerPersonBDT(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Travel Style</label>
                  <select
                    value={aiTravelStyle}
                    onChange={(e) => setAiTravelStyle(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value="Honeymoon & Cultural">Honeymoon & Cultural Retreat</option>
                    <option value="Family Friendly">Family Friendly & Theme Parks</option>
                    <option value="Halal Luxury">Halal Certified Luxury Resort</option>
                    <option value="Adventure">Adventure & Water Sports</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateAiItinerary}
                  className="w-full py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C8A14A]" />
                  <span>{isAiBuilding ? 'Generating...' : 'Generate Day-by-Day Itinerary'}</span>
                </button>
              </div>
            </div>

            {/* Generated Output Display */}
            <div className="md:col-span-2 bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
              <strong className="text-base font-black text-[#081C15] font-serif block">
                Generated Itinerary: {aiDestination} ({aiDurationDays} Days)
              </strong>

              {isAiBuilding && (
                <div className="text-center py-8 text-[#0B5D3B] font-mono animate-pulse">
                  Gemini AI analyzing local attraction open hours, Halal restaurant coordinates, and private driver routes...
                </div>
              )}

              {generatedItineraryDays && (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {generatedItineraryDays.map((d: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-[#ECECEC] space-y-2">
                      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-2">
                        <span className="bg-[#0B5D3B] text-white text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                          DAY {d.day}
                        </span>
                        <strong className="text-xs font-bold text-[#081C15] font-serif">{d.title}</strong>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#666666] leading-relaxed">
                        <p><strong>🌅 Morning:</strong> {d.morning}</p>
                        <p><strong>☀️ Afternoon:</strong> {d.afternoon}</p>
                        <p><strong>🌙 Evening:</strong> {d.evening}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOCAL DMC SUPPLIER & ACTIVITY MARKETPLACE */}
      {activeTab === 'supplier-portal' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Direct Ground Operator Management System
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              320 Verified DMC Partners & Activity Providers Worldwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Building2 className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Siam World Travel Co., Ltd (Bangkok)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Status: <strong>Verified Partner (TAT Licensed #11/09812)</strong></p>
                <p>Coverage: <strong>Bangkok, Pattaya, Phuket, Chiang Mai</strong></p>
                <p>Fleet: <strong>28 VIP Toyota Commuter Vans & Private SUVs</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Building2 className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Anatolia Heritage DMC (Istanbul & Cappadocia)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Status: <strong>Verified Partner (TURSAB Licensed #A-4210)</strong></p>
                <p>Coverage: <strong>Istanbul, Cappadocia, Pamukkale, Antalya</strong></p>
                <p>Specialty: <strong>Hot Air Balloon Operation & Cave Hotel Allocation</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LICENSED TOUR GUIDE ROSTER */}
      {activeTab === 'guide-management' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multilingual Certified Tour Guides & Historians
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              1,250 Licensed Tour Guides Active Worldwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Somchai Prasert (Bangkok / Pattaya)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>License: <strong>TAT Tour Guide #77-1092</strong></p>
                <p>Languages: <strong>Thai, Bengali, English</strong></p>
                <p>Rating: <strong>★ 4.98 (420+ Tours Escorted)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Mehmet Yilmaz (Istanbul / Cappadocia)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>License: <strong>TURSAB Historian Guide #IST-8841</strong></p>
                <p>Languages: <strong>Turkish, English, Arabic</strong></p>
                <p>Rating: <strong>★ 4.99 (610+ Tours Escorted)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Users className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">I Wayan Arta (Bali / Ubud)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>License: <strong>HPI Bali Certified Guide #BAL-3301</strong></p>
                <p>Languages: <strong>Indonesian, English</strong></p>
                <p>Rating: <strong>★ 4.97 (380+ Tours Escorted)</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HALAL TOURISM & CORPORATE RETREAT SPECIALIST */}
      {activeTab === 'halal-corporate' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Muslim-Friendly Travel & Corporate Incentive Delegations
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              100% Halal Dining Guarantee & Corporate Team Building
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Utensils className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Halal Certified Dining & Prayer Access</strong>
              <p className="text-[#666666] leading-relaxed">
                Guaranteed 100% Halal certified seafood and meat dining arrangements with designated prayer room stops across all itinerary routes in Thailand, Vietnam, Korea, and Japan.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Briefcase className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Corporate Incentive & Conference Trips</strong>
              <p className="text-[#666666] leading-relaxed">
                Full end-to-end MICE event execution for corporate delegations up to 500 members with gala dinner venues, stage setups, and team building activities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: B2B WHOLESALE DISTRIBUTION */}
      {activeTab === 'b2b-distribution' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Wholesale Tour Rates for Travel Agencies
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              B2B Agent Portal & White-Label Voucher Generation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <DollarSign className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Agent Net Rates & 12% Guaranteed Commission</strong>
              <p className="text-[#666666] leading-relaxed">
                Registered travel agencies get direct access to net wholesale tour package rates with instant white-label PDF voucher issuance featuring the agent's own logo.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <FileText className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Automated Credit Settlement</strong>
              <p className="text-[#666666] leading-relaxed">
                Instant booking deduction from agent wallet with flexible 30-day credit terms for top tier travel agencies across Bangladesh and Middle East.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: OPERATIONS COMMAND CENTER & ANALYTICS */}
      {activeTab === 'ops-analytics' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              24/7 Global Tourist Safety & Ground Dispatch
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Real-Time Tour Dispatch Monitoring & Emergency Support
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-3 border border-emerald-800">
              <PhoneCall className="w-6 h-6 text-[#C8A14A]" />
              <strong className="text-base font-black font-serif text-[#C8A14A] block">24/7 Global Tourist SOS Hotline</strong>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Direct hotline connected with on-ground local officers in Bangkok, Dubai, Istanbul, and Bali for immediate flight delay rescheduling or emergency medical help.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <Layers className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-base font-black font-serif text-[#081C15] block">Seasonal Demand Heatmaps & Revenue Analytics</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                Automated yield management predicting peak Eid, Winter, and New Year holiday demand to pre-purchase hotel room blocks at locked discount rates.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
