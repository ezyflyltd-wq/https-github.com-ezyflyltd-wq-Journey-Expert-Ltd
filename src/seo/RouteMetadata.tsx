import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getModuleForPath, getPortalForPath, normalizePath } from '../routing/routes';
import { MainViewModule } from '../types';

const SITE_URL = 'https://journeyexpertltd.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.svg`;

interface RouteSeo {
  title: string;
  description: string;
  type?: 'website' | 'service';
  noindex?: boolean;
  keywords?: string;
}

const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Journey Expert Ltd. | AI Travel, Visa & Global Mobility',
    description: 'AI-powered travel, visa consultancy, study-abroad, Hajj and Umrah, and global mobility services from Bangladesh.',
    keywords: 'Bangladesh travel agency, flights, visa consultancy, study abroad, Hajj Umrah, global mobility',
  },
  '/flights': {
    title: 'Flight Search from Bangladesh | Journey Expert Ltd.',
    description: 'Explore flight-search assistance from Bangladesh for international and domestic journeys with Journey Expert Ltd.',
    type: 'service',
    keywords: 'flight search Bangladesh, Dhaka flights, international airfare, travel agency',
  },
  '/hotels': {
    title: 'Halal Hotels and Accommodation | Journey Expert Ltd.',
    description: 'Discover halal-friendly hotel and accommodation planning for international travel, holidays, and pilgrimage journeys.',
    type: 'service',
    keywords: 'halal hotels, hotel booking Bangladesh, Muslim-friendly accommodation',
  },
  '/packages': {
    title: 'Tour Packages and Holidays | Journey Expert Ltd.',
    description: 'Explore curated tours, holidays, family travel, luxury experiences, and custom itineraries from Journey Expert Ltd.',
    type: 'service',
    keywords: 'tour packages Bangladesh, holidays, custom travel itinerary',
  },
  '/visa': {
    title: 'Visa Consultancy and Application Support | Journey Expert Ltd.',
    description: 'Get structured visa consultancy, document preparation, checklist review, and application support for global destinations.',
    type: 'service',
    keywords: 'visa consultancy Bangladesh, visa application support, UK visa, Canada visa, Schengen visa',
  },
  '/study-abroad': {
    title: 'Study Abroad and University Admissions | Journey Expert Ltd.',
    description: 'Explore study-abroad counseling, university admissions, scholarships, CAS and I-20 guidance, and student visa support.',
    type: 'service',
    keywords: 'study abroad Bangladesh, university admission, student visa, scholarships',
  },
  '/hajj-umrah': {
    title: 'Hajj and Umrah Travel Services | Journey Expert Ltd.',
    description: 'Explore faith-centered Hajj and Umrah travel planning, accommodation, transfers, and pilgrimage support.',
    type: 'service',
    keywords: 'Hajj packages Bangladesh, Umrah packages, Makkah Madinah travel',
  },
  '/healthcare-insurance': {
    title: 'Travel Healthcare and Insurance Support | Journey Expert Ltd.',
    description: 'Review travel healthcare, insurance, and medical-tourism support pathways for international journeys.',
    type: 'service',
  },
  '/concierge': {
    title: 'Airport Concierge and Meet & Greet | Journey Expert Ltd.',
    description: 'Explore airport meet-and-greet, fast-track, lounge, transfer, and concierge support services.',
    type: 'service',
  },
  '/craft-bangla': {
    title: 'Craft Bangla Heritage Marketplace | Journey Expert Ltd.',
    description: 'Discover Bangladesh heritage crafts, artisan stories, and responsible cultural marketplace concepts.',
    type: 'service',
  },
  '/corporate-travel': {
    title: 'Corporate Travel Management | Journey Expert Ltd.',
    description: 'Corporate travel planning, policy support, executive travel coordination, and global mobility assistance.',
    type: 'service',
  },
  '/dmc-marketplace': {
    title: 'DMC and Destination Marketplace | Journey Expert Ltd.',
    description: 'Explore destination-management, local supplier, guide, and wholesale travel marketplace capabilities.',
    type: 'service',
  },
  '/b2b-marketplace': {
    title: 'B2B Travel Marketplace | Journey Expert Ltd.',
    description: 'Explore B2B travel distribution, agency tools, wholesale travel services, and partner marketplace capabilities.',
    type: 'service',
  },
  '/mobile-apps': {
    title: 'Journey Expert Mobile Apps | Journey Expert Ltd.',
    description: 'Explore the Journey Expert mobile and super-app product experience for travel and global mobility.',
    type: 'service',
  },
  '/seo-growth': {
    title: 'SEO and Growth Platform | Journey Expert Ltd.',
    description: 'Explore Journey Expert’s search, content, growth, and digital marketing platform capabilities.',
    type: 'service',
  },
  '/customer-support': {
    title: 'Customer Support and AI Contact Center | Journey Expert Ltd.',
    description: 'Explore customer support, service requests, knowledge, and AI contact-center capabilities.',
    type: 'service',
  },
  '/international-expansion': {
    title: 'International Expansion and Partnerships | Journey Expert Ltd.',
    description: 'Explore Journey Expert’s international travel, partnership, and global mobility expansion capabilities.',
    type: 'service',
  },
  '/innovation-lab': {
    title: 'Innovation Lab and Future Mobility | Journey Expert Ltd.',
    description: 'Explore future mobility, travel technology, AI research, and innovation concepts from Journey Expert Ltd.',
    type: 'service',
  },
  '/business-units': {
    title: 'Journey Expert Business Units | Journey Expert Ltd.',
    description: 'Explore Journey Expert Ltd. business units across travel, education, mobility, technology, and support services.',
    type: 'service',
  },
  '/developer': {
    title: 'Developer and API Gateway | Journey Expert Ltd.',
    description: 'Explore Journey Expert API gateway, integration, developer, and partner technology concepts.',
    type: 'service',
  },
  '/knowledge': {
    title: 'Travel Knowledge and CMS | Journey Expert Ltd.',
    description: 'Explore destination knowledge, travel advisories, content management, and travel guidance capabilities.',
    type: 'service',
  },
  '/portals': {
    title: 'Journey Expert Portals Directory | Journey Expert Ltd.',
    description: 'Browse Journey Expert Ltd. travel, visa, study-abroad, AI, and enterprise portal experiences.',
    type: 'service',
  },
  '/ai/travel-planner': {
    title: 'AI Travel Planner | Journey Expert Ltd.',
    description: 'Explore AI-assisted travel planning, destination ideas, itinerary support, and visa guidance.',
    type: 'service',
  },
  '/ai-agent-ecosystem': {
    title: 'AI Agent Ecosystem | Journey Expert Ltd.',
    description: 'Explore Journey Expert’s AI assistant, automation, support, and intelligent-workforce concepts.',
    type: 'service',
  },
  '/enterprise/blueprint': {
    title: 'Enterprise Travel Platform Blueprint | Journey Expert Ltd.',
    description: 'Explore the Journey Expert enterprise travel, mobility, AI, data, and operating-platform blueprint.',
    type: 'service',
  },
  '/enterprise/design-system': {
    title: 'Website and Design System | Journey Expert Ltd.',
    description: 'Explore the Journey Expert website experience, design system, brand tokens, and interface standards.',
    type: 'service',
  },
  '/enterprise/cms-knowledge': {
    title: 'Headless CMS and Travel Knowledge | Journey Expert Ltd.',
    description: 'Explore the Journey Expert content, knowledge, destination, and travel-advisory platform.',
    type: 'service',
  },
  '/analytics': {
    title: 'Business Intelligence Dashboard | Journey Expert Ltd.',
    description: 'Authorized Journey Expert business intelligence workspace.',
    noindex: true,
  },
  '/customer/loyalty': {
    title: 'Customer Loyalty Workspace | Journey Expert Ltd.',
    description: 'Authorized Journey Expert customer loyalty workspace.',
    noindex: true,
  },
  '/business/crm': {
    title: 'CRM and Sales Workspace | Journey Expert Ltd.',
    description: 'Authorized Journey Expert CRM and sales workspace.',
    noindex: true,
  },
  '/business/finance': {
    title: 'Finance Operations Workspace | Journey Expert Ltd.',
    description: 'Authorized Journey Expert finance operations workspace.',
    noindex: true,
  },
  '/business/hr': {
    title: 'HR Management Workspace | Journey Expert Ltd.',
    description: 'Authorized Journey Expert HR management workspace.',
    noindex: true,
  },
  '/roadmap': {
    title: 'Product Roadmap Workspace | Journey Expert Ltd.',
    description: 'Journey Expert internal product roadmap workspace.',
    noindex: true,
  },
  '/investors': {
    title: 'Investor Workspace | Journey Expert Ltd.',
    description: 'Journey Expert internal investor and valuation workspace.',
    noindex: true,
  },
  '/security': {
    title: 'Security and Infrastructure Workspace | Journey Expert Ltd.',
    description: 'Authorized Journey Expert security and infrastructure workspace.',
    noindex: true,
  },
  '/data-platform': {
    title: 'Data Platform Workspace | Journey Expert Ltd.',
    description: 'Authorized Journey Expert data platform workspace.',
    noindex: true,
  },
  '/mobile-superapp': {
    title: 'Mobile Super App Workspace | Journey Expert Ltd.',
    description: 'Journey Expert mobile super-app product workspace.',
    noindex: true,
  },
  '/growth-marketing': {
    title: 'Growth Marketing Workspace | Journey Expert Ltd.',
    description: 'Journey Expert internal growth marketing workspace.',
    noindex: true,
  },
  '/customer': {
    title: 'Customer Portal | Journey Expert Ltd.',
    description: 'Access Journey Expert customer bookings, documents, support, and account services.',
    noindex: true,
  },
  '/agent': {
    title: 'B2B Agent Portal | Journey Expert Ltd.',
    description: 'Access Journey Expert B2B agent services and account tools.',
    noindex: true,
  },
  '/admin': {
    title: 'Admin Control Center | Journey Expert Ltd.',
    description: 'Authorized Journey Expert operations and administration workspace.',
    noindex: true,
  },
  '/architecture': {
    title: 'Enterprise Architecture | Journey Expert Ltd.',
    description: 'Journey Expert enterprise architecture documentation workspace.',
    noindex: true,
  },
};

function getSeoForPath(pathname: string): RouteSeo {
  const normalized = normalizePath(pathname);
  const direct = ROUTE_SEO[normalized];
  if (direct) return direct;

  const portal = getPortalForPath(normalized);
  if (portal !== 'main') return ROUTE_SEO[`/${portal}`];

  const module = getModuleForPath(normalized);
  if (module) return ROUTE_SEO[MODULE_SEO_FALLBACKS[module]] || ROUTE_SEO['/'];

  return {
    title: 'Page Not Found | Journey Expert Ltd.',
    description: 'The requested Journey Expert Ltd. page could not be found.',
    noindex: true,
  };
}

const MODULE_SEO_FALLBACKS: Partial<Record<MainViewModule, string>> = {
  'bi-analytics': '/enterprise/blueprint',
  'customer-loyalty': '/customer',
  'crm-sales': '/corporate-travel',
  'erp-finance': '/enterprise/blueprint',
  'hr-management': '/enterprise/blueprint',
  'api-gateway': '/developer',
  'product-roadmap': '/enterprise/blueprint',
  'investor-deck': '/enterprise/blueprint',
  'cybersecurity-infrastructure': '/enterprise/blueprint',
  'data-platform': '/enterprise/blueprint',
  'mobile-superapp': '/mobile-apps',
  'growth-marketing': '/seo-growth',
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    const canonical = `${SITE_URL}${normalizePath(pathname)}`;
    const robots = seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', seo.type === 'service' ? 'website' : 'website');
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);
    upsertMeta('property', 'og:image:alt', 'Journey Expert Ltd. logo');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);
    if (seo.keywords) upsertMeta('name', 'keywords', seo.keywords);
    upsertCanonical(canonical);

    let jsonLd = document.head.querySelector<HTMLScriptElement>('script[data-route-jsonld]');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.dataset.routeJsonld = 'true';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': seo.type === 'service' ? 'Service' : 'WebSite',
      name: seo.title,
      description: seo.description,
      url: canonical,
      image: DEFAULT_IMAGE,
      provider: {
        '@type': 'TravelAgency',
        name: 'Journey Expert Ltd.',
        url: SITE_URL,
      },
    });
  }, [pathname]);

  return null;
}
