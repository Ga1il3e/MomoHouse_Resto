import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { branches } from "@/lib/content";

export const metadata: Metadata = {
  title: "La Carte | Momo House",
  description:
    "Choisissez une adresse pour découvrir la carte de Momo House à Montmartre ou Poissonnière.",
};

const cards = [
  {
    branch: branches.montmartre,
    href: "/montmartre/carte",
    image: "/images/menu/montmartre-hero.jpg",
    note: "Jhol, kothe et momos vapeur",
  },
  {
    branch: branches.poissonniere,
    href: "/poissonniere/carte",
    image: "/images/menu/poissonniere-hero.jpg",
    note: "Jhol, chilli momo et golden fried",
  },
] as const;

export default function CarteChooserPage() {
  return (
    <SiteShell variant="inner">
      <Section tone="cream" width={1152}>
        <SectionHeading title="La Carte" underline="red-bright" />
        <p className="mx-auto mb-12 max-w-2xl text-center text-[16px] leading-6 text-muted md:text-[18px] md:leading-7">
          Chaque salle a sa propre carte. Choisissez une adresse pour voir les
          momos du jour, préparés à la main.
        </p>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {cards.map(({ branch, href, image, note }) => (
            <article key={branch.id} className="flex flex-col items-center">
              <Link
                href={href}
                className="group relative mb-6 aspect-[536/320] w-full overflow-hidden rounded-xl shadow-soft focus-ring"
              >
                <Image
                  src={image}
                  alt={`La carte ${branch.name}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute inset-0 bg-ink/20 transition group-hover:bg-ink/10" />
              </Link>
              <h2 className="font-serif text-[24px] font-semibold text-ink">
                {branch.name}
              </h2>
              <p className="mt-1 text-center text-[16px] leading-6 text-muted">
                {note}
              </p>
              <Link
                href={href}
                className="mt-4 border-b border-red pb-[5px] text-[12px] font-medium tracking-[1.2px] uppercase text-red transition hover:border-gold hover:text-gold focus-ring"
              >
                Voir la carte
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
