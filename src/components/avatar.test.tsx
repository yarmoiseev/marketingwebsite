import { createElement, type ImgHTMLAttributes } from "react";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { expect, it, vi } from "vitest";
import { Avatar } from "./avatar";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", props),
}));

it("renders a circular image at the default size", () => {
  render(<Avatar src="/profile.jpeg" alt="Sarah Dole" />);

  const image = screen.getByRole("img", { name: "Sarah Dole" });

  expect(image).toHaveAttribute("src", "/profile.jpeg");
  expect(image).toHaveAttribute("width", "48");
  expect(image).toHaveAttribute("height", "48");
  expect(image).toHaveClass("rounded-full", "object-cover");
});

it("supports custom sizes, decorative images, and custom classes", () => {
  render(
    <Avatar
      src="/profile.jpeg"
      alt=""
      size={64}
      className="custom-avatar"
    />,
  );

  const image = screen.getByAltText("");

  expect(image).toHaveAttribute("width", "64");
  expect(image).toHaveAttribute("height", "64");
  expect(image).toHaveClass("custom-avatar");
});

it("has no detectable accessibility violations", async () => {
  const { container } = render(<Avatar src="/profile.jpeg" alt="Sarah Dole" />);
  const results = await axe.run(container);

  expect(results.violations).toEqual([]);
});
