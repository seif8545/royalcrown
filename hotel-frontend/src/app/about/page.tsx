import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Heart, Leaf } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { BOOKING_URL, SITE } from "@/data";

export const metadata: Metadata = {
  title: `About | ${SITE.name}`,
  description:
    "The story of Royal Crown Hotel - Pyramids: a family-run, five-star property steps from the Great Pyramid of Giza.",
};

const values = [
  {
    icon: Award,
    title: "Five-star service",
    description:
      "Trained, multilingual staff and a 24-hour concierge whose job is making the trip feel effortless.",
  },
  {
    icon: Heart,
    title: "Family-run hospitality",
    description:
      "We are independently owned, three generations in. You're a guest in our home, not a number in a system.",
  },
  {
    icon: Leaf,
    title: "Quietly sustainable",
    description:
      "Solar hot water, refillable amenities, and locally-sourced linens and food. Less plastic, more pyramids.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="About Royal Crown"
        subtitle="Family-run, five-star, and a short walk from one of the wonders of the ancient world."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <main className="bg-slate-50 py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          {/* Story */}
          <section className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/hotel-roof-view.jpeg"
                alt="The Royal Crown lobby"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">
                Our Story
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                Three thousand years of view, three generations of hosts.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                Royal Crown opened in 1998 with a simple idea: that the Great
                Pyramid of Giza deserved a hotel worthy of looking at it. Over
                three generations of family ownership we've grown into a
                full-service, five-star property — but the welcome at the door
                hasn't changed.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Today we host guests from more than seventy countries each year:
                couples on honeymoon, families on adventure, and travellers
                stepping off the long-haul flight ready for an Egyptian coffee
                and a balcony view. We try to make every stay feel like the
                trip of a lifetime, because for many of our guests it is.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-300"
              >
                Plan your stay <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Values */}
          <section className="mt-24">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">
                Our Values
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                What we care about
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-3xl bg-white p-8 ring-1 ring-slate-200"
                >
                  <v.icon className="h-8 w-8 text-violet-500" />
                  <h3 className="mt-4 font-serif text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-24 overflow-hidden rounded-3xl bg-indigo-900 p-10 text-white md:p-16">
            <div className="grid gap-8 md:grid-cols-3 md:items-center">
              <h2 className="font-serif text-3xl md:col-span-2 md:text-4xl">
                Ready to wake up next to the Pyramids?
              </h2>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-300"
                >
                  Book a Room
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
