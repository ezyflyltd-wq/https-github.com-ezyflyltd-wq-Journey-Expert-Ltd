import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  UserCheck,
  Award,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  RefreshCw,
  Plus,
  Send,
  Zap,
  ChevronRight,
  UserPlus,
  Copy,
  Check,
  HeartHandshake,
  BarChart3,
  Sliders,
  Filter,
} from 'lucide-react';

export const HrManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'workforce-overview' | 'employee-portal' | 'recruitment-ats' | 'performance-training' | 'ai-hr-assistant'
  >('workforce-overview');

  const [hrData, setHrData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Leave Simulation State
  const [leaveDays, setLeaveDays] = useState<number>(3);
  const [leaveType, setLeaveType] = useState<string>('Annual Leave');
  const [leaveSubmitted, setLeaveSubmitted] = useState<boolean>(false);

  // AI Resume Screening State
  const [screeningQuery, setScreeningQuery] = useState<string>(
    'Find candidates with 5+ years Amadeus GDS ticketing experience and B2B agency sales leadership'
  );
  const [screeningLoading, setScreeningLoading] = useState<boolean>(false);
  const [screeningResult, setScreeningResult] = useState<any>(null);

  // Copy candidate notification
  const [copiedCandId, setCopiedCandId] = useState<string | null>(null);

  useEffect(() => {
    fetchHrOverview();
  }, []);

  const fetchHrOverview = () => {
    setLoading(true);
    fetch('/api/hr/overview')
      .then((res) => res.json())
      .then((data) => {
        setHrData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load HR data:', err);
        setLoading(false);
      });
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      alert(`Leave Request for ${leaveDays} days (${leaveType}) submitted to Department Lead!`);
    }, 1200);
  };

  const handleRunAiScreening = () => {
    setScreeningLoading(true);
    setTimeout(() => {
      setScreeningResult({
        topMatches: [
          { name: 'Zubair Al-Mahmud', matchPct: '96%', exp: '6 Yrs Amadeus/Sabre', note: 'Strong candidate for Flight Ops Lead' },
          { name: 'Sumaiya Akter', matchPct: '92%', exp: '4 Yrs UK University CAS', note: 'Top candidate for Study Abroad' },
        ],
        summary: 'Identified 2 top candidates matching parameters with zero GDS ticketing discrepancy history.',
      });
      setScreeningLoading(false);
    }, 1000);
  };

  const handleCopyCandidate = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedCandId(id);
    setTimeout(() => setCopiedCandId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - HR MANAGEMENT & EMPLOYEE PORTAL */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE HRMS & ORGANIZATIONAL INTELLIGENCE (PART 31)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Users className="w-3 h-3 text-[#C8A14A]" />
                <span>248 EMPLOYEES • 96.4% RETENTION • GEMINI CHRO SUITE</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Human Resource Management & Employee Intelligence
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Complete employee lifecycle management: AI Resume Screening, Automated Leave & Attendance Tracking, Employee Self-Service (ESS), Performance KPIs & Gemini CHRO Support.
            </p>
          </div>

          {/* Quick HR Snapshot Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Total Headcount:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {hrData?.headcountMetrics?.totalHeadcount || 248} Staff
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active Openings:</span>
              <span className="text-amber-300 font-mono font-bold text-xs">
                {hrData?.headcountMetrics?.activeJobOpenings || 14} Positions
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Payroll:</span>
              <span className="text-white font-mono font-black text-sm">
                ৳{((hrData?.headcountMetrics?.monthlyPayrollBDT || 18500000) / 1000000).toFixed(1)}M BDT
              </span>
            </div>

            <button
              onClick={fetchHrOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync HR Metrics & Attendance</span>
            </button>
          </div>
        </div>

        {/* Global Key HR Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Staff Retention</span>
            <span className="text-lg font-black text-white font-mono">
              {hrData?.headcountMetrics?.retentionRatePct || '96.4%'}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Avg Tenure</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {hrData?.headcountMetrics?.avgTenureYears || '3.8 Years'}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Satisfaction Score</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {hrData?.headcountMetrics?.avgEmployeeSatisfactionScore || '4.8/5.0'}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Completed Trainings</span>
            <span className="text-lg font-black text-white font-mono">
              {hrData?.headcountMetrics?.trainingCertificationsCompleted || 412}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Active Divisions</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              7 Units
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Payroll Cycle</span>
            <span className="text-sm font-black text-emerald-300 font-mono">
              1st Monthly
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('workforce-overview')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'workforce-overview'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Workforce & Department Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('employee-portal')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'employee-portal'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Employee Self-Service (ESS) Portal</span>
        </button>

        <button
          onClick={() => setActiveTab('recruitment-ats')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'recruitment-ats'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <UserPlus className="w-4 h-4 text-[#C8A14A]" />
          <span>3. AI Recruitment & Applicant Tracking</span>
        </button>

        <button
          onClick={() => setActiveTab('performance-training')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'performance-training'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Award className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Performance KPIs & Training</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-hr-assistant')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-hr-assistant'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Gemini CHRO AI Assistant</span>
        </button>
      </div>

      {/* TAB 1: WORKFORCE & DEPARTMENT MATRIX */}
      {activeTab === 'workforce-overview' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Organizational Hierarchy & Department Efficiency
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Department Headcount, Leadership & Budget Matrix
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hrData?.departments?.map((dept: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                <div className="border-b border-[#ECECEC] pb-2 flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#081C15] font-serif">{dept.name}</strong>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                    {dept.efficiency} Efficiency
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Department Lead:</span>
                    <strong className="text-[#081C15]">{dept.lead}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Active Staff Headcount:</span>
                    <strong className="font-mono text-xs text-[#0B5D3B]">
                      {dept.headcount} Employees
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Monthly Allocation:</span>
                    <strong className="font-mono text-xs text-[#081C15]">
                      ৳{(dept.budgetBDT / 1000000).toFixed(2)}M BDT
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECECEC] flex items-center justify-between text-[11px] text-[#666666]">
                  <span>Audit Status:</span>
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Operational</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EMPLOYEE SELF-SERVICE PORTAL */}
      {activeTab === 'employee-portal' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Employee Workspace & Profile
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Employee Self-Service (ESS) & Leave Management
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Active Employee Profile & Payslip */}
            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-4">
              <div className="flex items-center space-x-4 border-b border-[#ECECEC] pb-4">
                <div className="w-12 h-12 bg-[#0B5D3B] text-white rounded-2xl font-black flex items-center justify-center text-lg shadow-md">
                  SA
                </div>
                <div>
                  <h4 className="text-base font-black text-[#081C15] font-serif">
                    {hrData?.employeeSelfService?.activeUser || 'Sabbir Ahmed'}
                  </h4>
                  <p className="text-xs text-[#666666]">
                    {hrData?.employeeSelfService?.dept || 'OTA Technology & AI Systems'} • ID: {hrData?.employeeSelfService?.empId || 'JEL-2022-048'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] text-[#666666] uppercase block">Annual Leave</span>
                  <strong className="text-lg font-black text-[#0B5D3B]">
                    {hrData?.employeeSelfService?.leaveBalanceDays?.annual || 14} Days
                  </strong>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] text-[#666666] uppercase block">Sick Leave</span>
                  <strong className="text-lg font-black text-amber-700">
                    {hrData?.employeeSelfService?.leaveBalanceDays?.sick || 7} Days
                  </strong>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-[#ECECEC]">
                  <span className="text-[10px] text-[#666666] uppercase block">Attendance</span>
                  <strong className="text-lg font-black text-emerald-700">
                    {hrData?.employeeSelfService?.attendancePct || '99.2%'}
                  </strong>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#ECECEC] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#666666]">Performance Rating:</span>
                  <strong className="text-[#0B5D3B] font-bold">{hrData?.employeeSelfService?.kpiRating}</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666666]">Latest Salary Disbursement:</span>
                  <strong className="text-[#081C15] font-mono">{hrData?.employeeSelfService?.lastPayslipBDT}</strong>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Leave Application Form */}
            <form onSubmit={handleApplyLeave} className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <Calendar className="w-5 h-5 text-[#C8A14A]" />
                <strong className="font-serif font-black text-sm text-[#C8A14A]">
                  Apply for Leave Request
                </strong>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-emerald-200 font-bold uppercase block mb-1">Leave Type:</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C8A14A]"
                  >
                    <option value="Annual Leave" className="text-black">Annual Leave</option>
                    <option value="Sick Leave" className="text-black">Sick Leave</option>
                    <option value="Emergency Leave" className="text-black">Emergency Leave</option>
                    <option value="Special Circumstance" className="text-black">Special Circumstance</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-200 font-bold uppercase block mb-1">Duration (Days):</label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#C8A14A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={leaveSubmitted}
                  className="w-full py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 mt-4"
                >
                  <Send className={`w-4 h-4 text-[#C8A14A] ${leaveSubmitted ? 'animate-bounce' : ''}`} />
                  <span>{leaveSubmitted ? 'Submitting Leave Request...' : 'Submit Request to Manager'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: AI RECRUITMENT & APPLICANT TRACKING */}
      {activeTab === 'recruitment-ats' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Talent Acquisition & Candidate Intelligence
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              AI Resume Screening & Candidate Pipeline
            </h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <span className="text-xs font-bold text-[#0B5D3B] uppercase block">AI Candidate Search & Semantic Matching</span>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={screeningQuery}
                  onChange={(e) => setScreeningQuery(e.target.value)}
                  className="flex-1 bg-white border border-[#ECECEC] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0B5D3B]"
                />
                <button
                  onClick={handleRunAiScreening}
                  disabled={screeningLoading}
                  className="px-4 py-2 bg-[#081C15] text-white hover:bg-[#0B5D3B] rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shrink-0"
                >
                  <Zap className={`w-4 h-4 text-[#C8A14A] ${screeningLoading ? 'animate-spin' : ''}`} />
                  <span>Run AI Resume Match</span>
                </button>
              </div>

              {screeningResult && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 mt-2">
                  <strong className="text-xs text-[#0B5D3B] block">{screeningResult.summary}</strong>
                  <div className="space-y-1">
                    {screeningResult.topMatches.map((m: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-xs bg-white p-2 rounded-lg border border-emerald-100">
                        <span><strong>{m.name}</strong> ({m.exp})</span>
                        <span className="text-emerald-700 font-bold">Match Score: {m.matchPct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Active Shortlisted Candidates</strong>
              {hrData?.sampleCandidates?.map((cand: any) => (
                <div key={cand.id} className="bg-[#F8FAF9] border border-[#ECECEC] p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold text-[#0B5D3B]">{cand.id}</span>
                      <strong className="text-sm font-bold text-[#081C15] font-serif">{cand.name}</strong>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                        AI Score: {cand.aiMatchScore}
                      </span>
                    </div>
                    <div className="text-xs text-[#666666]">
                      <span>Role: <strong className="text-[#081C15]">{cand.position}</strong></span> • Experience: {cand.exp}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-[#ECECEC]">
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-xl">
                      {cand.status}
                    </span>
                    <button
                      onClick={() => handleCopyCandidate(cand.id)}
                      className="px-3 py-1.5 bg-[#081C15] text-white hover:bg-[#0B5D3B] rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                    >
                      {copiedCandId === cand.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C8A14A]" />}
                      <span>{copiedCandId === cand.id ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PERFORMANCE KPIS & TRAINING */}
      {activeTab === 'performance-training' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Skill Development & Career Growth
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              GDS Certifications & Quarterly KPI Reviews
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">GDS & Systems Certification Tracker</strong>
              <p className="text-[11px] text-[#666666]">
                412 staff certifications completed across Sabre GDS, Amadeus Ticketing & UK Study Abroad Compliance.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#ECECEC] space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Sabre Ticketing Master:</span>
                  <strong className="text-[#0B5D3B]">128 Certified Staff</strong>
                </div>
                <div className="flex justify-between">
                  <span>Amadeus REST API & NDC:</span>
                  <strong className="text-[#0B5D3B]">94 Certified Staff</strong>
                </div>
                <div className="flex justify-between">
                  <span>UK / Australia Education Advisor:</span>
                  <strong className="text-[#0B5D3B]">65 Certified Staff</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Promotion & Talent Advancement</strong>
              <p className="text-[11px] text-[#666666]">
                Quarterly KPI evaluations guide automated promotion recommendations and performance bonuses.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#ECECEC] space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Q2 Promotions Approved:</span>
                  <strong className="text-[#0B5D3B]">18 Staff Promoted</strong>
                </div>
                <div className="flex justify-between">
                  <span>Performance Incentive Distributed:</span>
                  <strong className="text-[#081C15]">৳2,400,000 BDT</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GEMINI CHRO AI ASSISTANT */}
      {activeTab === 'ai-hr-assistant' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Organizational HR Intelligence Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Journey HR AI — Gemini CHRO Assistant
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
              <Sparkles className="w-5 h-5 text-[#C8A14A]" />
              <strong className="font-serif font-black text-sm text-[#C8A14A]">
                Journey HR AI Capabilities
              </strong>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-100">
              {hrData?.journeyHrAiStatus?.capabilities?.map((cap: string, cIdx: number) => (
                <li key={cIdx} className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A14A] shrink-0" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Recent Automated HR System Actions:</span>
              <ul className="space-y-1 font-mono text-[11px] text-emerald-200">
                {hrData?.journeyHrAiStatus?.recentAiScreenings?.map((act: string, aIdx: number) => (
                  <li key={aIdx}>• {act}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
