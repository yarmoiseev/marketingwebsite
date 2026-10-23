# Style guide

This style guide outlines the design standards and specifications for the challenges, which are built using the same design system. It serves as a reference for maintaining visual consistency across various aspects of design, including typography, color schemes, layout, and other design elements.

## Device breakpoints

The designs have been created with the following device widths in mind:

| Device breakpoint | Width | Container max width | Side padding | Columns | Column gap |
| --- | --- | --- | --- | --- | --- |
| Desktop | 1440px | 1280px | 32px | 12 | 32px |
| Tablet | 768px | 100% | 32px | 6 | 32px |
| Mobile | 375px | 100% | 16px | 4 | 16px |

A container is the maximum horizontal space allowed to display the contents for the breakpoint and should be horizontally centered on the page. For tablet and mobile, the container fills the spans of the entire screen.

## Spacing

Most spacing values (padding, margin, gap) are multiples of 4px.

## Typography

Font family: Noto Sans

Note: The Noto Sans font has been loaded for you in the starter code.

### Font weights

All the available font weights from 100 - 900 have been loaded for you but you primarily only need font weights from 400 to 600.

| Weight | Name | Tailwind class | Commonly used for |
| --- | --- | --- | --- |
| 400 | Normal | `font-normal` | Body |
| 500 | Medium | `font-medium` | Buttons, labels, links, and other interactive elements |
| 600 | Semibold | `font-semibold` | Headings |

Feel free to load fewer font weights if your challenge does not use them.

### Font sizes / line heights

The typography scale has been taken from Tailwind CSS' default font size scale. If you are using Tailwind CSS for styling, setting the font size and line height will be a breeze by using the text-* classes.

| Name | Size / Height | Tailwind class | Commonly used for |
| --- | --- | --- | --- |
| xs | 12px / 16px | `text-xs` | Badge labels |
| sm | 14px / 20px | `text-sm` | Badge labels, Form labels, Form placeholders, Form hint text |
| base | 16px / 24px | `text-base` | Body, Section labels, Button labels |
| lg | 18px / 28px | `text-lg` | Button labels |
| xl | 20px / 28px | `text-xl` | Section subtitles |
| 2xl | 24px / 32px | `text-2xl` | Card titles |
| 3xl | 30px / 36px | `text-3xl` | Section titles (mobile) |
| 4xl | 36px / 40px | `text-4xl` | Main title (mobile) |
| 5xl | 48px / 48px | `text-5xl` | Main title (tablet), Section titles (desktop and tablet) |
| 6xl | 60px / 60px | `text-6xl` | Main title (desktop) |

### Icons

Icons are from the Remix Icon library. However, Feel free to replace with your own icons! If you are using React, check out the React Icons library because it provides convenient access to many free and open source icon sets, including Remix Icon.

## Color palette

Every challenge's Figma file has a "Style guide" section that shows the colors used within the challenge.

The color palette is taken entirely from Tailwind CSS' default color palette. If you are using Tailwind, it will be very convenient to use these colors in your code. The following Tailwind CSS colors are frequently used: Neutral, Indigo, Green, Red.

### Text colors

| Name | Hex | Tailwind class |
| --- | --- | --- |
| primary | #171717 | `text-neutral-900` |
| primary-hover | #0a0a0a | `text-neutral-950` |
| primary-invert | #fff | `text-white` |
| secondary | #525252 | `text-neutral-600` |
| tertiary | #737373 | `text-neutral-500` |
| brand | #4338ca | `text-indigo-700` |
| disabled | #a3a3a3 | `text-neutral-400` |
| error | #dc2626 | `text-red-600` |
| error-emphasize | #991b1b | `text-red-800` |
| success | #15803d | `text-green-700` |
| warning | #a16207 | `text-amber-700` |

### Background colors

| Name | Hex | Tailwind class |
| --- | --- | --- |
| primary | #fff | `bg-white` |
| primary-inverted | #0a0a0a | `bg-neutral-950` |
| primary-hover | #fafafa | `bg-neutral-50` |
| secondary | #e5e7eb | `bg-gray-200` |
| secondary-hover | #d1d5db | `bg-gray-300` |
| tertiary | #fafafa | `bg-neutral-50` |
| disabled | #f5f5f5 | `bg-neutral-100` |
| disabled-emphasize | #f3f4f6 | `bg-gray-100` |
| brand-primary | #4338ca | `bg-indigo-700` |
| brand-primary-emphasize | #3730a3 | `bg-indigo-800` |
| error | #dc2626 | `bg-red-600` |
| error-emphasize | #b91c1c | `bg-red-700` |
| error-subtle | #fef2f2 | `bg-red-50` |
| success-subtle | #f0fdf4 | `bg-green-50` |
| brand-subtle | #eef2ff | `bg-indigo-50` |
| neutral-subtle | #f9fafb | `bg-gray-50` |
| warning-subtle | #fffbeb | `bg-amber-50` |

### Line colors (border/rings)

| Name | Hex | Tailwind class |
| --- | --- | --- |
| primary | #e5e5e5 | `border-neutral-200` |
| secondary | #9ca3af | `border-gray-400` |
| success | #bbf7d0 | `border-green-200` |
| brand-solid | #4f46e5 | `border-indigo-600` |
| brand-subtle | #c7d2fe | `border-indigo-200` |
| error-subtle | #fecaca | `border-red-200` |
| warning-subtle | #fde68a | `border-amber-200` |

Note: Some designs might require usage of ring- or outline- Tailwind classes instead.

### Icon colors

| Name | Hex | Tailwind class |
| --- | --- | --- |
| emphasize | #404040 | `neutral-700` |
| primary | #a3a3a3 | `neutral-400` |
| primary-hover | #737373 | `neutral-500` |
| brand | #6366f1 | `indigo-500` |
| brand-background | #eef2ff | `indigo-50` |
| success | #15803d | `green-700` |
| error | #dc2626 | `red-600` |
| warning | #facc15 | `yellow-400` |

### Input field, Form, Textarea colors

| Name | Hex | Tailwind class |
| --- | --- | --- |
| text-title | #404040 | `text-neutral-700` |
| text-placeholder | #737373 | `text-neutral-500` |
| text-hint | #737373 | `text-neutral-500` |
| text-filled | #171717 | `text-neutral-900` |
| text-disabled | #a3a3a3 | `text-neutral-400` |
| text-error | #dc2626 | `text-red-600` |
| background | #fafafa | `bg-neutral-50` |
| border | #e5e5e5 | `border-neutral-200` |
