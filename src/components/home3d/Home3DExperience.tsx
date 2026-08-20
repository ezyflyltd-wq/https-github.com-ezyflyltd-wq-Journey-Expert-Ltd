import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { HeroSection3D } from './HeroSection3D';
import { MainViewModule } from '../../types';

const DeferredHomeSections = lazy(() =>
  import('./DeferredHomeSections').then(({ DeferredHomeSections: Component }) => ({ default: Component })),
);

interface Home3DExperienceProps {
  onNavigateToModule: (module: MainViewModule) => void;
  onOpenAIModal: () => void;
  onSearchFlights?: (origin: string, destination: string, gds: string) => void;
}

export const Home3DExperience: React.FC<Home3DExperienceProps> = ({
  onNavigateToModule,
  onOpenAIModal,
  onSearchFlights,
}) => {
  const [belowFoldReady, setBelowFoldReady] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pendingServicesScroll = useRef(false);

  useEffect(() => {
    if (belowFoldReady) return;

    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      setBelowFoldReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBelowFoldReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -25% 0px' },
    );
    const fallbackTimer = window.setTimeout(() => setBelowFoldReady(true), 4500);

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [belowFoldReady]);

  useEffect(() => {
    if (!belowFoldReady || !pendingServicesScroll.current) return;

    pendingServicesScroll.current = false;
    window.requestAnimationFrame(() => {
      document.getElementById('core-services-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [belowFoldReady]);

  const handleScrollToServices = () => {
    pendingServicesScroll.current = true;
    setBelowFoldReady(true);
  };

  return (
    <div className="bg-[#081C15] text-white selection:bg-[#0B5D3B] selection:text-white">
      <HeroSection3D
        onExploreJourney={handleScrollToServices}
        onOpenAIModal={onOpenAIModal}
        onNavigateToModule={(module) => onNavigateToModule(module as MainViewModule)}
        onSearchFlights={onSearchFlights}
      />

      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

      {belowFoldReady ? (
        <Suspense
          fallback={
            <div className="min-h-[240px] bg-[#081C15]" aria-label="Loading Journey Expert services" />
          }
        >
          <DeferredHomeSections
            onNavigateToModule={onNavigateToModule}
            onOpenAIModal={onOpenAIModal}
          />
        </Suspense>
      ) : null}
    </div>
  );
};
