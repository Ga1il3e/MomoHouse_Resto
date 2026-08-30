"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/content";

type HeaderProps = {
  variant?: "home" | "inner";
};

const navLinkClass =
  "text-[14px] font-semibold tracking-[0.7px] uppercase text-white/80 transition hover:text-white";

function ActiveLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "border-b border-gold pb-[5px] text-[14px] font-semibold tracking-[0.7px] uppercase text-gold"
          : navLinkClass
      }
    >
      {children}
    </Link>
  );
}

export function Header({ variant = "inner" }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = variant === "home" || pathname === "/";

  const links = [
    { href: "/#adresses", label: "RESTAURANTS", match: false },
    {
      href: "/montmartre",
      label: "MONTMARTRE",
      match: pathname === "/montmartre",
    },
    {
      href: "/poissonniere",
      label: "POISSONNIÈRE",
      match: pathname === "/poissonniere",
    },
    {
      href: "/reservations",
      label: "RÉSERVATIONS",
      match: pathname === "/reservations",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-6 py-2 md:px-16">
        {isHome ? (
          <>
            <Link
              href="/#adresses"
              className={`${navLinkClass} hidden lg:block`}
            >
              RESTAURANTS
            </Link>
            <Link
              href="/"
              className="absolute left-1/2 top-[-2px] hidden -translate-x-1/2 flex-col items-center lg:flex"
            >
              <span className="font-serif text-[24px] font-semibold uppercase tracking-[-1.2px] text-white">
                {site.name}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-gold-soft opacity-80">
                {site.tagline}
              </span>
            </Link>
            <nav className="hidden items-center gap-6 lg:flex">
              <ActiveLink
                href="/montmartre"
                active={pathname === "/montmartre"}
              >
                MONTMARTRE
              </ActiveLink>
              <ActiveLink
                href="/poissonniere"
                active={pathname === "/poissonniere"}
              >
                POISSONNIÈRE
              </ActiveLink>
              <ActiveLink href="/reservations" active>
                RÉSERVATIONS
              </ActiveLink>
              <Link
                href="/#specialites"
                className="ml-4 rounded-full border border-white px-[17px] py-[9px] text-[14px] font-semibold tracking-[0.7px] uppercase text-white transition hover:bg-white/10"
              >
                LA CARTE
              </Link>
            </nav>
          </>
        ) : (
          <>
            <Link
              href="/"
              className="font-serif text-[24px] font-semibold uppercase tracking-[-1.2px] text-white"
            >
              {site.name}
            </Link>
            <nav className="hidden items-center gap-6 lg:flex">
              {links.map((link) => (
                <ActiveLink
                  key={link.href}
                  href={link.href}
                  active={link.match}
                >
                  {link.label}
                </ActiveLink>
              ))}
            </nav>
            <Link
              href="/#specialites"
              className="hidden rounded-full border border-white px-[17px] py-[9px] text-[14px] font-semibold tracking-[0.7px] uppercase text-white transition hover:bg-white/10 lg:inline-flex"
            >
              LA CARTE
            </Link>
          </>
        )}

        <Link
          href="/"
          className="font-serif text-[20px] font-semibold uppercase tracking-[-1px] text-white lg:hidden"
        >
          {site.name}
        </Link>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.match
                  ? "text-[14px] font-semibold tracking-[0.7px] uppercase text-gold"
                  : "text-[14px] font-semibold tracking-[0.7px] uppercase text-white/80"
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#specialites"
            className="w-fit rounded-full border border-white px-4 py-2 text-[14px] font-semibold tracking-[0.7px] uppercase text-white"
            onClick={() => setOpen(false)}
          >
            LA CARTE
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-blush">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:px-16">
        <p className="font-serif text-[24px] font-semibold text-ink">
          {site.name}
        </p>
        <p className="text-[16px] text-ink">{site.copyright}</p>
        <div className="flex flex-wrap gap-6 text-[12px] font-medium uppercase tracking-wide text-muted">
          <Link href="/mentions-legales" className="hover:text-ink">
            MENTIONS LÉGALES
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            CONTACT
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({
  children,
  variant = "inner",
}: {
  children: React.ReactNode;
  variant?: "home" | "inner";
}) {
  return (
    <>
      <Header variant={variant} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
