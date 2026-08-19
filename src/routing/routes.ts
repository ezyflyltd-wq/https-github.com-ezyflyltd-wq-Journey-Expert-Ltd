import { MainViewModule, PortalType } from '../types';

export const MODULE_PATHS: Record<MainViewModule, string> = {
  home: '/',
  flights: '/flights',
  hotels: '/hotels',
  packages: '/packages',
  visa: '/visa',
  'study-abroad': '/study-abroad',
  'business-units': '/business-units',
  'craft-bangla': '/craft-bangla',
  corporate: '/corporate-travel',
  'ai-engine': '/ai/travel-planner',
  mobile: '/mobile-apps',
  'growth-seo': '/seo-growth',
  'bi-analytics': '/analytics',
  healthcare: '/healthcare-insurance',
  'hajj-umrah': '/hajj-umrah',
  concierge: '/concierge',
  'dmc-marketplace': '/dmc-marketplace',
  'api-gateway': '/developer',
  'customer-loyalty': '/customer/loyalty',
  'enterprise-design-system': '/enterprise/design-system',
  'enterprise-cms': '/enterprise/cms-knowledge',
  'crm-sales': '/business/crm',
  'erp-finance': '/business/finance',
  'hr-management': '/business/hr',
  'ai-agent-ecosystem': '/ai-agent-ecosystem',
  'product-roadmap': '/roadmap',
  'investor-deck': '/investors',
  'cybersecurity-infrastructure': '/security',
  'data-platform': '/data-platform',
  'mobile-superapp': '/mobile-superapp',
  'b2b-marketplace': '/b2b-marketplace',
  'growth-marketing': '/growth-marketing',
  'customer-support': '/customer-support',
  'international-expansion': '/international-expansion',
  'innovation-lab': '/innovation-lab',
  'enterprise-blueprint': '/enterprise/blueprint',
  about: '/about',
};

export const PORTAL_PATHS: Record<Exclude<PortalType, 'main'>, string> = {
  customer: '/customer',
  agent: '/agent',
  admin: '/admin',
  architecture: '/architecture',
};

export const ROUTE_PATHS = [
  ...Object.values(MODULE_PATHS),
  ...Object.values(PORTAL_PATHS),
  '/ai/*',
  '/customer/*',
  '/agent/*',
  '/admin/*',
  '/architecture/*',
  '/business/*',
  '/enterprise/*',
  '/portals/*',
];

const PATH_TO_MODULE = new Map(
  Object.entries(MODULE_PATHS).map(([module, path]) => [path, module as MainViewModule]),
);

const LEGACY_HASH_PATHS: Record<string, string> = Object.fromEntries(
  Object.entries(MODULE_PATHS).map(([module, path]) => [module, path]),
);

Object.assign(LEGACY_HASH_PATHS, PORTAL_PATHS);

export function getPathForModule(module: MainViewModule): string {
  return MODULE_PATHS[module] || '/';
}

export function getPathForPortal(portal: PortalType): string {
  return portal === 'main' ? '/' : PORTAL_PATHS[portal];
}

export function getModuleForPath(pathname: string): MainViewModule | null {
  const normalized = normalizePath(pathname);
  return PATH_TO_MODULE.get(normalized) || null;
}

export function getPortalForPath(pathname: string): PortalType {
  const normalized = normalizePath(pathname);

  // `/customer/loyalty` is a main-platform module; `/customer` is the authenticated portal.
  if (normalized === '/customer/loyalty') return 'main';

  for (const [portal, path] of Object.entries(PORTAL_PATHS) as Array<[Exclude<PortalType, 'main'>, string]>) {
    if (normalized === path || normalized.startsWith(`${path}/`)) {
      return portal;
    }
  }

  return 'main';
}

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

export function migrateLegacyHash(): boolean {
  if (typeof window === 'undefined' || !window.location.hash) return false;

  const legacyKey = decodeURIComponent(window.location.hash.slice(1)).replace(/^\//, '').trim();
  const replacement = LEGACY_HASH_PATHS[legacyKey];
  if (!replacement) return false;

  window.history.replaceState({}, document.title, `${replacement}${window.location.search}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  return true;
}
