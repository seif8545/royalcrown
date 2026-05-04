import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 py-32 text-center text-indigo-900">
        <div className="mx-auto max-w-xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">
            404
          </p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">
            Lost in the desert?
          </h1>
          <p className="mt-4 text-base text-slate-600">
            We couldn't find that page. It may have moved, or never existed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-300"
            >
              Back to home
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-900 hover:text-indigo-900"
            >
              Browse rooms
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
