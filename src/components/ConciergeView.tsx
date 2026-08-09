import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Plane,
  Car,
  ShieldCheck,
  Sparkles,
  Building2,
  Clock,
  MapPin,
  Users,
  Search,
  CheckCircle2,
  RefreshCw,
  PhoneCall,
  Navigation,
  FileText,
  DollarSign,
  AlertTriangle,
  Award,
  Layers,
  Heart,
  BookOpen,
  Send,
  Zap,
  Luggage,
  ShieldAlert,
  Sliders,
  QrCode,
  Smile,
  Compass,
} from 'lucide-react';

export const ConciergeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'marketplace' | 'flight-radar' | 'chauffeur-transfers' | 'specialized-support' | 'ai-concierge' | 'staff-portal' | 'ops-dashboard'
  >('marketplace');

  const [conciergeData, setConciergeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Interactive Booking / Estimator State
  const [selectedAirportCode, setSelectedAirportCode] = useState('DAC');
  const [selectedServiceType, setSelectedServiceType] = useState('arrival-fasttrack');
  const [passengerCount, setPassengerCount] = useState(2);
  const [includeBuggy, setIncludeBuggy] = useState(true);
  const [includeLounge, setIncludeLounge] = useState(true);
  const [calculatedPriceBDT, setCalculatedPriceBDT] = useState(14500);

  // Flight Radar Simulation State
  const [flightNumberInput, setFlightNumberInput] = useState('BG-201');
  const [trackedFlightStatus, setTrackedFlightStatus] = useState<any>({
    flightNumber: 'BG-201',
    airline: 'Biman Bangladesh Airlines',
    route: 'DAC (Dhaka) -> LHR (London Heathrow)',
    scheduledArrival: '16:45 Local',
    estimatedArrival: '17:05 Local (Delayed +20m)',
    terminal: 'Terminal 4',
    gate: 'Gate B32',
    conciergeAssigned: 'David Miller (Senior Protocol Officer - LHR)',
    chauffeurStatus: 'Mercedes S-Class Standing by at LHR Terminal 4 VIP Kerbside',
  });

  // AI Concierge Chat Assistant State
  const [aiUserQuery, setAiUserQuery] = useState('');
  const [aiChatLogs, setAiChatLogs] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Welcome! I am your Journey Expert Gemini Airport Concierge AI. How may I assist with your Fast Track, Terminal Lounge, or Chauffeur transfer today?',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    fetchConciergeOverview();
  }, []);

  const fetchConciergeOverview = () => {
    setLoading(true);
    fetch('/api/concierge/overview')
      .then((res) => res.json())
      .then((data) => {
        setConciergeData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Concierge overview:', err);
        setLoading(false);
      });
  };

  const handleCalculatePrice = (pCount: number, buggy: boolean, lounge: boolean) => {
    let base = 7500;
    if (selectedServiceType === 'arrival-fasttrack') base = 8500;
    if (selectedServiceType === 'departure-vip') base = 9800;
    if (selectedServiceType === 'student-arrival') base = 14500;

    let total = base * pCount;
    if (buggy) total += 2500;
    if (lounge) total += 3500 * pCount;

    setCalculatedPriceBDT(total);
  };

  const handleSearchFlight = () => {
    setTrackedFlightStatus({
      flightNumber: flightNumberInput.toUpperCase(),
      airline: 'Emirates / Biman / Saudia Partner Flight',
      route: 'DAC (Dhaka) -> DXB (Dubai Terminal 3)',
      scheduledArrival: '06:15 AM Local',
      estimatedArrival: '06:15 AM Local (ON TIME)',
      terminal: 'Terminal 3 - Concourse A',
      gate: 'Gate A14',
      conciergeAssigned: 'Tariq Al-Mansoor (Dubai VIP Airport Officer)',
      chauffeurStatus: 'GMC Yukon XL Waiting at Chauffeur Parking Zone 2',
    });
  };

  const handleSendAiMessage = () => {
    if (!aiUserQuery.trim()) return;

    const query = aiUserQuery;
    setAiChatLogs((prev) => [...prev, { sender: 'user', text: query }]);
    setAiUserQuery('');
    setIsAiThinking(true);

    setTimeout(() => {
      setIsAiThinking(false);
      let reply =
        'I have checked your flight details. Your VIP Protocol Officer will greet you at the airbridge exit with your name board, guide you through Fast Track Immigration, and handle luggage collection directly to your private Chauffeur vehicle.';

      if (query.toLowerCase().includes('lounge')) {
        reply =
          'Your booking includes 3-Hour Executive Lounge Pass with complimentary warm gourmet buffet, shower suites, high-speed Wi-Fi, and private quiet relaxation pods before your boarding time.';
      } else if (query.toLowerCase().includes('wheelchair') || query.toLowerCase().includes('medical')) {
        reply =
          'Our Medical Concierge team coordinates directly with Airport Ramp Ground Services to ensure a pre-sanitized wheelchair and nurse escort are stationed at the aircraft door upon landing.';
      } else if (query.toLowerCase().includes('student')) {
        reply =
          'The International Student Package includes airport terminal greeting, local UK/US SIM card activation, luggage porter assistance, and direct van transport straight to your university campus dormitory.';
      }

      setAiChatLogs((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* MEET & GREET AND AIRPORT CONCIERGE PLATFORM HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • GLOBAL MEET & GREET CONCIERGE (PART 23)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>45 Airports Live • VIP Fast Track • Flight Radar Sync • Chauffeur Fleet</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Airport Meet & Greet & Concierge Platform
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Seamless Airport Assistance Worldwide: Airbridge Welcome Officers, Electric Buggy Escorts, VIP Fast Track Immigration, Luggage Porters, Student University Transfers & Medical Wheelchair Services.
            </p>
          </div>

          {/* Quick Concierge KPI Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Airport Bookings:</span>
              <span className="text-white font-mono font-black text-sm">
                {(conciergeData?.conciergeKpis?.totalAirportBookingsThisMonth || 3420).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Fast Track Pass Rate:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {conciergeData?.conciergeKpis?.fastTrackImmigrationSuccessRatePercent || 99.6}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Airports Worldwide:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {conciergeData?.conciergeKpis?.airportsCoveredCount || 45} Hubs Live
              </span>
            </div>

            <button
              onClick={fetchConciergeOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Live Concierge Network</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Greeting Response Time</span>
            <span className="text-lg font-black text-white font-mono">
              {conciergeData?.conciergeKpis?.averageMeetAndGreetGreetingTimeMinutes || 2} Mins at Gate
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Chauffeur Fleet</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {conciergeData?.conciergeKpis?.vipChauffeurFleetSize || 120} Vehicles
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Customer Rating</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              ★ {conciergeData?.conciergeKpis?.customerRatingScore || 4.97} / 5.0
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Flight Radar Sync</span>
            <span className="text-lg font-black text-white font-mono">
              Every 15s Live
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Primary Hubs</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              DAC • LHR • DXB • JED
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">AI Concierge Engine</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              Multilingual 5+
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'marketplace'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Meet & Greet Marketplace</span>
        </button>

        <button
          onClick={() => setActiveTab('flight-radar')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'flight-radar'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Plane className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Flight Radar & Delay Sync</span>
        </button>

        <button
          onClick={() => setActiveTab('chauffeur-transfers')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'chauffeur-transfers'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Car className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Luxury Chauffeur & Transfers</span>
        </button>

        <button
          onClick={() => setActiveTab('specialized-support')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'specialized-support'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Heart className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Student & Medical Support</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-concierge')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-concierge'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Gemini AI Concierge</span>
        </button>

        <button
          onClick={() => setActiveTab('staff-portal')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'staff-portal'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Staff & Provider Network</span>
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
          <span>7. Operations Command Center</span>
        </button>
      </div>

      {/* TAB 1: AIRPORT MEET & GREET MARKETPLACE & CALCULATOR */}
      {activeTab === 'marketplace' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Global Airport Service Booking Portal
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Arrival, Departure, Transit Fast Track & Buggy Services
              </h3>
            </div>
            <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              45 International Airports • Guaranteed Fast Track
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Service Calculator Widget */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30 shadow-xl">
              <span className="font-serif font-black text-lg text-[#C8A14A] block">Instant Service Rate Estimator</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Select Airport Hub</label>
                  <select
                    value={selectedAirportCode}
                    onChange={(e) => setSelectedAirportCode(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value="DAC">Dhaka (DAC) - Shahjalal Intl Airport</option>
                    <option value="LHR">London (LHR) - Heathrow Airport</option>
                    <option value="DXB">Dubai (DXB) - Dubai Intl Airport</option>
                    <option value="JED">Jeddah (JED) - King Abdulaziz Intl</option>
                    <option value="BKK">Bangkok (BKK) - Suvarnabhumi Airport</option>
                    <option value="SIN">Singapore (SIN) - Changi Airport</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Concierge Service Package</label>
                  <select
                    value={selectedServiceType}
                    onChange={(e) => {
                      setSelectedServiceType(e.target.value);
                      handleCalculatePrice(passengerCount, includeBuggy, includeLounge);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value="arrival-fasttrack">VIP Arrival Fast Track + Buggy Escort</option>
                    <option value="departure-vip">Executive Departure Concierge + Lounge</option>
                    <option value="student-arrival">Student Arrival Escort & Campus Transfer</option>
                    <option value="medical-wheelchair">Medical Patient Wheelchair & Nurse Escort</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Number of Passengers</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={passengerCount}
                    onChange={(e) => {
                      const count = Math.max(1, Number(e.target.value));
                      setPassengerCount(count);
                      handleCalculatePrice(count, includeBuggy, includeLounge);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBuggy}
                      onChange={(e) => {
                        setIncludeBuggy(e.target.checked);
                        handleCalculatePrice(passengerCount, e.target.checked, includeLounge);
                      }}
                      className="rounded border-white/20 text-[#0B5D3B] focus:ring-0"
                    />
                    <span>Include Terminal Electric Buggy Ride</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLounge}
                      onChange={(e) => {
                        setIncludeLounge(e.target.checked);
                        handleCalculatePrice(passengerCount, includeBuggy, e.target.checked);
                      }}
                      className="rounded border-white/20 text-[#0B5D3B] focus:ring-0"
                    />
                    <span>Include 3-Hour VIP Executive Lounge Pass</span>
                  </label>
                </div>

                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-emerald-200 font-bold block uppercase">Estimated Concierge Total</span>
                  <strong className="text-3xl font-mono font-black text-amber-300">BDT {calculatedPriceBDT.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-200 block">Includes Airbridge Greeting, Porter & Fast Track</span>
                </div>

                <button className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
                  <UserCheck className="w-4 h-4 text-[#C8A14A]" />
                  <span>Reserve Concierge Service</span>
                </button>
              </div>
            </div>

            {/* Featured Concierge Services Catalogue */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">
                Featured Airport Concierge Service Packages
              </span>

              <div className="space-y-4">
                {conciergeData?.featuredServices?.map((srv: any, i: number) => (
                  <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ECECEC] pb-3">
                      <div>
                        <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mr-2">
                          {srv.category}
                        </span>
                        <strong className="text-sm font-bold text-[#081C15] font-serif inline-block">{srv.title}</strong>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#666666] block">Fixed All-Inclusive Rate</span>
                        <strong className="text-base font-mono text-[#081C15] font-black">BDT {srv.priceBDT.toLocaleString()}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-[#666666] font-medium">Ideal For: <strong>{srv.idealFor}</strong></p>

                    <div className="space-y-2 pt-2 border-t border-[#ECECEC]">
                      <span className="text-[10px] font-bold text-[#666666] uppercase block">Key Service Inclusions:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {srv.keyFeatures.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D3B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
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

      {/* TAB 2: FLIGHT RADAR & AUTOMATED DELAY HANDLER */}
      {activeTab === 'flight-radar' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Real-time Airport Flight Tracking & Automatic Chauffeur Rescheduling
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Flight Radar Monitor & Gate Delay Sync
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flight Search Control */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <strong className="text-sm font-serif text-[#C8A14A] font-black block">Monitor Flight Landing Status</strong>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Enter Flight Number</label>
                  <input
                    type="text"
                    value={flightNumberInput}
                    onChange={(e) => setFlightNumberInput(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white font-mono text-xs font-bold uppercase"
                  />
                </div>

                <button
                  onClick={handleSearchFlight}
                  className="w-full py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Plane className="w-4 h-4 text-[#C8A14A]" />
                  <span>Fetch Real-Time Radar Status</span>
                </button>
              </div>
            </div>

            {/* Flight Status Display */}
            <div className="md:col-span-2 bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <div>
                  <span className="text-[10px] text-[#666666] font-bold uppercase block">Tracked Flight</span>
                  <strong className="text-base font-black text-[#081C15] font-serif">{trackedFlightStatus.flightNumber} - {trackedFlightStatus.airline}</strong>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full font-mono">
                  {trackedFlightStatus.estimatedArrival}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Flight Route</span>
                  <strong className="text-xs text-[#081C15] block">{trackedFlightStatus.route}</strong>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Arrival Terminal & Gate</span>
                  <strong className="text-xs text-[#081C15] block">{trackedFlightStatus.terminal} - {trackedFlightStatus.gate}</strong>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Assigned Protocol Officer</span>
                  <strong className="text-xs text-[#0B5D3B] block">{trackedFlightStatus.conciergeAssigned}</strong>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-[#0B5D3B]" />
                  <strong className="text-xs font-bold text-[#081C15]">Automated Chauffeur Delay Protection Active:</strong>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{trackedFlightStatus.chauffeurStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LUXURY CHAUFFEUR & AIRPORT TRANSFERS */}
      {activeTab === 'chauffeur-transfers' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Private Airport Limousine & Chauffeur Services
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              GMC Yukon XL, Mercedes S-Class & Luxury Sprinter Vans
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conciergeData?.luxuryFleet?.map((v: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-4">
                <Car className="w-8 h-8 text-[#0B5D3B]" />
                <div>
                  <strong className="text-sm font-bold text-[#081C15] font-serif block">{v.vehicleType}</strong>
                  <span className="text-[10px] font-bold text-[#666666]">{v.capacity}</span>
                </div>

                <div className="border-t border-[#ECECEC] pt-3 space-y-2">
                  <span className="text-[10px] font-bold text-[#0B5D3B] uppercase block">Vehicle Amenities:</span>
                  <ul className="space-y-1 text-xs text-[#666666]">
                    {v.amenities.map((amenity: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#0B5D3B]" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#ECECEC] pt-3 flex items-center justify-between">
                  <span className="text-xs font-black font-mono text-[#081C15]">USD ${v.dailyRateUSD} / Day</span>
                  <button className="px-3 py-1.5 bg-[#0B5D3B] text-white rounded-lg font-bold text-[11px]">
                    Reserve Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT & MEDICAL SPECIALIZED SUPPORT */}
      {activeTab === 'specialized-support' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Dedicated Workflows for Vulnerable & Special Care Travelers
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              International Student Welcome & Medical Patient Escort
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <BookOpen className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">International Student Arrival Package</strong>
              <p className="text-[#666666] leading-relaxed">
                Airport meeting at London Heathrow, Toronto Pearson, or Sydney Airport with student welcome kit, local SIM card, luggage porter, and direct shuttle to university dorms.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Heart className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Medical Patient Wheelchair & Nurse Escort</strong>
              <p className="text-[#666666] leading-relaxed">
                Dedicated paramedic nurse meeting at airbridge with pre-arranged airport wheelchair, oxygen support, and direct ambulance or hospital transfer in Bangkok, Chennai, or Singapore.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GEMINI AI CONCIERGE ASSISTANT */}
      {activeTab === 'ai-concierge' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              24/7 Intelligent Multilingual Airport Assistant
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Gemini 2.5 Flash Airport Concierge Assistant
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
            {/* Chat Box */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {aiChatLogs.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl max-w-xl text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0B5D3B] text-white ml-auto text-right'
                      : 'bg-white/10 text-emerald-100 border border-white/20 mr-auto'
                  }`}
                >
                  <strong className="block text-[10px] text-amber-300 uppercase mb-1 font-mono">
                    {msg.sender === 'user' ? 'Passenger' : 'Gemini Airport Concierge AI'}
                  </strong>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}

              {isAiThinking && (
                <div className="bg-white/10 text-emerald-300 p-3 rounded-2xl text-xs font-mono animate-pulse">
                  Gemini AI analyzing terminal maps and protocol officer availability...
                </div>
              )}
            </div>

            {/* Input Row */}
            <div className="flex items-center space-x-2 border-t border-white/10 pt-4">
              <input
                type="text"
                placeholder="Ask about Fast Track, Lounge access, Wheelchairs, or Terminal directions..."
                value={aiUserQuery}
                onChange={(e) => setAiUserQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xs placeholder:text-emerald-200/50"
              />
              <button
                onClick={handleSendAiMessage}
                className="px-5 py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center space-x-2"
              >
                <Send className="w-4 h-4 text-[#C8A14A]" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CONCIERGE STAFF & PROVIDER NETWORK */}
      {activeTab === 'staff-portal' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Airport Authorization & Security Badged Officers
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Protocol Staff Roster & Local Airport Handling Network
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <UserCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Anowar Hossain (Senior Officer - DAC)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Badge ID: <strong>DAC-SEC-9041</strong></p>
                <p>Languages: <strong>Bengali, English, Hindi</strong></p>
                <p>Rating: <strong>★ 4.99 (850+ Greetings)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <UserCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">David Miller (Senior Officer - LHR)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Badge ID: <strong>LHR-SEC-1102</strong></p>
                <p>Languages: <strong>English, French</strong></p>
                <p>Rating: <strong>★ 4.98 (620+ Greetings)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <UserCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Tariq Al-Mansoor (VIP Officer - DXB)</strong>
              <div className="space-y-1 text-[#666666] text-xs">
                <p>Badge ID: <strong>DXB-VIP-4029</strong></p>
                <p>Languages: <strong>Arabic, English</strong></p>
                <p>Rating: <strong>★ 5.00 (940+ Greetings)</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: OPERATIONS COMMAND CENTER & CORPORATE BILLING */}
      {activeTab === 'ops-dashboard' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Global Operations Monitor & Corporate Account Management
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Live Airport Dispatch Logs & Corporate Billing
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-3 border border-emerald-800">
              <PhoneCall className="w-6 h-6 text-[#C8A14A]" />
              <strong className="text-base font-black font-serif text-[#C8A14A] block">24/7 Global Airport Emergency Hotline</strong>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Direct emergency escalation desk for sudden flight diversions, lost passports, or last-minute VIP Fast Track dispatches across 45 airport hubs.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <Layers className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-base font-black font-serif text-[#081C15] block">Corporate Executive Delegation Billing</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                Unified monthly invoicing and credit terms for multinational corporations booking airport concierge for visiting C-suite executives and conference delegates.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
