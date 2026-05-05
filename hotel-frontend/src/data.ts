/**
 * Royal Crown Hotel - Pyramids
 * Centralised, typed data for the marketing site.
 *
 * Sources of truth:
 * - Rooms, room photos, hotel description: scraped from the property's
 * Booking.com listing (Royal Crown Hotel Giza Pyramids View).
 * - Day tours, prices, photos: scraped from egypttoplight.net/day-tours.
 *
 * Hotel reservations go to HotelRunner via BOOKING_URL. Day-tour bookings go
 * to WhatsApp via whatsappTourLink(service) — message is prefilled with the
 * tour name, pricing tiers and a prompt for the guest to add date and group
 * size.
 */

/* -------------------------------------------------------------------------- */
/* Constants                                                                 */
/* -------------------------------------------------------------------------- */

export const BOOKING_URL =
  "https://royal-crown-hotel-pyramids.hotelrunner.com/bv3/search";

/** WhatsApp number used for day-tour bookings (Egypt Top Light Travel). */
export const TOUR_WHATSAPP_NUMBER = "201010735762";

/* -------------------------------------------------------------------------- */
/* Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface Room {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  /** Lowest nightly rate in EGP (as shown on Booking.com). */
  pricePerNight: number;
  /** Currency for pricePerNight. */
  currency: "EGP" | "USD";
  rating: 1 | 2 | 3 | 4 | 5;
  bookingUrl: string;
  longDescription?: string;
  bedType?: string;
  /** Floor area, e.g. "20 m²". */
  size?: string;
  maxGuests?: number;
  amenities?: string[];
  /** Optional view label, e.g. "City view", "Pyramid view". */
  view?: string;
}

export interface ServicePriceTier {
  /** "1 Person", "2 Persons", "3+ Persons", or "1 Person (5-Star)" etc. */
  label: string;
  price: number;
  /** Whether the price is total or per person. */
  unit?: "total" | "per person";
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  /** Short subtitle shown under the title (italic / amber accent in design). */
  subtitle?: string;
  description: string;
  image: string;
  /** Lowest tier price in USD. */
  priceFrom: number;
  /** Currency code shown next to prices. */
  currency: "USD";
  bookingUrl: string;
  featured?: boolean;
  longDescription?: string;
  /** "Full Day (~8 hrs)", "Half Day (~4 hrs)", "Evening (~3 hrs)", etc. */
  duration?: string;
  /** Departure / location, e.g. "Giza, Cairo". */
  location?: string;
  /** Top-line category from the source, e.g. "CULTURE & HISTORY". */
  category?: string;
  /** What's included in the tour. */
  includes?: string[];
  /** What's NOT included. */
  notIncluded?: string[];
  /** Pricing tiers by group size. */
  pricing?: ServicePriceTier[];
  /** Footer note shown under the pricing block, e.g. "Entry tickets not included". */
  pricingNote?: string;
  /** Optional set of punchy bullets for the detail page hero. */
  highlights?: string[];
  /** When true, the tour has no fixed price and we route to enquiry. */
  enquireOnly?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "facebook" | "twitter" | "instagram" | "youtube" | "tripadvisor";
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

/* -------------------------------------------------------------------------- */
/* Site-wide content                                                         */
/* -------------------------------------------------------------------------- */

export const SITE = {
  name: "Royal Crown Hotel - Pyramids",
  shortName: "Royal Crown",
  tagline: "Where the timeless pyramids meet modern luxury.",
  copyrightHolder: "Royal Crown Hotel - Pyramids",
  /** Booking.com aggregate rating (8.6 / 10 over 307 reviews at last sync). */
  bookingRating: 8.6,
  bookingReviews: 307,
} as const;

export const CONTACT: ContactInfo = {
  phone: "+20 237436815",
  whatsapp: "+20 1008787903",
  email: "reservations@royalcrownhotelpyramids.com",
  address: "Al Mansoureya Road, Giza, 3550250 Cairo, Egypt.",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Day Tours", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Send an Enquiry", href: "/send-an-enquiry" },
  { label: "Contact", href: "/contact" },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Royal-Crown-Hotel-Pyramids/61556013496330/",
    icon: "facebook",
  },
];

/* -------------------------------------------------------------------------- */
/* Hero slider                                                               */
/* -------------------------------------------------------------------------- */

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "A Room with the Pyramids in It",
    description:
      "Just 3.3 km from the Great Pyramids of Giza. Wake up, draw the curtain, and there they are — three thousand years of history outside your window.",
    image: "/images/sphinx.jpg",
    cta: { label: "Book Your Stay", href: BOOKING_URL },
  },
  {
    id: 2,
    title: "Comfortable, Modern Suites",
    description:
      "Air-conditioned rooms with private bathrooms, free Wi-Fi, minibars and Egyptian cotton bedding. Eight room types from cosy singles to family quadruples.",
    image: "/images/superior-double-room.jpg",
    cta: { label: "See All Rooms", href: "/rooms" },
  },
  {
    id: 3,
    title: "Sunset Over Cairo",
    description:
      "Garden, sun terrace, and a rooftop with a direct line of sight to the Giza plateau. Cocktail in hand, history on the horizon.",
    image: "/images/hotel-roof-view.jpeg",
    cta: { label: "Check Availability", href: BOOKING_URL },
  },
  {
    id: 4,
    title: "Egypt at Your Doorstep",
    description:
      "Pyramids, Saqqara, Alexandria, the Nile and beyond — our concierge runs a curated catalogue of private day tours.",
    image: "/images/pyramids-panorama.jpg",
    cta: { label: "Browse Day Tours", href: "/services" },
  },
];

/* -------------------------------------------------------------------------- */
/* Rooms                                                                     */
/* -------------------------------------------------------------------------- */

const HOTEL_BASE_AMENITIES = [
  "Air conditioning",
  "Ensuite bathroom",
  "Flat-screen TV",
  "Soundproofing",
  "Minibar",
  "Free WiFi",
  "Free toiletries",
  "Tea/coffee maker",
  "Telephone",
  "Refrigerator",
  "Safety deposit box",
  "Daily housekeeping",
];

export const rooms: Room[] = [
  {
    id: 1,
    title: "Royal King Room",
    slug: "king-room",
    description:
      "A king-size double bed with a view of the pyramids in a quiet, modern 20 m² room with ensuite bathroom and full hotel amenities.",
    longDescription:
      "Our most popular room for solo travellers who want space to spread out. The Royal King features a large double bed dressed in crisp linens, a bright ensuite bathroom, soundproofed windows and the full Royal Crown amenity set: Pyramids View, TV, safety deposit box and complimentary toiletries.",
    image: "/images/queen-bed.jpeg",
    pricePerNight: 13,
    currency: "USD",
    rating: 4,
    bookingUrl: BOOKING_URL,
    bedType: "1 king-size bed",
    size: "20 m²",
    maxGuests: 1,
    amenities: HOTEL_BASE_AMENITIES,
  },
  {
    id: 2,
    title: "Standard Single Room",
    slug: "standard-single-room",
    description:
      "A compact 18 m² single — perfect for solo travellers exploring the pyramids on a budget.",
    longDescription:
      "A neat, well-appointed 18 m² room designed for the solo traveller. Choose between a single bed or two singles when available. Soundproofed, air-conditioned, with free Wi-Fi and complimentary toiletries you'll find in our larger categories.",
    image: "/images/single-bed-in-room.jpg",
    pricePerNight: 11,
    currency: "USD",
    rating: 4,
    bookingUrl: BOOKING_URL,
    bedType: "1 queen bed",
    size: "18 m²",
    maxGuests: 1,
    amenities: HOTEL_BASE_AMENITIES,
  },
  {
    id: 3,
    title: "Standard Twin Room",
    slug: "standard-twin-room",
    description:
      "A 20 m² twin room with two single beds — ideal for friends or colleagues sharing.",
    longDescription:
      "Two single beds in a quiet 20 m² room with a private ensuite, soundproofed windows and the full hotel amenity set. A reliable choice for friends, siblings, or business travellers sharing.",
    image: "/images/twin-room.jpeg",
    pricePerNight: 18,
    currency: "USD",
    rating: 4,
    bookingUrl: BOOKING_URL,
    bedType: "2 single beds",
    size: "20 m²",
    maxGuests: 2,
    amenities: HOTEL_BASE_AMENITIES,
  },
  {
    id: 4,
    title: "Deluxe Double Room",
    slug: "deluxe-double-room",
    description:
      "An extra-large double bed and a Pyramids View — our most-loved room for couples in Giza.",
    longDescription:
      "An upgraded 20 m² room with an extra-large double bed and a window that frames the city. Dressed in warm tones with a marble-finished bathroom, TV and the full Royal Crown amenity set including free Wi-Fi.",
    image: "/images/double-room.jpeg",
    pricePerNight: 20,
    currency: "USD",
    rating: 4,
    bookingUrl: BOOKING_URL,
    bedType: "1 extra-large double bed",
    size: "20 m²",
    maxGuests: 2,
    view: "City view",
    amenities: ["City view", ...HOTEL_BASE_AMENITIES],
  },
  {
    id: 5,
    title: "Superior Double or Twin Room with City View",
    slug: "superior-double-or-twin-room-with-city-view",
    description:
      "A spacious 30 m² room with a city view — choose your bed configuration on arrival.",
    longDescription:
      "A genuinely spacious 30 m² room with a wide city view, configured as either a large double or two singles depending on availability. Bright, modern furnishings, a generous work area, and a marble-finished bathroom with rainfall shower. The full Royal Crown amenity set comes as standard.",
    image: "/images/superior-double-room.jpg",
    pricePerNight: 22,
    currency: "USD",
    rating: 5,
    bookingUrl: BOOKING_URL,
    bedType: "1 large double bed or 2 single beds (your choice)",
    size: "30 m²",
    maxGuests: 2,
    view: "City view",
    amenities: ["City view", ...HOTEL_BASE_AMENITIES],
  },
  {
    id: 6,
    title: "Standard Triple Room",
    slug: "standard-triple-room",
    description:
      "Three single beds in a 25 m² room — comfortable for friends, small families or three colleagues.",
    longDescription:
      "Three single beds laid out in a 25 m² room with private ensuite. Soundproofed, air-conditioned, with the full hotel amenity set. A flexible option for groups travelling together who'd rather share than split into separate rooms.",
    image: "/images/singleroom.jpg",
    pricePerNight: 30,
    currency: "USD",
    rating: 4,
    bookingUrl: BOOKING_URL,
    bedType: "3 single beds",
    size: "25 m²",
    maxGuests: 3,
    amenities: HOTEL_BASE_AMENITIES,
  },
  {
    id: 7,
    title: "Triple Room with View",
    slug: "triple-room-with-view",
    description:
      "Our largest triple — 35 m² with a city view and flexible bed configuration.",
    longDescription:
      "An upgraded 35 m² triple room with a city view, configured either as three singles or one single plus a large double. Plenty of space for a small family or three friends, with the full Royal Crown amenity set and a generous bathroom.",
    image: "/images/pyramids-view-room.jpeg",
    pricePerNight: 35,
    currency: "USD",
    rating: 5,
    bookingUrl: BOOKING_URL,
    bedType: "3 single beds — or 1 single + 1 large double",
    size: "35 m²",
    maxGuests: 3,
    view: "City view",
    amenities: ["City view", ...HOTEL_BASE_AMENITIES],
  },
  {
    id: 8,
    title: "Premium Quadruple Room",
    slug: "premium-quadruple-room",
    description:
      "A 30 m² family room with two singles and an extra-large double — sleeps four comfortably.",
    longDescription:
      "Designed with families in mind: two single beds plus one extra-large double in a generous 30 m² layout. Soundproofed, air-conditioned, with the full Royal Crown amenity set and ensuite bathroom. A practical, comfortable base for parents and kids exploring Giza together.",
    image: "/images/twin-room.jpeg",
    pricePerNight: 40,
    currency: "USD",
    rating: 5,
    bookingUrl: BOOKING_URL,
    bedType: "2 single beds + 1 extra-large double bed",
    size: "30 m²",
    maxGuests: 4,
    amenities: HOTEL_BASE_AMENITIES,
  },
];

/* -------------------------------------------------------------------------- */
/* Day Tours / Services                                                      */
/* -------------------------------------------------------------------------- */
/* Source: https://www.egypttoplight.net/day-tours                           */

export const services: Service[] = [
  {
    id: 1,
    title: "Giza Pyramids",
    subtitle: "Cheops, Khafre, Mykerinos & The Great Sphinx",
    slug: "giza-pyramids",
    description:
      "Private guided tour of all three Giza pyramids and the Great Sphinx, with an expert English-speaking guide bringing 5,000 years of history to life.",
    longDescription:
      "Step inside the Great Pyramid of Cheops, walk among the smaller satellite tombs and stand face to face with the Sphinx. Your private Egyptologist guide tailors the pace to you and brings the plateau's 5,000 years of history vividly to life. Hotel pickup and drop-off, lunch and a private air-conditioned vehicle are all included.",
    image: "/images/pyramids-sphinx.jpg",
    priceFrom: 70,
    currency: "USD",
    bookingUrl: "",
    featured: true,
    duration: "Full Day (~8 hrs)",
    location: "Giza, Cairo",
    category: "ANCIENT WONDERS",
    includes: [
      "Private air-conditioned vehicle",
      "English-speaking tour guide",
      "Lunch",
    ],
    notIncluded: ["Entry tickets to sites"],
    pricing: [
      { label: "1 Person", price: 70, unit: "total" },
      { label: "2 Persons", price: 100, unit: "total" },
      { label: "3+ Persons", price: 120, unit: "total" },
    ],
    pricingNote: "Entry tickets not included",
    highlights: [
      "Step inside the Great Pyramid",
      "Stand at the foot of the Sphinx",
      "Private Egyptologist guide",
      "Hotel pickup & drop-off",
    ],
  },
  {
    id: 2,
    title: "Saqqara, Memphis & Dahshour",
    subtitle: "Egypt's Oldest Burial Grounds & the Red & Bent Pyramids",
    slug: "saqqara-memphis-dahshour",
    description:
      "Visit Egypt's oldest step pyramid at Saqqara, the ancient capital Memphis, and the Bent and Red pyramids at Dahshour — the predecessors to Giza.",
    longDescription:
      "A full day in the burial grounds that came before Giza. Start at Saqqara with the Step Pyramid of Djoser, the oldest stone monument in the world. Move to Memphis, the ancient capital where the alabaster Sphinx and a colossal statue of Ramses II still rest. End at Dahshour where the Bent and Red pyramids show pharaonic engineers learning their craft.",
    image: "/images/step-pyramid-djoser.jpg",
    priceFrom: 70,
    currency: "USD",
    bookingUrl: "",
    duration: "Full Day (~8 hrs)",
    location: "South of Cairo",
    category: "ANCIENT HISTORY",
    includes: [
      "Private air-conditioned vehicle",
      "English-speaking tour guide",
      "Lunch",
    ],
    notIncluded: ["Entry tickets to sites"],
    pricing: [
      { label: "1 Person", price: 70, unit: "total" },
      { label: "2 Persons", price: 100, unit: "total" },
      { label: "3+ Persons", price: 120, unit: "total" },
    ],
    pricingNote: "Entry tickets not included",
    highlights: [
      "Step Pyramid of Djoser at Saqqara",
      "Ramses II statue at Memphis",
      "Bent & Red pyramids at Dahshour",
      "Private guide & vehicle",
    ],
  },
  {
    id: 3,
    title: "Cairo City Tour",
    subtitle: "Citadel, Islamic Cairo, Coptic Cairo & Egyptian Museum",
    slug: "cairo-city-tour",
    description:
      "One full day covering the Saladin Citadel, Khan el-Khalili bazaar, ancient Coptic churches, and the treasures of the Egyptian Museum.",
    longDescription:
      "A whirlwind through the layers of Cairo. Begin at the Saladin Citadel and the Mosque of Muhammad Ali, then drop into Coptic Cairo for the Hanging Church and St. Sergius. Lunch in Islamic Cairo, an afternoon at the Egyptian Museum among the Tutankhamun treasures, and a wander through the labyrinth of Khan el-Khalili.",
    image: "/images/khan-el-khalili.jpg",
    priceFrom: 70,
    currency: "USD",
    bookingUrl: "",
    duration: "Full Day (~9 hrs)",
    location: "Cairo",
    category: "CULTURE & HISTORY",
    includes: [
      "Private air-conditioned vehicle",
      "English-speaking tour guide",
      "Lunch",
    ],
    notIncluded: ["Entry tickets to sites"],
    pricing: [
      { label: "1 Person", price: 70, unit: "total" },
      { label: "2 Persons", price: 100, unit: "total" },
      { label: "3+ Persons", price: 120, unit: "total" },
    ],
    pricingNote: "Entry tickets not included",
    highlights: [
      "Saladin Citadel & Mosque of Muhammad Ali",
      "Egyptian Museum (Tutankhamun)",
      "Coptic & Islamic Cairo",
      "Khan el-Khalili bazaar",
    ],
  },
  {
    id: 4,
    title: "Bike Tour to the Pyramids",
    subtitle: "Explore Giza on Two Wheels at Sunset",
    slug: "bike-tour-pyramids",
    description:
      "A unique cycling adventure around the Giza Plateau. Ride through local villages, past camel farms, and get up-close views of the pyramids from angles most tourists never see.",
    longDescription:
      "A relaxed cycling loop that takes you off the bus-tour track. You'll roll through quiet local villages, alongside camel farms and onto plateau paths that approach the pyramids from the back. Bicycles, helmets, water and a friendly English-speaking guide are all included.",
    image: "/images/hot-air-balloon.jpg",
    priceFrom: 30,
    currency: "USD",
    bookingUrl: "",
    duration: "Half Day (~4 hrs)",
    location: "Giza, Cairo",
    category: "ADVENTURE",
    includes: ["Bicycle hire", "English-speaking guide", "Water"],
    notIncluded: ["Entry tickets to sites"],
    pricing: [
      { label: "1 Person", price: 50, unit: "total" },
      { label: "2 Persons", price: 60, unit: "total" },
      { label: "3+ Persons", price: 30, unit: "per person" },
    ],
    pricingNote: "Entry tickets not included",
    highlights: [
      "Sunset ride around the plateau",
      "Local villages and camel farms",
      "Off-the-bus angles on the pyramids",
      "Bikes, helmets and water provided",
    ],
  },
  {
    id: 5,
    title: "Dinner with Pyramids View",
    subtitle: "Fine Dining Overlooking the Giza Plateau",
    slug: "dinner-pyramids-view",
    description:
      "A memorable dinner at a rooftop restaurant with a direct view of the illuminated Giza pyramids — the perfect Cairo evening.",
    longDescription:
      "A long, lazy dinner at a rooftop restaurant looking straight onto the floodlit Giza plateau. We'll take care of hotel transfers in both directions and reserve your table; you choose between local and continental dishes once you arrive.",
    image: "/images/rooftop.jpg",
    priceFrom: 35,
    currency: "USD",
    bookingUrl: "",
    duration: "Evening (~3 hrs)",
    location: "Giza, Cairo",
    category: "ENTERTAINMENT",
    includes: ["Dinner", "Hotel transfers (both ways)"],
    notIncluded: ["Drinks", "Entry tickets"],
    pricing: [
      { label: "1 Person", price: 50, unit: "total" },
      { label: "2 Persons", price: 70, unit: "total" },
      { label: "3+ Persons", price: 35, unit: "per person" },
    ],
    pricingNote: "Drinks not included",
    highlights: [
      "Rooftop view of the lit pyramids",
      "Hotel transfers both ways",
      "Table reservation arranged",
      "Local & international menu",
    ],
  },
  {
    id: 6,
    title: "Dinner Nile Cruise",
    subtitle: "An Evening of Egyptian Magic on the River of Life",
    slug: "dinner-nile-cruise",
    description:
      "Cruise the Nile with an open buffet dinner and live folklore shows. Hotel transfers included. Choose 4-star or 5-star cruise.",
    longDescription:
      "Two hours on the water as Cairo lights up. The cruise leaves from a downtown jetty and traces the Nile through Zamalek and Garden City while you graze the open buffet and watch a tanoura whirling-dervish show and live music. Choose between a 4-star and a 5-star cruise — the menu and entertainment differ slightly.",
    image: "/images/dinner-nile-cruise.jpg",
    priceFrom: 35,
    currency: "USD",
    bookingUrl: "",
    duration: "Evening (~3–4 hrs)",
    location: "Cairo, Nile River",
    category: "ENTERTAINMENT",
    includes: [
      "Hotel transfers (both ways)",
      "Open buffet dinner",
      "Live dancing & entertainment shows",
    ],
    notIncluded: ["Drinks & beverages"],
    pricing: [
      { label: "1 Person · 5-Star", price: 65, unit: "total" },
      { label: "2 Persons · 5-Star", price: 90, unit: "total" },
      { label: "3+ Persons · 5-Star", price: 45, unit: "per person" },
      { label: "1 Person · 4-Star", price: 55, unit: "total" },
      { label: "2 Persons · 4-Star", price: 70, unit: "total" },
      { label: "3+ Persons · 4-Star", price: 35, unit: "per person" },
    ],
    pricingNote: "Drinks not included",
    highlights: [
      "Open buffet dinner aboard",
      "Live folklore & tanoura show",
      "4-star or 5-star cruise option",
      "Hotel transfers both ways",
    ],
  },
  {
    id: 7,
    title: "Sound & Light Show",
    subtitle: "Giza Plateau After Dark — History Comes Alive",
    slug: "sound-and-light-show",
    description:
      "Watch the pyramids and Sphinx come alive at night as a spectacular light show narrates 5,000 years of history across the Giza Plateau.",
    longDescription:
      "After sunset the plateau is bathed in light and sound: a 60-minute narrated show projected across the pyramids and Sphinx. Languages rotate through the week (English, Arabic, French, German, Spanish — confirm at booking). We arrange transfer to the venue; you take it from there.",
    image: "/images/sound-and-light.jpg",
    priceFrom: 20,
    currency: "USD",
    bookingUrl: "",
    duration: "Evening (~1.5 hrs)",
    location: "Giza Pyramids",
    category: "ENTERTAINMENT",
    includes: ["Transfer to Giza Plateau"],
    notIncluded: ["Entry tickets to the show"],
    pricing: [
      { label: "1 Person", price: 30, unit: "total" },
      { label: "2 Persons", price: 50, unit: "total" },
      { label: "3+ Persons", price: 20, unit: "per person" },
    ],
    pricingNote: "Show entry tickets not included",
    highlights: [
      "Pyramids & Sphinx lit at night",
      "60-minute narrated show",
      "Multiple language slots",
      "Round-trip transfer included",
    ],
  },
  {
    id: 8,
    title: "Alexandria Day Tour",
    subtitle: "The Pearl of the Mediterranean — Ancient City of Alexander",
    slug: "alexandria-day-tour",
    description:
      "A full-day trip to Alexandria covering the Catacombs, Roman Amphitheatre, Qaitbay Citadel, and the scenic Mediterranean Corniche. Lunch included.",
    longDescription:
      "Out of the desert and onto the Mediterranean. We'll drive you to Alexandria for a full day taking in the Catacombs of Kom el-Shoqafa, the Roman Amphitheatre, Qaitbay Citadel on the site of the ancient lighthouse, and a long lunch on the Corniche. Optional time at the beach if you'd like — let us know in advance.",
    image: "/images/qaitbay.jpg",
    priceFrom: 120,
    currency: "USD",
    bookingUrl: "",
    duration: "Full Day (~12 hrs)",
    location: "Alexandria",
    category: "CULTURE & HISTORY",
    includes: [
      "Private air-conditioned vehicle",
      "English-speaking tour guide",
      "Lunch",
    ],
    notIncluded: ["Entry tickets to sites", "Beach visit (optional, fee applies)"],
    pricing: [
      { label: "1 Person", price: 120, unit: "total" },
      { label: "2 Persons", price: 140, unit: "total" },
      { label: "3+ Persons", price: 160, unit: "total" },
    ],
    pricingNote: "Beach option available — enquire via WhatsApp for fee",
    highlights: [
      "Catacombs of Kom el-Shoqafa",
      "Qaitbay Citadel & Roman Amphitheatre",
      "Lunch on the Mediterranean",
      "Optional beach time",
    ],
  },
  {
    id: 9,
    title: "Nile Cruise — Aswan & Luxor",
    subtitle: "Upper Egypt's Greatest Temples by 5-Star River Cruise",
    slug: "nile-cruise-aswan-luxor",
    description:
      "5-star Nile cruise visiting Karnak, Valley of the Kings, Edfu, and Kom Ombo. Full board and Egyptologist guide included throughout.",
    longDescription:
      "Three nights, four days drifting between Aswan and Luxor (or the reverse) on a 5-star Nile boat. Karnak, the Valley of the Kings, Edfu, Kom Ombo, the Temple of Hatshepsut — the Upper Egypt highlight reel, all with a private Egyptologist guide and full board. Train or flight tickets to/from Cairo are not included; we can arrange them on request.",
    image: "/images/boat-nile.jpg",
    priceFrom: 325,
    currency: "USD",
    bookingUrl: "",
    duration: "4 Days / 3 Nights",
    location: "Aswan to Luxor (or reverse)",
    category: "NILE CRUISE",
    includes: [
      "5-Star cruise cabin",
      "Full board",
      "Egyptologist guide",
      "All temple visits during cruise",
    ],
    notIncluded: ["Train/flight tickets", "Entry tickets", "Abu Simbel tour", "Drinks"],
    pricing: [
      { label: "1 Person · single cabin", price: 565, unit: "total" },
      { label: "2 Persons · double cabin", price: 365, unit: "per person" },
      { label: "3+ Persons", price: 325, unit: "per person" },
    ],
    pricingNote: "Contact reservations for Luxor/Aswan day programs",
    highlights: [
      "Karnak & Luxor Temples",
      "Valley of the Kings",
      "Edfu & Kom Ombo",
      "Full-board on a 5-star cruiser",
    ],
  },
  {
    id: 10,
    title: "Red Sea Day Trip — El Sokna",
    subtitle: "Crystal Waters & Private 5-Star Beach on the Red Sea",
    slug: "red-sea-el-sokna",
    description:
      "Private transport to the Red Sea at El Sokna with full-day access to a 5-star private beach. Perfect for a relaxing break between sightseeing.",
    longDescription:
      "Two-hour drive east, then the rest of the day on a calm, clear stretch of the Red Sea. Sun loungers, a 5-star beach club and the option to add water sports or lunch on site. We collect you in the morning and have you back at the hotel for dinner.",
    image: "/images/red-sea-el-sokna.jpg",
    priceFrom: 95,
    currency: "USD",
    bookingUrl: "",
    duration: "Full Day (~10 hrs)",
    location: "El Sokna, Suez",
    category: "BEACH & RELAXATION",
    includes: [
      "Private air-conditioned transport (both ways)",
      "Access to 5-star private beach",
    ],
    notIncluded: ["Meals & drinks", "Water sports"],
    pricing: [
      { label: "1 Person", price: 120, unit: "total" },
      { label: "2 Persons", price: 170, unit: "total" },
      { label: "3+ Persons", price: 95, unit: "per person" },
    ],
    pricingNote: "Meals and activities available at own cost",
    highlights: [
      "Calm, clear Red Sea waters",
      "5-star private beach access",
      "Private transfers both ways",
      "A whole day to switch off",
    ],
  },
  {
    id: 11,
    title: "El Fayoum Oasis Day Tour",
    subtitle: "Lake Qarun · Wadi El Rayan Waterfalls · Desert Oasis",
    slug: "el-fayoum-oasis",
    description:
      "Private guided trip to El Fayoum oasis, the ancient Lake Qarun, and the famous Wadi El Rayan — Egypt's only natural waterfalls.",
    longDescription:
      "A day in Egypt's largest oasis. We start at Lake Qarun — once a Roman holiday retreat — then push deeper into the protectorate to Wadi El Rayan, where two lakes are joined by Egypt's only natural waterfalls. Time for a swim, sandboarding on request, and a slow drive back through the Western Desert.",
    image: "/images/white-desert-safari.jpg",
    priceFrom: 120,
    currency: "USD",
    bookingUrl: "",
    duration: "Full Day (~10 hrs)",
    location: "El Fayoum",
    category: "NATURE & OASIS",
    includes: [
      "Private air-conditioned transport",
      "English-speaking guide",
    ],
    notIncluded: ["Entry tickets", "Meals & drinks"],
    pricing: [
      { label: "1 Person", price: 120, unit: "total" },
      { label: "2 Persons", price: 160, unit: "total" },
      { label: "3+ Persons", price: 210, unit: "total" },
    ],
    pricingNote: "Entry tickets not included",
    highlights: [
      "Lake Qarun",
      "Wadi El Rayan waterfalls",
      "Western Desert views",
      "Optional sandboarding",
    ],
  },
  {
    id: 12,
    title: "Saint Catherine & Mount Sinai",
    subtitle: "Prophet Moses Mountain · Sunrise Trek · Ancient Monastery",
    slug: "saint-catherine-mount-sinai",
    description:
      "Overnight journey to Mount Sinai for a pre-dawn summit climb to catch the sunrise, then visit St. Catherine's Monastery — one of the oldest in the world.",
    longDescription:
      "A demanding overnight: we leave Cairo late evening for the long drive to the Sinai. You'll start the mountain climb in the dark with a Bedouin guide, summit Mount Sinai for sunrise, then descend to St. Catherine's Monastery — one of the oldest continuously-inhabited Christian monasteries in the world. Pricing varies by season and group size — contact us for a tailored quote.",
    image: "/images/tour-desert-camping.jpg",
    priceFrom: 0,
    currency: "USD",
    bookingUrl: "",
    duration: "1 Night / 2 Days",
    location: "Sinai Peninsula",
    category: "SPIRITUAL & ADVENTURE",
    includes: [
      "Night transport to Mount Sinai",
      "Guided mountain trek",
      "Visit to St. Catherine's Monastery",
    ],
    notIncluded: ["Entry fees", "Meals"],
    enquireOnly: true,
    pricingNote:
      "Price on request — please contact reservations for current pricing & availability",
    highlights: [
      "Sunrise from Mount Sinai",
      "St. Catherine's Monastery",
      "Bedouin mountain guide",
      "An unforgettable overnight",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                   */
/* -------------------------------------------------------------------------- */

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Build the prefilled WhatsApp deep-link for a tour booking.
 * Mirrors the format used on egypttoplight.net so the message reads naturally
 * when it lands in the partner's WhatsApp.
 */
export function whatsappTourLink(s: Service): string {
  const lines: string[] = [
    `Hello! I'd like to book the following day tour:`,
    ``,
    `*${s.title}*`,
  ];
  if (s.subtitle) lines.push(s.subtitle);
  if (s.location) lines.push(`Location: ${s.location}`);
  if (s.duration) lines.push(`Duration: ${s.duration}`);

  if (s.pricing && s.pricing.length) {
    lines.push(``, `Pricing:`);
    s.pricing.forEach((t) => {
      const suffix = t.unit === "per person" ? " /pp" : "";
      lines.push(`  ${t.label}: USD ${t.price}${suffix}`);
    });
  }

  lines.push(
    ``,
    `Please let me know your group size, preferred date, and any further details. Thank you!`,
  );

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${TOUR_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Resolve the booking URL for a service:
 * - WhatsApp deep link with prefilled text by default
 * - Mailto enquiry for tours marked enquireOnly
 */
export function getServiceBookingHref(s: Service): string {
  if (s.enquireOnly) {
    const subject = `Enquiry — ${s.title}`;
    const body = `Hello,\n\nI'd like to enquire about "${s.title}".\nPreferred date:\nGroup size:\n\nThank you.`;
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return whatsappTourLink(s);
}
