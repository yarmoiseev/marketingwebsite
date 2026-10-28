import { expect, test } from "@playwright/test";

const figmaFrames = [
  { name: "desktop", width: 1440, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
] as const;

const componentRoute = "/components/profile-card";

test("component gallery links to the profile card route", async ({ page }) => {
  await page.goto("/components", { waitUntil: "load" });

  await expect(
    page.getByRole("link", { name: /Profile card/ }),
  ).toHaveAttribute("href", componentRoute);
});

for (const frame of figmaFrames) {
  test(`${frame.name} matches the Figma frame`, async ({ page }) => {
    await page.setViewportSize({ width: frame.width, height: frame.height });
    await page.goto(componentRoute, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);

    const card = page.locator("article");
    await expect(card).toBeVisible();
    await expect(page.locator("img")).toHaveCount(5);
    expect(
      await page.locator("img").evaluateAll((images) =>
        images.every(
          (image) => image instanceof HTMLImageElement && image.complete,
        ),
      ),
    ).toBe(true);

    const cardBox = await card.boundingBox();
    if (!cardBox) throw new Error("The profile card has no layout box");

    expect(cardBox).toEqual({
      x: (frame.width - 340) / 2,
      y: 200,
      width: 340,
      height: 428,
    });

    const detailsBox = await card.locator(":scope > div").first().boundingBox();
    if (!detailsBox) throw new Error("The profile details have no layout box");
    expect(detailsBox).toEqual({
      x: (frame.width - 340) / 2 + 16,
      y: 224,
      width: 308,
      height: 236,
    });

    await expect(
      await page.screenshot({ animations: "disabled", caret: "hide", scale: "css" }),
    ).toMatchSnapshot(`profile-card-${frame.name}.png`, {
      maxDiffPixelRatio: 0.025,
      threshold: 0.1,
    });
  });
}

test("contact and social links expose hover and focus states", async ({ page }) => {
  await page.goto(componentRoute, { waitUntil: "load" });

  const contact = page.getByRole("button", { name: "Contact me" });
  const contactNormalBackground = await contact.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await contact.hover();
  const contactHoverBackground = await contact.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(contactHoverBackground).not.toBe(contactNormalBackground);

  await contact.focus();
  await expect(contact).toBeFocused();
  await expect(contact).toHaveCSS("outline-style", "solid");

  const github = page.getByRole("link", { name: "GitHub" });
  const githubNormalBackground = await github.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await github.hover();
  const githubHoverBackground = await github.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(githubHoverBackground).not.toBe(githubNormalBackground);
  await github.focus();
  await expect(github).toHaveCSS("outline-style", "solid");
});

test("wraps long profile content without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(componentRoute, { waitUntil: "load" });
  await page.waitForLoadState("networkidle");

  const values = {
    name: "Name-" + "x".repeat(1_000),
    role: "Role-" + "x".repeat(1_000),
    bio: "Bio-" + "x".repeat(5_000),
  };

  await page.locator("article").evaluate((article, values) => {
    const heading = article.querySelector("h2");
    const paragraphs = article.querySelectorAll("p");

    if (!heading || paragraphs.length < 2) {
      throw new Error("Profile card text nodes were not found");
    }

    heading.textContent = values.name;
    paragraphs[0].textContent = values.role;
    paragraphs[1].textContent = values.bio;
  }, values);

  const metrics = await page.locator("article").evaluate((element) => {
    const textElements = [
      element,
      ...Array.from(element.querySelectorAll("h2, p")),
    ];

    return {
      width: element.clientWidth,
      scrollWidth: element.scrollWidth,
      right: element.getBoundingClientRect().right,
      viewportWidth: window.innerWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
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
  expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.overflowingTextElements).toEqual([]);
});
