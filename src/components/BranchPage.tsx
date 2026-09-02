import Image from "next/image";
import { SiteShell } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { IconCircle, InfoCard } from "@/components/ui/InfoCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  branches,
  imageFocusClass,
  menus,
  otherBranchId,
  site,
  type BranchId,
  type GoogleReview,
} from "@/lib/content";

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`size-4 ${star <= rounded ? "fill-gold" : "fill-[#e9e1dc]"}`}
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.61.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-ambient transition hover:-translate-y-0.5 hover:shadow-soft">
      <StarRating rating={review.rating} />
      <blockquote className="mt-4 flex-1 font-serif text-[18px] leading-7 text-ink italic">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <p className="mt-6 text-[12px] font-semibold tracking-[0.8px] text-muted uppercase">
        {review.author} · {review.source}
      </p>
    </article>
  );
}

export function BranchPage({ branchId }: { branchId: BranchId }) {
  const branch = branches[branchId];
  const menu = menus[branchId];
  const other = branches[otherBranchId(branchId)];
  const ratingLabel = branch.googleRating.toFixed(1).replace(".", ",");
  const countLabel = `${String(branch.googleReviewCount).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "\u00a0",
  )} avis`;

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
            <a
              href={branch.reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 focus-ring"
            >
              <StarRating rating={branch.googleRating} />
              <span className="text-[13px] font-semibold text-ink">
                {ratingLabel}
              </span>
              <span className="text-[12px] text-muted">{countLabel}</span>
            </a>
            <p className="mt-6 max-w-[448px] text-[18px] leading-7 text-muted">
              {branch.heroBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/reservations?branch=${branch.id}`} variant="ink">
                RÉSERVER UNE TABLE
              </Button>
              <Button href={`/${branch.id}/carte`} variant="outline">
                COMMANDES
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
                  alt={`Illustration Momo House ${branch.name}`}
                  fill
                  className={imageFocusClass(branch.imageFocus)}
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
            <p className="mt-3 text-[14px] text-muted">Métro {branch.metro}</p>
            <a
              href={branch.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.7px] text-red transition hover:text-red-bright focus-ring"
            >
              Itinéraire Google
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
              <a
                href={branch.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-[16px] text-ink focus-ring"
              >
                <span className="relative size-[18px]">
                  <Image
                    src="/icons/map-open.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                Site du restaurant
              </a>
            </div>
          </InfoCard>
        </section>

        <Section tone="blush" width={1280}>
          <SectionHeading title="Avis Google" underline="red-bright" />
          <div className="mx-auto mb-10 flex max-w-xl flex-col items-center rounded-xl bg-white px-6 py-8 text-center shadow-ambient">
            <StarRating rating={branch.googleRating} />
            <p className="mt-3 font-serif text-[48px] font-bold leading-none text-ink">
              {ratingLabel}
              <span className="text-[20px] font-semibold text-muted"> / 5</span>
            </p>
            <p className="mt-2 text-[16px] text-muted">
              {countLabel} sur la fiche Google {branch.name}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={branch.reviewsUrl}
                variant="ink"
                target="_blank"
                rel="noreferrer"
              >
                Voir les avis Google
              </Button>
              <Button
                href={branch.writeReviewUrl}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                Laisser un avis
              </Button>
            </div>
          </div>
          <p className="mx-auto mb-10 max-w-2xl text-center text-[16px] leading-6 text-muted">
            Extraits récents laissés sur Google. Cliquez un avis pour ouvrir la
            fiche complète.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {branch.reviews.map((review) => (
              <a
                key={review.author}
                href={branch.reviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="block focus-ring"
              >
                <ReviewCard review={review} />
              </a>
            ))}
          </div>
        </Section>

        <Section tone="cream" width={1280}>
          <SectionHeading title="Comment s'y rendre" underline="red" />
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard>
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
              <h3 className="font-serif text-[24px] font-semibold text-ink">
                Métro
              </h3>
              <p className="mt-2 text-[16px] leading-6 text-muted">
                {branch.metro}
              </p>
              <p className="mt-4 text-[15px] leading-6 text-muted">
                {branch.addressInline} · {branch.district}
              </p>
            </InfoCard>
            <InfoCard className="flex flex-col">
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
              <h3 className="font-serif text-[24px] font-semibold text-ink">
                Itinéraire
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-6 text-muted">
                Ouvrez la fiche Google de {branch.name} pour l&apos;itinéraire,
                les photos et les avis en temps réel.
              </p>
              <div className="mt-6">
                <Button
                  href={branch.mapsUrl}
                  variant="outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ouvrir Google Maps
                </Button>
              </div>
            </InfoCard>
          </div>
        </Section>

        <Section tone="cream" width={1280}>
          <SectionHeading title="Bon à savoir" underline="red" />
          <div className="flex flex-wrap justify-center gap-2">
            {branch.amenities.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-white px-4 py-2 text-[12px] font-medium tracking-[0.6px] text-muted uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section tone="cream" width={1280} className="pt-0">
          <SectionHeading title="À la carte" underline="red-bright" />
          <div className="grid gap-6 md:grid-cols-3">
            {menu.categories[0].items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl bg-white shadow-ambient"
              >
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[22px] font-semibold text-ink">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-serif text-[16px] font-semibold text-red">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-[15px] leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href={`/${branch.id}/carte`} variant="ink">
              Voir les commandes
            </Button>
          </div>
        </Section>

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
              alt={`Carte ${branch.name}`}
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
                Ouvrir Google Maps
              </span>
            </span>
          </a>
        </Section>

        <Section tone="blush" width={1280}>
          <SectionHeading title="L'autre adresse" underline="red-bright" />
          <article className="mx-auto grid max-w-4xl overflow-hidden rounded-xl bg-white shadow-ambient md:grid-cols-2">
            <div className="relative min-h-[240px]">
              <Image
                src={other.branchSketch}
                alt={`Illustration Momo House ${other.name}`}
                fill
                className={imageFocusClass(other.imageFocus)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <p className="text-[12px] font-semibold tracking-[1.2px] uppercase text-red">
                Momo House
              </p>
              <h3 className="mt-2 font-serif text-[32px] font-semibold text-ink">
                {other.name}
              </h3>
              <p className="mt-2 text-[16px] leading-6 text-muted">
                {other.addressInline}
              </p>
              <p className="mt-1 text-[14px] text-muted">Métro {other.metro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/${other.id}`} variant="ink">
                  Découvrir {other.name}
                </Button>
                <Button
                  href={other.mapsUrl}
                  variant="outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Maps
                </Button>
              </div>
            </div>
          </article>
        </Section>

        <Section tone="ink" width={1280} className="pb-20">
          <div className="flex flex-col items-center text-center">
            <p className="text-[12px] font-semibold tracking-[1.4px] uppercase text-gold-soft">
              Instagram
            </p>
            <h2 className="mt-3 font-serif text-[32px] font-semibold text-white">
              Suivez Momo House
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-6 text-white/80">
              Photos du jour, nouvelles assiettes et actualités des deux salles.
            </p>
            <div className="mt-8">
              <Button
                href={site.instagram}
                variant="ghost"
                target="_blank"
                rel="noreferrer"
              >
                @momo_house_fr
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </SiteShell>
  );
}
