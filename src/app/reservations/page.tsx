"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  BranchId,
  branches,
  guestOptions,
  isBranchId,
  reservationTimes,
  site,
} from "@/lib/content";

type FormState = {
  branch: BranchId;
  date: string;
  time: string;
  guests: number;
};

type Confirmed = FormState;

const fieldClass =
  "w-full rounded-lg border border-border bg-white px-[17px] py-[13px] text-[16px] text-ink outline-none transition focus:border-red focus-ring";

function ReservationForm() {
  const searchParams = useSearchParams();
  const initialBranch = useMemo(() => {
    const fromQuery = searchParams.get("branch");
    return isBranchId(fromQuery) ? fromQuery : "montmartre";
  }, [searchParams]);

  const [branchOverride, setBranchOverride] = useState<BranchId | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const branch = branchOverride ?? initialBranch;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date) {
      setError("Veuillez sélectionner une date.");
      return;
    }
    const selected = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      setError("Veuillez choisir une date valide à venir.");
      return;
    }
    setError(null);
    setConfirmed({ branch, date, time, guests });
  }

  return (
    <div className="mx-auto grid w-full max-w-[1152px] gap-12 lg:grid-cols-12">
      <div className="relative rounded-xl bg-white px-6 py-12 shadow-card md:px-12 lg:col-span-7">
        {confirmed ? (
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-[28px] font-semibold text-red">
              Réservation confirmée
            </h2>
            <p className="text-[16px] leading-7 text-muted">
              Merci ! Votre demande a été enregistrée localement. Présentez ces
              détails à l&apos;accueil.
            </p>
            <dl className="space-y-3 rounded-xl bg-blush p-6 text-[16px]">
              <div>
                <dt className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                  Restaurant
                </dt>
                <dd className="text-muted">
                  Momo House {branches[confirmed.branch].name}
                </dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                  Date
                </dt>
                <dd className="text-muted">{confirmed.date}</dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                  Heure
                </dt>
                <dd className="text-muted">{confirmed.time}</dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                  Convives
                </dt>
                <dd className="text-muted">
                  {confirmed.guests}{" "}
                  {confirmed.guests > 1 ? "personnes" : "personne"}
                </dd>
              </div>
            </dl>
            <Button
              type="button"
              variant="ink"
              className="w-full rounded-lg py-4"
              onClick={() => setConfirmed(null)}
            >
              Nouvelle réservation
            </Button>
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                Choisir un restaurant
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    [
                      "montmartre",
                      branches.montmartre.name,
                      branches.montmartre.district,
                    ],
                    [
                      "poissonniere",
                      branches.poissonniere.name,
                      branches.poissonniere.district,
                    ],
                  ] as const
                ).map(([id, name, district]) => {
                  const selected = branch === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setBranchOverride(id)}
                      className={`rounded-lg border p-[17px] text-center transition focus-ring ${
                        selected
                          ? "border-red-bright bg-red-bright text-white"
                          : "border-border bg-white text-ink hover:border-red/40"
                      }`}
                    >
                      <span className="block text-[14px] font-semibold tracking-[0.7px]">
                        {name}
                      </span>
                      <span
                        className={`block text-[12px] font-medium ${
                          selected ? "text-white/80" : "text-ink/80"
                        }`}
                      >
                        {district}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date"
                  className="text-[14px] font-semibold tracking-[0.7px] text-ink"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={fieldClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="time"
                  className="text-[14px] font-semibold tracking-[0.7px] text-ink"
                >
                  Heure
                </label>
                <div className="relative">
                  <select
                    id="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className={`${fieldClass} appearance-none`}
                  >
                    {reservationTimes.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2">
                    <Image
                      src="/icons/select-chevron.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-full"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="guests"
                className="text-[14px] font-semibold tracking-[0.7px] text-ink"
              >
                Nombre de personnes
              </label>
              <div className="relative">
                <select
                  id="guests"
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                  className={`${fieldClass} appearance-none`}
                >
                  {guestOptions.map((count) => (
                    <option key={count} value={count}>
                      {count} {count > 1 ? "personnes" : "personne"}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2">
                  <Image
                    src="/icons/select-chevron.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-full"
                  />
                </span>
              </div>
            </div>

            {error ? <p className="text-[14px] text-closed">{error}</p> : null}

            <div className="border-t border-border pt-[17px]">
              <Button
                type="submit"
                variant="ink"
                className="w-full rounded-lg py-4 tracking-[0.7px]"
              >
                CONFIRMER LA RÉSERVATION
              </Button>
            </div>
          </form>
        )}
      </div>

      <aside className="flex flex-col gap-6 lg:col-span-5">
        <div className="relative h-64 overflow-hidden rounded-xl shadow-soft">
          <Image
            src="/images/reservation-interior.png"
            alt="Intérieur Momo House"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
        <div className="rounded-xl bg-blush p-6 shadow-card">
          <h3 className="font-serif text-[24px] font-semibold text-ink">
            Informations Pratiques
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <span className="relative mt-0.5 h-6 w-4 shrink-0">
                <Image
                  src="/icons/pin.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <div>
                <p className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                  Momo House Montmartre
                </p>
                <p className="text-[16px] text-muted">
                  {branches.montmartre.addressInline}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="relative mt-0.5 h-6 w-4 shrink-0">
                <Image
                  src="/icons/pin.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <div>
                <p className="text-[14px] font-semibold tracking-[0.7px] text-ink">
                  Momo House Poissonnière
                </p>
                <p className="text-[16px] text-muted">
                  {branches.poissonniere.addressInline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="relative h-[22px] w-[18px] shrink-0">
                <Image
                  src="/icons/phone.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <p className="text-[16px] text-muted">{site.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="relative size-5 shrink-0">
                <Image
                  src="/icons/email.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <p className="text-[16px] text-muted">{site.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function ReservationsPage() {
  return (
    <SiteShell variant="inner">
      <Section tone="cream" width={1280}>
        <div className="mx-auto mb-12 max-w-[672px] text-center">
          <h1 className="font-serif text-[40px] font-bold tracking-[-0.96px] text-red md:text-[48px] md:leading-[56px]">
            Réservez votre table
          </h1>
          <p className="mt-4 text-[18px] leading-7 text-muted">
            Rejoignez-nous pour une expérience culinaire authentique.
            Sélectionnez votre restaurant et laissez-vous transporter par les
            saveurs du Népal.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="mx-auto h-96 max-w-[1152px] animate-pulse rounded-xl bg-white/60" />
          }
        >
          <ReservationForm />
        </Suspense>
      </Section>
    </SiteShell>
  );
}
