"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Mail,
  ChevronDown,
} from "lucide-react";
import {
  BOOKING_URL,
  CONTACT,
  NAV_LINKS,
  SITE,
} from "@/data";

/**
 * Top navigation bar.
 *
 * Migrated from `www/master/header.blade.php`. The legacy `trans('www.*')`
 * keys have been replaced with the equivalent English copy:
 *   trans('www.whatsapp')      -> "WhatsApp"
 *   trans('www.CallUs')        -> "Call Us"
 *   trans('www.EmailUs')       -> "Email Us"
 *   trans('www.Home')          -> "Home"
 *   trans('www.Work')          -> "Rooms"   (the legacy nav linked Work -> /rooms)
 *   trans('www.Services')      -> "Services"
 *   trans('www.About')         -> "About"
 *   trans('www.sendanenquiry') -> "Send an Enquiry"
 *   trans('www.Contact')       -> "Contact"
 *
 * Two visual variants:
 *   - "transparent" — for the home page where the navbar overlays the hero.
 *   - "solid"       — for inner pages with no hero behind it. Default.
 */

export type NavbarVariant = "transparent" | "solid";

export interface NavbarProps {
  variant?: NavbarVariant;
}

export default function Navbar({ variant = "solid" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isTransparent = variant === "transparent";

  const headerClass = isTransparent
    ? "absolute inset-x-0 top-0 z-40 text-white"
    : "sticky top-0 z-40 bg-indigo-950/95 text-white shadow-lg backdrop-blur supports-[backdrop-filter]:bg-indigo-950/80";

  const topStripClass = isTransparent
    ? "hidden md:block border-b border-white/10 bg-black/30 backdrop-blur-sm"
    : "hidden md:block border-b border-white/5 bg-indigo-900/60";

  return (
    <header className={headerClass}>
      {/* Top contact strip */}
      <div className={topStripClass}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
              className="flex items-center gap-2 hover:text-violet-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp: {CONTACT.whatsapp}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-violet-300 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Us: {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 hover:text-violet-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Email Us: {CONTACT.email}
            </a>
          </div>

          {/* Language dropdown (placeholder — wire up i18n later) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-violet-300 transition-colors"
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              English <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {langOpen && (
              <ul
                role="menu"
                className="absolute right-0 mt-2 w-32 rounded-md bg-white py-1 text-sm text-slate-800 shadow-lg ring-1 ring-black/5"
              >
                <li>
                  <button className="block w-full px-4 py-2 text-left hover:bg-slate-100">
                    English
                  </button>
                </li>
                <li>
                  <button className="block w-full px-4 py-2 text-left hover:bg-slate-100">
                    العربية
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/hotel-roof-view.jpeg"
            alt={SITE.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-violet-300/60"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-wide">
              {SITE.shortName}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-violet-300">
              Hotel · Pyramids
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative py-1 transition-colors hover:text-violet-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-violet-300 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Now CTA */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-indigo-900 shadow-lg transition-transform hover:scale-105 hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Book Now
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-indigo-900/95 backdrop-blur">
          <ul className="space-y-1 px-6 py-4 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 hover:bg-white/10 hover:text-violet-300 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-indigo-600 px-5 py-3 text-center font-semibold text-indigo-900"
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
