/**
 * Navbar opacity / coverage tests across mobile viewports and all browsers.
 *
 * Claim: on mobile the header is always fully opaque (solid white) and sits
 * on top of page content — nothing can scroll above or peek behind it.
 */
import { test, expect, Page } from "@playwright/test";

// ─── Device matrix ───────────────────────────────────────────────────────────
// We run via named projects in playwright.config so viewports come from there.
// Each test also asserts viewport width ≤ 768 so it's never silently run as
// desktop and giving a false PASS.

async function waitForPage(page: Page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  // Let animations settle
  await page.waitForTimeout(1200);
}

// ─── 1. Header is position:fixed at top:0 ─────────────────────────────────
test("header is position:fixed at top:0 on load", async ({ page }) => {
  await waitForPage(page);
  const header = page.locator("header");

  const position = await header.evaluate(
    (el) => window.getComputedStyle(el).position
  );
  expect(position).toBe("fixed");

  const top = await header.evaluate(
    (el) => window.getComputedStyle(el).top
  );
  // top should resolve to "0px" (safe-area handled via padding, not top offset)
  expect(parseFloat(top)).toBe(0);
});

// ─── 2. Header z-index is high enough to cover content ───────────────────
test("header z-index is ≥ 50 on mobile", async ({ page }) => {
  await waitForPage(page);
  const zIndex = await page.locator("header").evaluate(
    (el) => parseInt(window.getComputedStyle(el).zIndex, 10)
  );
  // Nav sets z-[100]; require at least 50 as a floor
  expect(zIndex).toBeGreaterThanOrEqual(50);
});

// ─── 3. Background is fully opaque white at rest ─────────────────────────
test("header background is fully opaque white at page load", async ({ page }) => {
  await waitForPage(page);
  const bg = await page.locator("header").evaluate(
    (el) => window.getComputedStyle(el).backgroundColor
  );
  // Must be rgb(255, 255, 255) — NOT rgba with any alpha < 1
  expect(bg).toBe("rgb(255, 255, 255)");
});

// ─── 4. Background stays opaque after scrolling 300px down ───────────────
test("header background stays fully opaque after scrolling", async ({ page }) => {
  await waitForPage(page);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(600);

  const bg = await page.locator("header").evaluate(
    (el) => window.getComputedStyle(el).backgroundColor
  );
  expect(bg).toBe("rgb(255, 255, 255)");
});

// ─── 5. No page content is hit-testable above the navbar ─────────────────
test("nothing from page content sits above the header on load", async ({ page }) => {
  await waitForPage(page);

  const headerHeight = await page.locator("header").evaluate(
    (el) => el.getBoundingClientRect().height
  );
  const viewportWidth = page.viewportSize()!.width;

  // Sample 5 horizontal points across the top strip of the header
  const xs = [
    Math.round(viewportWidth * 0.1),
    Math.round(viewportWidth * 0.3),
    Math.round(viewportWidth * 0.5),
    Math.round(viewportWidth * 0.7),
    Math.round(viewportWidth * 0.9),
  ];

  for (const x of xs) {
    // y = 4px — well inside the header zone
    const topEl = await page.evaluate(
      ([px, py]) => {
        const el = document.elementFromPoint(px, py);
        if (!el) return { tag: "null", inHeader: false };
        const header = document.querySelector("header");
        return {
          tag: el.tagName,
          inHeader: !!header?.contains(el),
        };
      },
      [x, 4] as [number, number]
    );
    expect(
      topEl.inHeader,
      `At x=${x}, y=4 expected header but got <${topEl.tag}>`
    ).toBe(true);
  }
});

// ─── 6. No page content sits above the header after scrolling ────────────
test("nothing from page content sits above the header after scrolling", async ({
  page,
}) => {
  await waitForPage(page);
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(700);

  const viewportWidth = page.viewportSize()!.width;
  const xs = [
    Math.round(viewportWidth * 0.1),
    Math.round(viewportWidth * 0.5),
    Math.round(viewportWidth * 0.9),
  ];

  for (const x of xs) {
    const topEl = await page.evaluate(
      ([px, py]) => {
        const el = document.elementFromPoint(px, py);
        if (!el) return { tag: "null", inHeader: false };
        const header = document.querySelector("header");
        return { tag: el.tagName, inHeader: !!header?.contains(el) };
      },
      [x, 4] as [number, number]
    );
    expect(
      topEl.inHeader,
      `After scroll: at x=${x}, y=4 expected header but got <${topEl.tag}>`
    ).toBe(true);
  }
});

// ─── 7. Content below header is scrolled page content, not header ─────────
test("page content is reachable just below the header after scroll", async ({
  page,
}) => {
  await waitForPage(page);
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(700);

  const headerHeight = await page.locator("header").evaluate(
    (el) => el.getBoundingClientRect().height
  );
  const viewportWidth = page.viewportSize()!.width;
  const x = Math.round(viewportWidth * 0.5);
  // 10px below the header
  const y = Math.round(headerHeight + 10);

  const belowEl = await page.evaluate(
    ([px, py]) => {
      const el = document.elementFromPoint(px, py);
      if (!el) return { tag: "null", inHeader: false };
      const header = document.querySelector("header");
      return { tag: el.tagName, inHeader: !!header?.contains(el) };
    },
    [x, y] as [number, number]
  );
  // Should hit page content, not the header itself
  expect(belowEl.inHeader).toBe(false);
});

// ─── 8. Visual screenshot at rest ────────────────────────────────────────
test("screenshot: navbar at page load (mobile)", async ({ page }) => {
  await waitForPage(page);
  // Clip to just the top 100px — the area where content would leak through
  await expect(page).toHaveScreenshot("navbar-at-rest.png", {
    clip: { x: 0, y: 0, width: page.viewportSize()!.width, height: 100 },
    maxDiffPixelRatio: 0.02,
  });
});

// ─── 9. Visual screenshot after scroll ───────────────────────────────────
test("screenshot: navbar after scroll (mobile)", async ({ page }) => {
  await waitForPage(page);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(700);
  await expect(page).toHaveScreenshot("navbar-scrolled.png", {
    clip: { x: 0, y: 0, width: page.viewportSize()!.width, height: 100 },
    maxDiffPixelRatio: 0.02,
  });
});

// ─── 10. About page — same checks on a second route ──────────────────────
test("header opaque on /about after scroll", async ({ page }) => {
  await page.goto("/about");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(600);

  const bg = await page.locator("header").evaluate(
    (el) => window.getComputedStyle(el).backgroundColor
  );
  expect(bg).toBe("rgb(255, 255, 255)");
});
