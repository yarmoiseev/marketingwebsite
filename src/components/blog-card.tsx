import Image from "next/image";
import { cn } from "@/lib/utils";

export type BlogCardProps = {
  category?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  readMoreHref?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
};

// Editorial content limits are intentionally handled by authors or the CMS.
// The card keeps its title and description visible instead of truncating them.
const defaultTitle = "Top 5 Living Room Inspirations";
const defaultDescription =
  "Curated vibrants colors for your living, make it pop & calm in the same time.";

export function BlogCard({
  category = "Interior",
  title = defaultTitle,
  description = defaultDescription,
  imageSrc = "/blog-card-living-room.jpeg",
  imageAlt = "Bright living room with plants, pendant lights, and a coffee table",
  readMoreHref = "#",
  className,
  sizes = "340px",
  preload = false,
}: BlogCardProps) {
  return (
    <article
      className={cn(
        "flex h-full w-[340px] max-w-full flex-col overflow-hidden rounded-lg bg-white [overflow-wrap:anywhere] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <div className="relative h-[288px] w-full shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col">
        <div className="flex h-full min-w-0 flex-col items-start gap-3 px-4 py-6">
          <header className="flex w-full min-w-0 flex-col items-start gap-2">
            <span className="inline-block h-auto min-h-6 w-fit max-w-full min-w-0 break-words rounded-full border border-green-200 bg-green-50 px-2 py-px text-center text-sm font-normal leading-5 text-green-700 [overflow-wrap:anywhere]">
              {category}
            </span>
            <h2 className="w-full break-words text-lg font-semibold leading-7 text-neutral-900 [word-break:break-word]">
              {title}
            </h2>
          </header>

          <div className="mt-auto flex w-full min-w-0 flex-col gap-6">
            <p className="w-full break-words text-base font-medium leading-6 text-neutral-600 [word-break:break-word]">
              {description}
            </p>
            <a
              href={readMoreHref}
              className="inline-flex h-6 w-[114px] self-start items-center justify-center gap-1.5 rounded px-0 text-base font-medium leading-6 text-indigo-700 transition-colors hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
            >
              <span className="px-0.5">Read more</span>
              <span className="flex size-5 shrink-0 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/blog-card-arrow-right.svg"
                  alt=""
                  className="block shrink-0"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
