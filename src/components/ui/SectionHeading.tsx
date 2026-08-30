import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  underline?: "red" | "red-bright" | "gold" | "none";
  tone?: "ink" | "red" | "gold" | "white";
  as?: "h1" | "h2" | "h3";
  script?: "serif" | "devanagari";
  className?: string;
  align?: "center" | "left";
};

const titleTone: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  ink: "text-ink",
  red: "text-red",
  gold: "text-gold-soft",
  white: "text-white",
};

const underlineTone = {
  red: "bg-red",
  "red-bright": "bg-red-bright",
  gold: "bg-gold",
  none: "",
};

export function SectionHeading({
  title,
  subtitle,
  underline = "none",
  tone = "ink",
  as = "h2",
  script = "serif",
  className,
  align = "center",
}: SectionHeadingProps) {
  const Tag = as;
  const font = script === "devanagari" ? "font-devanagari" : "font-serif";
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      className={["mb-12 flex flex-col gap-2", alignCls, className]
        .filter(Boolean)
        .join(" ")}
    >
      <Tag
        className={[
          font,
          "text-[32px] font-semibold leading-10",
          titleTone[tone],
        ].join(" ")}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="text-[14px] font-semibold tracking-[1.4px] uppercase text-white/90">
          {subtitle}
        </p>
      ) : null}
      {underline !== "none" ? (
        <div
          className={`mt-1 h-1 w-12 rounded-full ${underlineTone[underline]}`}
        />
      ) : null}
    </div>
  );
}
