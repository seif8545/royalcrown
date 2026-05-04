import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CONTACT, SITE } from "@/data";

export const metadata: Metadata = {
  title: `Send an Enquiry | ${SITE.name}`,
  description:
    "Tell us about your trip and our concierge will design a package — rooms, transfers and experiences — within 24 hours.",
};

export default function EnquiryPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Send an Enquiry"
        subtitle="Tell us a little about your trip and our concierge will reply within the day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Send an Enquiry" },
        ]}
      />

      <main className="bg-slate-50 py-20 text-indigo-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form */}
            <form
              action={`mailto:${CONTACT.email}`}
              method="post"
              encType="text/plain"
              className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 lg:col-span-2"
            >
              <h2 className="font-serif text-3xl">Tell us about your trip</h2>
              <p className="mt-2 text-sm text-slate-600">
                The more we know, the better we can tailor the offer.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone (with country code)" name="phone" />
                <Field label="Country" name="country" />
                <Field label="Check-in" name="checkIn" type="date" />
                <Field label="Check-out" name="checkOut" type="date" />
                <Field label="Adults" name="adults" type="number" min={1} defaultValue={2} />
                <Field label="Children" name="children" type="number" min={0} defaultValue={0} />

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Interests
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Pyramid tour",
                      "Nile cruise",
                      "Luxor day trip",
                      "Hot air balloon",
                      "Honeymoon",
                      "Family trip",
                      "Business stay",
                    ].map((tag) => (
                      <label
                        key={tag}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-indigo-500 hover:bg-violet-50"
                      >
                        <input
                          type="checkbox"
                          name="interests"
                          value={tag}
                          className="h-3.5 w-3.5 accent-violet-500"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Anything else?
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-indigo-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                    placeholder="Special occasions, dietary needs, accessibility..."
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-stretch justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                  By submitting, you agree to be contacted by Royal Crown about
                  your enquiry. We never share your details.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-300"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send enquiry
                </button>
              </div>
            </form>

            {/* Aside */}
            <aside className="space-y-6">
              <div className="rounded-3xl bg-indigo-900 p-8 text-white">
                <h2 className="font-serif text-2xl">Prefer to talk?</h2>
                <p className="mt-2 text-sm text-white/80">
                  We're available 24/7 — pick whichever channel suits you.
                </p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 hover:text-violet-300"
                    >
                      <Phone className="h-5 w-5 text-violet-300" />
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
                      <MessageCircle className="h-5 w-5 text-violet-300" />
                      {CONTACT.whatsapp}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center gap-3 hover:text-violet-300"
                    >
                      <Mail className="h-5 w-5 text-violet-300" />
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-200">
                <h2 className="font-serif text-2xl">What happens next</h2>
                <ol className="mt-6 space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-indigo-600 text-center text-xs font-bold leading-6 text-indigo-900">
                      1
                    </span>
                    Our concierge reads your enquiry within hours of receipt.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-indigo-600 text-center text-xs font-bold leading-6 text-indigo-900">
                      2
                    </span>
                    We send a tailored package — rooms, transfers, experiences — usually within 24 hours.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-indigo-600 text-center text-xs font-bold leading-6 text-indigo-900">
                      3
                    </span>
                    You confirm and we take care of everything.
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ----- Small typed input field ----- */
function Field({
  label,
  name,
  type = "text",
  required = false,
  min,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number;
  defaultValue?: string | number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
        {required && <span className="ml-1 text-indigo-600">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-indigo-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      />
    </label>
  );
}
