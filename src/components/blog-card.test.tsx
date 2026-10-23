import { createElement, type ImgHTMLAttributes } from "react";
import { render, screen, within } from "@testing-library/react";
import axe from "axe-core";
import { expect, it, vi } from "vitest";
import { BlogCard } from "./blog-card";

type MockImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  preload?: boolean;
};

vi.mock("next/image", () => ({
  default: ({ preload, ...props }: MockImageProps) =>
    createElement("img", {
      alt: "",
      "data-preload": preload ? "true" : "false",
      ...props,
    }),
}));

it("renders custom content, image alt text, and link destinations", () => {
  const category = "Architecture";
  const title = "A custom blog card title";
  const description = "A custom blog card description.";
  const imageAlt = "A modern home exterior";
  const readMoreHref = "/blog/custom-story";
  const className = "w-full";
  const sizes = "(min-width: 768px) 50vw, 100vw";

  render(
    <BlogCard
      category={category}
      title={title}
      description={description}
      imageAlt={imageAlt}
      readMoreHref={readMoreHref}
      className={className}
      sizes={sizes}
      preload
    />,
  );

  const card = screen.getByRole("article");
  const image = within(card).getByRole("img", { name: imageAlt });

  expect(within(card).getByText(category)).toBeInTheDocument();
  expect(card).toHaveClass(className);
  expect(within(card).getByRole("heading", { name: title })).toBeInTheDocument();
  expect(within(card).getByText(description)).toBeInTheDocument();
  expect(within(card).getByRole("link", { name: "Read more" })).toHaveAttribute(
    "href",
    readMoreHref,
  );
  expect(image).toHaveAttribute("alt", imageAlt);
  expect(image).toHaveAttribute("sizes", sizes);
  expect(image).toHaveAttribute("data-preload", "true");
  expect(image).not.toHaveAttribute("priority");
});

it("has no detectable accessibility violations", async () => {
  const { container } = render(<BlogCard />);
  const results = await axe.run(container);

  expect(results.violations).toEqual([]);
});
