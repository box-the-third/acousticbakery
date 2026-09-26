import { StaggerText } from "@/components/motion/StaggerText";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  as?: "h2" | "h3";
};

/** Eyebrow label plus a bold display title, revealed word by word. */
export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  className = "",
  titleClassName = "text-5xl sm:text-6xl lg:text-[5.4rem]",
  as = "h2",
}: SectionHeadingProps) {
  const onDark = tone === "dark";

  return (
    <div className={`text-start ${className}`}>
      <Reveal>
        <p className={`eyebrow ${onDark ? "text-paper" : "text-ink"}`}>{eyebrow}</p>
      </Reveal>
      <StaggerText
        as={as}
        text={title}
        className={`display-title mt-5 ${titleClassName} ${onDark ? "text-paper" : "text-ink"}`}
      />
    </div>
  );
}
