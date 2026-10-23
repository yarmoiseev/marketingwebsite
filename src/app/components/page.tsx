import type { Metadata } from "next";
import Link from "next/link";
import { componentRegistry } from "@/lib/component-registry";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse the rendered component previews in the marketing website.",
};

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-16 md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-10">
          <p className="mb-2 text-sm font-medium text-neutral-500">Marketing website</p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
            Component previews
          </h1>
          <p className="mt-3 max-w-xl text-base leading-6 text-neutral-600">
            Each component has a dedicated route so it can be reviewed and tested
            in isolation.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {Object.entries(componentRegistry).map(([slug, component]) => (
            <li key={slug}>
              <Link
                href={`/components/${slug}`}
                className="block rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <h2 className="text-lg font-semibold text-neutral-900">
                  {component.title}
                </h2>
                <p className="mt-2 text-sm leading-5 text-neutral-600">
                  {component.description}
                </p>
                <span className="mt-5 block text-sm font-medium text-indigo-700">
                  View preview →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
