import { site } from '../data/site.js';

// --- small helpers -------------------------------------------------------

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const attr = (s) => esc(s).replace(/'/g, '&#39;');

/** "2026-10-01" -> "October 1, 2026" */
export const longDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
};

/** "16:30" -> "4:30pm" */
export const clock = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const ap = h >= 12 ? 'pm' : 'am';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hr}${ap}` : `${hr}:${String(m).padStart(2, '0')}${ap}`;
};

// --- inline icon set (no icon font, no network request) ------------------

const ICONS = {
  brake: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5"/>',
  wrench: '<path d="M20.4 5.6a5 5 0 0 1-6.6 6.6l-6.2 6.2a2 2 0 1 1-2.8-2.8l6.2-6.2a5 5 0 0 1 6.6-6.6l-3 3 2.8 2.8z"/>',
  engine: '<path d="M6 9h3l2-2h4l1.5 2H20v6h-2v3H9l-3-3H4V9z"/><path d="M12 5h4M9 9v6"/>',
  climate: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>',
  bolt: '<path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/>',
  suspension: '<path d="M12 3v3M12 18v3"/><path d="M8 6h8M8 18h8"/><path d="M9 7.5 15 10.5 9 13.5 15 16.5"/>',
  wifi: '<path d="M2.5 8.5a15 15 0 0 1 19 0M5.5 12a10.5 10.5 0 0 1 13 0M8.5 15.5a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1.2"/>',
  cup: '<path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/><path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M7 4.5v1.5M11 3.5v2.5"/>',
  chair: '<path d="M7 4h10v8H7z"/><path d="M5 12h14v4H5z"/><path d="M7 16v4M17 16v4"/>',
  key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M17.5 12v3.5M20.5 12v2.5"/>',
  phone: '<path d="M6 3h3l2 5-2.2 1.4a12 12 0 0 0 5.8 5.8L16 13l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  star: '<path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3z"/>',
  shield: '<path d="M12 3 5 6v6c0 4.4 3 7.9 7 9 4-1.1 7-4.6 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5z"/>',
  scan: '<path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3"/><path d="M7.5 12h9"/>',
  calendar: '<path d="M4 6h16v14H4z"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  car: '<path d="M4 15h16v3h-3v-3M7 18v-3"/><path d="M5.5 15 7 9.5h10L18.5 15"/><circle cx="7.5" cy="18" r="1.6"/><circle cx="16.5" cy="18" r="1.6"/>',
};

export function icon(name, cls = '') {
  const path = ICONS[name] || ICONS.check;
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
}

// --- responsive images ---------------------------------------------------
// Full-bleed photography is served at the size the viewport actually needs.
// `natural` is the real intrinsic width, so we never advertise an upscale.
const VARIANTS = {
  'hero-audi': { widths: [480, 900], natural: 1600 },
  'hero-tires': { widths: [480, 900], natural: 1800 },
  'photo-workshop': { widths: [480], natural: 763 },
};
const BANNER_DEFAULT = { widths: [480], natural: 763 };

/** srcset/sizes attributes for a full-width image, or '' if it has no variants. */
export function responsive(src, sizes = '100vw') {
  const m = /^\/assets\/img\/([\w-]+)\.webp$/.exec(src || '');
  if (!m) return '';
  const name = m[1];
  const v = VARIANTS[name] || (name.startsWith('banner-') ? BANNER_DEFAULT : null);
  if (!v) return '';
  const set = [
    ...v.widths.map((w) => `/assets/img/${name}-${w}.webp ${w}w`),
    `${src} ${v.natural}w`,
  ].join(', ');
  return ` srcset="${set}" sizes="${sizes}"`;
}

// --- shared chrome -------------------------------------------------------

const stars = (n = 5) =>
  `<span class="stars" role="img" aria-label="${n} out of 5 stars">${icon('star').repeat(n)}</span>`;

export { stars };

function header(current) {
  const links = site.nav
    .map((n) => {
      const on = current === n.href || (n.href !== '/' && current.startsWith(n.href));
      return `<li><a href="${n.href}"${on ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`;
    })
    .join('');

  return `
<a class="skip" href="#main">Skip to content</a>

<div class="topbar">
  <div class="wrap topbar-in">
    <p class="topbar-hours">${icon('clock')}<span>Mon&ndash;Fri 8:00am&ndash;4:30pm &middot; Sat &amp; Sun closed</span></p>
    <p class="topbar-addr">
      <a href="${attr(site.mapsUrl)}" target="_blank" rel="noopener">${icon('pin')}<span>${esc(site.addressLine)}</span></a>
    </p>
  </div>
</div>

<header class="site-head" id="siteHead">
  <div class="wrap head-in">
    <a class="brand" href="/" aria-label="${attr(site.name)} home">
      <img class="brand-logo" src="${attr(site.logo.src)}" width="${site.logo.w}" height="${site.logo.h}"
           alt="${attr(site.name)}" fetchpriority="high" decoding="async">
      <span class="brand-sub">${esc(site.tagline)}</span>
    </a>

    <nav class="nav nav-desktop" aria-label="Main">
      <ul>${links}</ul>
    </nav>

    <div class="head-cta">
      <a class="btn btn-ghost phone-btn" href="${attr(site.phoneHref)}">${icon('phone')}<span>${esc(site.phone)}</span></a>
      <a class="btn btn-accent" href="/appointments/">Book service</a>
    </div>

    <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- Deliberately a sibling of <header>, not a child. A position:fixed panel
     nested inside the sticky header gets clipped to the header box in WebKit,
     which left the mobile menu opening into an empty strip on iOS Safari. -->
<div class="drawer" id="drawer">
  <div class="drawer-scrim" data-close></div>
  <nav class="drawer-panel" aria-label="Mobile navigation">
    <button class="drawer-close" type="button" data-close aria-label="Close menu">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <ul>${links}</ul>
  </nav>
</div>`;
}

function footer() {
  const svcLinks = `<li><a href="/services/">All services</a></li>` +
    // keep the footer tight: first five, then the index
    [];
  void svcLinks;

  const hourRows = site.hours
    .map((h) => `<tr><th scope="row">${esc(h.day)}</th><td>${h.closed ? 'Closed' : `${clock(h.open)}&ndash;${clock(h.close)}`}</td></tr>`)
    .join('');

  return `
<footer class="site-foot">
  <div class="wrap foot-grid">
    <div class="foot-col foot-brand">
      <a class="brand brand-foot" href="/">
        <img class="brand-logo" src="${attr(site.logo.src)}" width="${site.logo.w}" height="${site.logo.h}"
             alt="${attr(site.name)}" loading="lazy" decoding="async">
      </a>
      <p class="foot-blurb">Independent auto repair in Sanger, California. All makes and models welcome, with ${esc(site.specialties.join(', '))} as our speciality.</p>
      <p class="foot-rating">${stars(5)} <strong>${esc(site.rating.value)}</strong> from ${site.rating.count} verified reviews</p>
      <a class="foot-social" href="${attr(site.facebook)}" target="_blank" rel="noopener">Follow us on Facebook</a>
    </div>

    <div class="foot-col">
      <h2>Services</h2>
      <ul class="foot-links">
        <li><a href="/services/brake-service/">Brakes</a></li>
        <li><a href="/services/engine-auto-service/">Engine &amp; diagnostics</a></li>
        <li><a href="/services/heating-and-air-conditioner-repair/">Heating &amp; A/C</a></li>
        <li><a href="/services/auto-electrical-services/">Electrical</a></li>
        <li><a href="/services/transmission-service/">Transmission</a></li>
        <li><a href="/services/suspension-service/">Suspension</a></li>
        <li><a href="/services/standard-maintenance-auto-service/">Maintenance</a></li>
      </ul>
    </div>

    <div class="foot-col">
      <h2>Shop</h2>
      <ul class="foot-links">
        <li><a href="/appointments/">Book an appointment</a></li>
        <li><a href="/vehicles-we-service/">Vehicles we service</a></li>
        <li><a href="/specials/">Current specials</a></li>
        <li><a href="/rebates/">California A/C rebate</a></li>
        <li><a href="/reviews/">Customer reviews</a></li>
        <li><a href="/contact/">Contact us</a></li>
        <li><a href="/sitemap/">Site map</a></li>
      </ul>
    </div>

    <div class="foot-col">
      <h2>Visit us</h2>
      <address class="foot-nap">
        <a href="${attr(site.mapsUrl)}" target="_blank" rel="noopener">${esc(site.street)}<br>${esc(site.city)}, ${esc(site.state)} ${esc(site.zip)}</a>
        <a class="foot-tel" href="${attr(site.phoneHref)}">${esc(site.phone)}</a>
      </address>
      <table class="hours-table">
        <caption class="sr-only">Opening hours</caption>
        <tbody>${hourRows}</tbody>
      </table>
    </div>
  </div>

  <div class="wrap foot-pay">
    <h2 class="sr-only">Payment methods accepted</h2>
    <p>We accept</p>
    <ul>
      ${site.payments
        .map((m) => `<li><img src="${attr(m.img)}" alt="${attr(m.label)}" width="91" height="61" loading="lazy" decoding="async"></li>`)
        .join('')}
    </ul>
  </div>

  <div class="wrap foot-legal">
    <p>&copy; <span data-year>2026</span> ${esc(site.name)}. All rights reserved.</p>
    <p><a href="/privacy-policy/">Privacy policy</a> &middot; <a href="/sitemap/">Site map</a></p>
  </div>
</footer>

<a class="fab-call" href="${attr(site.phoneHref)}" aria-label="Call ${attr(site.name)} on ${attr(site.phone)}">
  ${icon('phone')}<span>Call now</span>
</a>
<a class="fab-book" href="/appointments/">
  ${icon('calendar')}<span>Book</span>
</a>`;
}

// --- structured data -----------------------------------------------------

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': site.origin + '/#shop',
    name: site.name,
    description: `Independent European auto repair and full-service mechanic in Sanger, CA. Specialists in ${site.specialties.join(', ')}.`,
    url: site.origin + '/',
    telephone: site.phone,
    priceRange: '$$',
    image: site.origin + site.ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.hours
      .filter((h) => !h.closed)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.open,
        closes: h.close,
      })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: '5',
    },
    sameAs: [site.facebook],
    areaServed: ['Sanger, CA', 'Fresno, CA', 'Clovis, CA', 'Reedley, CA', 'Parlier, CA', 'Del Rey, CA'],
  };
}

// --- the page shell ------------------------------------------------------

export function layout({ path, title, description, body, schema = [], bodyClass = '' }) {
  const canonical = site.origin + path;
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const blocks = [localBusinessSchema(), ...schema]
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${attr(canonical)}">
<meta name="theme-color" content="#0d1117" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(site.name)}">
<meta property="og:title" content="${attr(fullTitle)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:image" content="${attr(site.origin + site.ogImage)}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" as="style" href="/assets/css/site.css">
<link rel="stylesheet" href="/assets/css/site.css">
${path === '/' ? `<link rel="preload" as="image" href="${attr(site.hero)}" imagesrcset="/assets/img/hero-audi-480.webp 480w, /assets/img/hero-audi-900.webp 900w, ${attr(site.hero)} 1600w" imagesizes="100vw" fetchpriority="high">` : ''}
${blocks}
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}
