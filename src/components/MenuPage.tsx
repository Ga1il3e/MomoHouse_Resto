import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { branches, type BranchMenu, type MenuTagTone } from "@/lib/content";

function tagClasses(tone: MenuTagTone) {
  switch (tone) {
    case "neutral":
      return "bg-[#efe6e2] text-muted";
    case "veg":
      return "bg-gold/20 text-[#745c00]";
    case "spicy":
      return "bg-gold text-[#745c00]";
    case "hot":
      return "bg-red-bright text-[#ffb4ad]";
    case "crispy":
      return "bg-gold-soft text-[#241a00]";
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}

export function MenuPage({ menu }: { menu: BranchMenu }) {
  const branch = branches[menu.branchId];
  const reserveHref = `/reservations?branch=${menu.branchId}`;

  return (
    <SiteShell variant="inner">
      <section className="relative flex h-[409px] w-full items-center justify-center px-6 text-center md:h-[512px] md:px-16">
        <Link
          href={`/${menu.branchId}`}
          aria-label={`Voir le restaurant ${branch.name}`}
          className="absolute inset-0 overflow-hidden focus-ring"
        >
          <Image
            src={menu.heroImage}
            alt={menu.heroAlt}
            fill
            priority
            className="object-cover transition duration-500 hover:scale-[1.02]"
            sizes="100vw"
          />
          <span className="glass-hero absolute inset-0 backdrop-blur-sm backdrop-saturate-150" />
        </Link>
        <div className="pointer-events-none relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-7 text-center md:px-12 md:py-10">
          <p className="mb-1 text-[12px] font-medium tracking-[1.2px] text-white/90 uppercase">
            {menu.eyebrow}
          </p>
          <h1 className="font-serif text-[28px] font-bold tracking-[-0.56px] text-white md:text-[48px] md:leading-[56px] md:tracking-[-0.96px]">
            {menu.title}
          </h1>
          <p className="mt-3 max-w-xl text-[16px] leading-6 text-white/90 md:text-[18px] md:leading-7">
            {menu.body}
          </p>
        </div>
      </section>

      <div className="sticky top-[var(--header-h)] z-40 border-b border-[#e9e1dc] bg-cream/90 py-3 backdrop-blur-sm">
        <div className="no-scrollbar mx-auto flex max-w-[1280px] gap-3 overflow-x-auto px-6 md:px-16">
          {menu.categories.map((category, index) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`focus-ring flex-shrink-0 rounded-full px-4 py-2 text-[12px] font-medium tracking-[0.6px] uppercase transition ${
                index === 0
                  ? "bg-red-bright text-[#ffb4ad]"
                  : "border border-[#8d706e] text-ink hover:bg-[#efe6e2]"
              }`}
            >
              {category.title.replace(" (Signature)", "")}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] space-y-16 px-6 py-8 md:px-16 md:py-12">
        {menu.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-36">
            <div className="mb-10 flex items-end justify-between gap-4 border-b border-[#e1bebb] pb-3">
              <h2 className="font-serif text-[28px] font-semibold text-ink md:text-[32px] md:leading-10">
                {category.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-ambient transition duration-300 hover:-translate-y-0.5 hover:shadow-ambient-hover"
                >
                  <div className="relative h-48 overflow-hidden bg-[#f5ece7]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 right-3 rounded bg-white/90 px-2 py-1 font-serif text-[14px] font-semibold text-ink shadow-sm backdrop-blur-sm">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-[24px] font-semibold leading-8 text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[16px] leading-6 text-muted">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium tracking-[0.8px] uppercase ${tagClasses(tag.tone)}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-blush">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-6 py-16 text-center md:px-16">
          <p className="text-[12px] font-medium tracking-[1.2px] text-red uppercase">
            {branch.name} · {branch.district}
          </p>
          <h2 className="max-w-xl font-serif text-[32px] font-semibold text-ink">
            Envie de les goûter ?
          </h2>
          <p className="max-w-lg text-[16px] leading-6 text-muted">
            La carte se déguste sur place. Réservez une table à {branch.name} ou
            passez nous voir aux heures d&apos;ouverture.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={reserveHref} variant="ink">
              Réserver une table
            </Button>
            <Button href={`/${menu.branchId}`} variant="outline">
              Voir le restaurant
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
