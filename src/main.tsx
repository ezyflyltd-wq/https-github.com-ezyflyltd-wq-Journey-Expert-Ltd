import { StrictMode, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './firebase/authContext.tsx';
import './index.css';

import { CookieConsent } from './components/CookieConsent';

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
        <CookieConsent />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
