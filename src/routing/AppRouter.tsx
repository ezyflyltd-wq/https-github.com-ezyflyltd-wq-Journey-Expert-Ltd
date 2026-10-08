import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';

const CookiePolicy = lazy(() => import('../components/CookiePolicy').then(({ CookiePolicy }) => ({ default: CookiePolicy })));

const ROUTE_PATHS = [
  '/',
  '/flights',
  '/hotels',
  '/packages',
  '/visa',
  '/study-abroad',
  '/business-units',
  '/craft-bangla',
  '/corporate-travel',
  '/ai/travel-planner',
  '/mobile-apps',
  '/seo-growth',
  '/analytics',
  '/healthcare-insurance',
  '/hajj-umrah',
  '/concierge',
  '/dmc-marketplace',
  '/developer',
  '/customer/loyalty',
  '/enterprise/design-system',
  '/enterprise/cms-knowledge',
  '/business/crm',
  '/business/finance',
  '/business/hr',
  '/ai-agent-ecosystem',
  '/roadmap',
  '/investors',
  '/security',
  '/data-platform',
  '/mobile-superapp',
  '/b2b-marketplace',
  '/growth-marketing',
  '/customer-support',
  '/international-expansion',
  '/innovation-lab',
  '/enterprise/blueprint',
  '/about',
  '/customer',
  '/agent',
  '/admin',
  '/architecture',
  '/ai/*',
  '/customer/*',
  '/agent/*',
  '/admin/*',
  '/architecture/*',
  '/business/*',
  '/enterprise/*',
  '/portals/*',
];

export function AppRouter() {
  return (
    <Routes>
      <Route path="/cookies" element={<Suspense fallback={<div className="p-8" aria-busy="true">Loading Cookie Policy…</div>}><CookiePolicy /></Suspense>} />
      {ROUTE_PATHS.map((path) => (
        <Fragment key={path}>
          <Route path={path} element={<App />} />
        </Fragment>
      ))}
      <Route path="*" element={<App />} />
    </Routes>
  );
}
