import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
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
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,245,0.85)] via-transparent to-transparent" />
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
            <article className="flex flex-1 flex-col justify-center rounded-xl border border-white/50 bg-white/70 p-6 shadow-soft backdrop-blur-[5px]">
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
                className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold tracking-[0.7px] text-gold"
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
            </article>

            <article className="flex flex-1 flex-col justify-center rounded-xl border border-white/50 bg-[#fbf2ed] p-6 shadow-soft backdrop-blur-[5px]">
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
            </article>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-6 py-12 md:flex-row md:gap-6 md:px-16 md:py-16">
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
            <Link
              href="/reservations?branch=poissonniere"
              className="mt-6 inline-flex rounded-full bg-red px-6 py-3 text-[14px] font-semibold tracking-[0.7px] uppercase text-white shadow-md transition hover:brightness-110"
            >
              Réserver une table
            </Link>
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
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-16">
          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="relative block h-[320px] overflow-hidden rounded-xl shadow-md md:h-[384px]"
          >
            <Image
              src={branch.map}
              alt="Carte Poissonnière"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,245,0.3)] to-transparent" />
          </a>
        </section>
      </div>
    </SiteShell>
  );
}
