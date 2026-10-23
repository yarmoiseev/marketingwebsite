import { defineConfig, devices } from "@playwright/test";

const visualTestPort = 3100;

export default defineConfig({
  testDir: "./tests/visual",
  snapshotPathTemplate: "{testDir}/figma/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://127.0.0.1:${visualTestPort}`,
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "Asia/Tbilisi",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.025,
      threshold: 0.1,
    },
  },
  webServer: {
    command: `pnpm exec next dev --hostname 127.0.0.1 --port ${visualTestPort}`,
    url: `http://127.0.0.1:${visualTestPort}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
