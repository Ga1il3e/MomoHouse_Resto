import type { ReactNode } from "react";

type InfoCardProps = {
  children: ReactNode;
  className?: string;
  tone?: "white" | "blush" | "glass";
};

const tones = {
  white: "bg-white shadow-soft",
  blush: "bg-blush",
  glass: "border border-white/50 bg-white/70 shadow-soft backdrop-blur-[5px]",
};

export function InfoCard({
  children,
  className,
  tone = "white",
}: InfoCardProps) {
  return (
    <article
      className={["relative rounded-xl p-6", tones[tone], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </article>
  );
}

type IconCircleProps = {
  children: ReactNode;
  tone?: "pink" | "hours" | "contact";
  className?: string;
};

const iconTones = {
  pink: "bg-pink-icon",
  hours: "bg-hours-icon",
  contact: "bg-contact-icon",
};

export function IconCircle({
  children,
  tone = "pink",
  className,
}: IconCircleProps) {
  return (
    <div
      className={[
        "mb-3 flex size-12 items-center justify-center rounded-full",
        iconTones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
