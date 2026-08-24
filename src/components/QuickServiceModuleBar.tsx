import type { ComponentType } from 'react';
import {
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  Calculator,
  Compass,
  Crown,
  FileCheck2,
  FileText,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Moon,
  Network,
  Palette,
  Plane,
  Rocket,
  ShoppingBag,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import type { MainViewModule } from '../types';

type QuickServiceModuleBarProps = {
  activeModule: MainViewModule;
  onModuleChange: (module: MainViewModule) => void;
};

type ServiceItem = {
  module: MainViewModule;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const SERVICES: ServiceItem[] = [
  { module: 'flights', label: 'Flight Search', icon: Plane },
  { module: 'hotels', label: 'Halal Hotels', icon: Building2 },
  { module: 'packages', label: 'Tour Packages & Umrah', icon: Compass },
  { module: 'visa', label: 'Visa Portal', icon: FileCheck2 },
  { module: 'study-abroad', label: 'Study Abroad', icon: GraduationCap },
  { module: 'business-units', label: 'JEL Business Units', icon: Building2 },
  { module: 'craft-bangla', label: 'Craft Bangla', icon: ShoppingBag },
  { module: 'corporate', label: 'Corporate', icon: Briefcase },
  { module: 'ai-engine', label: 'AI Engine (Part 11)', icon: Sparkles },
  { module: 'mobile', label: 'Mobile Apps (Part 18)', icon: Smartphone },
  { module: 'growth-seo', label: 'SEO & Growth (Part 19)', icon: TrendingUp },
  { module: 'bi-analytics', label: 'BI & Analytics (Part 20)', icon: BarChart3 },
  { module: 'healthcare', label: 'Healthcare & Insurance (Part 21)', icon: Heart },
  { module: 'hajj-umrah', label: 'Hajj & Umrah (Part 22)', icon: Moon },
  { module: 'concierge', label: 'Meet & Greet (Part 23)', icon: UserCheck },
  { module: 'dmc-marketplace', label: 'DMC Marketplace (Part 24)', icon: Compass },
  { module: 'api-gateway', label: 'API Gateway & Hub (Part 25)', icon: Network },
  { module: 'customer-loyalty', label: 'Customer 360 & Loyalty (Part 26)', icon: Crown },
  { module: 'enterprise-design-system', label: 'Website & Design System (Part 27)', icon: Palette },
  { module: 'enterprise-cms', label: 'Headless CMS & Knowledge (Part 28)', icon: FileText },
  { module: 'crm-sales', label: 'CRM & Sales Automation (Part 29)', icon: Target },
  { module: 'erp-finance', label: 'ERP & Finance Operations (Part 30)', icon: Calculator },
  { module: 'hr-management', label: 'HRMS & Employee Intelligence (Part 31)', icon: Users },
  { module: 'ai-agent-ecosystem', label: 'AI Agent Ecosystem (Part 32)', icon: Bot },
  { module: 'product-roadmap', label: 'Product Roadmap & MVP (Part 33)', icon: Rocket },
  { module: 'investor-deck', label: 'Investor Deck & Valuation (Part 34)', icon: Briefcase },
  { module: 'cybersecurity-infrastructure', label: 'Cybersecurity & Infrastructure (Part 36)', icon: ShieldCheck },
  { module: 'data-platform', label: 'Data Platform & AI Decision (Part 37)', icon: BarChart3 },
  { module: 'mobile-superapp', label: 'Mobile Super App (Part 38)', icon: Smartphone },
  { module: 'b2b-marketplace', label: 'B2B Travel Marketplace (Part 39)', icon: Globe },
  { module: 'growth-marketing', label: 'Global Marketing & Growth (Part 40)', icon: TrendingUp },
  { module: 'customer-support', label: 'Customer Support & AI Contact Center (Part 41)', icon: Headphones },
  { module: 'international-expansion', label: 'International Expansion & Partnerships (Part 42)', icon: Globe },
  { module: 'innovation-lab', label: 'Innovation Lab & Future Tech (Part 43)', icon: Sparkles },
  { module: 'enterprise-blueprint', label: 'Final Master Enterprise Blueprint (Part 44)', icon: Rocket },
];

export function QuickServiceModuleBar({ activeModule, onModuleChange }: QuickServiceModuleBarProps) {
  return (
    <nav aria-label="Journey Expert service modules" className="bg-white/95 border-y border-[#ECECEC] py-3.5 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 sm:gap-4 text-xs font-bold">
        {SERVICES.map(({ module, label, icon: Icon }) => (
          <button
            key={module}
            type="button"
            aria-pressed={activeModule === module}
            onClick={() => onModuleChange(module)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              activeModule === module
                ? 'bg-[#093F31] text-white shadow-md border border-[#C7A44D]/30'
                : 'text-[#666666] hover:text-[#093F31] hover:bg-[#F8FAF9]'
            }`}
          >
            <Icon className="w-4 h-4 text-[#C7A44D]" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
