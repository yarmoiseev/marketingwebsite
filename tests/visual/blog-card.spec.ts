import { expect, test } from "@playwright/test";

const figmaFrames = [
  { name: "desktop", width: 1440, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
] as const;

const componentRoute = "/components/blog-card";

for (const frame of figmaFrames) {
  test(`${frame.name} matches the Figma frame`, async ({ page }) => {
    await page.setViewportSize({ width: frame.width, height: frame.height });
    await page.goto(componentRoute, { waitUntil: "load" });

    await page.evaluate(() => document.fonts.ready);

    const card = page.locator("article");
    await expect(card).toBeVisible();
    await expect(
      page.locator("article > div:first-child img"),
    ).toHaveJSProperty("complete", true);

    const cardBox = await card.boundingBox();
    if (!cardBox) throw new Error("The blog card has no layout box");

    expect(cardBox).toEqual({
      x: (frame.width - 340) / 2,
      y: 120,
      width: 340,
      height: 504,
    });

    const imageBox = await page.locator("article > div:first-child").boundingBox();
    if (!imageBox) throw new Error("The blog card image has no layout box");

    expect(imageBox).toEqual({
      x: (frame.width - 340) / 2,
      y: 120,
      width: 340,
      height: 288,
    });

    await expect(
      await page.screenshot({ animations: "disabled", caret: "hide", scale: "css" }),
    ).toMatchSnapshot(`blog-card-${frame.name}.png`, {
      // Figma and Chromium rasterize text and images differently. Keep the
      // layout assertions above strict and allow only rendering noise here.
      maxDiffPixelRatio: 0.025,
      threshold: 0.1,
    });
  });
}

test("wraps long text without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(componentRoute, { waitUntil: "load" });

  const values = {
    category: "C".repeat(1_000),
    title: "T".repeat(1_000),
    description: "D".repeat(5_000),
  };

  await page.locator("article").evaluate((article, values) => {
    const category = article.querySelector("header span");
    const title = article.querySelector("h2");
    const description = article.querySelector("p");

    if (!category || !title || !description) {
      throw new Error("Blog card text nodes were not found");
    }

    category.textContent = values.category;
    title.textContent = values.title;
    description.textContent = values.description;
  }, values);

  const card = page.locator("article");

  await expect(card).toContainText(values.category);
  await expect(card).toContainText(values.title);
  await expect(card).toContainText(values.description);

  const metrics = await card.evaluate((element) => {
    const textElements = [
      element,
      ...Array.from(element.querySelectorAll("header span, h2, p")),
    ];

    return {
      width: element.clientWidth,
      scrollWidth: element.scrollWidth,
      right: element.getBoundingClientRect().right,
      viewportWidth: window.innerWidth,
      overflowingTextElements: textElements
        .filter(
          (textElement) =>
            textElement.scrollWidth > textElement.clientWidth ||
            textElement.scrollHeight > textElement.clientHeight,
        )
        .map((textElement) => textElement.tagName),
    };
  });

  expect(metrics.scrollWidth).toBe(metrics.width);
  expect(metrics.right).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.overflowingTextElements).toEqual([]);
});

test("keeps cards the same height and aligns their read more links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(componentRoute, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  await page.locator("article").evaluate((card) => {
    const list = card.parentElement;
    if (!list) throw new Error("The blog card has no parent container");

    list.className = "grid grid-cols-2 items-stretch gap-4";
    list.replaceChildren(card, card.cloneNode(true));

    const cards = list.querySelectorAll("article");
    const secondTitle = cards[1]?.querySelector("h2");
    const secondDescription = cards[1]?.querySelector("p");

    if (!secondTitle || !secondDescription) {
      throw new Error("The cloned blog card is missing its text content");
    }

    secondTitle.textContent = "A much longer title that wraps onto additional lines";
    secondDescription.textContent =
      "A longer article description provides enough content to make this card taller than its sibling before the grid stretches both cards to the same height.";
  });

  const cards = page.locator("article");
  await expect(cards).toHaveCount(2);

  const geometry = await cards.evaluateAll((elements) =>
    elements.map((element) => ({
      height: element.getBoundingClientRect().height,
      readMoreTop: element.querySelector("a")?.getBoundingClientRect().top,
    })),
  );

  expect(geometry[0]?.height).toBe(geometry[1]?.height);
  expect(geometry[0]?.readMoreTop).toBe(geometry[1]?.readMoreTop);
});

test("uses semantic elements and accessible image alternatives", async ({
  page,
}) => {
  await page.goto(componentRoute, { waitUntil: "load" });

  const main = page.getByRole("main", { name: "Blog card preview" });
  const card = main.locator("article");

  await expect(main).toBeVisible();
  await expect(card.getByRole("heading", { level: 2 })).toHaveText(
    "Top 5 Living Room Inspirations",
  );
  await expect(card.getByRole("link", { name: "Read more" })).toHaveAttribute(
    "href",
    "#",
  );
  await expect(
    card.getByRole("img", {
      name: "Bright living room with plants, pendant lights, and a coffee table",
    }),
  ).toHaveAttribute(
    "alt",
    "Bright living room with plants, pendant lights, and a coffee table",
  );

  const arrow = card.locator('img[src$="/blog-card-arrow-right.svg"]');
  await expect(arrow).toHaveAttribute("alt", "");
  await expect(arrow).toHaveAttribute("aria-hidden", "true");
});

test("read more link has normal, hover, and keyboard focus states", async ({
  page,
}) => {
  await page.goto(componentRoute, { waitUntil: "load" });
  await page.addStyleTag({
    content: "*, *::before, *::after { transition: none !important; }",
  });

  const link = page.getByRole("link", { name: "Read more" });

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "#");

  const normalColor = await link.evaluate((element) =>
    getComputedStyle(element).color,
  );
  expect(normalColor).not.toBe("");

  await link.hover();
  const hoverColor = await link.evaluate((element) =>
    getComputedStyle(element).color,
  );
  expect(hoverColor).not.toBe(normalColor);

  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "solid");
  await expect(link).toHaveCSS("outline-width", "2px");
  await expect(link).toHaveCSS("outline-offset", "2px");

  const focusOutlineColor = await link.evaluate((element) =>
    getComputedStyle(element).outlineColor,
  );
  expect(focusOutlineColor).not.toMatch(/transparent|rgba\(0, 0, 0, 0\)/);
});
