import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  MapPin,
  Utensils,
  Plane,
  Coffee,
  ShieldCheck,
  Sparkles,
  Quote,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import {
  rooms,
  services,
  getServiceBookingHref,
  SITE,
  type Service,
} from "@/data";

const HOME_ROOMS = ["king-room", "deluxe-double-room", "superior-double-or-twin-room-with-city-view", "premium-quadruple-room"];

function formatRoomPrice(price: number): string {
  return `$${new Intl.NumberFormat("en-US").format(price)}`;
}

function servicePriceLabel(s: Service): string {
  if (s.enquireOnly) return "Price on request";
  return `From $${s.priceFrom}`;
}

export default function Home() {
  const featuredService =
    services.find((s) => s.featured) ?? services[0];
  const homeRooms = HOME_ROOMS.map((slug) => rooms.find((r) => r.slug === slug)).filter(
    (r): r is NonNullable<typeof r> => Boolean(r),
  );
  const homeServices = services
    .filter((s) => s.id !== featuredService.id)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-indigo-950 text-slate-100">
      <Navbar variant="transparent" />
      <HeroSlider />

      {/* Trust strip */}
      <section className="relative -mt-12 z-10 px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-200 via-violet-200 to-indigo-200 shadow-2xl shadow-indigo-900/20 ring-1 ring-white sm:grid-cols-4">
          {[
            { icon: Star, label: "Booking rating", value: `${SITE.bookingRating} / 10`, sub: `${SITE.bookingReviews} reviews` },
            { icon: MapPin, label: "Distance", value: "5 minute walk", sub: "to the Grand Egyptian Museum" },
            { icon: Utensils, label: "Meals", value: "Breakfast and Dinner Available", sub: "BB and HB options" },
            { icon: Plane, label: "Airport", value: "30 mins", sub: "from CAI" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-1 bg-white p-5 text-center text-indigo-900">
              <Icon className="h-5 w-5 text-violet-500" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {label}
              </p>
              <p className="font-serif text-2xl">{value}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section className="bg-slate-50 py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <header className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">
              Stay With Us
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Our Hotel Rooms
            </h2>
            <div className="mx-auto mt-5 flex w-32 items-center gap-1">
              <span className="h-px flex-1 bg-indigo-500" />
              <span className="h-1.5 w-1.5 rotate-45 bg-indigo-500" />
              <span className="h-px flex-1 bg-indigo-500" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-600">
              Numerous room categories from cosy singles to spacious family
              quadruples, all with air conditioning, ensuite bathroom, free
              Wi-Fi, and the full Royal Crown amenity set.
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {homeRooms.map((room) => (
              <article
                key={room.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-xl"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 inline-flex items-center justify-center rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="hover:text-indigo-600"
                    >
                      {room.title}
                    </Link>
                  </h3>
                  <div className="mt-1 flex items-center gap-0.5 text-indigo-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < room.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {room.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      From{" "}
                      <span className="text-lg font-semibold text-indigo-900">
                        {formatRoomPrice(room.pricePerNight)}
                      </span>{" "}
                      / night
                    </p>
                    <a
                      href={room.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Book →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-900 hover:text-indigo-900"
            >
              View all rooms <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services / Day Tours */}
      <section className="relative bg-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <header className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-violet-300">
              Day Tours & Excursions
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Egypt at Your Doorstep
            </h2>
            <div className="mx-auto mt-5 flex w-32 items-center gap-1">
              <span className="h-px flex-1 bg-violet-300" />
              <span className="h-1.5 w-1.5 rotate-45 bg-violet-300" />
              <span className="h-px flex-1 bg-violet-300" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm text-white/70">
              Twelve curated private tours: pyramids, Nile cruises, Alexandria,
              the Red Sea, Mount Sinai. Booking goes via WhatsApp — pick a tour
              and we'll send you the prefilled message.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Featured */}
            <Link
              href={`/services/${featuredService.slug}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={featuredService.image}
                  alt={featuredService.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                {featuredService.category && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-300">
                    {featuredService.category}
                  </p>
                )}
                <h3 className="mt-1 font-serif text-2xl md:text-3xl">
                  {featuredService.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/85">
                  {featuredService.description}
                </p>
                <p className="mt-4 text-sm text-violet-300">
                  <span className="text-xl font-semibold">
                    {servicePriceLabel(featuredService)}
                  </span>
                </p>
              </div>
            </Link>

            {/* Secondary tiles */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {homeServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 640px) 16vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h4 className="font-serif text-base leading-tight">
                      {s.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-violet-300">
                      {servicePriceLabel(s)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transit
ion-colors hover:border-violet-300 hover:text-violet-300"
            >
              All 12 day tours <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={getServiceBookingHref(featuredService)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Book {featuredService.title} on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Why book direct */}
      <section className="bg-white py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <header className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">
              Why book direct
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Better rates, fewer surprises.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-600">
              Skip the commission, talk to the people who actually run the hotel, and lock in our best available rate.
            </p>
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Best rate, guaranteed", body: "Match or beat any rate you find on Booking, Expedia or Agoda — every time." },
              { icon: Coffee, title: "Direct concierge", body: "Custom transfers, day tours and dinner reservations arranged before you arrive." },
              { icon: Sparkles, title: "Flexible cancellation", body: "Standard rates cancelable up to 48 hours before arrival, no questions asked." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="group rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-8 ring-1 ring-indigo-100 transition-shadow hover:shadow-xl">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review highlight */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Quote className="mx-auto h-10 w-10 text-violet-300" />
          <p className="mx-auto mt-6 max-w-3xl font-serif text-2xl leading-relaxed md:text-3xl">
            &ldquo;Comfortable rooms, attentive staff and the pyramids quite literally outside your window. The cleanest hotel we stayed at on our entire Egypt trip.&rdquo;
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur">
            <div className="flex items-center gap-0.5 text-violet-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" />
              ))}
            </div>
            <span className="font-semibold text-white">{SITE.bookingRating} / 10</span>
            <span className="text-white/60">·</span>
            <span>{SITE.bookingReviews} verified reviews on Booking.com</span>
          </div>
        </div>
      </section>

      {/* Enquiry CTA strip */}
      <section className="bg-indigo-600 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
          <p className="font-serif text-xl md:text-2xl">
            Need help planning the trip? Send an enquiry — our concierge gets back to you within the day.
          </p>
          <Link href="/send-an-enquiry" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition-colors hover:bg-violet-100">
            Send an Enquiry
          </Link>
        </div>
      </section>

      <Footer /
>
    </main>
  );
}
