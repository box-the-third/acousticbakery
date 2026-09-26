import Image from "next/image";
import { asset } from "@/lib/asset";

type IsotypeProps = {
  tone?: "slate" | "white" | "gold";
  className?: string;
  priority?: boolean;
};

/** The brand isotype, rendered from the official artwork (never redrawn or mirrored). */
export function Isotype({ tone = "slate", className, priority }: IsotypeProps) {
  return (
    <Image
      src={asset(`/brand/isotype-${tone}.webp`)}
      alt=""
      aria-hidden
      width={600}
      height={252}
      priority={priority}
      className={className}
    />
  );
}
