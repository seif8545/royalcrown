import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Background image (defaults to the lobby still). */
  backgroundImage?: string;
  /** Breadcrumb trail. The current page is automatically appended at the end with no href. */
  breadcrumbs?: Crumb[];
}

/**
 * Compact hero strip used on every inner page.
 * Sits directly under the solid Navbar and gives each page a sense of place.
 */
export default function PageHeader({
  title,
  subtitle,
  backgroundImage = "/images/hotel-roof-view.jpeg",
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/70 to-indigo-950" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 text-white">
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-violet-300/80"
          >
            {breadcrumbs.map((c, i) => (
              <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-violet-300">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-violet-300/60" />
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-serif text-4xl leading-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
