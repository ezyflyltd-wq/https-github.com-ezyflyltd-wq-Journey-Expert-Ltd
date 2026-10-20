import React, { useState } from 'react';
import {
  Plane,
  Briefcase,
  CheckCircle2,
  QrCode,
  Download,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Flight } from '../types';
import { MOCK_FLIGHTS } from '../data/mockData';
import { DemoNotice, JEL_WHATSAPP_DISPLAY, JEL_WHATSAPP_NUMBER } from './DemoNotice';

interface FlightBookingViewProps {
  initialOrigin?: string;
  initialDestination?: string;
  initialGDS?: string;
}

export const FlightBookingView: React.FC<FlightBookingViewProps> = ({
  initialOrigin = 'Dhaka (DAC)',
  initialDestination = 'London Heathrow (LHR)',
  initialGDS = 'Auto',
}) => {
  const [flights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [selectedGDSFilter, setSelectedGDSFilter] = useState<string>(initialGDS);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // Booking Modal States
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<'details' | 'seat' | 'payment' | 'confirmation'>('details');
  const [selectedSeat, setSelectedSeat] = useState<string>('14A');

  // Passenger details
  const [passengerName, setPassengerName] = useState('');

  const filteredFlights = flights.filter((f) => {
    if (selectedGDSFilter !== 'Auto' && selectedGDSFilter !== 'All') {
      return f.gds === selectedGDSFilter;
    }
    return true;
  });

  const handleStartBooking = (flight: Flight) => {
    setSelectedFlight(flight);
    setBookingStep('details');
    setShowBookingModal(true);
  };

  // Nothing is booked or paid on this page. The request goes to a consultant on WhatsApp,
  // without passport, card or bank details.
  const handleSendRequest = () => {
    if (!selectedFlight) return;
    const message = [
      'Flight enquiry from journeyexpertltd.com (sample fare shown on the website, please confirm live fare and availability)',
      `Flight: ${selectedFlight.airline} ${selectedFlight.flightNumber}`,
      `Route: ${selectedFlight.originCode} → ${selectedFlight.destinationCode}, departing ${selectedFlight.departureTime}`,
      `Seat preference: ${selectedSeat}`,
      `Passenger name: ${passengerName.trim() || '(not provided)'}`,
    ].join('\n');
    window.open(`https://wa.me/${JEL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setBookingStep('confirmation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <DemoNotice subject="fares" />

      {/* Top Section Header */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <Plane className="w-4 h-4 text-[#C7A44D]" />
            <span>Flight enquiry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            {initialOrigin} <span className="text-[#C7A44D]">→</span> {initialDestination}
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-medium">
            Sample fares shown for illustration. A consultant confirms the live fare before anything is booked.
          </p>
        </div>

        {/* GDS Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#F8FAF9] p-1.5 rounded-2xl border border-[#ECECEC]">
          <span className="text-xs text-[#666666] font-bold px-2">Sample source:</span>
          {['Auto', 'Sabre', 'Amadeus', 'Travelport Galileo'].map((gds) => (
            <button
              key={gds}
              type="button"
              aria-pressed={selectedGDSFilter === gds}
              onClick={() => setSelectedGDSFilter(gds)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedGDSFilter === gds
                  ? 'bg-[#0B6B53] text-white shadow-sm'
                  : 'text-[#666666] hover:bg-white hover:text-[#093F31]'
              }`}
            >
              {gds}
            </button>
          ))}
        </div>
      </div>

      {/* Flight Cards Listing */}
      <div className="space-y-4">
        {filteredFlights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white border border-[#ECECEC] hover:border-[#0B6B53]/40 rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            {/* Airline & Flight Info */}
            <div className="flex items-start space-x-4 w-full lg:w-1/3">
              <img
                src={flight.airlineLogo}
                alt={flight.airline}
                className="w-12 h-12 rounded-2xl object-cover border border-[#ECECEC] shrink-0 p-1 bg-[#F8FAF9]"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-extrabold text-[#111111]">{flight.airline}</h3>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                      flight.gds === 'Sabre'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : flight.gds === 'Amadeus'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    GDS: {flight.gds}
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-0.5">
                  Flight: <span className="text-[#111111] font-mono font-bold">{flight.flightNumber}</span> • {flight.planeType}
                </p>
                <div className="flex items-center space-x-3 mt-2 text-xs text-[#666666]">
                  <span className="flex items-center font-medium">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-[#0B6B53]" />
                    Baggage: {flight.baggage}
                  </span>
                  <span className={flight.refundable ? 'text-[#0B6B53] font-bold' : 'text-[#666666]'}>
                    {flight.refundable ? '• Refundable' : '• Non-Refundable'}
                  </span>
                </div>
              </div>
            </div>

            {/* Flight Timing & Duration */}
            <div className="flex items-center justify-between w-full lg:w-2/5 border-y lg:border-y-0 lg:border-x border-[#ECECEC] py-4 lg:py-0 lg:px-6">
              <div className="text-left">
                <p className="text-xl font-black text-[#111111]">{flight.departureTime}</p>
                <p className="text-xs font-bold text-[#093F31]">{flight.originCode}</p>
                <p className="text-[11px] text-[#666666]">{flight.origin}</p>
              </div>

              <div className="flex flex-col items-center px-4">
                <span className="text-[10px] font-extrabold text-[#0B6B53]">{flight.duration}</span>
                <div className="relative w-28 h-0.5 bg-[#ECECEC] my-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#0B6B53] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
                </div>
                <span className="text-[10px] font-medium text-[#666666]">{flight.stops}</span>
              </div>

              <div className="text-right">
                <p className="text-xl font-black text-[#111111]">{flight.arrivalTime}</p>
                <p className="text-xs font-bold text-[#093F31]">{flight.destinationCode}</p>
                <p className="text-[11px] text-[#666666]">{flight.destination}</p>
              </div>
            </div>

            {/* Pricing & Booking Action */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between w-full lg:w-auto gap-3">
              <div className="text-right">
                <p className="text-[11px] text-[#666666] font-medium">Total Price (Inc. Tax)</p>
                <p className="text-2xl font-black text-[#0B6B53]">৳ {flight.priceBDT.toLocaleString()}</p>
                <p className="text-xs text-[#666666] font-semibold">approx. ${flight.priceUSD} USD</p>
              </div>

              <button
                onClick={() => handleStartBooking(flight)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Request Booking</span>
                <ChevronRight className="w-4 h-4 text-[#C7A44D]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING PROCESS MODAL */}
      {showBookingModal && selectedFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 text-[#111111]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div>
                <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest">
                  Flight booking request (sample fare)
                </span>
                <h3 className="text-lg font-black text-[#093F31] font-serif">
                  {selectedFlight.airline} ({selectedFlight.flightNumber})
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close flight booking dialog"
                onClick={() => setShowBookingModal(false)}
                className="p-2 bg-[#F8FAF9] hover:bg-[#ECECEC] text-[#111111] rounded-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Step Wizard Indicator */}
            <div className="flex items-center justify-between text-xs font-bold border-b border-[#ECECEC] pb-3">
              <span className={bookingStep === 'details' ? 'text-[#0B6B53] border-b-2 border-[#0B6B53] pb-1' : 'text-[#666666]'}>
                1. Passenger Info
              </span>
              <span className={bookingStep === 'seat' ? 'text-[#0B6B53] border-b-2 border-[#0B6B53] pb-1' : 'text-[#666666]'}>
                2. Seat Preference
              </span>
              <span className={bookingStep === 'payment' ? 'text-[#0B6B53] border-b-2 border-[#0B6B53] pb-1' : 'text-[#666666]'}>
                3. Send Request
              </span>
              <span className={bookingStep === 'confirmation' ? 'text-[#0B6B53] border-b-2 border-[#0B6B53] pb-1' : 'text-[#666666]'}>
                4. Next Steps
              </span>
            </div>

            {/* STEP 1: PASSENGER DETAILS */}
            {bookingStep === 'details' && (
              <div className="space-y-4 text-xs">
                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-4">
                  <h4 className="font-extrabold text-[#093F31] text-sm">Primary Passenger (Adult 1)</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="flight-passenger-name" className="block text-[#666666] font-semibold mb-1">Full Legal Name (as in Passport)</label>
                      <input
                        id="flight-passenger-name"
                        name="passengerName"
                        type="text"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-bold"
                      />
                    </div>
                    <div>
                      <label htmlFor="flight-nationality" className="block text-[#666666] font-semibold mb-1">Nationality</label>
                      <input
                        id="flight-nationality"
                        name="nationality"
                        type="text"
                        defaultValue="Bangladeshi"
                        className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-bold"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setBookingStep('seat')}
                  className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md transition-all"
                >
                  Proceed to Seat Selection →
                </button>
              </div>
            )}

            {/* STEP 2: SEAT MAP */}
            {bookingStep === 'seat' && (
              <div className="space-y-4 text-xs">
                <div className="text-center space-y-1">
                  <p className="font-extrabold text-[#093F31] text-sm">Select Your Preferred Seat on {selectedFlight.planeType}</p>
                  <p className="text-[#666666]">
                    Current selection: <span className="text-[#0B6B53] font-black">{selectedSeat}</span> (Window Seat)
                  </p>
                </div>

                {/* Simulated Seat Grid */}
                <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] max-w-md mx-auto space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-[#666666] px-2">
                    <span>WINDOW (A)</span>
                    <span>MIDDLE (B)</span>
                    <span>AISLE (C)</span>
                    <span className="w-4"></span>
                    <span>AISLE (D)</span>
                    <span>MIDDLE (E)</span>
                    <span>WINDOW (F)</span>
                  </div>

                  {['12', '14', '15', '16'].map((row) => (
                    <div key={row} className="flex justify-between items-center gap-1">
                      {['A', 'B', 'C'].map((col) => {
                        const seatId = `${row}${col}`;
                        const isSelected = selectedSeat === seatId;
                        return (
                          <button
                            key={seatId}
                            type="button"
                            aria-label={`Select seat ${seatId}`}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedSeat(seatId)}
                            className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                              isSelected
                                ? 'bg-[#C7A44D] text-[#093F31] font-black shadow-md scale-105'
                                : 'bg-white border border-[#ECECEC] text-[#111111] hover:bg-[#0B6B53] hover:text-white'
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                      <span className="text-[10px] font-bold text-[#666666] w-4 text-center">{row}</span>
                      {['D', 'E', 'F'].map((col) => {
                        const seatId = `${row}${col}`;
                        const isSelected = selectedSeat === seatId;
                        return (
                          <button
                            key={seatId}
                            type="button"
                            aria-label={`Select seat ${seatId}`}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedSeat(seatId)}
                            className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                              isSelected
                                ? 'bg-[#C7A44D] text-[#093F31] font-black shadow-md scale-105'
                                : 'bg-white border border-[#ECECEC] text-[#111111] hover:bg-[#0B6B53] hover:text-white'
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep('details')}
                    className="w-1/3 py-3 bg-[#F8FAF9] text-[#111111] font-bold rounded-2xl border border-[#ECECEC]"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setBookingStep('payment')}
                    className="w-2/3 py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md"
                  >
                    Next: Send Request →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SEND REQUEST (no payment is taken on this site) */}
            {bookingStep === 'payment' && (
              <div className="space-y-4 text-xs">
                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                  <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
                    <span className="text-[#666666] font-semibold">Sample fare (not a quotation):</span>
                    <span className="text-xl font-black text-[#0B6B53]">৳ {selectedFlight.priceBDT.toLocaleString()}</span>
                  </div>
                  <p className="text-[#111111] leading-relaxed">
                    No payment is taken here and no ticket is issued. We will send your flight details to a Journey Expert
                    consultant on WhatsApp, who will confirm the live fare, seat availability and payment options with you.
                  </p>
                  <p lang="bn" className="text-[#666666] leading-relaxed">
                    এখানে কোনো পেমেন্ট নেওয়া হয় না এবং টিকেট ইস্যু হয় না। আপনার ফ্লাইটের তথ্য WhatsApp-এ আমাদের কনসালট্যান্টের কাছে যাবে; তিনি সঠিক ভাড়া, সিট ও পেমেন্টের উপায় নিশ্চিত করবেন।
                  </p>
                  <p className="text-[10px] text-[#666666]">
                    Do not share passport, card or bank details in chat. A consultant will tell you the secure way to submit documents.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep('seat')}
                    className="w-1/3 py-3 bg-[#F8FAF9] text-[#111111] font-bold rounded-2xl border border-[#ECECEC]"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="w-2/3 py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md"
                  >
                    SEND REQUEST ON WHATSAPP
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: NEXT STEPS */}
            {bookingStep === 'confirmation' && (
              <div className="space-y-4 text-xs">
                <div className="bg-[#FFFBEA] border border-[#C7A44D]/50 p-5 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#C7A44D] mx-auto" aria-hidden="true" />
                  <h4 className="text-lg font-black text-[#093F31] font-serif">Your request is ready in WhatsApp</h4>
                  <p className="text-[#666666]">
                    Nothing is booked or paid yet. Press send in WhatsApp; a consultant will confirm the live fare and seats.
                    If WhatsApp did not open, message us on {JEL_WHATSAPP_DISPLAY}.
                  </p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="w-full py-3 bg-[#F8FAF9] text-[#111111] font-bold rounded-2xl border border-[#ECECEC]"
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
