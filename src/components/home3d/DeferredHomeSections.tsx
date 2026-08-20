import React, { useState } from 'react';
import { AITravelAssistantSection } from './AITravelAssistantSection';
import { CoreServicesSection } from './CoreServicesSection';
import { GlobalJourneySection } from './GlobalJourneySection';
import { StudyAbroad3DSection } from './StudyAbroad3DSection';
import { VisaJourneySection } from './VisaJourneySection';
import { TrustMetricsSection } from './TrustMetricsSection';
import { WhyJourneyExpertSection } from './WhyJourneyExpertSection';
import { CinematicCTASection } from './CinematicCTASection';
import { DestinationDetailModal } from './DestinationDetailModal';
import type { DestinationPoint } from './globeData';
import { MainViewModule } from '../../types';

interface DeferredHomeSectionsProps {
  onNavigateToModule: (module: MainViewModule) => void;
  onOpenAIModal: () => void;
}

export const DeferredHomeSections: React.FC<DeferredHomeSectionsProps> = ({
  onNavigateToModule,
  onOpenAIModal,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<DestinationPoint | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDestination = (destination: DestinationPoint) => {
    setSelectedDestination(destination);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <AITravelAssistantSection
        onOpenFullAIModal={onOpenAIModal}
        onNavigateToModule={(module) => onNavigateToModule(module as MainViewModule)}
      />

      <div id="core-services-section">
        <CoreServicesSection
          onSelectService={(module) => onNavigateToModule(module as MainViewModule)}
        />
      </div>

      <GlobalJourneySection
        onSelectDestination={handleOpenDestination}
        onNavigateToModule={(module) => onNavigateToModule(module as MainViewModule)}
      />

      <StudyAbroad3DSection
        onExploreStudyAbroad={() => onNavigateToModule('study-abroad')}
        onTalkToCounselor={onOpenAIModal}
      />

      <VisaJourneySection onCheckVisaOptions={() => onNavigateToModule('visa')} />

      <TrustMetricsSection />

      <WhyJourneyExpertSection onExplore={() => onNavigateToModule('business-units')} />

      <CinematicCTASection
        onStartJourney={() => onNavigateToModule('flights')}
        onTalkToAI={onOpenAIModal}
      />

      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onNavigateToModule={(module) => onNavigateToModule(module as MainViewModule)}
      />
    </>
  );
};
