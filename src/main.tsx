import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './firebase/authContext.tsx';
import { MetaPixel } from './analytics/MetaPixel';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MetaPixel />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
