"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

type HeaderProps = {
  variant?: "home" | "inner";
};

function NavLink({
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
      className={`focus-ring ${active ? "nav-link-active" : "nav-link"}`}
    >
      {children}
    </Link>
  );
}

function LaCarteLink({ className }: { className?: string }) {
  return (
    <Link
      href="/#specialites"
      className={[
        "rounded-full border border-white px-[17px] py-[9px] text-[14px] font-semibold tracking-[0.7px] uppercase text-white transition hover:bg-white/10 focus-ring",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      LA CARTE
    </Link>
  );
}

export function Header({ variant = "inner" }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const isHome = variant === "home" || pathname === "/";

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

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

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <div
        className={`mx-auto hidden h-14 max-w-[1280px] items-center px-6 md:px-16 lg:grid ${
          isHome ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[auto_1fr_auto]"
        }`}
      >
        {isHome ? (
          <>
            <div className="justify-self-start">
              <NavLink href="/#adresses">RESTAURANTS</NavLink>
            </div>
            <Link
              href="/"
              className="flex flex-col items-center justify-center focus-ring"
            >
              <span className="font-serif text-[24px] font-semibold uppercase tracking-[-1.2px] text-white">
                {site.name}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-gold-soft opacity-80">
                {site.tagline}
              </span>
            </Link>
            <nav className="flex items-center justify-end gap-6">
              <NavLink href="/montmartre" active={pathname === "/montmartre"}>
                MONTMARTRE
              </NavLink>
              <NavLink
                href="/poissonniere"
                active={pathname === "/poissonniere"}
              >
                POISSONNIÈRE
              </NavLink>
              <NavLink
                href="/reservations"
                active={pathname === "/reservations"}
              >
                RÉSERVATIONS
              </NavLink>
              <LaCarteLink className="ml-2" />
            </nav>
          </>
        ) : (
          <>
            <Link
              href="/"
              className="font-serif text-[24px] font-semibold uppercase tracking-[-1.2px] text-white focus-ring"
            >
              {site.name}
            </Link>
            <nav className="flex items-center justify-center gap-6">
              {links.map((link) => (
                <NavLink key={link.href} href={link.href} active={link.match}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <LaCarteLink />
          </>
        )}
      </div>

      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 lg:hidden">
        <Link
          href="/"
          className="font-serif text-[20px] font-semibold uppercase tracking-[-1px] text-white focus-ring"
        >
          {site.name}
        </Link>
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center text-white focus-ring"
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
        <nav className="flex flex-col gap-5 border-t border-white/10 bg-ink px-6 py-8 lg:hidden">
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
            className="mt-2 w-fit rounded-full border border-white px-[17px] py-[9px] text-[14px] font-semibold tracking-[0.7px] uppercase text-white transition hover:bg-white/10 focus-ring"
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
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-16">
        <p className="font-serif text-[24px] font-semibold text-ink">
          {site.name}
        </p>
        <p className="text-[16px] text-ink md:order-none">{site.copyright}</p>
        <div className="flex flex-wrap gap-6 text-[12px] font-medium uppercase tracking-wide text-muted">
          <Link href="/mentions-legales" className="transition hover:text-ink">
            MENTIONS LÉGALES
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="transition hover:text-ink"
          >
            CONTACT
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
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
