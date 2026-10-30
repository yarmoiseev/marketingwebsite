import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button component", () => {
  it("renders a native button with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button).toHaveClass("bg-[#4338ca]", "text-white");
  });

  it("renders secondary variant correctly", () => {
    render(<Button variant="secondary">Learn more</Button>);

    const button = screen.getByRole("button", { name: "Learn more" });
    expect(button).toHaveClass("bg-white", "text-neutral-900");
  });

  it("renders size variants correctly", () => {
    const { rerender } = render(<Button size="md">Medium</Button>);
    expect(screen.getByRole("button", { name: "Medium" })).toHaveClass("h-11");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass("h-12");
  });

  it("renders as an anchor tag when href is provided", () => {
    render(<Button href="/pricing">View pricing</Button>);

    const link = screen.getByRole("link", { name: "View pricing" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pricing");
    expect(link.tagName.toLowerCase()).toBe("a");
  });

  it("handles button disabled state properly", () => {
    render(<Button disabled>Disabled Action</Button>);

    const button = screen.getByRole("button", { name: "Disabled Action" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:cursor-not-allowed", "disabled:bg-neutral-100");
  });

  it("handles anchor disabled state with aria and pointer-events", () => {
    render(
      <Button href="/test" disabled>
        Disabled Link
      </Button>,
    );

    const link = screen.getByText("Disabled Link").closest("a");
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    expect(link).toHaveClass("pointer-events-none", "bg-neutral-100", "text-neutral-400");
  });

  it("triggers onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Trigger</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Trigger" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("forwards ref to anchor element", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Button ref={ref} href="/test">
        Ref Link
      </Button>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button href="/explore">Link</Button>
      </div>,
    );

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
