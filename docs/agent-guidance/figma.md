# Figma implementation guidance

## Verify effective design tokens

Do not assume a Tailwind class has the same value as the Figma token with the same name. Inspect the app's generated theme and global CSS before using a semantic utility class, then verify the browser's computed style for the rendered element.

In this project, `src/app/globals.css` defines:

```css
--radius: 0.625rem;
--radius-lg: var(--radius);
```

Therefore, `rounded-lg` renders as 10px, not the 8px `rounded-lg` value used by the Figma design system. For a Figma-specified 8px radius, use an explicit `rounded-[8px]` utility (or an equivalent explicit CSS value) unless the shared theme token has first been corrected intentionally. Do not change the global radius token for a single component because that can change unrelated UI.

## Profile card case study

The Figma `Card` node (`4022:965`) specifies an 8px radius. The profile card previously used `rounded-lg`, so it rendered with a 10px radius even though the class name appeared to match the Figma token. The fix is the explicit `rounded-[8px]` on the `<article>` in `src/components/profile-card.tsx`.

When reviewing this component, confirm the effective `<article>` `border-radius` is 8px in addition to checking the class name and visual screenshot.
