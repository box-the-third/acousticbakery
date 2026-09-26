"use client";

import { m, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
};

/** Fades and lifts content into place once, as it enters the viewport. */
export function Reveal({ delay = 0, distance = 18, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
