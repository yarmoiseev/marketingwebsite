import Image from "next/image";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

export type ProfileCardProps = {
  name?: string;
  role?: string;
  bio?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

type SocialLink = {
  label: string;
  href: string;
  iconSrc: string;
};

const defaultBio =
  "I turn coffee into bugs which are fixed by someone else. Certified Stack Overflow and ChatGPT developer.";

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/",
    iconSrc: "/profile-card-icons/github.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    iconSrc: "/profile-card-icons/linkedin.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    iconSrc: "/profile-card-icons/instagram.svg",
  },
  {
    label: "X",
    href: "https://x.com/",
    iconSrc: "/profile-card-icons/twitter.svg",
  },
];

export function ProfileCard({
  name = "Sarah Dole",
  role = "Front End Engineer @ Microsoft",
  bio = defaultBio,
  imageSrc = "/profile-thumbnail.jpeg",
  imageAlt = "Portrait of Sarah Dole",
  className,
}: ProfileCardProps) {
  const headingId = useId();

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "flex w-[340px] max-w-full flex-col items-start gap-10 overflow-hidden rounded-[8px] bg-white px-4 py-6 [overflow-wrap:anywhere] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <div className="flex w-full shrink-0 flex-col items-center gap-6">
        <Avatar
          src={imageSrc}
          alt={imageAlt}
          size={64}
        />

        <div className="flex w-full flex-col items-center justify-center gap-1 text-center [word-break:break-word]">
          <h2
            id={headingId}
            className="w-full break-words text-xl font-medium leading-7 text-neutral-900"
          >
            {name}
          </h2>
          <p className="w-full break-words text-sm font-normal leading-5 text-neutral-600">
            {role}
          </p>
        </div>

        <p className="w-full break-words text-center text-base font-normal leading-6 text-neutral-600 [word-break:break-word]">
          {bio}
        </p>
      </div>

      <div className="flex w-full shrink-0 flex-col items-start gap-6">
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-indigo-700 px-4 py-2.5 text-base font-medium leading-6 text-white shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.06)] transition-colors hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-200 active:bg-indigo-900"
        >
          Contact me
        </button>

        <nav
          aria-label={`${name}'s social profiles`}
          className="flex w-full justify-center gap-4"
        >
          {socialLinks.map((socialLink) => (
            <a
              key={socialLink.label}
              href={socialLink.href}
              aria-label={socialLink.label}
              className="flex size-9 items-center justify-center rounded-[4px] p-2 text-indigo-700 transition-colors hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-200 active:bg-indigo-100"
            >
              <Image
                src={socialLink.iconSrc}
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="block size-5 shrink-0"
              />
            </a>
          ))}
        </nav>
      </div>
    </article>
  );
}
