# Portfolio V2

A Thai-first university-admission portfolio for Chitipat Rittichot. Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. The design evolves V1's whitespace and restrained typography into open project layouts and a clearer learning narrative.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. `/` redirects to `/th`; English lives at `/en`. Home pages and project pages are statically generated. The language switch retains the current project path and section anchor.

## Edit content

- `lib/i18n.ts`: Thai and English identity, navigation, introduction, learning, and closing copy.
- `lib/projects.ts`: typed project records, bilingual case studies, media publication settings, and `contactEmail`.
- `app/[locale]/page.tsx`: shared home-page narrative.
- `app/[locale]/projects/[slug]/page.tsx`: shared case-study template; adding a project record also adds its route.
- `app/globals.css`: visual tokens, layout, responsive rules, and reduced-motion behavior.
- `components/`: navigation, footer, selected work, and media states. Only interactive navigation and the localized error fallback require client components.

Thai uses Anuphan and English uses Geist through `next/font`; fonts are self-hosted after the build. Google Fonts must be reachable when initially building.

## Content provenance and remaining inputs

Identity, vocational education, tools, and Gemini TTS contributions were adapted from the read-only V1 `portfolio/data/portfolio.ts`. The broader Computer Engineering direction comes from the V2 brief. No dates, metrics, institution names, product outcomes, or contact details were invented.

The portfolio project describes this implementation; personal responsibilities, challenges, and learning remain marked as unfinished until the owner reviews them. Set `contactEmail` to a confirmed public address when ready.

Gemini TTS media is intentionally absent. **Do not copy confidential files into `public/`: anything there can be requested directly, even when `approved` is false.** After publication permission is confirmed, add the approved files and set the project's `media` to `{ src: { th, en }, alt: { th, en }, approved: true }`. Each `src` is a public path. Case studies work without media.

The Portfolio V2 images are actual local-browser captures in both languages. Regenerate them with the dev server running on port 3000:

```powershell
npm run capture:preview
```

## Validation

```powershell
npm run lint
npm run typecheck
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\node_modules\.cache\ms-playwright"
npx playwright install chromium
npm run test:e2e
```

Browser tests expect the local server at `127.0.0.1:3000`. They cover both languages and all project pages at mobile, tablet, and desktop widths, image loading, overflow, the default redirect, language/anchor preservation, project navigation, menu keyboard behavior, reduced motion, a 320px phone, and localized 404s. Screenshots are saved in the ignored `artifacts/` directory.

V1 is reference material only. Do not run commands that write or generate output inside it. No deployment or Git publishing is part of this project setup.
