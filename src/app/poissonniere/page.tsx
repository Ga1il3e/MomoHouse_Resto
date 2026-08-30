import Image from "next/image";
import { SiteShell } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/ui/InfoCard";
import { Section } from "@/components/ui/Section";
import { branches } from "@/lib/content";

const branch = branches.poissonniere;

export default function PoissonnierePage() {
  return (
    <SiteShell variant="inner">
      <div className="bg-cream">
        <section className="mx-auto grid max-w-[1280px] gap-6 px-6 py-12 md:grid-cols-12 md:px-16 md:py-16">
          <div className="relative overflow-hidden rounded-xl shadow-lg md:col-span-8 md:h-[600px]">
            <div className="relative min-h-[420px] md:absolute md:inset-0 md:min-h-0">
              <Image
                src={branch.sketch}
                alt="Illustration Momo House Poissonnière"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,245,0.9)] via-[rgba(255,248,245,0.15)] to-transparent" />
              <div className="absolute right-6 bottom-6 left-6">
                <h1 className="font-serif text-[40px] font-bold tracking-[-0.96px] text-ink md:text-[48px] md:leading-[56px]">
                  {branch.heroTitle}
                </h1>
                <p className="mt-1 max-w-[672px] text-[16px] leading-7 text-muted md:text-[18px]">
                  {branch.heroBody}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:col-span-4 md:h-[600px]">
            <InfoCard
              tone="glass"
              className="flex flex-1 flex-col justify-center"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="relative h-5 w-4">
                  <Image
                    src="/icons/pin-poiss.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                <h2 className="font-serif text-[24px] font-semibold text-red">
                  Adresse
                </h2>
              </div>
              <p className="text-[16px] leading-6 text-ink">
                {branch.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold tracking-[0.7px] text-gold transition hover:brightness-110 focus-ring"
              >
                Itinéraire
                <span className="relative size-[10px]">
                  <Image
                    src="/icons/arrow-gold.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
              </a>
            </InfoCard>

            <InfoCard
              className="flex flex-1 flex-col justify-center border border-white/50 bg-[#fbf2ed] shadow-soft"
              tone="blush"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="relative size-5">
                  <Image
                    src="/icons/clock-poiss.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                <h2 className="font-serif text-[24px] font-semibold text-red">
                  Horaires
                </h2>
              </div>
              <ul className="space-y-2">
                {branch.hours.map((row) => (
                  <li
                    key={row.days}
                    className={`flex items-start justify-between gap-3 pb-1 text-[16px] ${
                      row.days === "Dimanche"
                        ? "text-muted"
                        : "border-b border-hours-border text-ink"
                    }`}
                  >
                    <span className="max-w-[40%]">{row.days}</span>
                    <span className="max-w-[55%] text-right">
                      {row.times.map((time) => (
                        <span key={time} className="block">
                          {time}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </section>

        <Section
          tone="transparent"
          width={1280}
          className="py-12 md:py-16"
          innerClassName="flex flex-col items-center gap-6 md:flex-row md:gap-6"
        >
          <div className="flex-1 md:pr-20">
            <h2 className="font-serif text-[32px] font-semibold text-red">
              {branch.atmosphere.title}
            </h2>
            {branch.atmosphere.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-3 text-[16px] leading-6 text-ink"
              >
                {paragraph}
              </p>
            ))}
            <Button
              href="/reservations?branch=poissonniere"
              variant="primary"
              className="mt-6 bg-red px-6 shadow-md"
            >
              Réserver une table
            </Button>
          </div>
          <div className="relative h-[320px] w-full flex-1 overflow-hidden rounded-xl shadow-lg md:h-[384px]">
            <Image
              src={branch.atmosphere.image}
              alt="Ambiance Poissonnière"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Section>

        <Section tone="transparent" width={1280} className="pb-20 pt-0">
          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="relative block h-[320px] overflow-hidden rounded-xl shadow-md focus-ring md:h-[384px]"
          >
            <Image
              src={branch.map}
              alt="Carte Poissonnière"
              fill
              className="object-cover transition duration-500 hover:scale-[1.01]"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,245,0.3)] to-transparent" />
          </a>
        </Section>
      </div>
    </SiteShell>
  );
}
