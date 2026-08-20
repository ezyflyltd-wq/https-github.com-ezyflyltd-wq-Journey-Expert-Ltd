import type { ReactNode } from 'react';
import { SERVICE_ROUTE_COPY, type ServiceRoute } from './routeCopy';

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

      <div
        className="mt-8 min-h-[520px]"
        data-heavy-widget-slot={route}
      >
        {children}
      </div>
    </section>
  );
}
