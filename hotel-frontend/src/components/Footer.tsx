import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";
import {
  BOOKING_URL,
  CONTACT,
  NAV_LINKS,
  SITE,
  SOCIALS,
  type SocialLink,
} from "@/data";

/**
 * Site footer.
 *
 * Migrated from `www/master/footer.blade.php`. Legacy translations replaced:
 *   trans('www.Followwithus')         -> "Follow With Us"
 *   trans('www.FollowwithusMessage')  -> "Stay close to the pyramids ..."
 *   trans('www.Address')              -> "Visit Us"
 *   trans('www.phone')                -> "Phone"
 *   trans('www.whatsapp')             -> "WhatsApp"
 *   trans('www.copyrights')           -> "Copyright"
 *   trans('www.All rights reserved')  -> "All rights reserved"
 */

const ICONS: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  // No native lucide TripAdvisor icon — fall back to a generic globe glyph.
  tripadvisor: ({ className }) => (
    <span
      aria-hidden
      className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-current text-[10px] font-bold text-indigo-900 ${className ?? ""}`}
    >
      TA
    </span>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-indigo-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/hotel-roof-view.jpeg"
                alt={SITE.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-violet-300/60"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold text-white">
                  {SITE.shortName}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-violet-300">
                  Hotel · Pyramids
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              {SITE.tagline} Steps from the Great Pyramid of Giza, with
              five-star service, panoramic suites and curated Egyptian
              experiences.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-300"
            >
              Book Your Stay
            </a>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Explore
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-violet-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Follow With Us
            </h4>
            <p className="mt-6 text-sm text-slate-400">
              Stay close to the pyramids — follow Royal Crown for daily views,
              guest stories and special offers.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-200 transition-colors hover:bg-indigo-600 hover:text-indigo-900"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Address / contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Visit Us
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="hover:text-violet-300"
                >
                  Phone: {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-300"
                >
                  WhatsApp: {CONTACT.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-violet-300"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-slate-500 md:flex-row">
          <p>
            Copyright &copy; {year} {SITE.copyrightHolder}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-violet-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-violet-300">
              Terms
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-300"
            >
              Reservations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
