// ---------------------------------------------------------------------------
// Single source of truth for the whole site. Edit here, then `npm run build`.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Well Done Worx',
  tagline: 'European Auto Repair Specialists',
  origin: 'https://welldoneworx.com',
  // Formspree / Basin / custom endpoint. Leave '' to fall back to Netlify Forms.
  formEndpoint: '',
  // Swap for a real 1200x630 photo of the shop when you have one (og.jpg).
  ogImage: '/assets/img/og.jpg',

  logo: { src: '/assets/img/logo.png', w: 330, h: 150 },
  hero: '/assets/img/hero-audi.webp',
  bandImage: '/assets/img/technician.webp',

  payments: [
    { label: 'Visa', img: '/assets/img/pay/visa.png' },
    { label: 'Mastercard', img: '/assets/img/pay/mastercard.png' },
    { label: 'American Express', img: '/assets/img/pay/americanexpress.png' },
    { label: 'Discover', img: '/assets/img/pay/discover.png' },
    { label: 'Check', img: '/assets/img/pay/check.png' },
  ],

  phone: '(559) 801-3460',
  phoneHref: 'tel:+15598013460',
  street: '78 Academy Ave',
  city: 'Sanger',
  state: 'CA',
  zip: '93657',
  geo: { lat: 36.708, lng: -119.556 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=78+Academy+Ave+Sanger+CA+93657',
  facebook: 'https://www.facebook.com/profile.php?id=61577527148283',

  hours: [
    { day: 'Monday', short: 'Mon', open: '08:00', close: '16:30' },
    { day: 'Tuesday', short: 'Tue', open: '08:00', close: '16:30' },
    { day: 'Wednesday', short: 'Wed', open: '08:00', close: '16:30' },
    { day: 'Thursday', short: 'Thu', open: '08:00', close: '16:30' },
    { day: 'Friday', short: 'Fri', open: '08:00', close: '16:30' },
    { day: 'Saturday', short: 'Sat', closed: true },
    { day: 'Sunday', short: 'Sun', closed: true },
  ],

  rating: { value: '5.0', count: 40 },
  specialties: ['MINI Cooper', 'BMW', 'Audi', 'Porsche'],

  amenities: [
    { label: 'Free Wi-Fi', icon: 'wifi', img: '/assets/img/amenity-wifi.svg', note: 'Keep working while you wait.' },
    { label: 'Refreshments', icon: 'cup', img: '/assets/img/amenity-refreshments.png', note: 'Coffee and cold water on us.' },
    { label: 'Waiting Area', icon: 'chair', img: '/assets/img/amenity-waiting.png', note: 'Clean, quiet and air conditioned.' },
    { label: 'Key Drop-Off', icon: 'key', img: '/assets/img/amenity-keydrop.png', note: 'Drop before hours, we take it from there.' },
  ],

  nav: [
    { label: 'Services', href: '/services/' },
    { label: 'Vehicles', href: '/vehicles-we-service/' },
    { label: 'Specials', href: '/specials/' },
    { label: 'A/C Rebate', href: '/rebates/' },
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Contact', href: '/contact/' },
  ],
};

site.addressLine = site.street + ', ' + site.city + ', ' + site.state + ' ' + site.zip;

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const services = [
  {
    slug: 'brake-service',
    title: 'Brake Service',
    short: 'Pads, rotors, calipers, lines and fluid, inspected and replaced to spec.',
    icon: 'brake',
    img: '/assets/img/svc-brakes.webp',
    banner: '/assets/img/banner-brakes.webp',
    lede: 'Brakes are the one system you never want to learn about the hard way. We measure pad thickness and rotor runout, test the fluid for moisture, and tell you what actually needs doing.',
    body: [
      'European braking systems run tighter tolerances and usually carry wear sensors, electronic parking brakes and service-position modes that need a scan tool to retract and reset. We have the equipment to do it properly, so the dash stays clear and the system recalibrates the way the factory intended.',
      'Every brake job ends with a road test before the keys go back in your hand. If the pedal feels soft, the car pulls, or you hear a grind at low speed, come in for an inspection first. A pad-and-rotor service costs a great deal less than a caliper and a hub.',
    ],
    items: [
      'Brake inspection and measurement',
      'Brake pad replacement',
      'Brake rotor replacement and resurfacing',
      'Brake caliper replacement',
      'Brake line repair and replacement',
      'Brake fluid flush and moisture testing',
      'Electronic parking brake service and reset',
      'ABS warning light diagnostics',
    ],
    symptoms: [
      'Squealing or grinding when stopping',
      'Soft or sinking pedal',
      'Pulling to one side under braking',
      'Steering wheel shudder at highway speed',
      'Brake or ABS warning light on',
    ],
  },
  {
    slug: 'standard-maintenance-auto-service',
    title: 'Maintenance & Scheduled Service',
    short: 'Factory-interval service, oil changes, filters, fluids and inspections.',
    icon: 'wrench',
    photo: '/assets/img/photo-diagnostics.webp',
    img: '/assets/img/svc-maintenance.webp',
    banner: '/assets/img/banner-maintenance.webp',
    lede: 'Nothing extends the life of a car like keeping to its service schedule. We follow the manufacturer intervals for your exact model, use the correct oil specification, and document it so warranty and resale value stay intact.',
    body: [
      'A modern European engine is far less forgiving about oil grade than an older domestic four-cylinder. The wrong specification is a fast route to timing chain wear and clogged variable-valve solenoids. We stock the correct approvals and note them on your invoice.',
      'Scheduled service is also the best chance to catch problems while they are still cheap. Every visit includes a visual inspection of belts, hoses, suspension, brakes and leaks, and we show you anything we flag rather than just listing it.',
    ],
    items: [
      'Factory scheduled maintenance',
      '30k / 60k / 90k / 120k mile services',
      'Oil and filter changes to factory specification',
      'Engine, cabin and fuel filter replacement',
      'Fluid services: coolant, brake, transmission, differential',
      'Tune-ups and computer diagnostics',
      'Check engine light diagnostics',
      'Wiper blade replacement',
      'Pre-trip and pre-purchase inspections',
      'Shock, strut, chassis and steering inspection',
    ],
    symptoms: [
      'Service or maintenance reminder is lit',
      'Overdue on a mileage interval',
      'Buying or selling a used car',
      'About to take a long trip',
    ],
  },
  {
    slug: 'engine-auto-service',
    title: 'Engine Service & Diagnostics',
    short: 'Check engine lights, drivability faults, cooling systems and rebuilds.',
    icon: 'engine',
    photo: '/assets/img/photo-engine.webp',
    img: '/assets/img/svc-engine.webp',
    banner: '/assets/img/banner-engine.webp',
    lede: 'A check engine light is a starting point, not a diagnosis. We pull the codes, then test the circuit the code points at, because the same code can mean a twelve dollar hose or a nine hundred dollar pump.',
    body: [
      'Diagnostic work here is done with manufacturer-level scan tools, a lab scope and a smoke machine, so we can watch live data, test real signals and find vacuum leaks instead of replacing parts on a hunch. You get a written diagnosis and an estimate before any repair begins.',
      'We handle the full range, from a misfire or timing chain rattle through to cylinder head rebuilds, timing belt service and complete engine replacement. If a repair costs more than the car is worth, we will tell you that too.',
    ],
    items: [
      'Check engine light and drivability diagnostics',
      'Engine repair and replacement',
      'Timing belt and timing chain service',
      'Cylinder head repair and rebuild',
      'Cooling system, radiator and water pump service',
      'Belt and hose replacement',
      'Fuel injection service and repair',
      'Fuel and ignition system repair',
      'Oil leak diagnosis and resealing',
      'Compression and leak-down testing',
    ],
    symptoms: [
      'Check engine light on or flashing',
      'Rough idle, misfire or hesitation',
      'Overheating or losing coolant',
      'Oil spots on the driveway',
      'Loss of power or poor fuel economy',
    ],
  },
  {
    slug: 'heating-and-air-conditioner-repair',
    title: 'Heating & Air Conditioning',
    short: 'A/C diagnosis, leak testing, recharge, compressors and heater repair.',
    icon: 'climate',
    img: '/assets/img/svc-climate.webp',
    banner: '/assets/img/banner-climate.webp',
    lede: 'In a Valley summer, air conditioning is not a luxury. We do not simply top up the refrigerant and send you off. We find out why it went low in the first place.',
    body: [
      'Our A/C process is a real diagnosis: evacuate and measure what is actually in the system, pressure test with nitrogen, check for leaks with dye and an electronic sniffer, then recharge to the exact factory weight. That is the difference between a repair that lasts and one that is blowing warm again by August.',
      'If your vehicle qualifies, the California Cool Air Rebate Program can cover up to 90% of an eligible R-134a leak repair, and the qualifying test is fully covered. We are a participating shop.',
    ],
    items: [
      'A/C performance testing and diagnostics',
      'Leak detection with nitrogen, dye and electronic sniffer',
      'Evacuate and recharge to factory weight',
      'Compressor repair and replacement',
      'Condenser, evaporator and expansion valve service',
      'Heater core and heating system repair',
      'Blower motor and blend door repair',
      'Belt repair and replacement',
      'Cabin air filter replacement',
    ],
    symptoms: [
      'Air blows warm or barely cool',
      'A/C works, then quits a few weeks later',
      'Loud click or squeal when the A/C engages',
      'No heat, or lukewarm defrost',
      'Musty smell from the vents',
    ],
    cta: { label: 'Check if you qualify for the A/C rebate', href: '/rebates/' },
  },
  {
    slug: 'auto-electrical-services',
    title: 'Auto Electrical Services',
    short: 'Batteries, charging, starting, wiring faults and parasitic drains.',
    icon: 'bolt',
    img: '/assets/img/svc-electrical.webp',
    banner: '/assets/img/banner-electrical.webp',
    lede: 'Electrical faults are where most shops give up and start guessing. Wiring diagrams, a scope and patience are what actually find them, and that is how we work.',
    body: [
      'Modern European cars run dozens of control modules across several communication networks. A single chafed wire or corroded ground can throw a dozen unrelated warning lights. We trace the circuit rather than swapping modules, which keeps the bill honest.',
      'We also do the everyday electrical work: a battery that will not hold overnight, a starter that clicks on hot days, a window that stopped going up, a headlight that keeps burning out.',
    ],
    items: [
      'Electrical system diagnostics and repair',
      'Battery testing, replacement and registration',
      'Parasitic draw and no-start diagnosis',
      'Alternator and charging system repair',
      'Starter repair and replacement',
      'Wiring and connector repair',
      'Power window, lock and antenna repair',
      'Power steering repair, electric and hydraulic',
      'Wiper motor and linkage repair',
      'Lighting repair and bulb replacement',
    ],
    symptoms: [
      'Dead after sitting overnight',
      'Clicks but will not crank',
      'Battery light or several warning lights at once',
      'Windows, locks or lights working intermittently',
      'Flickering dash or dim headlights',
    ],
  },
  {
    slug: 'transmission-service',
    title: 'Transmission Service',
    short: 'Fluid service, shift-quality diagnosis and drivetrain repair.',
    icon: 'gear',
    img: '/assets/img/svc-transmission.webp',
    banner: '/assets/img/banner-transmission.webp',
    lede: 'The lifetime-fill transmission is a marketing term, not an engineering one. Fresh fluid at the right interval is one of the cheapest ways to avoid a five-figure repair.',
    body: [
      'We service automatic and manual transmissions with the correct fluid specification and, where the design requires it, a scan-tool-controlled fill at the proper fluid temperature. Setting the level on a modern sealed unit is a procedure, not a dipstick.',
      'If your transmission is flaring between gears, banging into drive or throwing a fault, we diagnose before recommending anything. Plenty of transmission problems turn out to be a connector, a solenoid or a sensor.',
    ],
    items: [
      'Transmission fluid and filter service',
      'Shift quality and slipping diagnosis',
      'Transmission fault code diagnostics',
      'Solenoid, sensor and valve body repair',
      'Clutch inspection and replacement',
      'Differential and transfer case service',
      'CV axle and driveshaft repair',
    ],
    symptoms: [
      'Slipping, flaring or harsh shifts',
      'Delay when selecting drive or reverse',
      'Transmission warning light or limp mode',
      'Whine or clunk from the drivetrain',
      'Burnt smell from the fluid',
    ],
  },
  {
    slug: 'suspension-service',
    title: 'Suspension & Steering',
    short: 'Struts, shocks, bushings, control arms and steering components.',
    icon: 'suspension',
    photo: '/assets/img/photo-undercar.webp',
    img: '/assets/img/svc-suspension.webp',
    banner: '/assets/img/banner-suspension.webp',
    lede: 'Worn suspension does more than make the ride harsh. It chews through tires, lengthens stopping distances and makes the car unpredictable in an emergency lane change.',
    body: [
      'European chassis use a lot of individual links and bushings, which is why they handle so well and why one worn part is easy to miss. We inspect the whole assembly on a lift, identify what is genuinely loose, and fit quality parts that will not need doing again next year.',
      'Suspension work should be followed by an alignment check. We will tell you when it is actually needed rather than adding it to every ticket.',
    ],
    items: [
      'Strut and shock replacement',
      'Control arm and bushing replacement',
      'Ball joint and tie rod replacement',
      'Sway bar link and bushing service',
      'Wheel bearing and hub replacement',
      'Steering rack and pump repair',
      'Coil spring and air suspension repair',
      'Suspension noise diagnosis',
    ],
    symptoms: [
      'Clunk or rattle over bumps',
      'Uneven or cupped tire wear',
      'Car wanders or feels loose at speed',
      'Nose dives hard under braking',
      'Steering wheel off centre or vibrating',
    ],
  },
];

// ---------------------------------------------------------------------------
// Vehicles serviced
// ---------------------------------------------------------------------------

const EU = 'european';
const ASIAN = 'asian';
const DOM = 'domestic';

export const makes = [
  { name: 'Acura', slug: 'acura', group: ASIAN },
  { name: 'Alfa Romeo', slug: 'alfa-romeo', group: EU },
  { name: 'American Motors', slug: 'american-motors', group: DOM },
  {
    name: 'Audi', slug: 'audi', group: EU, featured: true,
    note: 'Audi is one of our specialities. Timing chain tensioners, carbon build-up on direct-injection engines, water pump and thermostat housing leaks, and quattro driveline service are routine work here, and we have the factory-level tooling to code and adapt after the repair.',
  },
  { name: 'Austin', slug: 'austin', group: EU },
  {
    name: 'BMW', slug: 'bmw', group: EU, featured: true,
    note: 'BMW is core to what we do. Valve cover and oil filter housing leaks, VANOS and eccentric shaft faults, cooling system failures across the N54, N55 and N20 families, and electronic parking brake service are all handled in-house with the diagnostic equipment those jobs require.',
  },
  { name: 'Buick', slug: 'buick', group: DOM },
  { name: 'Cadillac', slug: 'cadillac', group: DOM },
  { name: 'Checker', slug: 'checker', group: DOM },
  { name: 'Chevrolet', slug: 'chevrolet', group: DOM },
  { name: 'Chrysler', slug: 'chrysler', group: DOM },
  { name: 'Daewoo', slug: 'daewoo', group: ASIAN },
  { name: 'Daihatsu', slug: 'daihatsu', group: ASIAN },
  { name: 'Dodge', slug: 'dodge', group: DOM },
  { name: 'Eagle', slug: 'eagle', group: DOM },
  { name: 'Fiat', slug: 'fiat', group: EU },
  { name: 'Ford', slug: 'ford', group: DOM },
  { name: 'Geo', slug: 'geo', group: DOM },
  { name: 'GMC', slug: 'gmc', group: DOM },
  { name: 'Honda', slug: 'honda', group: ASIAN },
  { name: 'Hummer', slug: 'hummers', group: DOM },
  { name: 'Hyundai', slug: 'hyundai', group: ASIAN },
  { name: 'Infiniti', slug: 'infiniti', group: ASIAN },
  { name: 'International', slug: 'international', group: DOM },
  { name: 'Isuzu', slug: 'isuzu', group: ASIAN },
  { name: 'Jaguar', slug: 'jaguar', group: EU },
  { name: 'Jeep', slug: 'jeep', group: DOM },
  { name: 'Kia', slug: 'kia', group: ASIAN },
  { name: 'Lancia', slug: 'lancia', group: EU },
  { name: 'Land Rover', slug: 'land-rover', group: EU },
  { name: 'Lexus', slug: 'lexus', group: ASIAN },
  { name: 'Lincoln', slug: 'lincoln', group: DOM },
  { name: 'Mazda', slug: 'mazda', group: ASIAN },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', group: EU },
  { name: 'Mercury', slug: 'mercury', group: DOM },
  { name: 'Merkur', slug: 'merkur', group: EU },
  { name: 'MG', slug: 'mg', group: EU },
  {
    name: 'MINI', slug: 'mini', group: EU, featured: true,
    note: 'MINI Cooper work is a speciality rather than an occasional job. Timing chain and tensioner rattle, thermostat housing and water pump leaks, carbon cleaning on the turbocharged N14 and N18 engines, and clutch and transmission service are all things we do regularly.',
  },
  { name: 'Mitsubishi', slug: 'mitsubishi', group: ASIAN },
  { name: 'Nissan', slug: 'nissan', group: ASIAN },
  { name: 'Oldsmobile', slug: 'oldsmobile', group: DOM },
  { name: 'Opel', slug: 'opel', group: EU },
  { name: 'Peugeot', slug: 'peugeot', group: EU },
  { name: 'Plymouth', slug: 'plymouth', group: DOM },
  { name: 'Pontiac', slug: 'pontiac', group: DOM },
  {
    name: 'Porsche', slug: 'porsche', group: EU, featured: true,
    note: 'Porsche service is done here with the care the marque deserves: factory-interval maintenance, IMS and RMS leak inspection on the M96 and M97 engines, coolant and A/C system work, brake and suspension refresh, and pre-purchase inspections before you buy.',
  },
  { name: 'RAM', slug: 'ram', group: DOM },
  { name: 'Renault', slug: 'renault', group: EU },
  { name: 'Saab', slug: 'saab', group: EU },
  { name: 'Saturn', slug: 'saturn', group: DOM },
  { name: 'Scion', slug: 'scion', group: ASIAN },
  { name: 'Smart', slug: 'smart-cars', group: EU },
  { name: 'Sterling', slug: 'sterling', group: EU },
  { name: 'Subaru', slug: 'subaru', group: ASIAN },
  { name: 'Suzuki', slug: 'suzuki', group: ASIAN },
  { name: 'Toyota', slug: 'toyota', group: ASIAN },
  { name: 'Triumph', slug: 'triumph', group: EU },
  { name: 'Volkswagen', slug: 'volkswagen', group: EU },
  { name: 'Volvo', slug: 'volvo', group: EU },
  { name: 'Yugo', slug: 'yugo', group: EU },
  { name: 'ZAP', slug: 'zap', group: DOM },
];

export const makeGroups = [
  { key: EU, label: 'European' },
  { key: ASIAN, label: 'Asian Imports' },
  { key: DOM, label: 'Domestic' },
];

// ---------------------------------------------------------------------------
// Reviews. Summaries of verified customer reviews — re-sync from the review
// provider rather than editing these by hand long term.
// ---------------------------------------------------------------------------

export const reviews = [
  {
    author: 'Lisa S.', initials: 'LS', vehicle: '2020 Chevrolet', date: '2026-08-28', stars: 5,
    text: 'Fast, excellent oil change and air filter, done in a timely manner and the price is good. Very professional work. I will not trust my car with any other mechanic.',
  },
  {
    author: 'Tejas J.', initials: 'TJ', vehicle: '2004 Volvo', date: '2026-08-10', stars: 5,
    text: 'My Volvo broke down in the canyons and other places refused the job. Artem gave me a full diagnosis so I could decide whether it was worth fixing, and was professional and responsive throughout. I would recommend him for European cars again.',
  },
  {
    author: 'Don M.', initials: 'DM', vehicle: '2003 Dodge', date: '2026-07-31', stars: 5,
    text: 'Very caring, thorough, and confident in his work. Does a good job.',
  },
  {
    author: 'Rosemary E.', initials: 'RE', vehicle: '2010 Hyundai', date: '2026-07-29', stars: 5,
    text: 'They tested the whole A/C system properly instead of just topping it up. Found the real charge level, pressure tested it, then recharged it. Blows cold again.',
  },
  {
    author: 'Guss E.', initials: 'GE', vehicle: '2017 RAM 2500 HD', date: '2026-07-04', stars: 5,
    text: 'Big job, a front timing cover leak that meant lifting the cab. They explained exactly what they found, resealed everything properly, and road tested it before handing it back. No leaks.',
  },
  {
    author: 'Verified Customer', initials: 'VC', vehicle: '2007 Dodge', date: '2026-07-29', stars: 5,
    text: 'Excellent job, and finished right on time. I appreciate the hard work.',
  },
];

// ---------------------------------------------------------------------------
// Specials
// ---------------------------------------------------------------------------

export const specials = [
  {
    title: 'Brake Service & Repair',
    price: '$199.99',
    unit: 'per axle, most vehicles',
    fine: 'Plus tax. Certain restrictions apply. Cannot be combined with other offers.',
    expires: '2026-10-01',
    href: '/services/brake-service/',
  },
  {
    title: 'A/C Repair Rebate',
    price: 'Up to 90% off',
    unit: 'eligible A/C leak repairs',
    fine: 'Through the California Cool Air Rebate Program. The qualifying test is covered in full when the repair is eligible.',
    href: '/rebates/',
    badge: 'State program',
  },
  {
    title: 'A/C Test & Diagnosis',
    price: 'No charge',
    unit: 'for Cool Air Rebate applicants',
    fine: 'Applies to vehicles pre-qualified through coolairrebate.org.',
    href: '/rebates/',
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqs = [
  {
    q: 'Do you only work on European cars?',
    a: 'No. We service all makes and models, domestic and import. European vehicles, particularly MINI, BMW, Audi and Porsche, are our speciality and that is where the extra tooling and training goes, but a Chevrolet Traverse or a RAM 2500 gets exactly the same standard of work.',
  },
  {
    q: 'Do I need an appointment?',
    a: 'It helps a great deal. Request one online or call (559) 801-3460 and we will confirm a time. If you need to leave the car before we open, use the key drop-off and we will call you once we have looked at it.',
  },
  {
    q: 'Will you tell me the cost before you start?',
    a: 'Always. We diagnose first, then give you a written estimate and an explanation of what we found. Nothing is repaired without your approval.',
  },
  {
    q: 'Can you do my scheduled maintenance without voiding the warranty?',
    a: 'Yes. Under the Magnuson-Moss Warranty Act an independent shop can perform your scheduled maintenance without affecting a manufacturer warranty, provided the correct parts and specifications are used. We document all of it on your invoice.',
  },
  {
    q: 'How does the California A/C rebate work?',
    a: 'The Cool Air Rebate Program can cover up to 90% of an eligible R-134a air conditioning leak repair. Pre-qualify at coolairrebate.org, submit your application, and once approved bring your confirmation to us for the test and the repair. The qualifying test costs you nothing when the repair is covered.',
  },
  {
    q: 'Where are you and when are you open?',
    a: 'We are at 78 Academy Ave in Sanger, CA 93657, open Monday to Friday from 8:00am to 4:30pm and closed at weekends.',
  },
];
