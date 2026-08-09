import React, { useState, useEffect } from 'react';
import {
  User,
  Crown,
  Gift,
  Wallet,
  Share2,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Award,
  CheckCircle2,
  RefreshCw,
  Plane,
  Hotel,
  Compass,
  FileCheck,
  GraduationCap,
  ShoppingBag,
  Heart,
  Moon,
  Star,
  Copy,
  Check,
  Zap,
  PhoneCall,
  Clock,
  ArrowRight,
  TrendingUp,
  Sliders,
  DollarSign,
  Ticket,
  ChevronRight,
  Send,
  MessageCircle,
} from 'lucide-react';

export const CustomerLoyaltyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'profile-360' | 'membership-tiers' | 'rewards-referral' | 'ai-personalization' | 'omnichannel-support'
  >('profile-360');

  const [customerData, setCustomerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Rewards Simulator State
  const [pointsToRedeem, setPointsToRedeem] = useState(50000);
  const [redemptionValueBDT, setRedemptionValueBDT] = useState(2500);

  // Referral State
  const [copiedReferral, setCopiedReferral] = useState(false);

  // AI Chat Assistant State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Engr. Tanvir! Welcome to Journey Expert Super App. As a Journey Elite member, how may I assist your upcoming travel to London or Dubai?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    fetchCustomer360Overview();
  }, []);

  const fetchCustomer360Overview = () => {
    setLoading(true);
    fetch('/api/customer/360-overview')
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Customer 360:', err);
        setLoading(false);
      });
  };

  const handleRedeemPointsChange = (points: number) => {
    setPointsToRedeem(points);
    // 20 points = 1 BDT
    setRedemptionValueBDT(Math.floor(points / 20));
  };

  const handleCopyReferral = (code: string) => {
    navigator.clipboard.writeText(`https://journeyexpert.com/signup?ref=${code}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Thank you for your query regarding "${userText}". As a Journey Elite member, I have alerted your dedicated relationship manager (Mr. Farhan Rahman) and applied a 10% instant promo code "ELITE-SUPREME" to your account.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - CUSTOMER 360 & LOYALTY SUPER APP */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • CUSTOMER 360 & SUPER APP ECOSYSTEM (PART 26)
              </span>
              <span className="bg-amber-900/60 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Crown className="w-3 h-3 text-[#C8A14A]" />
                <span>JOURNEY ELITE MEMBER • 142,500 POINTS</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Customer 360, Loyalty & Super App Platform
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              One Unified Account across Flights, Hotels, Tours, Visas, Study Abroad, Craft Bangla Shopping, Healthcare & Hajj/Umrah with Instant Reward Redemptions & AI Personalization.
            </p>
          </div>

          {/* Quick Member Status Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Member Identity:</span>
              <span className="text-white font-mono font-black text-sm">
                {customerData?.customer360?.fullName || 'Engr. Tanvir Ahmed'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Membership Tier:</span>
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                {customerData?.customer360?.membershipTier || 'JOURNEY ELITE'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Wallet Cash Balance:</span>
              <span className="text-amber-300 font-mono font-black text-sm">
                BDT {(customerData?.customer360?.walletBalanceBDT || 45000).toLocaleString()}
              </span>
            </div>

            <button
              onClick={fetchCustomer360Overview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Customer Profile</span>
            </button>
          </div>
        </div>

        {/* Global Key Member Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Reward Points Balance</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {(customerData?.customer360?.loyaltyPoints || 142500).toLocaleString()} PTS
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Lifetime Spend (BDT)</span>
            <span className="text-lg font-black text-white font-mono">
              ৳{(customerData?.customer360?.totalLifetimeSpentBDT || 1850000).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Completed Trips</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {customerData?.customer360?.lifetimeTripsCompleted || 14} Journeys
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Referral Code</span>
            <span className="text-xs font-black text-amber-300 font-mono truncate block">
              {customerData?.customer360?.referralCode || 'TANVIR-ELITE-2026'}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Points Multiplier</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              3x Points
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Concierge Desk</span>
            <span className="text-lg font-black text-white font-mono">
              24/7 VIP Direct
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile-360')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'profile-360'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <User className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Customer 360 Super App Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('membership-tiers')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'membership-tiers'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Crown className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Membership Tiers & Privileges</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards-referral')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'rewards-referral'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Gift className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Rewards Wallet & Referral Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-personalization')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-personalization'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Gemini AI Personalization Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('omnichannel-support')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'omnichannel-support'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Omnichannel Support & Tickets</span>
        </button>
      </div>

      {/* TAB 1: CUSTOMER 360 SUPER APP PROFILE */}
      {activeTab === 'profile-360' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Single Unified Customer Identity
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Connected Verticals Across All Services
              </h3>
            </div>
            <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              Passport Verified • 100% GDPR & Privacy Protected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Plane className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Flight & Hotel History</strong>
              <p className="text-[11px] text-[#666666]">
                14 Flights completed • Preferred: Emirates Business Class • Lounge Access Activated
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <FileCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Visa & Passport Vault</strong>
              <p className="text-[11px] text-[#666666]">
                {customerData?.customer360?.visaStatusSummary || 'UK 10-Year Multi-Entry Valid'}
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <GraduationCap className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Study Abroad Profile</strong>
              <p className="text-[11px] text-[#666666]">
                Target: UK MSc Data Science • IELTS Score: 8.0 • Offer Letter Issued
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <ShoppingBag className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Craft Bangla Shopping</strong>
              <p className="text-[11px] text-[#666666]">
                2 Artisan Jamdani Sarees Purchased • 500 Reward Points Earned
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERSHIP TIERS & PRIVILEGES */}
      {activeTab === 'membership-tiers' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Tier Progression & VIP Privileges
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey Membership Framework
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerData?.membershipTiers?.map((m: any, idx: number) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  m.tier === 'Journey Elite'
                    ? 'bg-[#081C15] text-white border-[#C8A14A] shadow-xl'
                    : 'bg-[#F8FAF9] border-[#ECECEC] text-[#111111]'
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <strong className={`font-serif font-black text-base ${m.tier === 'Journey Elite' ? 'text-[#C8A14A]' : 'text-[#081C15]'}`}>
                    {m.tier}
                  </strong>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-white">
                    {m.pointsMultiplier}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold opacity-75 block">Minimum Lifetime Spend:</span>
                  <strong className="text-sm font-mono block">৳{m.minSpentBDT.toLocaleString()}</strong>

                  <span className="text-[10px] uppercase font-bold opacity-75 block mt-3">Key Privileges:</span>
                  <ul className="space-y-1.5 text-[11px]">
                    {m.perks.map((p: string, pIdx: number) => (
                      <li key={pIdx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A14A] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REWARDS WALLET & REFERRAL HUB */}
      {activeTab === 'rewards-referral' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Instant Point Redemptions & Referral Cashbacks
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Reward Redemption Calculator & Referral Tracker
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Redemption Simulator */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30 shadow-xl">
              <span className="font-serif font-black text-lg text-[#C8A14A] block">Instant Reward Points Redemption</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">
                    Select Points to Redeem (Balance: 142,500 PTS)
                  </label>
                  <input
                    type="range"
                    min={1000}
                    max={142500}
                    step={1000}
                    value={pointsToRedeem}
                    onChange={(e) => handleRedeemPointsChange(Number(e.target.value))}
                    className="w-full accent-[#C8A14A]"
                  />
                  <div className="flex justify-between text-xs font-mono text-emerald-200 mt-1">
                    <span>1,000 PTS</span>
                    <span className="font-bold text-amber-300">{pointsToRedeem.toLocaleString()} PTS</span>
                    <span>142,500 PTS</span>
                  </div>
                </div>

                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-emerald-200 font-bold uppercase block">Instant BDT Discount Value</span>
                  <strong className="text-3xl font-mono font-black text-amber-300">BDT {redemptionValueBDT.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-200 block">Applicable on Flights, Hotels, Visas or Craft Bangla</span>
                </div>

                <button className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Gift className="w-4 h-4 text-[#C8A14A]" />
                  <span>Redeem Points to Wallet Balance</span>
                </button>
              </div>
            </div>

            {/* Referral Hub */}
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-5">
              <span className="font-serif font-black text-lg text-[#081C15] block">Refer & Earn BDT 1,000 Per Friend</span>

              <p className="text-xs text-[#666666] leading-relaxed">
                Share your personal Journey Elite referral code with friends, colleagues, and family. They get BDT 500 off their first booking, and you earn BDT 1,000 wallet cash instantly.
              </p>

              <div className="bg-white border border-[#ECECEC] p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#666666] uppercase block">Your Personal Referral Link:</span>
                <div className="flex items-center justify-between bg-[#F8FAF9] p-2.5 rounded-xl border border-[#ECECEC]">
                  <code className="text-xs font-mono text-[#081C15] font-bold">
                    https://journeyexpert.com/signup?ref=TANVIR-ELITE-2026
                  </code>
                  <button
                    onClick={() => handleCopyReferral('TANVIR-ELITE-2026')}
                    className="p-2 bg-[#0B5D3B] text-white rounded-lg shrink-0 ml-2"
                  >
                    {copiedReferral ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GEMINI AI PERSONALIZATION ENGINE */}
      {activeTab === 'ai-personalization' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Predictive AI Next-Best-Action & Personalized Offers
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Gemini Customer Intelligence Engine
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerData?.aiPersonalizedOffers?.map((offer: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  PROMO: {offer.promoCode}
                </span>
                <strong className="text-sm font-bold text-[#081C15] font-serif block">{offer.title}</strong>
                <p className="text-[11px] text-[#666666] leading-relaxed">{offer.reason}</p>
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-900 pt-2 border-t border-[#ECECEC]">
                  <span>Expires in: {offer.expiresDays} days</span>
                  <button className="text-[#0B5D3B] underline">Apply Code</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: OMNICHANNEL SUPPORT & TICKETS */}
      {activeTab === 'omnichannel-support' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              24/7 VIP Concierge & Omnichannel Support
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              AI Concierge Live Chat & Ticket Tracking
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Chat Box */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl flex flex-col justify-between h-[420px]">
              <div>
                <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                  <Sparkles className="w-5 h-5 text-[#C8A14A]" />
                  <strong className="font-serif font-black text-sm text-[#C8A14A]">
                    Journey Elite VIP AI Concierge
                  </strong>
                </div>

                <div className="space-y-3 mt-4 max-h-64 overflow-y-auto pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                        msg.sender === 'user'
                          ? 'bg-[#0B5D3B] text-white ml-auto'
                          : 'bg-white/10 text-emerald-100 border border-white/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 border-t border-white/10 pt-3">
                <input
                  type="text"
                  placeholder="Ask VIP Concierge anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#0B5D3B] hover:bg-emerald-700 text-white rounded-xl shrink-0"
                >
                  <Send className="w-4 h-4 text-[#C8A14A]" />
                </button>
              </div>
            </div>

            {/* Support Ticket Status */}
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-4">
              <span className="font-serif font-black text-lg text-[#081C15] block">Active Customer Support Tickets</span>

              <div className="space-y-3">
                {customerData?.recentSupportTickets?.map((t: any, i: number) => (
                  <div key={i} className="bg-white border border-[#ECECEC] p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                      <span className="font-mono font-bold text-[10px] text-[#0B5D3B]">{t.id}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {t.status}
                      </span>
                    </div>
                    <strong className="text-xs font-bold text-[#081C15] block">{t.subject}</strong>
                    <div className="flex items-center justify-between text-[10px] text-[#666666]">
                      <span>Priority: <strong className="text-rose-700">{t.priority}</strong></span>
                      <span>Updated: {t.updatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
