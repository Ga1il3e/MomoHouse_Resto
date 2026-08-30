import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "ink" | "outlineMuted";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-red-bright px-10 py-[13px] text-white shadow-lg hover:brightness-110",
  ghost:
    "rounded-full border border-white px-10 py-[13px] text-white hover:bg-white/10",
  ink: "rounded-none bg-red px-6 py-3 text-white shadow-soft hover:brightness-110",
  outlineMuted:
    "rounded-full border border-border px-4 py-1 text-[10px] tracking-[1px] text-muted",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "className" | "children" | "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: Variant, className?: string) {
  return [
    "inline-flex items-center justify-center text-[14px] font-semibold tracking-[0.7px] uppercase transition focus-ring",
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = classes(variant, props.className);

  if (props.href) {
    const linkProps = { ...(props as ButtonAsLink) };
    delete linkProps.variant;
    delete linkProps.className;
    const { href, children, ...rest } = linkProps;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = { ...(props as ButtonAsButton) };
  delete buttonProps.variant;
  delete buttonProps.className;
  delete buttonProps.href;
  const { children, type = "button", ...rest } = buttonProps;
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}
