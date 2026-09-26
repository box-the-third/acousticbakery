import { StaggerText } from "@/components/motion/StaggerText";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "light",
  align = "start",

}: SectionHeadingProps) {
  const onDark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-start"}>
      <Reveal>
        <p
          className={`eyebrow flex items-center gap-3 ${centered ? "justify-center" : ""} ${
            onDark ? "text-gold" : "text-ink/70"
          }`}
        >
          <span aria-hidden className={`h-px w-8 ${onDark ? "bg-gold/70" : "bg-ink/40"}`} />
          {eyebrow}
        </p>
      </Reveal>
      <StaggerText
        as="h2"
        text={title}
        className={`font-display mt-5 text-4xl font-light leading-[1.1] sm:text-5xl lg:text-[3.4rem] ${
          onDark ? "text-paper" : "text-ink"
        }`}
      />
      {body ? (
        <Reveal delay={0.15}>
          <p
            className={`mt-6 text-base leading-relaxed sm:text-lg ${
              onDark ? "text-stone/80" : "text-ink/75"
            }`}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
