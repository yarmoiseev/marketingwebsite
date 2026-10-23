# Marketing Website

Next.js App Router starter using TypeScript, Tailwind CSS, shadcn/ui, Vitest, and pnpm.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Repository structure

The App Router is organized by route concern:

```text
src/
├── app/
│   ├── (marketing)/page.tsx       # The public home page at /
│   └── components/
│       ├── page.tsx               # Component preview index at /components
│       └── [slug]/page.tsx        # Individual preview routes
├── components/                    # Reusable UI components
└── lib/component-registry.tsx     # Preview metadata and route registry
```

To add a component preview, add the component to `src/components/` and register
it in `src/lib/component-registry.tsx`. It will then be available at
`/components/<slug>` and listed at `/components`.

## Scripts

```bash
pnpm test        # Run the Vitest suite once
pnpm test:all    # Run all unit and visual tests
pnpm test:watch  # Run Vitest in watch mode
pnpm test:visual # Compare desktop, tablet, and mobile screenshots with Figma
pnpm lint        # Run ESLint
pnpm build       # Create a production build
```

The pre-commit hook runs `pnpm test:all` automatically. It is configured by
`pnpm install` and can be bypassed for an exceptional commit with
`git commit --no-verify`.

Add shadcn/ui components with:

```bash
pnpm dlx shadcn@latest add <component>
```

See the [Next.js documentation](https://nextjs.org/docs) for framework guidance and the [shadcn/ui documentation](https://ui.shadcn.com) for available components.
