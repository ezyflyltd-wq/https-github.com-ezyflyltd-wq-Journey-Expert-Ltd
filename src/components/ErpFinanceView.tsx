import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Building2,
  PieChart,
  ShieldAlert,
  Sparkles,
  FileText,
  Calculator,
  RefreshCw,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  BarChart3,
  Copy,
  Check,
  Search,
  Filter,
  Download,
  Share2,
  Layers,
  Banknote,
  Scale,
} from 'lucide-react';

export const ErpFinanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'cfo-dashboard' | 'general-ledger' | 'supplier-settlements' | 'invoicing-vat' | 'ai-cfo-assistant'
  >('cfo-dashboard');

  const [erpData, setErpData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // AI CFO Assistant Interactive State
  const [financialPrompt, setFinancialPrompt] = useState<string>(
    'Forecast Q4 cash flow given a 15% increase in Study Abroad tuition settlements and 10% Biman BSP price adjustment'
  );
  const [generatingAiAnalysis, setGeneratingAiAnalysis] = useState<boolean>(false);
  const [generatedAnalysis, setGeneratedAnalysis] = useState<any>(null);

  // Invoice Filter State
  const [invoiceSearch, setInvoiceSearch] = useState<string>('');
  const [copiedInvoice, setCopiedInvoice] = useState<boolean>(false);

  useEffect(() => {
    fetchErpOverview();
  }, []);

  const fetchErpOverview = () => {
    setLoading(true);
    fetch('/api/erp/overview')
      .then((res) => res.json())
      .then((data) => {
        setErpData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load ERP data:', err);
        setLoading(false);
      });
  };

  const handleGenerateFinancialAnalysis = () => {
    setGeneratingAiAnalysis(true);
    setTimeout(() => {
      setGeneratedAnalysis({
        headline: 'Q4 Cash Flow & Revenue Projection: Positive Liquidity Buffer (+৳18.4M BDT)',
        keyInsights: [
          'Study Abroad Tuition Collections are projected to peak in September ahead of UK Autumn Intake, yielding +৳28.5M BDT net liquidity.',
          'Biman Bangladesh BSP Settlement buffer remains optimal with zero overdue penalties.',
          'Recommended Action: Allocate ৳5.0M BDT into short-term high-yield treasury deposit to maximize interest yield on liquid reserves.',
        ],
        fraudRiskAlert: '0 Anomalies Detected across recent 1,420 Journal Entries.',
        taxComplianceScore: '100% NBR e-VAT Ready',
      });
      setGeneratingAiAnalysis(false);
    }, 1100);
  };

  const handleCopyInvoice = (invNo: string) => {
    navigator.clipboard.writeText(invNo);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - ERP, FINANCE & ACCOUNTING */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE ERP & CFO FINANCIAL ENGINE (PART 30)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <DollarSign className="w-3 h-3 text-[#C8A14A]" />
                <span>৳482.5M BDT REVENUE • MULTI-DIVISION GENERAL LEDGER</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              ERP, Finance, Accounting & Business Operations
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Multi-Division General Ledger, Automated BSP Airline Settlements, B2B Agent Wallets, NBR E-VAT Compliance, Payroll & Gemini CFO Predictive Intelligence.
            </p>
          </div>

          {/* Quick Financial Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>YTD Gross Revenue:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                ৳{(erpData?.financialMetrics?.ytdGrossRevenueBDT / 1000000 || 482.5).toFixed(1)}M BDT
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>YTD Net Profit (Margin):</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                ৳{(erpData?.financialMetrics?.ytdNetProfitBDT / 1000000 || 72.4).toFixed(1)}M ({erpData?.financialMetrics?.operatingMarginPct || '15.0%'})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Cash Reserves:</span>
              <span className="text-white font-mono font-black text-sm">
                ৳{(erpData?.financialMetrics?.cashReserveBDT / 1000000 || 112).toFixed(1)}M BDT
              </span>
            </div>

            <button
              onClick={fetchErpOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync General Ledger & Balances</span>
            </button>
          </div>
        </div>

        {/* Global Key ERP Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Gross Revenue YTD</span>
            <span className="text-lg font-black text-white font-mono">
              ৳482.5M
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Net Operating Profit</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              ৳72.4M
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Accounts Receivable</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              ৳34.8M
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Accounts Payable</span>
            <span className="text-lg font-black text-rose-300 font-mono">
              ৳21.5M
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Agent Wallet Ledger</span>
            <span className="text-lg font-black text-white font-mono">
              ৳18.9M
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">NBR VAT Status</span>
            <span className="text-sm font-black text-emerald-300 font-mono">
              100% Compliant
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('cfo-dashboard')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'cfo-dashboard'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <PieChart className="w-4 h-4 text-[#C8A14A]" />
          <span>1. CFO Revenue & Profit Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('general-ledger')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'general-ledger'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Scale className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Multi-Division General Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('supplier-settlements')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'supplier-settlements'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Wallet className="w-4 h-4 text-[#C8A14A]" />
          <span>3. BSP Airline & Agent Wallet Settlement</span>
        </button>

        <button
          onClick={() => setActiveTab('invoicing-vat')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'invoicing-vat'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Receipt className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Invoicing, NBR VAT & Corporate Billing</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-cfo-assistant')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-cfo-assistant'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Gemini AI CFO & Fraud Detector</span>
        </button>
      </div>

      {/* TAB 1: CFO REVENUE & PROFIT DASHBOARD */}
      {activeTab === 'cfo-dashboard' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Multi-Business Unit Performance
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Division Revenue, Profit & Operating Margin Breakdown
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {erpData?.divisionBreakdown?.map((div: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                <div className="border-b border-[#ECECEC] pb-2 flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#081C15] font-serif">{div.division}</strong>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                    MARGIN: {div.margin}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Gross Revenue:</span>
                    <strong className="font-mono text-xs text-[#081C15]">
                      ৳{(div.revenueBDT / 1000000).toFixed(1)}M BDT
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Net Operating Profit:</span>
                    <strong className="font-mono text-xs text-[#0B5D3B]">
                      ৳{(div.profitBDT / 1000000).toFixed(2)}M BDT
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECECEC] flex items-center justify-between text-[11px] text-[#666666]">
                  <span>Audited Status:</span>
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Balanced</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-DIVISION GENERAL LEDGER */}
      {activeTab === 'general-ledger' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Double-Entry Accounting Architecture
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Chart of Accounts & Journal Entry Trial Balance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="text-xs font-bold text-[#0B5D3B] uppercase block">Assets & Receivables (1000 Series)</span>
              <ul className="space-y-2 font-mono text-xs">
                <li className="flex justify-between border-b border-[#ECECEC] pb-1">
                  <span>1010 - City Bank Operating Acct</span>
                  <strong className="text-[#081C15]">৳84,500,000</strong>
                </li>
                <li className="flex justify-between border-b border-[#ECECEC] pb-1">
                  <span>1020 - HSBC Corporate Reserve</span>
                  <strong className="text-[#081C15]">৳27,500,000</strong>
                </li>
                <li className="flex justify-between border-b border-[#ECECEC] pb-1">
                  <span>1200 - Corporate Accounts Receivable</span>
                  <strong className="text-amber-700">৳34,800,000</strong>
                </li>
              </ul>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="text-xs font-bold text-[#0B5D3B] uppercase block">Liabilities & Payables (2000 Series)</span>
              <ul className="space-y-2 font-mono text-xs">
                <li className="flex justify-between border-b border-[#ECECEC] pb-1">
                  <span>2010 - Airline BSP Settlement Payable</span>
                  <strong className="text-rose-700">৳14,200,000</strong>
                </li>
                <li className="flex justify-between border-b border-[#ECECEC] pb-1">
                  <span>2030 - B2B Agent Security Deposits</span>
                  <strong className="text-[#081C15]">৳18,900,000</strong>
                </li>
                <li className="flex justify-between border-b border-[#ECECEC] pb-1">
                  <span>2050 - NBR E-VAT Payable (Q3)</span>
                  <strong className="text-emerald-700">৳7,300,000</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BSP AIRLINE & AGENT WALLET SETTLEMENT */}
      {activeTab === 'supplier-settlements' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              IATA BSP & DMC Settlement Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Automated Airline Billing & Agent Wallet Reconciliation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">IATA BSP Bangladesh Settlement Cycle</strong>
              <p className="text-[11px] text-[#666666]">
                Bi-weekly automated debit reconciliation with Biman, Emirates, Qatar Airways & Saudia via IATA clearinghouse.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#ECECEC] font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span>BSP Billing Cycle:</span>
                  <strong className="text-[#0B5D3B]">16 Aug - 31 Aug 2026</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Tickets Issued:</span>
                  <strong className="text-[#081C15]">1,420 Tickets</strong>
                </div>
                <div className="flex justify-between">
                  <span>Net Payable to IATA:</span>
                  <strong className="text-rose-700 font-bold">৳14,200,000 BDT</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">B2B Travel Agent Wallet Ledger</strong>
              <p className="text-[11px] text-[#666666]">
                Real-time instant credit line and prepaid balance management for 850+ verified travel agents in Bangladesh.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#ECECEC] font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Total Agent Deposits:</span>
                  <strong className="text-[#0B5D3B]">৳18,900,000 BDT</strong>
                </div>
                <div className="flex justify-between">
                  <span>Active Agent Accounts:</span>
                  <strong className="text-[#081C15]">850 Agents</strong>
                </div>
                <div className="flex justify-between">
                  <span>Credit Limit Authorized:</span>
                  <strong className="text-amber-700 font-bold">৳50,000,000 BDT</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INVOICING, NBR VAT & CORPORATE BILLING */}
      {activeTab === 'invoicing-vat' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                NBR Compliant E-Invoicing
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Corporate Invoices & VAT Collection Records
              </h3>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#666666] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search invoice or client..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {erpData?.recentInvoices
              ?.filter(
                (inv: any) =>
                  inv.invNo.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                  inv.client.toLowerCase().includes(invoiceSearch.toLowerCase())
              )
              .map((inv: any) => (
                <div
                  key={inv.invNo}
                  className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold text-[#0B5D3B]">{inv.invNo}</span>
                      <strong className="text-sm font-bold text-[#081C15] font-serif">{inv.client}</strong>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          inv.status === 'PAID' || inv.status === 'SETTLED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#666666]">
                      <span>Service: <strong className="text-[#081C15]">{inv.service}</strong></span>
                      <span> • Date: {inv.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 shrink-0 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-[#ECECEC]">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#666666] uppercase block">Invoice Amount</span>
                      <strong className="text-sm font-mono font-black text-[#0B5D3B]">
                        ৳{(inv.amountBDT / 1000).toLocaleString()}K BDT
                      </strong>
                    </div>

                    <button
                      onClick={() => handleCopyInvoice(inv.invNo)}
                      className="px-3 py-1.5 bg-[#081C15] text-white hover:bg-[#0B5D3B] rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                    >
                      {copiedInvoice ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C8A14A]" />}
                      <span>{copiedInvoice ? 'Copied' : 'Copy Invoice'}</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 5: GEMINI AI CFO & FRAUD DETECTOR */}
      {activeTab === 'ai-cfo-assistant' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Predictive Revenue Operations & Fraud Auditing
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey Finance AI — Automated CFO Intelligence
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <Sparkles className="w-5 h-5 text-[#C8A14A]" />
                <strong className="font-serif font-black text-sm text-[#C8A14A]">
                  AI Financial Scenario Studio
                </strong>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-emerald-200 font-bold uppercase block">Financial Scenario Prompt:</label>
                <textarea
                  rows={4}
                  value={financialPrompt}
                  onChange={(e) => setFinancialPrompt(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#C8A14A]"
                />
              </div>

              <button
                onClick={handleGenerateFinancialAnalysis}
                disabled={generatingAiAnalysis}
                className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Zap className={`w-4 h-4 text-[#C8A14A] ${generatingAiAnalysis ? 'animate-spin' : ''}`} />
                <span>{generatingAiAnalysis ? 'Calculating Financial Simulation...' : 'Run CFO Financial Simulation'}</span>
              </button>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <strong className="font-serif font-black text-lg text-[#081C15]">CFO Simulation Analysis</strong>
                {generatedAnalysis && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                    {generatedAnalysis.taxComplianceScore}
                  </span>
                )}
              </div>

              {generatedAnalysis ? (
                <div className="space-y-3 text-xs">
                  <strong className="text-sm font-bold text-[#0B5D3B] block">{generatedAnalysis.headline}</strong>

                  <ul className="space-y-2">
                    {generatedAnalysis.keyInsights.map((insight: string, iIdx: number) => (
                      <li key={iIdx} className="bg-white p-3 rounded-xl border border-[#ECECEC] text-[#081C15] leading-relaxed">
                        • {insight}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-[#ECECEC] flex items-center justify-between text-[11px] text-[#666666]">
                    <span>Fraud & Anomaly Status:</span>
                    <strong className="text-emerald-700">{generatedAnalysis.fraudRiskAlert}</strong>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#666666] space-y-2">
                  <Calculator className="w-8 h-8 text-[#0B5D3B] mx-auto opacity-40" />
                  <p className="text-xs">Click "Run CFO Financial Simulation" to view live scenario modeling.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
