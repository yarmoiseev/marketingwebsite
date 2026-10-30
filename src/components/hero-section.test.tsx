import { createElement, type ImgHTMLAttributes } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import axe from "axe-core";
import { expect, it, vi } from "vitest";
import { HeroSection } from "./hero-section";

vi.mock("next/image", () => ({
  default: ({
    preload: _preload,
    priority: _priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    preload?: boolean;
    priority?: boolean;
  }) => {
    void _preload;
    void _priority;
    return createElement("img", props);
  },
}));

it("uses semantic landmark, heading, button, and image markup", () => {
  render(<HeroSection />);

  const section = screen.getByRole("region");
  const heading = within(section).getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Well crafted abstract images");
  expect(section).toHaveAttribute("aria-labelledby", heading.id);

  expect(
    within(section).getByRole("button", { name: "Learn more" }),
  ).toBeInTheDocument();
  expect(
    within(section).getByRole("button", { name: "See pricing" }),
  ).toBeInTheDocument();

  const image = within(section).getByRole("img", {
    name: "Abstract artwork with colorful 3D shapes and gradients",
  });
  expect(image).toBeInTheDocument();
});

it("renders custom image props, class name, and button states", () => {
  const props = {
    className: "custom-hero-class",
    imageSrc: "/custom-image.png",
    imageAlt: "Custom image alt",
    imageWidth: 1200,
    imageHeight: 800,
    learnMoreDisabled: true,
    pricingDisabled: true,
    learnMoreHref: "/learn",
    pricingHref: "/pricing",
  };

  render(<HeroSection {...props} />);

  const section = screen.getByRole("region");
  expect(section).toHaveClass("custom-hero-class");

  const image = within(section).getByRole("img", { name: "Custom image alt" });
  expect(image).toHaveAttribute("src", "/custom-image.png");
  expect(image).toHaveAttribute("width", "1200");
  expect(image).toHaveAttribute("height", "800");

  const links = within(section).queryAllByRole("link");
  expect(links).toHaveLength(0);
});

it("supports custom content props and click callbacks", () => {
  const onLearnMore = vi.fn();
  const onPricing = vi.fn();

  render(
    <HeroSection
      title="Custom Title"
      description="Custom Description Text"
      learnMoreText="Explore"
      pricingText="Get Started"
      onLearnMoreClick={onLearnMore}
      onPricingClick={onPricing}
    />,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Custom Title",
  );
  expect(screen.getByText("Custom Description Text")).toBeInTheDocument();

  const exploreBtn = screen.getByRole("button", { name: "Explore" });
  const pricingBtn = screen.getByRole("button", { name: "Get Started" });

  fireEvent.click(exploreBtn);
  expect(onLearnMore).toHaveBeenCalledTimes(1);

  fireEvent.click(pricingBtn);
  expect(onPricing).toHaveBeenCalledTimes(1);
});

it("renders active link buttons when href is provided without disabled", () => {
  render(
    <HeroSection
      learnMoreHref="/learn-more"
      pricingHref="/pricing"
    />,
  );

  const learnMoreLink = screen.getByRole("link", { name: "Learn more" });
  const pricingLink = screen.getByRole("link", { name: "See pricing" });

  expect(learnMoreLink).toHaveAttribute("href", "/learn-more");
  expect(pricingLink).toHaveAttribute("href", "/pricing");
});

it("has no detectable accessibility violations", async () => {
  const { container } = render(<HeroSection />);
  const results = await axe.run(container);

  expect(results.violations).toEqual([]);
});
