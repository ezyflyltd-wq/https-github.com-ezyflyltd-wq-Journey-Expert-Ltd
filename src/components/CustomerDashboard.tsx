import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Wallet,
  FileCheck2,
  GraduationCap,
  PlusCircle,
  Download,
  LogIn,
  LogOut,
  ShieldCheck,
  Plane,
  Building2,
  Compass,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../firebase/authContext';
import {
  subscribeUserBookings,
  subscribeUserVisaApplications,
  subscribeUserWalletTransactions,
  addWalletTransaction,
  createBooking,
} from '../firebase/firestoreService';
import { FirestoreBooking, FirestoreVisaApplication, FirestoreWalletTransaction } from '../types';

export const CustomerDashboard: React.FC = () => {
  const { user, userProfile, signInWithGoogle, signOutUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'visa' | 'study' | 'wallet'>('bookings');
  
  const [bookings, setBookings] = useState<FirestoreBooking[]>([]);
  const [visaApps, setVisaApps] = useState<FirestoreVisaApplication[]>([]);
  const [transactions, setTransactions] = useState<FirestoreWalletTransaction[]>([]);
  
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(25000);
  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad' | 'SSLCommerz' | 'Stripe'>('bKash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Subscribe to real-time Firestore collections for the authenticated user
  useEffect(() => {
    if (!user) {
      // Fallback default demo data if not signed in
      setBookings([
        {
          bookingId: 'BK-BG201-9821',
          userId: 'demo-user',
          userEmail: 'traveler@journeyexpert.com',
          serviceType: 'flight',
          title: 'Biman Bangladesh Airlines (BG-201) • Dhaka (DAC) to London Heathrow (LHR)',
          routeOrDetails: 'Economy Flex • Seat 14A (Window) • 2x 23kg Baggage Included',
          travelDate: '15 Sept 2026, 10:30 AM',
          status: 'Confirmed',
          amountBDT: 88500,
          paymentStatus: 'Paid',
          paymentMethod: 'bKash Merchant',
          pnrOrReference: 'JEL-SABRE-80129',
        },
      ]);
      setVisaApps([
        {
          applicationId: 'VISA-UK-9041',
          userId: 'demo-user',
          userEmail: 'traveler@journeyexpert.com',
          applicantName: 'Tariqul Islam',
          passportNo: 'A08912345',
          country: 'United Kingdom',
          visaType: 'Standard Visitor Visa (6 Months Multi-Entry)',
          submissionDate: '12 Aug 2026',
          status: 'Embassy Appointment Scheduled',
          documentsCount: 8,
          feeBDT: 18500,
          notes: 'VFS Global Dhaka appointment confirmed for biometric submission.',
        },
      ]);
      setTransactions([
        {
          transactionId: 'TXN-99201',
          userId: 'demo-user',
          type: 'Deposit',
          amountBDT: 50000,
          method: 'bKash',
          status: 'Completed',
          reference: 'BKASH-TOPUP-9920',
          description: 'Instant Wallet Top-up via bKash Merchant Gateway',
          createdAt: new Date().toISOString(),
        },
        {
          transactionId: 'TXN-99184',
          userId: 'demo-user',
          type: 'Payment',
          amountBDT: 88500,
          method: 'Wallet',
          status: 'Completed',
          reference: 'JEL-SABRE-80129',
          description: 'Flight Booking: Dhaka to London Heathrow (BG-201)',
          createdAt: new Date().toISOString(),
        },
      ]);
      return;
    }

    const unsubBookings = subscribeUserBookings(user.uid, (data) => {
      if (data.length > 0) {
        setBookings(data);
      } else {
        // Create initial welcoming seed booking if empty
        const initialBooking: FirestoreBooking = {
          bookingId: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
          userId: user.uid,
          userEmail: user.email || 'traveler@journeyexpert.com',
          serviceType: 'flight',
          title: 'Emirates (EK-583) • Dhaka to Dubai International',
          routeOrDetails: 'Economy Saver • 30kg Baggage • Meal Included',
          travelDate: '24 Oct 2026, 01:40 AM',
          status: 'Confirmed',
          amountBDT: 62400,
          paymentStatus: 'Paid',
          paymentMethod: 'bKash',
          pnrOrReference: 'EK-JEL-44819',
        };
        createBooking(initialBooking).catch(console.error);
        setBookings([initialBooking]);
      }
    });

    const unsubVisa = subscribeUserVisaApplications(user.uid, (data) => {
      setVisaApps(data);
    });

    const unsubTxns = subscribeUserWalletTransactions(user.uid, (data) => {
      setTransactions(data);
    });

    return () => {
      unsubBookings();
      unsubVisa();
      unsubTxns();
    };
  }, [user]);

  const handleTopupWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const currentBalance = userProfile?.walletBalanceBDT || 150000;
      const newBalance = currentBalance + rechargeAmount;
      const newTxn: FirestoreWalletTransaction = {
        transactionId: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        userId: user?.uid || 'guest-user',
        type: 'Deposit',
        amountBDT: rechargeAmount,
        method: selectedMethod,
        status: 'Completed',
        reference: `${selectedMethod.toUpperCase()}-TOPUP-${Math.floor(1000 + Math.random() * 9000)}`,
        description: `Instant Wallet Deposit via ${selectedMethod}`,
        createdAt: new Date().toISOString(),
      };

      if (user) {
        await addWalletTransaction(newTxn, newBalance);
      } else {
        setTransactions([newTxn, ...transactions]);
      }
      setShowRechargeModal(false);
    } catch (err) {
      console.error('Wallet recharge error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadTicket = (title: string, pnr: string) => {
    setDownloadSuccess(`E-Ticket for PNR: ${pnr} generated and downloaded.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const currentWalletBalance = userProfile?.walletBalanceBDT ?? 150000;
  const currentLoyaltyPoints = userProfile?.loyaltyPoints ?? 12500;
  const currentTier = userProfile?.loyaltyTier ?? 'VIP JEL CLUB';
  const userName = userProfile?.displayName || user?.displayName || 'Tariqul Islam';
  const userEmail = userProfile?.email || user?.email || 'tariqul.islam@gmail.com';
  const passportNo = userProfile?.passportNo || 'A08912345';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Firebase Cloud Sync Status Notification */}
      {downloadSuccess && (
        <div className="bg-[#093F31] text-white p-4 rounded-2xl border border-[#C7A44D] flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#C7A44D]" />
            <span className="text-xs font-bold">{downloadSuccess}</span>
          </div>
        </div>
      )}

      {/* Customer Profile Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#093F31] p-0.5 shadow-md flex items-center justify-center font-black text-[#C7A44D] text-2xl font-serif shrink-0">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black text-[#093F31] font-serif">{userName}</h2>
              <span className="bg-[#C7A44D]/20 text-[#093F31] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#C7A44D]">
                {currentTier}
              </span>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Firebase Real-time Sync
              </span>
            </div>
            <p className="text-xs text-[#666666] font-medium mt-0.5">{userEmail} • +880 1711-223344</p>
            <div className="flex items-center space-x-3 mt-1 text-[11px]">
              <span className="text-[#0B6B53] font-bold">Passport: {passportNo}</span>
              <span className="text-[#666666]">•</span>
              <span className="text-[#C7A44D] font-bold">Points: {currentLoyaltyPoints.toLocaleString()} PTS</span>
            </div>
          </div>
        </div>

        {/* Quick Wallet Summary Card & Auth Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <div className="bg-[#F8FAF9] border border-[#ECECEC] p-4 sm:p-5 rounded-2xl flex items-center space-x-4 shrink-0">
            <div className="p-3 bg-[#0B6B53] rounded-xl text-white shadow-sm">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block">JEL Wallet Balance</span>
              <span className="text-2xl font-black text-[#0B6B53]">৳ {currentWalletBalance.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setShowRechargeModal(true)}
              className="p-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white rounded-xl shadow-md transition-all cursor-pointer"
              title="Recharge Wallet"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>

          {!user ? (
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="px-4 py-3 bg-[#093F31] hover:bg-[#0B6B53] text-white rounded-2xl text-xs font-black flex items-center space-x-2 shadow-md transition-all cursor-pointer border border-[#C7A44D]/40"
            >
              <LogIn className="w-4 h-4 text-[#C7A44D]" />
              <span>Google Sign-In</span>
            </button>
          ) : (
            <button
              onClick={signOutUser}
              className="px-3.5 py-3 bg-[#F8FAF9] hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#ECECEC] pb-3">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'bookings' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Ticket className="w-4 h-4 text-[#C7A44D]" />
          <span>My Flight & Hotel Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('visa')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'visa' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-[#C7A44D]" />
          <span>My Visa Applications ({visaApps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'study' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#C7A44D]" />
          <span>My Study Abroad Applications</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'wallet' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Wallet className="w-4 h-4 text-[#C7A44D]" />
          <span>Wallet Ledger & Top-ups ({transactions.length})</span>
        </button>
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.bookingId} className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#0B6B53]/30 transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#ECECEC] pb-4">
                <div>
                  <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest flex items-center gap-1.5">
                    {b.serviceType === 'flight' && <Plane className="w-3.5 h-3.5" />}
                    {b.serviceType === 'hotel' && <Building2 className="w-3.5 h-3.5" />}
                    {b.serviceType === 'package' && <Compass className="w-3.5 h-3.5" />}
                    GDS / NDC Confirmed Booking
                  </span>
                  <h3 className="text-base font-black text-[#093F31] font-serif mt-1">
                    {b.title}
                  </h3>
                </div>
                <span className="bg-[#0B6B53] text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
                  PNR: {b.pnrOrReference || b.bookingId}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#111111]">
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Travel Date</span>
                  <span className="font-bold text-[#111111]">{b.travelDate || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Details</span>
                  <span className="font-bold text-[#C7A44D] truncate block">{b.routeOrDetails || 'Economy Class'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Total Paid</span>
                  <span className="font-bold text-[#0B6B53]">৳ {b.amountBDT.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Status</span>
                  <span className="font-bold text-[#0B6B53]">✓ {b.status}</span>
                </div>
              </div>

              <button
                onClick={() => handleDownloadTicket(b.title, b.pnrOrReference || b.bookingId)}
                className="px-5 py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white text-xs font-extrabold rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-all"
              >
                <Download className="w-4 h-4 text-[#C7A44D]" />
                <span>Download Official E-Ticket / Voucher</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: VISA APPLICATIONS */}
      {activeTab === 'visa' && (
        <div className="space-y-4">
          {visaApps.length === 0 ? (
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-8 text-center text-[#666666] space-y-2">
              <FileCheck2 className="w-8 h-8 text-[#C7A44D] mx-auto" />
              <p className="font-bold text-sm text-[#111111]">No Visa Applications Found</p>
              <p className="text-xs">Apply for your next visa with our AI Visa Consultant.</p>
            </div>
          ) : (
            visaApps.map((app) => (
              <div key={app.applicationId} className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-3 shadow-sm">
                <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
                  <div>
                    <h4 className="font-black text-[#093F31] text-base font-serif">{app.country} {app.visaType}</h4>
                    <p className="text-xs text-[#666666]">Applicant: <span className="font-bold text-[#111111]">{app.applicantName}</span> • Tracking Ref: <span className="text-[#0B6B53] font-mono font-bold">{app.applicationId}</span></p>
                  </div>
                  <span className="bg-[#0B6B53] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-[#111111]">
                  <div>
                    <span className="text-[10px] text-[#666666] font-semibold block">Applied On</span>
                    <span>{app.submissionDate || 'Recently'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666666] font-semibold block">Verified Documents</span>
                    <span className="text-[#0B6B53] font-bold">{app.documentsCount || 6} Documents Uploaded</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666666] font-semibold block">Passport No</span>
                    <span className="font-mono">{app.passportNo || 'A08912345'}</span>
                  </div>
                </div>

                {app.notes && (
                  <p className="text-xs text-[#666666] bg-[#F8FAF9] p-3 rounded-xl border border-[#ECECEC]">
                    <span className="font-bold text-[#093F31]">Embassy Counselor Note:</span> {app.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: STUDY ABROAD */}
      {activeTab === 'study' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest">
                Under CAS Processing & Pre-Visa Clearance
              </span>
              <h3 className="text-base font-black text-[#093F31] font-serif">
                University of Coventry • MSc Data Science & Artificial Intelligence
              </h3>
            </div>
            <span className="bg-[#0B6B53] text-white text-xs font-bold px-3 py-1 rounded-full">
              Unconditional Offer Issued
            </span>
          </div>

          <p className="text-xs text-[#666666]">
            Intake: <span className="font-bold text-[#111111]">September 2026</span> • Tuition Fee: <span className="font-bold text-[#0B6B53]">£18,500/yr</span> • Scholarship: <span className="font-bold text-[#C7A44D]">£2,500 Approved</span>
          </p>
        </div>
      )}

      {/* TAB 4: WALLET LEDGER */}
      {activeTab === 'wallet' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#093F31] font-serif">Wallet Transaction History</h3>
            <button
              onClick={() => setShowRechargeModal(true)}
              className="px-4 py-2 bg-[#0B6B53] hover:bg-[#093F31] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#C7A44D]" />
              <span>Instant Top-up</span>
            </button>
          </div>

          <div className="space-y-2">
            {transactions.map((txn) => (
              <div key={txn.transactionId} className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC] flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-[#111111]">{txn.description}</p>
                  <p className="text-[10px] text-[#666666]">{txn.createdAt ? new Date(txn.createdAt).toLocaleDateString() : 'Recent'} • Ref: {txn.reference} ({txn.method || 'MFS'})</p>
                </div>
                <span className={`font-black text-sm ${txn.type === 'Deposit' || txn.type === 'Refund' || txn.type === 'Reward Cashback' ? 'text-[#0B6B53]' : 'text-[#111111]'}`}>
                  {txn.type === 'Deposit' || txn.type === 'Refund' || txn.type === 'Reward Cashback' ? `+৳ ${txn.amountBDT.toLocaleString()}` : `-৳ ${txn.amountBDT.toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECHARGE WALLET MODAL */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl text-[#111111]">
            <h3 className="text-lg font-black text-[#093F31] font-serif">Recharge JEL Customer Wallet</h3>
            <form onSubmit={handleTopupWallet} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#666666] font-bold mb-1.5">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['bKash', 'Nagad', 'SSLCommerz', 'Stripe'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        selectedMethod === method
                          ? 'border-[#0B6B53] bg-emerald-50 text-[#093F31]'
                          : 'border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#666666] font-bold mb-1.5">Recharge Amount (BDT)</label>
                <input
                  type="number"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl px-4 py-2.5 font-bold text-[#111111] focus:outline-hidden focus:border-[#0B6B53]"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRechargeModal(false)}
                  className="flex-1 py-3 bg-[#F8FAF9] hover:bg-[#ECECEC] text-[#666666] font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : `Pay ৳ ${rechargeAmount.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
