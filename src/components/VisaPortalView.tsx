import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Upload,
  ShieldCheck,
  FileText,
  Sparkles,
  UserCheck,
  AlertTriangle,
  Calendar,
  Building2,
  Search,
  Filter,
  Users,
} from 'lucide-react';
import { VisaCountry, VisaApplication } from '../types';
import { MOCK_VISA_COUNTRIES, MOCK_VISA_APPLICATIONS } from '../data/mockData';

export const VisaPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'ai-calculator' | 'crm'>('search');
  const [countries] = useState<VisaCountry[]>(MOCK_VISA_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<VisaCountry>(countries[0]);
  const [applications, setApplications] = useState<VisaApplication[]>(MOCK_VISA_APPLICATIONS);

  // Tracking state
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedApp, setTrackedApp] = useState<VisaApplication | null>(null);

  // Online application form state
  const [applicantName, setApplicantName] = useState('Tariqul Islam');
  const [passportNo, setPassportNo] = useState('A08912345');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // AI Calculator State
  const [calcCountry, setCalcCountry] = useState('United Kingdom');
  const [calcVisaType, setCalcVisaType] = useState('Tourist / Visitor');
  const [calcMonthlyIncomeBDT, setCalcMonthlyIncomeBDT] = useState(180000);
  const [calcBankBalanceBDT, setCalcBankBalanceBDT] = useState(1500000);
  const [calcTravelHistory, setCalcTravelHistory] = useState('Schengen, UAE, Malaysia, Thailand');
  const [calcEmployment, setCalcEmployment] = useState('Corporate Executive (5+ Yrs)');
  const [calcScoreResult, setCalcScoreResult] = useState<{
    score: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    strengths: string[];
    risks: string[];
    recommendations: string[];
  } | null>({
    score: 92,
    riskLevel: 'Low',
    strengths: [
      'Strong liquid bank balance (15+ Lakhs BDT)',
      'Verified OECD/Schengen travel history',
      'Stable corporate employment with Noc & Tax returns',
    ],
    risks: ['First-time applicant for UK Standard Visitor route'],
    recommendations: [
      'Attach 6-month bank statement with official seal',
      'Include salary payslips for last 3 months',
      'Provide detailed travel itinerary with hotel bookings',
    ],
  });

  const handleCalculateScore = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 70;
    if (calcBankBalanceBDT >= 1200000) score += 15;
    else if (calcBankBalanceBDT >= 600000) score += 8;

    if (calcTravelHistory.toLowerCase().includes('schengen') || calcTravelHistory.toLowerCase().includes('usa') || calcTravelHistory.toLowerCase().includes('uk')) {
      score += 10;
    }

    if (calcMonthlyIncomeBDT >= 150000) score += 8;

    score = Math.min(score, 98);

    setCalcScoreResult({
      score,
      riskLevel: score >= 85 ? 'Low' : score >= 70 ? 'Medium' : 'High',
      strengths: [
        `Strong bank balance: ৳ ${(calcBankBalanceBDT / 100000).toFixed(1)} Lakhs`,
        `Sufficient monthly income: ৳ ${(calcMonthlyIncomeBDT / 1000).toFixed(0)}k/mo`,
        `Travel history verified: ${calcTravelHistory || 'None'}`,
      ],
      risks: score < 85 ? ['Income-to-expense ratio needs clearer documentation'] : ['Ensure no unexplained large deposits in last 6 months'],
      recommendations: [
        'Upload TIN certificate & Tax submission receipt',
        'Obtain employer No Objection Certificate (NOC)',
        'Ensure passport validity exceeds 6 months beyond travel dates',
      ],
    });
  };

  const handleTrackVisa = (e: React.FormEvent) => {
    e.preventDefault();
    const found = applications.find(
      (app) => app.trackingNumber.toLowerCase() === trackingInput.trim().toLowerCase()
    );
    if (found) {
      setTrackedApp(found);
    } else {
      setTrackedApp({
        id: 'VA-TEMP',
        trackingNumber: trackingInput || 'JEL-UK-2026-9041',
        applicantName: 'Tariqul Islam',
        country: selectedCountry.country,
        visaType: selectedCountry.visaType,
        appliedDate: '01 August 2026',
        status: 'Embassy Processing',
        estimatedCompletion: '15 August 2026',
        passportNumber: 'A08912345',
      });
    }
  };

  const handleApplyVisa = (e: React.FormEvent) => {
    e.preventDefault();
    const newTracking = `JEL-${selectedCountry.code}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: VisaApplication = {
      id: `VA-${Date.now()}`,
      trackingNumber: newTracking,
      applicantName,
      country: selectedCountry.country,
      visaType: `${selectedCountry.visaType} Visa`,
      appliedDate: 'Today',
      status: 'Submitted',
      estimatedCompletion: `${selectedCountry.processingTimeDays} Days`,
      passportNumber: passportNo,
    };
    setApplications([newApp, ...applications]);
    setTrackedApp(newApp);
    setAppliedSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <FileCheck2 className="w-4 h-4 text-[#C7A44D]" />
            <span>JEL Global Visa & Immigration Ecosystem • Part 9</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            Visa Requirements, AI Advisor & Consular CRM
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-medium">
            Full-service visa processing for UK, USA, Canada, Australia, Schengen, Japan, Saudi Arabia & ASEAN destinations.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F8FAF9] px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-xs text-[#093F31] font-bold">
          <ShieldCheck className="w-5 h-5 text-[#0B6B53]" />
          <span>99.2% Visa Approval Assistance Rate</span>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 ${
            activeTab === 'search'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Search className="w-4 h-4 text-[#C7A44D]" />
          <span>1. Requirements & Online Application</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-calculator')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 ${
            activeTab === 'ai-calculator'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C7A44D]" />
          <span>2. AI Visa Probability & Risk Advisor</span>
        </button>

        <button
          onClick={() => setActiveTab('crm')}
          className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 ${
            activeTab === 'crm'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C7A44D]" />
          <span>3. Immigration CRM & Consultant Portal</span>
        </button>
      </div>

      {/* TAB 1: REQUIREMENTS & ONLINE APP */}
      {activeTab === 'search' && (
        <div className="space-y-8">
          {/* TRACKING TOOL SECTION */}
          <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#C7A44D]" />
              <span>Track Passport & Embassy Visa Status Live</span>
            </h3>

            <form onSubmit={handleTrackVisa} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter JEL Tracking Number (e.g. JEL-UK-2026-9041)"
                className="flex-grow bg-[#0B6B53]/40 border border-[#C7A44D]/30 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-200/60 font-mono focus:outline-none focus:border-[#C7A44D]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black text-xs rounded-xl shadow-md transition-all shrink-0"
              >
                Track Status
              </button>
            </form>

            {trackedApp && (
              <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <div>
                    <span className="text-[10px] text-emerald-200/80">Tracking Reference</span>
                    <p className="font-mono font-black text-[#C7A44D] text-sm">{trackedApp.trackingNumber}</p>
                  </div>
                  <span className="bg-[#C7A44D] text-[#093F31] text-xs font-black px-3 py-1 rounded-full">
                    Status: {trackedApp.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-white">
                  <div>
                    <span className="text-[10px] text-emerald-200/70 block">Applicant</span>
                    <span className="font-bold">{trackedApp.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-200/70 block">Country & Visa</span>
                    <span className="font-bold">{trackedApp.country} ({trackedApp.visaType})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-200/70 block">Applied Date</span>
                    <span className="font-bold">{trackedApp.appliedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-200/70 block">Est. Completion</span>
                    <span className="font-bold text-[#C7A44D]">{trackedApp.estimatedCompletion}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COUNTRY SELECTION & REQUIREMENT CHECKLIST */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Country Selector Column */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-[#093F31]">Select Country Destination</h3>
              <div className="space-y-2">
                {countries.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCountry(c);
                      setAppliedSuccess(false);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedCountry.id === c.id
                        ? 'bg-[#F8FAF9] border-[#0B6B53] shadow-md text-[#093F31]'
                        : 'bg-white border-[#ECECEC] text-[#111111] hover:bg-[#F8FAF9]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#093F31]">{c.country}</h4>
                        <p className="text-[11px] text-[#666666]">{c.visaType} Visa • {c.processingTimeDays} Days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-[#0B6B53] text-xs">৳ {c.feeBDT.toLocaleString()}</span>
                      <span className="text-[10px] text-[#666666] block">${c.feeUSD}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Country Details & Checklist Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="text-xl font-black text-[#093F31] font-serif">
                        {selectedCountry.country} {selectedCountry.visaType} Visa
                      </h3>
                      <p className="text-xs text-[#666666] mt-0.5 font-medium">
                        Official Embassy Fee: <span className="text-[#0B6B53] font-bold">৳ {selectedCountry.feeBDT.toLocaleString()}</span> (${selectedCountry.feeUSD})
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-[#666666] block font-semibold">Approval Success Rate</span>
                    <span className="text-lg font-black text-[#0B6B53]">{selectedCountry.approvalRate}</span>
                  </div>
                </div>

                {/* Document Checklist */}
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold text-[#093F31] flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#0B6B53]" />
                    <span>Mandatory Document Checklist for Bangladesh Passport Holders</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedCountry.requirements.map((req, idx) => (
                      <div key={idx} className="bg-[#F8FAF9] p-3.5 rounded-xl border border-[#ECECEC] flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span className="text-[#111111] font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Online Form */}
                <div className="pt-4 border-t border-[#ECECEC] space-y-4">
                  <h4 className="text-sm font-extrabold text-[#093F31]">Apply For Visa Assistance Online</h4>

                  {!appliedSuccess ? (
                    <form onSubmit={handleApplyVisa} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#666666] font-semibold mb-1">Applicant Name</label>
                          <input
                            type="text"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-bold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#666666] font-semibold mb-1">Passport Number</label>
                          <input
                            type="text"
                            value={passportNo}
                            onChange={(e) => setPassportNo(e.target.value)}
                            className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-mono font-bold"
                            required
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-dashed border-[#ECECEC] text-center text-[#666666] flex flex-col items-center justify-center space-y-1">
                        <Upload className="w-5 h-5 text-[#0B6B53]" />
                        <span className="font-bold text-[#111111]">Upload Passport Copy & Bank Statement (PDF/JPG)</span>
                        <span className="text-[10px]">Max size: 10MB</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-2xl shadow-md transition-all"
                      >
                        SUBMIT VISA APPLICATION FOR {selectedCountry.country.toUpperCase()}
                      </button>
                    </form>
                  ) : (
                    <div className="bg-[#0B6B53]/10 border border-[#0B6B53]/30 p-5 rounded-2xl text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-[#0B6B53] mx-auto" />
                      <h4 className="font-black text-[#093F31] text-sm">Application Submitted Successfully!</h4>
                      <p className="text-[#666666] text-xs">
                        Your visa file is in review by JEL Consular Experts. Check tracking above for updates.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI VISA ELIGIBILITY CALCULATOR */}
      {activeTab === 'ai-calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs">
          {/* Input Form */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-[#0B6B53] font-bold">
              <Sparkles className="w-5 h-5 text-[#C7A44D]" />
              <span className="text-sm">AI Visa Assessment Inputs</span>
            </div>

            <form onSubmit={handleCalculateScore} className="space-y-3">
              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Target Country</label>
                <select
                  value={calcCountry}
                  onChange={(e) => setCalcCountry(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#111111]"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Schengen / Europe">Schengen / Europe</option>
                  <option value="Australia">Australia</option>
                  <option value="Japan">Japan</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Visa Route</label>
                <select
                  value={calcVisaType}
                  onChange={(e) => setCalcVisaType(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#111111]"
                >
                  <option value="Tourist / Visitor">Tourist / Visitor</option>
                  <option value="Business / Conference">Business / Conference</option>
                  <option value="Student (Tier 4 / Study Permit)">Student (Tier 4 / Study Permit)</option>
                  <option value="Work / Skilled Worker">Work / Skilled Worker</option>
                  <option value="Family / Spouse">Family / Spouse</option>
                </select>
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Monthly Income (BDT)</label>
                <input
                  type="number"
                  value={calcMonthlyIncomeBDT}
                  onChange={(e) => setCalcMonthlyIncomeBDT(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-mono font-bold text-[#111111]"
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Available Bank Balance (BDT)</label>
                <input
                  type="number"
                  value={calcBankBalanceBDT}
                  onChange={(e) => setCalcBankBalanceBDT(Number(e.target.value))}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-mono font-bold text-[#111111]"
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Travel History (Past 5 Years)</label>
                <input
                  type="text"
                  value={calcTravelHistory}
                  onChange={(e) => setCalcTravelHistory(e.target.value)}
                  placeholder="e.g. Schengen, UAE, Thailand"
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#111111]"
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#093F31] mb-1">Employment / Business Profile</label>
                <input
                  type="text"
                  value={calcEmployment}
                  onChange={(e) => setCalcEmployment(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#111111]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#C7A44D]" />
                <span>Calculate AI Probability Score</span>
              </button>
            </form>
          </div>

          {/* AI Score Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {calcScoreResult && (
              <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#0B6B53] tracking-wider uppercase block">
                      AI Consular Analysis • {calcCountry} ({calcVisaType})
                    </span>
                    <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                      Visa Approval Probability Breakdown
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4 bg-[#F8FAF9] px-5 py-3 rounded-2xl border border-[#ECECEC]">
                    <div className="text-center">
                      <span className="text-[10px] text-[#666666] font-extrabold block uppercase">Probability Score</span>
                      <span className="text-3xl font-black text-[#0B6B53] font-serif">{calcScoreResult.score}%</span>
                    </div>

                    <div className="border-l border-[#ECECEC] pl-4">
                      <span className="text-[10px] text-[#666666] font-extrabold block uppercase">Risk Tier</span>
                      <span className="text-xs font-black text-[#C7A44D] uppercase px-2.5 py-1 bg-[#C7A44D]/10 rounded-full inline-block mt-0.5">
                        {calcScoreResult.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Key Strengths */}
                  <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                    <span className="font-extrabold text-[#0B6B53] flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Key File Strengths</span>
                    </span>
                    <ul className="space-y-1.5 text-[#111111] font-medium">
                      {calcScoreResult.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-[#0B6B53] font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Potential Risk Factors */}
                  <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                    <span className="font-extrabold text-[#C7A44D] flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Document Risk Checks</span>
                    </span>
                    <ul className="space-y-1.5 text-[#111111] font-medium">
                      {calcScoreResult.risks.map((r, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-[#C7A44D] font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Action Recommendations */}
                <div className="bg-[#093F31] text-white p-5 rounded-2xl space-y-3">
                  <span className="font-bold text-[#C7A44D] flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>JEL Consular Recommendations For 100% Approval</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {calcScoreResult.recommendations.map((rec, idx) => (
                      <div key={idx} className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-emerald-200/80 font-mono block">Action #{idx + 1}</span>
                        <p className="font-medium text-white mt-0.5">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: IMMIGRATION CRM & CONSULTANT WORKSPACE */}
      {activeTab === 'crm' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
              <div>
                <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                  JEL Internal Consular CRM & Embassy Pipeline
                </span>
                <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                  Visa Applicant Files & Document Verification Center
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="bg-[#F8FAF9] px-3 py-1.5 rounded-xl border border-[#ECECEC] font-extrabold text-[#093F31]">
                  Active Files: 128
                </span>
                <span className="bg-[#0B6B53] text-white px-3 py-1.5 rounded-xl font-extrabold">
                  Assigned Consultant: Mahfuzur Rahman (Senior Officer)
                </span>
              </div>
            </div>

            {/* Applicant Pipeline Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#093F31] font-extrabold text-[11px]">
                    <th className="p-3">Reference</th>
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Passport</th>
                    <th className="p-3">Country & Route</th>
                    <th className="p-3">Applied Date</th>
                    <th className="p-3">OCR Status</th>
                    <th className="p-3">Embassy Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC] font-medium">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-[#F8FAF9] transition-all">
                      <td className="p-3 font-mono font-bold text-[#0B6B53]">{app.trackingNumber}</td>
                      <td className="p-3 font-bold text-[#111111]">{app.applicantName}</td>
                      <td className="p-3 font-mono text-[#666666]">{app.passportNumber}</td>
                      <td className="p-3 text-[#111111]">{app.country} ({app.visaType})</td>
                      <td className="p-3 text-[#666666]">{app.appliedDate}</td>
                      <td className="p-3">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                          OCR Verified
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#C7A44D]/10 text-[#093F31] font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-[#C7A44D]/30">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="px-3 py-1 bg-[#093F31] text-white rounded-lg text-[10px] font-extrabold hover:bg-[#0B6B53] transition-all">
                          Manage File
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
    </div>
  );
};

