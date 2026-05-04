"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { heroSlides, type HeroSlide, SITE } from "@/data";

interface HeroSliderProps {
  slides?: HeroSlide[];
  intervalMs?: number;
}

export default function HeroSlider({
  slides = heroSlides,
  intervalMs = 7000,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = slides.length;
  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!intervalMs) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [intervalMs, total]);

  const onMouseEnter = () => {
    if (timer.current) clearInterval(timer.current);
  };
  const onMouseLeave = () => {
    if (!intervalMs) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      className="relative h-[78vh] min-h-[560px] max-h-[760px] w-full overflow-hidden bg-indigo-950"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-roledescription="carousel"
      aria-label="Hotel highlights"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-indigo-900/40 to-violet-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-transparent to-indigo-950/50" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 pt-20 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200 backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-violet-200" /> Booking.com {SITE.bookingRating} / 10 · {SITE.bookingReviews} reviews
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.05] md:text-7xl">
          Wake up next to the{" "}
          <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-white bg-clip-text text-transparent">
            Pyramids of Giza
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
          Eight comfortable, modern room types — 3.3 km from the Great Pyramid,
          30 km from Cairo airport. Reception staffed 24/7.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="https://royal-crown-hotel-pyramids.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 ring-1 ring-indigo-500/30 transition-transform hover:scale-105 hover:bg-indigo-500"
          >
            Book Direct & Save
          </a>
          <Link
            href="/rooms"
            className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-violet-300 hover:bg-white/10"
          >
            Explore Rooms
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
          <MapPin className="h-3.5 w-3.5 text-violet-300" />
          Al Mansoureya Road · Giza · Egypt
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white backdrop-blur transition-colors hover:bg-white/25 md:inline-flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white backdrop-blur transition-colors hover:bg-white/25 md:inline-flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
 className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-10 bg-violet-300" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}
