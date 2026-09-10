import { defineConfig } from "@playwright/test";
import path from "node:path";

process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.join(
  process.cwd(),
  "node_modules/.cache/ms-playwright",
);
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:3000", browserName: "chromium" },
  reporter: "list",
});
