import { createElement, type ImgHTMLAttributes } from "react";
import { render, screen, within } from "@testing-library/react";
import axe from "axe-core";
import { expect, it, vi } from "vitest";
import { TestimonialCard } from "./testimonial-card";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", { alt: "", ...props }),
}));

it("uses accessible semantic HTML and image alt text", () => {
  const imageAlt = "Portrait of Ada Lovelace";

  render(
    <TestimonialCard
      name="Ada Lovelace"
      username="@ada"
      testimonial="A thoughtful testimonial."
      imageAlt={imageAlt}
    />,
  );

  const card = screen.getByRole("article");
  const header = card.querySelector(":scope > header");
  const image = within(card).getByRole("img", { name: imageAlt });

  expect(card).not.toHaveAttribute("role");
  expect(header).toBeInTheDocument();
  expect(header).not.toHaveAttribute("role");
  expect(image).toHaveAttribute("alt", imageAlt);
  expect(within(card).getByText("A thoughtful testimonial.")).toBeInTheDocument();
});

it("supports an empty alt attribute for a decorative image", () => {
  const { container } = render(<TestimonialCard imageAlt="" />);

  expect(container.querySelector("img")).toHaveAttribute("alt", "");
});

it("has no detectable accessibility violations", async () => {
  const { container } = render(<TestimonialCard />);
  const results = await axe.run(container);

  expect(results.violations).toEqual([]);
});

it("renders very long name, username, and testimonial values", () => {
  const name = `Name-${"x".repeat(1_000)}`;
  const username = `@${"user".repeat(1_000)}`;
  const testimonial = `Testimonial-${"x".repeat(5_000)}`;

  render(
    <TestimonialCard
      name={name}
      username={username}
      testimonial={testimonial}
    />,
  );

  const card = screen.getByRole("article");
  const paragraphs = card.querySelectorAll("p");

  expect(card).toHaveTextContent(name);
  expect(card).toHaveTextContent(username);
  expect(card).toHaveTextContent(testimonial);
  expect(paragraphs).toHaveLength(3);

  for (const paragraph of paragraphs) {
    expect(paragraph).toHaveClass("break-words");
  }
});
