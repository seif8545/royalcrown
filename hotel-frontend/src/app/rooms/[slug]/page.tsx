import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ArrowRight,
  Users,
  Maximize2,
  Bed,
  Check,
  Phone,
  MessageCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import {
  CONTACT,
  getRoomBySlug,
  rooms,
  SITE,
} from "@/data";

interface RoomPageProps {
  params: { slug: string };
}

/** Pre-render every room page at build time. */
export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: RoomPageProps): Metadata {
  const room = getRoomBySlug(params.slug);
  if (!room) return { title: `Rooms | ${SITE.name}` };
  return {
    title: `${room.title} | ${SITE.name}`,
    description: room.description,
    openGraph: {
      title: room.title,
      description: room.description,
      images: [room.image],
    },
  };
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  const room = getRoomBySlug(params.slug);
  if (!room) notFound();

  const otherRooms = rooms.filter((r) => r.id !== room.id);

  return (
    <>
      <Navbar />
      <PageHeader
        title={room.title}
        subtitle={room.description}
        backgroundImage={room.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Rooms", href: "/rooms" },
          { label: room.title },
        ]}
      />

      <main className="bg-slate-50 py-16 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* ----- Left column: details ----- */}
            <div className="lg:col-span-2">
              {/* Hero image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  quality={92}
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Quick facts */}
              {(room.bedType || room.size || room.maxGuests) && (
                <ul className="mt-8 grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:grid-cols-3">
                  {room.bedType && (
                    <li className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Bed
                        </p>
                        <p className="text-sm font-medium">{room.bedType}</p>
                      </div>
                    </li>
                  )}
                  {room.size && (
                    <li className="flex items-center gap-3">
                      <Maximize2 className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Size
                        </p>
                        <p className="text-sm font-medium">{room.size}</p>
                      </div>
                    </li>
                  )}
                  {room.maxGuests && (
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Sleeps
                        </p>
                        <p className="text-sm font-medium">
                          Up to {room.maxGuests} guests
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              )}

              {/* Long description */}
              <section className="mt-10">
                <h2 className="font-serif text-3xl">About this room</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {room.longDescription ?? room.description}
                </p>
              </section>

              {/* Amenities */}
              {room.amenities && room.amenities.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-serif text-3xl">In your room</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* ----- Right column: sticky booking widget ----- */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  From
                </p>
                <p className="mt-1 font-serif text-4xl">
  ${new Intl.NumberFormat("en-US").format(room.pricePerNight)}
  <span className="text-base text-slate-500"> / night</span>
</p>
                <div className="mt-2 flex items-center gap-0.5 text-indigo-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4"
                      fill={idx < room.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <a
                  href={room.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  Book on HotelRunner <ArrowRight className="ml-2 h-4 w-4" />
                </a>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Best rate guaranteed when booking direct.
                </p>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-700">
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 hover:text-indigo-600"
                  >
                    <Phone className="h-4 w-4 text-violet-500" />
                    {CONTACT.phone}
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-indigo-600"
                  >
                    <MessageCircle className="h-4 w-4 text-violet-500" />
                    {CONTACT.whatsapp}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Other rooms */}
      <section className="bg-white py-16 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl">Other rooms you may like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherRooms.map((r) => (
              <Link
                key={r.id}
                href={`/rooms/${r.slug}`}
                className="group flex overflow-hidden rounded-2xl ring-1 ring-slate-200 transition-shadow hover:shadow-xl"
              >
                <div className="relative h-32 w-32 shrink-0 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4">
                  <h3 className="font-serif text-lg">{r.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
  From ${new Intl.NumberFormat("en-US").format(r.pricePerNight)} / night
</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
