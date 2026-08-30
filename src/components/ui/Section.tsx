import type { ReactNode } from "react";

type Tone = "cream" | "ink" | "blush" | "transparent";
type Width = 1152 | 1280 | "full";

const tones: Record<Tone, string> = {
  cream: "bg-cream",
  ink: "bg-ink text-white",
  blush: "bg-blush",
  transparent: "bg-transparent",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  width?: Width;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "cream",
  width = 1152,
  className,
  innerClassName,
  children,
}: SectionProps) {
  const max =
    width === "full"
      ? "w-full"
      : width === 1280
        ? "mx-auto max-w-[1280px]"
        : "mx-auto max-w-[1152px]";

  return (
    <section
      id={id}
      className={[tones[tone], "px-6 py-16 md:px-16 md:py-20", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={[max, innerClassName].filter(Boolean).join(" ")}>
        {children}
      </div>
    </section>
  );
}
