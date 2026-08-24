import { lazy, Suspense, useState } from 'react';
import type { MainViewModule } from '../../types';

const QuickServiceModuleBar = lazy(() =>
  import('../QuickServiceModuleBar').then(({ QuickServiceModuleBar: Component }) => ({ default: Component })),
);

type DeferredQuickServiceModuleBarProps = {
  activeModule: MainViewModule;
  onModuleChange: (module: MainViewModule) => void;
};

const CORE_MODULES: Array<{ module: MainViewModule; label: string }> = [
  { module: 'flights', label: 'Flights' },
  { module: 'visa', label: 'Visa' },
  { module: 'study-abroad', label: 'Study Abroad' },
  { module: 'hotels', label: 'Hotels' },
  { module: 'hajj-umrah', label: 'Hajj & Umrah' },
];

export function DeferredQuickServiceModuleBar({
  activeModule,
  onModuleChange,
}: DeferredQuickServiceModuleBarProps) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <Suspense
        fallback={<nav aria-label="Journey Expert service modules" className="min-h-[96px] sm:min-h-[56px] bg-white border-y border-[#ECECEC]" />}
      >
        <QuickServiceModuleBar activeModule={activeModule} onModuleChange={onModuleChange} />
      </Suspense>
    );
  }

  return (
    <nav aria-label="Journey Expert service modules" className="min-h-[96px] sm:min-h-[56px] bg-white border-y border-[#ECECEC] px-3 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 text-xs font-bold">
        {CORE_MODULES.map(({ module, label }) => (
          <button
            key={module}
            type="button"
            aria-pressed={activeModule === module}
            onClick={() => onModuleChange(module)}
            className={`px-3 py-2 rounded-xl border transition-colors ${
              activeModule === module
                ? 'bg-[#093F31] border-[#093F31] text-white'
                : 'border-[#ECECEC] text-[#093F31] hover:bg-[#F8FAF9]'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="px-3 py-2 rounded-xl border border-[#C7A44D] text-[#6B5618] hover:bg-[#FFF9E8]"
        >
          All services
        </button>
      </div>
    </nav>
  );
}
