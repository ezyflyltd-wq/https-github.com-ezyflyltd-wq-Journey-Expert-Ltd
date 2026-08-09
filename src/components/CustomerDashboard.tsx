import React, { useState } from 'react';
import {
  Ticket,
  Wallet,
  FileCheck2,
  GraduationCap,
  PlusCircle,
  Download,
} from 'lucide-react';
import { WalletTransaction } from '../types';
import { MOCK_TRANSACTIONS, MOCK_VISA_APPLICATIONS } from '../data/mockData';

export const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'visa' | 'study' | 'wallet'>('bookings');
  const [walletBalance, setWalletBalance] = useState(150000);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(MOCK_TRANSACTIONS);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(50000);

  const handleTopupWallet = (e: React.FormEvent) => {
    e.preventDefault();
    setWalletBalance((prev) => prev + rechargeAmount);
    const newTxn: WalletTransaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Just Now',
      type: 'Deposit',
      amountBDT: rechargeAmount,
      method: 'bKash',
      status: 'Completed',
      reference: 'BKASH-TOPUP-9920',
      description: 'Instant Wallet Deposit via bKash Merchant',
    };
    setTransactions([newTxn, ...transactions]);
    setShowRechargeModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Customer Profile Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#093F31] p-0.5 shadow-md flex items-center justify-center font-black text-[#C7A44D] text-2xl font-serif">
            TI
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-[#093F31] font-serif">Tariqul Islam</h2>
              <span className="bg-[#C7A44D]/20 text-[#093F31] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#C7A44D]">
                VIP JEL CLUB
              </span>
            </div>
            <p className="text-xs text-[#666666] font-medium mt-0.5">tariqul.islam@gmail.com • +880 1711-223344</p>
            <p className="text-[11px] text-[#0B6B53] mt-1 font-bold">Passport: A08912345 (Valid to Nov 2030)</p>
          </div>
        </div>

        {/* Quick Wallet Summary Card */}
        <div className="bg-[#F8FAF9] border border-[#ECECEC] p-4 sm:p-5 rounded-2xl flex items-center space-x-4 shrink-0">
          <div className="p-3 bg-[#0B6B53] rounded-xl text-white shadow-sm">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block">JEL Wallet Balance</span>
            <span className="text-2xl font-black text-[#0B6B53]">৳ {walletBalance.toLocaleString()}</span>
          </div>
          <button
            onClick={() => setShowRechargeModal(true)}
            className="p-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white rounded-xl shadow-md transition-all"
            title="Recharge Wallet"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#ECECEC] pb-3">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'bookings' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Ticket className="w-4 h-4 text-[#C7A44D]" />
          <span>My Flight & Hotel Bookings</span>
        </button>

        <button
          onClick={() => setActiveTab('visa')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'visa' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-[#C7A44D]" />
          <span>My Visa Applications</span>
        </button>

        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'study' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#C7A44D]" />
          <span>My Study Abroad Applications</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'wallet' ? 'bg-[#0B6B53] text-white shadow-sm' : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Wallet className="w-4 h-4 text-[#C7A44D]" />
          <span>Wallet Ledger & Top-ups</span>
        </button>
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
              <div>
                <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest">
                  Sabre GDS Ticketed Booking
                </span>
                <h3 className="text-base font-black text-[#093F31] font-serif">
                  Biman Bangladesh Airlines (BG-201) • Dhaka to London Heathrow
                </h3>
              </div>
              <span className="bg-[#0B6B53] text-white text-xs font-bold px-3 py-1 rounded-full">
                PNR: JEL-SABRE-80129
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#111111]">
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Departure</span>
                <span className="font-bold text-[#111111]">15 Sept 2026, 10:30 AM</span>
              </div>
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Seat Assigned</span>
                <span className="font-bold text-[#C7A44D]">14A (Window)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Total Paid</span>
                <span className="font-bold text-[#0B6B53]">৳ 88,500</span>
              </div>
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Status</span>
                <span className="font-bold text-[#0B6B53]">✓ Ticketed & Confirmed</span>
              </div>
            </div>

            <button
              onClick={() => alert('Downloading official e-ticket PDF...')}
              className="px-5 py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white text-xs font-extrabold rounded-xl flex items-center space-x-2 shadow-md"
            >
              <Download className="w-4 h-4 text-[#C7A44D]" />
              <span>Download PDF E-Ticket</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: VISA APPLICATIONS */}
      {activeTab === 'visa' && (
        <div className="space-y-4">
          {MOCK_VISA_APPLICATIONS.map((app) => (
            <div key={app.id} className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-3 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
                <div>
                  <h4 className="font-black text-[#093F31] text-base font-serif">{app.country} {app.visaType}</h4>
                  <p className="text-xs text-[#666666]">Tracking Ref: <span className="text-[#0B6B53] font-mono font-bold">{app.trackingNumber}</span></p>
                </div>
                <span className="bg-[#0B6B53] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {app.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-[#111111]">
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Applied On</span>
                  <span>{app.appliedDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Estimated Completion</span>
                  <span className="text-[#0B6B53] font-bold">{app.estimatedCompletion}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Passport No</span>
                  <span className="font-mono">{app.passportNumber}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: STUDY ABROAD */}
      {activeTab === 'study' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-widest">
                Under CAS Processing
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
          <h3 className="text-base font-black text-[#093F31] font-serif">Wallet Transaction History</h3>
          <div className="space-y-2">
            {transactions.map((txn) => (
              <div key={txn.id} className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC] flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-[#111111]">{txn.description}</p>
                  <p className="text-[10px] text-[#666666]">{txn.date} • Ref: {txn.reference} ({txn.method})</p>
                </div>
                <span className={`font-black text-sm ${txn.amountBDT > 0 ? 'text-[#0B6B53]' : 'text-[#111111]'}`}>
                  {txn.amountBDT > 0 ? `+৳ ${txn.amountBDT.toLocaleString()}` : `-৳ ${Math.abs(txn.amountBDT).toLocaleString()}`}
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
                <label className="block text-[#666666] font-semibold mb-1">Enter Deposit Amount (BDT ৳)</label>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-3 text-lg font-black text-[#0B6B53]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRechargeModal(false)}
                  className="w-1/3 py-3 bg-[#F8FAF9] text-[#111111] font-bold rounded-xl border border-[#ECECEC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md"
                >
                  PAY VIA BKASH / NAGAD / CARD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
