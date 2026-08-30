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
      className={`focus-ring whitespace-nowrap ${active ? "nav-link-active" : "nav-link"}`}
    >
      {children}
    </Link>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 flex-col focus-ring">
      <span
        className={`font-serif font-semibold uppercase tracking-[-1.2px] text-white transition group-hover:text-gold-soft ${
          compact ? "text-[20px]" : "text-[22px] xl:text-[24px]"
        }`}
      >
        {site.name}
      </span>
      {!compact ? (
        <span className="mt-0.5 hidden text-[9px] font-semibold tracking-[1.2px] text-gold-soft/85 uppercase sm:block xl:text-[10px]">
          {site.tagline}
        </span>
      ) : null}
    </Link>
  );
}

export function Header({ variant = "inner" }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const showTagline = variant === "home" || pathname === "/";

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  const locationLinks = [
    {
      href: "/montmartre",
      label: "Montmartre",
      match: pathname === "/montmartre",
    },
    {
      href: "/poissonniere",
      label: "Poissonnière",
      match: pathname === "/poissonniere",
    },
  ];

  const mobileLinks = [
    { href: "/#adresses", label: "Restaurants", match: false },
    ...locationLinks,
    {
      href: "/reservations",
      label: "Réservations",
      match: pathname === "/reservations",
    },
    { href: "/#specialites", label: "La carte", match: false },
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto hidden max-w-[1280px] items-center gap-8 px-6 py-3.5 md:px-16 lg:grid lg:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)]">
        <div className="justify-self-start">
          <BrandMark compact={!showTagline} />
        </div>

        <nav
          aria-label="Navigation principale"
          className="flex items-center justify-center gap-1"
        >
          <NavLink href="/#adresses">Restaurants</NavLink>
          <span
            aria-hidden
            className="mx-3 h-3 w-px bg-white/20"
          />
          {locationLinks.map((link, index) => (
            <span key={link.href} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden className="mx-3 text-[10px] text-white/25">
                  ·
                </span>
              ) : null}
              <NavLink href={link.href} active={link.match}>
                {link.label}
              </NavLink>
            </span>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/reservations"
            className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.8px] uppercase transition ${
              pathname === "/reservations"
                ? "bg-gold text-ink"
                : "border border-gold/70 text-gold-soft hover:border-gold hover:bg-gold/10"
            }`}
          >
            Réserver
          </Link>
          <Link
            href="/#specialites"
            className="focus-ring whitespace-nowrap rounded-full border border-white/70 px-4 py-2 text-[12px] font-semibold tracking-[0.8px] text-white uppercase transition hover:border-white hover:bg-white/10"
          >
            La carte
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 lg:hidden">
        <BrandMark compact />
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="focus-ring flex size-10 items-center justify-center text-white"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 origin-center bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 origin-center bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Menu mobile"
          className="flex flex-col gap-1 border-t border-white/10 bg-ink px-6 py-6 lg:hidden"
        >
          <p className="mb-2 text-[11px] font-semibold tracking-[1.4px] text-gold-soft/70 uppercase">
            Adresses
          </p>
          {mobileLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-3 text-[15px] font-semibold tracking-[0.4px] uppercase transition focus-ring ${
                link.match
                  ? "bg-white/5 text-gold"
                  : "text-white/85 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="my-4 h-px bg-white/10" />
          <div className="flex flex-col gap-3">
            <Link
              href="/reservations"
              className="focus-ring rounded-full bg-gold px-5 py-3 text-center text-[13px] font-semibold tracking-[0.8px] text-ink uppercase"
              onClick={() => setOpen(false)}
            >
              Réserver une table
            </Link>
            <Link
              href="/#specialites"
              className="focus-ring rounded-full border border-white/70 px-5 py-3 text-center text-[13px] font-semibold tracking-[0.8px] text-white uppercase"
              onClick={() => setOpen(false)}
            >
              La carte
            </Link>
          </div>
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
        <div className="flex flex-wrap gap-6 text-[12px] font-medium tracking-wide text-muted uppercase">
          <Link href="/mentions-legales" className="transition hover:text-ink">
            Mentions légales
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="transition hover:text-ink"
          >
            Contact
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            Instagram
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
