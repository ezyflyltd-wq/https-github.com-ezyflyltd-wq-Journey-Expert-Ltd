import React from 'react';
import {
  Plane,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Globe,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { PortalType, MainViewModule } from '../types';
import { COMPANY_CONFIG, OfficialLogo } from '../companyConfig';

interface FooterProps {
  onPortalChange: (portal: PortalType) => void;
  onModuleChange: (module: MainViewModule) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPortalChange, onModuleChange }) => {
  return (
    <footer className="[content-visibility:auto] [contain-intrinsic-size:0_900px] bg-[#F8FAF9] text-[#666666] border-t border-[#ECECEC] text-sm font-sans">
      {/* Top Value Proposition Strip */}
      <div className="bg-white border-b border-[#ECECEC] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-[#0B6B53] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[#093F31] font-extrabold text-sm font-serif">Multi-GDS Fare Engine</h2>
              <p className="text-xs text-[#666666] mt-1 font-medium leading-relaxed">
                Direct connections to Sabre, Amadeus & Travelport Galileo for lowest fare search.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-[#C7A44D] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[#093F31] font-extrabold text-sm font-serif">99.2% Visa Success Rate</h2>
              <p className="text-xs text-[#666666] mt-1 font-medium leading-relaxed">
                Expert visa documentation team for UK, USA, Canada, Schengen & Saudi Arabia.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-[#0B6B53] shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[#093F31] font-extrabold text-sm font-serif">JEL Study Abroad Portal</h2>
              <p className="text-xs text-[#666666] mt-1 font-medium leading-relaxed">
                500+ Top partner universities in UK, Canada, Australia, USA & Malaysia.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl text-[#C7A44D] shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[#093F31] font-extrabold text-sm font-serif">Instant Local Payments</h2>
              <p className="text-xs text-[#666666] mt-1 font-medium leading-relaxed">
                bKash, Nagad, SSLCommerz, Bank Transfers & International Credit Cards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Corporate Overview */}
        <div className="lg:col-span-2 space-y-4">
          <OfficialLogo />

          <p className="text-xs text-[#666666] leading-relaxed font-medium">
            {COMPANY_CONFIG.description}
          </p>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-start space-x-2 text-[#111111]">
              <MapPin className="w-4 h-4 text-[#0B5D3B] shrink-0 mt-0.5" />
              <span>
                <strong>Headquarters:</strong> {COMPANY_CONFIG.address.fullAddress}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[#111111]">
              <Phone className="w-4 h-4 text-[#0B5D3B] shrink-0" />
              <span>
                <strong>Phone:</strong> {COMPANY_CONFIG.phone.primary} ({COMPANY_CONFIG.phone.international}) | Office: {COMPANY_CONFIG.phone.office}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[#111111]">
              <Mail className="w-4 h-4 text-[#0B5D3B] shrink-0" />
              <span>
                <strong>Email:</strong> {COMPANY_CONFIG.email.primary} | {COMPANY_CONFIG.email.secondary}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[#111111]">
              <Globe className="w-4 h-4 text-[#0B5D3B] shrink-0" />
              <span>
                <strong>Official Website:</strong>{' '}
                <a
                  href={COMPANY_CONFIG.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B5D3B] hover:underline font-bold"
                >
                  {COMPANY_CONFIG.domain}
                </a>
              </span>
            </div>
          </div>

          {COMPANY_CONFIG.accreditations && COMPANY_CONFIG.accreditations.length > 0 && (
            <div className="pt-2 flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-[10px] uppercase font-bold text-[#666666] tracking-wider">Accreditations:</span>
              {COMPANY_CONFIG.accreditations.map((acc, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-[#ECECEC] text-[#0B5D3B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs"
                >
                  {acc}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Travel Links */}
        <div>
          <h2 className="text-[#093F31] font-black text-sm mb-4 font-serif border-b border-[#ECECEC] pb-2">
            OTA Modules
          </h2>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('flights'); }} className="hover:text-[#0B6B53] transition-colors">
                Flight Booking (Sabre / Amadeus)
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('hotels'); }} className="hover:text-[#0B6B53] transition-colors">
                Hotel Reservations
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('packages'); }} className="hover:text-[#0B6B53] transition-colors">
                Executive Umrah Packages
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('packages'); }} className="hover:text-[#0B6B53] transition-colors">
                Medical Tourism Packages
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('visa'); }} className="hover:text-[#0B6B53] transition-colors">
                Visa Requirement Portal
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('visa'); }} className="hover:text-[#0B6B53] transition-colors">
                Online Visa Application Tracking
              </button>
            </li>
          </ul>
        </div>

        {/* Global Mobility & Study Abroad */}
        <div>
          <h2 className="text-[#093F31] font-black text-sm mb-4 font-serif border-b border-[#ECECEC] pb-2">
            JEL Study Abroad
          </h2>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('study-abroad'); }} className="hover:text-[#0B6B53] transition-colors">
                UK University Search
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('study-abroad'); }} className="hover:text-[#0B6B53] transition-colors">
                Canada Student Visa Guide
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('study-abroad'); }} className="hover:text-[#0B6B53] transition-colors">
                Australia Course Finder
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('study-abroad'); }} className="hover:text-[#0B6B53] transition-colors">
                Scholarship Matching Engine
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('study-abroad'); }} className="hover:text-[#0B6B53] transition-colors">
                Profile Assessment Tool
              </button>
            </li>
          </ul>
        </div>

        {/* Business Units & Portals */}
        <div>
          <h2 className="text-[#093F31] font-black text-sm mb-4 font-serif border-b border-[#ECECEC] pb-2">
            Ecosystem & Enterprise
          </h2>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('business-units'); }} className="hover:text-[#0B6B53] transition-colors">
                JEL Meet & Greet Airport VIP
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('business-units'); }} className="hover:text-[#0B6B53] transition-colors">
                JEL Compliance & Advisory
              </button>
            </li>
            <li>
              <button onClick={() => { onPortalChange('main'); onModuleChange('business-units'); }} className="hover:text-[#0B6B53] transition-colors">
                Craft Bangla Marketplace
              </button>
            </li>
            <li>
              <button onClick={() => onPortalChange('customer')} className="hover:text-[#0B6B53] transition-colors font-extrabold text-[#0B6B53]">
                Customer Portal Login
              </button>
            </li>
            <li>
              <button onClick={() => onPortalChange('agent')} className="hover:text-[#0B6B53] transition-colors font-extrabold text-[#093F31]">
                B2B Agent Portal
              </button>
            </li>
            <li>
              <button onClick={() => onPortalChange('architecture')} className="hover:text-[#0B6B53] transition-colors font-extrabold text-[#6B5618] flex items-center">
                <span>Database Schema & API Specs</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </li>
          </ul>
        </div>
        {/* Crawlable public SEO routes */}
        <nav aria-label="Public SEO pages" className="lg:col-span-5 border-t border-[#ECECEC] pt-6">
          <h2 className="text-[#093F31] font-black text-sm mb-3 font-serif">Explore Journey Expert Services</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold">
            <a href="/flights" className="hover:text-[#0B6B53] transition-colors">Flight Search</a>
            <a href="/hotels" className="hover:text-[#0B6B53] transition-colors">Halal Hotels</a>
            <a href="/packages" className="hover:text-[#0B6B53] transition-colors">Tour Packages</a>
            <a href="/visa" className="hover:text-[#0B6B53] transition-colors">Visa Support</a>
            <a href="/study-abroad" className="hover:text-[#0B6B53] transition-colors">Study Abroad</a>
            <a href="/hajj-umrah" className="hover:text-[#0B6B53] transition-colors">Hajj & Umrah</a>
            <a href="/corporate-travel" className="hover:text-[#0B6B53] transition-colors">Corporate Travel</a>
            <a href="/portals" className="hover:text-[#0B6B53] transition-colors">All Portals</a>
          </div>
        </nav>
      </div>

      {/* Payment Partners & Bottom Bar */}
      <div className="bg-white py-6 px-4 border-t border-[#ECECEC] text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-[#666666]">Supported Payment Gateways:</span>
            <span className="bg-[#F8FAF9] text-[#111111] border border-[#ECECEC] text-[10px] font-bold px-2.5 py-0.5 rounded-md">bKash</span>
            <span className="bg-[#F8FAF9] text-[#111111] border border-[#ECECEC] text-[10px] font-bold px-2.5 py-0.5 rounded-md">Nagad</span>
            <span className="bg-[#F8FAF9] text-[#111111] border border-[#ECECEC] text-[10px] font-bold px-2.5 py-0.5 rounded-md">SSLCommerz</span>
            <span className="bg-[#F8FAF9] text-[#111111] border border-[#ECECEC] text-[10px] font-bold px-2.5 py-0.5 rounded-md">VISA</span>
            <span className="bg-[#F8FAF9] text-[#111111] border border-[#ECECEC] text-[10px] font-bold px-2.5 py-0.5 rounded-md">MasterCard</span>
            <span className="bg-[#F8FAF9] text-[#111111] border border-[#ECECEC] text-[10px] font-bold px-2.5 py-0.5 rounded-md">Stripe</span>
          </div>

          <div className="text-[#666666] text-[11px] text-center md:text-right font-medium">
            © {new Date().getFullYear()} Journey Expert Ltd. (JEL). All rights reserved. Built for Bangladesh Global Mobility.
          </div>
        </div>
      </div>
    </footer>
  );
};
