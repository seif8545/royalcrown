# Royal Crown Hotel · Pyramids — Next.js Migration

Migration of the legacy Laravel/Blade marketing site to Next.js 14 (App Router) + TypeScript + Tailwind, ready to deploy to Cloudflare Pages.

## See it right now (no install)

Open `preview.html` in any browser:

- Windows: double-click `preview.html` in Explorer.
- Or right-click → Open With → your browser.

The preview uses Tailwind via CDN and re-implements the page so you can see the design instantly. It uses the same images and copy as the React components, so what you see is what `npm run dev` will render.

## Run the real Next.js app locally

Prerequisites: Node.js 18.18+ (20 LTS recommended).

```powershell
cd C:\Users\DELL\Downloads\royalcrown\hotel-frontend
npm install
npm run dev
```

Then open http://localhost:3000 .

Other scripts:

- `npm run build` — production build (verifies the project compiles).
- `npm run start` — serve the production build.
- `npm run lint` — Next.js ESLint pass.

## Deploy to Cloudflare Pages

The simplest path with Next.js App Router on Cloudflare is the official adapter:

```powershell
npm install -D @cloudflare/next-on-pages
npx @cloudflare/next-on-pages
```

In Cloudflare Pages, set:

- Build command: `npx @cloudflare/next-on-pages`
- Build output directory: `.vercel/output/static`
- Compatibility flag: `nodejs_compat`

## Project layout

```
hotel-frontend/
├── preview.html              <- Open this to see the design instantly
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── next-env.d.ts
├── .gitignore
├── public/
│   └── images/                (13 SEO-named JPGs)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── HeroSlider.tsx
    │   └── Footer.tsx
    └── data.ts                (typed mock data: rooms, services, hero slides)
```

## Cleanup note

`/.typecheck/` is a leftover directory from build verification that the
sandbox couldn't delete due to mount permissions. You can remove it safely:

```powershell
Remove-Item -Recurse -Force .typecheck
```

It is excluded from `tsconfig.json`, so it won't affect builds.

## Booking integration

Every CTA — Navbar "Book Now", hero slide buttons, room "Book Now" overlays, service tiles, footer "Book Your Stay" / "Reservations" — links to:

```
https://royal-crown-hotel-pyramids.hotelrunner.com/bv3/search
```

via the single `BOOKING_URL` constant exported from `src/data.ts`.

## Migrated from

Inputs were `www.zip` (legacy Blade views) and `uploads.zip` (261 legacy images).

- Hero slider:  `index.blade.php` `$slider1` → `heroSlides`.
- Rooms:       `index.blade.php` `$work`    → `rooms` (4 entries).
- Services:    `index.blade.php` `$service` → `services` (1 featured + 3 secondary).
- Navbar:      `master/header.blade.php`.
- Footer:      `master/footer.blade.php`.

All `trans('www.*')` keys were translated to natural English copy. The mappings are documented as comments at the top of each component.
