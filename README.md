# Well Done Worx — rebuilt site

A static rebuild of welldoneworx.com. No framework, no dependencies, no build toolchain
beyond Node itself. `src/data/site.js` is the single source of truth; the build renders
79 pages from it.

```bash
npm run build     # -> dist/
npm run dev       # build + watch + serve on http://localhost:4173
```

## Why it's structured this way

The old site was WordPress with ~235 KB of HTML on the homepage alone, plus jQuery,
several plugin stylesheets and a slider library. Every make page was hand-maintained.
Here, all 62 make pages and all 7 service pages are generated from one data file, so
changing the phone number or adding a service is a one-line edit followed by a rebuild.

```
src/
  data/site.js          business info, services, makes, reviews, specials, FAQ
  templates/layout.js   page shell, header, footer, icons, LocalBusiness schema
  templates/components.js  reusable sections (cards, forms, FAQ, CTA bands)
  pages.js              every page on the site
  assets/               css, js, images (copied verbatim to dist/)
build.mjs               renders pages, sitemap.xml, robots.txt, redirects
```

## What changed from the old site

**Structure**
- `/service/{slug}/` → `/services/{slug}/`
- `/service-repair-{make}/` → `/vehicles-we-service/{make}/`, with an index page grouping
  all 62 makes by European / Asian / Domestic
- `/appointments/`, `/specials/`, `/rebates/`, `/reviews/`, `/contact/`, `/privacy-policy/`
  and `/sitemap/` keep their existing URLs, so their search ranking carries over untouched
- 301 redirects for every changed URL are generated into `dist/_redirects` (Netlify),
  `dist/.htaccess` (Apache) and `dist/vercel.json` (Vercel)

**SEO**
- `AutoRepair` LocalBusiness schema with address, geo, opening hours and aggregate rating
  on every page; plus `Service`, `BreadcrumbList`, `FAQPage`, `Review` and `Offer` schema
  where relevant
- Per-page title, meta description, canonical and Open Graph tags
- Generated `sitemap.xml` with priorities, and `robots.txt`

**Accessibility**
- Skip link, semantic landmarks, visible focus rings, labelled form fields with inline
  errors, `aria-current` on the active nav item, keyboard-operable mobile menu
- `prefers-reduced-motion` disables the marquee and all reveal animations

**Conversion**
- Sticky call / book bar on mobile
- Live "Open now until 4:30pm" indicator on the homepage, computed client-side
- Service and vehicle pages deep-link into the appointment form with the field prefilled
  (`/appointments/?service=Brake%20Service`)

## Not carried over

- **The 27 "recently serviced vehicles" posts.** These were fed automatically from the
  shop management system (mileage, service date, line-by-line work performed). They need
  a live feed rather than hardcoded pages. If you want them back, the cleanest route is a
  nightly export into a JSON file that `build.mjs` reads, or an embed from the same
  provider that supplies the reviews.
- **The theme's Gotham webfonts and vendor badges.** The old theme shipped licensed
  Gotham font files and Mitchell1 / Bridgestone branding. Those aren't the shop's to move,
  so the site uses a system font stack instead — which is also why there are no font
  requests on load.

## Images

All imagery was pulled from the old site and re-encoded. The logo drives the palette:
sampling it gave red `#e41818`, navy `#003054` and mid-blue `#3c84c0`, which are now the
CSS accent tokens, replacing the placeholder colours.

| | |
|---|---|
| Source | 9.6 MB across 50 files (mostly full-size PNG) |
| Shipped | **1.1 MB** — WebP for photography, PNG kept only for the logo and the small badges |
| Home page total | 37 KB HTML + 44 KB CSS/JS + 36 KB hero image |

Placement: the Audi shot backs the home hero, each service page uses its own banner and
round icon, the four marketing pages keep their banners, the Cool Air Rebate artwork sits
on `/rebates/`, and the card-payment badges are in the footer. BMW, Audi, Mercedes-Benz
and Volkswagen have their own photo on their vehicle page; the other 58 makes fall back to
a line icon rather than borrowing another marque's car.

Two caveats worth knowing:

- **Most of these are stock photos, not this shop.** `photo-workshop` shows a large
  multi-bay dealership workshop and `technician` is a stock model in red overalls. They
  were on the old site so they're carried over, but real photos of the actual shop, the
  actual bays and the actual staff would convert better and represent the business
  honestly. Everywhere they appear is a drop-in swap in `src/data/site.js` or `pages.js`.
- **Stock licensing travels with the shop, not the site.** One file is named
  `shutterstock_620491757`; if that licence was held by the old theme vendor rather than
  by Well Done Worx, it needs re-licensing before launch. Worth a check.

## Mobile

Audited by loading every page type in a 390px iframe under headless Chrome and measuring
`scrollWidth`, computed font sizes and tap-target rects. That found three real defects,
all now fixed:

1. **320px of horizontal overflow on every page.** The off-canvas nav drawer was
   `position: fixed` parked off to the right with `translateX(100%)`, which still grows
   document `scrollWidth`. `body { overflow-x: hidden }` hid the scrollbar, so it was
   invisible. `.nav` is now a viewport-sized clipping layer with the panel sliding inside
   it, so it contributes nothing to the document width. The marquee got `overflow: hidden`
   for the same reason.
2. **Form inputs at 15.7px.** iOS Safari zooms the viewport whenever a focused control is
   under 16px. All controls are now exactly 16px with a 48px min-height.
3. **Tap targets under 44px** in the top bar, breadcrumbs and footer. All secondary link
   rows now have a real 44px touch area. Inline links inside a sentence are deliberately
   left alone — WCAG 2.5.5 exempts them.

Also: `A/C Rebate` was wrapping to two lines in the desktop nav and dropping out of the
baseline; nav links are now `nowrap`, with the strapline and phone label shedding earlier
so nothing has to wrap between 900px and 1280px. Verified at 1440/1280/1180/1100/1024/960/
920/901px — all links 44px tall on one baseline.

Responsive images: the hero and every banner ship 480w variants (hero also 900w) via
`srcset`, so a phone pulls a 3 KB hero instead of the 37 KB desktop one. The home hero is
preloaded with a matching `imagesrcset` so the LCP image starts fetching before CSS
resolves it.

**A note on headless screenshots:** Chrome ignores `--window-size` below roughly 500px
(it reports `innerWidth: 492` for `--window-size=390`), so a "mobile" screenshot taken
that way renders at ~492px and crops — which looks exactly like a layout bug and isn't
one. Screenshot through a 390px iframe instead.

## Floating actions

`Call now` is fixed bottom-left on every page and every breakpoint, with a two-cycle pulse
on load that then stops. A `Book` pill mirrors it bottom-right below 900px, where the
header CTA is hidden behind the menu button. These replaced the old full-width bottom bar,
which would have sat underneath the call button.

To make the call button mobile-only, wrap `.fab-call` in `@media (max-width: 900px)` in
`site.css`.

## Before going live

1. **Reviews** — `reviews` in `src/data/site.js` is a hand-entered sample. Point it at the
   real review feed so the count and the `aggregateRating` schema stay accurate; a stale
   rating in structured data is worth fixing.
2. **Form endpoint** — the forms post to Netlify Forms by default (the markup is already
   there). On any other host, set `site.formEndpoint` to a Formspree/Basin URL. Until one
   is set on a non-Netlify host, the form falls back to showing the phone number.
3. **OG image** — `og.jpg` is generated from the Mercedes cover shot with the logo
   composited into the empty right side. Swap for a real photo of the shop when you have
   one; it's one line in `site.ogImage`.
4. **Geo coordinates** — `site.geo` is approximate for Sanger. Replace with the exact
   coordinates from your Google Business Profile.
5. **Specials** — `specials[0]` expires 2026-10-01. Update or remove it after that date.

## Deploy

Any static host. `dist/` is the publish directory.

| Host | Setup |
|---|---|
| Netlify | build `npm run build`, publish `dist` — `_redirects` and forms work automatically |
| Cloudflare Pages | same; rename `_redirects` handling is identical |
| Vercel | `vercel.json` carries the redirects |
| Apache / cPanel | upload `dist/` contents; `.htaccess` carries the redirects |
