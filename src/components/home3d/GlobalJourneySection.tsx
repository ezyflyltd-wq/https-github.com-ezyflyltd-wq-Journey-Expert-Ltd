import React, { useState } from 'react';
import {
  Globe2,
  Plane,
  FileCheck2,
  GraduationCap,
  Compass,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { GLOBAL_DESTINATIONS, type DestinationPoint } from './globeData';

interface GlobalJourneySectionProps {
  onSelectDestination: (dest: DestinationPoint) => void;
  onNavigateToModule: (module: string) => void;
}

export const GlobalJourneySection: React.FC<GlobalJourneySectionProps> = ({
  onSelectDestination,
  onNavigateToModule,
}) => {
  // Exclude Dhaka from destination choices list since it's the origin hub
  const destinations = GLOBAL_DESTINATIONS.filter((d) => d.id !== 'dac');
  const [activeDest, setActiveDest] = useState<DestinationPoint>(destinations[0]);

  return (
    <section className="relative py-24 bg-[#051711] text-white border-b border-[#0B5D3B]/40 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#0B5D3B]/20 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C8A14A]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B5D3B]/40 border border-emerald-500/30">
            <Globe2 className="w-4 h-4 text-[#C8A14A]" />
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              Global Route Network
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            FROM DHAKA <br />
            <span className="bg-gradient-to-r from-[#C8A14A] via-[#E6CA65] to-[#C8A14A] bg-clip-text text-transparent">
              TO THE WORLD.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            Direct connections, seamless transit routes, and end-to-end embassy visa support to the world's most sought-after study, travel, and business capitals.
          </p>
        </div>

        {/* Destination Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {destinations.map((dest) => {
            const isSelected = activeDest.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setActiveDest(dest)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#C8A14A] text-[#081C15] shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-[#081C15] text-slate-300 hover:text-white hover:bg-[#0B5D3B]/50 border border-[#0B5D3B]/50'
                }`}
              >
                <span>{dest.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-[#081C15] text-[#C8A14A]' : 'bg-white/10'}`}>
                  {dest.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Destination Feature Showcase Card */}
        <div className="bg-gradient-to-br from-[#081C15] via-[#051A13] to-[#040E0A] border-2 border-[#0B5D3B]/60 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-3.5 py-1 rounded-full bg-[#0B5D3B] text-emerald-300 font-mono text-xs font-black border border-emerald-400/30">
                  DAC ➔ {activeDest.code}
                </span>
                <span className="text-xs font-bold text-[#C8A14A] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A14A]" />
                  {activeDest.category} Destination
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-5xl font-black font-serif text-white uppercase tracking-tight">
                  {activeDest.name}
                </h3>
                <p className="text-sm font-bold text-emerald-400 mt-1 uppercase tracking-wider">
                  {activeDest.country} • {activeDest.category} Support
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {activeDest.description}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#081C15] border border-[#0B5D3B]/50 rounded-2xl p-4">
                  <span className="text-[10px] text-emerald-400 font-mono uppercase block">Flight Time</span>
                  <span className="text-sm font-extrabold text-white font-mono mt-1 block">
                    {activeDest.flightHoursFromDhaka}
                  </span>
                </div>

                <div className="bg-[#081C15] border border-[#0B5D3B]/50 rounded-2xl p-4 sm:col-span-2">
                  <span className="text-[10px] text-emerald-400 font-mono uppercase block">Visa Policy</span>
                  <span className="text-xs font-bold text-white mt-1 block line-clamp-1">
                    {activeDest.visaType}
                  </span>
                </div>
              </div>

              {/* Destination CTA Button */}
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => onSelectDestination(activeDest)}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 shadow-xl shadow-amber-500/20 cursor-pointer group"
                >
                  <span>Explore {activeDest.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigateToModule('flights')}
                  className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                >
                  Search Flights
                </button>
              </div>
            </div>

            {/* Right Visual / Route Telemetry Map Box */}
            <div className="lg:col-span-5 relative bg-[#081C15] border border-[#0B5D3B]/50 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#0B5D3B]/40 pb-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#C8A14A]" />
                  Aviation Route Coordinates
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {activeDest.lat.toFixed(2)}° N, {activeDest.lng.toFixed(2)}° E
                </span>
              </div>

              {/* Interactive Route Highlights */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-emerald-950/60">
                  <span className="text-slate-400">Origin Hub:</span>
                  <strong className="text-white font-mono">Hazrat Shahjalal Intl (DAC)</strong>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-b border-emerald-950/60">
                  <span className="text-slate-400">Destination Airport:</span>
                  <strong className="text-[#C8A14A] font-mono">{activeDest.name} ({activeDest.code})</strong>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-b border-emerald-950/60">
                  <span className="text-slate-400">GDS Network:</span>
                  <span className="text-emerald-300 font-mono">Sabre, Amadeus, Galileo</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-slate-400">JEL Support Desk:</span>
                  <span className="text-emerald-300 font-bold">24/7 Concierge & Visa File Audit</span>
                </div>
              </div>

              <div className="bg-[#051A13] border border-[#0B5D3B]/40 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-emerald-300 block">
                  Click below to open comprehensive destination profile & university checklist
                </span>
                <button
                  onClick={() => onSelectDestination(activeDest)}
                  className="mt-2 w-full py-2 bg-[#0B5D3B] hover:bg-[#0E7A4E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  View Full {activeDest.name} Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
