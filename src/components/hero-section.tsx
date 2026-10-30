import Image from "next/image";
import { useId, type ReactNode } from "react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  learnMoreText?: string;
  pricingText?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  learnMoreDisabled?: boolean;
  pricingDisabled?: boolean;
  learnMoreHref?: string;
  pricingHref?: string;
  onLearnMoreClick?: () => void;
  onPricingClick?: () => void;
  preload?: boolean;
};

const heroDescription =
  "High quality abstract images for your projects, wallpaper and presentations.";

export function HeroSection({
  className,
  title = "Well crafted abstract images",
  description = heroDescription,
  learnMoreText = "Learn more",
  pricingText = "See pricing",
  imageSrc = "/hero-abstract-1.png",
  imageAlt = "Abstract artwork with colorful 3D shapes and gradients",
  imageWidth = 1776,
  imageHeight = 1578,
  learnMoreDisabled = false,
  pricingDisabled = false,
  learnMoreHref,
  pricingHref,
  onLearnMoreClick,
  onPricingClick,
  preload = true,
}: HeroSectionProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "w-full max-w-[1440px] mx-auto overflow-hidden rounded-[8px]",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-12 overflow-hidden px-3 py-12 md:gap-8 md:px-4 md:py-16 xl:flex-row xl:gap-8 xl:px-24 xl:py-24">
        <div className="flex w-full shrink-0 flex-col items-start justify-center gap-8 md:gap-16 xl:w-[488px] xl:gap-16">
          <div className="flex w-full flex-col items-start justify-center gap-4 [overflow-wrap:anywhere] md:max-w-[688px] md:gap-6 xl:max-w-none">
            <h1
              id={headingId}
              className="w-full [overflow-wrap:anywhere] text-[36px] font-semibold leading-[40px] text-neutral-900 md:text-[48px] md:leading-[48px] xl:text-[60px] xl:leading-[60px]"
            >
              {title}
            </h1>
            <p className="w-full break-words text-[18px] font-normal leading-7 text-neutral-600 md:text-[20px]">
              {description}
            </p>
          </div>

          <div className="flex w-full items-start gap-4 md:w-[458px] md:gap-8 xl:w-[383px]">
            <Button
              variant="secondary"
              disabled={learnMoreDisabled}
              href={learnMoreHref}
              onClick={onLearnMoreClick}
              className="flex-1"
            >
              {learnMoreText}
            </Button>
            <Button
              variant="primary"
              disabled={pricingDisabled}
              href={pricingHref}
              onClick={onPricingClick}
              className="flex-1"
            >
              {pricingText}
            </Button>
          </div>
        </div>

        <div className="relative h-[264px] w-full shrink-0 overflow-hidden rounded-[8px] md:h-[526px] md:rounded-[16px] xl:h-[526px] xl:w-auto xl:flex-[1_0_0] xl:min-w-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            preload={preload}
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
