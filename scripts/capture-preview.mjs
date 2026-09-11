import { mkdir } from "node:fs/promises";
import path from "node:path";

process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.join(
  process.cwd(),
  "node_modules/.cache/ms-playwright",
);
const { chromium } = await import("@playwright/test");
await mkdir("public/projects", { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    reducedMotion: "reduce",
  });
  for (const locale of ["th", "en"]) {
    const response = await page.goto(`http://127.0.0.1:3000/${locale}`);
    if (response?.status() !== 200)
      throw new Error(`Cannot capture ${locale}: HTTP ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".character-ink").evaluate((image) => image.decode());
    await page.screenshot({
      path: `public/projects/portfolio-v2-${locale}-coding.png`,
      animations: "disabled",
    });
  }
} finally {
  await browser.close();
}
