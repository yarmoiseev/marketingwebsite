import { createElement, type ImgHTMLAttributes } from "react";
import { render, screen, within } from "@testing-library/react";
import axe from "axe-core";
import { expect, it, vi } from "vitest";
import { ProfileCard } from "./profile-card";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", props),
}));

it("uses semantic profile, contact, and social link markup", () => {
  render(<ProfileCard />);

  const card = screen.getByRole("article");
  expect(within(card).getByRole("heading", { name: "Sarah Dole" })).toBeInTheDocument();
  expect(within(card).getByRole("button", { name: "Contact me" })).toBeInTheDocument();

  for (const label of ["GitHub", "LinkedIn", "Instagram", "X"]) {
    expect(within(card).getByRole("link", { name: label })).toBeInTheDocument();
  }
});

it("renders all custom profile content, image props, and social destinations", () => {
  const props = {
    name: "Ada Lovelace",
    role: "Mathematician",
    bio: "The first computer programmer.",
    imageSrc: "/ada-lovelace.jpeg",
    imageAlt: "Portrait of Ada Lovelace",
    className: "custom-profile-card",
  };

  render(<ProfileCard {...props} />);

  const card = screen.getByRole("article", { name: props.name });
  expect(card).toHaveClass(props.className);
  expect(within(card).getByRole("heading", { name: props.name })).toBeInTheDocument();
  expect(within(card).getByText(props.role)).toBeInTheDocument();
  expect(within(card).getByText(props.bio)).toBeInTheDocument();

  const portrait = within(card).getByRole("img", { name: props.imageAlt });
  expect(portrait).toHaveAttribute("src", props.imageSrc);
  expect(portrait).toHaveAttribute("width", "64");
  expect(portrait).toHaveAttribute("height", "64");

  const socialLinks = {
    GitHub: "https://github.com/",
    LinkedIn: "https://www.linkedin.com/",
    Instagram: "https://www.instagram.com/",
    X: "https://x.com/",
  };

  expect(within(card).getByRole("navigation")).toHaveAccessibleName(
    `${props.name}'s social profiles`,
  );

  for (const [label, href] of Object.entries(socialLinks)) {
    expect(within(card).getByRole("link", { name: label })).toHaveAttribute(
      "href",
      href,
    );
  }

  const socialIcons = card.querySelectorAll("nav img");
  expect(socialIcons).toHaveLength(Object.keys(socialLinks).length);
  for (const icon of socialIcons) {
    expect(icon).toHaveAttribute("alt", "");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("width", "20");
    expect(icon).toHaveAttribute("height", "20");
  }
});

it("keeps accessible names unique when multiple cards are rendered", () => {
  render(
    <>
      <ProfileCard name="Sarah Dole" />
      <ProfileCard name="Ada Lovelace" />
    </>,
  );

  const cards = screen.getAllByRole("article");
  const headingIds = cards.map((card) => card.getAttribute("aria-labelledby"));

  expect(new Set(headingIds).size).toBe(cards.length);

  for (const card of cards) {
    const heading = within(card).getByRole("heading", { level: 2 });
    expect(heading.id).toBe(card.getAttribute("aria-labelledby"));
    expect(card).toHaveAccessibleName(heading.textContent ?? "");
  }
});

it("uses the custom name in the social navigation label", () => {
  render(<ProfileCard name="Grace Hopper" />);

  expect(screen.getByRole("navigation")).toHaveAccessibleName(
    "Grace Hopper's social profiles",
  );
});

it("has no detectable accessibility violations", async () => {
  const { container } = render(<ProfileCard />);
  const results = await axe.run(container);

  expect(results.violations).toEqual([]);
});

it("wraps long profile content without changing the card width", () => {
  render(
    <ProfileCard
      name={"Name-" + "x".repeat(1_000)}
      role={"Role-" + "x".repeat(1_000)}
      bio={"Bio-" + "x".repeat(5_000)}
    />,
  );

  const card = screen.getByRole("article");
  expect(card).toHaveTextContent("Name-");
  expect(card).toHaveTextContent("Role-");
  expect(card).toHaveTextContent("Bio-");
});
