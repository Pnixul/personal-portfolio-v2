import { expect, test } from "@playwright/test";
const sizes = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 1000 },
];
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
              images.map((image) => image.decode().catch(() => {})),
            );
            return images.filter((image) => !image.naturalWidth).length;
          });
        expect(brokenImages).toBe(0);
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
  await expect(page.locator("h1")).toContainText("Gemini TTS");
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
    .getByRole("link", { name: "การเรียนรู้และเป้าหมาย" })
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
    await expect(page.locator("h1")).toHaveText(locale === "th" ? "ไม่พบหน้านี้" : "Page not found");
  }
});
