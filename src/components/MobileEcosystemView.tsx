import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Mic,
  MicOff,
  Bell,
  ShieldCheck,
  Wifi,
  WifiOff,
  Download,
  Star,
  Layers,
  Plane,
  Building2,
  GraduationCap,
  FileCheck2,
  ShoppingBag,
  Briefcase,
  Globe,
  Fingerprint,
  Lock,
  QrCode,
  Zap,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Volume2,
  RefreshCw,
  Send,
  User,
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Share2,
} from 'lucide-react';

export const MobileEcosystemView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'customer' | 'agent' | 'corporate' | 'student' | 'craft' | 'voice-ai' | 'push-offline' | 'tech-stack'
  >('customer');

  // Interactive Mobile Simulator State
  const [simulatorScreen, setSimulatorScreen] = useState<'home' | 'flights' | 'hotel' | 'visa' | 'wallet' | 'voice'>('home');
  const [mobileData, setMobileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Voice AI Simulator State
  const [selectedLanguage, setSelectedLanguage] = useState<'bn-BD' | 'en-US' | 'ar-SA'>('bn-BD');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Push Notification Simulator State
  const [notificationLog, setNotificationLog] = useState<
    { id: string; title: string; body: string; time: string; type: string }[]
  >([
    {
      id: '1',
      title: 'Flight Status Alert • BG201',
      body: 'Dhaka to London Heathrow (BG201) Gate 04 Boarding now open. Gate closes in 25 mins.',
      time: 'Just now',
      type: 'flight',
    },
    {
      id: '2',
      title: 'UK Student Visa Approved! 🎉',
      body: 'CAS Number CAS-992014 verified by UK Visas & Immigration. Your stamped passport is ready.',
      time: '10 mins ago',
      type: 'visa',
    },
  ]);

  const [simulatedOnline, setSimulatedOnline] = useState(true);
  const [biometricUnlocked, setBiometricUnlocked] = useState(true);

  useEffect(() => {
    fetchMobileData();
  }, []);

  const fetchMobileData = () => {
    setLoading(true);
    fetch('/api/mobile/overview')
      .then((res) => res.json())
      .then((data) => {
        setMobileData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load mobile data:', err);
        setLoading(false);
      });
  };

  const handleVoiceAssistantQuery = (promptText?: string) => {
    const query = promptText || voiceQuery;
    if (!query) return;

    setIsRecording(true);
    setVoiceResponse('Gemini 2.5 Flash Voice Engine listening and processing audio stream...');

    setTimeout(() => {
      setIsRecording(false);
      setIsSpeaking(true);

      if (selectedLanguage === 'bn-BD') {
        setVoiceResponse(
          'ঢাকা থেকে লন্ডন আগামী ১৫ আগস্টের সবচেয়ে কম ভাড়ার ফ্লাইট Biman Bangladesh BG201, ভাড়া BDT 78,500। আপনি কি সরাসরি অ্যাপে পেমেন্ট করতে চান?'
        );
      } else if (selectedLanguage === 'ar-SA') {
        setVoiceResponse(
          'أفضل رحلة طيران متوفرة من دكا إلى لندن هيلثرو يوم 15 أغسطس هي BG201 بسعر 78,500 تكا. هل تريد حجز التذكرة الآن؟'
        );
      } else {
        setVoiceResponse(
          'The best flight from Dhaka to London Heathrow on August 15th is Biman Bangladesh BG201 at BDT 78,500. Direct seat selection & baggage inclusion included.'
        );
      }

      setTimeout(() => {
        setIsSpeaking(false);
      }, 3500);
    }, 1200);
  };

  const handleTriggerPushNotification = (type: 'flight' | 'visa' | 'payment' | 'deal') => {
    let title = '';
    let body = '';

    if (type === 'flight') {
      title = '✈️ Sabre GDS Fare Drop Alert!';
      body = 'Biman Bangladesh BG201 Dhaka to London fare dropped by BDT 4,200. Book now!';
    } else if (type === 'visa') {
      title = '📄 Schengen Visa Appointment Available';
      body = 'Slot opened at VFS Global Dhaka for September 02. Secure your appointment!';
    } else if (type === 'payment') {
      title = '💳 bKash Cashback Credit Received';
      body = 'You received BDT 1,250 Instant Cashback into your JEL Wallet for Flight Booking #JEL-9022.';
    } else {
      title = '🎁 Exclusive Eid Umrah Discount';
      body = 'Get 15% discount on 5-Star Makkah Hotel Packages with free Haram transfer.';
    }

    const newNotif = {
      id: Date.now().toString(),
      title,
      body,
      time: 'Just now',
      type,
    };

    setNotificationLog([newNotif, ...notificationLog]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* MOBILE ECOSYSTEM HERO BANNER */}
      <div className="bg-[#081C15] text-white border border-[#0B5D3B] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • MOBILE ECOSYSTEM (PART 18)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>iOS • Android • Flutter • PWA Active</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise Mobile Application Ecosystem
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Native iOS & Android Apps, Cross-Platform Flutter / React Native Suite, Multilingual Gemini Voice AI in Bengali, Arabic & English, Offline Boarding Pass Storage, and Secure Biometric Payments.
            </p>
          </div>

          {/* Ecosystem Telemetry Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Total App Downloads:</span>
              <span className="text-white font-mono font-black text-sm">
                {(mobileData?.ecosystemMetrics?.totalAppDownloads || 285000).toLocaleString()}+
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Active Users:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {(mobileData?.ecosystemMetrics?.activeMonthlyUsers || 142000).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>App Store / Play Rating:</span>
              <span className="text-amber-300 font-mono font-black text-xs flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{mobileData?.ecosystemMetrics?.appStoreRating || 4.9} / 5.0</span>
              </span>
            </div>

            <button
              onClick={fetchMobileData}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Mobile Telemetry</span>
            </button>
          </div>
        </div>

        {/* Global Mobile Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">PWA Installs</span>
            <span className="text-lg font-black text-white font-mono">
              {(mobileData?.ecosystemMetrics?.pwaInstalls || 48500).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Push Alerts (24h)</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {(mobileData?.ecosystemMetrics?.pushNotificationsSentToday || 42800).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Biometric Adoption</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              {mobileData?.ecosystemMetrics?.biometricAuthUsersPercent || 88.4}%
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Offline Boarding Passes</span>
            <span className="text-lg font-black text-white font-mono">
              {(mobileData?.ecosystemMetrics?.offlineTicketsCached || 18400).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Voice AI Queries (24h)</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {(mobileData?.ecosystemMetrics?.voiceAiSessions24h || 3240).toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Supported Languages</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              3 (BN, EN, AR)
            </span>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('customer');
            setSimulatorScreen('home');
          }}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'customer'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Smartphone className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Customer Mobile App</span>
        </button>

        <button
          onClick={() => setActiveTab('agent')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'agent'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C8A14A]" />
          <span>2. B2B Agent Portal App</span>
        </button>

        <button
          onClick={() => setActiveTab('corporate')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'corporate'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Corporate TMC App</span>
        </button>

        <button
          onClick={() => setActiveTab('student')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'student'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Study Abroad App</span>
        </button>

        <button
          onClick={() => setActiveTab('craft')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'craft'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Craft Guild App</span>
        </button>

        <button
          onClick={() => setActiveTab('voice-ai')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'voice-ai'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Mic className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Voice AI (BN, EN, AR)</span>
        </button>

        <button
          onClick={() => setActiveTab('push-offline')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'push-offline'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bell className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Push & Offline Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('tech-stack')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'tech-stack'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C8A14A]" />
          <span>8. Tech Stack & App Store</span>
        </button>
      </div>

      {/* MAIN VIEW CONTENT CONTAINER */}
      {/* TAB 1: CUSTOMER MOBILE APP WITH INTERACTIVE PHONE SIMULATOR */}
      {activeTab === 'customer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Screen Controls & Feature Cards */}
          <div className="lg:col-span-7 space-y-6 text-xs text-[#111111]">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Primary Consumer Mobile Application
              </span>
              <h2 className="text-2xl font-black text-[#081C15] font-serif">
                All-in-One Global Travel, Visa & Study Abroad Mobile Experience
              </h2>
              <p className="text-[#666666] leading-relaxed">
                Built natively for iOS (SwiftUI) and Android (Jetpack Compose) with full PWA web fallback. Features 1-click Sabre/Amadeus GDS flight booking, Halal hotel finder, real-time visa file tracking, and offline boarding pass storage.
              </p>

              {/* Interactive Screen Selector Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#081C15] block mb-2">
                  Click below to test live interactive screens on the mobile simulator:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimulatorScreen('home')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center space-x-1.5 font-bold ${
                      simulatorScreen === 'home'
                        ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                        : 'bg-[#F8FAF9] border-[#ECECEC] text-[#666666] hover:bg-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Home Dashboard</span>
                  </button>

                  <button
                    onClick={() => setSimulatorScreen('flights')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center space-x-1.5 font-bold ${
                      simulatorScreen === 'flights'
                        ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                        : 'bg-[#F8FAF9] border-[#ECECEC] text-[#666666] hover:bg-white'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Flight Search</span>
                  </button>

                  <button
                    onClick={() => setSimulatorScreen('hotel')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center space-x-1.5 font-bold ${
                      simulatorScreen === 'hotel'
                        ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                        : 'bg-[#F8FAF9] border-[#ECECEC] text-[#666666] hover:bg-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Halal Hotel Finder</span>
                  </button>

                  <button
                    onClick={() => setSimulatorScreen('visa')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center space-x-1.5 font-bold ${
                      simulatorScreen === 'visa'
                        ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                        : 'bg-[#F8FAF9] border-[#ECECEC] text-[#666666] hover:bg-white'
                    }`}
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Visa Status</span>
                  </button>

                  <button
                    onClick={() => setSimulatorScreen('wallet')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center space-x-1.5 font-bold ${
                      simulatorScreen === 'wallet'
                        ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                        : 'bg-[#F8FAF9] border-[#ECECEC] text-[#666666] hover:bg-white'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Offline Ticket</span>
                  </button>

                  <button
                    onClick={() => setSimulatorScreen('voice')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center space-x-1.5 font-bold ${
                      simulatorScreen === 'voice'
                        ? 'bg-[#0B5D3B] text-white border-[#0B5D3B]'
                        : 'bg-[#F8FAF9] border-[#ECECEC] text-[#666666] hover:bg-white'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5 text-[#C8A14A]" />
                    <span>Voice Assistant</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Core Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center space-x-2 text-[#0B5D3B]">
                  <Fingerprint className="w-4 h-4 text-[#C8A14A]" />
                  <strong className="text-sm font-black text-[#081C15] font-serif">Biometric Auth & Wallet</strong>
                </div>
                <p className="text-[#666666]">
                  Supports iOS Face ID and Android Fingerprint with bKash, Nagad, SSLCommerz, and Stripe instant checkout.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <div className="flex items-center space-x-2 text-[#0B5D3B]">
                  <WifiOff className="w-4 h-4 text-[#C8A14A]" />
                  <strong className="text-sm font-black text-[#081C15] font-serif">Offline E-Ticket Cache</strong>
                </div>
                <p className="text-[#666666]">
                  PDF e-tickets and QR boarding passes are cached securely on-device for zero-network airport scanning.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: INTERACTIVE HIGH-FIDELITY MOBILE SIMULATOR FRAME */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] h-[640px] bg-[#081C15] border-[10px] border-[#1A1A1A] rounded-[48px] shadow-2xl relative flex flex-col overflow-hidden text-white select-none">
              {/* Phone Status Bar */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] text-emerald-200 z-20 shrink-0">
                <span className="font-bold">09:41</span>
                {/* Dynamic Island / Notch */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto shadow-inner"></div>
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-bold">5G</span>
                </div>
              </div>

              {/* Dynamic Phone Screen Content */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 text-xs font-sans">
                {/* SIMULATOR SCREEN: HOME */}
                {simulatorScreen === 'home' && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Header Greeting */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-emerald-300 uppercase block">Welcome Back</span>
                        <h4 className="text-base font-black text-white font-serif">Tanvir Ahmed</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#C8A14A] text-[#081C15] font-black flex items-center justify-center text-xs">
                        TA
                      </div>
                    </div>

                    {/* AI Voice Assistant Trigger Banner */}
                    <button
                      onClick={() => setSimulatorScreen('voice')}
                      className="w-full bg-gradient-to-r from-emerald-900 to-[#0B5D3B] p-3 rounded-2xl border border-emerald-500/40 text-left space-y-1 shadow-md hover:brightness-110 transition-all"
                    >
                      <div className="flex items-center justify-between text-[#C8A14A]">
                        <span className="text-[10px] font-black uppercase flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-[#C8A14A]" />
                          <span>Gemini Voice Assistant</span>
                        </span>
                        <Mic className="w-4 h-4 text-white animate-bounce" />
                      </div>
                      <p className="text-[11px] text-emerald-100 font-bold">
                        "ভয়েস সার্চ করুন: ঢাকা থেকে লন্ডন ফ্লাইট"
                      </p>
                    </button>

                    {/* Quick Category Buttons */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <button
                        onClick={() => setSimulatorScreen('flights')}
                        className="bg-white/10 p-2.5 rounded-xl border border-white/10 hover:bg-white/20 space-y-1"
                      >
                        <Plane className="w-5 h-5 mx-auto text-[#C8A14A]" />
                        <span className="block font-bold">Flights</span>
                      </button>

                      <button
                        onClick={() => setSimulatorScreen('hotel')}
                        className="bg-white/10 p-2.5 rounded-xl border border-white/10 hover:bg-white/20 space-y-1"
                      >
                        <Building2 className="w-5 h-5 mx-auto text-[#C8A14A]" />
                        <span className="block font-bold">Hotels</span>
                      </button>

                      <button
                        onClick={() => setSimulatorScreen('visa')}
                        className="bg-white/10 p-2.5 rounded-xl border border-white/10 hover:bg-white/20 space-y-1"
                      >
                        <FileCheck2 className="w-5 h-5 mx-auto text-[#C8A14A]" />
                        <span className="block font-bold">Visa</span>
                      </button>

                      <button
                        onClick={() => setSimulatorScreen('wallet')}
                        className="bg-white/10 p-2.5 rounded-xl border border-white/10 hover:bg-white/20 space-y-1"
                      >
                        <QrCode className="w-5 h-5 mx-auto text-[#C8A14A]" />
                        <span className="block font-bold">Ticket</span>
                      </button>
                    </div>

                    {/* Upcoming Trip Card */}
                    <div className="bg-white/10 p-3 rounded-2xl border border-white/15 space-y-2">
                      <div className="flex justify-between text-[10px] text-emerald-300 font-bold">
                        <span>UPCOMING FLIGHT</span>
                        <span>PNR: Sabre-9022</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold font-mono">
                        <span>DAC</span>
                        <Plane className="w-4 h-4 text-[#C8A14A]" />
                        <span>LHR</span>
                      </div>
                      <p className="text-[10px] text-emerald-100">Biman Bangladesh BG201 • Aug 15, 2026</p>
                    </div>
                  </div>
                )}

                {/* SIMULATOR SCREEN: FLIGHTS */}
                {simulatorScreen === 'flights' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                      <h4 className="font-bold text-sm text-[#C8A14A]">Sabre & Amadeus Search</h4>
                      <button onClick={() => setSimulatorScreen('home')} className="text-[10px] text-emerald-300">
                        Back
                      </button>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl space-y-2 border border-white/15">
                      <div className="text-[10px] text-emerald-300 uppercase font-bold">Route & Date</div>
                      <div className="text-xs font-bold">Dhaka (DAC) ➔ London (LHR)</div>
                      <div className="text-[10px] text-emerald-200">Departing 15 Aug • 1 Passenger</div>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-[#0B5D3B] p-3 rounded-xl border border-emerald-400/30 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-[#C8A14A]">
                          <span>Biman Bangladesh (BG201)</span>
                          <span>BDT 78,500</span>
                        </div>
                        <div className="text-[11px] text-white">08:25 DAC ➔ 15:45 LHR (Direct)</div>
                        <span className="text-[9px] bg-emerald-900 px-2 py-0.5 rounded-full text-emerald-300">
                          Lowest Fare Guarantee
                        </span>
                      </div>

                      <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-white">
                          <span>Emirates (EK583)</span>
                          <span>BDT 92,000</span>
                        </div>
                        <div className="text-[11px] text-emerald-200">10:15 DAC ➔ 19:30 LHR (1 Stop DXB)</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SIMULATOR SCREEN: HALAL HOTEL */}
                {simulatorScreen === 'hotel' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                      <h4 className="font-bold text-sm text-[#C8A14A]">Halal Hotel Finder</h4>
                      <button onClick={() => setSimulatorScreen('home')} className="text-[10px] text-emerald-300">
                        Back
                      </button>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl space-y-1">
                      <div className="text-[10px] text-emerald-300 uppercase font-bold">Location & Rating</div>
                      <div className="text-xs font-bold">Makkah Clock Royal Tower</div>
                      <p className="text-[10px] text-emerald-200">5-Star • 0m from Haram • Halal Food Certified</p>
                      <div className="text-xs font-mono font-bold text-[#C8A14A] pt-1">BDT 18,500 / night</div>
                    </div>
                  </div>
                )}

                {/* SIMULATOR SCREEN: VISA TRACKER */}
                {simulatorScreen === 'visa' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                      <h4 className="font-bold text-sm text-[#C8A14A]">Visa Application Status</h4>
                      <button onClick={() => setSimulatorScreen('home')} className="text-[10px] text-emerald-300">
                        Back
                      </button>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl space-y-2 border border-white/10">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-emerald-300 font-bold">Ref: UK-STUDENT-992014</span>
                        <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full text-[9px]">
                          Approved
                        </span>
                      </div>
                      <div className="text-xs font-bold">UK Tier 4 Student Visa</div>
                      <p className="text-[10px] text-emerald-200">University of Manchester • CAS Verified</p>
                    </div>
                  </div>
                )}

                {/* SIMULATOR SCREEN: OFFLINE BOARDING PASS WALLET */}
                {simulatorScreen === 'wallet' && (
                  <div className="space-y-3 animate-fade-in text-center">
                    <div className="flex items-center justify-between border-b border-emerald-900 pb-2 text-left">
                      <h4 className="font-bold text-sm text-[#C8A14A]">Offline Boarding Pass</h4>
                      <button onClick={() => setSimulatorScreen('home')} className="text-[10px] text-emerald-300">
                        Back
                      </button>
                    </div>

                    <div className="bg-white text-[#081C15] p-4 rounded-2xl space-y-3 text-left">
                      <div className="flex justify-between items-center text-xs font-bold border-b border-gray-200 pb-2">
                        <span>BG201 • Seat 14A</span>
                        <span className="text-emerald-700">Gate 04</span>
                      </div>

                      <div className="flex justify-center py-2">
                        {/* Simulated QR Code */}
                        <div className="w-28 h-28 bg-black p-2 rounded-xl flex items-center justify-center text-white text-[8px] font-mono text-center">
                          [Sabre PKPASS QR CODE JEL-9022]
                        </div>
                      </div>

                      <div className="text-[10px] text-gray-600 text-center font-bold">
                        Cached On-Device • Works Offline Without Internet
                      </div>
                    </div>
                  </div>
                )}

                {/* SIMULATOR SCREEN: VOICE ASSISTANT */}
                {simulatorScreen === 'voice' && (
                  <div className="space-y-3 animate-fade-in text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-[#0B5D3B] border-2 border-[#C8A14A] mx-auto flex items-center justify-center text-[#C8A14A] animate-pulse">
                      <Mic className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#C8A14A]">Gemini Voice Assistant</h4>
                      <p className="text-[10px] text-emerald-200">Listening in Bengali, Arabic, English...</p>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl text-left text-[11px] text-emerald-100 border border-white/10 space-y-2">
                      <strong className="text-[#C8A14A] text-[10px] uppercase block">Voice Response:</strong>
                      <p>
                        "ঢাকা থেকে লন্ডন আগামী ১৫ আগস্টের সবচেয়ে কম ভাড়ার ফ্লাইট বিমান বাংলাদেশ BG201, ভাড়া BDT 78,500।"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Navigation Bar */}
              <div className="h-12 bg-black/80 border-t border-emerald-900/60 px-6 flex items-center justify-between text-[10px] text-emerald-300 z-20 shrink-0">
                <button
                  onClick={() => setSimulatorScreen('home')}
                  className={`flex flex-col items-center ${simulatorScreen === 'home' ? 'text-[#C8A14A]' : ''}`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => setSimulatorScreen('flights')}
                  className={`flex flex-col items-center ${simulatorScreen === 'flights' ? 'text-[#C8A14A]' : ''}`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Flights</span>
                </button>

                <button
                  onClick={() => setSimulatorScreen('visa')}
                  className={`flex flex-col items-center ${simulatorScreen === 'visa' ? 'text-[#C8A14A]' : ''}`}
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Visa</span>
                </button>

                <button
                  onClick={() => setSimulatorScreen('wallet')}
                  className={`flex flex-col items-center ${simulatorScreen === 'wallet' ? 'text-[#C8A14A]' : ''}`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: B2B AGENT PORTAL APP */}
      {activeTab === 'agent' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                B2B Sub-Agent & Agency Partner Application
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Mobile Agent Desk: Instant PNR Creation, Wallet Top-up & Branded PDF Tickets
              </h3>
            </div>

            <span className="bg-[#081C15] text-[#C8A14A] font-mono text-xs font-black px-4 py-2 rounded-2xl border border-emerald-800">
              Flutter Cross-Platform Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B]">
                <Zap className="w-5 h-5 text-[#C8A14A]" />
                <strong className="text-sm font-black text-[#081C15] font-serif">Instant PNR Creation</strong>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Issue tickets directly on Sabre, Amadeus, and Galileo GDS with custom agency markups and instant credit wallet deduction.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B]">
                <CreditCard className="w-5 h-5 text-[#C8A14A]" />
                <strong className="text-sm font-black text-[#081C15] font-serif">Instant Mobile Wallet Top-up</strong>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Recharge agency credit balance via bKash Merchant API, Nagad, and SSLCommerz with zero manual approval delays.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <div className="flex items-center space-x-2 text-[#0B5D3B]">
                <Share2 className="w-5 h-5 text-[#C8A14A]" />
                <strong className="text-sm font-black text-[#081C15] font-serif">WhatsApp PDF E-Ticket Sharing</strong>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Generate branded passenger e-tickets with agency logo and share directly to customer WhatsApp with 1-click.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CORPORATE TMC APP */}
      {activeTab === 'corporate' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Corporate Travel Management (TMC)
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Employee Travel Request, Manager 1-Click Approval & Expense Receipt Scanning
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40">
              <span className="font-serif font-black text-base text-[#C8A14A] block">
                Manager 1-Click Mobile Approvals
              </span>
              <p className="text-emerald-100 text-xs leading-relaxed">
                Corporate managers receive instant push alerts for employee travel requests, complete with policy compliance checks and cost center budget validation.
              </p>
              <div className="bg-white/10 p-3 rounded-xl font-mono text-[11px] text-emerald-200">
                [Policy Rule Enforced: Economy Class for Flights &lt; 6h • Approved in 12s]
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#ECECEC] space-y-4">
              <span className="font-serif font-black text-base text-[#081C15] block">
                OCR Receipt & Expense Scanner
              </span>
              <p className="text-[#666666] text-xs leading-relaxed">
                Employees capture receipts using the mobile camera. AI OCR automatically extracts vendor name, amount, date, and tax details into the corporate ERP.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STUDY ABROAD APP */}
      {activeTab === 'student' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Global Education & Student Mobility Portal
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              500+ University Course Finder, CAS Application Tracker & AI SOP Reviewer
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-bold text-[#0B5D3B] text-sm block">QS University Comparator</span>
              <p className="text-[#666666]">Search tuition fees, IELTS requirements, and scholarships across UK, USA, Canada, and Australia.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-bold text-[#0B5D3B] text-sm block">Live CAS & Visa File Tracker</span>
              <p className="text-[#666666]">Real-time push notifications for Offer Letter issuance, CAS approval, and embassy appointment slots.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-bold text-[#0B5D3B] text-sm block">AI Statement of Purpose Evaluator</span>
              <p className="text-[#666666]">Gemini AI reviews student SOP drafts against university admission standards in real-time.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CRAFT GUILD APP */}
      {activeTab === 'craft' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Rural Artisan & Heritage Crafts Guild Portal
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Low-RAM Offline-First App for Jamdani, Rajshahi Silk & Nakshi Kantha Master Artisans
            </h3>
          </div>

          <p className="text-[#666666] leading-relaxed">
            Designed specifically for rural weavers in Tangail, Rajshahi, and Sonargaon with Bengali voice prompt navigation, offline product photo capture, and direct mobile wallet payouts.
          </p>
        </div>
      )}

      {/* TAB 6: MULTILINGUAL VOICE AI (BN, EN, AR) */}
      {activeTab === 'voice-ai' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Multilingual Voice AI Sandbox
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Gemini 2.5 Flash Native Speech & Multilingual Search Engine
              </h3>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedLanguage('bn-BD')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedLanguage === 'bn-BD' ? 'bg-[#0B5D3B] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                বাংলা (Bengali)
              </button>

              <button
                onClick={() => setSelectedLanguage('en-US')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedLanguage === 'en-US' ? 'bg-[#0B5D3B] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                English
              </button>

              <button
                onClick={() => setSelectedLanguage('ar-SA')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedLanguage === 'ar-SA' ? 'bg-[#0B5D3B] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                العربية (Arabic)
              </button>
            </div>
          </div>

          {/* Voice Prompt Input Console */}
          <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C8A14A] uppercase flex items-center space-x-2">
                <Mic className="w-4 h-4 text-[#C8A14A]" />
                <span>Simulate Voice Command Stream ({selectedLanguage})</span>
              </span>

              {isSpeaking && (
                <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full animate-pulse flex items-center space-x-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Gemini TTS Speaking...</span>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={voiceQuery}
                onChange={(e) => setVoiceQuery(e.target.value)}
                placeholder={
                  selectedLanguage === 'bn-BD'
                    ? 'ভয়েস কমান্ড টাইপ করুন (যেমন: ঢাকা থেকে লন্ডন ফ্লাইট বুক করো)'
                    : selectedLanguage === 'ar-SA'
                    ? 'اكتب الأمر الصوتي (مثال: احجز رحلة من دكا إلى لندن)'
                    : 'Type or speak command (e.g., Book flight from Dhaka to London)'
                }
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#C8A14A]"
              />

              <button
                onClick={() => handleVoiceAssistantQuery()}
                disabled={isRecording}
                className="px-6 py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg flex items-center space-x-2 shrink-0"
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'animate-bounce text-rose-400' : 'text-[#C8A14A]'}`} />
                <span>{isRecording ? 'Listening...' : 'Send Voice Stream'}</span>
              </button>
            </div>

            {/* Quick Sample Voice Prompts */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] text-emerald-300 self-center">Try Sample Voice Prompts:</span>
              <button
                onClick={() =>
                  handleVoiceAssistantQuery('ঢাকা থেকে সৌদি আরবে উমরাহ প্যাকেজের দাম কত?')
                }
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] text-emerald-100"
              >
                "উমরাহ প্যাকেজ কত?"
              </button>
              <button
                onClick={() =>
                  handleVoiceAssistantQuery('আমার ইউকে স্টুডেন্ট ভিসার স্ট্যাটাস কি?')
                }
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] text-emerald-100"
              >
                "ইউকে ভিসা স্ট্যাটাস"
              </button>
            </div>

            {/* Output Voice Stream Box */}
            {voiceResponse && (
              <div className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-1 font-sans text-xs text-emerald-100">
                <span className="text-[#C8A14A] font-bold block text-[10px] uppercase">
                  Gemini Voice Output Response:
                </span>
                <p className="leading-relaxed text-sm text-white">{voiceResponse}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: PUSH NOTIFICATION & OFFLINE WALLET */}
      {activeTab === 'push-offline' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Real-Time Push Alerts & Offline Storage
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Simulated Push Notification Feed & Encrypted Device Wallet
              </h3>
            </div>

            <button
              onClick={() => handleTriggerPushNotification('flight')}
              className="px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#081C15] text-white font-extrabold rounded-xl shadow-md flex items-center space-x-2"
            >
              <Bell className="w-4 h-4 text-[#C8A14A]" />
              <span>+ Trigger Flight Status Push Alert</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Notification Feed */}
            <div className="space-y-3">
              <span className="font-extrabold text-[#081C15] text-sm block">Recent Push Notifications Log</span>
              <div className="space-y-3">
                {notificationLog.map((notif) => (
                  <div key={notif.id} className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
                    <div className="flex justify-between items-center text-xs font-black text-[#081C15]">
                      <span>{notif.title}</span>
                      <span className="text-[10px] text-[#666666] font-normal">{notif.time}</span>
                    </div>
                    <p className="text-[#666666] text-xs leading-relaxed">{notif.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline Wallet Specs */}
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-emerald-800">
              <span className="font-serif font-black text-base text-[#C8A14A] block">
                Offline Boarding Pass & Document Vault
              </span>
              <div className="space-y-2 text-emerald-100 text-xs">
                <div className="flex justify-between">
                  <span>Offline Pass Storage:</span>
                  <strong className="text-white font-mono">Encrypted WatermelonDB / SQLite</strong>
                </div>
                <div className="flex justify-between">
                  <span>PDF Ticket Rendering:</span>
                  <strong className="text-white font-mono">On-Device PDF Canvas Engine</strong>
                </div>
                <div className="flex justify-between">
                  <span>Network Re-Sync:</span>
                  <strong className="text-emerald-300 font-mono">Background Sync Worker</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: TECH STACK & APP STORE DEPLOYMENT */}
      {activeTab === 'tech-stack' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Mobile Tech Architecture & App Store Deployment Specs
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              iOS App Store, Google Play Store & Enterprise PWA Deployment Manifest
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-base text-[#081C15] font-serif block">iOS Deployment (App Store)</strong>
              <p className="text-[#666666] leading-relaxed">
                Swift 5.10 & SwiftUI architecture with Apple Wallet Boarding Pass integration, Face ID biometric lock, and App Store Privacy Nutrition Labels.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-base text-[#081C15] font-serif block">Android Deployment (Google Play)</strong>
              <p className="text-[#666666] leading-relaxed">
                Kotlin 2.0 & Jetpack Compose with Google Pay integration, BiometricPrompt API, and Play Asset Delivery for fast app launch under 15MB.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-base text-[#081C15] font-serif block">Progressive Web App (PWA)</strong>
              <p className="text-[#666666] leading-relaxed">
                Service Worker caching with Web App Manifest, offline fallbacks, and 1-click web install prompt across desktop and mobile Chrome/Safari.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
