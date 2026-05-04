import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CONTACT, SITE } from "@/data";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description:
    "Get in touch with Royal Crown Hotel - Pyramids: phone, WhatsApp, email and address. Concierge available 24/7.",
};

const contactCards = [
  {
    icon: Phone,
    title: "Call us",
    body: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    body: CONTACT.whatsapp,
    href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    body: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    title: "Address",
    body: CONTACT.address,
    href: "#map",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Contact Us"
        subtitle="Reception, reservations and concierge — staffed 24 hours a day, seven days a week."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <main className="bg-slate-50 py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition-shadow hover:shadow-xl"
              >
                <c.icon className="h-8 w-8 text-violet-500 transition-transform group-hover:scale-110" />
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {c.title}
                </p>
                <p className="mt-2 text-sm font-medium text-indigo-900">{c.body}</p>
              </a>
            ))}
          </div>

          {/* Hours + Map */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-violet-500" />
                <h2 className="font-serif text-2xl">Reception hours</h2>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex justify-between">
                  <span>Reception</span>
                  <span className="font-medium">24 / 7</span>
                </li>
                <li className="flex justify-between">
                  <span>Concierge</span>
                  <span className="font-medium">24 / 7</span>
                </li>
                <li className="flex justify-between">
                  <span>Breakfast Restaurant</span>
                  <span className="font-medium">07:30 — 11:00</span>
                </li>
              </ul>
            </div>

            <div
              id="map"
              className="overflow-hidden rounded-3xl ring-1 ring-slate-200 lg:col-span-2"
            >
              <iframe
                title="Map of Royal Crown Hotel - Pyramids"
                src="https://www.google.com/maps?q=Royal+Crown+Hotel+Giza+Pyramids+View&output=embed"
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
