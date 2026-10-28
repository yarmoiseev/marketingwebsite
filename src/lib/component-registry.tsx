import type { ReactNode } from "react";
import { BlogCard } from "@/components/blog-card";
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
} satisfies Record<string, ComponentRegistryEntry>;

export type ComponentSlug = keyof typeof componentRegistry;

export function isComponentSlug(value: string): value is ComponentSlug {
  return value in componentRegistry;
}
