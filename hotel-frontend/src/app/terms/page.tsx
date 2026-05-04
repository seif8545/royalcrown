import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/data";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE.name}`,
  description: `Terms governing the use of ${SITE.name} website and stays at the property.`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Terms of Service"
        subtitle="The rules of the road for using this site and staying with us."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      <main className="bg-slate-50 py-16 text-indigo-900">
        <article className="prose prose-slate mx-auto max-w-3xl px-6">
          <p className="text-sm text-slate-500">
            Last updated: 1 January {new Date().getFullYear()}
          </p>

          <h2 className="font-serif text-3xl">1. About these terms</h2>
          <p>
            These terms govern your use of the {SITE.name} website and your
            stay at our property. By using the site or making a reservation you
            agree to them.
          </p>

          <h2 className="font-serif text-3xl">2. Reservations &amp; payment</h2>
          <p>
            Bookings are processed through our partner HotelRunner. A valid
            credit card is required at booking. Rates are quoted in USD and
            charged in EGP at the prevailing rate.
          </p>

          <h2 className="font-serif text-3xl">3. Cancellation</h2>
          <p>
            Standard rates may be cancelled free of charge up to 48 hours
            before arrival. Non-refundable rates are cancelled with no refund.
            Specific terms are confirmed at the time of booking.
          </p>

          <h2 className="font-serif text-3xl">4. Check-in &amp; check-out</h2>
          <p>
            Check-in is from 14:00; check-out is by 12:00. Early check-in and
            late check-out are subject to availability. Government-issued ID is
            required at check-in.
          </p>

          <h2 className="font-serif text-3xl">5. Conduct</h2>
          <p>
            We expect all guests to treat staff and other guests with respect.
            We reserve the right to refuse service or end a stay in cases of
            harassment, illegal behaviour, or material damage to property.
          </p>

          <h2 className="font-serif text-3xl">6. Liability</h2>
          <p>
            Our liability for any claim arising from a stay is limited to the
            amount paid for that stay, except where applicable law prohibits
            such a limit.
          </p>

          <h2 className="font-serif text-3xl">7. Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a className="text-indigo-600 hover:text-indigo-700" href="mailto:reservations@royalcrownhotelpyramids.com">
              reservations@royalcrownhotelpyramids.com
            </a>
            .
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
