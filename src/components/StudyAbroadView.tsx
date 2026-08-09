import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Sparkles,
  Calculator,
} from 'lucide-react';
import { University, StudentProfile } from '../types';
import { MOCK_UNIVERSITIES } from '../data/mockData';

export const StudyAbroadView: React.FC = () => {
  const [universities] = useState<University[]>(MOCK_UNIVERSITIES);
  const [selectedCountry, setSelectedCountry] = useState<string>('All');

  // Profile Assessment Tool States
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: 'Tariqul Islam',
    email: 'tariqul@gmail.com',
    phone: '+880 1711-000000',
    highestDegree: 'Bachelor of Science (BSc)',
    gpa: 3.4,
    ieltsScore: 6.5,
    preferredCountry: 'United Kingdom',
    preferredField: 'Computer Science',
    maxBudgetUSD: 20000,
  });

  const [assessmentResult, setAssessmentResult] = useState<{
    matchRating: string;
    eligibleUniversities: University[];
    scholarshipEstimateBDT: number;
  } | null>(null);

  const filteredUnis = universities.filter((u) => {
    if (selectedCountry === 'All') return true;
    return u.country === selectedCountry;
  });

  const handleRunAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const eligible = universities.filter(
      (u) => u.minIELTS <= profile.ieltsScore && u.minGPA <= profile.gpa
    );

    setAssessmentResult({
      matchRating: eligible.length > 0 ? 'HIGH ELIGIBILITY MATCH (94%)' : 'MODERATE MATCH - IELTS WAIVER NEEDED',
      eligibleUniversities: eligible,
      scholarshipEstimateBDT: profile.gpa >= 3.5 ? 350000 : 180000,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0B6B53] mb-1 tracking-wider uppercase">
            <GraduationCap className="w-4 h-4 text-[#C7A44D]" />
            <span>JEL Study Abroad & Global Mobility Division</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#093F31] font-serif">
            500+ Partner Universities in UK, Canada, Australia & Malaysia
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-medium">
            Free profile assessment, CAS/I-20 offer letter processing, and student visa file preparation.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F8FAF9] px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-xs text-[#093F31] font-bold">
          <Award className="w-5 h-5 text-[#C7A44D]" />
          <span>Up to ৳5,00,000 Direct University Scholarship Guaranteed</span>
        </div>
      </div>

      {/* PROFILE ASSESSMENT CALCULATOR TOOL */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-[#C7A44D]" />
          <h3 className="text-base font-black text-white font-serif">
            Instant AI University Match & Scholarship Eligibility Assessor
          </h3>
        </div>

        <form onSubmit={handleRunAssessment} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-emerald-200/80 font-semibold mb-1">Your Highest GPA / CGPA</label>
            <input
              type="number"
              step="0.1"
              max="5.0"
              value={profile.gpa}
              onChange={(e) => setProfile({ ...profile, gpa: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#0B6B53]/40 border border-[#C7A44D]/30 rounded-xl p-2.5 text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-emerald-200/80 font-semibold mb-1">IELTS / TOEFL Overall Band</label>
            <input
              type="number"
              step="0.5"
              max="9.0"
              value={profile.ieltsScore}
              onChange={(e) => setProfile({ ...profile, ieltsScore: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#0B6B53]/40 border border-[#C7A44D]/30 rounded-xl p-2.5 text-[#C7A44D] font-bold"
            />
          </div>

          <div>
            <label className="block text-emerald-200/80 font-semibold mb-1">Target Country</label>
            <select
              value={profile.preferredCountry}
              onChange={(e) => setProfile({ ...profile, preferredCountry: e.target.value })}
              className="w-full bg-[#0B6B53]/40 border border-[#C7A44D]/30 rounded-xl p-2.5 text-white font-bold"
            >
              <option value="United Kingdom" className="text-[#111111]">United Kingdom (UK)</option>
              <option value="Canada" className="text-[#111111]">Canada</option>
              <option value="Australia" className="text-[#111111]">Australia</option>
              <option value="Malaysia" className="text-[#111111]">Malaysia</option>
            </select>
          </div>

          <div>
            <label className="block text-emerald-200/80 font-semibold mb-1">Annual Budget Limit ($ USD)</label>
            <input
              type="number"
              step="1000"
              value={profile.maxBudgetUSD}
              onChange={(e) => setProfile({ ...profile, maxBudgetUSD: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#0B6B53]/40 border border-[#C7A44D]/30 rounded-xl p-2.5 text-white font-bold"
            />
          </div>

          <div className="lg:col-span-4 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>RUN AI UNIVERSITY & SCHOLARSHIP MATCH</span>
            </button>
          </div>
        </form>

        {/* Assessment Result Output */}
        {assessmentResult && (
          <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="font-extrabold text-[#C7A44D] text-sm">{assessmentResult.matchRating}</span>
              <span className="text-white font-bold text-xs">
                Estimated Scholarship: ৳ {assessmentResult.scholarshipEstimateBDT.toLocaleString()}
              </span>
            </div>

            <p className="text-emerald-100">
              Based on your GPA <span className="font-bold text-white">{profile.gpa}</span> and IELTS <span className="font-bold text-white">{profile.ieltsScore}</span>, you meet direct admission criteria for <span className="font-bold text-[#C7A44D]">{assessmentResult.eligibleUniversities.length} partner universities</span>.
            </p>
          </div>
        )}
      </div>

      {/* UNIVERSITY CARDS GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-black text-[#093F31]">Top Partner Universities</h3>

          <div className="flex flex-wrap gap-2">
            {['All', 'United Kingdom', 'Canada', 'Australia', 'Malaysia'].map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedCountry === country
                    ? 'bg-[#0B6B53] text-white shadow-sm'
                    : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUnis.map((uni) => (
            <div
              key={uni.id}
              className="bg-white border border-[#ECECEC] rounded-3xl p-6 space-y-4 hover:border-[#0B6B53]/40 transition-all shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img src={uni.logo} alt={uni.name} className="w-12 h-12 rounded-2xl object-cover border border-[#ECECEC] p-1 bg-[#F8FAF9]" />
                  <div>
                    <h4 className="font-extrabold text-[#111111] text-base">{uni.name}</h4>
                    <p className="text-xs text-[#666666]">{uni.city}, {uni.country}</p>
                  </div>
                </div>

                <span className="bg-[#F8FAF9] text-[#093F31] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#ECECEC]">
                  QS Rank #{uni.qsRanking}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#111111] bg-[#F8FAF9] p-3.5 rounded-2xl border border-[#ECECEC]">
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Min. Entry Criteria</span>
                  <span className="font-bold text-[#111111]">IELTS {uni.minIELTS} • GPA {uni.minGPA}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-semibold block">Annual Tuition</span>
                  <span className="font-bold text-[#0B6B53]">৳ {uni.tuitionPerYearBDT.toLocaleString()}</span>
                  <span className="text-[10px] text-[#666666] block">(${uni.tuitionPerYearUSD})</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#666666] font-semibold block mb-1">Popular Courses & Intakes</span>
                <div className="flex flex-wrap gap-1">
                  {uni.popularCourses.map((c, i) => (
                    <span key={i} className="bg-[#F8FAF9] text-[#093F31] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#ECECEC]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert(`Free consultation request submitted for ${uni.name}! JEL Senior Study Counselor will reach out on WhatsApp.`)}
                className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
              >
                APPLY FOR FREE ADMISSION & VISA GUIDANCE
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
