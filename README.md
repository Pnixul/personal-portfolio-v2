# Portfolio V2

A Thai-first university-admission portfolio for Chitipat Rittichot. Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. An editorial portfolio with a secondary sketch language: warm off-white, charcoal, rust, a dedicated character illustration, and a scroll story grounded in the existing project evidence.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. `/` redirects to `/th`; English lives at `/en`. Home pages and project pages are statically generated. The language switch retains the current project path and section anchor.

## Edit content

- `lib/i18n.ts`: Thai and English identity, navigation, introduction, learning, and closing copy.
- `lib/home-story.ts`: localized editorial framing for the opening and chapter transitions.
- `lib/character.ts`: hero asset, dimensions, localized alt text, and five optional standalone chibi poses.
- `lib/projects.ts`: typed project records, bilingual case studies, media publication settings, and `contactEmail`.
- `app/[locale]/page.tsx`: shared home-page narrative.
- `app/[locale]/projects/[slug]/page.tsx`: shared case-study template; adding a project record also adds its route.
- `app/globals.css`: visual tokens, layout, responsive rules, and reduced-motion behavior.
- `components/`: navigation, opening scene, selected work, learning progression, sketch marks, footer, and media states. Interactive navigation, the short visit opening, and the localized error fallback use client components.

Thai uses Anuphan; English uses Geist with Georgia editorial headings. Geist Mono is reserved for technology metadata. The same hierarchy applies to Home and all case studies. The existing font subsets are served from `public/fonts/` through `app/fonts.css`, with their OFL licenses included; builds do not need a Google Fonts connection.

## Artwork and motion

`public/illustrations/pangpond-coding.webp` is a dedicated generated seated-laptop illustration based on `character-coding-reference.png`, not a crop of a reference sheet. Its source is retained at `.design-references/pangpond-coding-generated.png`. The optimized asset is approximately 128 KB. Keep replacement art at a 2:3 ratio with the curls, shoulders, hands, and entire laptop inside the canvas; update the localized alt text if the pose changes. The previous standing artwork remains available as an alternate asset.

Native CSS view timelines finish the illustration's lower edge, draw the hero underline, and trace the learning connection. The laptop is visible immediately. The portrait layers share one image resource; this is a tonal reveal, not a frame sequence or literal line-by-line drawing. Desktop/tablet use a sticky learning introduction; phones follow a vertical composition. Wheel and touch scrolling remain native; anchor navigation uses browser smooth scrolling. A two-pixel edge rail uses `animation-timeline: scroll(root block)` with no React state updates. Reduced-motion and unsupported browsers retain the native, lightly styled scrollbar; reduced motion also disables the reveal and sticky introduction. There is no scroll hijacking or animation dependency.

`PortfolioOpening` adds a 1.6-second paper-and-type opening with the supplied loading chibi on the first Home visit in a tab: a 280 ms entrance, a short hold, then a clean uncover during the last 28%. It skips reduced motion, section deep links, and repeat visits, and dismisses immediately on user input without capturing it. The Hero retains its separate entrance motion. To review a fresh opening, use a new tab/session or clear `pon-portfolio-opened` from session storage before navigation.

`ChibiMoment` uses the five supplied PNGs in `public/illustrations/`, mapped in `lib/character.ts`: loading in the opening, Footer beside the closing text, department beneath its preview, BOTNOI after internship learning, and personal portfolio beside its pending reflection. Each case study has one contextual appearance; the Home Hero and Selected Work have none. The original PNGs are unchanged and Next Image supplies appropriately sized delivery. **Asset issue:** `chibi-personal-portfolio.png` has an opaque checkerboard baked into the image. Replace that file with a true transparent export of the same art when available; the other four PNGs have alpha transparency. No reference sheet is rendered or cropped.

Project screenshots share a thin open-corner sketch frame. CSS crops the department capture to its top 1440 × 744 area, excluding the next section, and the portfolio capture to 1440 × 790. The featured Home frame is capped at 860 px wide; mobile frame padding drops to 6 px. Source images remain unchanged. Case studies use a text/media opening on desktop, paired context blocks, concise implementation columns, and natural stacked mobile flow. Unconfirmed reflection placeholders are combined into one band rather than repeated.

## Content provenance and remaining inputs

Identity, vocational education, tools, and Gemini TTS contributions were adapted from the read-only V1 `portfolio/data/portfolio.ts`. The broader Computer Engineering direction comes from the V2 brief. No dates, metrics, institution names, product outcomes, or contact details were invented.

Selected Work presents the Computer Programmer Department website as the lead, Portfolio V2 as a smaller interlude, and BOTNOI internship work next to its existing reflection. The department entry was verified read-only against `D:/My-Main-Project/cp-department-clean/PRODUCT.md`, `package.json`, `pages/index.vue`, `components/layout/AppNavbar.vue`, and `components/home/FaqSection.vue`. Its preview is an actual capture of that project's existing local production build, which still contains illustration/content placeholders. Nuxt 3, Vue 3, Tailwind CSS, page structure, responsive navigation, and FAQ interactions are source-supported. Personal responsibility, challenges, lessons, publication status, and real-use outcomes still require author confirmation; they are not inferred from the code. The external project was neither rebuilt nor edited.

The portfolio project describes this implementation; personal responsibilities, challenges, and learning remain marked as unfinished until the owner reviews them. Set `contactEmail` to a confirmed public address when ready.

The owner's integration brief confirms that BOTNOI covered several frontend/UX/UI contributions. Its existing `/projects/gemini-tts` route is retained so links keep working. The detail page separates this broader context from the already documented Gemini TTS decisions and outcome. Image captions describe visible interfaces, without claiming additional responsibilities or shipped results.

All 13 BOTNOI reference screenshots were inspected at their actual location, `.design-references/references/botnoi-work/`. Only three production derivatives were created in `public/projects/botnoi/` with the existing Sharp/WebP convention:

- `tts-interface.webp`: `gemini-tts-1.png.png`, full 1266 × 836 capture; the clearest match for the documented model/language/points work.
- `image-interface.webp`: `Screenshot 2026-07-13 180419.png`, full 1588 × 795 capture; distinct settings/result composition with a fruit example and no visible account identifier.
- `video-mobile-design.webp`: `Screenshot 2026-09-01 231027.png`, one complete mobile design at x390/y42, 265 × 726; adds a mobile interface to the sampler without copying the surrounding design board. Its caption explicitly identifies it as a design.

The Home sampler uses these three images with controlled offsets and overlap; detail views reuse the same files at readable sizes. Originals were not altered. Other captures were omitted because they duplicate these interfaces, expose account IDs/browser chrome, or add redundant avatar/result imagery. No responsibility or responsive implementation claim is inferred from a screenshot. No ignored reference path is a production dependency.

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

Browser tests expect the local server at `127.0.0.1:3000`; use `npm run start` after building to validate production behavior. They cover both languages and all project pages at mobile, tablet, and desktop widths, image and font loading, preview proportions, overflow, the default redirect, language/anchor preservation, project navigation, menu keyboard behavior, reduced motion, a 320px phone, and localized 404s. Additional checks cover fresh/repeat opening behavior, distinct chibi slots, portrait/text separation from 320–1920px, and scroll/reduced-motion states. Screenshots are saved in the ignored `artifacts/` directory.

V1 is reference material only. Do not run commands that write or generate output inside it. No deployment or Git publishing is part of this project setup.
