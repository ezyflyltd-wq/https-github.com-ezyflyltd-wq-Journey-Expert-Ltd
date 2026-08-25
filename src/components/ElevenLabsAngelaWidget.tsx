import { useEffect } from 'react';
import { normalizePath } from '../routing/routes';

const ANGELA_AGENT_ID = 'agent_5301m0w4hsxqeh29b7qe1cje6tzd';
const WIDGET_SCRIPT_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

const PUBLIC_WIDGET_PATHS = new Set([
  '/',
  '/flights',
  '/hotels',
  '/packages',
  '/visa',
  '/study-abroad',
  '/hajj-umrah',
  '/healthcare-insurance',
  '/concierge',
  '/craft-bangla',
  '/corporate-travel',
  '/dmc-marketplace',
  '/b2b-marketplace',
  '/mobile-apps',
  '/seo-growth',
  '/customer-support',
  '/international-expansion',
  '/innovation-lab',
  '/business-units',
  '/developer',
  '/ai/travel-planner',
  '/ai-agent-ecosystem',
  '/enterprise/blueprint',
  '/enterprise/design-system',
  '/enterprise/cms-knowledge',
]);

export function isPublicAngelaRoute(pathname: string): boolean {
  return PUBLIC_WIDGET_PATHS.has(normalizePath(pathname));
}

export function ElevenLabsAngelaWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;

    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }, []);

  return (
    <elevenlabs-convai
      agent-id={ANGELA_AGENT_ID}
      aria-label="Talk with Angela, Journey Expert Ltd.'s AI Concierge"
    />
  );
}
