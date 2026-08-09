import React, { useState } from 'react';
import {
  Plane,
  Building2,
  Compass,
  FileCheck2,
  GraduationCap,
  Sparkles,
  ArrowRightLeft,
  Search,
  Calendar,
  Users,
  Bot,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { MainViewModule } from '../types';

interface HeroSearchProps {
  activeModule: MainViewModule;
  onModuleChange: (module: MainViewModule) => void;
  onOpenAIModal: () => void;
  onSearchFlights: (origin: string, destination: string, gds: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeModule,
  onModuleChange,
  onOpenAIModal,
  onSearchFlights,
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'packages' | 'visa' | 'study-abroad'>('flights');

  // Flight search fields
  const [origin, setOrigin] = useState('Dhaka (DAC)');
  const [destination, setDestination] = useState('London Heathrow (LHR)');
  const [departureDate, setDepartureDate] = useState('2026-09-15');
  const [returnDate, setReturnDate] = useState('2026-09-30');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'round' | 'oneway' | 'multicity'>('round');
  const [preferredGDS, setPreferredGDS] = useState<'Auto' | 'Sabre' | 'Amadeus' | 'Travelport Galileo'>('Auto');

  // AI Prompt State
  const [aiQuickQuery, setAiQuickQuery] = useState('');

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleExecuteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onModuleChange(activeTab as MainViewModule);
    if (activeTab === 'flights') {
      onSearchFlights(origin, destination, preferredGDS);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#F8FAF9] via-white to-[#F8FAF9] text-[#111111] py-12 md:py-20 overflow-hidden">
      {/* Decorative Subtle Ambient Background Glows */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-[#0B6B53]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#C7A44D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#093F31]/5 border border-[#0B6B53]/20 text-[#093F31] text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A44D] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Multi-GDS Live Engine • Sabre • Amadeus • Galileo</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#093F31] font-serif leading-tight">
            Bangladesh's Premier <span className="gold-shimmer-text">AI Travel & Global Mobility</span> Platform
          </h1>

          <p className="text-sm sm:text-base text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Search live airfares across global GDS networks, book luxury hotels, apply for visas,
            and match top UK, Canada & Australia universities in seconds.
          </p>
        </div>

        {/* AI Prompt Quick Bar */}
        <div className="max-w-4xl mx-auto mb-10 bg-white border border-[#C7A44D]/40 rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#0B6B53]/5 transition-all hover:border-[#C7A44D] hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center space-x-2 text-[#093F31] font-extrabold text-xs shrink-0 bg-[#0B6B53]/10 px-3 py-2 rounded-xl">
              <Bot className="w-4 h-4 text-[#0B6B53]" />
              <span>Ask JEL AI:</span>
            </div>

            <input
              type="text"
              value={aiQuickQuery}
              onChange={(e) => setAiQuickQuery(e.target.value)}
              placeholder='e.g., "Find cheap flights to London in September with 30kg baggage & student visa guidance"'
              className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl px-4 py-2.5 text-xs text-[#111111] placeholder-[#666666] focus:outline-none focus:border-[#0B6B53] focus:bg-white transition-all"
            />

            <button
              onClick={onOpenAIModal}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#093F31] hover:bg-[#0B6B53] text-white font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 border border-[#C7A44D]/30"
            >
              <Sparkles className="w-4 h-4 text-[#C7A44D]" />
              <span>Ask AI Expert</span>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#666666]">
            <span className="font-semibold text-[#093F31]">Quick Queries:</span>
            <button
              onClick={() => {
                setAiQuickQuery('Compare Biman vs Emirates flight price to London');
                onOpenAIModal();
              }}
              className="bg-[#F8FAF9] hover:bg-[#0B6B53]/10 border border-[#ECECEC] text-[#111111] px-2.5 py-1 rounded-lg transition-colors font-medium"
            >
              Biman vs Emirates to London
            </button>
            <button
              onClick={() => {
                setAiQuickQuery('UK Student Visa documents list for Bangladesh passport');
                onOpenAIModal();
              }}
              className="bg-[#F8FAF9] hover:bg-[#0B6B53]/10 border border-[#ECECEC] text-[#111111] px-2.5 py-1 rounded-lg transition-colors font-medium"
            >
              UK Student Visa checklist
            </button>
            <button
              onClick={() => {
                setAiQuickQuery('14-Day Umrah package with 5 star hotel in Makkah');
                onOpenAIModal();
              }}
              className="bg-[#F8FAF9] hover:bg-[#0B6B53]/10 border border-[#ECECEC] text-[#111111] px-2.5 py-1 rounded-lg transition-colors font-medium"
            >
              5-Star Umrah Package
            </button>
          </div>
        </div>

        {/* Tabbed Search Console Container */}
        <div className="max-w-5xl mx-auto bg-white border border-[#ECECEC] rounded-3xl p-5 sm:p-8 shadow-xl shadow-[#0B6B53]/5">
          {/* Service Module Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-6 border-b border-[#ECECEC] pb-4">
            <button
              onClick={() => {
                setActiveTab('flights');
                onModuleChange('flights');
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'flights'
                  ? 'bg-[#0B6B53] text-white shadow-md'
                  : 'bg-[#F8FAF9] text-[#666666] hover:bg-white hover:text-[#093F31] border border-[#ECECEC]'
              }`}
            >
              <Plane className={`w-4 h-4 ${activeTab === 'flights' ? 'text-[#C7A44D]' : 'text-[#0B6B53]'}`} />
              <span>Flights</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('hotels');
                onModuleChange('hotels');
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'hotels'
                  ? 'bg-[#0B6B53] text-white shadow-md'
                  : 'bg-[#F8FAF9] text-[#666666] hover:bg-white hover:text-[#093F31] border border-[#ECECEC]'
              }`}
            >
              <Building2 className={`w-4 h-4 ${activeTab === 'hotels' ? 'text-[#C7A44D]' : 'text-[#0B6B53]'}`} />
              <span>Hotels</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('packages');
                onModuleChange('packages');
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'packages'
                  ? 'bg-[#0B6B53] text-white shadow-md'
                  : 'bg-[#F8FAF9] text-[#666666] hover:bg-white hover:text-[#093F31] border border-[#ECECEC]'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'packages' ? 'text-[#C7A44D]' : 'text-[#0B6B53]'}`} />
              <span>Tour Packages</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('visa');
                onModuleChange('visa');
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'visa'
                  ? 'bg-[#0B6B53] text-white shadow-md'
                  : 'bg-[#F8FAF9] text-[#666666] hover:bg-white hover:text-[#093F31] border border-[#ECECEC]'
              }`}
            >
              <FileCheck2 className={`w-4 h-4 ${activeTab === 'visa' ? 'text-[#C7A44D]' : 'text-[#0B6B53]'}`} />
              <span>Visa Portal</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('study-abroad');
                onModuleChange('study-abroad');
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'study-abroad'
                  ? 'bg-[#0B6B53] text-white shadow-md'
                  : 'bg-[#F8FAF9] text-[#666666] hover:bg-white hover:text-[#093F31] border border-[#ECECEC]'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeTab === 'study-abroad' ? 'text-[#C7A44D]' : 'text-[#0B6B53]'}`} />
              <span>Study Abroad</span>
            </button>
          </div>

          {/* FLIGHT SEARCH FORM */}
          {activeTab === 'flights' && (
            <form onSubmit={handleExecuteSearch} className="space-y-4">
              {/* Trip Type & GDS Provider Selection Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-4 bg-[#F8FAF9] p-1.5 rounded-xl border border-[#ECECEC]">
                  <label className="flex items-center space-x-1.5 cursor-pointer px-2 py-1 rounded">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'round'}
                      onChange={() => setTripType('round')}
                      className="accent-[#0B6B53]"
                    />
                    <span className="text-[#111111] font-bold">Round Trip</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer px-2 py-1 rounded">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'oneway'}
                      onChange={() => setTripType('oneway')}
                      className="accent-[#0B6B53]"
                    />
                    <span className="text-[#111111] font-bold">One Way</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer px-2 py-1 rounded">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'multicity'}
                      onChange={() => setTripType('multicity')}
                      className="accent-[#0B6B53]"
                    />
                    <span className="text-[#111111] font-bold">Multi-City</span>
                  </label>
                </div>

                {/* Multi-GDS Provider Selector */}
                <div className="flex items-center space-x-2 bg-[#F8FAF9] px-3 py-1.5 rounded-xl border border-[#ECECEC]">
                  <span className="text-[#666666] font-semibold">GDS Engine:</span>
                  <select
                    value={preferredGDS}
                    onChange={(e: any) => setPreferredGDS(e.target.value)}
                    className="bg-transparent text-[#093F31] font-bold focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="Auto">Auto Lowest Fare (Sabre + Amadeus + Galileo)</option>
                    <option value="Sabre">Sabre GDS Direct (1S)</option>
                    <option value="Amadeus">Amadeus Altéa (1A)</option>
                    <option value="Travelport Galileo">Travelport Galileo (1G)</option>
                  </select>
                </div>
              </div>

              {/* Origin / Destination Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Origin Input */}
                <div className="md:col-span-5 bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC] hover:border-[#0B6B53] transition-all">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">From Airport</span>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#0B6B53] shrink-0" />
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm text-[#111111] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSwapAirports}
                    className="p-3 bg-white hover:bg-[#0B6B53] text-[#0B6B53] hover:text-white rounded-2xl border border-[#ECECEC] shadow-sm transition-all transform hover:rotate-180"
                    title="Swap Origin & Destination"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Destination Input */}
                <div className="md:col-span-5 bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC] hover:border-[#0B6B53] transition-all">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">To Airport</span>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#C7A44D] shrink-0" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm text-[#111111] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Passengers Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Departure Date</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#0B6B53] shrink-0" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-transparent font-bold text-xs text-[#111111] focus:outline-none"
                    />
                  </div>
                </div>

                {tripType === 'round' && (
                  <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                    <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Return Date</span>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#0B6B53] shrink-0" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-transparent font-bold text-xs text-[#111111] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className={`bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC] ${tripType !== 'round' ? 'sm:col-span-2' : ''}`}>
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Passengers & Cabin</span>
                  <div className="flex items-center justify-between space-x-2 text-xs">
                    <div className="flex items-center space-x-1 text-[#111111] font-bold">
                      <Users className="w-4 h-4 text-[#C7A44D]" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="bg-white border border-[#ECECEC] text-[#111111] font-bold rounded-lg p-1"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults, 1 Child</option>
                        <option value={4}>4 Adults (Family)</option>
                      </select>
                    </div>

                    <select
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className="bg-white border border-[#ECECEC] text-[#093F31] font-bold rounded-lg p-1"
                    >
                      <option value="Economy">Economy Class</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business Class</option>
                      <option value="First Class">First Class</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Search Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5 text-[#C7A44D]" />
                  <span>SEARCH LIVE FARES ACROSS SABRE, AMADEUS & GALILEO</span>
                </button>
              </div>
            </form>
          )}

          {/* HOTEL SEARCH FORM */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">City or Destination</span>
                  <input
                    type="text"
                    defaultValue="Dubai, United Arab Emirates"
                    className="w-full bg-transparent font-bold text-sm text-[#111111] focus:outline-none"
                    placeholder="Enter city or hotel name"
                  />
                </div>
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Check-In / Out</span>
                  <input type="date" defaultValue="2026-09-20" className="w-full bg-transparent text-xs font-bold text-[#111111]" />
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-[#666666] font-medium">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0B6B53]" />
                  <span>Halal Certified Food</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0B6B53]" />
                  <span>Free Airport Shuttle</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#0B6B53]" />
                  <span>Beachfront / Haram View</span>
                </label>
              </div>

              <button
                onClick={() => onModuleChange('hotels')}
                className="w-full py-4 px-6 rounded-2xl bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5 text-[#C7A44D]" />
                <span>SEARCH LUXURY HOTELS</span>
              </button>
            </div>
          )}

          {/* VISA SEARCH FORM */}
          {activeTab === 'visa' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Select Destination Country</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#111111] font-bold text-xs p-2 rounded-xl">
                    <option value="UK">🇬🇧 United Kingdom (UK)</option>
                    <option value="SA">🇸🇦 Saudi Arabia (Tourist / Umrah)</option>
                    <option value="CA">🇨🇦 Canada (Student & Visitor)</option>
                    <option value="TH">🇹🇭 Thailand</option>
                    <option value="MY">🇲🇾 Malaysia</option>
                  </select>
                </div>
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Visa Category</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#111111] font-bold text-xs p-2 rounded-xl">
                    <option value="Tourist">Tourist / Visitor Visa</option>
                    <option value="Student">Student Visa (Tier 4 / Study Permit)</option>
                    <option value="Business">Business Visa</option>
                    <option value="Medical">Medical Tourism Visa</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => onModuleChange('visa')}
                className="w-full py-4 px-6 rounded-2xl bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <FileCheck2 className="w-5 h-5 text-[#C7A44D]" />
                <span>VIEW VISA REQUIREMENTS & APPLY ONLINE</span>
              </button>
            </div>
          )}

          {/* STUDY ABROAD SEARCH FORM */}
          {activeTab === 'study-abroad' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Study Country</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#111111] font-bold text-xs p-2 rounded-xl">
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="MY">Malaysia</option>
                  </select>
                </div>
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Degree Level</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#111111] font-bold text-xs p-2 rounded-xl">
                    <option value="Master">Master Degree / MSc / MBA</option>
                    <option value="Bachelor">Bachelor Degree / BSc</option>
                    <option value="PhD">PhD / Doctorate</option>
                  </select>
                </div>
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Your IELTS Score</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#093F31] font-bold text-xs p-2 rounded-xl">
                    <option value="6.5">6.5 (Overall)</option>
                    <option value="6.0">6.0 (Overall)</option>
                    <option value="7.0">7.0 (Overall)</option>
                    <option value="None">IELTS Waiver Eligible</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => onModuleChange('study-abroad')}
                className="w-full py-4 px-6 rounded-2xl bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-5 h-5 text-[#C7A44D]" />
                <span>MATCH UNIVERSITIES & SCHOLARSHIPS</span>
              </button>
            </div>
          )}

          {/* PACKAGES TAB */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Package Category</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#111111] font-bold text-xs p-2 rounded-xl">
                    <option value="Hajj & Umrah">Hajj & Umrah Executive Packages</option>
                    <option value="International">International Holiday Tours</option>
                    <option value="Bangladesh">Bangladesh Local Eco Tours</option>
                    <option value="Medical Tourism">Medical Tourism Packages (Bangkok/Kolkata)</option>
                  </select>
                </div>
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block mb-1">Departure Month</span>
                  <select className="w-full bg-white border border-[#ECECEC] text-[#111111] font-bold text-xs p-2 rounded-xl">
                    <option value="Sept">September 2026</option>
                    <option value="Oct">October 2026</option>
                    <option value="Nov">November 2026</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => onModuleChange('packages')}
                className="w-full py-4 px-6 rounded-2xl bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-5 h-5 text-[#C7A44D]" />
                <span>EXPLORE TOUR PACKAGES</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
