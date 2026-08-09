import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { TourPackage } from '../types';
import { MOCK_PACKAGES } from '../data/mockData';

export const PackagesView: React.FC = () => {
  const [packages] = useState<TourPackage[]>(MOCK_PACKAGES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  const filteredPackages = packages.filter((pkg) => {
    if (selectedCategory === 'All') return true;
    return pkg.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <Compass className="w-4 h-4 text-[#C7A44D]" />
            <span>Tour Packages & Guided Excursions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            Hajj, Executive Umrah, International & Eco Tours
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-medium">
            Handpicked itineraries with 5-star hotels, visas, guide assistance, and meals included.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-[#F8FAF9] p-1.5 rounded-2xl border border-[#ECECEC]">
          {['All', 'Hajj & Umrah', 'International', 'Bangladesh'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B6B53] text-white shadow-sm'
                  : 'text-[#666666] hover:bg-white hover:text-[#093F31]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border border-[#ECECEC] rounded-3xl overflow-hidden hover:border-[#0B6B53]/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 flex flex-col justify-between"
          >
            <div className="relative h-56">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#0B6B53] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                {pkg.category}
              </span>
              <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#093F31] text-xs font-black px-3 py-1 rounded-full shadow-sm border border-[#ECECEC]">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-[#C7A44D]" />
                {pkg.durationDays}D / {pkg.durationNights}N
              </span>
            </div>

            <div className="p-6 space-y-3 flex-grow">
              <h3 className="text-base font-black text-[#111111] leading-snug">{pkg.title}</h3>
              <p className="text-xs text-[#666666] flex items-center font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C7A44D] mr-1 shrink-0" />
                {pkg.destination}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#ECECEC]">
                {pkg.highlights.slice(0, 3).map((hl, idx) => (
                  <p key={idx} className="text-xs text-[#111111] flex items-start font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B53] mr-1.5 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#F8FAF9] border-t border-[#ECECEC] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Package Price</span>
                <span className="text-xl font-black text-[#0B6B53]">৳ {pkg.priceBDT.toLocaleString()}</span>
                <span className="text-[10px] text-[#666666] font-medium block">per person (${pkg.priceUSD})</span>
              </div>

              <button
                onClick={() => setActivePackageModal(pkg)}
                className="px-5 py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-1"
              >
                <span>Itinerary</span>
                <ChevronRight className="w-4 h-4 text-[#C7A44D]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ITINERARY MODAL */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 text-[#111111]">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
              <div>
                <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest">
                  {activePackageModal.category}
                </span>
                <h3 className="text-lg font-black text-[#093F31] font-serif">{activePackageModal.title}</h3>
              </div>
              <button
                onClick={() => setActivePackageModal(null)}
                className="p-2 bg-[#F8FAF9] hover:bg-[#ECECEC] text-[#111111] rounded-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Itinerary breakdown */}
            <div className="space-y-4 text-xs">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-3 max-h-60 overflow-y-auto">
                <h4 className="font-extrabold text-[#093F31] text-sm">Day-by-Day Itinerary</h4>
                {activePackageModal.itinerary.map((day) => (
                  <div key={day.day} className="border-l-2 border-[#0B6B53] pl-3 space-y-0.5">
                    <p className="font-bold text-[#0B6B53]">Day {day.day}: {day.title}</p>
                    <p className="text-[#666666] leading-relaxed">{day.details}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-[#111111]">
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <p className="font-extrabold text-[#0B6B53] mb-1">Inclusions</p>
                  <ul className="space-y-1 text-[#666666]">
                    {activePackageModal.inclusions.map((inc, i) => (
                      <li key={i}>✓ {inc}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                  <p className="font-extrabold text-[#C7A44D] mb-1">Upcoming Departure</p>
                  <p className="text-[#093F31] font-black text-sm">{activePackageModal.upcomingDeparture}</p>
                  <p className="text-[10px] text-[#666666] mt-1">Limited seats remaining.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Inquiry submitted for ${activePackageModal.title}! A JEL Tour Expert will contact you shortly.`);
                  setActivePackageModal(null);
                }}
                className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md transition-all"
              >
                BOOK PACKAGE NOW (৳ {activePackageModal.priceBDT.toLocaleString()})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
