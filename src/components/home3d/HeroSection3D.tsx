import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Plane,
  FileCheck2,
  GraduationCap,
  Compass,
  ShieldCheck,
  Search,
  Calendar,
  Users,
  MapPin,
  Building2,
  Zap,
  Globe2,
} from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import type { DestinationPoint } from './globeData';
import { GlobePoster } from './GlobePoster';

const InteractiveGlobe3D = lazy(() =>
  import('./InteractiveGlobe3D').then(({ InteractiveGlobe3D: Component }) => ({ default: Component })),
);
import { DestinationDetailModal } from './DestinationDetailModal';

interface HeroSection3DProps {
  onExploreJourney: () => void;
  onOpenAIModal: () => void;
  onNavigateToModule: (module: string) => void;
  onSearchFlights?: (origin: string, destination: string, gds: string) => void;
}

export const HeroSection3D: React.FC<HeroSection3DProps> = ({
  onExploreJourney,
  onOpenAIModal,
  onNavigateToModule,
  onSearchFlights,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<DestinationPoint | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [interactiveGlobeEnabled, setInteractiveGlobeEnabled] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileViewport = typeof window !== 'undefined'
    && window.matchMedia('(max-width: 767px)').matches;
  const saveData = typeof navigator !== 'undefined'
    && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

  useEffect(() => {
    if (prefersReducedMotion || isMobileViewport || saveData) return;

    const activationTimer = window.setTimeout(() => {
      setInteractiveGlobeEnabled(true);
    }, 1200);

    return () => window.clearTimeout(activationTimer);
  }, [isMobileViewport, prefersReducedMotion, saveData]);

  // Quick Flight Search Form State
  const [origin, setOrigin] = useState('Dhaka (DAC)');
  const [destination, setDestination] = useState('London (LHR)');
  const [tripType, setTripType] = useState<'round' | 'oneWay'>('round');
  const [travelClass, setTravelClass] = useState('Economy');
  const [travelDate, setTravelDate] = useState('2026-09-15');

  const handleGlobeDestinationSelect = (dest: DestinationPoint) => {
    setSelectedDestination(dest);
    setIsDetailModalOpen(true);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchFlights) {
      onSearchFlights(origin, destination, 'Auto');
    } else {
      onNavigateToModule('flights');
    }
  };

  return (
    <div className="relative min-h-[100svh] sm:min-h-[92vh] bg-gradient-to-b from-[#081C15] via-[#051711] to-[#040E0A] text-white overflow-hidden flex flex-col justify-between w-full max-w-full">
      {/* Ambient Aurora Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] max-w-full bg-[#0B5D3B]/20 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] max-w-full bg-[#C8A14A]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] max-w-full bg-[#10B981]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-[1400px] w-[calc(100%-24px)] sm:w-[calc(100%-32px)] md:w-[calc(100%-48px)] mx-auto pt-6 sm:pt-12 pb-8 sm:pb-12 w-full flex-grow flex flex-col justify-center min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center w-full min-w-0">
          {/* Left Column: Vision, Typography & Calls to Action */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 text-left min-w-0">
            {/* Top Micro-Tag */}
            <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-[#10B981]/30 backdrop-blur-md max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono truncate">
                The World, Connected by Intelligence
              </span>
            </div>

            {/* Main Bold Display Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black font-serif tracking-tight leading-[1.08] text-white break-words">
              TRAVEL BEYOND <br />
              <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
                THE ORDINARY.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl font-normal leading-relaxed">
              AI-powered travel, global mobility and study-abroad solutions — designed around your journey.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreJourney}
                className="px-6 sm:px-7 py-3.5 rounded-2xl bg-[#0B5D3B] hover:bg-[#0E7A4E] text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#0B5D3B]/40 hover:shadow-emerald-600/50 border border-emerald-400/40 transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer group"
              >
                <span>Explore Journey</span>
                <ArrowRight className="w-4 h-4 text-[#C8A14A] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAIModal}
                className="px-6 sm:px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase backdrop-blur-md border border-white/20 hover:border-[#C8A14A]/60 transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer group"
              >
                <Bot className="w-4 h-4 text-[#C8A14A]" />
                <span>Talk to AI Expert</span>
              </button>
            </div>

            {/* Small Trust Statement */}
            <div className="pt-3 border-t border-emerald-900/50 flex items-center space-x-2.5 text-xs text-emerald-300/80 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="truncate">Travel Intelligence • Global Mobility • Human Expertise</span>
            </div>

            {/* Live AI Route Calculation Metrics Ticker */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-2 max-w-lg min-w-0">
              <div className="bg-[#051A13]/90 border border-[#0B5D3B]/50 rounded-xl p-2 sm:p-2.5 min-w-0">
                <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block uppercase truncate">Global Routes</span>
                <span className="text-xs sm:text-sm font-black text-white font-mono truncate block">900+ Airlines</span>
              </div>
              <div className="bg-[#051A13]/90 border border-[#0B5D3B]/50 rounded-xl p-2 sm:p-2.5 min-w-0">
                <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block uppercase truncate">Visa Pathways</span>
                <span className="text-xs sm:text-sm font-black text-[#C8A14A] font-mono truncate block">40+ Countries</span>
              </div>
              <div className="bg-[#051A13]/90 border border-[#0B5D3B]/50 rounded-xl p-2 sm:p-2.5 min-w-0">
                <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block uppercase truncate">Universities</span>
                <span className="text-xs sm:text-sm font-black text-white font-mono truncate block">500+ Partners</span>
              </div>
            </div>
          </div>

          {/* Right Column: static-first globe with opt-in/lazy WebGL */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full min-w-0 flex items-center justify-center">
            {interactiveGlobeEnabled ? (
              <Suspense fallback={<GlobePoster />}>
                <InteractiveGlobe3D
                  onSelectDestination={handleGlobeDestinationSelect}
                  selectedDestinationId="lhr"
                />
              </Suspense>
            ) : (
              <GlobePoster onEnableInteractive={() => setInteractiveGlobeEnabled(true)} />
            )}
          </div>
        </div>

        {/* Floating Quick Search Dock */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-emerald-900/40 w-full min-w-0">
          <form
            onSubmit={handleQuickSearch}
            className="bg-[#051A13]/95 backdrop-blur-xl border border-[#0B5D3B]/60 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-black/80"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#C8A14A] uppercase tracking-wider flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#C8A14A]" />
                  Multi-GDS Live Fare Query
                </span>
                <span className="text-[10px] bg-[#0B5D3B]/60 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Sabre • Amadeus • Galileo
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTripType('round')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    tripType === 'round'
                      ? 'bg-[#0B5D3B] text-white border border-emerald-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneWay')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    tripType === 'oneWay'
                      ? 'bg-[#0B5D3B] text-white border border-emerald-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  One Way
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Origin */}
              <div className="bg-[#081C15] border border-[#0B5D3B]/40 rounded-2xl p-3 focus-within:border-[#C8A14A] transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  From (Origin)
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#C8A14A] shrink-0" />
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                    placeholder="e.g. Dhaka (DAC)"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="bg-[#081C15] border border-[#0B5D3B]/40 rounded-2xl p-3 focus-within:border-[#C8A14A] transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  To (Destination)
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#C8A14A] shrink-0" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                    placeholder="e.g. London (LHR)"
                  />
                </div>
              </div>

              {/* Date & Class */}
              <div className="bg-[#081C15] border border-[#0B5D3B]/40 rounded-2xl p-3 focus-within:border-[#C8A14A] transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Departure Date
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#C8A14A] shrink-0" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Submit Button */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full h-full min-h-[52px] rounded-2xl bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Destination Interactive Dialog Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onNavigateToModule={onNavigateToModule}
      />
    </div>
  );
};
