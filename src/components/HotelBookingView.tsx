import React, { useState } from 'react';
import {
  Building2,
  Star,
  MapPin,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Hotel } from '../types';
import { MOCK_HOTELS } from '../data/mockData';

export const HotelBookingView: React.FC = () => {
  const [hotels] = useState<Hotel[]>(MOCK_HOTELS);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <Building2 className="w-4 h-4 text-[#C7A44D]" />
            <span>Luxury & Halal Certified Hotel Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            Curated Hotels in Dubai, Cox's Bazar & Makkah
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-medium">
            Best rate guarantee with instant confirmation and flexible cancellation policies.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-[#F8FAF9] px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-xs">
          <ShieldCheck className="w-5 h-5 text-[#0B6B53]" />
          <span className="text-[#093F31] font-bold">100% Verified Halal Friendly Hotels</span>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white border border-[#ECECEC] rounded-3xl overflow-hidden hover:border-[#0B6B53]/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 flex flex-col justify-between"
          >
            {/* Image & Badges */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-[#093F31] text-xs font-black px-3 py-1 rounded-full flex items-center shadow-sm border border-[#ECECEC]">
                  <Star className="w-3.5 h-3.5 fill-[#C7A44D] text-[#C7A44D] mr-1" />
                  {hotel.rating} ({hotel.reviewCount} reviews)
                </span>
                {hotel.halalCertified && (
                  <span className="bg-[#0B6B53] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    Halal Certified
                  </span>
                )}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4 flex-grow">
              <div>
                <h3 className="text-lg font-black text-[#111111] hover:text-[#0B6B53] transition-colors">
                  {hotel.name}
                </h3>
                <p className="text-xs text-[#666666] flex items-center mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A44D] mr-1 shrink-0" />
                  {hotel.location}, {hotel.country}
                </p>
              </div>

              <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                {hotel.description}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {hotel.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F8FAF9] text-[#093F31] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#ECECEC]"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Footer */}
            <div className="p-6 bg-[#F8FAF9] border-t border-[#ECECEC] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Starting from</span>
                <span className="text-xl font-black text-[#0B6B53]">৳ {hotel.pricePerNightBDT.toLocaleString()}</span>
                <span className="text-[10px] text-[#666666] font-medium block">/ night (${hotel.pricePerNightUSD} USD)</span>
              </div>

              <button
                onClick={() => handleBookHotel(hotel)}
                className="px-5 py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-1"
              >
                <span>Select Room</span>
                <ChevronRight className="w-4 h-4 text-[#C7A44D]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Booking Modal */}
      {showBookingModal && selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-[#111111]">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
              <div>
                <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest">
                  Instant Hotel Confirmation
                </span>
                <h3 className="text-lg font-black text-[#093F31] font-serif">{selectedHotel.name}</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 bg-[#F8FAF9] hover:bg-[#ECECEC] text-[#111111] rounded-xl font-bold"
              >
                ✕
              </button>
            </div>

            {!bookingConfirmed ? (
              <div className="space-y-4 text-xs">
                <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-3">
                  <h4 className="font-extrabold text-[#093F31] text-sm">Available Room Types</h4>
                  {selectedHotel.rooms.map((room) => (
                    <div key={room.id} className="bg-white p-3.5 rounded-xl border border-[#ECECEC] flex justify-between items-center">
                      <div>
                        <p className="font-bold text-[#111111]">{room.title}</p>
                        <p className="text-[10px] text-[#666666]">{room.bedType} • {room.capacity}</p>
                        <p className="text-[10px] text-[#0B6B53] font-bold mt-0.5">
                          {room.breakfastIncluded ? '✓ Daily Breakfast Included' : ''}
                        </p>
                      </div>
                      <span className="font-black text-[#0B6B53] text-sm">৳ {room.priceBDT.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#666666] font-semibold mb-1">Check-in Date</label>
                    <input type="date" defaultValue="2026-09-20" className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-bold" />
                  </div>
                  <div>
                    <label className="block text-[#666666] font-semibold mb-1">Guest Name</label>
                    <input type="text" defaultValue="Tariqul Islam" className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-bold" />
                  </div>
                </div>

                <button
                  onClick={() => setBookingConfirmed(true)}
                  className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md transition-all"
                >
                  Confirm Reservation & Pay via bKash / Card
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#0B6B53] mx-auto animate-bounce" />
                <h4 className="text-xl font-black text-[#093F31] font-serif">Hotel Booking Confirmed!</h4>
                <p className="text-xs text-[#666666]">
                  Voucher sent to your email. Reservation Reference: <span className="text-[#0B6B53] font-mono font-bold">JEL-HT-88219</span>
                </p>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-6 py-2.5 bg-[#0B6B53] text-white font-bold rounded-xl text-xs mt-4 shadow-md"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
