import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './firebase/authContext.tsx';
import './index.css';
import { initMetaPixel, installMetaOutboundTracking } from './lib/metaPixel';

initMetaPixel();
installMetaOutboundTracking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

