import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Users, Maximize2, Bed } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { rooms, SITE } from "@/data";

export const metadata: Metadata = {
  title: `Rooms & Suites | ${SITE.name}`,
  description:
    "Eight room categories — singles, twins, doubles, triples and family quadruples — at Royal Crown Hotel Giza Pyramids View. All air-conditioned with private ensuite, free Wi-Fi and minibar.",
};

export default function RoomsPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Rooms & Suites"
        subtitle="Eight ways to wake up close to the Pyramids of Giza."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
      />

      <main className="bg-slate-50 py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10">
            {rooms.map((room, i) => (
              <article
                key={room.id}
                className="grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 md:grid-cols-2"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className={`group relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[360px] ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="flex items-center gap-0.5 text-indigo-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4"
                        fill={idx < room.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="hover:text-indigo-600"
                    >
                      {room.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {room.description}
                  </p>

                  {(room.bedType || room.size || room.maxGuests) && (
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {room.bedType && (
                        <li className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-violet-500" />
                          {room.bedType}
                        </li>
                      )}
                      {room.size && (
                        <li className="flex items-center gap-2">
                          <Maximize2 className="h-4 w-4 text-violet-500" />
                          {room.size}
                        </li>
                      )}
                      {room.maxGuests && (
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-violet-500" />
                          Sleeps {room.maxGuests}
                        </li>
                      )}
                    </ul>
                  )}

                  <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                    <p className="text-sm text-slate-500">
                      From{" "}
                      <span className="text-2xl font-semibold text-indigo-900">
                        {room.currency === "USD" ? "USD " : "$"}
                        {new Intl.NumberFormat("en-US").format(room.pricePerNight)}
                      </span>{" "}
                      / night
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-900 hover:text-indigo-900"
                      >
                        View details
                      </Link>
                      <a
                        href={room.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                      >
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
