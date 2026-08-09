import React, { useState, useEffect } from 'react';
import {
  Users,
  Wallet,
  TrendingUp,
  PlusCircle,
  Settings,
  Globe2,
  ShieldCheck,
  CreditCard,
  Building2,
  Plane,
  FileText,
  Key,
  RefreshCw,
  Search,
  Sparkles,
  Zap,
  Bot,
  ExternalLink,
  DollarSign,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Layers,
  GraduationCap,
  Award,
} from 'lucide-react';

export const AgentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'flight-gds' | 'hotels-packages' | 'visa-study' | 'markups' | 'whitelabel' | 'b2b-api' | 'ai-b2b'
  >('dashboard');

  const [b2bData, setB2bData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Markup state
  const [markupType, setMarkupType] = useState<'flat' | 'percentage'>('flat');
  const [markupValue, setMarkupValue] = useState(2500);

  // Top Up Modal State
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(100000);
  const [topUpMethod, setTopUpMethod] = useState<'bkash' | 'nagad' | 'bank' | 'card'>('bkash');

  // Group Booking Modal State
  const [showGroupModal, setShowGroupModal] = useState(false);

  // White Label State
  const [wlDomain, setWlDomain] = useState('booking.dhakaglobaltravel.com');
  const [wlBrandName, setWlBrandName] = useState('Dhaka Global Air Services');
  const [wlColor, setWlColor] = useState('#093F31');

  // Copy notification
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchB2bData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/b2b/overview');
      const data = await res.json();
      setB2bData(data);
    } catch (err) {
      console.error('Failed to load B2B data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchB2bData();
  }, []);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top B2B Header Banner */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#C7A44D] text-[#093F31] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
              {b2bData?.agentProfile?.tierLevel || 'PLATINUM B2B AGENT'}
            </span>
            <span className="text-xs font-mono text-emerald-200">
              Agent ID: {b2bData?.agentProfile?.agentCode || 'AG-78901'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-serif">
            {b2bData?.agentProfile?.agencyName || 'Dhaka Global Express & Air Travel Ltd.'}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-100/90 font-medium">
            <span>Trade License: <strong className="text-white">{b2bData?.agentProfile?.tradeLicense}</strong></span>
            <span>•</span>
            <span>Sabre PCC: <strong className="text-[#C7A44D] font-mono">{b2bData?.agentProfile?.sabrePCC}</strong></span>
            <span>•</span>
            <span>Amadeus Office: <strong className="text-[#C7A44D] font-mono">{b2bData?.agentProfile?.amadeusOfficeId}</strong></span>
            <span>•</span>
            <span>Galileo: <strong className="text-[#C7A44D] font-mono">{b2bData?.agentProfile?.galileoPCC}</strong></span>
          </div>
        </div>

        {/* Financial Balance Summary Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center space-x-4 shrink-0 z-10 w-full sm:w-auto justify-between sm:justify-start">
          <div className="p-3 bg-[#C7A44D] rounded-xl text-[#093F31] shadow-md">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
              Available B2B Credit Balance
            </span>
            <span className="text-2xl font-black text-white font-serif">
              ৳ {(b2bData?.agentProfile?.availableCreditBDT || 3180000).toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-300 font-bold block">
              Pre-funded Wallet: ৳ {(b2bData?.agentProfile?.walletDepositBDT || 1840000).toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setShowTopUpModal(true)}
            className="px-4 py-2 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black text-xs rounded-xl shadow-lg transition-all"
          >
            + Add Funds
          </button>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'dashboard'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#C7A44D]" />
          <span>1. Dashboard & Wallets</span>
        </button>

        <button
          onClick={() => setActiveTab('flight-gds')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'flight-gds'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Plane className="w-4 h-4 text-[#C7A44D]" />
          <span>2. Flight & GDS Desk</span>
        </button>

        <button
          onClick={() => setActiveTab('hotels-packages')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'hotels-packages'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C7A44D]" />
          <span>3. Hotel, Group & Umrah</span>
        </button>

        <button
          onClick={() => setActiveTab('visa-study')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'visa-study'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#C7A44D]" />
          <span>4. Visa & Study B2B</span>
        </button>

        <button
          onClick={() => setActiveTab('markups')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'markups'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Settings className="w-4 h-4 text-[#C7A44D]" />
          <span>5. Commission & Markups</span>
        </button>

        <button
          onClick={() => setActiveTab('whitelabel')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'whitelabel'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Globe2 className="w-4 h-4 text-[#C7A44D]" />
          <span>6. White Label SaaS</span>
        </button>

        <button
          onClick={() => setActiveTab('b2b-api')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'b2b-api'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Key className="w-4 h-4 text-[#C7A44D]" />
          <span>7. B2B API Distribution</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-b2b')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-b2b'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C7A44D]" />
          <span>8. AI Yield & Risk Assistant</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD & WALLETS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 text-xs text-[#111111]">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Assigned Credit Line</span>
              <span className="text-2xl font-black text-[#093F31] font-mono">
                ৳ {(b2bData?.agentProfile?.creditLimitBDT || 5000000).toLocaleString()}
              </span>
              <span className="text-[10px] text-[#0B6B53] font-bold block">100% Guaranteed by JEL</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Deposit Wallet Balance</span>
              <span className="text-2xl font-black text-[#0B6B53] font-mono">
                ৳ {(b2bData?.agentProfile?.walletDepositBDT || 1840000).toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">Instant Ticketing Ready</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Commission Rate</span>
              <span className="text-2xl font-black text-[#C7A44D] font-serif">
                {b2bData?.agentProfile?.commissionRatePercent || 8.5}%
              </span>
              <span className="text-[10px] text-[#666666] font-bold block">Platinum Tier Benefit</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Agency Score</span>
              <span className="text-2xl font-black text-[#093F31] font-mono">
                {b2bData?.agentProfile?.performanceScore || 98.4} / 100
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">Top 5% Agency Network</span>
            </div>
          </div>

          {/* Recent B2B Bookings Table */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Recent Issued B2B Tickets & Vouchers</h3>
              <button onClick={fetchB2bData} className="text-[#0B6B53] font-bold text-xs flex items-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync GDS PNRs</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                    <th className="p-3">PNR Code</th>
                    <th className="p-3">Service & Route</th>
                    <th className="p-3">Passenger</th>
                    <th className="p-3">GDS Fare</th>
                    <th className="p-3">Markup Revenue</th>
                    <th className="p-3">Total Charged</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {b2bData?.b2bBookings?.map((b: any, i: number) => (
                    <tr key={i} className="hover:bg-[#F8FAF9]">
                      <td className="p-3 font-mono font-black text-[#0B6B53]">{b.pnr}</td>
                      <td className="p-3 font-bold text-[#111111]">{b.service}</td>
                      <td className="p-3">{b.passenger}</td>
                      <td className="p-3 font-mono">৳ {b.gdsFareBDT.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-[#C7A44D]">+৳ {b.agentMarkupBDT.toLocaleString()}</td>
                      <td className="p-3 font-mono font-black text-[#093F31]">৳ {b.totalChargedBDT.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FLIGHT & GDS BOOKING DESK */}
      {activeTab === 'flight-gds' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Multi-GDS Direct Access Platform
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Sabre (1S), Amadeus (1A) & Galileo (1G) Booking Engine
              </h3>
            </div>

            <button
              onClick={() => setShowGroupModal(true)}
              className="px-4 py-2.5 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black rounded-2xl shadow-md transition-all flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>+ Offline Group Booking Desk (10+ Pax)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC]">
            <div>
              <label className="block text-[#666666] font-semibold mb-1">Origin (IATA)</label>
              <input type="text" defaultValue="DAC - Dhaka, Bangladesh" className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
            </div>
            <div>
              <label className="block text-[#666666] font-semibold mb-1">Destination (IATA)</label>
              <input type="text" defaultValue="LHR - London Heathrow, UK" className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
            </div>
            <div>
              <label className="block text-[#666666] font-semibold mb-1">Departure Date</label>
              <input type="date" defaultValue="2026-09-15" className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
            </div>
            <div className="flex items-end">
              <button className="w-full py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md">
                Search GDS Wholesale Fares
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DYNAMIC MARKUPS & COMMISSION */}
      {activeTab === 'markups' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Yield Management & Sub-Agent Pricing
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Dynamic B2B Markup & Commission Engine Rules
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
              <h4 className="font-extrabold text-[#093F31] text-sm">Configure Global Agency Ticket Markup</h4>
              <p className="text-[#666666] leading-relaxed">
                Automatically add agency profit margins on live Sabre and Amadeus search results shown to sub-agents or walk-in clients.
              </p>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setMarkupType('flat')}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                      markupType === 'flat' ? 'bg-[#0B6B53] text-white border-[#0B6B53]' : 'bg-white text-[#111111] border-[#ECECEC]'
                    }`}
                  >
                    Flat Rate (BDT ৳)
                  </button>
                  <button
                    onClick={() => setMarkupType('percentage')}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                      markupType === 'percentage' ? 'bg-[#0B6B53] text-white border-[#0B6B53]' : 'bg-white text-[#111111] border-[#ECECEC]'
                    }`}
                  >
                    Percentage (%)
                  </button>
                </div>

                <div>
                  <label className="block text-[#666666] font-semibold mb-1">Markup Fee per Ticket Segment</label>
                  <input
                    type="number"
                    value={markupValue}
                    onChange={(e) => setMarkupValue(Number(e.target.value))}
                    className="w-full bg-white border border-[#ECECEC] rounded-xl p-3 text-[#0B6B53] font-black text-sm"
                  />
                </div>

                <button
                  onClick={() => alert(`Saved global agency markup: ৳ ${markupValue} per segment!`)}
                  className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md"
                >
                  SAVE GLOBAL MARKUP RULE
                </button>
              </div>
            </div>

            <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-4">
              <span className="font-extrabold text-[#C7A44D] text-sm block">Tiered Commission Schedule</span>
              <div className="space-y-2 text-xs">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex justify-between">
                  <span>Standard Flight Base Commission</span>
                  <strong className="text-[#C7A44D]">7.0% Flight Gross</strong>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex justify-between">
                  <span>Platinum Tier Override Bonus</span>
                  <strong className="text-[#C7A44D]">1.5% Extra Bonus</strong>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex justify-between">
                  <span>Hotel Wholesale Commission</span>
                  <strong className="text-[#C7A44D]">12.0% Net Rate</strong>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex justify-between">
                  <span>Visa & Study Abroad Referral Payout</span>
                  <strong className="text-[#C7A44D]">৳ 15,000 / Enrolled File</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: WHITE LABEL SAAS */}
      {activeTab === 'whitelabel' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Turnkey White Label OTA SaaS Solution
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Launch Your Branded Travel Portal Engine
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Custom Agency Domain Name</label>
                <input
                  type="text"
                  value={wlDomain}
                  onChange={(e) => setWlDomain(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-3 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Agency Brand Name</label>
                <input
                  type="text"
                  value={wlBrandName}
                  onChange={(e) => setWlBrandName(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-3 font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Primary Brand Theme Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={wlColor}
                    onChange={(e) => setWlColor(e.target.value)}
                    className="w-12 h-10 rounded-lg cursor-pointer border border-[#ECECEC]"
                  />
                  <span className="font-mono font-bold text-[#093F31]">{wlColor}</span>
                </div>
              </div>

              <button
                onClick={() => alert(`White Label configuration published for ${wlDomain}!`)}
                className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md"
              >
                PUBLISH WHITE LABEL OTA PORTAL
              </button>
            </div>

            {/* Live Preview Box */}
            <div className="bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl p-5 space-y-3">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Live White Label Preview</span>
              <div
                className="p-4 rounded-xl text-white font-bold flex justify-between items-center shadow-md"
                style={{ backgroundColor: wlColor }}
              >
                <span className="font-serif text-sm">{wlBrandName}</span>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-1 rounded">SSL SECURE</span>
              </div>
              <div className="p-4 bg-white border border-[#ECECEC] rounded-xl space-y-2 text-center text-[#666666]">
                <p className="font-bold text-[#111111]">Search Flights & Hotels on {wlDomain}</p>
                <p className="text-[10px]">Powered by Journey Expert Ltd. Cloud Multi-GDS Engine</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: B2B API DISTRIBUTION */}
      {activeTab === 'b2b-api' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              REST & GraphQL API Keys Distribution
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Multi-GDS Flight & Hotel API Gateway Keys
            </h3>
          </div>

          <div className="space-y-4">
            {b2bData?.apiDistributionKeys?.map((k: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[#093F31] text-sm">{k.keyName}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {k.status} • {k.rateLimitPerMin} req/min
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={k.apiKey}
                    className="flex-1 bg-white border border-[#ECECEC] rounded-xl p-2.5 font-mono text-xs font-bold text-[#0B6B53]"
                  />
                  <button
                    onClick={() => handleCopyKey(k.apiKey)}
                    className="px-3 py-2.5 bg-[#0B6B53] text-white font-bold rounded-xl flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === k.apiKey ? 'Copied!' : 'Copy Key'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: AI YIELD & RISK ASSISTANT */}
      {activeTab === 'ai-b2b' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Automated AI Revenue & Fraud Shield
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              B2B Yield Optimizer & Credit Risk Analyzer
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="font-extrabold text-[#093F31] text-sm block">1. AI Fare Trend Prediction</span>
              <p className="text-[#666666] leading-relaxed font-medium">
                {b2bData?.aiB2BAssistant?.fareYieldPrediction || 'Air Arabia fares expected to rise 14% on Thursday. Recommend ticketing pending PNRs before 18:00.'}
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="font-extrabold text-[#093F31] text-sm block">2. Credit Risk & Fraud Score</span>
              <p className="text-[#0B6B53] font-bold text-sm">
                {b2bData?.aiB2BAssistant?.creditRiskScore || 'LOW_RISK (100% On-Time Settlement history)'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOP UP DEPOSIT MODAL */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111111] text-xs">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Add Funds to B2B Wallet</h3>
              <button onClick={() => setShowTopUpModal(false)} className="text-[#666666] font-bold">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Successfully deposited ৳ ${topUpAmount.toLocaleString()} via ${topUpMethod.toUpperCase()}! Available credit updated.`);
                setShowTopUpModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Deposit Amount (BDT)</label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-3 text-[#0B6B53] font-black text-base"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Payment Channel</label>
                <select
                  value={topUpMethod}
                  onChange={(e: any) => setTopUpMethod(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-3 font-bold"
                >
                  <option value="bkash">bKash Merchant Direct</option>
                  <option value="nagad">Nagad Enterprise Payment</option>
                  <option value="bank">City Bank / BRAC Bank Wire</option>
                  <option value="card">Corporate Visa / Mastercard</option>
                </select>
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md">
                CONFIRM INSTANT TOP UP
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GROUP BOOKING MODAL */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111111] text-xs">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Offline Group Booking Desk Request</h3>
              <button onClick={() => setShowGroupModal(false)} className="text-[#666666] font-bold">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Group request submitted to Journey Expert Airline Sales Desk!');
                setShowGroupModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Route & Preferred Airlines</label>
                <input type="text" defaultValue="Dhaka (DAC) to Jeddah (JED)" className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#666666] font-semibold mb-1">Passengers (Min 10)</label>
                  <input type="number" defaultValue={25} className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-black text-[#0B6B53]" />
                </div>
                <div>
                  <label className="block text-[#666666] font-semibold mb-1">Travel Month</label>
                  <input type="text" defaultValue="October 2026" className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md">
                SUBMIT TO AIRLINE SALES DESK
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
