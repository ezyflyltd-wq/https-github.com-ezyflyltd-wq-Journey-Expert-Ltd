import { lazy } from 'react';
import type { MainViewModule, PortalType } from '../../types';
import { DeferredServiceWidget } from './DeferredServiceWidget';

const Footer = lazy(() =>
  import('../Footer').then(({ Footer: Component }) => ({ default: Component })),
);

type DeferredFooterProps = {
  onPortalChange: (portal: PortalType) => void;
  onModuleChange: (module: MainViewModule) => void;
};

export function DeferredFooter({ onPortalChange, onModuleChange }: DeferredFooterProps) {
  return (
    <DeferredServiceWidget
      fallback={<div className="min-h-[240px] bg-[#F8FAF9]" aria-hidden="true" />}
    >
      <Footer onPortalChange={onPortalChange} onModuleChange={onModuleChange} />
    </DeferredServiceWidget>
  );
}
