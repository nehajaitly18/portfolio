import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    // ─── Existing suite — desktop Chromium only ──────────────────────────
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /portfolio\.spec\.ts/,
    },

    // ─── Mobile navbar tests — Chromium (Android Chrome) ─────────────────
    {
      name: "mobile-chrome-iphone14",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1",
      },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
    {
      name: "mobile-chrome-iphoneSE",
      use: {
        browserName: "chromium",
        viewport: { width: 375, height: 667 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1",
      },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
    {
      name: "mobile-chrome-pixel5",
      use: { ...devices["Pixel 5"] },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
    {
      name: "mobile-chrome-galaxyS9",
      use: { ...devices["Galaxy S9+"] },
      testMatch: /navbar-mobile\.spec\.ts/,
    },

    // ─── Mobile navbar tests — Firefox ───────────────────────────────────
    {
      name: "mobile-firefox-iphone14",
      use: {
        browserName: "firefox",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
    {
      name: "mobile-firefox-pixel5",
      use: {
        browserName: "firefox",
        viewport: { width: 393, height: 851 },
        isMobile: true,
        hasTouch: true,
      },
      testMatch: /navbar-mobile\.spec\.ts/,
    },

    // ─── Mobile navbar tests — WebKit (Safari) ────────────────────────────
    {
      name: "mobile-webkit-iphone14",
      use: { ...devices["iPhone 14"] },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
    {
      name: "mobile-webkit-iphoneSE",
      use: { ...devices["iPhone SE"] },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
    {
      name: "mobile-webkit-iphone14ProMax",
      use: { ...devices["iPhone 14 Pro Max"] },
      testMatch: /navbar-mobile\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
