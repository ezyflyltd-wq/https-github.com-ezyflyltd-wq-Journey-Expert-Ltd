import React, { useState, useRef, useEffect } from 'react';
import {
  Plane,
  Building2,
  Compass,
  FileCheck2,
  GraduationCap,
  Sparkles,
  User,
  Briefcase,
  ShieldCheck,
  Code2,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  Menu,
  X,
  Building,
  Award,
  ShoppingBag,
  Grid,
  Search,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../firebase/authContext';
import { PortalType, MainViewModule } from '../types';
import { COMPANY_CONFIG, OfficialLogo } from '../companyConfig';
import {
  ECOSYSTEM_PORTALS,
  SYSTEM_PORTALS,
  PORTAL_CATEGORIES,
  EcosystemPortalItem,
} from '../config/navigationConfig';

interface HeaderProps {
  activePortal?: PortalType;
  currentPortal?: PortalType;
  onPortalChange: (portal: PortalType) => void;
  activeModule: MainViewModule;
  onModuleChange: (module: MainViewModule) => void;
  onOpenAIModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePortal = 'main',
  currentPortal,
  onPortalChange,
  activeModule,
  onModuleChange,
  onOpenAIModal,
}) => {
  const { user, userProfile, signInWithGoogle, signOutUser, loading: authLoading } = useAuth();
  const portal = currentPortal || activePortal;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isPortalSwitcherOpen, setIsPortalSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Portals');

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuButtonRef = useRef<HTMLButtonElement>(null);
  const portalSwitcherRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        megaMenuButtonRef.current &&
        !megaMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
      if (
        portalSwitcherRef.current &&
        !portalSwitcherRef.current.contains(event.target as Node)
      ) {
        setIsPortalSwitcherOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsPortalSwitcherOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectPortalItem = (item: EcosystemPortalItem) => {
    onPortalChange('main');
    onModuleChange(item.module);
    setIsMegaMenuOpen(false);
    setMobileMenuOpen(false);
    // Update hash for deep linking
    if (typeof window !== 'undefined') {

    }
  };

  const filteredPortals = ECOSYSTEM_PORTALS.filter((item) => {
    const matchesSearch =
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Portals' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#ECECEC] text-[#111111] transition-all duration-300 shadow-xs w-full max-w-full overflow-x-hidden">
      {/* Top Utility Luxury Announcement Bar */}
      <div className="bg-[#093F31] py-1.5 px-3 sm:px-4 text-xs text-emerald-100/90 border-b border-[#0B6B53] w-full overflow-hidden">
        <div className="max-w-[1400px] w-[calc(100%-24px)] sm:w-[calc(100%-32px)] mx-auto flex flex-wrap justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <span className="inline-flex items-center text-[#C7A44D] font-medium tracking-wide truncate text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse text-[#C7A44D] shrink-0" />
              {COMPANY_CONFIG.tagline}
            </span>
            <span className="hidden md:inline text-emerald-800">|</span>
            <span className="hidden md:flex items-center text-emerald-100/80 truncate text-[11px] sm:text-xs">
              <Phone className="w-3 h-3 mr-1 text-[#C7A44D] shrink-0" />
              24/7: {COMPANY_CONFIG.phone.formattedPrimary}
            </span>
            <span className="hidden lg:flex items-center text-emerald-100/80 truncate text-[11px] sm:text-xs">
              <Mail className="w-3 h-3 mr-1 text-[#C7A44D] shrink-0" />
              {COMPANY_CONFIG.email.primary}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-xs shrink-0">
            {/* Currency Selector */}
            <div className="flex items-center space-x-1 bg-[#0B6B53]/50 px-2 py-0.5 rounded-full border border-[#C7A44D]/30">
              <span className="text-emerald-300 text-[10px] sm:text-[11px]">Cur:</span>
              <button
                onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
                className="font-bold text-[#E6CA65] hover:text-amber-200 transition-colors text-[11px] sm:text-xs cursor-pointer"
                title="Toggle Currency"
              >
                {currency} ({currency === 'BDT' ? '৳' : '$'})
              </button>
            </div>

            {/* Language Badge */}
            <div className="flex items-center space-x-1 text-emerald-200/80 text-[11px] sm:text-xs">
              <Globe className="w-3 h-3 text-[#C7A44D] shrink-0" />
              <span className="text-[#C7A44D] font-semibold">EN</span>
              <span className="text-emerald-700">/</span>
              <span className="hover:text-white cursor-pointer transition-colors">BN</span>
            </div>

            {/* Accreditation Badge */}
            {COMPANY_CONFIG.accreditations && COMPANY_CONFIG.accreditations.length > 0 && (
              <span className="hidden xl:inline bg-[#C7A44D]/20 text-[#C7A44D] px-2 py-0.5 rounded-full text-[10px] font-semibold border border-[#C7A44D]/40">
                {COMPANY_CONFIG.accreditations[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-[1400px] w-[calc(100%-24px)] sm:w-[calc(100%-32px)] mx-auto py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        {/* Brand Logo & Name */}
        <div
          className="cursor-pointer group shrink-0 min-w-0"
          onClick={() => {
            onPortalChange('main');
            onModuleChange('home');

          }}
        >
          <OfficialLogo />
        </div>

        {/* Desktop Main Navigation Links (2XL: Full 8 Modules + Mega Portals) */}
        <nav className="hidden 2xl:flex items-center space-x-1 bg-[#F8FAF9] p-1.5 rounded-2xl border border-[#ECECEC] shadow-inner shrink-0">
          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('home');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'home'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Home (3D)
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('flights');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'flights'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Flights
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('hotels');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'hotels'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Hotels
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('packages');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'packages'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Tours
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('visa');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'visa'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Visa
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('study-abroad');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'study-abroad'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Study Abroad
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('hajj-umrah');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'hajj-umrah'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Hajj & Umrah
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('business-units');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              portal === 'main' && activeModule === 'business-units'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Building className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            About JEL
          </button>

          {/* Dedicated Ecosystem Portals Mega Menu Trigger */}
          <button
            ref={megaMenuButtonRef}
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            aria-expanded={isMegaMenuOpen}
            aria-haspopup="true"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-200 shadow-xs border cursor-pointer ${
              isMegaMenuOpen
                ? 'bg-[#093F31] text-white border-[#C7A44D]'
                : 'bg-gradient-to-r from-emerald-50 to-amber-50 text-[#093F31] border-[#C7A44D]/50 hover:bg-emerald-100/70'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-[#C7A44D]" />
            <span>Portals</span>
            <span className="bg-[#C7A44D] text-[#093F31] text-[10px] font-black px-1.5 py-0.2 rounded-md ml-0.5">
              23
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#C7A44D] transition-transform duration-200 ${
                isMegaMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </nav>

        {/* Laptop Main Navigation Links (XL to 2XL: Compact Core Modules) */}
        <nav className="hidden xl:flex 2xl:hidden items-center space-x-1 bg-[#F8FAF9] p-1 rounded-2xl border border-[#ECECEC] shadow-inner shrink-0">
          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('home');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              portal === 'main' && activeModule === 'home'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Home
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('flights');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              portal === 'main' && activeModule === 'flights'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Flights
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('hotels');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              portal === 'main' && activeModule === 'hotels'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Hotels
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('visa');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              portal === 'main' && activeModule === 'visa'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Visa
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('study-abroad');
              setIsMegaMenuOpen(false);

            }}
            className={`flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              portal === 'main' && activeModule === 'study-abroad'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-[#C7A44D]" />
            Study Abroad
          </button>

          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-50 to-amber-50 text-[#093F31] border border-[#C7A44D]/50 hover:bg-emerald-100/70"
          >
            <Grid className="w-3.5 h-3.5 text-[#C7A44D]" />
            <span>Portals (23)</span>
          </button>
        </nav>

        {/* Action Buttons: Start Your Journey, AI Assistant & Portal Switcher */}
        <div className="hidden lg:flex items-center space-x-2 shrink-0">
          {/* Start Your Journey CTA */}
          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('flights');

            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#C8A14A] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C8A14A] text-[#081C15] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            <span className="hidden xl:inline">Start Your Journey</span>
            <span className="xl:hidden">Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#081C15]" />
          </button>

          {/* AI Travel Assistant Button */}
          <button
            onClick={onOpenAIModal}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#093F31] via-[#0B6B53] to-[#093F31] text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 border border-[#C7A44D]/40 shrink-0 cursor-pointer"
          >
            <Sparkles
              className="w-3.5 h-3.5 text-[#C7A44D] animate-spin"
              style={{ animationDuration: '4s' }}
            />
            <span>Ask JEL AI</span>
          </button>

          {/* Ecosystem Portals Button (for viewports between lg and xl) */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center space-x-1 px-2.5 py-2 bg-emerald-50 text-[#093F31] border border-[#C7A44D]/40 rounded-xl text-xs font-bold cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-[#C7A44D]" />
              <span>Portals</span>
            </button>
          </div>

          {/* System Portal Switcher Dropdown */}
          <div className="relative" ref={portalSwitcherRef}>
            <button
              type="button"
              aria-label="Open system portals menu"
              aria-expanded={isPortalSwitcherOpen}
              onClick={() => setIsPortalSwitcherOpen(!isPortalSwitcherOpen)}
              className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-bold text-[#111111] shadow-xs transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#0B6B53]" />
              <span className="hidden 2xl:inline">
                {portal === 'main' && 'System Portals'}
                {portal === 'customer' && 'Customer Portal'}
                {portal === 'agent' && 'B2B Agent Portal'}
                {portal === 'admin' && 'Admin Control'}
                {portal === 'architecture' && 'Tech Architecture'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#666666] transition-transform duration-200 ${
                  isPortalSwitcherOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isPortalSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-[#ECECEC] rounded-2xl shadow-2xl p-2.5 z-[70] animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="px-3 py-1.5 text-[10px] font-black uppercase text-[#666666] tracking-widest border-b border-[#ECECEC] mb-1">
                  Enterprise Platform Portals
                </p>

                {SYSTEM_PORTALS.map((sys) => {
                  const SysIcon = sys.icon;
                  const isSelected = portal === sys.id;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => {
                        onPortalChange(sys.id);
                        setIsPortalSwitcherOpen(false);

                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F8FAF9] text-[#093F31] font-bold border border-[#0B6B53]/20 shadow-xs'
                          : 'text-[#111111] hover:bg-[#F8FAF9]'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${sys.colorClass}`}
                      >
                        <SysIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[#111111] text-xs truncate">{sys.title}</div>
                        <div className="text-[10px] text-[#666666] leading-tight truncate">
                          {sys.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Firebase Authentication / User Profile Button */}
          {user ? (
            <button
              onClick={() => {
                onPortalChange('customer');

              }}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 rounded-xl text-xs font-bold text-[#093F31] shadow-xs transition-all cursor-pointer"
              title="Open Customer Dashboard"
            >
              <div className="w-6 h-6 rounded-full bg-[#093F31] text-[#C7A44D] flex items-center justify-center text-[10px] font-black shrink-0">
                {(userProfile?.displayName || user.displayName || 'U').substring(0, 1).toUpperCase()}
              </div>
              <span className="max-w-[80px] truncate hidden 2xl:inline">
                {userProfile?.displayName || user.displayName?.split(' ')[0] || 'Account'}
              </span>
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              disabled={authLoading}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#093F31] hover:bg-[#0B6B53] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer border border-[#C7A44D]/30 shrink-0"
              title="Sign In with Google"
            >
              <LogIn className="w-3.5 h-3.5 text-[#C7A44D]" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile menu and AI button */}
        <div className="lg:hidden flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenAIModal}
            className="px-3 py-2 bg-[#093F31] text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm border border-[#C7A44D]/30 cursor-pointer"
            title="Open AI Travel Assistant"
          >
            <Sparkles className="w-4 h-4 text-[#C7A44D]" />
            <span className="text-[11px] font-bold hidden sm:inline">Ask AI</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#F8FAF9] border border-[#ECECEC] text-[#111111] rounded-xl hover:bg-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP ECOSYSTEM PORTALS MEGA-DROPDOWN MENU (23 PORTALS) */}
      {/* ========================================================================= */}
      {isMegaMenuOpen && (
        <>
          {/* Backdrop Overlay to capture clicks outside and prevent background scroll collisions */}
          <div
            className="fixed inset-0 top-[90px] bg-black/20 backdrop-blur-[2px] z-40 transition-opacity animate-in fade-in duration-150"
            onClick={() => setIsMegaMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 w-full bg-white/98 backdrop-blur-2xl border-b border-[#ECECEC] shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-100px)] overflow-y-auto overscroll-contain custom-scrollbar"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Mega Menu Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#ECECEC]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0B6B53]/10 text-[#0B6B53] text-[11px] font-black uppercase tracking-wider border border-[#0B6B53]/20">
                    JEL Enterprise Grid
                  </span>
                  <h3 className="text-lg font-black text-[#093F31] font-serif">
                    Ecosystem Portals Directory
                  </h3>
                  <span className="bg-[#C7A44D] text-[#093F31] text-xs font-extrabold px-2 py-0.5 rounded-full">
                    23 Active Portals
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-1 font-medium">
                  Direct access to all 23 integrated travel technology, global mobility, AI, and enterprise operations modules.
                </p>
              </div>

              {/* Search Box in Mega Menu */}
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                  <label htmlFor="desktop-portal-search" className="sr-only">Search ecosystem portals</label>
                  <input
                    id="desktop-portal-search"
                    name="desktopPortalSearch"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 23 portals..."
                    className="w-full pl-9 pr-4 py-2 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#0B6B53]/30 focus:border-[#0B6B53]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear portal search"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#666666] hover:text-[#111111]"
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  aria-label="Close portals menu"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="p-2 text-[#666666] hover:text-[#111111] hover:bg-[#F8FAF9] rounded-xl border border-[#ECECEC] transition-colors shrink-0"
                  title="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 py-3 overflow-x-auto text-xs font-bold scrollbar-none">
              <span className="text-[11px] text-[#666666] font-semibold uppercase tracking-wider mr-1 shrink-0 flex items-center">
                <SlidersHorizontal className="w-3 h-3 mr-1 text-[#0B6B53]" />
                Filter:
              </span>
              {PORTAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-all duration-150 ${
                    selectedCategory === cat
                      ? 'bg-[#093F31] text-white shadow-xs'
                      : 'bg-[#F8FAF9] text-[#666666] hover:text-[#093F31] hover:bg-white border border-[#ECECEC]'
                  }`}
                >
                  {cat}
                  {cat === 'All Portals' && ` (${ECOSYSTEM_PORTALS.length})`}
                </button>
              ))}
            </div>

            {/* 23 Portals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-3 pb-4">
              {filteredPortals.map((item) => {
                const ItemIcon = item.icon;
                const isSelected = portal === 'main' && activeModule === item.module;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPortalItem(item)}
                    className={`group text-left p-3.5 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#093F31]/5 border-[#0B6B53] ring-2 ring-[#0B6B53]/20 shadow-sm'
                        : 'bg-white border-[#ECECEC] hover:border-[#0B6B53]/40 hover:bg-[#F8FAF9] hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                              isSelected
                                ? 'bg-[#093F31] text-[#C7A44D] shadow-sm'
                                : 'bg-[#F8FAF9] text-[#0B6B53] border border-[#ECECEC]'
                            }`}
                          >
                            <ItemIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-[#666666] uppercase tracking-wider block">
                              Portal #{item.id}
                            </span>
                            <h4
                              className={`text-xs font-bold tracking-tight leading-snug ${
                                isSelected ? 'text-[#093F31]' : 'text-[#111111]'
                              }`}
                            >
                              {item.label}
                            </h4>
                          </div>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${
                              item.badgeColor || 'bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#666666] line-clamp-2 leading-relaxed font-medium pl-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#ECECEC]/60 flex items-center justify-between text-[10px] text-[#0B6B53] font-bold">
                      <span className="text-[#666666] font-medium">{item.category}</span>
                      <span className="inline-flex items-center group-hover:translate-x-1 transition-transform">
                        Launch Portal <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredPortals.length === 0 && (
              <div className="text-center py-12 bg-[#F8FAF9] rounded-2xl border border-[#ECECEC] my-4">
                <Search className="w-8 h-8 text-[#666666] mx-auto mb-2 opacity-50" />
                <p className="text-sm font-bold text-[#111111]">No ecosystem portal found matching "{searchQuery}"</p>
                <p className="text-xs text-[#666666] mt-1">Try searching by keyword like "Flight", "Visa", "AI", or "CRM".</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Portals');
                  }}
                  className="mt-3 px-4 py-1.5 bg-[#093F31] text-white text-xs font-bold rounded-xl"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Bottom Quick Switch Bar */}
            <div className="mt-4 pt-4 border-t border-[#ECECEC] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-[#666666]">
                <CheckCircle2 className="w-4 h-4 text-[#0B6B53]" />
                <span>All 23 portals are integrated with unified state & backend models.</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    onPortalChange('customer');
                    setIsMegaMenuOpen(false);
                  }}
                  className="text-xs font-bold text-[#0B6B53] hover:underline flex items-center"
                >
                  <User className="w-3.5 h-3.5 mr-1" /> Customer Dashboard
                </button>
                <span className="text-[#ECECEC]">|</span>
                <button
                  onClick={() => {
                    onPortalChange('agent');
                    setIsMegaMenuOpen(false);
                  }}
                  className="text-xs font-bold text-[#093F31] hover:underline flex items-center"
                >
                  <Briefcase className="w-3.5 h-3.5 mr-1" /> B2B Agent Portal
                </button>
                <span className="text-[#ECECEC]">|</span>
                <button
                  onClick={() => {
                    onPortalChange('admin');
                    setIsMegaMenuOpen(false);
                  }}
                  className="text-xs font-bold text-[#C7A44D] hover:underline flex items-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin Control
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}

      {/* ========================================================================= */}
      {/* MOBILE FULL DRAWER NAVIGATION */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#ECECEC] px-4 py-4 space-y-4 animate-in fade-in duration-200 max-h-[calc(100dvh-100px)] overflow-y-auto overscroll-contain custom-scrollbar">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
            <label htmlFor="mobile-portal-search" className="sr-only">Search ecosystem portals</label>
            <input
              id="mobile-portal-search"
              name="mobilePortalSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 23 ecosystem portals..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-medium text-[#111111]"
            />
          </div>

          {/* System Portals Switcher */}
          <div>
            <p className="text-[10px] text-[#666666] font-black uppercase tracking-wider mb-2">
              Select Operating Portal:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SYSTEM_PORTALS.map((sys) => {
                const SysIcon = sys.icon;
                const isSelected = portal === sys.id;
                return (
                  <button
                    key={sys.id}
                    onClick={() => {
                      onPortalChange(sys.id);
                      setMobileMenuOpen(false);
                      if (typeof window !== 'undefined') window.location.hash = sys.id;
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center space-x-2 border transition-all ${
                      isSelected
                        ? 'bg-[#093F31] text-white border-[#093F31]'
                        : 'bg-[#F8FAF9] text-[#111111] border-[#ECECEC]'
                    }`}
                  >
                    <SysIcon className="w-4 h-4 text-[#C7A44D] shrink-0" />
                    <span className="truncate">{sys.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All 23 Ecosystem Portals List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-[#666666] font-black uppercase tracking-wider">
                Ecosystem Portals ({filteredPortals.length}):
              </p>
              <span className="text-[10px] bg-[#C7A44D]/20 text-[#093F31] font-bold px-2 py-0.5 rounded-full">
                23 Portals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
              {filteredPortals.map((item) => {
                const ItemIcon = item.icon;
                const isSelected = portal === 'main' && activeModule === item.module;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPortalItem(item)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-[#0B6B53] text-white border-[#0B6B53]'
                        : 'bg-[#F8FAF9] text-[#111111] hover:bg-white border-[#ECECEC]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] opacity-70 w-4">#{item.id}</span>
                      <ItemIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#0B6B53]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md shrink-0 ml-1 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
