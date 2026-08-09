import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Server,
  RefreshCw,
  Bot,
  TrendingUp,
  Users,
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Search,
  Lock,
  Settings,
  Plane,
  Globe2,
  GraduationCap,
  Building2,
  Briefcase,
  Clock,
  PieChart,
  Activity,
  Zap,
  BarChart3,
  Filter,
  Mail,
  MessageSquare,
  Plus,
  ChevronRight,
  Download,
  UserCheck,
  UserPlus,
  FileCheck,
  Wallet,
  Receipt,
  PhoneCall,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'executive' | 'crm-pipeline' | 'travel-ops' | 'finance-erp' | 'rbac-users' | 'marketing-cms' | 'security-audit'
  >('executive');

  const [checkingGDS, setCheckingGDS] = useState(false);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);

  // CRM & Lead State Filter
  const [leadSearch, setLeadSearch] = useState('');
  const [pnrFilter, setPnrFilter] = useState('');

  // Fetch live overview from server
  const fetchOverview = async () => {
    setLoadingOverview(true);
    try {
      const res = await fetch('/api/admin/overview');
      const data = await res.json();
      setAdminData(data);
    } catch (err) {
      console.error('Failed to load admin overview:', err);
    } finally {
      setLoadingOverview(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handlePingSystems = async () => {
    setCheckingGDS(true);
    setTimeout(() => {
      setCheckingGDS(false);
      fetchOverview();
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Admin Banner */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#C7A44D] tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>Journey Expert Ltd. • Part 12 Enterprise Operations Control Center</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-serif">
            Centralized ERP, CRM & OTA Command Center
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 font-medium max-w-2xl leading-relaxed">
            Real-time business intelligence, GDS PNR management, consular visa tracking, financial ledgers, agent wallets, and RBAC security governance.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3 shrink-0">
          <button
            onClick={handlePingSystems}
            disabled={checkingGDS}
            className="px-5 py-3 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black text-xs rounded-2xl shadow-lg transition-all flex items-center space-x-2 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${checkingGDS ? 'animate-spin' : ''}`} />
            <span>{checkingGDS ? 'Pinging APIs...' : 'Refresh Live Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('executive')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'executive'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#C7A44D]" />
          <span>1. Executive BI & Monitoring</span>
        </button>

        <button
          onClick={() => setActiveTab('crm-pipeline')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'crm-pipeline'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C7A44D]" />
          <span>2. CRM & Sales Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('travel-ops')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'travel-ops'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Plane className="w-4 h-4 text-[#C7A44D]" />
          <span>3. Travel & Consular Ops</span>
        </button>

        <button
          onClick={() => setActiveTab('finance-erp')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'finance-erp'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <DollarSign className="w-4 h-4 text-[#C7A44D]" />
          <span>4. Finance ERP & Wallets</span>
        </button>

        <button
          onClick={() => setActiveTab('rbac-users')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'rbac-users'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C7A44D]" />
          <span>5. RBAC & Staff Roles</span>
        </button>

        <button
          onClick={() => setActiveTab('marketing-cms')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'marketing-cms'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Zap className="w-4 h-4 text-[#C7A44D]" />
          <span>6. Marketing, CMS & HR</span>
        </button>

        <button
          onClick={() => setActiveTab('security-audit')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'security-audit'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#C7A44D]" />
          <span>7. Security & Audit Logs</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE BI & REAL-TIME MONITORING */}
      {activeTab === 'executive' && (
        <div className="space-y-8 text-xs text-[#111111]">
          {/* Top KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block">Gross GMV Revenue</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-[#0B6B53] font-serif">৳ 4.85 Cr</span>
                <span className="text-xs text-emerald-600 font-bold">+18.4%</span>
              </div>
              <p className="text-[10px] text-[#666666]">Monthly Flight, Hotel, Visa & Study Sales</p>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block">Total Bookings & Issued</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-[#093F31] font-serif">1,840</span>
                <span className="text-xs text-[#0B6B53] font-bold">Today: +42</span>
              </div>
              <p className="text-[10px] text-[#666666]">GDS Auto-Ticketed via Sabre/Amadeus</p>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block">Visa Approval Rate</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-[#0B6B53] font-serif">99.2%</span>
                <span className="text-xs text-emerald-600 font-bold">412 Files</span>
              </div>
              <p className="text-[10px] text-[#666666]">UK High Comm, Canada, Saudi Umrah</p>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider block">B2B Agent Deposit Pool</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-[#C7A44D] font-mono">৳ 3.85 Cr</span>
                <span className="text-xs text-[#093F31] font-bold">328 Agents</span>
              </div>
              <p className="text-[10px] text-[#666666]">Active Agent Pre-funded Credit Wallets</p>
            </div>
          </div>

          {/* Revenue Breakdown by Revenue Vertical */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
                <h3 className="text-base font-black text-[#093F31] font-serif">Revenue & Sales Breakdown by Vertical</h3>
                <span className="text-[10px] font-bold bg-[#F8FAF9] px-3 py-1 rounded-xl border border-[#ECECEC]">
                  August 2026 Live
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Flights (GDS Multi-carrier)</span>
                    <span className="font-mono text-[#0B6B53]">৳ 2,84,00,000 (58.5%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#F8FAF9] rounded-full overflow-hidden border border-[#ECECEC]">
                    <div className="h-full bg-[#0B6B53]" style={{ width: '58.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Hotels & Luxury Resorts</span>
                    <span className="font-mono text-[#093F31]">৳ 82,00,000 (16.9%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#F8FAF9] rounded-full overflow-hidden border border-[#ECECEC]">
                    <div className="h-full bg-[#093F31]" style={{ width: '16.9%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Consular Visa Consultancy & Filing</span>
                    <span className="font-mono text-[#C7A44D]">৳ 61,00,000 (12.6%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#F8FAF9] rounded-full overflow-hidden border border-[#ECECEC]">
                    <div className="h-full bg-[#C7A44D]" style={{ width: '12.6%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Study Abroad Admissions & CAS</span>
                    <span className="font-mono text-emerald-800">৳ 58,00,000 (12.0%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#F8FAF9] rounded-full overflow-hidden border border-[#ECECEC]">
                    <div className="h-full bg-emerald-700" style={{ width: '12.0%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* System Health & Payment Gateways */}
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-black text-[#093F31] font-serif border-b border-[#ECECEC] pb-3">
                Live Gateway Telemetry
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#F8FAF9] rounded-2xl border border-[#ECECEC]">
                  <span className="font-bold text-[#111111]">Sabre GDS (1S)</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    42ms • Operational
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#F8FAF9] rounded-2xl border border-[#ECECEC]">
                  <span className="font-bold text-[#111111]">Amadeus Altéa (1A)</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    58ms • Operational
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#F8FAF9] rounded-2xl border border-[#ECECEC]">
                  <span className="font-bold text-[#111111]">SSLCommerz & bKash PGW</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Online (0.01% Drop)
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#F8FAF9] rounded-2xl border border-[#ECECEC]">
                  <span className="font-bold text-[#111111]">Stripe Global Payments</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    3D-Secure v2 Active
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#093F31] text-white rounded-2xl">
                  <span className="font-bold text-white">Gemini 3.6 Flash AI Engine</span>
                  <span className="bg-[#C7A44D] text-[#093F31] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Sub-second RAG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRM & SALES PIPELINE */}
      {activeTab === 'crm-pipeline' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Enterprise Sales Automation & Lead Qualification
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Lead Pipeline & Customer Relationship Management
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                placeholder="Search lead or client name..."
                className="bg-[#F8FAF9] border border-[#ECECEC] rounded-xl px-3 py-2 text-xs font-bold text-[#111111]"
              />
              <button className="px-4 py-2 bg-[#0B6B53] text-white font-extrabold rounded-xl hover:bg-[#093F31]">
                + Add Lead
              </button>
            </div>
          </div>

          {/* Lead Pipeline Board */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                  <th className="p-3">Lead ID & Name</th>
                  <th className="p-3">Service Vertical</th>
                  <th className="p-3">Est. Value (BDT)</th>
                  <th className="p-3">Pipeline Stage</th>
                  <th className="p-3">AI Lead Score</th>
                  <th className="p-3">Assigned Counselor</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC]">
                {adminData?.leadPipeline.map((lead: any) => (
                  <tr key={lead.leadId} className="hover:bg-[#F8FAF9]">
                    <td className="p-3">
                      <span className="font-extrabold text-[#093F31] block">{lead.name}</span>
                      <span className="text-[10px] font-mono text-[#666666]">{lead.leadId}</span>
                    </td>
                    <td className="p-3 font-bold text-[#111111]">{lead.service}</td>
                    <td className="p-3 font-mono font-bold text-[#0B6B53]">৳ {lead.valueBDT.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono font-black text-[#C7A44D] text-xs">{lead.score}/100</span>
                    </td>
                    <td className="p-3 text-[#666666] font-medium">{lead.counselor}</td>
                    <td className="p-3 text-right space-x-2">
                      <button className="px-2.5 py-1 bg-[#0B6B53] text-white font-bold rounded-lg text-[10px]">
                        WhatsApp Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TRAVEL & CONSULAR OPERATIONS */}
      {activeTab === 'travel-ops' && (
        <div className="space-y-6 text-xs text-[#111111]">
          {/* Recent Flight PNRs */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Live Flight PNR & Ticket Control</h3>
              <span className="text-[10px] font-mono bg-[#F8FAF9] px-3 py-1 rounded-xl border border-[#ECECEC]">
                Sabre / Amadeus Auto-Sync
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                    <th className="p-3">PNR Code</th>
                    <th className="p-3">Passenger</th>
                    <th className="p-3">Route & Airline</th>
                    <th className="p-3">Amount (BDT)</th>
                    <th className="p-3">Booking Status</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {adminData?.recentPNRs.map((pnr: any) => (
                    <tr key={pnr.pnr} className="hover:bg-[#F8FAF9]">
                      <td className="p-3 font-mono font-black text-[#0B6B53]">{pnr.pnr}</td>
                      <td className="p-3 font-bold text-[#111111]">{pnr.passenger}</td>
                      <td className="p-3">{pnr.route} ({pnr.airline})</td>
                      <td className="p-3 font-mono font-bold">৳ {pnr.amountBDT.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                          {pnr.status}
                        </span>
                      </td>
                      <td className="p-3 text-[#666666] font-medium">{pnr.payment}</td>
                      <td className="p-3 text-right space-x-1">
                        <button className="px-2 py-1 bg-[#093F31] text-white text-[10px] font-bold rounded-lg">
                          Issue e-Ticket
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Visa Files */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-base font-black text-[#093F31] font-serif border-b border-[#ECECEC] pb-3">
              Consular Visa Application Queue
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                    <th className="p-3">Application ID</th>
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Destination Country</th>
                    <th className="p-3">Visa Type</th>
                    <th className="p-3">Embassy Status</th>
                    <th className="p-3">Assigned Officer</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {adminData?.pendingVisaApplications.map((visa: any) => (
                    <tr key={visa.id} className="hover:bg-[#F8FAF9]">
                      <td className="p-3 font-mono font-extrabold text-[#093F31]">{visa.id}</td>
                      <td className="p-3 font-bold text-[#111111]">{visa.applicant}</td>
                      <td className="p-3 font-bold text-[#0B6B53]">{visa.country}</td>
                      <td className="p-3">{visa.type}</td>
                      <td className="p-3">
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                          {visa.status}
                        </span>
                      </td>
                      <td className="p-3 text-[#666666]">{visa.officer}</td>
                      <td className="p-3 text-right">
                        <button className="px-2 py-1 bg-[#0B6B53] text-white text-[10px] font-bold rounded-lg">
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FINANCE ERP & WALLETS */}
      {activeTab === 'finance-erp' && (
        <div className="space-y-6 text-xs text-[#111111]">
          {/* P&L Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[#666666] font-bold text-[10px] uppercase block">Gross Income (Mo)</span>
              <span className="text-3xl font-black text-[#0B6B53] font-serif">৳ 4,85,00,000</span>
              <span className="text-emerald-600 font-bold block">14.8% Net Margin</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[#666666] font-bold text-[10px] uppercase block">B2B Agent Pre-funded Deposits</span>
              <span className="text-3xl font-black text-[#093F31] font-mono">৳ 3,85,00,000</span>
              <span className="text-[#666666] font-medium block">Held in Trust Account</span>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-[#666666] font-bold text-[10px] uppercase block">Customer Wallet Balance</span>
              <span className="text-3xl font-black text-[#C7A44D] font-mono">৳ 1,42,00,000</span>
              <span className="text-emerald-600 font-bold block">Instant Cashback Ready</span>
            </div>
          </div>

          {/* Agent Wallets Control Table */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-base font-black text-[#093F31] font-serif border-b border-[#ECECEC] pb-3">
              B2B Sub-Agent Wallet & Credit Line Ledger
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                    <th className="p-3">Agency Name</th>
                    <th className="p-3">Assigned Credit Limit</th>
                    <th className="p-3">Current Wallet Balance</th>
                    <th className="p-3">Credit Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {adminData?.agentWallets.map((w: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#F8FAF9]">
                      <td className="p-3 font-bold text-[#093F31]">{w.agencyName}</td>
                      <td className="p-3 font-mono font-bold">৳ {w.creditLimitBDT.toLocaleString()}</td>
                      <td className="p-3 font-mono font-black text-[#0B6B53]">৳ {w.balanceBDT.toLocaleString()}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            w.status === 'ACTIVE'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button className="px-2.5 py-1 bg-[#0B6B53] text-white text-[10px] font-bold rounded-lg">
                          Top Up Balance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RBAC USER & ROLE MANAGEMENT */}
      {activeTab === 'rbac-users' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Enterprise Governance & Security
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Role Based Access Control Matrix (13 Roles Defined)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { role: 'Super Admin', desc: 'Full root platform access & system configuration', count: '2 Users' },
              { role: 'CEO / Executive', desc: 'Read-only financial BI & executive reports', count: '1 User' },
              { role: 'COO / Operations Director', desc: 'Complete operations, flight & visa management', count: '2 Users' },
              { role: 'Finance Manager', desc: 'Ledger control, supplier settlements & tax compliance', count: '3 Users' },
              { role: 'Visa Officer', desc: 'Consular document verification & High Comm submission', count: '8 Users' },
              { role: 'Study Counselor', desc: 'University offer letters, CAS & student advising', count: '12 Users' },
              { role: 'Travel Consultant', desc: 'GDS flight booking, hotel reservations & re-issuance', count: '15 Users' },
              { role: 'Customer Support', desc: 'Live ticket management & SLA escalation', count: '10 Users' },
              { role: 'IT Administrator', desc: 'API key management, audit logs & system health', count: '2 Users' },
            ].map((r, i) => (
              <div key={i} className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[#093F31] text-sm">{r.role}</span>
                  <span className="bg-[#0B6B53] text-white text-[10px] font-black px-2 py-0.5 rounded">
                    {r.count}
                  </span>
                </div>
                <p className="text-[#666666] text-[11px] font-medium leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MARKETING, CMS & HR */}
      {activeTab === 'marketing-cms' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <h3 className="text-lg font-black text-[#093F31] font-serif border-b border-[#ECECEC] pb-3">
            Automated Marketing, CMS & Staff Operations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="font-extrabold text-[#093F31] text-sm block">1. WhatsApp & Email Campaign Engine</span>
              <p className="text-[#666666]">Automated UK September Intake & Ramadan Umrah campaign broadcasts.</p>
              <button className="px-4 py-2 bg-[#0B6B53] text-white font-bold rounded-xl">
                Launch Broadcast Campaign
              </button>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="font-extrabold text-[#093F31] text-sm block">2. CMS Content & Blog Manager</span>
              <p className="text-[#666666]">Update landing page banners, study abroad guides, and SEO metadata.</p>
              <button className="px-4 py-2 bg-[#093F31] text-white font-bold rounded-xl">
                Manage Website CMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY & AUDIT LOGS */}
      {activeTab === 'security-audit' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-xs text-[#111111]">
          <h3 className="text-base font-black text-[#093F31] font-serif border-b border-[#ECECEC] pb-3">
            Real-time Security Audit Log
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] font-extrabold uppercase text-[10px]">
                  <th className="p-3">Time</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target / Detail</th>
                  <th className="p-3 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC]">
                {adminData?.auditLogs.map((log: any, idx: number) => (
                  <tr key={idx} className="hover:bg-[#F8FAF9]">
                    <td className="p-3 font-mono font-bold text-[#666666]">{log.time}</td>
                    <td className="p-3 font-bold text-[#093F31]">{log.user}</td>
                    <td className="p-3 font-bold text-[#0B6B53]">{log.action}</td>
                    <td className="p-3 text-[#111111]">{log.target}</td>
                    <td className="p-3 font-mono text-right text-[#666666]">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
