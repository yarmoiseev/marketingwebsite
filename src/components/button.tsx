import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[4px] px-5 py-3 text-base font-medium leading-6 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.06)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-200 md:h-[60px] md:gap-2.5 md:px-6 md:py-4 md:text-[18px] md:leading-7",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none",
        secondary:
          "border-[0.5px] border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      <span className="whitespace-nowrap px-0.5">{children}</span>
    </button>
  );
}
