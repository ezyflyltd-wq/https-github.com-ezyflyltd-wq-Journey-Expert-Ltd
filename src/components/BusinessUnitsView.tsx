import React, { useState } from 'react';
import {
  Sparkles,
  Building,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import { BusinessUnit } from '../types';
import { MOCK_BUSINESS_UNITS } from '../data/mockData';

export const BusinessUnitsView: React.FC = () => {
  const [businessUnits] = useState<BusinessUnit[]>(MOCK_BUSINESS_UNITS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <Building className="w-4 h-4 text-[#C7A44D]" />
            <span>Journey Expert Ltd. Corporate Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            Specialized Business Units & Strategic Subsidiaries
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-medium">
            Delivering end-to-end global mobility, airport concierge, aviation research, travel media, and cultural trade.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F8FAF9] px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-xs text-[#093F31] font-bold">
          <Sparkles className="w-5 h-5 text-[#C7A44D]" />
          <span>5 Operational Business Units</span>
        </div>
      </div>

      {/* Business Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessUnits.map((bu) => (
          <div
            key={bu.id}
            className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-4 hover:border-[#0B6B53]/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#F8FAF9] text-[#093F31] text-xs font-black px-3 py-1 rounded-full border border-[#ECECEC]">
                  {bu.shortCode}
                </span>
                <span className="text-[10px] text-[#666666] uppercase font-bold tracking-wider">JEL Division</span>
              </div>

              <h3 className="text-xl font-black text-[#093F31] font-serif">{bu.name}</h3>
              <p className="text-xs font-extrabold text-[#0B6B53]">{bu.tagline}</p>
              <p className="text-xs text-[#666666] leading-relaxed font-medium">{bu.description}</p>

              <div className="pt-3 space-y-1.5 border-t border-[#ECECEC]">
                <p className="text-[10px] uppercase font-bold text-[#666666] tracking-wider">Core Capabilities:</p>
                {bu.services.map((svc, i) => (
                  <p key={i} className="text-xs text-[#111111] flex items-center font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B53] mr-1.5 shrink-0" />
                    <span>{svc}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECECEC] flex items-center justify-between">
              <span className="text-[11px] text-[#666666] flex items-center font-semibold">
                <Mail className="w-3.5 h-3.5 text-[#C7A44D] mr-1" />
                {bu.leadContact}
              </span>

              <button
                onClick={() => alert(`Inquiry sent to ${bu.name} (${bu.leadContact}).`)}
                className="px-4 py-2 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
              >
                Contact Unit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
