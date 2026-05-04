import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Clock,
  MapPin,
  Check,
  X as XIcon,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import {
  CONTACT,
  getServiceBySlug,
  getServiceBookingHref,
  services,
  SITE,
} from "@/data";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: `Day Tours | ${SITE.name}` };
  return {
    title: `${service.title} | ${SITE.name}`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const otherServices = services
    .filter((s) => s.id !== service.id)
    .slice(0, 6);
  const bookingHref = getServiceBookingHref(service);

  return (
    <>
      <Navbar />
      <PageHeader
        title={service.title}
        subtitle={service.subtitle ?? service.description}
        backgroundImage={service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Day Tours", href: "/services" },
          { label: service.title },
        ]}
      />

      <main className="bg-slate-50 py-16 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left column */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
                {service.category && (
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-200 backdrop-blur">
                    {service.category}
                  </span>
                )}
              </div>

              {(service.duration || service.location) && (
                <ul className="mt-8 grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:grid-cols-2">
                  {service.duration && (
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Duration
                        </p>
                        <p className="text-sm font-medium">{service.duration}</p>
                      </div>
                    </li>
                  )}
                  {service.location && (
                    <li className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Location
                        </p>
                        <p className="text-sm font-medium">{service.location}</p>
                      </div>
                    </li>
                  )}
                </ul>
              )}

              <section className="mt-10">
                <h2 className="font-serif text-3xl">About this experience</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {service.longDescription ?? service.description}
                </p>
              </section>

              {service.highlights && service.highlights.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-serif text-3xl">Highlights</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {(service.includes?.length || service.notIncluded?.length) && (
                <section className="mt-10 grid gap-8 lg:grid-cols-2">
                  {service.includes && service.includes.length > 0 && (
                    <div>
                      <h2 className="font-serif text-2xl">What's included</h2>
                      <ul className="mt-4 grid gap-3">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-slate-700"
                          >
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.notIncluded && service.notIncluded.length > 0 && (
                    <div>
                      <h2 className="font-serif text-2xl">Not included</h2>
                      <ul className="mt-4 grid gap-3">
                        {service.notIncluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-slate-700"
                          >
                            <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Right column — sticky booking */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {service.enquireOnly ? "Pricing" : "Pricing by group size"}
                  </p>

                  {service.enquireOnly ? (
                    <p className="mt-2 font-serif text-2xl">Price on request</p>
                  ) : service.pricing && service.pricing.length > 0 ? (
                    <ul className="mt-3 divide-y divide-slate-100 text-sm">
                      {service.pricing.map((tier) => (
                        <li
                          key={tier.label}
                          className="flex items-baseline justify-between py-2"
                        >
                          <span className="text-slate-600">{tier.label}</span>
                          <span className="font-semibold text-indigo-900">
                            ${tier.price}
                            {tier.unit === "per person" && (
                              <span className="ml-0.5 text-xs font-normal text-slate-500">
                                /pp
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 font-serif text-3xl">
                      From ${service.priceFrom}
                    </p>
                  )}

                  {service.pricingNote && (
                    <p className="mt-3 text-xs italic text-slate-500">
                      {service.pricingNote}
                    </p>
                  )}

                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {service.enquireOnly
                      ? "Enquire by Email"
                      : "Book via WhatsApp"}
                  </a>

                  <p className="mt-3 text-center text-xs text-slate-500">
                    {service.enquireOnly
                      ? "We'll reply within the day."
                      : "Opens WhatsApp with a prefilled booking message."}
                  </p>

                  <Link
                    href="/send-an-enquiry"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-900 hover:text-indigo-900"
                  >
                    Or use the enquiry form <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="rounded-3xl bg-indigo-900 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
                    Talk to reception
                  </p>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li>
                      <a
                        href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 hover:text-violet-300"
                      >
                        <Phone className="h-4 w-4 text-violet-300" />
                        {CONTACT.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:text-violet-300"
                      >
                        <MessageCircle className="h-4 w-4 text-violet-300" />
                        {CONTACT.whatsapp}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Other services */}
      <section className="bg-white py-16 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl">More day tours</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="group flex overflow-hidden rounded-2xl ring-1 ring-slate-200 transition-shadow hover:shadow-xl"
              >
                <div className="relative h-32 w-32 shrink-0 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4">
                  <h3 className="font-serif text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {s.enquireOnly ? "On request" : `From $${s.priceFrom}`}
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
