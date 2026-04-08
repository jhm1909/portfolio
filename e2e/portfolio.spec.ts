import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Home page", () => {
  test("loads hero section", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("h1")).toContainText("Crafting digital");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("nav links are present", async ({ page }) => {
    await page.goto(BASE);
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Work", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
  });

  test("project cards link to case study", async ({ page }) => {
    await page.goto(BASE);
    const card = page.locator("article").filter({ hasText: "MyCar" }).first();
    await expect(card).toBeVisible();
  });

  test("contact form renders", async ({ page }) => {
    await page.goto(`${BASE}/#contact`);
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
  });

  test("skip to content link works", async ({ page }) => {
    await page.goto(BASE);
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
  });
});

test.describe("Blog", () => {
  test("blog listing loads with posts", async ({ page }) => {
    await page.goto(`${BASE}/blog`);
    await expect(page.locator("h1")).toContainText("Thoughts & writings");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("blog search filters posts", async ({ page }) => {
    await page.goto(`${BASE}/blog`);
    await page.getByPlaceholder("Search posts...").fill("liquid glass");
    await expect(page.locator("article")).toHaveCount(1);
    await expect(page.locator("article").first()).toContainText("Liquid Glass");
  });

  test("blog tag filter works", async ({ page }) => {
    await page.goto(`${BASE}/blog`);
    await page.getByRole("button", { name: "CSS" }).click();
    await expect(page.locator("article")).toHaveCount(1);
  });

  test("blog post loads with content", async ({ page }) => {
    await page.goto(`${BASE}/blog/building-liquid-glass-ui`);
    await expect(page.locator("h1")).toContainText("Liquid Glass UI");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("blog post has prev/next nav", async ({ page }) => {
    await page.goto(`${BASE}/blog/why-simplicity-wins`);
    await expect(page.getByText("Previous")).toBeVisible();
    await expect(page.getByText("Next")).toBeVisible();
  });
});

test.describe("Case Study", () => {
  test("case study page loads", async ({ page }) => {
    await page.goto(`${BASE}/work/mycar`);
    await expect(page.locator("h1")).toContainText("MyCar");
    await expect(page.getByText("The Challenge")).toBeVisible();
    await expect(page.getByText("The Solution")).toBeVisible();
    await expect(page.getByText("The Result")).toBeVisible();
  });

  test("case study has key features", async ({ page }) => {
    await page.goto(`${BASE}/work/heynabi`);
    await expect(page.getByText("Key Features")).toBeVisible();
  });
});

test.describe("RSS & SEO", () => {
  test("RSS feed returns XML", async ({ request }) => {
    const res = await request.get(`${BASE}/feed.xml`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const body = await res.text();
    expect(body).toContain("<rss");
    expect(body).toContain("Cappy");
  });

  test("sitemap returns XML", async ({ request }) => {
    const res = await request.get(`${BASE}/sitemap.xml`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/work/mycar");
    expect(body).toContain("/blog/building-liquid-glass-ui");
  });

  test("security headers are present", async ({ request }) => {
    const res = await request.get(BASE);
    expect(res.headers()["x-frame-options"]).toBe("DENY");
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
    expect(res.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(res.headers()["content-security-policy"]).toBeTruthy();
  });
});

test.describe("Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger menu opens and closes", async ({ page }) => {
    await page.goto(BASE);
    const toggle = page.getByLabel("Open menu");
    await toggle.click();
    await expect(page.getByRole("menuitem", { name: "Work" })).toBeVisible();
    // Close via hamburger button (now shows "Close menu")
    await page.getByLabel("Close menu").click();
    // Menu animates to max-h-0 — check the container is collapsed
    const menu = page.locator("[role=menu]");
    await expect(menu).toHaveCSS("max-height", "0px");
  });
});
