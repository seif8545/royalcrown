import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/data";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: `How ${SITE.name} collects, uses and protects guest personal data.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Privacy Policy"
        subtitle="How we handle your data — straightforwardly and in plain English."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <main className="bg-slate-50 py-16 text-indigo-900">
        <article className="prose prose-slate mx-auto max-w-3xl px-6">
          <p className="text-sm text-slate-500">
            Last updated: 1 January {new Date().getFullYear()}
          </p>

          <h2 className="font-serif text-3xl">1. Who we are</h2>
          <p>
            {SITE.name} ("we", "us", "our") operates this website and the hotel
            located at Alexandria Desert Road, Pyramids Area, Giza, Egypt. We
            are the data controller for personal data you provide here.
          </p>

          <h2 className="font-serif text-3xl">2. What we collect</h2>
          <p>
            When you make an enquiry or booking we collect: your name, email,
            phone number, country of residence, travel dates, party size, and
            any preferences you share. If you make a payment, the payment
            details are processed by our payment provider and we never see your
            full card number.
          </p>

          <h2 className="font-serif text-3xl">3. How we use it</h2>
          <p>
            We use your information to respond to your enquiries, manage your
            stay, send booking confirmations, and (only if you opt in) send
            occasional offers. We do not sell your data. We share it only with
            partners who help deliver your stay (e.g. airport transfer
            providers) under strict confidentiality.
          </p>

          <h2 className="font-serif text-3xl">4. Cookies</h2>
          <p>
            We use a small number of cookies to keep the site working and to
            understand which pages are popular. No advertising cookies are set
            without your consent.
          </p>

          <h2 className="font-serif text-3xl">5. Your rights</h2>
          <p>
            You can request a copy of the personal data we hold about you, ask
            us to correct it, or ask us to delete it. Email us at{" "}
            <a className="text-indigo-600 hover:text-indigo-700" href="mailto:reservations@royalcrownhotelpyramids.com">
              reservations@royalcrownhotelpyramids.com
            </a>{" "}
            and we'll respond within 30 days.
          </p>

          <h2 className="font-serif text-3xl">6. Contact</h2>
          <p>
            Privacy questions, concerns, or requests can be sent to the email
            above, or by post to the hotel address. Our front desk is staffed
            24/7 if you'd like to talk.
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
