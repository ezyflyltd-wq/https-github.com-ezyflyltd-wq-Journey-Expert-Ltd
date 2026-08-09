import React, { useState } from 'react';
import {
  FileCode2,
  Server,
  Database,
  ShieldCheck,
  Globe,
  Layers,
  Terminal,
  CheckCircle2,
  Plane,
  Building2,
  Cpu,
  LayoutGrid,
  Lock,
  Compass,
  Users,
  Briefcase,
  ShoppingBag,
} from 'lucide-react';

export const ArchitectureDocsView: React.FC = () => {
  const [activeDocSection, setActiveDocSection] = useState<
    'sitemap' | 'design' | 'frontend' | 'backend' | 'database' | 'flight' | 'hotel' | 'visa' | 'ai' | 'admin-erp' | 'b2b-whitelabel' | 'corporate-tmc' | 'craft-bangla' | 'security'
  >('sitemap');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header Banner */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#C7A44D] mb-1.5 tracking-wider uppercase">
            <FileCode2 className="w-4 h-4" />
            <span>CTO Enterprise Master Specification • Journey Expert Ltd.</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            System Architecture, Multi-GDS Blueprint & Platform Specs
          </h2>
          <p className="text-xs text-emerald-100 mt-1 font-medium max-w-2xl">
            Complete technical specification covering Parts 2–8: Information Architecture, Design Tokens, Microservices, PostgreSQL Database ERD, Global Flight Engine, and Hotel Booking Platform.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-white font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#C7A44D]" />
          <span>Enterprise API & Cloud Architecture</span>
        </div>
      </div>

      {/* Docs Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold">
        <button
          onClick={() => setActiveDocSection('sitemap')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'sitemap'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 2: Sitemap & Portals</span>
        </button>

        <button
          onClick={() => setActiveDocSection('design')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'design'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <LayoutGrid className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 3: Design Tokens</span>
        </button>

        <button
          onClick={() => setActiveDocSection('frontend')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'frontend'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 4: Frontend Arch</span>
        </button>

        <button
          onClick={() => setActiveDocSection('backend')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'backend'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Cpu className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 5: Microservices</span>
        </button>

        <button
          onClick={() => setActiveDocSection('database')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'database'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Database className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 6: PostgreSQL ERD</span>
        </button>

        <button
          onClick={() => setActiveDocSection('flight')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'flight'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Plane className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 7: Flight Engine</span>
        </button>

        <button
          onClick={() => setActiveDocSection('hotel')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'hotel'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 8: Hotel Platform</span>
        </button>

        <button
          onClick={() => setActiveDocSection('visa')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'visa'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 9: Visa CRM</span>
        </button>

        <button
          onClick={() => setActiveDocSection('ai')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'ai'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Cpu className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 11: AI Engine</span>
        </button>

        <button
          onClick={() => setActiveDocSection('admin-erp')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'admin-erp'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 12: Admin ERP & CRM</span>
        </button>

        <button
          onClick={() => setActiveDocSection('b2b-whitelabel')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'b2b-whitelabel'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 13: B2B & White Label</span>
        </button>

        <button
          onClick={() => setActiveDocSection('corporate-tmc')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'corporate-tmc'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 14: Corporate TMC</span>
        </button>

        <button
          onClick={() => setActiveDocSection('craft-bangla')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'craft-bangla'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#C7A44D]" />
          <span>Part 15: Craft Bangla</span>
        </button>

        <button
          onClick={() => setActiveDocSection('security')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 ${
            activeDocSection === 'security'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C7A44D]" />
          <span>Security & Deploy</span>
        </button>
      </div>

      {/* SECTION 1: SITEMAP & PORTALS */}
      {activeDocSection === 'sitemap' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-[#093F31] font-serif">
                Part 2 — Enterprise Information Architecture & Ecosystem Map
              </h3>
              <p className="text-[#666666] mt-1 font-medium">
                Complete multi-tenant ecosystem breakdown across 40+ public routes, 7 enterprise portals, 19 user role matrices, and 15 AI modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="font-extrabold text-[#093F31] text-sm block border-b border-[#ECECEC] pb-2">
                  Public Website (40 Routes)
                </span>
                <ul className="space-y-1.5 text-[#666666] font-medium list-disc pl-4">
                  <li>Flights, Hotels, Holiday Packages</li>
                  <li>Visa Services (115+ Countries)</li>
                  <li>JEL Study Abroad & CAS / COE</li>
                  <li>Hajj & Umrah Luxury Packages</li>
                  <li>Craft Bangla Artisan Marketplace</li>
                  <li>Medical Tourism & Halal Travel</li>
                  <li>Meet & Greet VIP Concierge</li>
                </ul>
              </div>

              <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="font-extrabold text-[#093F31] text-sm block border-b border-[#ECECEC] pb-2">
                  Enterprise Portals (7 Roles)
                </span>
                <ul className="space-y-1.5 text-[#666666] font-medium list-disc pl-4">
                  <li>Customer Dashboard & Passport Vault</li>
                  <li>B2B Travel Agent Portal (Sabre/Amadeus)</li>
                  <li>Corporate Travel Portal & MICE</li>
                  <li>University Partner Dashboard</li>
                  <li>Supplier & Hotel Partner Console</li>
                  <li>Craft Bangla Artisan Portal</li>
                  <li>Admin Executive Headquarters</li>
                </ul>
              </div>

              <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="font-extrabold text-[#093F31] text-sm block border-b border-[#ECECEC] pb-2">
                  15 AI Native Modules
                </span>
                <ul className="space-y-1.5 text-[#666666] font-medium list-disc pl-4">
                  <li>AI Travel Planner (Gemini 3.6 Flash)</li>
                  <li>AI Visa & Document Advisor</li>
                  <li>AI Flight & Fare Predictor</li>
                  <li>AI Lead Scoring & Automated CRM</li>
                  <li>AI Multilingual Voice & WhatsApp Agent</li>
                  <li>AI Fraud Detection & Dynamic Pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: DESIGN SYSTEM */}
      {activeDocSection === 'design' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-[#093F31] font-serif">
                Part 3 — Enterprise UI/UX Design System Tokens
              </h3>
              <p className="text-[#666666] mt-1 font-medium">
                Brand guidelines, optical color ratios, mathematical typography scales, and micro-interaction principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="font-extrabold text-[#093F31] block">Color Tokens</span>
                <div className="space-y-2 font-mono">
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-[#0B5D3B] rounded-lg shadow-sm" />
                      <span className="font-bold">#0B5D3B</span>
                    </div>
                    <span className="text-[10px] text-[#666666]">Primary Green (Trust)</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-[#C8A14A] rounded-lg shadow-sm" />
                      <span className="font-bold">#C8A14A</span>
                    </div>
                    <span className="text-[10px] text-[#666666]">Primary Gold (Luxury)</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-[#081C15] rounded-lg shadow-sm" />
                      <span className="font-bold">#081C15</span>
                    </div>
                    <span className="text-[10px] text-[#666666]">Dark Slate Canvas</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="font-extrabold text-[#093F31] block">Typography Hierarchy</span>
                <ul className="space-y-2 text-[#111111] font-bold">
                  <li className="bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                    <span className="text-xs text-[#666666] font-normal block">Primary Body</span> Inter / Plus Jakarta Sans
                  </li>
                  <li className="bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                    <span className="text-xs text-[#666666] font-normal block">Headings & Displays</span> Playfair Display / Serif (Weight 800)
                  </li>
                  <li className="bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                    <span className="text-xs text-[#666666] font-normal block">Line Height & Spacing</span> 1.6 Line Height, Step Ratio 1.25
                  </li>
                </ul>
              </div>

              <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="font-extrabold text-[#093F31] block">Border Radii & Grids</span>
                <ul className="space-y-2 text-[#111111] font-bold">
                  <li className="bg-white p-2 rounded-xl border border-[#ECECEC]">Buttons: 12px Pill Radius</li>
                  <li className="bg-white p-2 rounded-xl border border-[#ECECEC]">Cards: 16px Corner Radius</li>
                  <li className="bg-white p-2 rounded-xl border border-[#ECECEC]">Dialogs / Modals: 24px Radius</li>
                  <li className="bg-white p-2 rounded-xl border border-[#ECECEC]">Grid: 12-Column Layout (1440px Max Width)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: FRONTEND ARCHITECTURE */}
      {activeDocSection === 'frontend' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-[#093F31] font-serif">
                Part 4 — Modern Frontend Architecture & Component Matrix
              </h3>
              <p className="text-[#666666] mt-1 font-medium">
                Feature-driven React / Next.js SPA/SSR architecture, client state management, and real-time streaming sockets.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] font-mono text-[11px] space-y-3">
              <span className="text-[#0B6B53] font-black">// Directory Structure & Component Hierarchy</span>
              <pre className="text-[#111111] overflow-x-auto leading-relaxed">
{`src/
├── components/
│   ├── Header.tsx                 # Multi-portal Navigation & Language Switcher
│   ├── HeroSearch.tsx             # Flight / Hotel / Visa Search Engine
│   ├── FlightBookingView.tsx      # Real-time GDS Flight Shopping & Fare Families
│   ├── HotelBookingView.tsx       # Accommodation Search & Hotelbeds Integration
│   ├── VisaPortalView.tsx         # Visa Document Analyzer & Embassy Status
│   ├── StudyAbroadView.tsx        # University Search & Application Tracker
│   ├── CraftBanglaView.tsx        # Artisan E-Commerce Marketplace
│   ├── CorporateTravelView.tsx    # Corporate Expense & VIP Concierge
│   ├── AgentPortal.tsx            # B2B Ticketing, PNR & Credit Wallet
│   ├── CustomerDashboard.tsx      # Passenger Passport Vault & Booking Records
│   ├── AdminDashboard.tsx         # Executive HQ, CRM Leads & Analytics
│   └── ArchitectureDocsView.tsx   # CTO Technical Specifications
├── data/
│   └── mockData.ts                # Production Mock Seed Datasets & GDS Models
├── types.ts                       # Shared TypeScript Interfaces & Data Contracts
└── App.tsx                        # Root Router & Global State Manager`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: BACKEND MICROSERVICES */}
      {activeDocSection === 'backend' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-[#093F31] font-serif">
                Part 5 — Enterprise Backend Microservices Specification
              </h3>
              <p className="text-[#666666] mt-1 font-medium">
                Domain-Driven Design (DDD) with NestJS microservices, Redis session caching, RabbitMQ event bus, and SSLCommerz payment router.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <span className="text-[#093F31] font-black block">1. Flight Distribution Microservice</span>
                <p className="text-[#666666]">
                  Connects to Sabre Web Services (SWS 1S), Amadeus Altéa MasterPricer, and Travelport Universal API. Executes multi-threaded fare aggregation in under 1,200ms.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <span className="text-[#093F31] font-black block">2. Hotel Connectivity Microservice</span>
                <p className="text-[#666666]">
                  Direct API integrations with Hotelbeds, Expedia Partner Solutions, and Booking.com connectivity layer for real-time inventory and room availability.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <span className="text-[#093F31] font-black block">3. Payment & Settlement Router</span>
                <p className="text-[#666666]">
                  Supports instant bKash Merchant API, Nagad Gateway, SSLCommerz, Stripe, and revolving Corporate/Agent credit ledger lines with automatic VAT/GST invoicing.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                <span className="text-[#093F31] font-black block">4. AI Intelligence Microservice</span>
                <p className="text-[#666666]">
                  Server-side Gemini 3.6 Flash integration for dynamic travel planning, visa document OCR verification, lead scoring, and automated customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: DATABASE ERD */}
      {activeDocSection === 'database' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 6 — PostgreSQL Relational ERD & Data Dictionary
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Enterprise PostgreSQL schema featuring UUID primary keys, soft deletes, multi-currency ledgers, and audit tracking.
            </p>
          </div>

          <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] font-mono text-[11px] space-y-3">
            <div className="text-[#0B6B53] font-black">// Production DDL SQL Schema Definition</div>
            <pre className="text-[#111111] overflow-x-auto leading-relaxed">
{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'CUSTOMER', -- 'CUSTOMER', 'AGENT', 'CORPORATE', 'ADMIN'
  wallet_balance_bdt DECIMAL(12, 2) DEFAULT 0.00,
  passport_number VARCHAR(100),
  passport_expiry DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pnr_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pnr_code VARCHAR(10) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  gds_provider VARCHAR(50) NOT NULL, -- 'Sabre', 'Amadeus', 'Galileo'
  airline_code VARCHAR(10) NOT NULL,
  origin_code VARCHAR(10) NOT NULL,
  destination_code VARCHAR(10) NOT NULL,
  total_fare_bdt DECIMAL(12, 2) NOT NULL,
  commission_bdt DECIMAL(12, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'TICKETED', -- 'BOOKED', 'TICKETED', 'CANCELLED'
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE craft_products (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  artisan_region VARCHAR(255) NOT NULL,
  price_bdt DECIMAL(10, 2) NOT NULL,
  price_usd DECIMAL(10, 2) NOT NULL,
  authenticity_certificate BOOLEAN DEFAULT TRUE,
  in_stock BOOLEAN DEFAULT TRUE
);`}
            </pre>
          </div>
        </div>
      )}

      {/* SECTION 6: FLIGHT ENGINE */}
      {activeDocSection === 'flight' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 7 — Global Flight Booking Engine Specification
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Comprehensive 12-step flight shopping, fare family comparison, PNR creation, seat mapping, and automated E-Ticket issuance engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] block">GDS PCC Credentials & Feeds</span>
              <ul className="space-y-1 text-[#666666] font-medium list-disc pl-4">
                <li>Sabre SWS REST/SOAP PCC: 7A9X (Dhaka Headquarters)</li>
                <li>Amadeus Altéa Office ID: DACBG2100</li>
                <li>Travelport Galileo PCC: 1G (High-speed LFSfeed)</li>
              </ul>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] block">12-Step Booking Workflow</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Search → Fare Family Selection → Passenger Passport Vault Sync → Seat & Ancillary Selection → Payment Gateways → PNR Generation → Ticket Issuance → PDF E-Ticket & Invoice Delivery.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: HOTEL ENGINE */}
      {activeDocSection === 'hotel' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 8 — Global Hotel Booking Platform Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Accommodation aggregator connecting Hotelbeds, Expedia Partner Solutions, and Booking.com for instant room inventory, vouchers, and cancellation rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <span className="font-extrabold text-[#093F31] block">Distribution Partners</span>
              <p className="text-[#666666] font-medium">Hotelbeds, Expedia EPS, WebBeds, RateHawk, & Direct Hotel Extranet.</p>
            </div>
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <span className="font-extrabold text-[#093F31] block">Rate Management</span>
              <p className="text-[#666666] font-medium">Standard, Non-Refundable, Flexible, Corporate B2B, and Package Rates.</p>
            </div>
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-1">
              <span className="font-extrabold text-[#093F31] block">Voucher Engine</span>
              <p className="text-[#666666] font-medium">Instant PDF Hotel Vouchers with QR Verification and Supplier Booking Reference.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: VISA CRM & IMMIGRATION */}
      {activeDocSection === 'visa' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 9 — Visa Management & Immigration CRM System Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              End-to-end digital visa processing ecosystem: Lead Capture, OCR Passport Reading, AI Approval Risk Scoring, Consular Document Workflows, and Embassy Submission Pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">11-Step Consular Workflow</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Lead Capture → Consultation → Visa Assessment → Document Collection → OCR Verification → File Prep → Quality Check → Embassy Submission → Interview Tracking → Decision Received → Passport Delivery.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">AI Probability & Risk Engine</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Evaluates applicant age, bank liquid balance, 5-year OECD travel history, employment stability, and TIN filings to output a 0-100% Visa Approval Probability Score with targeted document gap recommendations.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">Document OCR & Security</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Automated MRZ (Machine Readable Zone) extraction for Bangladeshi passports, AES-256 encrypted document vault, watermarked file access logs, and role-based access control for consular officers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 11: AI ENGINE & INTELLIGENT AUTOMATION */}
      {activeDocSection === 'ai' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 11 — AI Engine & Intelligent Automation Platform Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Context-Aware Multi-Agent Architecture: LLM Gateway, Angela Voice AI (English, Bangla, Arabic), Pinecone Vector Database, RAG Knowledge Base, and Automated CRM Pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">1. LLM Gateway & Orchestration</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Central API Gateway directing requests across Gemini 3.6 Flash, OpenAI GPT-4o, and Claude 3.5. Includes prompt caching, token cost tracking ($42.18/mo avg), and automatic failover routing.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">2. Angela Voice AI Engine</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Multilingual voice synthesizer and speech-to-text pipeline supporting English, Bangla (বাংলা), and Arabic (العربية). Automates inbound flight & visa inquiries and qualifies leads with 98.5% accuracy.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">3. Pinecone / Qdrant RAG Engine</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                768-dimensional dense vector embeddings indexing UKVI Appendix Finance 2026, Sabre/Amadeus fare rules, and 500+ University entry requirements for hallucination-free retrieval.
              </p>
            </div>
          </div>

          <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-3">
            <span className="font-extrabold text-[#C7A44D] text-sm block">Specialized Multi-Agent Framework</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Journey AI Assistant</strong>
                <span className="text-emerald-100/80">Flight, hotel & tour package itinerary creator.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Angela AI Voice Agent</strong>
                <span className="text-emerald-100/80">24/7 Voice call lead qualifier & status advisor.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">AI Visa Advisor</strong>
                <span className="text-emerald-100/80">Consular risk scorer & document OCR parser.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">AI Study Counselor</strong>
                <span className="text-emerald-100/80">500+ partner university admission matcher.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">AI Sales Predictor</strong>
                <span className="text-emerald-100/80">B2C/B2B lead conversion probability scorer.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">AI CRM & Workflows</strong>
                <span className="text-emerald-100/80">Automated WhatsApp/Email & document reminders.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 12: ENTERPRISE ADMIN CONTROL CENTER, ERP & CRM */}
      {activeDocSection === 'admin-erp' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 12 — Enterprise Admin Dashboard, ERP & CRM Control Center Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Centralized Digital Command Center for Journey Expert Ltd.: Business Intelligence, GDS PNR Control, Visa CRM Pipelines, Financial Ledgers, Agent Wallets, and RBAC Security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">1. Executive BI & Monitoring</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Real-time GMV tracking (৳ 4.85 Cr/mo), revenue vertical breakdown (Flights 58.5%, Hotels 16.9%, Visa 12.6%, Study 12.0%), and live multi-GDS latency telemetry.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">2. CRM & Sales Automation</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Automated lead qualification pipeline with AI Lead Scoring (0-100), counselor assignment, and direct WhatsApp/Email quotation generation.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">3. Finance ERP & Wallets</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Double-entry ledger accounting, pre-funded B2B agent deposit wallets (৳ 3.85 Cr), customer wallets, supplier settlements, and tax/VAT compliance reporting.
              </p>
            </div>
          </div>

          <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-3">
            <span className="font-extrabold text-[#C7A44D] text-sm block">13-Role Permission Matrix (RBAC)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Super Admin & CEO</strong>
                <span className="text-emerald-100/80">Full system configuration & executive BI.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">COO & Operations Manager</strong>
                <span className="text-emerald-100/80">Flight, hotel & visa operational control.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Finance & Audit Manager</strong>
                <span className="text-emerald-100/80">Ledgers, agent credit lines & tax reporting.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Visa Officer & Counselors</strong>
                <span className="text-emerald-100/80">High Comm filings & university admissions.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Travel Consultants & Sales</strong>
                <span className="text-emerald-100/80">GDS ticketing, PNR reissue & CRM leads.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">IT Admin & Support</strong>
                <span className="text-emerald-100/80">API logs, security audit & SLA tickets.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 13: B2B TRAVEL AGENT PORTAL & WHITE LABEL OTA PLATFORM */}
      {activeDocSection === 'b2b-whitelabel' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 13 — B2B Travel Agent Ecosystem & White Label OTA Platform Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Enterprise B2B Distribution Platform: Agent Verification, Multi-GDS PCC Access, Pre-funded Wallet & Credit Lines, Turnkey White Label SaaS, and REST API Keys Distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">1. Agent Verification & Onboarding</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Automated trade license and business identification verification pipeline for agency account activation and credit limit assignment.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">2. Turnkey White Label SaaS</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Custom sub-agency domain mapping (`booking.agentbrand.com`), logo & primary brand color styling, and isolated booking & payment processing.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">3. Multi-GDS REST API Keys</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                High-throughput Flight Search & Hotel Booking REST APIs with rate limits (1,200 req/min), HMAC authentication, and webhook notifications.
              </p>
            </div>
          </div>

          <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-3">
            <span className="font-extrabold text-[#C7A44D] text-sm block">B2B Financial Wallet & Credit Architecture</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Pre-funded Deposit Wallet</strong>
                <span className="text-emerald-100/80">Instant bKash, Nagad & Bank Wire top ups.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Credit Line Management</strong>
                <span className="text-emerald-100/80">Tier-based revolving credit limits (৳ 50 Lakh+).</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Dynamic Markup Engine</strong>
                <span className="text-emerald-100/80">Flat or percentage per segment markups.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 14: CORPORATE TRAVEL MANAGEMENT PLATFORM (TMC) */}
      {activeDocSection === 'corporate-tmc' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 14 — Corporate Travel Management Platform (TMC) Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Enterprise TMC Ecosystem: Multi-Level Approval Engine, Automated Travel Policy Guardrails, Revolving Corporate Credit Accounts, OCR Expense Management, HRMS Sync, and Duty of Care Risk Radar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">1. Configurable Travel Policy Engine</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Rules for C-Suite vs Staff tier flight entitlements, hotel nightly budget caps, advance booking requirements (3-14 days), and out-of-policy exception triggers.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">2. Approval Workflow Matrix</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Multi-stage routing (Employee Request → Line Manager Review → Finance Approval → Automated GDS Ticketing) with single-click email/app notifications.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">3. Corporate Credit & Monthly Tax Invoicing</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Revolving credit line (up to ৳ 2.5 Crore) with 30-day payment terms, consolidated monthly GST/VAT invoices, and direct bank wire integration.
              </p>
            </div>
          </div>

          <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-3">
            <span className="font-extrabold text-[#C7A44D] text-sm block">AI Duty of Care & Expense Processing</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Gemini OCR Expense Reader</strong>
                <span className="text-emerald-100/80">Scans receipts, extracts amount & category for instant reimbursement.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">AI Travel Risk Radar</strong>
                <span className="text-emerald-100/80">Live weather, political & flight delay alerts sent to safety managers.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Automated HRMS Sync</strong>
                <span className="text-emerald-100/80">Bi-directional employee directory & department budget sync.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 15: CRAFT BANGLA HERITAGE MARKETPLACE */}
      {activeDocSection === 'craft-bangla' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Part 15 — Craft Bangla Heritage E-Commerce Marketplace Architecture
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Global Heritage E-Commerce & Cultural Diplomacy Unit of Journey Expert Ltd: Multi-Category Catalog (Dhakai Muslin, GI Jamdani, Rajshahi Silk, Nakshi Kantha, Brass, Jute, Sreemangal Tea), AI Product Story Engine, Artisan Verification Portal, Corporate Gifting, Craft Tourism Experiences, and Air Courier Express Export Logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">1. Product Story & GI Verification Engine</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Stores historical origin (Mughal court muslin, Pala dynasty brass), master artisan bio, production duration (30-90 days), and attaches verified UNESCO/GI authenticity certificates.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">2. Multi-Model Commerce Matrix</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Supports B2C retail, B2B wholesale trade, custom corporate gifting with logo branding, international export, and direct artisan fair-trade payouts via bKash/Nagad/Bank.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] text-sm block">3. Tourism & Air Express Logistics</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                Integrates handloom village day-tours (Sonargaon, Dhamrai, Sreemangal) with JEL Tour Desk, plus DHL/FedEx customs-cleared 3-5 day express delivery.
              </p>
            </div>
          </div>

          <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-3">
            <span className="font-extrabold text-[#C7A44D] text-sm block">AI Heritage Personalization & Multi-Currency PGW</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Gemini Personalization Engine</strong>
                <span className="text-emerald-100/80">Analyzes event, recipient & budget to generate bespoke cultural gift boxes.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">Multi-Currency Global Checkout</strong>
                <span className="text-emerald-100/80">Real-time BDT ৳, USD $, GBP £, EUR € conversions with bKash, SSLCommerz, Stripe & PayPal.</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <strong className="text-white block">8% Fair-Trade Platform Model</strong>
                <span className="text-emerald-100/80">92% of revenue goes directly to rural artisan cooperatives, verified on-chain.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: SECURITY & DEPLOYMENT */}
      {activeDocSection === 'security' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-xs text-[#111111]">
          <div>
            <h3 className="text-lg font-black text-[#093F31] font-serif">
              Security Matrix, PCI-DSS & Cloud Run Deployment
            </h3>
            <p className="text-[#666666] mt-1 font-medium">
              Hardened environment variables, OWASP compliance, and port 3000 container ingress architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] block">Server-Side Secret Protection</span>
              <p className="text-[#666666] font-medium leading-relaxed">
                All Gemini API keys, Sabre passwords, and payment gateway secret keys are loaded exclusively via server-side process.env in <code className="text-[#0B6B53] font-bold">server.ts</code>. Zero secrets exposed to client browser.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#093F31] block">Production Cloud Run Container Command</span>
              <pre className="text-[#111111] font-mono text-[11px] bg-white p-2.5 rounded-xl border border-[#ECECEC]">
                node dist/server.cjs
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

