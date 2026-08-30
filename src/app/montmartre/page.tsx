import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";
import { branches } from "@/lib/content";

const branch = branches.montmartre;

export default function MontmartrePage() {
  return (
    <SiteShell variant="inner">
      <div className="bg-cream">
        <section className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-12 md:gap-6 md:px-16 md:py-24">
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
            <Link
              href="/reservations?branch=montmartre"
              className="mt-6 inline-flex w-fit bg-red px-6 py-3 text-[14px] font-semibold tracking-[0.7px] uppercase text-white shadow-soft transition hover:brightness-110"
            >
              RÉSERVER UNE TABLE
            </Link>
          </div>
          <div className="relative md:col-span-7">
            <div className="absolute top-[-32px] right-[-32px] size-64 rounded-full bg-[#e9c349] opacity-50 blur-[32px] mix-blend-multiply" />
            <div className="absolute bottom-[-32px] left-[-32px] size-64 rounded-full bg-[#ffb3ad] opacity-30 blur-[32px] mix-blend-multiply" />
            <div className="relative overflow-hidden rounded-xl shadow-soft">
              <div className="relative aspect-square w-full md:h-[662px] md:aspect-auto">
                <Image
                  src={branch.sketch}
                  alt="Illustration Momo House Montmartre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-6 pb-16 md:grid-cols-3 md:px-16">
          <article className="relative rounded-xl bg-white p-6 shadow-soft">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-pink-icon">
              <span className="relative h-5 w-4">
                <Image
                  src="/icons/pin-red.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Adresse
            </h2>
            <p className="mt-2 text-[16px] leading-6 text-muted">
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
              className="mt-10 inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.7px] text-red"
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
          </article>

          <article className="relative rounded-xl bg-white p-6 shadow-soft">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-hours-icon">
              <span className="relative size-5">
                <Image
                  src="/icons/clock-hours.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Horaires
            </h2>
            <ul className="mt-2 space-y-2">
              {branch.hours.map((row) => (
                <li
                  key={row.days}
                  className={`flex items-start justify-between gap-4 pb-1 text-[16px] ${row.closed ? "" : "border-b border-hours-border"} ${row.closed ? "text-closed" : "text-muted"}`}
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
          </article>

          <article className="relative flex flex-col rounded-xl bg-white p-6 shadow-soft">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-contact-icon">
              <span className="relative size-[18px]">
                <Image
                  src="/icons/contact-phone-icon.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Contact
            </h2>
            <p className="mt-2 text-[16px] leading-6 text-muted">
              Pour les réservations de groupes ou les demandes spéciales.
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <a
                href={`tel:${branch.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 text-[16px] text-ink"
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
                className="inline-flex items-center gap-3 text-[16px] text-ink"
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
          </article>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-16">
          <h2 className="mb-6 text-center font-serif text-[32px] font-semibold text-ink">
            Nous Trouver
          </h2>
          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-[400px] overflow-hidden rounded-xl shadow-soft"
          >
            <Image
              src={branch.map}
              alt="Carte Montmartre"
              fill
              className="object-cover transition group-hover:scale-[1.02]"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-[rgba(178,42,43,0.08)] opacity-0 transition group-hover:opacity-100">
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
        </section>
      </div>
    </SiteShell>
  );
}
