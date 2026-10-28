import Image from "next/image";
import { useId } from "react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  learnMoreDisabled?: boolean;
  pricingDisabled?: boolean;
  preload?: boolean;
};

const heroDescription =
  "High quality abstract images for your projects, wallpaper and presentations.";

export function HeroSection({
  className,
  imageSrc = "/hero-abstract-1.png",
  imageAlt = "Abstract artwork with colorful 3D shapes and gradients",
  imageWidth = 1776,
  imageHeight = 1578,
  learnMoreDisabled = false,
  pricingDisabled = false,
  preload = true,
}: HeroSectionProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn("w-full overflow-hidden rounded-[8px]", className)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-12 overflow-hidden px-3 py-12 md:gap-8 md:px-4 md:py-16 xl:flex-row xl:gap-8 xl:px-24 xl:py-24">
        <div className="flex w-full shrink-0 flex-col items-start justify-center gap-8 xl:w-[488px] xl:gap-16">
          <div className="flex w-full flex-col items-start justify-center gap-4 [overflow-wrap:anywhere] md:gap-6">
            <h1
              id={headingId}
              className="w-full break-words text-[36px] font-semibold leading-[40px] text-neutral-900 md:text-[48px] md:leading-[48px] xl:text-[60px] xl:leading-[60px]"
            >
              <span className="xl:hidden">Well crafted abstract gradient</span>
              <span className="hidden xl:inline">
                Well crafted abstract images
              </span>
            </h1>
            <p className="w-full break-words text-[18px] font-normal leading-7 text-neutral-600 md:text-[20px]">
              {heroDescription}
            </p>
          </div>

          <div className="flex w-full items-start gap-4 md:w-[458px] md:gap-8 xl:w-[383px]">
            <Button
              type="button"
              variant="secondary"
              disabled={learnMoreDisabled}
            >
              Learn more
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={pricingDisabled}
            >
              See pricing
            </Button>
          </div>
        </div>

        <div className="relative w-full shrink-0 overflow-hidden rounded-[8px] md:rounded-[16px] xl:w-auto xl:flex-[1_0_0] xl:min-w-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            preload={preload}
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
