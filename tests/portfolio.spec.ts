import { expect, test } from "@playwright/test";
const sizes = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 1000 },
];

test("a fresh opening is visible, dismissible, and suppressed on repeat/reduced-motion visits", async ({ browser }) => {
  for (const size of sizes) for (const locale of ["th", "en"]) {
    const context = await browser.newContext({ viewport: size });
    const page = await context.newPage();
    await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
    const opening = page.locator(".portfolio-opening");
    await expect(opening).toBeVisible();
    expect(await opening.evaluate(el => getComputedStyle(el).pointerEvents)).toBe("none");
    await expect(opening).toHaveAttribute("aria-hidden", "true");
    await opening.locator("img").evaluate((img: HTMLImageElement) => img.decode());
    await expect(opening).toBeVisible();
    await expect.poll(() => opening.locator(".portfolio-opening-inner").evaluate(el =>
      getComputedStyle(el).opacity,
    )).toBe("1");
    expect(await opening.evaluate(el => getComputedStyle(el).animationDuration)).toBe("1.6s");
    const art = await opening.locator("img").boundingBox();
    expect(art!.width).toBeGreaterThan(200);
    expect(art!.x + art!.width).toBeLessThanOrEqual(size.width);
    expect(art!.y + art!.height).toBeLessThanOrEqual(size.height);
    await page.screenshot({ path: `artifacts/${locale}-${size.name}-opening.png` });
    await expect(opening).toBeHidden({ timeout: 2000 });
    await page.reload();
    await expect(opening).toBeHidden();
    await page.goto(locale === "th" ? "/en" : "/th");
    await expect(opening).toBeHidden();
    // Clear before the next document's effects, not while a previous mount is settling.
    await page.addInitScript(() => sessionStorage.removeItem("pon-portfolio-opened"));
    await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
    await expect(opening).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(opening).toBeHidden();
    await expect(page.locator(".skip-link")).toBeFocused();
    await page.evaluate(() => sessionStorage.removeItem("pon-portfolio-opened"));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(opening).toBeHidden();
    await expect(page.locator("h1")).toBeVisible();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`/${locale}#work`);
    await expect(opening).toBeHidden();
    await context.close();
  }
});

test("detail pages preserve facts and distinct character placements while project navigation cycles", async ({ page }) => {
  for (const locale of ["th", "en"]) {
    await page.goto(`/${locale}/projects/cp-department`);
    await expect(page.locator('.case-media [data-pose="review-layout"]')).toHaveCount(1);
    await expect(page.locator(".case-pending")).toHaveCount(1);
    await page.locator(".next-project").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects/gemini-tts$`));
    await expect(page.locator('.learning-section [data-pose="review-code"]')).toHaveCount(1);
    await expect(page.locator(".case-private")).toHaveCount(0);
    await expect(page.locator(".case-media")).toHaveCount(1);
    await page.locator(".next-project").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects/portfolio-v2$`));
    await expect(page.locator('.case-pending [data-pose="notes"]')).toHaveCount(1);
    await page.locator(".next-project").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects/cp-department$`));
    expect(await page.locator('img').evaluateAll(imgs => imgs.some(img => img.getAttribute('src')?.includes('.design-references')))).toBe(false);
  }
});
test("Home polish keeps the supplied story, direct navigation, and a nonblocking opening", async ({ page }) => {
  for (const locale of ["th", "en"]) {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toHaveText(locale === "th" ? "สวัสดีครับ ผมปอน" : "Hi, I'm Pon.");
    await expect(page.locator("h1 br")).toHaveCount(0);
    await expect(page.locator(".hero-identity")).toContainText(locale === "th" ? "วิทยาลัยเทคนิคนครพนม" : "Nakhon Phanom Technical College");
    await expect(page.locator(".hero-actions a")).toHaveCount(1);
    await expect(page.locator(".hero + section")).toHaveAttribute("id", "work");
    await expect(page.locator("#intro, .hero-foot, .reflection a, .reflection .handwritten")).toHaveCount(0);
    await expect(page.locator(".reflection-body p")).toHaveCount(2);
    await expect(page.locator("#closing-title")).toHaveText(locale === "th" ? "ขอบคุณที่แวะมาดูครับ" : "Thanks for stopping by.");
    await expect(page.locator(".sketch-frame")).toHaveCount(5);
    await expect(page.locator(".botnoi-collage img")).toHaveCount(3);
    await expect(page.locator("#work .chibi-moment")).toHaveCount(0);
    await expect(page.locator(".closing-smile")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".footer-pending")).toHaveCount(0);
    await expect(page.locator('.footer-closing img')).toHaveAttribute("alt", "");
    expect(await page.locator(".hero-name").evaluate(el => getComputedStyle(el).animationName)).toBe("heading-reveal");
    for (const selector of [".hero-name", ".hero-identity", ".hero-actions", ".character-scene", ".hero-sketch path"]) {
      const duration = await page.locator(selector).evaluate(el => {
        const s = getComputedStyle(el);
        return parseFloat(s.animationDuration) + parseFloat(s.animationDelay);
      });
      expect(duration).toBeLessThanOrEqual(0.8);
    }
    await page.locator(".hero-actions a").focus();
    expect(await page.locator(".hero-actions").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#work$/);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const selector of [".hero-name", ".hero-identity", ".hero-actions", ".character-scene", ".hero-sketch path"]) {
      expect(await page.locator(selector).evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});

test("touch navigation reaches the closing scene without trapping scroll", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  for (const locale of ["th", "en"]) {
    await page.goto(`/${locale}`);
    await page.locator(".menu-button").tap();
    await page.locator('#mobile-navigation a[href$="#contact"]').tap();
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(page.locator("#closing-title")).toBeInViewport();
    expect(await page.locator("html").evaluate(el => getComputedStyle(el).overflowY)).not.toBe("hidden");
    for (const image of await page.locator(".project-featured .sketch-frame img, .project-note .sketch-frame img").all()) {
      const imageBox = await image.boundingBox();
      expect(imageBox!.width).toBeGreaterThanOrEqual(330);
    }
  }
  await context.close();
});
for (const locale of ["th", "en"]) {
  for (const size of sizes) {
    test(`${locale} ${size.name}: pages fit and media loads`, async ({
      page,
    }) => {
      await page.setViewportSize(size);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const suffix of [
        "",
        "/projects/cp-department",
        "/projects/gemini-tts",
        "/projects/portfolio-v2",
      ]) {
        const response = await page.goto(`/${locale}${suffix}`);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1")).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        ).toBe(true);
        const brokenImages = await page
          .locator("img")
          .evaluateAll(async (elements) => {
            const images = elements.filter(
              (element): element is HTMLImageElement =>
                element instanceof HTMLImageElement,
            );
            await Promise.all(
              images.map((image) => {
                image.loading = "eager";
                return image.decode().catch(() => {});
              }),
            );
            return images.filter((image) => !image.naturalWidth).length;
          });
        expect(brokenImages).toBe(0);
        expect(await page.evaluate(() => [...document.fonts].some(font =>
          font.family === (document.documentElement.lang === "th" ? "Anuphan" : "Geist") && font.status === "loaded",
        ))).toBe(true);
        if (suffix) {
          await expect(page.locator("main .chibi-moment")).toHaveCount(1);
          await expect(page.locator("main .chibi-moment img")).toHaveCount(1);
          await expect(page.locator("main .chibi-moment img")).toHaveAttribute("alt", "");
          if (suffix.endsWith("gemini-tts")) {
            await expect(page.locator(".case-work-samples figure")).toHaveCount(2);
            expect(await page.locator(".case-work-samples img").evaluateAll(images =>
              images.every(img => Boolean(img.getAttribute("alt"))),
            )).toBe(true);
          }
          await expect(page.locator(".case-contribution")).toBeVisible();
          await expect(page.locator(".case-opening h1")).toBeVisible();
          await expect(page.locator(".next-project")).toHaveAttribute("href", /\/projects\//);
          if (size.name === "desktop") {
            const opening = await page.locator(".case-opening").boundingBox();
            expect(opening!.y + opening!.height).toBeLessThan(800);
          }
        } else {
          await expect(page.locator(".portfolio-opening")).toBeHidden();
          const preview = await page.locator(".project-featured .project-media").boundingBox();
          expect(preview!.height).toBeLessThan(450);
          expect(preview!.width / preview!.height).toBeCloseTo(1440 / 744, 1);
          await expect(page.locator(".hero .chibi-moment")).toHaveCount(0);
          const sampler = await page.locator(".botnoi-collage").boundingBox();
          expect(sampler!.height).toBeLessThan(520);
          await page.locator("#experience").screenshot({path: `artifacts/${locale}-${size.name}-botnoi-preview.png`});
          await page.locator(".site-footer").screenshot({path: `artifacts/${locale}-${size.name}-footer.png`});
        }
        await page.screenshot({
          path: `artifacts/${locale}-${size.name}${suffix.replaceAll("/", "-") || "-home"}.png`,
          fullPage: true,
          animations: "disabled",
        });
      }
      expect(errors).toEqual([]);
    });
  }
}
test("Thai default, language switching, project navigation, and browser back", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/th$/);
  await page.locator(".hero-actions .primary-link").click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en#work$/);
  await page.getByRole("link", { name: "Read the case study" }).click();
  await expect(page).toHaveURL(/\/en\/projects\/gemini-tts$/);
  await page.getByRole("link", { name: "ภาษาไทย", exact: true }).click();
  await expect(page).toHaveURL(/\/th\/projects\/gemini-tts$/);
  await page.getByRole("link", { name: "กลับไปดูผลงาน" }).click();
  await expect(page).toHaveURL(/\/th#work$/);
  await page.goBack();
  await expect(page.locator("h1")).toContainText("BOTNOI");
});

test("three evidenced projects retain their case-study and locale routes", async ({
  page,
}) => {
  await page.goto("/th");
  await expect(page.locator(".project-row")).toHaveCount(3);
  await expect(page.locator(".project-row h3")).toHaveText([
    "Computer Programmer Department",
    "Portfolio V2",
    "BOTNOI",
  ]);
  await page.locator(".project-featured h3 a").click();
  await expect(page).toHaveURL(/\/th\/projects\/cp-department$/);
  await expect(page.locator(".case-media .project-preview img")).toBeVisible();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/cp-department$/);
  await expect(
    page
      .locator(".case-section")
      .filter({
        has: page.getByRole("heading", {
          name: "My responsibility",
          exact: true,
        }),
      }),
  ).toContainText("[Describe the work completed personally");
  await page.goto("/en/projects/gemini-tts");
  await expect(page.locator(".case-media")).toHaveCount(1);
});

test("edge progress tracks the document without intercepting input", async ({
  page,
}) => {
  await page.goto("/en");
  const rail = page.locator(".story-progress");
  if (
    await page.evaluate(() => CSS.supports("animation-timeline", "scroll()"))
  ) {
    await expect(rail).toBeVisible();
    expect(
      await rail.evaluate((el) => getComputedStyle(el).pointerEvents),
    ).toBe("none");
    const progress = rail.locator("span");
    await expect
      .poll(() =>
        progress.evaluate(
          (el) => new DOMMatrix(getComputedStyle(el).transform).m22,
        ),
      )
      .toBeLessThan(0.01);
    await page.keyboard.press("Control+End");
    await expect
      .poll(() =>
        progress.evaluate(
          (el) => new DOMMatrix(getComputedStyle(el).transform).m22,
        ),
      )
      .toBeGreaterThan(0.99);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(rail).toBeHidden();
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});
test("mobile navigation, keyboard focus, reduced motion, and small phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/th");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.getByRole("button", { name: "เมนู", exact: true }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "เมนู", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "เมนู", exact: true }).click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "ความสนใจ", exact: true })
    .click();
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await expect(page).toHaveURL(/#journey$/);
  expect(
    await page
      .locator(".hero-name")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("unknown projects return localized 404 pages", async ({ page }) => {
  for (const locale of ["th", "en"]) {
    const response = await page.goto(`/${locale}/projects/does-not-exist`);
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText(
      locale === "th" ? "ไม่พบหน้านี้" : "Page not found",
    );
    const missingPage = await page.goto(`/${locale}/missing-page`);
    expect(missingPage?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText(
      locale === "th" ? "ไม่พบหน้านี้" : "Page not found",
    );
  }
});

test("opening artwork and localized copy remain separate at intermediate widths", async ({
  page,
}) => {
  for (const locale of ["th", "en"]) {
    for (const width of [320, 600, 768, 1024, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      const copy = await page.locator(".opening-copy").boundingBox();
      const art = await page.locator(".character-scene").boundingBox();
      expect(copy).not.toBeNull();
      expect(art).not.toBeNull();
      const separate =
        copy!.x + copy!.width <= art!.x + 1 ||
        copy!.y + copy!.height <= art!.y + 1;
      expect(
        separate,
        `${locale} at ${width}px: portrait must not overlap copy`,
      ).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});

test("scroll completes the portrait and the learning thread; reduced motion is complete and static", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  const ink = page.locator(".character-ink");
  if (await page.evaluate(() => CSS.supports("animation-timeline", "view()"))) {
    const initial = await ink.evaluate(
      (element) => getComputedStyle(element).maskImage,
    );
    await page.evaluate(() =>
      window.scrollTo({ top: 400, behavior: "instant" }),
    );
    await expect
      .poll(() =>
        ink.evaluate((element) => getComputedStyle(element).maskImage),
      )
      .not.toBe(initial);
    const thread = page.locator(".thread-ink");
    const initialThread = await thread.evaluate(
      (element) => getComputedStyle(element).strokeDashoffset,
    );
    await page.locator("#direction").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        thread.evaluate(
          (element) => getComputedStyle(element).strokeDashoffset,
        ),
      )
      .not.toBe(initialThread);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  expect(
    await ink.evaluate((element) => getComputedStyle(element).maskImage),
  ).toBe("none");
  expect(
    await ink.evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".journey-intro")
      .evaluate((element) => getComputedStyle(element).position),
  ).toBe("static");
  await expect(page.locator(".journey-stages li")).toHaveCount(3);
  await expect(page.locator(".reflection-body")).toBeVisible();
});
