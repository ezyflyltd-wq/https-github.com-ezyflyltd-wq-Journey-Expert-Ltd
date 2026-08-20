export type ServiceRoute = 'flights' | 'visa';

export const SERVICE_ROUTE_COPY: Record<
  ServiceRoute,
  { h1: string; intro: string }
> = {
  flights: {
    h1: 'Flight Search from Bangladesh',
    intro:
      'Explore flight-search assistance from Bangladesh for international and domestic journeys with Journey Expert Ltd.',
  },
  visa: {
    h1: 'Visa Consultancy and Application Support',
    intro:
      'Get structured visa consultancy, document preparation, checklist review, and application support for global destinations.',
  },
};

export const SERVICE_RELATED_LINKS = [
  { href: '/', label: 'Journey Expert Ltd. home' },
  { href: '/flights', label: 'Flight search from Bangladesh' },
  { href: '/visa', label: 'Visa consultancy and application support' },
  { href: '/study-abroad', label: 'Study abroad and university admissions' },
  { href: '/hajj-umrah', label: 'Hajj and Umrah travel services' },
] as const;
