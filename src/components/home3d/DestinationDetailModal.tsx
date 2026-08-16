import React from 'react';
import {
  X,
  Plane,
  Compass,
  FileCheck2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Send,
  Zap,
} from 'lucide-react';
import { DestinationPoint } from './InteractiveGlobe3D';

interface DestinationDetailModalProps {
  destination: DestinationPoint | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToModule: (module: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  onNavigateToModule,
}) => {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#081C15] text-white border border-[#0B5D3B]/60 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header Glow Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[#0B5D3B]/40 via-[#081C15] to-[#040E0A] border-b border-[#0B5D3B]/40">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-[#C8A14A] text-[#081C15] rounded-full text-xs font-black tracking-widest uppercase font-mono">
              {destination.code}
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A14A]" />
              AI Route Intelligence
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-2">
            {destination.name},{' '}
            <span className="text-emerald-300 font-normal text-xl">{destination.country}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Intelligence Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#051711] border border-[#0B5D3B]/50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Flight Time</span>
              </div>
              <p className="text-base font-extrabold font-mono text-white">
                {destination.flightHoursFromDhaka}
              </p>
              <p className="text-[10px] text-emerald-400/80 mt-0.5">Direct & 1-stop options</p>
            </div>

            <div className="bg-[#051711] border border-[#0B5D3B]/50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Visa Type</span>
              </div>
              <p className="text-xs font-bold text-white line-clamp-1">{destination.visaType}</p>
              <p className="text-[10px] text-emerald-400/80 mt-0.5">JEL File Preparation Ready</p>
            </div>

            <div className="bg-[#051711] border border-[#0B5D3B]/50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-[#C8A14A] mb-1">
                <Compass className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Category</span>
              </div>
              <p className="text-base font-extrabold text-white">{destination.category}</p>
              <p className="text-[10px] text-emerald-400/80 mt-0.5">Global Mobility Ecosystem</p>
            </div>
          </div>

          {/* Action Pathways */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A14A]">
              Connect With JEL Specialized Services
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToModule('flights');
                }}
                className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#0B5D3B]/30 to-emerald-950/40 hover:from-[#0B5D3B] hover:to-[#094732] border border-[#0B5D3B]/60 rounded-2xl transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-[#093F31] text-[#C8A14A]">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Search Flight Tickets</span>
                    <span className="text-[10px] text-emerald-300">Sabre & Amadeus live seats</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C8A14A] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToModule('visa');
                }}
                className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#0B5D3B]/30 to-emerald-950/40 hover:from-[#0B5D3B] hover:to-[#094732] border border-[#0B5D3B]/60 rounded-2xl transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-[#093F31] text-[#C8A14A]">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Check Visa Checklist</span>
                    <span className="text-[10px] text-emerald-300">Requirements & documentation</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C8A14A] group-hover:translate-x-1 transition-transform" />
              </button>

              {destination.category === 'Study' && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToModule('study-abroad');
                  }}
                  className="sm:col-span-2 flex items-center justify-between p-3.5 bg-gradient-to-r from-[#C8A14A]/20 to-amber-950/40 hover:from-[#C8A14A] hover:to-[#A38030] hover:text-[#081C15] border border-[#C8A14A]/50 rounded-2xl transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-[#081C15] text-[#C8A14A] group-hover:bg-[#081C15] group-hover:text-white">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white group-hover:text-[#081C15] block">
                        Explore {destination.name} Partner Universities
                      </span>
                      <span className="text-[10px] text-emerald-300 group-hover:text-[#081C15]">
                        500+ Institutions, CAS & Scholarship guidance
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C8A14A] group-hover:text-[#081C15] group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Disclaimer & Close */}
        <div className="p-4 sm:px-8 bg-[#040E0A] border-t border-[#0B5D3B]/40 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            Official JEL Global Intelligence
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0B5D3B] hover:bg-emerald-600 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
