import type { ReactNode } from 'react';
import { SERVICE_RELATED_LINKS, SERVICE_ROUTE_COPY, type ServiceRoute } from './routeCopy';

type ServiceRouteShellProps = {
  route: ServiceRoute;
  children: ReactNode;
};

export function ServiceRouteShell({
  route,
  children,
}: ServiceRouteShellProps) {
  const copy = SERVICE_ROUTE_COPY[route];
  const titleId = `${route}-route-title`;

  return (
    <section
      data-route-shell={route}
      aria-labelledby={titleId}
      className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
    >
      <header className="max-w-3xl">
        <h1
          id={titleId}
          className="text-3xl font-semibold leading-tight tracking-tight text-[#093F31] sm:text-4xl"
        >
          {copy.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#52615B]">
          {copy.intro}
        </p>
      </header>

      <nav
        aria-label="Related Journey Expert services"
        className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-y border-[#E5ECE8] py-3 text-sm font-semibold text-[#0B6B53]"
      >
        <span className="text-[#52615B]">Continue your journey:</span>
        {SERVICE_RELATED_LINKS.filter((link) => link.href !== `/${route}`).map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="underline decoration-[#C7A44D]/60 underline-offset-4 hover:text-[#093F31]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div
        className="mt-8 min-h-[520px]"
        data-heavy-widget-slot={route}
      >
        {children}
      </div>
    </section>
  );
}
