import React, { lazy, Suspense, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSearch } from './components/HeroSearch';
const FlightBookingView = lazy(() => import('./components/FlightBookingView').then(({ FlightBookingView }) => ({ default: FlightBookingView })));
const HotelBookingView = lazy(() => import('./components/HotelBookingView').then(({ HotelBookingView }) => ({ default: HotelBookingView })));
const PackagesView = lazy(() => import('./components/PackagesView').then(({ PackagesView }) => ({ default: PackagesView })));
const VisaPortalView = lazy(() => import('./components/VisaPortalView').then(({ VisaPortalView }) => ({ default: VisaPortalView })));
const StudyAbroadView = lazy(() => import('./components/StudyAbroadView').then(({ StudyAbroadView }) => ({ default: StudyAbroadView })));
const BusinessUnitsView = lazy(() => import('./components/BusinessUnitsView').then(({ BusinessUnitsView }) => ({ default: BusinessUnitsView })));
const CustomerDashboard = lazy(() => import('./components/CustomerDashboard').then(({ CustomerDashboard }) => ({ default: CustomerDashboard })));
const AgentPortal = lazy(() => import('./components/AgentPortal').then(({ AgentPortal }) => ({ default: AgentPortal })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(({ AdminDashboard }) => ({ default: AdminDashboard })));
const ArchitectureDocsView = lazy(() => import('./components/ArchitectureDocsView').then(({ ArchitectureDocsView }) => ({ default: ArchitectureDocsView })));
const CraftBanglaView = lazy(() => import('./components/CraftBanglaView').then(({ CraftBanglaView }) => ({ default: CraftBanglaView })));
const CorporateTravelView = lazy(() => import('./components/CorporateTravelView').then(({ CorporateTravelView }) => ({ default: CorporateTravelView })));
const AIEngineView = lazy(() => import('./components/AIEngineView').then(({ AIEngineView }) => ({ default: AIEngineView })));
const MobileEcosystemView = lazy(() => import('./components/MobileEcosystemView').then(({ MobileEcosystemView }) => ({ default: MobileEcosystemView })));
const GrowthSeoView = lazy(() => import('./components/GrowthSeoView').then(({ GrowthSeoView }) => ({ default: GrowthSeoView })));
const BiAnalyticsView = lazy(() => import('./components/BiAnalyticsView').then(({ BiAnalyticsView }) => ({ default: BiAnalyticsView })));
const HealthcareInsuranceView = lazy(() => import('./components/HealthcareInsuranceView').then(({ HealthcareInsuranceView }) => ({ default: HealthcareInsuranceView })));
const HajjUmrahView = lazy(() => import('./components/HajjUmrahView').then(({ HajjUmrahView }) => ({ default: HajjUmrahView })));
const ConciergeView = lazy(() => import('./components/ConciergeView').then(({ ConciergeView }) => ({ default: ConciergeView })));
const DmcMarketplaceView = lazy(() => import('./components/DmcMarketplaceView').then(({ DmcMarketplaceView }) => ({ default: DmcMarketplaceView })));
const ApiGatewayView = lazy(() => import('./components/ApiGatewayView').then(({ ApiGatewayView }) => ({ default: ApiGatewayView })));
const CustomerLoyaltyView = lazy(() => import('./components/CustomerLoyaltyView').then(({ CustomerLoyaltyView }) => ({ default: CustomerLoyaltyView })));
const EnterpriseWebsiteView = lazy(() => import('./components/EnterpriseWebsiteView').then(({ EnterpriseWebsiteView }) => ({ default: EnterpriseWebsiteView })));
const CmsKnowledgeView = lazy(() => import('./components/CmsKnowledgeView').then(({ CmsKnowledgeView }) => ({ default: CmsKnowledgeView })));
const CrmSalesView = lazy(() => import('./components/CrmSalesView').then(({ CrmSalesView }) => ({ default: CrmSalesView })));
const ErpFinanceView = lazy(() => import('./components/ErpFinanceView').then(({ ErpFinanceView }) => ({ default: ErpFinanceView })));
const HrManagementView = lazy(() => import('./components/HrManagementView').then(({ HrManagementView }) => ({ default: HrManagementView })));
const AiAgentEcosystemView = lazy(() => import('./components/AiAgentEcosystemView').then(({ AiAgentEcosystemView }) => ({ default: AiAgentEcosystemView })));
const ProductRoadmapView = lazy(() => import('./components/ProductRoadmapView').then(({ ProductRoadmapView }) => ({ default: ProductRoadmapView })));
const InvestorDeckView = lazy(() => import('./components/InvestorDeckView').then(({ InvestorDeckView }) => ({ default: InvestorDeckView })));
const CybersecurityView = lazy(() => import('./components/CybersecurityView').then(({ CybersecurityView }) => ({ default: CybersecurityView })));
const DataPlatformView = lazy(() => import('./components/DataPlatformView').then(({ DataPlatformView }) => ({ default: DataPlatformView })));
const MobileSuperAppView = lazy(() => import('./components/MobileSuperAppView').then(({ MobileSuperAppView }) => ({ default: MobileSuperAppView })));
const B2bMarketplaceView = lazy(() => import('./components/B2bMarketplaceView').then(({ B2bMarketplaceView }) => ({ default: B2bMarketplaceView })));
const GrowthMarketingView = lazy(() => import('./components/GrowthMarketingView').then(({ GrowthMarketingView }) => ({ default: GrowthMarketingView })));
const CustomerSupportView = lazy(() => import('./components/CustomerSupportView').then(({ CustomerSupportView }) => ({ default: CustomerSupportView })));
const InternationalExpansionView = lazy(() => import('./components/InternationalExpansionView').then(({ InternationalExpansionView }) => ({ default: InternationalExpansionView })));
const InnovationLabView = lazy(() => import('./components/InnovationLabView').then(({ InnovationLabView }) => ({ default: InnovationLabView })));
const EnterpriseBlueprintView = lazy(() => import('./components/EnterpriseBlueprintView').then(({ EnterpriseBlueprintView }) => ({ default: EnterpriseBlueprintView })));
import { AIAssistantModal } from './components/AIAssistantModal';
import { MainViewModule, PortalType } from './types';
import { getModuleForPath, getPathForModule, getPathForPortal, getPortalForPath, migrateLegacyHash } from './routing/routes';
import { RouteMetadata } from './seo/RouteMetadata';
import { DeferredServiceWidget } from './components/seo/DeferredServiceWidget';
import { ServiceRouteShell } from './components/seo/ServiceRouteShell';
const Home3DExperience = lazy(() => import('./components/home3d/Home3DExperience').then(({ Home3DExperience }) => ({ default: Home3DExperience })));
import {
  Plane,
  Building2,
  Compass,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  Award,
  Sparkles,
  Bot,
  Users,
  CheckCircle2,
  Globe,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Briefcase,
  Smartphone,
  TrendingUp,
  Headphones,
  BarChart3,
  Heart,
  Moon,
  UserCheck,
  Network,
  Crown,
  Gift,
  Palette,
  FileText,
  Target,
  Calculator,
  Rocket,
} from 'lucide-react';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  React.useEffect(() => {
    migrateLegacyHash();
  }, []);

  const activePortal: PortalType = getPortalForPath(location.pathname);
  const activeMainModule: MainViewModule = getModuleForPath(location.pathname) || 'home';

  const navigateToModule = (module: MainViewModule) => {
    navigate(getPathForModule(module));
  };

  const navigateToPortal = (portal: PortalType) => {
    navigate(getPathForPortal(portal));
  };

  // Search parameters passed from Hero to Flight view
  const [flightSearchOrigin, setFlightSearchOrigin] = useState('Dhaka (DAC)');
  const [flightSearchDestination, setFlightSearchDestination] = useState('London Heathrow (LHR)');
  const [flightSearchGDS, setFlightSearchGDS] = useState('Auto');

  const handleHeroFlightSearch = (origin: string, destination: string, gds: string) => {
    setFlightSearchOrigin(origin);
    setFlightSearchDestination(destination);
    setFlightSearchGDS(gds);
    navigateToModule('flights');
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAF9] text-[#093F31] flex items-center justify-center font-sans">Loading Journey Expert…</div>}>
      <div className="min-h-screen bg-[#F8FAF9] text-[#111111] flex flex-col font-sans selection:bg-[#0B6B53] selection:text-white">
      <RouteMetadata />
      {/* Global Navigation Header */}
      <Header
        activePortal={activePortal}
        onPortalChange={navigateToPortal}
        activeModule={activeMainModule}
        onModuleChange={navigateToModule}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      {/* Main Content Render Area */}
      <main className="flex-grow">
        {/* MAIN CONSUMER & PUBLIC OTA PORTAL */}
        {activePortal === 'main' && (
          <div>
            {/* If on Home, Render the Master 3D Travel Universe Experience */}
            {activeMainModule === 'home' ? (
              <Home3DExperience
                onNavigateToModule={(mod) => {
                  navigateToModule(mod);

                }}
                onOpenAIModal={() => setIsAIModalOpen(true)}
                onSearchFlights={handleHeroFlightSearch}
              />
            ) : (
              <div>
                {/* Keep the generic hero off service routes so the route-specific H1 becomes the first meaningful paint. */}
                {activeMainModule !== 'flights' && activeMainModule !== 'visa' && (
                  <HeroSearch
                    activeModule={activeMainModule}
                    onModuleChange={navigateToModule}
                    onOpenAIModal={() => setIsAIModalOpen(true)}
                    onSearchFlights={handleHeroFlightSearch}
                  />
                )}

            {/* Quick Service Module Bar */}
            <div className="bg-white/95 backdrop-blur-md border-y border-[#ECECEC] py-3.5 px-4 shadow-xs">
              <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 sm:gap-4 text-xs font-bold">
                <button
                  onClick={() => navigateToModule('flights')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'flights'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Plane className="w-4 h-4 text-[#C7A44D]" />
                  <span>Flight Search</span>
                </button>

                <button
                  onClick={() => navigateToModule('hotels')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'hotels'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#C7A44D]" />
                  <span>Halal Hotels</span>
                </button>

                <button
                  onClick={() => navigateToModule('packages')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'packages'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#C7A44D]" />
                  <span>Tour Packages & Umrah</span>
                </button>

                <button
                  onClick={() => navigateToModule('visa')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'visa'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <FileCheck2 className="w-4 h-4 text-[#C7A44D]" />
                  <span>Visa Portal</span>
                </button>

                <button
                  onClick={() => navigateToModule('study-abroad')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'study-abroad'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#C7A44D]" />
                  <span>Study Abroad</span>
                </button>

                <button
                  onClick={() => navigateToModule('business-units')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'business-units'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#C7A44D]" />
                  <span>JEL Business Units</span>
                </button>

                <button
                  onClick={() => navigateToModule('craft-bangla')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'craft-bangla'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#C7A44D]" />
                  <span>Craft Bangla</span>
                </button>

                <button
                  onClick={() => navigateToModule('corporate')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'corporate'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#C7A44D]" />
                  <span>Corporate</span>
                </button>

                <button
                  onClick={() => navigateToModule('ai-engine')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'ai-engine'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#C7A44D]" />
                  <span>AI Engine (Part 11)</span>
                </button>

                <button
                  onClick={() => navigateToModule('mobile')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'mobile'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#C7A44D]" />
                  <span>Mobile Apps (Part 18)</span>
                </button>

                <button
                  onClick={() => navigateToModule('growth-seo')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'growth-seo'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-[#C7A44D]" />
                  <span>SEO & Growth (Part 19)</span>
                </button>

                <button
                  onClick={() => navigateToModule('bi-analytics')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'bi-analytics'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-[#C7A44D]" />
                  <span>BI & Analytics (Part 20)</span>
                </button>

                <button
                  onClick={() => navigateToModule('healthcare')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'healthcare'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Heart className="w-4 h-4 text-[#C7A44D]" />
                  <span>Healthcare & Insurance (Part 21)</span>
                </button>

                <button
                  onClick={() => navigateToModule('hajj-umrah')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'hajj-umrah'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Moon className="w-4 h-4 text-[#C7A44D]" />
                  <span>Hajj & Umrah (Part 22)</span>
                </button>

                <button
                  onClick={() => navigateToModule('concierge')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'concierge'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#C7A44D]" />
                  <span>Meet & Greet (Part 23)</span>
                </button>

                <button
                  onClick={() => navigateToModule('dmc-marketplace')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'dmc-marketplace'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#C7A44D]" />
                  <span>DMC Marketplace (Part 24)</span>
                </button>

                <button
                  onClick={() => navigateToModule('api-gateway')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'api-gateway'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Network className="w-4 h-4 text-[#C7A44D]" />
                  <span>API Gateway & Hub (Part 25)</span>
                </button>

                <button
                  onClick={() => navigateToModule('customer-loyalty')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'customer-loyalty'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Crown className="w-4 h-4 text-[#C7A44D]" />
                  <span>Customer 360 & Loyalty (Part 26)</span>
                </button>

                <button
                  onClick={() => navigateToModule('enterprise-design-system')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'enterprise-design-system'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Palette className="w-4 h-4 text-[#C7A44D]" />
                  <span>Website & Design System (Part 27)</span>
                </button>

                <button
                  onClick={() => navigateToModule('enterprise-cms')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'enterprise-cms'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#C7A44D]" />
                  <span>Headless CMS & Knowledge (Part 28)</span>
                </button>

                <button
                  onClick={() => navigateToModule('crm-sales')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'crm-sales'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Target className="w-4 h-4 text-[#C7A44D]" />
                  <span>CRM & Sales Automation (Part 29)</span>
                </button>

                <button
                  onClick={() => navigateToModule('erp-finance')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'erp-finance'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-[#C7A44D]" />
                  <span>ERP & Finance Operations (Part 30)</span>
                </button>

                <button
                  onClick={() => navigateToModule('hr-management')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'hr-management'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#C7A44D]" />
                  <span>HRMS & Employee Intelligence (Part 31)</span>
                </button>

                <button
                  onClick={() => navigateToModule('ai-agent-ecosystem')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'ai-agent-ecosystem'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Bot className="w-4 h-4 text-[#C7A44D]" />
                  <span>AI Agent Ecosystem (Part 32)</span>
                </button>

                <button
                  onClick={() => navigateToModule('product-roadmap')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'product-roadmap'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Rocket className="w-4 h-4 text-[#C7A44D]" />
                  <span>Product Roadmap & MVP (Part 33)</span>
                </button>

                <button
                  onClick={() => navigateToModule('investor-deck')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'investor-deck'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#C7A44D]" />
                  <span>Investor Deck & Valuation (Part 34)</span>
                </button>

                <button
                  onClick={() => navigateToModule('cybersecurity-infrastructure')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'cybersecurity-infrastructure'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#C7A44D]" />
                  <span>Cybersecurity & Infrastructure (Part 36)</span>
                </button>

                <button
                  onClick={() => navigateToModule('data-platform')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'data-platform'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-[#C7A44D]" />
                  <span>Data Platform & AI Decision (Part 37)</span>
                </button>

                <button
                  onClick={() => navigateToModule('mobile-superapp')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'mobile-superapp'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#C7A44D]" />
                  <span>Mobile Super App (Part 38)</span>
                </button>

                <button
                  onClick={() => navigateToModule('b2b-marketplace')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'b2b-marketplace'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#C7A44D]" />
                  <span>B2B Travel Marketplace (Part 39)</span>
                </button>

                <button
                  onClick={() => navigateToModule('growth-marketing')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'growth-marketing'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-[#C7A44D]" />
                  <span>Global Marketing & Growth (Part 40)</span>
                </button>

                <button
                  onClick={() => navigateToModule('customer-support')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'customer-support'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Headphones className="w-4 h-4 text-[#C7A44D]" />
                  <span>Customer Support & AI Contact Center (Part 41)</span>
                </button>

                <button
                  onClick={() => navigateToModule('international-expansion')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'international-expansion'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#C7A44D]" />
                  <span>International Expansion & Partnerships (Part 42)</span>
                </button>

                <button
                  onClick={() => navigateToModule('innovation-lab')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'innovation-lab'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#C7A44D]" />
                  <span>Innovation Lab & Future Tech (Part 43)</span>
                </button>

                <button
                  onClick={() => navigateToModule('enterprise-blueprint')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeMainModule === 'enterprise-blueprint'
                      ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                      : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <Rocket className="w-4 h-4 text-[#C7A44D]" />
                  <span>Final Master Enterprise Blueprint (Part 44)</span>
                </button>
              </div>
            </div>

            {/* Dynamic Service Module Display */}
            <div className="py-6">
              {activeMainModule === 'flights' && (
                <ServiceRouteShell route="flights">
                  <DeferredServiceWidget
                    fallback={<div className="min-h-[520px] rounded-2xl bg-white/70" aria-hidden="true" />}
                  >
                    <FlightBookingView
                      initialOrigin={flightSearchOrigin}
                      initialDestination={flightSearchDestination}
                      initialGDS={flightSearchGDS}
                    />
                  </DeferredServiceWidget>
                </ServiceRouteShell>
              )}

              {activeMainModule === 'hotels' && <HotelBookingView />}

              {activeMainModule === 'packages' && <PackagesView />}

              {activeMainModule === 'visa' && (
                <ServiceRouteShell route="visa">
                  <DeferredServiceWidget
                    fallback={<div className="min-h-[520px] rounded-2xl bg-white/70" aria-hidden="true" />}
                  >
                    <VisaPortalView />
                  </DeferredServiceWidget>
                </ServiceRouteShell>
              )}

              {activeMainModule === 'study-abroad' && <StudyAbroadView />}

              {activeMainModule === 'business-units' && <BusinessUnitsView />}

              {activeMainModule === 'craft-bangla' && <CraftBanglaView />}

              {activeMainModule === 'corporate' && <CorporateTravelView />}

              {activeMainModule === 'ai-engine' && <AIEngineView />}

              {activeMainModule === 'mobile' && <MobileEcosystemView />}

              {activeMainModule === 'growth-seo' && <GrowthSeoView />}

              {activeMainModule === 'bi-analytics' && <BiAnalyticsView />}

              {activeMainModule === 'healthcare' && <HealthcareInsuranceView />}

              {activeMainModule === 'hajj-umrah' && <HajjUmrahView />}

              {activeMainModule === 'concierge' && <ConciergeView />}

              {activeMainModule === 'dmc-marketplace' && <DmcMarketplaceView />}

              {activeMainModule === 'api-gateway' && <ApiGatewayView />}

              {activeMainModule === 'customer-loyalty' && <CustomerLoyaltyView />}

              {activeMainModule === 'enterprise-design-system' && <EnterpriseWebsiteView />}

              {activeMainModule === 'enterprise-cms' && <CmsKnowledgeView />}

              {activeMainModule === 'crm-sales' && <CrmSalesView />}

              {activeMainModule === 'erp-finance' && <ErpFinanceView />}

              {activeMainModule === 'hr-management' && <HrManagementView />}

              {activeMainModule === 'ai-agent-ecosystem' && <AiAgentEcosystemView />}

              {activeMainModule === 'product-roadmap' && <ProductRoadmapView />}

              {activeMainModule === 'investor-deck' && <InvestorDeckView />}

              {activeMainModule === 'cybersecurity-infrastructure' && <CybersecurityView />}

              {activeMainModule === 'data-platform' && <DataPlatformView />}

              {activeMainModule === 'mobile-superapp' && <MobileSuperAppView />}

              {activeMainModule === 'b2b-marketplace' && <B2bMarketplaceView />}

              {activeMainModule === 'growth-marketing' && <GrowthMarketingView />}

              {activeMainModule === 'customer-support' && <CustomerSupportView />}

              {activeMainModule === 'international-expansion' && <InternationalExpansionView />}

              {activeMainModule === 'innovation-lab' && <InnovationLabView />}

              {activeMainModule === 'enterprise-blueprint' && <EnterpriseBlueprintView />}
            </div>

            {/* Enterprise Ecosystem Value Propositions */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#ECECEC]">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-widest bg-[#0B6B53]/10 px-3 py-1 rounded-full border border-[#0B6B53]/20">
                  Why Leading Travelers Choose Journey Expert Ltd.
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#093F31] font-serif">
                  Bangladesh's Complete Travel & Global Mobility Ecosystem
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-medium leading-relaxed">
                  Integrating real-time GDS availability, automated visa file assistance, and 500+ university partner portals into one seamless platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#ECECEC] hover:border-[#0B6B53]/40 rounded-3xl p-8 space-y-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#093F31] p-0.5 shadow-md flex items-center justify-center text-[#C7A44D] group-hover:scale-110 transition-transform">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-[#093F31] text-lg font-serif">Direct Sabre & Amadeus GDS Access</h3>
                  <p className="text-xs text-[#666666] leading-relaxed font-medium">
                    Instantly query live fare availability, seat maps, and baggage rules across Sabre, Amadeus, and Galileo for guaranteed lowest fare search.
                  </p>
                </div>

                <div className="bg-white border border-[#ECECEC] hover:border-[#0B6B53]/40 rounded-3xl p-8 space-y-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#093F31] p-0.5 shadow-md flex items-center justify-center text-[#C7A44D] group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-[#093F31] text-lg font-serif">Gemini AI Travel & Visa Expert</h3>
                  <p className="text-xs text-[#666666] leading-relaxed font-medium">
                    Get instant 24/7 intelligent answers for UK, Canada & Schengen visa checklists, flight baggage policies, and university eligibility.
                  </p>
                </div>

                <div className="bg-white border border-[#ECECEC] hover:border-[#0B6B53]/40 rounded-3xl p-8 space-y-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0B6B53]/5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#093F31] p-0.5 shadow-md flex items-center justify-center text-[#C7A44D] group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-[#093F31] text-lg font-serif">500+ University Partner Network</h3>
                  <p className="text-xs text-[#666666] leading-relaxed font-medium">
                    End-to-end study abroad counseling, CAS offer processing, and student visa file preparation with scholarship assistance.
                  </p>
                </div>
              </div>
            </section>
              </div>
            )}
          </div>
        )}

        {/* CUSTOMER PORTAL VIEW */}
        {activePortal === 'customer' && <CustomerDashboard />}

        {/* B2B AGENT PORTAL VIEW */}
        {activePortal === 'agent' && <AgentPortal />}

        {/* ADMIN CONTROL CENTER VIEW */}
        {activePortal === 'admin' && <AdminDashboard />}

        {/* ARCHITECTURE & SYSTEM DOCS VIEW */}
        {activePortal === 'architecture' && <ArchitectureDocsView />}
      </main>

      {/* Global AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      {/* Global Footer */}
      <Footer onModuleChange={navigateToModule} />
      </div>
    </Suspense>
  );
}
