import { expect, test } from "@playwright/test";

const figmaFrames = [
  { name: "desktop", width: 1440, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
] as const;

const componentRoute = "/components/testimonial-card";

test("component gallery links to the testimonial card route", async ({
  page,
}) => {
  await page.goto("/components", { waitUntil: "load" });

  await expect(
    page.getByRole("link", { name: /Testimonial card/ }),
  ).toHaveAttribute("href", componentRoute);
});

for (const frame of figmaFrames) {
  test(`${frame.name} matches the Figma frame`, async ({ page }) => {
    await page.setViewportSize({ width: frame.width, height: frame.height });
    await page.goto(componentRoute, { waitUntil: "load" });

    await page.evaluate(() => document.fonts.ready);
    const card = page.locator("article");
    await expect(card).toBeVisible();
    await expect(page.locator("img")).toHaveJSProperty("complete", true);

    const cardBox = await card.boundingBox();
    if (!cardBox) throw new Error("The testimonial card has no layout box");

    expect(cardBox).toEqual({
      x: (frame.width - 340) / 2,
      y: 200,
      width: 340,
      height: 233,
    });

    const bodyBox = await page.locator("article > p").boundingBox();
    if (!bodyBox) throw new Error("The testimonial body has no layout box");

    expect(bodyBox).toEqual({
      x: (frame.width - 340) / 2 + 24,
      y: 289,
      width: 292,
      height: 120,
    });

    await expect(
      await page.screenshot({ animations: "disabled", caret: "hide", scale: "css" }),
    ).toMatchSnapshot(`${frame.name}.png`, {
      // Figma and Chromium rasterize text and images differently. Keep the
      // layout assertions above strict and allow only rendering noise here.
      maxDiffPixelRatio: 0.025,
      threshold: 0.1,
    });
  });
}

test("wraps long unbroken strings without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(componentRoute, { waitUntil: "load" });

  const values = {
    name: "N".repeat(1_000),
    username: `@${"u".repeat(1_000)}`,
    testimonial: "T".repeat(5_000),
  };

  await page.locator("article").evaluate((article, values) => {
    const name = article.querySelector("header p");
    const username = article.querySelector("header p + p");
    const testimonial = article.querySelector(":scope > p");

    if (!name || !username || !testimonial) {
      throw new Error("Testimonial card text nodes were not found");
    }

    name.textContent = values.name;
    username.textContent = values.username;
    testimonial.textContent = values.testimonial;
  }, values);

  const card = page.locator("article");

  await expect(card).toContainText(values.name);
  await expect(card).toContainText(values.username);
  await expect(card).toContainText(values.testimonial);

  const metrics = await card.evaluate((element) => ({
    width: element.clientWidth,
    scrollWidth: element.scrollWidth,
    right: element.getBoundingClientRect().right,
    viewportWidth: window.innerWidth,
  }));

  expect(metrics.scrollWidth).toBe(metrics.width);
  expect(metrics.right).toBeLessThanOrEqual(metrics.viewportWidth);
});
