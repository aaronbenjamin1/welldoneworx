// ---------------------------------------------------------------------------
// Local SEO layer: the literal phrases people in and around Sanger type into
// Google, mapped to the pages that should rank for them.
//
// Titles are kept under ~60 characters and descriptions between 140 and 160,
// which is roughly what Google renders before truncating.
// ---------------------------------------------------------------------------

/** Towns within the shop's realistic catchment, east and south of Fresno. */
export const serviceAreas = [
  'Sanger',
  'Fresno',
  'Clovis',
  'Reedley',
  'Parlier',
  'Del Rey',
  'Selma',
  'Fowler',
  'Kingsburg',
  'Centerville',
  'Minkler',
  'Squaw Valley',
];

/**
 * Per-service overrides. `h1` carries the location phrase, `title` is the
 * <title> stem, `desc` the meta description, and `phrases` are the literal
 * search terms that must appear in the visible body copy of that page.
 */
export const serviceSeo = {
  'brake-service': {
    h1: 'Brake Repair & Service in Sanger, CA',
    title: 'Brake Repair in Sanger, CA',
    desc: 'Brake repair in Sanger, CA on all makes. Pads, rotors, calipers and fluid, with a written estimate before any work starts. Call (559) 801-3460.',
    phrases: ['brake repair in Sanger, CA', 'brake service near Fresno', 'brake pad replacement'],
    intro:
      'Looking for brake repair in Sanger, CA, or brake service near Fresno? Well Done Worx handles brake pad replacement and full brake jobs on every make we see, from a squealing pad on a work truck to an electronic parking brake on a European sedan. We are on Academy Avenue, a short run out from Fresno, Clovis, Reedley and Parlier.',
  },
  'standard-maintenance-auto-service': {
    h1: 'Oil Changes & Car Maintenance in Sanger, CA',
    title: 'Oil Change & Car Maintenance, Sanger CA',
    desc: 'Oil changes and factory scheduled maintenance in Sanger, CA. 30k, 60k and 90k mile services on all makes, done to spec. Call (559) 801-3460.',
    phrases: ['oil change in Sanger, CA', 'car maintenance in Sanger', 'factory scheduled maintenance'],
    intro:
      'If you need an oil change in Sanger, CA or you are due for a factory scheduled maintenance service, this is the page. We handle car maintenance in Sanger for domestic trucks and European imports alike, using the oil specification your engine actually calls for, and we stamp the record so your warranty and resale value stay intact.',
  },
  'engine-auto-service': {
    h1: 'Engine Repair & Check Engine Light Diagnostics in Sanger, CA',
    title: 'Check Engine Light Repair in Sanger, CA',
    desc: 'Check engine light diagnostics and engine repair in Sanger, CA. Real testing before the estimate, not parts swapping. Call (559) 801-3460.',
    phrases: ['check engine light diagnostics in Sanger, CA', 'engine repair in Sanger', 'auto diagnostics near Fresno'],
    intro:
      'For check engine light diagnostics in Sanger, CA, the code is where we start, not where we finish. Engine repair in Sanger is a large part of what we do, and our auto diagnostics near Fresno are backed by manufacturer-level scan tools, a lab scope and a smoke machine, so you pay to fix the fault rather than to replace parts that were never broken.',
  },
  'heating-and-air-conditioner-repair': {
    h1: 'Car AC Repair in Sanger, CA',
    title: 'Car AC Repair in Sanger, CA',
    desc: 'Car AC repair in Sanger, CA. Leak testing, recharge and compressor work, plus up to 90% off through the California Cool Air Rebate Program.',
    phrases: ['car AC repair in Sanger, CA', 'auto air conditioning repair', 'AC recharge near Fresno'],
    intro:
      'Car AC repair in Sanger, CA is one of our busiest jobs from May onward, and for good reason: a Valley summer finds every weak system. Our auto air conditioning repair starts with a real diagnosis rather than a quick top-up, and if you only need an AC recharge near Fresno we will tell you that instead of selling you a compressor.',
  },
  'auto-electrical-services': {
    h1: 'Auto Electrical Repair in Sanger, CA',
    title: 'Auto Electrical Repair in Sanger, CA',
    desc: 'Auto electrical repair in Sanger, CA. Batteries, alternators, starters, parasitic drains and wiring faults traced properly. Call (559) 801-3460.',
    phrases: ['auto electrical repair in Sanger, CA', 'car battery replacement', 'alternator repair near Fresno'],
    intro:
      'Auto electrical repair in Sanger, CA is where most shops start guessing. We trace the circuit instead. Whether it is car battery replacement, alternator repair near Fresno, a starter that only clicks when hot, or a drain that flattens the car overnight, we find the actual fault before we quote it.',
  },
  'transmission-service': {
    h1: 'Transmission Repair & Service in Sanger, CA',
    title: 'Transmission Repair in Sanger, CA',
    desc: 'Transmission repair and fluid service in Sanger, CA. Slipping, harsh shifts and warning lights diagnosed before anything is replaced.',
    phrases: ['transmission repair in Sanger, CA', 'transmission fluid service', 'transmission shop near Fresno'],
    intro:
      'Transmission repair in Sanger, CA has a reputation for costing a fortune, which is exactly why we diagnose first. A transmission fluid service at the right interval prevents most of it, and plenty of faults that look terminal turn out to be a connector or a solenoid. As a transmission shop near Fresno, we would rather find that than sell you a rebuild.',
  },
  'suspension-service': {
    h1: 'Suspension & Steering Repair in Sanger, CA',
    title: 'Suspension Repair in Sanger, CA',
    desc: 'Suspension and steering repair in Sanger, CA. Struts, shocks, control arms, ball joints and wheel bearings on all makes and models.',
    phrases: ['suspension repair in Sanger, CA', 'shocks and struts replacement', 'steering repair near Fresno'],
    intro:
      'Suspension repair in Sanger, CA matters more than most drivers think: worn parts chew tires and lengthen stopping distances. We handle shocks and struts replacement, control arms, ball joints and wheel bearings, and steering repair near Fresno on everything from commuter cars to loaded work trucks.',
  },
};

/** Page-level title and description overrides, keyed by path. */
export const pageSeo = {
  '/': {
    title: 'European Auto Repair in Sanger, CA | Well Done Worx',
    desc: 'European auto repair in Sanger, CA. MINI, BMW, Audi and Porsche specialists servicing all makes. 5.0 stars from 40 reviews. Call (559) 801-3460.',
  },
  '/services/': {
    title: 'Auto Repair Services in Sanger, CA',
    desc: 'Auto repair in Sanger, CA: brakes, engine diagnostics, car AC repair, electrical, transmission, suspension and oil changes on all makes.',
  },
  '/vehicles-we-service/': {
    title: 'Makes We Service in Sanger, CA',
    desc: 'Foreign and domestic auto repair in Sanger, CA across 62 makes, from MINI, BMW, Audi and Porsche to everyday trucks. Find your make and book.',
  },
  '/appointments/': {
    title: 'Book Auto Repair in Sanger, CA',
    desc: 'Book an auto repair appointment in Sanger, CA. Tell us the vehicle and the symptom and we will confirm a time. Quotes welcome. Call (559) 801-3460.',
  },
  '/specials/': {
    title: 'Auto Repair Coupons in Sanger, CA',
    desc: 'Auto repair coupons and specials in Sanger, CA, including brake service from $199.99 per axle and up to 90% off eligible car AC repairs.',
  },
  '/rebates/': {
    title: 'California Cool Air Rebate: Car AC Repair',
    desc: 'Up to 90% off eligible car AC repair through the California Cool Air Rebate Program. Well Done Worx in Sanger, CA is a participating shop.',
  },
  '/reviews/': {
    title: 'Auto Repair Reviews in Sanger, CA',
    desc: 'Read 40 verified customer reviews of Well Done Worx, a 5.0-star auto repair shop in Sanger, CA specialising in European cars and honest diagnosis.',
  },
  '/contact/': {
    title: 'Contact & Directions, Sanger CA',
    desc: 'Well Done Worx auto repair, 78 Academy Ave, Sanger, CA 93657. Open Monday to Friday 8:00am to 4:30pm. Call (559) 801-3460 or send a message.',
  },
  '/sitemap/': {
    title: 'Site Map',
    desc: 'Every page on the Well Done Worx website: auto repair services in Sanger, CA, the makes we service, specials, reviews and contact details.',
  },
  '/privacy-policy/': {
    title: 'Privacy Policy',
    desc: 'How Well Done Worx auto repair in Sanger, CA collects, uses and protects the information you provide through this website.',
  },
};

/**
 * Vehicle pages. Only the four speciality marques get bespoke copy; the rest
 * take a template so 62 pages do not read as 62 copies of one another.
 */
export function makeSeo(make) {
  const n = make.name;
  return {
    h1: `${n} Repair in Sanger, CA`,
    title: `${n} Repair in Sanger, CA`,
    desc: `${n} repair in Sanger, CA. Brakes, engine diagnostics, car AC repair, electrical and transmission work with a written estimate first.`,
    intro: `Looking for ${n} repair in Sanger, CA? Well Done Worx services ${n} vehicles for everything from an oil change to major engine work, and we are a short drive for owners in Fresno, Clovis, Reedley and Parlier.`,
  };
}
