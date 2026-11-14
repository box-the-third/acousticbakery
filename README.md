# Acoustic Bakery & Patisserie

Informational landing page for Acoustic Bakery & Patisserie, Olaya St, Riyadh.
Bilingual (English LTR / Arabic RTL), statically generated, no e-commerce.

## Stack

- Next.js 16 (App Router, fully static output)
- Tailwind CSS 4 (brand tokens in `src/app/globals.css`)
- Framer Motion (lazy `domAnimation` feature set)
- Three.js (hero scene, loaded after first paint on browser idle)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Locally, `npm run build` writes a static site to `out/`.

## Deploying to Hostinger

In hPanel, set the Node.js web app to:

- **Framework / application type:** Next.js
- **Node version:** 22
- **Build script:** `build`
- **Output directory:** `.next`

Hostinger always builds Next.js apps as a standalone server. It wraps `next.config.ts` and replaces `output: "export"` with `output: "standalone"`, so no `out/` folder is produced there. The `export` setting is still what GitHub Pages uses.

`npm run build` uses webpack (`next build --webpack`) because Turbopack's PostCSS worker crashed in Hostinger's build environment.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push the repo to GitHub.
2. In the repo, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow passes the Pages base path (for example `/acousticbakery`) and site URL to the
build, so asset links work both on `username.github.io/repo` and on a custom domain.
Images from `public/` must be referenced through `asset()` in `src/lib/asset.ts` so they get that prefix.

## Structure

```
src/
  app/                 layout, page, global styles, favicon
  components/
    layout/            Navbar, LanguageSwitch, Footer, SkipLink
    sections/          Hero, Intro, Story, Purpose (mission and vision), Offerings,
                       Ritual (3D), Menu, PartyBoxes, Details (packaging), Catering,
                       Clients (gallery), Visit
    motion/            MotionProvider, Reveal, StaggerText
    three/             StringsVisual (lazy loader), StringsScene (WebGL)
    ui/                SectionHeading, Isotype
  data/menu.ts         café menu: groups, sections, items and SAR prices (edit here)
  data/site.ts         phone, WhatsApp, maps and online-ordering links
  data/images.ts       every photo on the page, where it is used, and its EN/AR alt text
  i18n/                dictionary (all copy, EN + AR) and LanguageProvider
  fonts/               Vonca (brand display face, woff2)
public/
  brand/               logo and isotype artwork, exported from Assets/
  images/food/         food photography (Assets/Food Images, converted to WebP)
  images/pack/         packaging, chef's hat and van mockups from the brand guidelines
                       and packaging proposal
```

## Content to confirm before launch

- **Menu:** `src/data/menu.ts` holds the café menu (items, Arabic names and SAR prices), transcribed from the bilingual Acoustic Café menu. Update prices there.
- **Delivery app links:** paste Acoustic's store link for each app into `DELIVERY_APPS` in `src/data/site.ts`. A logo without a link shows as a plain badge. Party boxes are ordered on WhatsApp.
- **Social links:** Instagram and WhatsApp live in `src/data/site.ts`.
- **Party boxes, catering and client types:** copy lives in `src/i18n/dictionary.ts` (`boxes`, `catering`, `clients`).
- **Opening hours and phone:** `visit.hours` in the dictionary, and `src/data/site.ts`.
- **Domain:** `metadataBase` in `src/app/layout.tsx`.

## Brand notes

- Colours: brand guideline palette only. Primary Pantone 445 C `#4b585a` and 7542 C `#b1bec6`; complementary 467 C `#d4c194` and 9043 C `#e7e5df`; plus white. Gold is an accent: as text it is only used on slate, since it is too faint on light backgrounds.
- Straight lines throughout: square buttons, cards and frames, no rounded corners.
- Fonts: Vonca (display) and Albert Sans (body). Neither includes Arabic glyphs, so Arabic is set in Readex Pro (display) and IBM Plex Sans Arabic (body).
- The logo and isotype are used from the official artwork and are never mirrored in RTL.

## Search and AI visibility

Generated at build time from the site's own data, so they never drift from the page:

- `/robots.txt` (`src/app/robots.ts`): open to all search engines and AI crawlers, with the sitemap.
- `/sitemap.xml` (`src/app/sitemap.ts`).
- `/llms.txt` (`src/app/llms.txt/route.ts`): a plain-text fact sheet for AI assistants: location, hours, full menu with prices, party boxes, catering, contact.
- schema.org JSON-LD (`src/components/seo/StructuredData.tsx`): the business as a Bakery with address, coordinates, Google Maps listing, hours and the priced menu.

The live domain is `SITE_URL` and the business details (Maps listing name, coordinates, hours) are `BUSINESS`, both in `src/data/site.ts`.

## Language

The EN/AR choice is held in React context, persisted to `localStorage`, and applied to
`<html lang dir>`. Layout uses logical properties (`ps`, `pe`, `start`, `end`, `text-start`)
so everything flips automatically in RTL.
