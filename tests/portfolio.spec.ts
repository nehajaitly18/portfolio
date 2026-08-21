import { test, expect } from "@playwright/test";

// ─── Hero section ────────────────────────────────────────────
test.describe("Hero", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for fonts + animations to settle
    await page.waitForTimeout(1800);
  });

  test("hero has white background", async ({ page }) => {
    const section = page.locator("section").first();
    const bg = await section.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    // white = rgb(255, 255, 255)
    expect(bg).toBe("rgb(255, 255, 255)");
  });

  test("hero displays all 4 headline lines", async ({ page }) => {
    await expect(page.getByText(/Hi,\s+I.m Neha/i)).toBeVisible();
    await expect(page.getByText(/I.m a visual/i)).toBeVisible();
    await expect(page.locator(".hl-yellow")).toBeVisible();
    await expect(page.locator(".hl-teal")).toBeVisible();
  });

  test("project title uses Georgia", async ({ page }) => {
    const title = page.locator("[data-cursor-label]").first().locator("div").first();
    const fontFamily = await title.evaluate(
      (el) => window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily.toLowerCase()).toContain("georgia");
  });

  test("hero headline font size is large (>=40px)", async ({ page }) => {
    const headline = page.locator("section span").first();
    const fontSize = await headline.evaluate((el) =>
      parseFloat(window.getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(40);
  });

  test("heart doodle SVG appears after animation", async ({ page }) => {
    // The heart SVG contains an elliptical path with pink stroke
    const heartSvgs = page.locator("svg").filter({ has: page.locator('path[stroke="#FF6B95"]') });
    await expect(heartSvgs).toBeVisible();
  });

  test("circle doodle SVG appears after animation", async ({ page }) => {
    const circleSvgs = page.locator('svg path[stroke="#FF85A8"]').first();
    await expect(circleSvgs).toBeVisible();
  });

  test("sparkle SVG appears", async ({ page }) => {
    const sparkleSvgs = page.locator('svg line[stroke="#3DB88A"]').first();
    await expect(sparkleSvgs).toBeVisible();
  });

  test("yellow highlight on 'thoughtful'", async ({ page }) => {
    const thoughtful = page.locator(".hl-yellow");
    await expect(thoughtful).toBeVisible();
    await expect(thoughtful).toHaveText("thoughtful");
  });

  test("teal highlight on 'effortless'", async ({ page }) => {
    const effortless = page.locator(".hl-teal");
    await expect(effortless).toBeVisible();
    await expect(effortless).toHaveText("effortless");
  });
});

// ─── Navigation ──────────────────────────────────────────────
test.describe("Nav", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(800);
  });

  test("NJ logomark circle is visible", async ({ page }) => {
    const logo = page.locator("nav a[aria-label='Neha Jaitly — home']");
    await expect(logo).toBeVisible();
    // Contains the circle div
    const circle = logo.locator("div");
    await expect(circle).toBeVisible();
    // Verify it's rounded (Tailwind rounded-full resolves to a large px value in Chrome)
    const borderRadius = await circle.evaluate(
      (el) => parseFloat(window.getComputedStyle(el).borderRadius)
    );
    expect(borderRadius).toBeGreaterThan(0);
  });

  test("NJ text inside logomark", async ({ page }) => {
    await expect(page.locator("nav").getByText("NJ")).toBeVisible();
  });

  test("NJ circle has black background", async ({ page }) => {
    const circle = page.locator("nav a[aria-label='Neha Jaitly — home'] > div");
    const bg = await circle.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    // #111110 ≈ rgb(17, 17, 16)
    expect(bg).toBe("rgb(17, 17, 16)");
  });

  test("Work and About links present in desktop nav", async ({ page }) => {
    await expect(page.locator("nav").getByRole("link", { name: "Work" })).toBeVisible();
    await expect(page.locator("nav").getByRole("link", { name: "About" })).toBeVisible();
  });

  test("Resume pill button visible in desktop nav", async ({ page }) => {
    const resume = page.locator("nav a[href*='drive.google']");
    await expect(resume).toBeVisible();
    // Should be styled as a pill (border-radius should be large)
    const br = await resume.evaluate((el) => window.getComputedStyle(el).borderRadius);
    expect(parseFloat(br)).toBeGreaterThan(12);
  });

  test("Resume button has dark background (pill style)", async ({ page }) => {
    const resume = page.locator("nav a[href*='drive.google']");
    const bg = await resume.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bg).toBe("rgb(17, 17, 16)");
  });

  test("nav scrolled state adds border", async ({ page }) => {
    const header = page.locator("header");
    // Scroll down past threshold
    await page.evaluate(() => window.scrollBy(0, 80));
    await page.waitForTimeout(600);
    // Should have a border-bottom after scroll
    const borderWidth = await header.evaluate(
      (el) => window.getComputedStyle(el).borderBottomWidth
    );
    expect(parseFloat(borderWidth)).toBeGreaterThan(0);
  });
});

// ─── Home page (projects grid) ───────────────────────────────
test.describe("Projects grid", () => {
  test("project cards are visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    const cards = page.locator("[data-cursor-label]");
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
  });

  test("project grid is 2-column on desktop", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(800);
    // Check grid-template-columns
    const grid = page.locator(".grid").first();
    const cols = await grid.evaluate(
      (el) => window.getComputedStyle(el).gridTemplateColumns
    );
    // Should have 2 column values (two equal fractions or pixel values)
    const colCount = cols.trim().split(/\s+/).length;
    expect(colCount).toBe(2);
  });
});

// ─── About page ──────────────────────────────────────────────
test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
    await page.waitForTimeout(800);
  });

  test("portrait image is present", async ({ page }) => {
    const img = page.locator("img[alt='Neha Jaitly']");
    await expect(img).toBeVisible();
  });

  test("Hi there! heading is visible", async ({ page }) => {
    await expect(page.getByText("Hi there!")).toBeVisible();
  });

  test("experience accordion items are present", async ({ page }) => {
    const accordionRows = page.locator("button").filter({ hasText: /Designer|Instructor|Intern|Creative/i });
    expect(await accordionRows.count()).toBeGreaterThanOrEqual(3);
  });

  test("accordion toggles on click", async ({ page }) => {
    const firstButton = page.locator("button").filter({ hasText: /VP of Creative/i }).first();
    await firstButton.click();
    await page.waitForTimeout(400);
    // Details paragraph should appear
    const detail = page.locator("p").filter({ hasText: /Michigan's premier/i });
    await expect(detail).toBeVisible();
    // Click again — should close
    await firstButton.click();
    await page.waitForTimeout(400);
    await expect(detail).not.toBeVisible();
  });
});

// ─── Mobile navbar opacity ────────────────────────────────────
test.describe("Mobile nav — opaque on scroll", () => {
  test("header background stays fully opaque on mobile after scroll", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto("/");
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(600);
    const bg = await page.locator("header").evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    // Must be fully opaque white — no rgba with alpha < 1
    expect(bg).toBe("rgb(255, 255, 255)");
    await ctx.close();
  });
});

// ─── Design system tokens ─────────────────────────────────────
test.describe("Design tokens", () => {
  test("--bg is white (#FFFFFF)", async ({ page }) => {
    await page.goto("/");
    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--bg").trim().toLowerCase()
    );
    // Browser may normalize #ffffff → #fff
    expect(["#ffffff", "#fff"]).toContain(bg);
  });

  test("--bg-warm is parchment (#F7F6F2)", async ({ page }) => {
    await page.goto("/");
    const warm = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--bg-warm").trim().toLowerCase()
    );
    expect(warm).toBe("#f7f6f2");
  });

  test("--ink is near-black (#111110)", async ({ page }) => {
    await page.goto("/");
    const ink = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--ink").trim()
    );
    expect(ink).toBe("#111110");
  });
});
