import React, { useState, useEffect } from 'react';
import {
  Headphones,
  PhoneCall,
  MessageSquare,
  Globe,
  Zap,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  UserCheck,
  Send,
  Sparkles,
  Search,
  Filter,
  Mic,
  MicOff,
  Volume2,
  Bot,
  BrainCircuit,
  Sliders,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText,
  HelpCircle,
  Users,
  Video,
  Mail,
  Smartphone,
  ChevronRight,
  ExternalLink,
  Phone,
  BarChart2,
  Check,
  XCircle,
} from 'lucide-react';

export const CustomerSupportView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'contact-center' | 'ai-voice-bot' | 'smart-routing' | 'quality-control' | 'knowledge-base'
  >('contact-center');

  const [supportData, setSupportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // AI Voice & Omnichannel Simulator State
  const [selectedLanguage, setSelectedLanguage] = useState<'Bangla' | 'English' | 'Arabic'>('Bangla');
  const [simQueryType, setSimQueryType] = useState<string>('flight_reschedule');
  const [customUserSpeech, setCustomUserSpeech] = useState<string>(
    'ঢাকা থেকে লন্ডন আগামী ১৫ই সেপ্টেম্বর এর ফ্লাইট কি রি-শিডিউল করা সম্ভব?'
  );
  const [isSimulatingCall, setIsSimulatingCall] = useState<boolean>(false);
  const [voiceAiResponse, setVoiceAiResponse] = useState<any>(null);

  // Smart Ticket Generator State
  const [newTicketSubject, setNewTicketSubject] = useState<string>('UK CAS Letter Issuance Delay');
  const [newTicketCategory, setNewTicketCategory] = useState<string>('Study Abroad / University CAS');
  const [newTicketPriority, setNewTicketPriority] = useState<'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [ticketCreated, setTicketCreated] = useState<boolean>(false);

  // Search Knowledge Base State
  const [kbSearchTerm, setKbSearchTerm] = useState<string>('refund');

  useEffect(() => {
    fetchSupportOverview();
  }, []);

  const fetchSupportOverview = () => {
    setLoading(true);
    fetch('/api/customer-support/overview')
      .then((res) => res.json())
      .then((data) => {
        setSupportData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load customer support overview:', err);
        setLoading(false);
      });
  };

  // AI Voice Simulator Handler
  const handleSimulateVoiceCall = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingCall(true);
    setVoiceAiResponse(null);

    setTimeout(() => {
      setIsSimulatingCall(false);
      if (simQueryType === 'flight_reschedule') {
        setVoiceAiResponse({
          intent: 'FLIGHT_RESCHEDULE_SABRE',
          languageDetected: selectedLanguage,
          confidenceScore: '99.4%',
          spokenResponse:
            selectedLanguage === 'Bangla'
              ? 'জি অবশ্যই! আপনার Biman Bangladesh BG-201 টিকিটটির প্যান ও পিএনআর চেক করা হয়েছে। আগামী ১৮ই সেপ্টেম্বরের বিমানে আসন খালি রয়েছে। রি-শিডিউল ফি ৳ ৪,৫০০ টাকা। আপনি কি কনফার্ম করতে চান?'
              : selectedLanguage === 'Arabic'
              ? 'نعم بالتأكيد! تم التحقق من تذكرتك للطيران. يمكنك إعادة جدولة الرحلة بقيمة ٤٥٠٠ تاكا. هل ترغب بالتأكيد؟'
              : 'Yes absolutely! Checked your Biman Bangladesh BG-201 ticket PNR. Seats are available for Sept 18th. Change fee is BDT 4,500. Would you like to proceed?',
          suggestedActions: ['Execute Sabre GDS Exchange', 'Send SSLCommerz Payment Link via WhatsApp', 'Issue Updated E-Ticket'],
          sentiment: 'CALM_POSITIVE'
        });
      } else if (simQueryType === 'visa_status') {
        setVoiceAiResponse({
          intent: 'STUDY_ABROAD_CAS_VERIFICATION',
          languageDetected: selectedLanguage,
          confidenceScore: '98.8%',
          spokenResponse:
            selectedLanguage === 'Bangla'
              ? 'আপনার Coventry University এর Unconditional Offer Letter প্রস্তুত রয়েছে। CAS লেটার ইস্যুর জন্য ব্যাংক স্টেটমেন্ট ভেরিফিকেশন চলছে। আমাদের সিনিয়র এডুকেশন টিউটর ১ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।'
              : 'Your Unconditional Offer Letter for Coventry University is ready. Bank statement verification is currently underway for CAS issuance.',
          suggestedActions: ['Assign to Senior Education Counselor', 'Upload Bank Statement PDF to Document Portal'],
          sentiment: 'INFORMATIONAL_TRUST'
        });
      } else {
        setVoiceAiResponse({
          intent: 'MEDICAL_CONCIERGE_AIR_AMBULANCE',
          languageDetected: selectedLanguage,
          confidenceScore: '99.1%',
          spokenResponse:
            selectedLanguage === 'Bangla'
              ? 'ব্যাংকক বামরুনগ্রাদ হসপিটালের ডক্টর অ্যাপয়েন্টমেন্ট ও এয়ার অ্যাম্বুলেন্স ট্রান্সফার কনফার্ম করা হয়েছে। বিএমডিসি ও থাই ভিসা পেপারস প্রস্তুত।'
              : 'Bumrungrad Hospital doctor appointment and Bangkok transport concierge successfully scheduled. Visa papers ready.',
          suggestedActions: ['Dispatch VIP Hospital Escort Team', 'Notify Medical Desk Specialist'],
          sentiment: 'URGENT_EMPATHY'
        });
      }
    }, 1100);
  };

  // Ticket Creation Simulator
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketCreated(true);
    setTimeout(() => {
      setTicketCreated(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - OMNICHANNEL CONTACT CENTER & SERVICE PLATFORM */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • OMNICHANNEL SERVICE PLATFORM (PART 41)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Globe className="w-3 h-3 text-[#C8A14A]" />
                <span>MULTILINGUAL VOICE AI & ENTERPRISE CCaaS PLATFORM</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Customer Support & AI Omnichannel Contact Center
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              24/7 Intelligent Service Center unifying Voice AI Agents, WhatsApp Business, Web Live Chat, Email & VIP Video Concierge. Supporting Travel OTA, Study Abroad, Visas, Hajj & Umrah, Corporate & Medical Tourism.
            </p>
          </div>

          {/* SLA Quick Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>First Response SLA Time:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {supportData?.metrics?.avgFirstResponseTimeSec || 28} Seconds
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Customer CSAT Score:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {supportData?.metrics?.csatScorePct || 98.4}% Positive
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>24h Voice AI Calls:</span>
              <span className="text-amber-300 font-mono font-black text-xs">
                {supportData?.metrics?.voiceAiCallsHandled24h?.toLocaleString() || '3,420'} Calls
              </span>
            </div>

            <button
              onClick={fetchSupportOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Contact Center Telemetry</span>
            </button>
          </div>
        </div>

        {/* Contact Center KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Active Open Tickets</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              {supportData?.metrics?.activeTicketsOpen || 142} Tickets
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">SLA Compliance Rate</span>
            <strong className="text-amber-300 font-mono text-xs mt-0.5">
              {supportData?.metrics?.slaCompliancePct || 99.1}% On-Time
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Human Escalation Rate</span>
            <strong className="text-emerald-300 font-mono text-xs mt-0.5">
              {supportData?.metrics?.humanAgentTransferRatePct || 4.2}% Only
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Net Promoter Score</span>
            <strong className="text-white font-mono text-xs mt-0.5">
              +{supportData?.metrics?.npsScore || 82} NPS
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">System Status</span>
            <strong className="text-[#C8A14A] font-mono text-xs mt-0.5">CCaaS VOICE AI ONLINE</strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('contact-center')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'contact-center'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Headphones className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Omnichannel Contact Center & Ticket SLA</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-voice-bot')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-voice-bot'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Multilingual Voice AI & Chat Bot Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('smart-routing')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'smart-routing'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Smart Ticket Routing & Escalation Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('quality-control')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'quality-control'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Agent Quality Control & Call Whisper</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge-base')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'knowledge-base'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Self-Service Portal & AI Knowledge Base</span>
        </button>
      </div>

      {/* TAB 1: OMNICHANNEL CONTACT CENTER & TICKET SLA */}
      {activeTab === 'contact-center' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Live Support Queue
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Active Customer Support Tickets & SLA Countdown
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D3B]" />
                <span>SLA Timer Active</span>
              </span>
            </div>
          </div>

          {/* Ticket Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAF9] border-b border-[#ECECEC] text-[#666666] uppercase text-[10px] font-bold">
                  <th className="p-3">Ticket ID</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Category & Subject</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Assigned Agent</th>
                  <th className="p-3">SLA Remaining</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC] text-xs">
                {supportData?.recentTickets?.map((tkt: any, idx: number) => (
                  <tr key={idx} className="hover:bg-[#F8FAF9]/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#081C15]">{tkt.id}</td>
                    <td className="p-3 font-bold text-[#081C15]">{tkt.customerName}</td>
                    <td className="p-3 font-medium text-[#111111]">{tkt.category}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          tkt.priority === 'URGENT'
                            ? 'bg-red-100 text-red-800'
                            : tkt.priority === 'HIGH'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {tkt.priority}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#0B5D3B]">{tkt.channel}</td>
                    <td className="p-3 font-medium text-[#111111]">{tkt.assignedAgent}</td>
                    <td className="p-3 font-mono font-bold text-[#081C15]">
                      {tkt.slaTimeRemainingMin > 0 ? `${tkt.slaTimeRemainingMin} mins` : 'Met SLA'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          tkt.status === 'RESOLVED'
                            ? 'bg-emerald-800 text-white'
                            : tkt.status === 'IN_PROGRESS'
                            ? 'bg-[#0B5D3B] text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {tkt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Channel Distribution Breakdown */}
          <div className="pt-4 border-t border-[#ECECEC] space-y-3">
            <h4 className="font-bold text-[#081C15] font-serif text-sm">Omnichannel Service Volume Breakdown</h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {supportData?.channelDistribution?.map((ch: any, cIdx: number) => (
                <div key={cIdx} className="bg-[#F8FAF9] p-3 rounded-2xl border border-[#ECECEC] space-y-1">
                  <span className="text-[10px] text-[#666666] font-bold uppercase block">{ch.channel}</span>
                  <strong className="text-base font-black text-[#081C15] font-mono block">{ch.volumeShare}</strong>
                  <div className="text-[10px] text-[#0B5D3B] flex justify-between font-mono pt-1 border-t border-[#ECECEC]">
                    <span>AHT: {ch.avgHandlingTime}</span>
                    <span>CSAT: {ch.satisfaction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTILINGUAL VOICE AI & CHAT BOT SIMULATOR */}
      {activeTab === 'ai-voice-bot' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Voice & NLP Agent
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Multilingual Voice AI & Natural Language Support Simulator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Control Panel */}
            <form onSubmit={handleSimulateVoiceCall} className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
              <h4 className="font-bold text-[#081C15] font-serif text-sm">Configure Call / Chat Parameters</h4>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Preferred Language:</label>
                <div className="flex space-x-2">
                  {(['Bangla', 'English', 'Arabic'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        if (lang === 'Bangla') {
                          setCustomUserSpeech('ঢাকা থেকে লন্ডন আগামী ১৫ই সেপ্টেম্বর এর ফ্লাইট কি রি-শিডিউল করা সম্ভব?');
                        } else if (lang === 'Arabic') {
                          setCustomUserSpeech('هل يمكنني إعادة جدولة تذكرة الطيران من دكا إلى لندن؟');
                        } else {
                          setCustomUserSpeech('Is it possible to reschedule my flight ticket from Dhaka to London?');
                        }
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedLanguage === lang
                          ? 'bg-[#0B5D3B] text-white shadow-sm'
                          : 'bg-white border text-[#666666]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Customer Intent Category:</label>
                <select
                  value={simQueryType}
                  onChange={(e) => setSimQueryType(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                >
                  <option value="flight_reschedule">Flight Ticket Reschedule / GDS PNR Change</option>
                  <option value="visa_status">Study Abroad Offer Letter & CAS Verification</option>
                  <option value="medical_air_ambulance">Bangkok Hospital & Air Ambulance Transport</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Customer Spoken Input / Message:</label>
                <textarea
                  rows={3}
                  value={customUserSpeech}
                  onChange={(e) => setCustomUserSpeech(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
                />
              </div>

              <button
                type="submit"
                disabled={isSimulatingCall}
                className="w-full py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Mic className="w-4 h-4 text-[#C8A14A]" />
                <span>{isSimulatingCall ? 'Voice AI Processing Call...' : 'Execute Multilingual Voice AI Test'}</span>
              </button>
            </form>

            {/* AI Call Output Screen */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl border border-[#C8A14A]/40 space-y-4 shadow-xl flex flex-col justify-between font-mono">
              <div>
                <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                  <span className="text-[#C8A14A] font-serif text-sm font-bold flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-[#C8A14A]" />
                    <span>Voice AI Stream & Response</span>
                  </span>
                  {selectedLanguage && (
                    <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded">
                      {selectedLanguage} Speech
                    </span>
                  )}
                </div>

                {voiceAiResponse ? (
                  <div className="space-y-3 pt-3 text-xs">
                    <div className="bg-black/40 p-3 rounded-xl border border-emerald-800 text-emerald-200">
                      <strong className="text-amber-300 block mb-1">Intent Identified: {voiceAiResponse.intent}</strong>
                      <p className="text-white text-xs font-sans leading-relaxed">{voiceAiResponse.spokenResponse}</p>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <span className="text-emerald-300 font-bold block">Autonomous Actions Triggered:</span>
                      <ul className="list-disc list-inside text-emerald-100 space-y-0.5">
                        {voiceAiResponse.suggestedActions.map((act: string, aIdx: number) => (
                          <li key={aIdx}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-emerald-400/60 font-sans text-xs">
                    Click "Execute Multilingual Voice AI Test" to hear and see Voice AI stream synthesis.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMART TICKET ROUTING & ESCALATION ENGINE */}
      {activeTab === 'smart-routing' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Automated Dispatch Logic
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Department Smart Routing Rules & SLA Escalation Matrices
            </h3>
          </div>

          <form onSubmit={handleCreateTicket} className="space-y-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
            <h4 className="font-bold text-[#081C15] font-serif text-sm">Simulate New Customer Support Request</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Subject / Issue Summary:</label>
                <input
                  type="text"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Service Category:</label>
                <select
                  value={newTicketCategory}
                  onChange={(e) => setNewTicketCategory(e.target.value)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium focus:outline-none"
                >
                  <option value="Study Abroad / University CAS">Study Abroad / University CAS Letter</option>
                  <option value="Flight OTA Booking">Flight OTA Booking / GDS Re-issuance</option>
                  <option value="Hajj & Umrah Pilgrimage">Hajj & Umrah Pilgrimage Support</option>
                  <option value="Corporate Travel Wallet">Corporate Travel Wallet & Invoicing</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C15] text-xs">Priority Threshold:</label>
                <select
                  value={newTicketPriority}
                  onChange={(e) => setNewTicketPriority(e.target.value as any)}
                  className="w-full p-3 bg-white border border-[#ECECEC] rounded-xl text-xs font-bold focus:outline-none"
                >
                  <option value="URGENT">URGENT (SLA &lt; 15 Mins)</option>
                  <option value="HIGH">HIGH (SLA &lt; 30 Mins)</option>
                  <option value="MEDIUM">MEDIUM (SLA &lt; 2 Hours)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#081C15] hover:bg-[#0B5D3B] text-white font-extrabold rounded-xl transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4 text-[#C8A14A]" />
              <span>Route & Create Ticket</span>
            </button>
          </form>

          {ticketCreated && (
            <div className="p-5 bg-emerald-950 text-white border border-emerald-500/40 rounded-2xl space-y-2 font-mono text-xs animate-fade-in">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C8A14A]" />
                <span>Ticket Auto-Routed to Dedicated Specialist Team!</span>
              </div>
              <p className="text-emerald-100">
                Routed Subject: <strong className="text-white">{newTicketSubject}</strong> • Assigned to <strong className="text-white">Education Counselor Desk</strong>. Target Resolution SLA: 15 Minutes.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AGENT QUALITY CONTROL & CALL WHISPER */}
      {activeTab === 'quality-control' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Supervisor Oversight
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Live Agent Monitoring, Call Barge & Quality Control
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-[#081C15]">Rashed Khan</strong>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  ON CALL (GDS Sabre)
                </span>
              </div>
              <p className="text-xs text-[#666666]">Handling ticket #TKT-9042 (Flight Reschedule)</p>
              <button className="w-full py-2 bg-[#0B5D3B] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1">
                <Mic className="w-3.5 h-3.5 text-[#C8A14A]" />
                <span>Barge / Whisper Advice</span>
              </button>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-[#081C15]">Tania Rahman</strong>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  IN CHAT (CAS Specialist)
                </span>
              </div>
              <p className="text-xs text-[#666666]">Handling ticket #TKT-9043 (UK Visa Document)</p>
              <button className="w-full py-2 bg-[#081C15] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#C8A14A]" />
                <span>Inspect Chat Stream</span>
              </button>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-[#081C15]">Samiul Islam</strong>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  AVAILABLE
                </span>
              </div>
              <p className="text-xs text-[#666666]">Corporate Accounts Desk Ready</p>
              <button className="w-full py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl">
                Assign Overflow Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SELF-SERVICE PORTAL & AI KNOWLEDGE BASE */}
      {activeTab === 'knowledge-base' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Knowledge Index
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              AI RAG Knowledge Base & Customer Self-Service SOP Index
            </h3>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search FAQs, Refund Rules, Visa Checklist..."
                value={kbSearchTerm}
                onChange={(e) => setKbSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-xs font-medium focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <strong className="text-sm font-bold text-[#081C15] block">Flight Cancellation & Refund Procedure</strong>
                <p className="text-xs text-[#666666]">
                  Airlines process full refunds within 7-10 business days. SSLCommerz & bKash instant wallet credits take 24 hours.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <strong className="text-sm font-bold text-[#081C15] block">UK Student Visa CAS Bank Statement Checklist</strong>
                <p className="text-xs text-[#666666]">
                  Bank statement must be 28 days continuous maturity. Supported banks include Eastern Bank, Standard Chartered, City Bank.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
