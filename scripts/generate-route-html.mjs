import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const siteUrl = 'https://journeyexpertltd.com';
const shell = await readFile(join(process.cwd(), 'dist', 'index.html'), 'utf8');

const publicRoutes = {
  '/': {
    title: 'Journey Expert Ltd. | AI Travel, Visa & Global Mobility',
    description: 'AI-powered travel, visa consultancy, study-abroad, Hajj and Umrah, and global mobility services from Bangladesh.',
    keywords: 'Bangladesh travel agency, flights, visa consultancy, study abroad, Hajj Umrah, global mobility',
    type: 'WebSite',
  },
  '/flights': {
    title: 'Flight Search from Bangladesh | Journey Expert Ltd.',
    description: 'Explore flight-search assistance from Bangladesh for international and domestic journeys with Journey Expert Ltd.',
    keywords: 'flight search Bangladesh, Dhaka flights, international airfare, travel agency',
    type: 'Service',
  },
  '/hotels': {
    title: 'Halal Hotels and Accommodation | Journey Expert Ltd.',
    description: 'Discover halal-friendly hotel and accommodation planning for international travel, holidays, and pilgrimage journeys.',
    keywords: 'halal hotels, hotel booking Bangladesh, Muslim-friendly accommodation',
    type: 'Service',
  },
  '/packages': {
    title: 'Tour Packages and Holidays | Journey Expert Ltd.',
    description: 'Explore curated tours, holidays, family travel, luxury experiences, and custom itineraries from Journey Expert Ltd.',
    keywords: 'tour packages Bangladesh, holidays, custom travel itinerary',
    type: 'Service',
  },
  '/visa': {
    title: 'Visa Consultancy and Application Support | Journey Expert Ltd.',
    description: 'Get structured visa consultancy, document preparation, checklist review, and application support for global destinations.',
    keywords: 'visa consultancy Bangladesh, visa application support, UK visa, Canada visa, Schengen visa',
    type: 'Service',
  },
  '/study-abroad': {
    title: 'Study Abroad and University Admissions | Journey Expert Ltd.',
    description: 'Explore study-abroad counseling, university admissions, scholarships, CAS and I-20 guidance, and student visa support.',
    keywords: 'study abroad Bangladesh, university admission, student visa, scholarships',
    type: 'Service',
  },
  '/hajj-umrah': {
    title: 'Hajj and Umrah Travel Services | Journey Expert Ltd.',
    description: 'Explore faith-centered Hajj and Umrah travel planning, accommodation, transfers, and pilgrimage support.',
    keywords: 'Hajj packages Bangladesh, Umrah packages, Makkah Madinah travel',
    type: 'Service',
  },
  '/healthcare-insurance': {
    title: 'Travel Healthcare and Insurance Support | Journey Expert Ltd.',
    description: 'Review travel healthcare, insurance, and medical-tourism support pathways for international journeys.',
    type: 'Service',
  },
  '/concierge': {
    title: 'Airport Concierge and Meet & Greet | Journey Expert Ltd.',
    description: 'Explore airport meet-and-greet, fast-track, lounge, transfer, and concierge support services.',
    type: 'Service',
  },
  '/craft-bangla': {
    title: 'Craft Bangla Heritage Marketplace | Journey Expert Ltd.',
    description: 'Discover Bangladesh heritage crafts, artisan stories, and responsible cultural marketplace concepts.',
    type: 'Service',
  },
  '/corporate-travel': {
    title: 'Corporate Travel Management | Journey Expert Ltd.',
    description: 'Corporate travel planning, policy support, executive travel coordination, and global mobility assistance.',
    type: 'Service',
  },
  '/dmc-marketplace': {
    title: 'DMC and Destination Marketplace | Journey Expert Ltd.',
    description: 'Explore destination-management, local supplier, guide, and wholesale travel marketplace capabilities.',
    type: 'Service',
  },
  '/b2b-marketplace': {
    title: 'B2B Travel Marketplace | Journey Expert Ltd.',
    description: 'Explore B2B travel distribution, agency tools, wholesale travel services, and partner marketplace capabilities.',
    type: 'Service',
  },
  '/mobile-apps': {
    title: 'Journey Expert Mobile Apps | Journey Expert Ltd.',
    description: 'Explore the Journey Expert mobile and super-app product experience for travel and global mobility.',
    type: 'Service',
  },
  '/seo-growth': {
    title: 'SEO and Growth Platform | Journey Expert Ltd.',
    description: 'Explore Journey Expert’s search, content, growth, and digital marketing platform capabilities.',
    type: 'Service',
  },
  '/customer-support': {
    title: 'Customer Support and AI Contact Center | Journey Expert Ltd.',
    description: 'Explore customer support, service requests, knowledge, and AI contact-center capabilities.',
    type: 'Service',
  },
  '/international-expansion': {
    title: 'International Expansion and Partnerships | Journey Expert Ltd.',
    description: 'Explore Journey Expert’s international travel, partnership, and global mobility expansion capabilities.',
    type: 'Service',
  },
  '/innovation-lab': {
    title: 'Innovation Lab and Future Mobility | Journey Expert Ltd.',
    description: 'Explore future mobility, travel technology, AI research, and innovation concepts from Journey Expert Ltd.',
    type: 'Service',
  },
  '/business-units': {
    title: 'Journey Expert Business Units | Journey Expert Ltd.',
    description: 'Explore Journey Expert Ltd. business units across travel, education, mobility, technology, and support services.',
    type: 'Service',
  },
  '/developer': {
    title: 'Developer and API Gateway | Journey Expert Ltd.',
    description: 'Explore Journey Expert API gateway, integration, developer, and partner technology concepts.',
    type: 'Service',
  },
  '/ai/travel-planner': {
    title: 'AI Travel Planner | Journey Expert Ltd.',
    description: 'Explore AI-assisted travel planning, destination ideas, itinerary support, and visa guidance.',
    type: 'Service',
  },
  '/ai-agent-ecosystem': {
    title: 'AI Agent Ecosystem | Journey Expert Ltd.',
    description: 'Explore Journey Expert’s AI assistant, automation, support, and intelligent-workforce concepts.',
    type: 'Service',
  },
  '/enterprise/blueprint': {
    title: 'Enterprise Travel Platform Blueprint | Journey Expert Ltd.',
    description: 'Explore the Journey Expert enterprise travel, mobility, AI, data, and operating-platform blueprint.',
    type: 'Service',
  },
  '/enterprise/design-system': {
    title: 'Website and Design System | Journey Expert Ltd.',
    description: 'Explore the Journey Expert website experience, design system, brand tokens, and interface standards.',
    type: 'Service',
  },
  '/enterprise/cms-knowledge': {
    title: 'Headless CMS and Travel Knowledge | Journey Expert Ltd.',
    description: 'Explore the Journey Expert content, knowledge, destination, and travel-advisory platform.',
    type: 'Service',
  },
};

const internalRoutes = {
  '/analytics': 'Business Intelligence Dashboard',
  '/customer/loyalty': 'Customer Loyalty Workspace',
  '/business/crm': 'CRM and Sales Workspace',
  '/business/finance': 'Finance Operations Workspace',
  '/business/hr': 'HR Management Workspace',
  '/roadmap': 'Product Roadmap Workspace',
  '/investors': 'Investor Workspace',
  '/security': 'Security and Infrastructure Workspace',
  '/data-platform': 'Data Platform Workspace',
  '/mobile-superapp': 'Mobile Super App Workspace',
  '/growth-marketing': 'Growth Marketing Workspace',
  '/customer': 'Customer Portal',
  '/agent': 'B2B Agent Portal',
  '/admin': 'Admin Control Center',
  '/architecture': 'Enterprise Architecture',
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function metadataFor(route) {
  if (publicRoutes[route]) return { ...publicRoutes[route], noindex: false };
  if (internalRoutes[route]) {
    return {
      title: `${internalRoutes[route]} | Journey Expert Ltd.`,
      description: `Authorized Journey Expert Ltd. ${internalRoutes[route].toLowerCase()}.`,
      noindex: true,
      type: 'WebPage',
    };
  }
  return {
    title: 'Page Not Found | Journey Expert Ltd.',
    description: 'The requested Journey Expert Ltd. page could not be found.',
    noindex: true,
    type: 'WebPage',
  };
}

const relatedLinks = [
  { href: '/', label: 'Journey Expert Ltd. home' },
  { href: '/flights', label: 'Flight search from Bangladesh' },
  { href: '/visa', label: 'Visa consultancy and application support' },
  { href: '/study-abroad', label: 'Study abroad and university admissions' },
  { href: '/hajj-umrah', label: 'Hajj and Umrah travel services' },
];

function staticContentFor(route, seo) {
  if (seo.noindex) return '';

  const heading = seo.title.split(' | ')[0];
  const links = relatedLinks
    .filter((link) => link.href !== route)
    .slice(0, 5)
    .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
    .join('');

  return `<main id="seo-static-content" class="seo-static-content">
    <h1>${escapeHtml(heading)}</h1>
    <p>${escapeHtml(seo.description)}</p>
    <nav aria-label="Related Journey Expert services">
      <h2>Explore Journey Expert services</h2>
      <ul>${links}</ul>
    </nav>
  </main>`;
}

function renderRoute(route) {
  const seo = metadataFor(route);
  const canonical = `${siteUrl}${route}`;
  const robots = seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': seo.type,
    name: seo.title,
    description: seo.description,
    url: canonical,
    image: `${siteUrl}/logo.svg`,
    provider: {
      '@type': 'TravelAgency',
      name: 'Journey Expert Ltd.',
      url: siteUrl,
    },
  });

  return shell
    .replace('<div id="root"></div>', `<div id="root">${staticContentFor(route, seo)}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`)
    .replace(/<meta\n\s+name="description"\n\s+content="[^"]*"\n\s+\/>/, `<meta name="description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta property="og:description"\n\s+content="[^"]*"\n\s+\/>/, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta name="twitter:description"\n\s+content="[^"]*"\n\s+\/>/, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${jsonLd}</script>`);
}

for (const route of Object.keys({ ...publicRoutes, ...internalRoutes })) {
  const target = route === '/' ? join(process.cwd(), 'dist', 'index.html') : join(process.cwd(), 'dist', `${route}.html`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderRoute(route));
}

console.log(`Generated ${Object.keys({ ...publicRoutes, ...internalRoutes }).length} route HTML files.`);
