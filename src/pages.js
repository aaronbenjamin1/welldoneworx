import { site, services, makes, makeGroups, reviews, specials, faqs } from './data/site.js';
import { esc, attr, icon, stars, longDate, clock, responsive } from './templates/layout.js';
import {
  breadcrumbs, breadcrumbSchema, pageHead, serviceGrid, serviceCard,
  reviewGrid, reviewCard, reviewSchema, amenities, faqBlock, faqSchema,
  ctaBand, form, mapEmbed, section,
} from './templates/components.js';

const pages = [];
const add = (p) => pages.push(p);

// =========================================================================
// Home
// =========================================================================

const featuredMakes = makes.filter((m) => m.featured);

// Vehicle photography carried over from the old site. Makes without a photo of
// their own fall back to the line icon rather than borrowing another marque's.
const MAKE_PHOTO = {
  bmw: '/assets/img/make-bmw.webp',
  audi: '/assets/img/hero-audi.webp',
  'mercedes-benz': '/assets/img/make-mercedes.webp',
  volkswagen: '/assets/img/make-volkswagen.webp',
};

add({
  path: '/',
  title: 'European Auto Repair in Sanger, CA | Well Done Worx',
  description:
    'Independent European auto repair in Sanger, CA. MINI, BMW, Audi and Porsche specialists servicing all makes. Honest diagnosis, written estimates, 5.0 stars from 40 verified reviews. Call (559) 801-3460.',
  bodyClass: 'is-home',
  body: `
<section class="hero">
  <img class="hero-bg" src="${site.hero}"${responsive(site.hero)} alt="" fetchpriority="high" decoding="async">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">${esc(site.city)}, ${esc(site.state)} &middot; Independent shop</p>
      <h1>European auto repair,<br class="br-lg"> <em>done properly</em>.</h1>
      <p class="lede">We diagnose before we quote, explain what we found, and only touch the car once you have approved the work. Specialists in ${esc(site.specialties.join(', '))} &mdash; and happy to service anything else in your driveway.</p>
      <div class="btn-row">
        <a class="btn btn-accent btn-lg" href="/appointments/">${icon('calendar')}Request an appointment</a>
        <a class="btn btn-outline btn-lg" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>
      </div>
      <div class="hero-proof">
        <p class="proof-rating">${stars(5)}<strong>${esc(site.rating.value)}</strong><span>from ${site.rating.count} verified reviews</span></p>
        <p class="proof-open" data-openstate>${icon('clock')}<span>Mon&ndash;Fri 8:00am&ndash;4:30pm</span></p>
      </div>
    </div>

    <aside class="hero-card" aria-label="Shop information">
      <h2>Visit the shop</h2>
      <ul class="hero-facts">
        <li>${icon('pin')}<a href="${attr(site.mapsUrl)}" target="_blank" rel="noopener">${esc(site.street)}<br>${esc(site.city)}, ${esc(site.state)} ${esc(site.zip)}</a></li>
        <li>${icon('phone')}<a href="${attr(site.phoneHref)}">${esc(site.phone)}</a></li>
        <li>${icon('clock')}<span>Mon&ndash;Fri 8:00am&ndash;4:30pm<br>Closed Saturday &amp; Sunday</span></li>
        <li>${icon('key')}<span>Before-hours key drop-off available</span></li>
      </ul>
      <a class="btn btn-ghost btn-block" href="/contact/">Directions &amp; contact</a>
    </aside>
  </div>
  <div class="hero-marquee" aria-hidden="true">
    <div class="marquee-track">
      ${[...featuredMakes, ...makes.filter((m) => ['Volkswagen', 'Mercedes-Benz', 'Volvo', 'Land Rover', 'Jaguar', 'Fiat'].includes(m.name))]
        .concat(featuredMakes)
        .map((m) => `<span>${esc(m.name)}</span>`)
        .join('')}
    </div>
  </div>
</section>

${section({
  cls: 'sec-svc',
  eyebrow: 'What we do',
  title: 'Service that covers the whole car',
  lede: 'Seven core service areas, all under one roof, all with the same approach: find the actual fault, price it honestly, fix it once.',
  body: serviceGrid() + `<p class="sec-foot"><a class="btn btn-outline" href="/services/">See all services ${icon('arrow')}</a></p>`,
})}

<section class="sec sec-why">
  <div class="wrap why-grid">
    <div class="why-copy">
      <img class="why-photo" src="/assets/img/photo-shop.webp" alt="" loading="lazy" decoding="async">
      <p class="eyebrow">Why Well Done Worx</p>
      <h2>Not every shop that <em>can</em> open the hood should</h2>
      <p>European vehicles need model-specific tooling, factory-level diagnostics and someone who has seen the failure before. That is where our training and our equipment budget go. It is also why customers bring us the jobs other shops turned away.</p>
      <p>You will get the same treatment whether you drive a Porsche or a work truck: a real diagnosis, a written estimate, and a straight answer about whether the repair is worth doing.</p>
      <div class="btn-row">
        <a class="btn btn-accent" href="/appointments/">Book a diagnosis</a>
        <a class="btn btn-link" href="/reviews/">Read the reviews ${icon('arrow')}</a>
      </div>
    </div>
    <ol class="why-list">
      <li>
        <span class="why-ic">${icon('scan')}</span>
        <h3>Diagnosis, not guesswork</h3>
        <p>Manufacturer-level scan tools, a lab scope and a smoke machine. We test the circuit the code points at instead of replacing parts and hoping.</p>
      </li>
      <li>
        <span class="why-ic">${icon('shield')}</span>
        <h3>Experienced, certified technicians</h3>
        <p>Years in European repair specifically, plus the everyday domestic and import work that keeps the Valley moving.</p>
      </li>
      <li>
        <span class="why-ic">${icon('chat')}</span>
        <h3>You approve every repair</h3>
        <p>Written estimate first, plain-English explanation of what we found, and no work beyond what you signed off.</p>
      </li>
      <li>
        <span class="why-ic">${icon('check')}</span>
        <h3>Quality parts, road tested</h3>
        <p>Correct specifications, torqued to factory values, and driven before it comes back to you.</p>
      </li>
    </ol>
  </div>
</section>

${section({
  cls: 'sec-makes',
  eyebrow: 'Vehicles we service',
  title: 'Specialists in four marques. Welcoming to all of them.',
  lede: 'MINI, BMW, Audi and Porsche are what we know best. Every other make on the road is still welcome in the bay.',
  body: `
<div class="featured-makes">
  ${featuredMakes
    .map(
      (m) => `<a class="card make-card" href="/vehicles-we-service/${m.slug}/">
    ${MAKE_PHOTO[m.slug]
      ? `<img class="make-img" src="${MAKE_PHOTO[m.slug]}" alt="" loading="lazy" decoding="async">`
      : `<span class="make-ic">${icon('car')}</span>`}
    <h3>${esc(m.name)}</h3>
    <p>${esc(m.note.split('. ')[0])}.</p>
    <span class="card-more">${esc(m.name)} service ${icon('arrow')}</span>
  </a>`
    )
    .join('')}
</div>
<p class="sec-foot"><a class="btn btn-outline" href="/vehicles-we-service/">All ${makes.length} makes we service ${icon('arrow')}</a></p>`,
})}

<section class="sec sec-amen">
  <div class="wrap amen-in">
    <div class="amen-copy">
      <p class="eyebrow">While you wait</p>
      <h2>A shop you do not mind sitting in</h2>
      <p>Short job? Stay. Long job? Drop the keys and we will call you. Either way, call ahead and we will let you know which one it is likely to be.</p>
    </div>
    ${amenities()}
  </div>
</section>

${section({
  cls: 'sec-rev',
  eyebrow: 'Customer reviews',
  title: `${site.rating.value} stars from ${site.rating.count} verified customers`,
  lede: 'Every review below came from a real repair order. Here is a sample of the most recent.',
  body: reviewGrid(reviews.slice(0, 3)) + `<p class="sec-foot"><a class="btn btn-outline" href="/reviews/">Read all reviews ${icon('arrow')}</a></p>`,
})}

<section class="sec sec-offer">
  <div class="wrap offer-in">
    <div class="offer-card">
      <p class="offer-badge">California state program</p>
      <h2>Up to 90% off eligible A/C repairs</h2>
      <p>The Cool Air Rebate Program covers up to 90% of qualifying R-134a air conditioning leak repairs for eligible California drivers, and the qualifying test costs you nothing when the repair is covered. We are a participating shop.</p>
      <a class="btn btn-accent" href="/rebates/">How the rebate works ${icon('arrow')}</a>
    </div>
    <div class="offer-card offer-alt">
      <p class="offer-badge">Current special</p>
      <h2>${esc(specials[0].price)} brake service</h2>
      <p>${esc(specials[0].unit)}. ${esc(specials[0].fine)}</p>
      <p class="offer-expiry">Expires ${longDate(specials[0].expires)}</p>
      <a class="btn btn-outline" href="/specials/">See all specials ${icon('arrow')}</a>
    </div>
  </div>
</section>

${section({
  cls: 'sec-faq',
  eyebrow: 'Questions',
  title: 'The things people ask before booking',
  body: faqBlock(),
})}

${ctaBand({ image: true })}
`,
  schema: [faqSchema(), reviewSchema(reviews.slice(0, 3))],
});

// =========================================================================
// Services index
// =========================================================================

const svcTrail = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }];

add({
  path: '/services/',
  title: 'Auto Repair Services in Sanger, CA',
  description:
    'Brakes, engine diagnostics, heating and A/C, electrical, transmission, suspension and factory scheduled maintenance in Sanger, CA. European specialists servicing all makes.',
  body:
    breadcrumbs(svcTrail) +
    pageHead({
      eyebrow: 'Services',
      title: 'Everything your car needs, in one shop',
      image: '/assets/img/photo-workshop.webp',
      lede: 'From an oil change to a cylinder head rebuild. We diagnose first, put the estimate in writing, and get your approval before anything is repaired.',
      actions: `<a class="btn btn-accent btn-lg" href="/appointments/">Request an appointment</a>
                <a class="btn btn-outline btn-lg" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>`,
    }) +
    section({ cls: 'sec-tight', body: serviceGrid() }) +
    section({
      cls: 'sec-amen',
      body: `<div class="amen-in">
        <div class="amen-copy">
          <p class="eyebrow">While you wait</p>
          <h2>Comfortable either way</h2>
          <p>Stay for the quick jobs, drop the keys for the long ones. Before-hours key drop-off is always available.</p>
        </div>
        ${amenities()}
      </div>`,
    }) +
    section({ cls: 'sec-faq', eyebrow: 'Questions', title: 'Before you book', body: faqBlock() }) +
    ctaBand(),
  schema: [breadcrumbSchema(svcTrail), faqSchema()],
});

// =========================================================================
// Service detail pages
// =========================================================================

for (const s of services) {
  const trail = [...svcTrail, { label: s.title, href: `/services/${s.slug}/` }];
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  add({
    path: `/services/${s.slug}/`,
    title: `${s.title} in Sanger, CA`,
    description: `${s.short} ${site.name} in Sanger, CA. Written estimates, factory-level diagnostics, all makes serviced. Call ${site.phone}.`,
    body:
      breadcrumbs(trail) +
      pageHead({
        eyebrow: 'Service',
        title: esc(s.title),
        lede: esc(s.lede),
        image: s.banner,
        imageAlt: '',
      }) +
      `
<section class="sec sec-detail">
  <div class="wrap detail-grid">
    <article class="detail-body">
      ${s.body.map((p) => `<p>${esc(p)}</p>`).join('')}
      ${s.photo ? `<img class="detail-photo" src="${attr(s.photo)}" alt="" loading="lazy" decoding="async">` : ''}

      <h2>What this service covers</h2>
      <ul class="ticks">${s.items.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul>

      ${s.cta ? `<p class="inline-cta"><a class="btn btn-accent" href="${attr(s.cta.href)}">${esc(s.cta.label)} ${icon('arrow')}</a></p>` : ''}
    </article>

    <aside class="detail-side">
      <div class="side-card side-symptoms">
        <h2>Bring it in if you notice</h2>
        <ul>${s.symptoms.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>
      <div class="side-card side-book">
        <h2>Book this service</h2>
        <p>Tell us what the car is doing and we will get you scheduled.</p>
        <a class="btn btn-accent btn-block" href="/appointments/?service=${encodeURIComponent(s.title)}">Request an appointment</a>
        <a class="btn btn-ghost btn-block" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>
        <dl class="side-nap">
          <dt>Where</dt><dd>${esc(site.addressLine)}</dd>
          <dt>Hours</dt><dd>Mon&ndash;Fri 8:00am&ndash;4:30pm</dd>
        </dl>
      </div>
    </aside>
  </div>
</section>

${section({
  cls: 'sec-tight',
  eyebrow: 'Also available',
  title: 'Other services',
  body: `<div class="grid grid-svc">${related.map(serviceCard).join('')}</div>`,
})}

${ctaBand({ title: `Need ${s.title.toLowerCase()}?`, text: 'Request a time online or call the shop. We will confirm and let you know whether it is a wait-for-it or a drop-off job.' })}`,
    schema: [
      breadcrumbSchema(trail),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.title,
        serviceType: s.title,
        description: s.lede,
        provider: { '@id': site.origin + '/#shop' },
        areaServed: { '@type': 'City', name: 'Sanger, CA' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${s.title} options`,
          itemListElement: s.items.map((i) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: i },
          })),
        },
      },
    ],
  });
}

// =========================================================================
// Vehicles index
// =========================================================================

const vehTrail = [{ label: 'Home', href: '/' }, { label: 'Vehicles we service', href: '/vehicles-we-service/' }];

add({
  path: '/vehicles-we-service/',
  title: 'Vehicles We Service',
  description: `${site.name} services ${makes.length} makes in Sanger, CA, from MINI, BMW, Audi and Porsche to everyday domestic and import vehicles. Find your make and book a visit.`,
  body:
    breadcrumbs(vehTrail) +
    pageHead({
      eyebrow: 'Vehicles',
      title: `${makes.length} makes, one shop`,
      image: '/assets/img/hero-tires.webp',
      lede: 'European vehicles are our speciality, but the bay is open to everything. Find your make below for what we handle and what tends to go wrong.',
    }) +
    section({
      cls: 'sec-tight',
      body: makeGroups
        .map((g) => {
          const list = makes.filter((m) => m.group === g.key);
          return `
<div class="make-group">
  <h2>${esc(g.label)} <span class="count">${list.length}</span></h2>
  <ul class="make-list">
    ${list
      .map(
        (m) =>
          `<li><a href="/vehicles-we-service/${m.slug}/"${m.featured ? ' class="is-featured"' : ''}>${esc(m.name)}${m.featured ? '<span class="tag">Speciality</span>' : ''}</a></li>`
      )
      .join('')}
  </ul>
</div>`;
        })
        .join(''),
    }) +
    ctaBand({
      title: 'Do not see your make?',
      text: 'Call the shop. If we cannot help we will tell you straight away and point you somewhere that can.',
    }),
  schema: [breadcrumbSchema(vehTrail)],
});

// =========================================================================
// Make pages
// =========================================================================

const genericNote = (name) =>
  `We service ${name} vehicles for everything from factory scheduled maintenance through to diagnosis and major repair. Same approach as every car that comes through the door: test before we quote, put the estimate in writing, and get your approval before the work starts.`;

for (const m of makes) {
  const trail = [...vehTrail, { label: m.name, href: `/vehicles-we-service/${m.slug}/` }];
  const note = m.note || genericNote(m.name);
  const groupLabel = makeGroups.find((g) => g.key === m.group).label;

  add({
    path: `/vehicles-we-service/${m.slug}/`,
    title: `${m.name} Repair & Service in Sanger, CA`,
    description: `${m.name} repair and maintenance at ${site.name} in Sanger, CA. Brakes, engine diagnostics, A/C, electrical, transmission and suspension. Written estimates. Call ${site.phone}.`,
    body:
      breadcrumbs(trail) +
      pageHead({
        eyebrow: `${esc(groupLabel)}${m.featured ? ' &middot; Speciality marque' : ''}`,
        title: `${esc(m.name)} repair &amp; service in Sanger`,
        lede: esc(note),
        image: MAKE_PHOTO[m.slug],
        actions: `<a class="btn btn-accent btn-lg" href="/appointments/?vehicle=${encodeURIComponent(m.name)}">Book ${esc(m.name)} service</a>
                  <a class="btn btn-outline btn-lg" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>`,
      }) +
      section({
        cls: 'sec-tight',
        eyebrow: 'Services',
        title: `What we do for ${esc(m.name)} owners`,
        body: serviceGrid(),
      }) +
      section({
        cls: 'sec-amen',
        body: `<div class="amen-in">
          <div class="amen-copy">
            <p class="eyebrow">How a visit works</p>
            <h2>Three steps, no surprises</h2>
            <ol class="steps steps-compact">
              <li><span>1</span><div><h3>Book a time</h3><p>Online or by phone. Key drop-off if you need to leave it early.</p></div></li>
              <li><span>2</span><div><h3>We diagnose</h3><p>Proper testing, then a written estimate and an explanation.</p></div></li>
              <li><span>3</span><div><h3>You approve</h3><p>Nothing is repaired until you say so. Road tested before pickup.</p></div></li>
            </ol>
          </div>
          ${amenities()}
        </div>`,
      }) +
      ctaBand({
        title: `${m.name} service in Sanger, CA`,
        text: `We are at ${site.addressLine}, open Monday to Friday 8:00am to 4:30pm.`,
      }),
    schema: [
      breadcrumbSchema(trail),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${m.name} Repair & Service`,
        description: note,
        provider: { '@id': site.origin + '/#shop' },
        areaServed: { '@type': 'City', name: 'Sanger, CA' },
      },
    ],
  });
}

// =========================================================================
// Appointments
// =========================================================================

const apptTrail = [{ label: 'Home', href: '/' }, { label: 'Appointments', href: '/appointments/' }];

add({
  path: '/appointments/',
  title: 'Request an Appointment',
  description: `Request an auto repair appointment at ${site.name} in Sanger, CA. Tell us the vehicle and the symptom and we will confirm a time. Quotes welcome. Call ${site.phone}.`,
  body:
    breadcrumbs(apptTrail) +
    pageHead({
      eyebrow: 'Appointments',
      title: 'Request an appointment',
      image: '/assets/img/banner-appointments.webp',
      lede: 'Send the details below and we will contact you to confirm a time that works for both of us. Wanting a quote only? Say so and that is exactly what you will get.',
    }) +
    `
<section class="sec sec-book">
  <div class="wrap book-grid">
    <div class="book-form">${form({ id: 'appt', name: 'appointment' })}</div>
    <aside class="book-side">
      <div class="side-card">
        <h2>Prefer to call?</h2>
        <p>The fastest way to get on the schedule, especially if the car is undriveable.</p>
        <a class="btn btn-accent btn-block" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>
        <dl class="side-nap">
          <dt>Address</dt><dd><a href="${attr(site.mapsUrl)}" target="_blank" rel="noopener">${esc(site.addressLine)}</a></dd>
          <dt>Hours</dt><dd>Mon&ndash;Fri 8:00am&ndash;4:30pm<br>Closed Sat &amp; Sun</dd>
        </dl>
      </div>
      <div class="side-card">
        <h2>Good to know</h2>
        <ul class="ticks ticks-sm">
          <li>${icon('check')}<span>Ask about drop-off instructions or transportation help when you book.</span></li>
          <li>${icon('check')}<span>Before-hours key drop-off is available &mdash; call first so we know to expect it.</span></li>
          <li>${icon('check')}<span>Diagnosis comes before any estimate, and nothing is repaired without your approval.</span></li>
          <li>${icon('check')}<span>Bring any previous repair paperwork. It saves diagnostic time and your money.</span></li>
        </ul>
      </div>
    </aside>
  </div>
</section>

${section({ cls: 'sec-faq', eyebrow: 'Questions', title: 'Before your visit', body: faqBlock() })}`,
  schema: [breadcrumbSchema(apptTrail), faqSchema()],
});

// =========================================================================
// Specials
// =========================================================================

const specTrail = [{ label: 'Home', href: '/' }, { label: 'Specials', href: '/specials/' }];

add({
  path: '/specials/',
  title: 'Auto Repair Specials & Coupons',
  description: `Current auto repair specials at ${site.name} in Sanger, CA, including brake service from $199.99 per axle and up to 90% off eligible A/C repairs through the California Cool Air Rebate Program.`,
  body:
    breadcrumbs(specTrail) +
    pageHead({
      eyebrow: 'Specials',
      title: 'Ways to spend less on the repair',
      image: '/assets/img/banner-specials.webp',
      lede: 'We keep rates reasonable year round rather than inflating them and discounting back. When there is a genuine saving to pass on, it goes here.',
    }) +
    section({
      cls: 'sec-tight',
      body: `<div class="grid grid-offers">
        ${specials
          .map(
            (o) => `
        <article class="card offer">
          ${o.badge ? `<p class="offer-badge">${esc(o.badge)}</p>` : ''}
          <h2>${esc(o.title)}</h2>
          <p class="offer-price">${esc(o.price)}</p>
          <p class="offer-unit">${esc(o.unit)}</p>
          <p class="offer-fine">${esc(o.fine)}</p>
          ${o.expires ? `<p class="offer-expiry">Expires ${longDate(o.expires)}</p>` : ''}
          <a class="btn btn-outline btn-block" href="${attr(o.href)}">Details ${icon('arrow')}</a>
        </article>`
          )
          .join('')}
      </div>
      <p class="sec-foot muted">Offers cannot be combined unless stated. Ask us to apply a special when you book so it is on the estimate from the start.</p>`,
    }) +
    ctaBand({ title: 'Claim a special', text: 'Mention it when you book and we will build it into the estimate.' }),
  schema: [
    breadcrumbSchema(specTrail),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: specials.map((o, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Offer',
          name: o.title,
          description: `${o.price} ${o.unit}. ${o.fine}`,
          url: site.origin + o.href,
          seller: { '@id': site.origin + '/#shop' },
          ...(o.expires ? { availabilityEnds: o.expires } : {}),
        },
      })),
    },
  ],
});

// =========================================================================
// Rebates
// =========================================================================

const rebTrail = [{ label: 'Home', href: '/' }, { label: 'California A/C rebate', href: '/rebates/' }];

const rebateSteps = [
  { h: 'Check that you pre-qualify', p: 'Start at coolairrebate.org/pre-qualify. It takes a couple of minutes and tells you whether your vehicle and household are eligible.', link: 'https://coolairrebate.org/pre-qualify/' },
  { h: 'Submit your application', p: 'Apply online or by mail through the Cool Air Rebate Program.' },
  { h: 'Wait for approval', p: 'The program sends a confirmation letter once your vehicle is approved for the repair rebate.' },
  { h: 'Bring it to us for an estimate', p: `Come to ${site.addressLine} with your confirmation and we will write up the estimate.` },
  { h: 'We run the qualifying test', p: 'We test the system to confirm the repair is covered. The full cost of that test is covered when the repair qualifies under the program.' },
  { h: 'We make the repair', p: 'The program pays up to 90%. You pay the remaining share directly to the shop.' },
  { h: 'Enjoy a cold car again', p: 'Road tested and verified before you pick it up.' },
];

add({
  path: '/rebates/',
  title: 'California Cool Air Rebate Program',
  description:
    'The California Cool Air Rebate Program pays up to 90% of eligible vehicle A/C leak repairs. Well Done Worx in Sanger, CA is a participating shop. See the steps and check if you qualify.',
  body:
    breadcrumbs(rebTrail) +
    pageHead({
      eyebrow: 'California state program',
      title: 'Up to 90% off eligible A/C repairs',
      lede: 'The Cool Air Rebate Program (CAR) helps eligible Californians repair leaking R-134a air conditioning systems. We are a participating shop, and the qualifying test costs you nothing when the repair is covered.',
      actions: `<a class="btn btn-accent btn-lg" href="https://coolairrebate.org/pre-qualify/" target="_blank" rel="noopener">Check if you pre-qualify ${icon('arrow')}</a>
                <a class="btn btn-outline btn-lg" href="/appointments/?service=Heating%20%26%20Air%20Conditioning">Book an A/C visit</a>`,
    }) +
    section({
      cls: 'sec-tight',
      body: `<img class="rebate-art" src="/assets/img/rebate-car.webp"
             alt="Well Done Worx is a participating shop in the California Cool Air Rebate Program"
             width="984" height="338" decoding="async">`,
    }) +
    section({
      cls: 'sec-tight',
      eyebrow: 'How it works',
      title: 'Seven steps from application to cold air',
      body: `<ol class="steps">
        ${rebateSteps
          .map(
            (s, i) => `<li><span>${i + 1}</span><div><h3>${esc(s.h)}</h3><p>${esc(s.p)}${s.link ? ` <a href="${attr(s.link)}" target="_blank" rel="noopener">Start here</a>.` : ''}</p></div></li>`
          )
          .join('')}
      </ol>`,
    }) +
    section({
      cls: 'sec-note',
      body: `<div class="notebox">
        <h2>Where the funding comes from</h2>
        <p>The program is funded by unclaimed deposits on cans of R-134a sold in California, run in coordination with the Car Care Council and the California Air Resources Board. The Car Care Council is a non-profit that educates drivers on vehicle care and maintenance.</p>
        <p class="muted">Eligibility, coverage and program terms are set by the Cool Air Rebate Program, not by ${esc(site.name)}. Check coolairrebate.org for current requirements.</p>
      </div>`,
    }) +
    ctaBand({
      title: 'Approved already?',
      text: 'Bring your confirmation letter in and we will take it from the test onwards.',
    }),
  schema: [breadcrumbSchema(rebTrail)],
});

// =========================================================================
// Reviews
// =========================================================================

const revTrail = [{ label: 'Home', href: '/' }, { label: 'Reviews', href: '/reviews/' }];

add({
  path: '/reviews/',
  title: 'Customer Reviews',
  description: `${site.rating.value} stars from ${site.rating.count} verified customer reviews of ${site.name} in Sanger, CA. Read what drivers say about our European auto repair and diagnostics.`,
  body:
    breadcrumbs(revTrail) +
    pageHead({
      eyebrow: 'Reviews',
      title: `${site.rating.value} stars, ${site.rating.count} verified reviews`,
      image: '/assets/img/banner-reviews.webp',
      lede: 'Every time we work on your car, our reputation in this community is on the line. These reviews come from real repair orders, not solicited testimonials.',
    }) +
    section({ cls: 'sec-tight', body: reviewGrid() }) +
    section({
      cls: 'sec-note',
      body: `<div class="notebox notebox-center">
        <h2>Been in recently?</h2>
        <p>A review helps other drivers in Sanger find an independent shop they can trust. It takes a minute and it means a great deal to us.</p>
        <div class="btn-row btn-row-center">
          <a class="btn btn-accent" href="${attr(site.mapsUrl)}" target="_blank" rel="noopener">Leave a Google review</a>
          <a class="btn btn-outline" href="${attr(site.facebook)}" target="_blank" rel="noopener">Find us on Facebook</a>
        </div>
      </div>`,
    }) +
    ctaBand(),
  schema: [breadcrumbSchema(revTrail), reviewSchema()],
});

// =========================================================================
// Contact
// =========================================================================

const conTrail = [{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact/' }];

add({
  path: '/contact/',
  title: 'Contact & Directions',
  description: `Contact ${site.name} at ${site.addressLine}. Call ${site.phone} or send a message. Open Monday to Friday, 8:00am to 4:30pm.`,
  body:
    breadcrumbs(conTrail) +
    pageHead({
      eyebrow: 'Contact',
      title: 'Come see us in Sanger',
      image: '/assets/img/banner-contact.webp',
      lede: 'Questions, quotes or comments, we would like to hear from you. Call during shop hours for the quickest answer, or send a message and we will get back to you.',
    }) +
    `
<section class="sec sec-contact">
  <div class="wrap contact-grid">
    <div class="contact-info">
      <div class="side-card">
        <h2>Shop details</h2>
        <dl class="side-nap">
          <dt>${icon('pin')}Address</dt>
          <dd><a href="${attr(site.mapsUrl)}" target="_blank" rel="noopener">${esc(site.street)}<br>${esc(site.city)}, ${esc(site.state)} ${esc(site.zip)}</a></dd>
          <dt>${icon('phone')}Phone</dt>
          <dd><a href="${attr(site.phoneHref)}">${esc(site.phone)}</a></dd>
        </dl>
        <h3>Hours</h3>
        <table class="hours-table hours-table-lg">
          <tbody>
            ${site.hours
              .map(
                (h) =>
                  `<tr${h.closed ? ' class="is-closed"' : ''}><th scope="row">${esc(h.day)}</th><td>${h.closed ? 'Closed' : `${clock(h.open)} &ndash; ${clock(h.close)}`}</td></tr>`
              )
              .join('')}
          </tbody>
        </table>
        <p class="muted">Before-hours key drop-off available. Call ahead so we know your car is coming.</p>
      </div>
    </div>
    <div class="contact-form">${form({ id: 'contact', name: 'contact' })}</div>
  </div>
</section>

${mapEmbed()}
${ctaBand()}`,
  schema: [
    breadcrumbSchema(conTrail),
    { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact', url: site.origin + '/contact/' },
  ],
});

// =========================================================================
// Privacy
// =========================================================================

add({
  path: '/privacy-policy/',
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects the information you provide through this website.`,
  body:
    breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Privacy policy', href: '/privacy-policy/' }]) +
    pageHead({ eyebrow: 'Legal', title: 'Privacy policy', lede: `Last updated <time datetime="2026-09-01">September 1, 2026</time>.` }) +
    section({
      cls: 'sec-prose',
      body: `<div class="prose">
<h2>What we collect</h2>
<p>When you submit the appointment or contact form we collect the details you enter: your name, phone number, email address, vehicle information, preferred date and your message. We collect this so we can respond to your request and schedule your service.</p>

<h2>How we use it</h2>
<p>We use your information to contact you about your request, confirm appointments, provide estimates and keep a record of work performed on your vehicle. We do not sell your information, and we do not share it with third parties except where it is necessary to complete your service (for example a parts supplier) or where the law requires it.</p>

<h2>Analytics and cookies</h2>
<p>This site does not set advertising cookies. If analytics are enabled they are used only to understand which pages are useful and how the site performs. Embedded content, such as the Google Maps frame on our contact page, is served by third parties who apply their own privacy policies.</p>

<h2>Data retention</h2>
<p>Enquiries are kept for as long as needed to serve you and to maintain accurate service history for your vehicle. Repair records may be retained longer where required for warranty or legal purposes.</p>

<h2>Your choices</h2>
<p>You can ask us at any time to tell you what information we hold about you, to correct it, or to delete it where we are not required to keep it. Contact us at <a href="${attr(site.phoneHref)}">${esc(site.phone)}</a> or visit the shop at ${esc(site.addressLine)}.</p>

<h2>Changes</h2>
<p>If this policy changes we will update this page and the date above.</p>

<p class="muted">This policy is provided as general information about how this website handles your data. It is not legal advice; have it reviewed if you need it to meet a specific regulatory requirement.</p>
</div>`,
    }),
});

// =========================================================================
// Sitemap page
// =========================================================================

add({
  path: '/sitemap/',
  title: 'Site Map',
  description: `Every page on the ${site.name} website, in one list.`,
  body:
    breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Site map', href: '/sitemap/' }]) +
    pageHead({ eyebrow: 'Navigation', title: 'Site map' }) +
    section({
      cls: 'sec-tight',
      body: `<div class="sitemap-grid">
  <div>
    <h2>Main pages</h2>
    <ul class="foot-links">
      <li><a href="/">Home</a></li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/vehicles-we-service/">Vehicles we service</a></li>
      <li><a href="/appointments/">Request an appointment</a></li>
      <li><a href="/specials/">Specials</a></li>
      <li><a href="/rebates/">California A/C rebate</a></li>
      <li><a href="/reviews/">Reviews</a></li>
      <li><a href="/contact/">Contact</a></li>
      <li><a href="/privacy-policy/">Privacy policy</a></li>
    </ul>
  </div>
  <div>
    <h2>Services</h2>
    <ul class="foot-links">
      ${services.map((s) => `<li><a href="/services/${s.slug}/">${esc(s.title)}</a></li>`).join('')}
    </ul>
  </div>
  <div class="sitemap-wide">
    <h2>Vehicles we service</h2>
    <ul class="make-list">
      ${makes.map((m) => `<li><a href="/vehicles-we-service/${m.slug}/">${esc(m.name)}</a></li>`).join('')}
    </ul>
  </div>
</div>`,
    }),
});

// =========================================================================
// 404
// =========================================================================

add({
  path: '/404.html',
  noindex: true,
  title: 'Page not found',
  description: 'That page does not exist.',
  body:
    pageHead({
      eyebrow: 'Error 404',
      title: 'That page has been towed',
      lede: 'The link is broken or the page has moved. Here is the way back.',
      actions: `<a class="btn btn-accent btn-lg" href="/">Back to home</a>
                <a class="btn btn-outline btn-lg" href="/services/">Browse services</a>
                <a class="btn btn-outline btn-lg" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>`,
    }) + section({ cls: 'sec-tight', body: serviceGrid() }),
});

export default pages;
