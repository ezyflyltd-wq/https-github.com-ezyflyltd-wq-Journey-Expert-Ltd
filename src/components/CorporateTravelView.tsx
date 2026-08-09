import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  Send,
  ShieldCheck,
  TrendingUp,
  FileText,
  DollarSign,
  AlertTriangle,
  Plane,
  Building,
  CreditCard,
  Settings,
  Sparkles,
  Search,
  Filter,
  PlusCircle,
  Download,
  Upload,
  Globe,
  MapPin,
  Bot,
  UserCheck,
  Zap,
  RefreshCw,
  BarChart3,
  Calendar,
  Layers,
  Check,
  X,
  FileCheck2,
} from 'lucide-react';

export const CorporateTravelView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'booking-engine' | 'policy-engine' | 'employees' | 'requests-expenses' | 'billing-invoices' | 'ai-duty-of-care'
  >('dashboard');

  const [corpData, setCorpData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // New Request Modal State
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [employeeName, setEmployeeName] = useState('Sultana Razia');
  const [travelRoute, setTravelRoute] = useState('DAC - LHR - FRA');
  const [travelDates, setTravelDates] = useState('2026-10-10 - 2026-10-18');
  const [estimatedCost, setEstimatedCost] = useState(220000);

  // New Expense Upload Modal
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState('Hotel Incidentals & Local Transport');
  const [expenseAmount, setExpenseAmount] = useState(12500);

  // Onboarding Lead Form State
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('50-250 Employees');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const fetchCorpData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/corporate/overview');
      const data = await res.json();
      setCorpData(data);
    } catch (err) {
      console.error('Failed to load corporate TMC data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorpData();
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Corporate TMC Header Banner */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#C7A44D] text-[#093F31] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
              {corpData?.companyProfile?.tier || 'ENTERPRISE GOLD TMC'}
            </span>
            <span className="text-xs font-mono text-emerald-200">
              Corporate ID: {corpData?.companyProfile?.corporateId || 'CORP-8902'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-serif">
            {corpData?.companyProfile?.companyName || 'Beximco Pharmaceuticals & Tech Group'}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-100/90 font-medium">
            <span>Account Manager: <strong className="text-white">{corpData?.companyProfile?.accountManager || 'Farhana Chowdhury'}</strong></span>
            <span>•</span>
            <span>Credit Terms: <strong className="text-[#C7A44D] font-mono">{corpData?.companyProfile?.paymentTermsDays || 30} Days Revolving</strong></span>
            <span>•</span>
            <span>HQ Branches: <strong className="text-[#C7A44D] font-mono">{corpData?.companyProfile?.branches?.length || 4} Global Offices</strong></span>
          </div>
        </div>

        {/* Corporate Credit Line Summary Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center space-x-4 shrink-0 z-10 w-full sm:w-auto justify-between sm:justify-start">
          <div className="p-3 bg-[#C7A44D] rounded-xl text-[#093F31] shadow-md">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
              Available Corporate Credit Line
            </span>
            <span className="text-2xl font-black text-white font-serif">
              ৳ {(corpData?.companyProfile?.availableCreditBDT || 16600000).toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-300 font-bold block">
              Credit Limit: ৳ {(corpData?.companyProfile?.creditLimitBDT || 25000000).toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="px-4 py-2 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black text-xs rounded-xl shadow-lg transition-all"
          >
            + Travel Request
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
          <span>1. Dashboard & Travel BI</span>
        </button>

        <button
          onClick={() => setActiveTab('booking-engine')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'booking-engine'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Plane className="w-4 h-4 text-[#C7A44D]" />
          <span>2. Corporate Booking Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('policy-engine')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'policy-engine'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C7A44D]" />
          <span>3. Policy Rules & Approvals</span>
        </button>

        <button
          onClick={() => setActiveTab('employees')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'employees'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C7A44D]" />
          <span>4. Employee Profiles</span>
        </button>

        <button
          onClick={() => setActiveTab('requests-expenses')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'requests-expenses'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#C7A44D]" />
          <span>5. Requests & Expenses</span>
        </button>

        <button
          onClick={() => setActiveTab('billing-invoices')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'billing-invoices'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <DollarSign className="w-4 h-4 text-[#C7A44D]" />
          <span>6. Billing & Monthly Invoices</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-duty-of-care')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-duty-of-care'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C7A44D]" />
          <span>7. AI Assistant & Duty of Care</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD & TRAVEL BI */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 text-xs text-[#111111]">
          {/* Key Monthly Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Monthly Corporate Travel Spend</span>
              <span className="text-2xl font-black text-[#093F31] font-mono">
                ৳ {(corpData?.monthlyMetrics?.totalTravelSpendBDT || 8400000).toLocaleString()}
              </span>
              <span className="text-[10px] text-[#0B6B53] font-bold block">100% GDS Invoiced</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Policy Savings Generated</span>
              <span className="text-2xl font-black text-[#C7A44D] font-mono">
                ৳ {(corpData?.monthlyMetrics?.savingsFromPolicyBDT || 1420000).toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">16.9% Average Fare Optimization</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Policy Compliance Rate</span>
              <span className="text-2xl font-black text-[#0B6B53] font-serif">
                {corpData?.monthlyMetrics?.policyCompliancePercent || 96.8}%
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">3.2% Out of Policy Exceptions</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase block">Carbon Footprint CO2</span>
              <span className="text-2xl font-black text-[#093F31] font-mono">
                {corpData?.monthlyMetrics?.carbonFootprintTonsCO2 || 18.4} Tons
              </span>
              <span className="text-[10px] text-[#666666] font-bold block">ESG Standard Compliant</span>
            </div>
          </div>

          {/* Pending Approval Requests Table */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Recent Corporate Travel Requests</h3>
              <button onClick={fetchCorpData} className="text-[#0B6B53] font-bold text-xs flex items-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync HR Requests</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                    <th className="p-3">Request ID</th>
                    <th className="p-3">Employee & Dept</th>
                    <th className="p-3">Sector Route</th>
                    <th className="p-3">Travel Dates</th>
                    <th className="p-3">Estimated Cost</th>
                    <th className="p-3">Policy Audit</th>
                    <th className="p-3">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {corpData?.recentRequests?.map((r: any, i: number) => (
                    <tr key={i} className="hover:bg-[#F8FAF9]">
                      <td className="p-3 font-mono font-black text-[#0B6B53]">{r.id}</td>
                      <td className="p-3">
                        <strong className="block text-[#111111]">{r.employee}</strong>
                        <span className="text-[10px] text-[#666666]">{r.department}</span>
                      </td>
                      <td className="p-3 font-bold text-[#093F31]">{r.route}</td>
                      <td className="p-3">{r.dates}</td>
                      <td className="p-3 font-mono font-black">৳ {r.estCostBDT.toLocaleString()}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            r.policyCheck === 'IN_POLICY'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.policyCheck}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#093F31] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          {r.status}
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

      {/* TAB 2: CORPORATE BOOKING ENGINE */}
      {activeTab === 'booking-engine' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Self-Service Corporate Search & Sabre/Amadeus Integration
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Corporate Flight & Halal Hotel Booking Desk
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC]">
            <div>
              <label className="block text-[#666666] font-semibold mb-1">Departure Origin</label>
              <input type="text" defaultValue="Dhaka (DAC) - Shahjalal Intl" className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
            </div>
            <div>
              <label className="block text-[#666666] font-semibold mb-1">Destination Airport</label>
              <input type="text" defaultValue="London Heathrow (LHR)" className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
            </div>
            <div>
              <label className="block text-[#666666] font-semibold mb-1">Travel Date</label>
              <input type="date" defaultValue="2026-09-15" className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold" />
            </div>
            <div className="flex items-end">
              <button className="w-full py-2.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md">
                Search Corporate Negotiated Fares
              </button>
            </div>
          </div>

          {/* Negotiated Fare Cards Preview */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-[#093F31] text-sm">Live Negotiated Corporate Fares (Policy Filtered)</h4>

            <div className="bg-[#F8FAF9] border border-[#0B6B53]/30 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#093F31] text-[#C7A44D] rounded-xl font-black text-sm">BG</div>
                <div>
                  <span className="font-extrabold text-[#093F31] text-sm">Biman Bangladesh Airlines (BG 201)</span>
                  <p className="text-[#666666] text-[11px]">DAC - LHR • Non-stop • 10h 45m • 40kg Corporate Baggage</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full block mb-1">
                  100% IN-POLICY (Economy Flex)
                </span>
                <span className="text-lg font-black text-[#0B6B53] font-mono">৳ 94,500</span>
                <button
                  onClick={() => alert('Corporate booking held! Sent to Line Manager for instant approval.')}
                  className="ml-3 px-3 py-1.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-bold rounded-xl text-xs"
                >
                  Hold & Request Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POLICY RULES & APPROVALS */}
      {activeTab === 'policy-engine' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Automated Compliance & Expense Control Engine
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Corporate Travel Policy Tiers & Approval Workflows
            </h3>
          </div>

          <div className="space-y-4">
            {corpData?.travelPolicies?.map((p: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center border-b border-[#ECECEC] pb-2">
                  <span className="font-extrabold text-[#093F31] text-sm">{p.tier}</span>
                  <span className="bg-[#0B6B53] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {p.approvalLevels}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[#666666] block">Flight Class Entitlement:</span>
                    <strong className="text-[#0B6B53]">{p.flightClass}</strong>
                  </div>
                  <div>
                    <span className="text-[#666666] block">Hotel Budget Cap:</span>
                    <strong className="text-[#111111]">৳ {p.hotelCapBDT.toLocaleString()} / night</strong>
                  </div>
                  <div>
                    <span className="text-[#666666] block">Advance Booking Requirement:</span>
                    <strong className="text-[#C7A44D]">{p.advanceDays} Days Prior</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EMPLOYEE PROFILES */}
      {activeTab === 'employees' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Central Employee Travel Profiles
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Passports, Frequent Flyer Cards & Preferences
              </h3>
            </div>

            <button
              onClick={() => alert('Opening Bulk HR Sync wizard for Beximco HRMS!')}
              className="px-4 py-2 bg-[#0B6B53] text-white font-black rounded-xl shadow-md"
            >
              + Sync HRMS Employee Roster
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
              <div className="flex justify-between">
                <strong className="text-[#093F31] text-sm">Dr. Rafiqul Islam</strong>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded">R&D Bioplant</span>
              </div>
              <p className="text-[#666666]">Passport: A09481029 (Exp: 2031) • Frequent Flyer: Emirates Skywards Gold #981203</p>
              <p className="text-[10px] text-[#0B6B53] font-bold">Meal Preference: Halal Vegetarian • Seat: Aisle Front</p>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
              <div className="flex justify-between">
                <strong className="text-[#093F31] text-sm">Sultana Razia</strong>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded">Global Sales</span>
              </div>
              <p className="text-[#666666]">Passport: B11829304 (Exp: 2029) • Frequent Flyer: Biman Frequent Flyer #882103</p>
              <p className="text-[10px] text-[#0B6B53] font-bold">Meal Preference: Halal Standard • Seat: Window</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REQUESTS & EXPENSES */}
      {activeTab === 'requests-expenses' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Travel Expense Reimbursement Engine
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Unsettled Corporate Expenses & OCR Receipts
              </h3>
            </div>

            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-4 py-2 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black rounded-xl shadow-md"
            >
              + Upload Expense Receipt
            </button>
          </div>

          <div className="space-y-3">
            {corpData?.unsettledExpenses?.map((e: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <strong className="text-[#093F31] text-sm block">{e.employee}</strong>
                  <span className="text-[#666666]">{e.category}</span>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-sm font-black font-mono text-[#0B6B53]">৳ {e.amountBDT.toLocaleString()}</span>
                  <span className="block text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {e.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: BILLING & MONTHLY INVOICES */}
      {activeTab === 'billing-invoices' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Automated Corporate Accounting
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Monthly Consolidated GST/VAT Invoices & Credit Statements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-2">
              <span className="text-xs text-emerald-200 uppercase font-bold block">August 2026 Monthly Statement</span>
              <span className="text-2xl font-black font-serif text-[#C7A44D]">৳ 84,000,00</span>
              <p className="text-[11px] text-emerald-100">Due Date: 15 September 2026 (30 Days Term)</p>
              <button
                onClick={() => alert('Downloading official Beximco GST Tax Invoice PDF...')}
                className="w-full mt-2 py-2 bg-[#C7A44D] text-[#093F31] font-black rounded-xl text-xs"
              >
                Download Tax Invoice PDF
              </button>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-2">
              <span className="text-xs text-[#666666] uppercase font-bold block">Settlement Channel</span>
              <strong className="text-sm text-[#093F31] block">City Bank Enterprise Wire</strong>
              <p className="text-[#666666]">Account: 11092837401 (Journey Expert Corporate A/C)</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: AI ASSISTANT & DUTY OF CARE */}
      {activeTab === 'ai-duty-of-care' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              24/7 AI Risk Radar & Employee Safety
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              AI Travel Optimizer & Duty of Care Emergency Alerts
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="font-extrabold text-[#093F31] text-sm block">1. AI Cost Optimization Recommendation</span>
              <p className="text-[#666666] leading-relaxed font-medium">
                {corpData?.aiCorporateAssistant?.savingsInsight || 'Switching 4 upcoming Singapore flights from SQ to BG Economy Flex saves ৳ 1,80,000 without compromising baggage allowances.'}
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-amber-300 space-y-3">
              <span className="font-extrabold text-amber-900 text-sm block">2. Duty of Care & Risk Alert</span>
              <p className="text-amber-800 font-bold leading-relaxed">
                {corpData?.aiCorporateAssistant?.riskAlerts || 'Typhoon alert issued for Tokyo Narita (NRT). 2 employees currently on travel advised to rebook flights via Seoul.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* NEW TRAVEL REQUEST MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111111] text-xs">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Create Corporate Travel Request</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-[#666666] font-bold">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Travel Request for ${employeeName} submitted to Line Manager and JEL TMC Desk!`);
                setShowRequestModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Employee Name</label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Sector Route</label>
                <input
                  type="text"
                  value={travelRoute}
                  onChange={(e) => setTravelRoute(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Dates</label>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md">
                SUBMIT FOR APPROVAL
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NEW EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111111] text-xs">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Upload Expense Receipt</h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-[#666666] font-bold">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Expense receipt uploaded and processed via Gemini OCR for reimbursement!');
                setShowExpenseModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Expense Category</label>
                <input
                  type="text"
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Amount (BDT)</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#0B6B53]"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md">
                SUBMIT FOR REIMBURSEMENT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
