import Image from "next/image";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  name?: string;
  username?: string;
  testimonial?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

const defaultTestimonial =
  "I've been searching for high-quality abstract images for my design projects, and I'm thrilled to have found this platform. The variety and depth of creativity are astounding!";

export function TestimonialCard({
  name = "Sarah Dole",
  username = "@sarahdole",
  testimonial = defaultTestimonial,
  imageSrc = "/profile-thumbnail.jpeg",
  imageAlt = "Portrait of Sarah Dole",
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex w-[340px] max-w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <header className="flex w-full items-center gap-4">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={48}
            height={48}
            className="size-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-px [word-break:break-word]">
          <p className="break-words text-lg font-semibold leading-7 text-neutral-900">
            {name}
          </p>
          <p className="break-words text-sm leading-5 text-neutral-600">
            {username}
          </p>
        </div>
      </header>

      <p className="break-words text-base leading-6 text-neutral-600 [word-break:break-word]">
        {testimonial}
      </p>
    </article>
  );
}
