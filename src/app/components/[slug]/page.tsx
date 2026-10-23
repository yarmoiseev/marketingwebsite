import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { componentRegistry, isComponentSlug } from "@/lib/component-registry";

type ComponentPreviewPageProps = {
  params: Promise<{ slug: string }>;
};

// The preview intentionally resolves the selected component from URL data
// before rendering, so it is allowed to block instead of producing an instant
// navigation shell with no component in it.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(componentRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ComponentPreviewPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isComponentSlug(slug)) {
    return {};
  }

  return {
    title: componentRegistry[slug].title,
    description: componentRegistry[slug].description,
  };
}

export default async function ComponentPreviewPage({
  params,
}: ComponentPreviewPageProps) {
  const { slug } = await params;

  if (!isComponentSlug(slug)) {
    notFound();
  }

  const component = componentRegistry[slug];

  return (
    <main
      className="testimonial-page min-h-screen"
      aria-label={`${component.title} preview`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 py-50 md:px-8">
        {component.render()}
      </div>
    </main>
  );
}
