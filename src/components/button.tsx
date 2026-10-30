import {
  forwardRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.06)] transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_#444ce7,0_0_0_4px_rgba(68,76,231,0.12)] rounded-[4px]",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-[#4338ca] text-white hover:bg-[#3730a3] focus-visible:bg-[#3730a3] active:bg-[#312e81] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none",
        secondary:
          "border-[0.5px] border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:text-neutral-950 focus-visible:bg-neutral-50 focus-visible:text-neutral-950 active:bg-neutral-100 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none",
      },
      size: {
        md: "h-11 px-4 py-2.5 text-base leading-6 gap-1.5",
        lg: "h-12 px-5 py-3 text-base leading-6 gap-1.5 md:h-[60px] md:gap-2.5 md:px-6 md:py-4 md:text-[18px] md:leading-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  children?: ReactNode;
  disabled?: boolean;
};

export type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentProps<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

export type ButtonAsAnchor = ButtonBaseProps &
  Omit<ComponentProps<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { children, className, variant, size, disabled, ...props },
  ref,
) {
  const content = <span className="whitespace-nowrap px-0.5">{children}</span>;

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={cn(
          buttonVariants({ variant, size }),
          disabled &&
            "pointer-events-none cursor-not-allowed border-transparent bg-neutral-100 text-neutral-400 shadow-none",
          className,
        )}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
