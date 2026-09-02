import Image from "next/image";
import { SiteShell } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { IconCircle, InfoCard } from "@/components/ui/InfoCard";
import { Section } from "@/components/ui/Section";
import { branches } from "@/lib/content";

const branch = branches.poissonniere;

export default function PoissonnierePage() {
  return (
    <SiteShell variant="inner">
      <div className="bg-cream">
        <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 md:grid-cols-12 md:gap-6 md:px-16 md:py-24">
          <div className="flex flex-col justify-center md:col-span-5">
            <p className="text-[14px] font-semibold tracking-[1.4px] uppercase text-red">
              {branch.heroEyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[40px] font-bold tracking-[-0.96px] text-ink md:text-[48px] md:leading-[56px]">
              {branch.heroTitle}
            </h1>
            <p className="mt-6 max-w-[448px] text-[18px] leading-7 text-muted">
              {branch.heroBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/reservations?branch=poissonniere" variant="ink">
                RÉSERVER UNE TABLE
              </Button>
              <Button href="/poissonniere/carte" variant="outline">
                VOIR LA CARTE
              </Button>
            </div>
          </div>
          <div className="relative md:col-span-7">
            <div className="absolute top-[-32px] right-[-32px] size-64 rounded-full bg-[#e9c349] opacity-50 blur-[32px] mix-blend-multiply" />
            <div className="absolute bottom-[-32px] left-[-32px] size-64 rounded-full bg-[#ffb3ad] opacity-30 blur-[32px] mix-blend-multiply" />
            <div className="relative overflow-hidden rounded-xl shadow-soft">
              <div className="relative aspect-square w-full md:h-[662px] md:aspect-auto">
                <Image
                  src={branch.sketch}
                  alt="Illustration Momo House Poissonnière"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-6 pb-16 md:grid-cols-3 md:items-stretch md:px-16">
          <InfoCard className="flex flex-col">
            <IconCircle tone="pink">
              <span className="relative h-5 w-4">
                <Image
                  src="/icons/pin-red.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </IconCircle>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Adresse
            </h2>
            <p className="mt-2 flex-1 text-[16px] leading-6 text-muted">
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
              className="mt-10 inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.7px] text-red transition hover:text-red-bright focus-ring"
            >
              Itinéraire
              <span className="relative size-[10px]">
                <Image
                  src="/icons/arrow.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </a>
          </InfoCard>

          <InfoCard>
            <IconCircle tone="hours">
              <span className="relative size-5">
                <Image
                  src="/icons/clock-hours.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </IconCircle>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Horaires
            </h2>
            <ul className="mt-2 space-y-2">
              {branch.hours.map((row) => (
                <li
                  key={row.days}
                  className={`flex items-start justify-between gap-4 pb-1 text-[16px] ${
                    row.closed ? "" : "border-b border-hours-border"
                  } ${row.closed ? "text-closed" : "text-muted"}`}
                >
                  <span>{row.days}</span>
                  <span className="text-right font-medium">
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

          <InfoCard className="flex flex-col">
            <IconCircle tone="contact">
              <span className="relative size-[18px]">
                <Image
                  src="/icons/contact-phone-icon.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </IconCircle>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Contact
            </h2>
            <p className="mt-2 text-[16px] leading-6 text-muted">
              Pour les réservations de groupes ou les demandes spéciales.
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <a
                href={`tel:${branch.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 text-[16px] text-ink focus-ring"
              >
                <span className="relative h-[22px] w-[15px]">
                  <Image
                    src="/icons/phone-red.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                {branch.phone}
              </a>
              <a
                href={`mailto:${branch.email}`}
                className="inline-flex items-center gap-3 text-[16px] text-ink focus-ring"
              >
                <span className="relative h-4 w-5">
                  <Image
                    src="/icons/email-red.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                {branch.email}
              </a>
            </div>
          </InfoCard>
        </section>

        <Section tone="transparent" width={1280} className="pb-20 pt-0">
          <h2 className="mb-6 text-center font-serif text-[32px] font-semibold text-ink">
            Nous Trouver
          </h2>
          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-[400px] overflow-hidden rounded-xl shadow-soft focus-ring"
          >
            <Image
              src={branch.map}
              alt="Carte Poissonnière"
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-[rgba(178,42,43,0.08)] opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-red shadow-md">
                <span className="relative size-[11px]">
                  <Image
                    src="/icons/map-open.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                Ouvrir la carte
              </span>
            </span>
          </a>
        </Section>
      </div>
    </SiteShell>
  );
}
