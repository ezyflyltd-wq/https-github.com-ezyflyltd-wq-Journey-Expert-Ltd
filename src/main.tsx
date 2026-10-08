import { lazy, StrictMode, Suspense, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './firebase/authContext.tsx';
import './index.css';

const CookieConsent = lazy(() => import('./components/CookieConsent').then(({ CookieConsent }) => ({ default: CookieConsent })));

function MetaPageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    let active = true;
    void import('./lib/metaPixel')
      .then(({ trackMetaPageView }) => {
        if (active) trackMetaPageView();
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [location.pathname, location.search]);

  return null;
}

void import('./lib/metaPixel')
  .then(({ initMetaPixel, installMetaOutboundTracking }) => {
    initMetaPixel();
    installMetaOutboundTracking();
  })
  .catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MetaPageViewTracker />
      <AuthProvider>
        <Suspense fallback={null}><CookieConsent /></Suspense>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
