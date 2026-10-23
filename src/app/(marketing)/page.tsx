import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-16 md:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-2xl flex-col items-center justify-center text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Marketing website
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
          Under construction
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
          The marketing website is under construction. For now, you can preview
          the separate components in our component gallery.
        </p>
        <Link
          href="/components"
          className="mt-8 rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Preview components
        </Link>
      </div>
    </main>
  );
}
