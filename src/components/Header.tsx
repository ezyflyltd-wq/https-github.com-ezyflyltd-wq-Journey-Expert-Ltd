import React, { useState } from 'react';
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
} from 'lucide-react';
import { PortalType, MainViewModule } from '../types';

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
  const portal = currentPortal || activePortal;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#ECECEC] text-[#111111] transition-all duration-300">
      {/* Top Utility Luxury Announcement Bar */}
      <div className="bg-[#093F31] py-1.5 px-4 text-xs text-emerald-100/90 border-b border-[#0B6B53]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-[#C7A44D] font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse text-[#C7A44D]" />
              Bangladesh's Premier AI-Powered OTA & Global Mobility Ecosystem
            </span>
            <span className="hidden md:inline text-emerald-800">|</span>
            <span className="hidden md:flex items-center text-emerald-100/80">
              <Phone className="w-3 h-3 mr-1.5 text-[#C7A44D]" />
              24/7 Concierge: +880 9612-JEL-FLY (+880 9612-535359)
            </span>
            <span className="hidden lg:flex items-center text-emerald-100/80">
              <Mail className="w-3 h-3 mr-1.5 text-[#C7A44D]" />
              support@journeyexpert.com.bd
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {/* Currency Selector */}
            <div className="flex items-center space-x-1.5 bg-[#0B6B53]/50 px-2.5 py-0.5 rounded-full border border-[#C7A44D]/30">
              <span className="text-emerald-200/70 text-[11px]">Currency:</span>
              <button
                onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
                className="font-bold text-[#C7A44D] hover:text-amber-300 transition-colors"
              >
                {currency} ({currency === 'BDT' ? '৳' : '$'})
              </button>
            </div>

            {/* Language Badge */}
            <div className="flex items-center space-x-1 text-emerald-200/80">
              <Globe className="w-3 h-3 text-[#C7A44D]" />
              <span className="text-[#C7A44D] font-semibold">EN</span>
              <span className="text-emerald-700">/</span>
              <span className="hover:text-white cursor-pointer transition-colors">BN</span>
            </div>

            {/* Accreditation Badge */}
            <span className="hidden sm:inline bg-[#C7A44D]/20 text-[#C7A44D] px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-[#C7A44D]/40">
              IATA Accredited #91280
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center space-x-3.5 cursor-pointer group"
          onClick={() => {
            onPortalChange('main');
            onModuleChange('flights');
          }}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B6B53] to-[#093F31] p-0.5 shadow-md group-hover:shadow-lg transition-all duration-300">
            <div className="w-full h-full bg-[#093F31] rounded-[10px] flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#C7A44D] transform -rotate-45 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black tracking-tight text-[#093F31] font-serif">
                JOURNEY EXPERT
              </span>
              <span className="bg-[#C7A44D] text-[#093F31] text-[10px] font-black px-1.5 py-0.5 rounded tracking-widest shadow-xs">
                LTD.
              </span>
            </div>
            <p className="text-[10px] text-[#0B6B53] font-semibold tracking-wider hidden sm:block">
              AI OTA • GLOBAL MOBILITY • STUDY ABROAD
            </p>
          </div>
        </div>

        {/* Desktop Main Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[#F8FAF9] p-1.5 rounded-2xl border border-[#ECECEC] shadow-inner">
          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('flights');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'flights'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Plane className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Flights
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('hotels');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'hotels'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Building2 className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Hotels
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('packages');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'packages'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Compass className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Packages
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('visa');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'visa'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Visa
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('study-abroad');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'study-abroad'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Study Abroad
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('business-units');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'business-units'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Building className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Business Units
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('craft-bangla');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'craft-bangla'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Craft Bangla
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('corporate');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'corporate'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            Corporate
          </button>

          <button
            onClick={() => {
              onPortalChange('main');
              onModuleChange('ai-engine');
            }}
            className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              portal === 'main' && activeModule === 'ai-engine'
                ? 'bg-[#0B6B53] text-white shadow-md'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-white'
            }`}
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-[#C7A44D]" />
            AI Engine
          </button>
        </nav>

        {/* Action Buttons: AI Assistant & Portal Switcher */}
        <div className="hidden md:flex items-center space-x-3">
          {/* AI Travel Assistant Button */}
          <button
            onClick={onOpenAIModal}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#093F31] via-[#0B6B53] to-[#093F31] text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 border border-[#C7A44D]/40"
          >
            <Sparkles className="w-4 h-4 text-[#C7A44D] animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI Assistant</span>
          </button>

          {/* Portal Switcher Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-[#F8FAF9] border border-[#ECECEC] rounded-xl text-xs font-bold text-[#111111] shadow-xs transition-all">
              <User className="w-4 h-4 text-[#0B6B53]" />
              <span>
                {portal === 'main' && 'Ecosystem Portals'}
                {portal === 'customer' && 'Customer Portal'}
                {portal === 'agent' && 'B2B Agent Portal'}
                {portal === 'admin' && 'Admin Control'}
                {portal === 'architecture' && 'Tech Architecture'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#666666] group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#ECECEC] rounded-2xl shadow-2xl p-2.5 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="px-3 py-1.5 text-[10px] font-black uppercase text-[#666666] tracking-widest border-b border-[#ECECEC] mb-1">
                Select Platform Portal
              </p>

              <button
                onClick={() => onPortalChange('main')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-3 transition-all ${
                  portal === 'main'
                    ? 'bg-[#F8FAF9] text-[#093F31] font-bold border border-[#0B6B53]/20'
                    : 'text-[#111111] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-[#0B6B53]/10 flex items-center justify-center text-[#0B6B53]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#111111]">Main OTA Platform</div>
                  <div className="text-[10px] text-[#666666]">Public flight, hotel & visa search</div>
                </div>
              </button>

              <button
                onClick={() => onPortalChange('customer')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-3 transition-all ${
                  portal === 'customer'
                    ? 'bg-[#F8FAF9] text-[#093F31] font-bold border border-[#0B6B53]/20'
                    : 'text-[#111111] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-[#C7A44D]/10 flex items-center justify-center text-[#C7A44D]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#111111]">Customer Portal</div>
                  <div className="text-[10px] text-[#666666]">Bookings, e-tickets & JEL wallet</div>
                </div>
              </button>

              <button
                onClick={() => onPortalChange('agent')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-3 transition-all ${
                  portal === 'agent'
                    ? 'bg-[#F8FAF9] text-[#093F31] font-bold border border-[#0B6B53]/20'
                    : 'text-[#111111] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-[#093F31]/10 flex items-center justify-center text-[#093F31]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#111111]">B2B Agent Portal</div>
                  <div className="text-[10px] text-[#666666]">GDS booking & credit line</div>
                </div>
              </button>

              <button
                onClick={() => onPortalChange('admin')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-3 transition-all ${
                  portal === 'admin'
                    ? 'bg-[#F8FAF9] text-[#093F31] font-bold border border-[#0B6B53]/20'
                    : 'text-[#111111] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-[#0B6B53]/10 flex items-center justify-center text-[#0B6B53]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#111111]">Admin Dashboard</div>
                  <div className="text-[10px] text-[#666666]">Analytics, CRM & GDS config</div>
                </div>
              </button>

              <div className="my-1 border-t border-[#ECECEC]" />

              <button
                onClick={() => onPortalChange('architecture')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-3 transition-all ${
                  portal === 'architecture'
                    ? 'bg-[#F8FAF9] text-[#093F31] font-bold border border-[#0B6B53]/20'
                    : 'text-[#111111] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#111111]">Enterprise Specs</div>
                  <div className="text-[10px] text-[#666666]">DB schema, API & GDS pipeline</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={onOpenAIModal}
            className="px-3 py-2 bg-[#093F31] text-white rounded-xl text-xs font-bold flex items-center space-x-1"
          >
            <Sparkles className="w-4 h-4 text-[#C7A44D]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#F8FAF9] border border-[#ECECEC] text-[#111111] rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#ECECEC] px-4 py-4 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('flights');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <Plane className="w-4 h-4 mr-2 text-[#0B6B53]" /> Flights
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('hotels');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <Building2 className="w-4 h-4 mr-2 text-[#C7A44D]" /> Hotels
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('packages');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <Compass className="w-4 h-4 mr-2 text-[#0B6B53]" /> Packages
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('visa');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <FileCheck2 className="w-4 h-4 mr-2 text-[#0B6B53]" /> Visa
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('study-abroad');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <GraduationCap className="w-4 h-4 mr-2 text-[#C7A44D]" /> Study Abroad
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('business-units');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <Building className="w-4 h-4 mr-2 text-[#093F31]" /> Business Units
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('craft-bangla');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <ShoppingBag className="w-4 h-4 mr-2 text-[#C7A44D]" /> Craft Bangla
            </button>
            <button
              onClick={() => {
                onPortalChange('main');
                onModuleChange('corporate');
                setMobileMenuOpen(false);
              }}
              className="flex items-center p-2.5 rounded-xl bg-[#F8FAF9] text-[#111111] text-xs font-bold border border-[#ECECEC]"
            >
              <Briefcase className="w-4 h-4 mr-2 text-[#0B6B53]" /> Corporate Travel
            </button>
          </div>

          <div className="pt-3 border-t border-[#ECECEC]">
            <p className="text-[11px] text-[#666666] font-bold uppercase tracking-wider mb-2">Switch Ecosystem Portal:</p>
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => {
                  onPortalChange('customer');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#F8FAF9] text-xs text-[#111111] font-bold text-left flex items-center justify-between border border-[#ECECEC]"
              >
                <span>Customer Portal</span>
                <User className="w-4 h-4 text-[#C7A44D]" />
              </button>
              <button
                onClick={() => {
                  onPortalChange('agent');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#F8FAF9] text-xs text-[#111111] font-bold text-left flex items-center justify-between border border-[#ECECEC]"
              >
                <span>B2B Agent Portal</span>
                <Briefcase className="w-4 h-4 text-[#093F31]" />
              </button>
              <button
                onClick={() => {
                  onPortalChange('admin');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#F8FAF9] text-xs text-[#111111] font-bold text-left flex items-center justify-between border border-[#ECECEC]"
              >
                <span>Admin Dashboard</span>
                <ShieldCheck className="w-4 h-4 text-[#0B6B53]" />
              </button>
              <button
                onClick={() => {
                  onPortalChange('architecture');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#F8FAF9] text-xs text-[#111111] font-bold text-left flex items-center justify-between border border-[#ECECEC]"
              >
                <span>Enterprise Architecture Specs</span>
                <Code2 className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
