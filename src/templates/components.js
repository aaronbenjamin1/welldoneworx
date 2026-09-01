import { site, services, reviews, faqs } from '../data/site.js';
import { serviceAreas } from '../data/seo.js';
import { esc, attr, icon, stars, longDate, responsive } from './layout.js';

// --- breadcrumbs ---------------------------------------------------------

export function breadcrumbs(trail) {
  const items = trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(t.label)}</li>`
        : `<li><a href="${attr(t.href)}">${esc(t.label)}</a></li>`
    )
    .join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${items}</ol></div></nav>`;
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      item: site.origin + (t.href || ''),
    })),
  };
}

// --- page header band ----------------------------------------------------

export function pageHead({ eyebrow, title, lede, actions = '', image, imageAlt = '' }) {
  return `
<section class="pagehead${image ? ' has-img' : ''}">
  ${image ? `<img class="pagehead-img" src="${attr(image)}"${responsive(image)} alt="${attr(imageAlt)}" fetchpriority="high" decoding="async">` : ''}
  <div class="wrap">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
    ${actions ? `<div class="btn-row">${actions}</div>` : ''}
  </div>
</section>`;
}

// --- service cards -------------------------------------------------------

export function serviceCard(s) {
  return `
<a class="card svc-card" href="/services/${s.slug}/">
  ${s.img
    ? `<img class="svc-img" src="${attr(s.img)}" alt="" width="208" height="209" loading="lazy" decoding="async">`
    : `<span class="svc-ic">${icon(s.icon)}</span>`}
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.short)}</p>
  <span class="card-more">Learn more ${icon('arrow')}</span>
</a>`;
}

export function serviceGrid(list = services) {
  return `<div class="grid grid-svc">${list.map(serviceCard).join('')}</div>`;
}

// --- reviews -------------------------------------------------------------

export function reviewCard(r) {
  return `
<figure class="card review">
  ${stars(r.stars)}
  <blockquote><p>${esc(r.text)}</p></blockquote>
  <figcaption>
    <span class="avatar" aria-hidden="true">${esc(r.initials)}</span>
    <span class="review-meta">
      <strong>${esc(r.author)}</strong>
      <span>${esc(r.vehicle)} &middot; ${longDate(r.date)}</span>
    </span>
    <span class="verified">${icon('check')}Verified</span>
  </figcaption>
</figure>`;
}

export function reviewGrid(list = reviews) {
  return `<div class="grid grid-rev">${list.map(reviewCard).join('')}</div>`;
}

export function reviewSchema(list = reviews) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
        itemReviewed: { '@id': site.origin + '/#shop' },
      },
    })),
  };
}

// --- amenities -----------------------------------------------------------

export function amenities() {
  return `
<ul class="amenities">
  ${site.amenities
    .map(
      (a) =>
        `<li>${
          a.img
            ? `<img class="amen-img" src="${attr(a.img)}" alt="" width="40" height="40" loading="lazy" decoding="async">`
            : icon(a.icon)
        }<span><strong>${esc(a.label)}</strong>${esc(a.note)}</span></li>`
    )
    .join('')}
</ul>`;
}

// --- FAQ -----------------------------------------------------------------

export function faqBlock(list = faqs) {
  return `
<div class="faq">
  ${list
    .map(
      (f, i) => `
  <details class="faq-item"${i === 0 ? ' open' : ''}>
    <summary><span>${esc(f.q)}</span>${icon('arrow')}</summary>
    <div class="faq-a"><p>${esc(f.a)}</p></div>
  </details>`
    )
    .join('')}
</div>`;
}

export function faqSchema(list = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// --- CTA band ------------------------------------------------------------

export function ctaBand({
  title = 'Ready when you are',
  text = 'Tell us what the car is doing and we will get you booked in. Diagnosis first, estimate second, repair only once you approve it.',
  image = false,
} = {}) {
  return `
<section class="band${image ? ' band-img' : ''}">
  ${image ? `<img class="band-photo" src="${attr(site.bandImage)}" alt="" loading="lazy" decoding="async">` : ''}
  <div class="wrap band-in">
    <div>
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="btn-row">
      <a class="btn btn-accent btn-lg" href="/appointments/">Request an appointment</a>
      <a class="btn btn-outline btn-lg" href="${attr(site.phoneHref)}">${icon('phone')}${esc(site.phone)}</a>
    </div>
  </div>
</section>`;
}

// --- appointment / contact form -----------------------------------------

export function form({ id = 'booking', name = 'appointment', heading, compact = false } = {}) {
  const svcOptions = services
    .map((s) => `<option value="${attr(s.title)}">${esc(s.title)}</option>`)
    .join('');

  return `
<form class="form${compact ? ' form-compact' : ''}" id="${attr(id)}" name="${attr(name)}"
      method="POST" data-endpoint="${attr(site.formEndpoint)}"
      netlify-honeypot="company" data-netlify="true" novalidate>
  <input type="hidden" name="form-name" value="${attr(name)}">
  <p class="hp"><label>Company <input name="company" tabindex="-1" autocomplete="off"></label></p>
  ${heading ? `<h2 class="form-h">${esc(heading)}</h2>` : ''}

  <div class="field-row">
    <p class="field">
      <label for="${id}-name">Your name <span aria-hidden="true">*</span></label>
      <input id="${id}-name" name="name" type="text" autocomplete="name" required>
      <span class="err" data-err></span>
    </p>
    <p class="field">
      <label for="${id}-phone">Phone <span aria-hidden="true">*</span></label>
      <input id="${id}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
      <span class="err" data-err></span>
    </p>
  </div>

  <div class="field-row">
    <p class="field">
      <label for="${id}-email">Email</label>
      <input id="${id}-email" name="email" type="email" autocomplete="email">
      <span class="err" data-err></span>
    </p>
    <p class="field">
      <label for="${id}-vehicle">Vehicle (year, make, model)</label>
      <input id="${id}-vehicle" name="vehicle" type="text" placeholder="2016 BMW 328i xDrive">
    </p>
  </div>

  <div class="field-row">
    <p class="field">
      <label for="${id}-service">What do you need?</label>
      <select id="${id}-service" name="service">
        <option value="">Not sure &mdash; please advise</option>
        ${svcOptions}
        <option value="Quote only">Quote only</option>
        <option value="Other">Something else</option>
      </select>
    </p>
    <p class="field">
      <label for="${id}-date">Preferred day</label>
      <input id="${id}-date" name="preferred_date" type="date">
    </p>
  </div>

  <p class="field">
    <label for="${id}-msg">Tell us what it is doing</label>
    <textarea id="${id}-msg" name="message" rows="5" placeholder="Noises, warning lights, when it happens, anything a previous shop has already tried."></textarea>
  </p>

  <p class="field field-check">
    <label><input type="checkbox" name="dropoff" value="yes"> I will need drop-off or transportation help</label>
  </p>

  <div class="form-foot">
    <button class="btn btn-accent btn-lg" type="submit">Send request</button>
    <p class="form-note">We reply during shop hours to confirm a time. Prefer to talk? Call <a href="${attr(site.phoneHref)}">${esc(site.phone)}</a>.</p>
  </div>

  <div class="form-status" role="status" aria-live="polite" data-status hidden></div>
</form>`;
}

// --- map -----------------------------------------------------------------

export function mapEmbed() {
  const q = encodeURIComponent(site.addressLine);
  return `
<div class="map">
  <iframe title="Map showing ${attr(site.name)} at ${attr(site.addressLine)}"
          src="https://www.google.com/maps?q=${q}&output=embed"
          loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>`;
}

// --- section helper ------------------------------------------------------

export function section({ id, cls = '', eyebrow, title, lede, body, wrapClass = '' }) {
  return `
<section class="sec ${cls}"${id ? ` id="${attr(id)}"` : ''}>
  <div class="wrap ${wrapClass}">
    ${eyebrow || title || lede
      ? `<div class="sec-head">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      ${title ? `<h2>${title}</h2>` : ''}
      ${lede ? `<p class="lede">${lede}</p>` : ''}
    </div>`
      : ''}
    ${body}
  </div>
</section>`;
}


// --- service area --------------------------------------------------------

/** Tells drivers whether we cover them, and carries the geo search phrases. */
export function serviceArea() {
  return `
<section class="sec sec-area">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Service area</p>
      <h2>Auto repair for Sanger and the wider Fresno area</h2>
      <p class="lede">We are at ${esc(site.addressLine)}, minutes from downtown Sanger and a short run out from Fresno or Clovis. Drivers regularly come to us from across Fresno County.</p>
    </div>
    <ul class="area-list">
      ${serviceAreas.map((t) => `<li>${icon('pin')}<span>${esc(t)}</span></li>`).join('')}
    </ul>
    <p class="muted area-note">Further out than this? Call ${esc(site.phone)} and we will tell you honestly whether the trip is worth it.</p>
  </div>
</section>`;
}
