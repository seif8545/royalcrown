import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, MessageCircle } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { services, SITE, getServiceBookingHref } from "@/data";

export const metadata: Metadata = {
  title: `Day Tours & Excursions | ${SITE.name}`,
  description:
    "Twelve curated private day tours from Royal Crown — Pyramids, Saqqara, Cairo, Alexandria, the Nile, the Red Sea and Mount Sinai. Book on WhatsApp.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Day Tours & Excursions"
        subtitle="Private guided experiences across Egypt — pick a tour and we'll send you the prefilled WhatsApp message."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Day Tours" }]}
      />

      <main className="bg-slate-50 py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-xl"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="relative aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  {service.category && (
                    <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200 backdrop-blur">
                      {service.category}
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-xl">
                    <Link
                      href={`/services/${service.slug}`}
                      className="hover:text-indigo-600"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  {service.subtitle && (
                    <p className="mt-1 text-sm italic text-indigo-600">
                      {service.subtitle}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {service.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    {service.duration && (
                      <li className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-violet-500" />
                        {service.duration}
                      </li>
                    )}
                    {service.location && (
                      <li className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-violet-500" />
                        {service.location}
                      </li>
                    )}
                  </ul>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                    <p className="text-sm text-slate-500">
                      {service.enquireOnly ? (
                        <span className="text-base font-semibold text-indigo-900">
                          On request
                        </span>
                      ) : (
                        <>
                          From{" "}
                          <span className="text-xl font-semibold text-indigo-900">
                            ${service.priceFrom}
                          </span>
                        </>
                      )}
                    </p>
                    <a
                      href={getServiceBookingHref(service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
                    >
                      <MessageCircle className="mr-1 h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Tour details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
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
