import { expect, test } from "@playwright/test";

const figmaFrames = [
  {
    name: "desktop",
    width: 1440,
    height: 768,
    x: 16,
    y: 25,
    widthExpected: 1408,
    heightExpected: 718,
  },
  {
    name: "tablet",
    width: 768,
    height: 1024,
    x: 16,
    y: 43,
    widthExpected: 736,
    heightExpected: 938,
  },
  {
    name: "mobile",
    width: 375,
    height: 812,
    x: 16,
    y: 72,
    widthExpected: 343,
    heightExpected: 668,
  },
] as const;

const componentRoute = "/components/hero-section";

test("component gallery links to the hero section route", async ({ page }) => {
  await page.goto("/components", { waitUntil: "load" });

  await expect(
    page.getByRole("link", { name: /Hero section/ }),
  ).toHaveAttribute("href", componentRoute);
});

for (const frame of figmaFrames) {
  test(`${frame.name} matches the Figma frame`, async ({ page }) => {
    await page.setViewportSize({ width: frame.width, height: frame.height });
    await page.goto(componentRoute, { waitUntil: "load" });

    await page.evaluate(() => document.fonts.ready);

    const section = page.locator("section");
    await expect(section).toBeVisible();
    await expect(page.locator("img")).toHaveJSProperty("complete", true);

    const sectionBox = await section.boundingBox();
    if (!sectionBox) throw new Error("The hero section has no layout box");

    expect(sectionBox).toEqual({
      x: frame.x,
      y: frame.y,
      width: frame.widthExpected,
      height: frame.heightExpected,
    });

    await expect(
      await page.screenshot({
        animations: "disabled",
        caret: "hide",
        scale: "css",
      }),
    ).toMatchSnapshot(`hero-section-${frame.name}.png`, {
      maxDiffPixelRatio: 0.025,
      threshold: 0.1,
    });
  });
}

test("action buttons expose hover and keyboard focus states", async ({ page }) => {
  await page.goto(componentRoute, { waitUntil: "load" });
  await page.addStyleTag({
    content: "*, *::before, *::after { transition: none !important; }",
  });

  const learnMore = page.getByRole("button", { name: "Learn more" });
  await expect(learnMore).toBeVisible();

  const learnMoreNormalBg = await learnMore.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await learnMore.hover();
  const learnMoreHoverBg = await learnMore.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  expect(learnMoreHoverBg).not.toBe(learnMoreNormalBg);

  await page.mouse.move(0, 0);
  await learnMore.focus();
  await expect(learnMore).toBeFocused();
  const learnMoreFocusShadow = await learnMore.evaluate(
    (el) => getComputedStyle(el).boxShadow,
  );
  expect(learnMoreFocusShadow).toContain("rgb(68, 76, 231)");

  const seePricing = page.getByRole("button", { name: "See pricing" });
  await expect(seePricing).toBeVisible();

  const seePricingNormalBg = await seePricing.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await seePricing.hover();
  const seePricingHoverBg = await seePricing.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  expect(seePricingHoverBg).not.toBe(seePricingNormalBg);

  await page.mouse.move(0, 0);
  await seePricing.focus();
  await expect(seePricing).toBeFocused();
  const seePricingFocusShadow = await seePricing.evaluate(
    (el) => getComputedStyle(el).boxShadow,
  );
  expect(seePricingFocusShadow).toContain("rgb(68, 76, 231)");
});

test("uses semantic elements and accessible image alternatives", async ({ page }) => {
  await page.goto(componentRoute, { waitUntil: "load" });

  const section = page.locator("section");
  await expect(section).toBeVisible();

  const heading = section.getByRole("heading", { level: 1 });
  await expect(heading).toHaveText("Well crafted abstract images");

  const headingId = await heading.getAttribute("id");
  expect(headingId).toBeTruthy();
  await expect(section).toHaveAttribute("aria-labelledby", headingId!);

  const image = section.getByRole("img", {
    name: "Abstract artwork with colorful 3D shapes and gradients",
  });
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute(
    "alt",
    "Abstract artwork with colorful 3D shapes and gradients",
  );
  await expect(image).toHaveJSProperty("complete", true);
});

test("wraps long hero content without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(componentRoute, { waitUntil: "load" });
  await page.waitForLoadState("networkidle");

  const values = {
    heading: "SuperLongHeadingWithoutSpaces-".repeat(20),
    description: "SuperLongDescriptionWithoutSpaces-".repeat(50),
  };

  await page.locator("section").evaluate((section, vals) => {
    const h1 = section.querySelector("h1");
    const p = section.querySelector("p");

    if (!h1 || !p) {
      throw new Error("Hero section text elements were not found");
    }

    h1.textContent = vals.heading;
    p.textContent = vals.description;
  }, values);

  const section = page.locator("section");
  await expect(section).toContainText(values.heading);
  await expect(section).toContainText(values.description);

  const metrics = await section.evaluate((element) => {
    const textElements = Array.from(element.querySelectorAll("h1, p"));

    return {
      width: element.clientWidth,
      scrollWidth: element.scrollWidth,
      right: element.getBoundingClientRect().right,
      viewportWidth: window.innerWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      overflowingTextElements: textElements
        .filter((el) => el.scrollWidth > el.clientWidth)
        .map((el) => el.tagName),
    };
  });

  expect(metrics.scrollWidth).toBe(metrics.width);
  expect(metrics.right).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.overflowingTextElements).toEqual([]);
});
