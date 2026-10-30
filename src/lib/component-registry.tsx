import type { ReactNode } from "react";
import { BlogCard } from "@/components/blog-card";
import { HeroSection } from "@/components/hero-section";
import { ProfileCard } from "@/components/profile-card";
import { TestimonialCard } from "@/components/testimonial-card";

export type ComponentRegistryEntry = {
  title: string;
  description: string;
  render: () => ReactNode;
  pageClassName?: string;
  containerClassName?: string;
};

/**
 * The single source of truth for component previews.
 *
 * Add a component here to make it available at /components/<slug> and in the
 * component gallery at /components.
 */
export const componentRegistry = {
  "testimonial-card": {
    title: "Testimonial card",
    description: "A responsive card for displaying a customer testimonial.",
    render: () => <TestimonialCard />,
  },
  "profile-card": {
    title: "Profile card",
    description: "A profile card with contact and social links.",
    render: () => <ProfileCard />,
  },
  "blog-card": {
    title: "Blog card",
    description: "A compact editorial card for featuring a blog post.",
    render: () => <BlogCard />,
    pageClassName: "bg-neutral-50",
    containerClassName: "py-[120px]",
  },
  "hero-section": {
    title: "Hero section",
    description: "A responsive hero section with abstract artwork and calls to action.",
    render: () => (
      <div className="flex w-full flex-1 flex-col items-start justify-center rounded-[4px] bg-[linear-gradient(171.35deg,rgb(249_250_251)_0.94%,rgb(237_240_243)_316.54%)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] md:rounded-[6px] md:bg-[linear-gradient(174.85deg,rgb(249_250_251)_0.94%,rgb(237_240_243)_316.54%)] md:py-2 md:drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.06)] xl:bg-[linear-gradient(178deg,rgb(249_250_251)_0.94%,rgb(237_240_243)_316.54%)] xl:drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.05)]">
        <HeroSection />
      </div>
    ),
    containerClassName: "max-w-none justify-center !p-4 md:!p-4",
  },
} satisfies Record<string, ComponentRegistryEntry>;

export type ComponentSlug = keyof typeof componentRegistry;

export function isComponentSlug(value: string): value is ComponentSlug {
  return value in componentRegistry;
}
