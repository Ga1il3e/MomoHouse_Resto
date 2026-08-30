import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { branches, craftSteps, dishes, testimonial } from "@/lib/content";

function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-ink pt-6 md:min-h-[800px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-steamer.png"
          alt="Momos in a bamboo steamer"
          fill
          priority
          className="object-cover opacity-60 mix-blend-overlay"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/50" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-[896px] flex-col items-center px-6 py-20 text-center md:px-16">
        <h1 className="font-serif text-[48px] leading-none text-white md:text-[96px] md:leading-[96px]">
          MOMO HOUSE
        </h1>
        <p className="mt-3 font-serif text-[16px] italic text-gold-soft md:mt-6">
          Handcrafted Warmth in Every Bite
        </p>
        <p className="mt-6 max-w-[672px] text-[16px] leading-6 text-blush/90">
          Experience the authentic taste of the Himalayas. Hand-rolled dough,
          aromatic spices, and traditional steaming methods brought to the heart
          of Paris.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/#specialites"
            className="rounded-full bg-red-bright px-16 py-[13px] text-[14px] font-semibold tracking-[1.4px] uppercase text-white shadow-lg transition hover:brightness-110"
          >
            VIEW MENU
          </Link>
          <Link
            href="/#adresses"
            className="rounded-full border border-white px-16 py-[13px] text-[14px] font-semibold tracking-[1.4px] uppercase text-white transition hover:bg-white/10"
          >
            LES ADRESSES
          </Link>
        </div>
      </div>
    </section>
  );
}

function Branches() {
  const items = [branches.montmartre, branches.poissonniere];
  return (
    <section id="adresses" className="bg-cream px-6 py-20 md:px-16">
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-12 flex flex-col items-center gap-1">
          <h2 className="font-serif text-[32px] font-semibold text-ink">
            Nos Adresses
          </h2>
          <div className="h-1 w-12 rounded-full bg-red-bright" />
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          {items.map((branch) => (
            <article key={branch.id} className="flex flex-col items-center">
              <div className="relative mb-6 aspect-[536/402] w-full overflow-hidden shadow-sm">
                <Image
                  src={branch.branchSketch}
                  alt={`Illustration ${branch.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-serif text-[24px] font-semibold text-ink">
                {branch.name}
              </h3>
              <p className="mt-1 text-center text-[16px] leading-6 text-muted">
                {branch.addressLines[0]}
                <br />
                {branch.id === "montmartre" ? "75002 Paris" : "75009 Paris"}
              </p>
              <Link
                href={`/${branch.id === "poissonniere" ? "poissonniere" : "montmartre"}`}
                className="mt-4 border-b border-red pb-[5px] text-[12px] font-medium tracking-[1.2px] uppercase text-red"
              >
                VOIR LA SALLE
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section className="bg-ink px-6 py-20 md:px-16">
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-12 flex flex-col items-center gap-2 pb-4">
          <h2 className="font-devanagari text-[32px] font-semibold text-gold-soft">
            बनाउने तरिका
          </h2>
          <p className="text-[14px] font-semibold tracking-[1.4px] uppercase text-white/90">
            LE GESTE, EN TROIS VUES
          </p>
        </div>
        <div className="grid border-y border-[rgba(141,112,110,0.3)] md:grid-cols-3">
          {craftSteps.map((step, index) => (
            <article
              key={step.step}
              className={`px-6 py-12 md:px-12 ${index < craftSteps.length - 1 ? "border-b border-[rgba(141,112,110,0.3)] md:border-b-0 md:border-r" : ""}`}
            >
              <div className="mb-6 flex h-48 items-center justify-center">
                <div className="relative h-32 w-[235px] shadow-[0px_8px_5px_0px_rgba(0,0,0,0.08)]">
                  <Image
                    src={step.image}
                    alt={step.french}
                    fill
                    className="object-cover"
                    sizes="235px"
                  />
                </div>
              </div>
              <p className="mb-2 text-[16px] tracking-[1.6px] text-gold-soft/80">
                {step.step}
              </p>
              <h3 className="font-devanagari text-[24px] text-gold-soft">
                {step.nepali}
              </h3>
              <p className="mt-1 font-serif text-[18px] text-white">
                {step.french}
              </p>
              <p className="mt-2 text-[14px] leading-5 text-blush/70">
                {step.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-right text-[10px] tracking-[1px] uppercase text-blush/50">
          QUATORZE PLIS
          <br />
          RELEVÉS SUR PHOTO
        </p>
      </div>
    </section>
  );
}

function Specialties() {
  return (
    <section id="specialites" className="bg-cream px-6 py-20 md:px-16">
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-20 flex flex-col items-center gap-2">
          <h2 className="font-devanagari text-[32px] font-semibold text-red">
            हाम्रा विशेष
          </h2>
          <div className="h-1 w-12 rounded-full bg-red" />
        </div>
        <div className="flex flex-col gap-20">
          {dishes.map((dish) => (
            <article
              key={dish.french}
              className={`flex flex-col items-center gap-12 md:flex-row md:gap-12 ${dish.imageLeft ? "" : "md:flex-row-reverse"}`}
            >
              <div className="flex flex-1 justify-center">
                <div className="relative flex size-64 items-center justify-center rounded-full bg-blush">
                  <div className="relative size-56 overflow-hidden rounded-full border-4 border-cream shadow-lg">
                    <Image
                      src={dish.image}
                      alt={dish.french}
                      fill
                      className="object-cover"
                      sizes="224px"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-1 flex-col ${dish.imageLeft ? "items-start" : "items-start md:items-end"}`}
              >
                <h3 className="font-devanagari text-[40px] leading-[60px] text-red">
                  {dish.nepali}
                </h3>
                <p className="font-serif text-[24px] font-semibold tracking-[1.2px] uppercase text-ink">
                  {dish.french}
                </p>
                <ul
                  className={`mt-3 space-y-2 ${dish.imageLeft ? "" : "md:text-right"}`}
                >
                  {dish.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={`flex gap-2 text-[16px] text-muted ${dish.imageLeft ? "" : "md:flex-row-reverse"}`}
                    >
                      <span className="text-border">-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 rounded-full border border-border px-4 py-1 text-[10px] tracking-[1px] uppercase text-muted">
                  {dish.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="border-y border-border bg-blush px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[768px] flex-col items-center gap-4 px-4 text-center">
        <div className="relative h-[18px] w-[26px]">
          <Image
            src="/icons/quote.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <blockquote className="font-serif text-[24px] italic leading-[40px] text-ink md:text-[32px] md:leading-[52px]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <p className="pt-2 text-[14px] font-semibold tracking-[1.4px] uppercase text-muted">
          {testimonial.attribution}
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <SiteShell variant="home">
      <Hero />
      <Branches />
      <Craft />
      <Specialties />
      <Testimonial />
    </SiteShell>
  );
}
