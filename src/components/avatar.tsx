import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export type AvatarProps = Omit<ImageProps, "className" | "fill" | "height" | "width"> & {
  size?: number;
  className?: string;
};

export function Avatar({ size = 48, className, alt, ...props }: AvatarProps) {
  return (
    <Image
      {...props}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
}
