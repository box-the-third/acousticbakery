"use client";

import { m, type Variants } from "framer-motion";
import type { ElementType } from "react";

type StaggerTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.07, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Word-by-word entrance. Splitting by word (never by letter) keeps Arabic
 * glyphs correctly joined and reads naturally in both directions.
 */
export function StaggerText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  immediate = false,
}: StaggerTextProps) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden
        className="inline"
        variants={container}
        initial="hidden"
        custom={delay}
        {...trigger}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <m.span className="inline-block will-change-transform" variants={word}>
              {w}
            </m.span>
            {i < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
