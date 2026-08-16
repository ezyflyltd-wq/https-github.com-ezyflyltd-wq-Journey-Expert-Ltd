import React, { useState } from 'react';
import { HeroSection3D } from './HeroSection3D';
import { AITravelAssistantSection } from './AITravelAssistantSection';
import { CoreServicesSection } from './CoreServicesSection';
import { GlobalJourneySection } from './GlobalJourneySection';
import { StudyAbroad3DSection } from './StudyAbroad3DSection';
import { VisaJourneySection } from './VisaJourneySection';
import { TrustMetricsSection } from './TrustMetricsSection';
import { WhyJourneyExpertSection } from './WhyJourneyExpertSection';
import { CinematicCTASection } from './CinematicCTASection';
import { DestinationDetailModal } from './DestinationDetailModal';
import { DestinationPoint } from './InteractiveGlobe3D';
import { MainViewModule } from '../../types';

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
  const [selectedDestination, setSelectedDestination] = useState<DestinationPoint | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDestination = (dest: DestinationPoint) => {
    setSelectedDestination(dest);
    setIsDetailModalOpen(true);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('core-services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigateToModule('flights');
    }
  };

  return (
    <div className="bg-[#081C15] text-white selection:bg-[#0B5D3B] selection:text-white">
      {/* 1. Cinematic 3D Hero Section */}
      <HeroSection3D
        onExploreJourney={handleScrollToServices}
        onOpenAIModal={onOpenAIModal}
        onNavigateToModule={(mod) => onNavigateToModule(mod as MainViewModule)}
        onSearchFlights={onSearchFlights}
      />

      {/* 2. Interactive AI Travel Assistant Section */}
      <AITravelAssistantSection
        onOpenFullAIModal={onOpenAIModal}
        onNavigateToModule={(mod) => onNavigateToModule(mod as MainViewModule)}
      />

      {/* 3. Core Services Section */}
      <div id="core-services-section">
        <CoreServicesSection
          onSelectService={(mod) => onNavigateToModule(mod as MainViewModule)}
        />
      </div>

      {/* 4. Global Journey Section (From Dhaka to the World) */}
      <GlobalJourneySection
        onSelectDestination={handleOpenDestination}
        onNavigateToModule={(mod) => onNavigateToModule(mod as MainViewModule)}
      />

      {/* 5. Study Abroad 3D Section (Your Future Has No Border) */}
      <StudyAbroad3DSection
        onExploreStudyAbroad={() => onNavigateToModule('study-abroad')}
        onTalkToCounselor={onOpenAIModal}
      />

      {/* 6. Visa Section (Visas Without The Confusion) */}
      <VisaJourneySection
        onCheckVisaOptions={() => onNavigateToModule('visa')}
      />

      {/* 7. Trust & Metrics Section */}
      <TrustMetricsSection />

      {/* 8. Why Journey Expert Section */}
      <WhyJourneyExpertSection
        onExplore={() => onNavigateToModule('business-units')}
      />

      {/* 9. Final Cinematic CTA Section */}
      <CinematicCTASection
        onStartJourney={() => onNavigateToModule('flights')}
        onTalkToAI={onOpenAIModal}
      />

      {/* Global Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onNavigateToModule={(mod) => onNavigateToModule(mod as MainViewModule)}
      />
    </div>
  );
};
