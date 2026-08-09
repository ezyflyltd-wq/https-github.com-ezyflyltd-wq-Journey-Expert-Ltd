import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Heart,
  Activity,
  Building2,
  Plane,
  FileText,
  Sparkles,
  Users,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  Stethoscope,
  Award,
  RefreshCw,
  PhoneCall,
  Lock,
  Download,
  AlertCircle,
  ChevronRight,
  MapPin,
  Calendar,
  Send,
  FileCheck,
  Briefcase,
  HelpCircle,
  FilePlus,
  Shield,
  Layers,
  Sparkle,
} from 'lucide-react';

export const HealthcareInsuranceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'insurance-marketplace' | 'medical-tourism' | 'hospitals-doctors' | 'patient-journey' | 'ai-health-advisor' | 'medical-vault' | 'corporate-health'
  >('insurance-marketplace');

  const [healthcareData, setHealthcareData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Insurance Premium Calculator State
  const [destinationRegion, setDestinationRegion] = useState('schengen');
  const [tripDurationDays, setTripDurationDays] = useState(14);
  const [travelerAge, setTravelerAge] = useState(32);
  const [coverageLimit, setCoverageLimit] = useState(100000);
  const [calculatedPremiumBDT, setCalculatedPremiumBDT] = useState(3500);
  const [policyPurchased, setPolicyPurchased] = useState(false);

  // AI Medical Travel Advisor Interactive State
  const [patientCondition, setPatientCondition] = useState('Advanced Cardiac Bypass / Minimally Invasive Valve Replacement');
  const [preferredBudgetUSD, setPreferredBudgetUSD] = useState(8000);
  const [preferredCountry, setPreferredCountry] = useState('India (Chennai Apollo)');
  const [aiRecommendation, setAiRecommendation] = useState<any>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  useEffect(() => {
    fetchHealthcareData();
  }, []);

  useEffect(() => {
    // Recalculate insurance premium dynamically
    let baseRate = 220; // BDT per day
    if (destinationRegion === 'usa-canada') baseRate = 450;
    if (destinationRegion === 'worldwide') baseRate = 320;
    if (travelerAge > 60) baseRate *= 1.6;
    if (coverageLimit > 100000) baseRate *= 1.4;

    const total = Math.round(baseRate * tripDurationDays);
    setCalculatedPremiumBDT(total);
  }, [destinationRegion, tripDurationDays, travelerAge, coverageLimit]);

  const fetchHealthcareData = () => {
    setLoading(true);
    fetch('/api/healthcare/overview')
      .then((res) => res.json())
      .then((data) => {
        setHealthcareData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load healthcare & insurance data:', err);
        setLoading(false);
      });
  };

  const handleGenerateAiMedicalAdvice = () => {
    setIsAiAnalyzing(true);
    setAiRecommendation(null);

    setTimeout(() => {
      setIsAiAnalyzing(false);
      setAiRecommendation({
        timestamp: new Date().toLocaleTimeString(),
        modelUsed: 'Gemini 2.5 Flash Healthcare & Medical Tourism Optimizer',
        recommendedHospital: 'Apollo Hospitals International, Chennai, India',
        jciStatus: 'Verified Global Partner Hospital',
        estimatedProcedureCostUSD: 4500,
        estimatedCostSavingsVsUS: '84% Savings ($4,500 vs $28,000 in USA)',
        leadSurgeon: 'Dr. K. M. Cherian (40+ Years Experience, 25,000+ Cardiac Surgeries)',
        recommendedMedicalVisaType: 'Medical Visa (M-Visa) + Companion Visa (MX-Visa)',
        turnaroundTimeDays: '3 Days Pre-Op + 5 Days In-Hospital Recovery',
        packageInclusions: [
          'Pre-Admission Video Teleconsultation with Lead Cardiac Surgeon',
          'Official Medical Visa Invitation Letter from Apollo Hospitals',
          'VIP Airport Meet & Greet at Chennai International Airport (MAA)',
          'Deluxe Private Hospital Room + Companion Accommodation',
          'Post-Operative Rehabilitation + Direct Flight Return Sync',
        ],
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEALTHCARE & TRAVEL INSURANCE CONTROL CENTER HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#0B5D3B] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • HEALTHCARE & INSURTECH (PART 21)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Allianz • MetLife • Premier Global Hospitals • 24/7 Air Ambulance</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Travel Insurance, Medical Tourism & Healthcare Platform
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Global InsurTech Travel Coverage, Schengen Visa Certificate Generation, Global Partner Hospital Booking across India, Thailand, Singapore & Turkey, and Gemini AI Treatment Recommendation.
            </p>
          </div>

          {/* Quick Health & Insurance Snapshot Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active Travel Insurance Policies:</span>
              <span className="text-white font-mono font-black text-sm">
                {(healthcareData?.insuranceKpis?.activePoliciesCount || 14820).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Claim Approval Success:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {healthcareData?.insuranceKpis?.claimApprovalRatePercent || 98.4}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Partner Hospitals:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {healthcareData?.medicalTourismKpis?.partnerHospitalsCount || 185} Global Hubs
              </span>
            </div>

            <button
              onClick={fetchHealthcareData}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Live InsurTech Telemetry</span>
            </button>
          </div>
        </div>

        {/* Global Key Health Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Claims Processed</span>
            <span className="text-lg font-black text-white font-mono">
              ${((healthcareData?.insuranceKpis?.totalClaimsProcessedUSD || 1240000) / 1000000).toFixed(2)}M
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Settlement Time</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {healthcareData?.insuranceKpis?.averageClaimSettlementDays || 2.4} Days
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Medical Cases Active</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              {healthcareData?.medicalTourismKpis?.activePatientCases || 840} Patients
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Treatment Savings</span>
            <span className="text-lg font-black text-white font-mono">
              ~{healthcareData?.medicalTourismKpis?.averageTreatmentSavingsPercent || 45}% Savings
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Certified Partner Ratio</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {healthcareData?.medicalTourismKpis?.jciAccreditedRatioPercent || 96}%
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">AI Diagnosis Accuracy</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {healthcareData?.aiHealthcareAdvisor?.averageHospitalMatchingAccuracy || '98.6%'}
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('insurance-marketplace')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'insurance-marketplace'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Travel Insurance Marketplace</span>
        </button>

        <button
          onClick={() => setActiveTab('medical-tourism')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'medical-tourism'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Heart className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Global Medical Tourism</span>
        </button>

        <button
          onClick={() => setActiveTab('hospitals-doctors')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'hospitals-doctors'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Partner Hospitals & Doctors</span>
        </button>

        <button
          onClick={() => setActiveTab('patient-journey')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'patient-journey'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Patient Journey Concierge</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-health-advisor')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-health-advisor'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>5. AI Medical Advisor</span>
        </button>

        <button
          onClick={() => setActiveTab('medical-vault')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'medical-vault'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Secure Medical Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('corporate-health')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'corporate-health'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Corporate Health & Air Ambulance</span>
        </button>
      </div>

      {/* TAB 1: INSURTECH TRAVEL INSURANCE MARKETPLACE */}
      {activeTab === 'insurance-marketplace' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Instant Travel Insurance & Schengen Policy Portal
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Allianz, MetLife, Green Delta & AXA Travel Care Calculator
              </h3>
            </div>
            <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              Schengen Visa (€30,000) Compliant Certificate Generator
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Premium Calculator Widget */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30 shadow-xl">
              <span className="font-serif font-black text-lg text-[#C8A14A] block">Instant Policy Calculator</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Destination Region</label>
                  <select
                    value={destinationRegion}
                    onChange={(e) => setDestinationRegion(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value="schengen">Europe / Schengen Zone (€30,000 Mandatory)</option>
                    <option value="worldwide">Worldwide (Excluding USA/Canada)</option>
                    <option value="usa-canada">USA & Canada ($250,000 Emergency Care)</option>
                    <option value="asia">Asia / Middle East / Umrah Travel</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Trip Duration (Days)</label>
                    <input
                      type="number"
                      value={tripDurationDays}
                      onChange={(e) => setTripDurationDays(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Traveler Age</label>
                    <input
                      type="number"
                      value={travelerAge}
                      onChange={(e) => setTravelerAge(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Medical Coverage Limit (USD)</label>
                  <select
                    value={coverageLimit}
                    onChange={(e) => setCoverageLimit(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                  >
                    <option value={50000}>$50,000 USD Basic Travel Care</option>
                    <option value={100000}>$100,000 USD Premium Schengen Plus</option>
                    <option value={250000}>$250,000 USD Platinum Global Protection</option>
                  </select>
                </div>

                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-emerald-200 font-bold block uppercase">Calculated Premium Total</span>
                  <strong className="text-3xl font-mono font-black text-amber-300">BDT {calculatedPremiumBDT.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-200 block">Includes 15% VAT & Emergency Assistance Fee</span>
                </div>

                <button
                  onClick={() => setPolicyPurchased(true)}
                  className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
                  <span>{policyPurchased ? '✓ Certificate Issued (Download PDF)' : 'Issue Instant Policy Certificate'}</span>
                </button>

                {policyPurchased && (
                  <div className="bg-emerald-950 border border-emerald-500 p-3 rounded-xl text-[11px] text-emerald-200 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <strong className="text-white">Policy #JEL-INS-2026-9042 Confirmed!</strong>
                    </div>
                    <p>Official Embassy-Recognized Certificate sent to your email with instant QR Verification Code.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Insurance Product Offerings Grid */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">
                Featured Partner Insurance Products
              </span>

              <div className="space-y-4">
                {healthcareData?.insuranceProducts?.map((ins: any, i: number) => (
                  <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ECECEC] pb-3">
                      <div>
                        <strong className="text-sm font-bold text-[#081C15] font-serif block">{ins.title}</strong>
                        <span className="text-[11px] text-[#0B5D3B] font-bold">Provider: {ins.provider}</span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#666666] block">Daily Rate</span>
                        <strong className="text-sm font-mono text-[#081C15] font-black">BDT {ins.pricePerDayBDT}/day</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#666666]">
                      {ins.keyBenefits.map((ben: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D3B] shrink-0" />
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#ECECEC] flex items-center justify-between text-[11px]">
                      <span className="text-[#666666]">Best For: <strong className="text-[#111111]">{ins.suitableFor}</strong></span>
                      <span className="text-[#0B5D3B] font-bold font-mono">Max Coverage: ${ins.coverageLimitUSD.toLocaleString()} USD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL MEDICAL TOURISM MARKETPLACE */}
      {activeTab === 'medical-tourism' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              International Healthcare Destinations & Cost Comparisons
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Accredited Medical Hubs in India, Thailand, Singapore, Malaysia & Turkey
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <MapPin className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">India (Chennai / Delhi / Mumbai)</strong>
              <p className="text-[#666666] leading-relaxed">
                World-class Cardiac, Oncology, Organ Transplant & Orthopedics at Apollo, Fortis & Max Hospitals. Average 80% cost savings vs Western countries.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <MapPin className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Thailand (Bangkok)</strong>
              <p className="text-[#666666] leading-relaxed">
                Luxury Executive Health Screening, Cosmetic Surgery & IVF Fertility at Bumrungrad & Bangkok Hospital with 5-star patient concierge.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <MapPin className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Singapore & Turkey</strong>
              <p className="text-[#666666] leading-relaxed">
                Robotic Neurosurgery at Mount Elizabeth Singapore & Advanced Bone Marrow Transplant at Memorial Şişli Istanbul with direct medical visa processing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JCI ACCREDITED HOSPITALS & DOCTOR DIRECTORY */}
      {activeTab === 'hospitals-doctors' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Gold Standard Healthcare Partners
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Verified International Hospital Profiles & Direct Teleconsultation Booking
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthcareData?.featuredHospitals?.map((hosp: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl overflow-hidden space-y-4 p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {hosp.accreditation}
                    </span>
                    <span className="text-[#C8A14A] font-bold font-mono">★ {hosp.rating} ({hosp.reviewsCount} reviews)</span>
                  </div>

                  <div>
                    <strong className="text-base font-bold text-[#081C15] font-serif block">{hosp.name}</strong>
                    <span className="text-xs text-[#666666]">{hosp.city}, {hosp.country}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hosp.specialties.map((spec: string, idx: number) => (
                      <span key={idx} className="bg-white border border-[#ECECEC] text-[#111111] text-[10px] px-2 py-0.5 rounded-md font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#666666] block">Avg Procedure Cost</span>
                    <strong className="text-xs font-mono text-[#0B5D3B] font-bold">${hosp.avgCostComparisonUSD}</strong>
                  </div>

                  <button className="px-4 py-2 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Book Teleconsult (${hosp.teleconsultFeeUSD})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: END-TO-END PATIENT JOURNEY CONCIERGE */}
      {activeTab === 'patient-journey' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Seamless 5-Step Healthcare Travel Workflow
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              From Pre-Op Video Consultation to Medical Visa, Flights & Post-Care
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <span className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white font-black text-xs flex items-center justify-center mx-auto">1</span>
              <strong className="text-xs text-[#081C15] font-bold block">Medical Review</strong>
              <p className="text-[11px] text-[#666666]">Submit reports & video consult with chief surgeon.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <span className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white font-black text-xs flex items-center justify-center mx-auto">2</span>
              <strong className="text-xs text-[#081C15] font-bold block">Medical Visa</strong>
              <p className="text-[11px] text-[#666666]">Hospital issues official Visa Invitation Letter in 24 hrs.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <span className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white font-black text-xs flex items-center justify-center mx-auto">3</span>
              <strong className="text-xs text-[#081C15] font-bold block">Travel & Hotel</strong>
              <p className="text-[11px] text-[#666666]">Sync stretcher/wheelchair flight + hotel near hospital.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <span className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white font-black text-xs flex items-center justify-center mx-auto">4</span>
              <strong className="text-xs text-[#081C15] font-bold block">Hospital Care</strong>
              <p className="text-[11px] text-[#666666]">Direct cashless admission & personal medical translator.</p>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2 text-center">
              <span className="w-7 h-7 rounded-full bg-[#0B5D3B] text-white font-black text-xs flex items-center justify-center mx-auto">5</span>
              <strong className="text-xs text-[#081C15] font-bold block">Aftercare Sync</strong>
              <p className="text-[11px] text-[#666666]">Follow-up consultations in Dhaka upon return.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GEMINI AI HEALTHCARE ADVISOR */}
      {activeTab === 'ai-health-advisor' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              AI Treatment Matching & Cost Estimator Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Gemini 2.5 Flash Medical Travel Advisor
            </h3>
          </div>

          <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Medical Procedure / Diagnosis</label>
                <input
                  type="text"
                  value={patientCondition}
                  onChange={(e) => setPatientCondition(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Target Budget (USD)</label>
                <input
                  type="number"
                  value={preferredBudgetUSD}
                  onChange={(e) => setPreferredBudgetUSD(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Preferred Country Destination</label>
                <select
                  value={preferredCountry}
                  onChange={(e) => setPreferredCountry(e.target.value)}
                  className="w-full bg-[#0B5D3B] border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-bold"
                >
                  <option value="India (Chennai Apollo)">India (Apollo Chennai / Fortis Delhi)</option>
                  <option value="Thailand (Bangkok)">Thailand (Bumrungrad Bangkok)</option>
                  <option value="Singapore">Singapore (Mount Elizabeth)</option>
                  <option value="Turkey">Turkey (Memorial Şişli Istanbul)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateAiMedicalAdvice}
              disabled={isAiAnalyzing}
              className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#C8A14A]" />
              <span>{isAiAnalyzing ? 'Analyzing Procedure Cost & Surgeon Availability...' : 'Generate AI Treatment & Cost Proposal'}</span>
            </button>

            {aiRecommendation && (
              <div className="bg-white/10 border border-white/20 p-5 rounded-2xl text-xs space-y-3 font-sans text-emerald-100">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <strong className="text-[#C8A14A] font-serif text-sm">{aiRecommendation.recommendedHospital}</strong>
                  <span className="text-[10px] font-mono text-emerald-300">{aiRecommendation.jciStatus}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-300 uppercase block font-bold">Estimated Cost</span>
                    <strong className="text-white font-mono text-base">${aiRecommendation.estimatedProcedureCostUSD.toLocaleString()} USD</strong>
                    <span className="text-amber-300 text-[10px] block font-bold">{aiRecommendation.estimatedCostSavingsVsUS}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-300 uppercase block font-bold">Recommended Surgeon</span>
                    <strong className="text-white text-xs block">{aiRecommendation.leadSurgeon}</strong>
                    <span className="text-emerald-200 text-[10px] block">{aiRecommendation.recommendedMedicalVisaType}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  <strong className="text-white text-xs block font-bold">Package Inclusions & Medical Concierge:</strong>
                  <ul className="list-disc list-inside space-y-1 text-emerald-200">
                    {aiRecommendation.packageInclusions.map((inc: string, idx: number) => (
                      <li key={idx}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: SECURE MEDICAL VAULT */}
      {activeTab === 'medical-vault' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              HIPAA & GDPR Compliant Medical Encryption
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Secure Document Locker for Prescriptions, MRI Scans & Insurance Claims
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Lock className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">256-Bit Encrypted Medical Storage</strong>
              <p className="text-[#666666]">
                Upload DICOM scans, blood reports, and doctor prescriptions. Shared exclusively with treating surgeons upon patient authorization.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <FileCheck className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-black text-[#081C15] font-serif block">Instant Insurance Claim Status Tracker</strong>
              <p className="text-[#666666]">
                Track cashless hospital discharge claims and overseas medical reimbursement directly with Allianz and MetLife claims handlers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CORPORATE HEALTH & AIR AMBULANCE */}
      {activeTab === 'corporate-health' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Employee Health & Emergency Evacuation
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              24/7 Global Air Ambulance Evacuation & Group Corporate Travel Cover
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-3 border border-emerald-800">
              <Plane className="w-6 h-6 text-[#C8A14A]" />
              <strong className="text-base font-black font-serif text-[#C8A14A] block">24/7 Critical Air Ambulance Dispatch</strong>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Dedicated ICU-equipped charter aircraft for critical medical transfers from Dhaka, Chittagong, or Sylhet to Bangkok, Singapore, or Chennai with full doctor & nurse flight escort.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-3">
              <Briefcase className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-base font-black font-serif text-[#081C15] block">Corporate Executive Group Health Coverage</strong>
              <p className="text-xs text-[#666666] leading-relaxed">
                Comprehensive group insurance for multinational C-level executives and overseas business delegations with direct consolidated monthly invoicing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
