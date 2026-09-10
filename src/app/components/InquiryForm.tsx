'use client';

import React, { useEffect, useId, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocation, locations, type Location } from '@/data/locations';
import DatePicker from '@/app/components/DatePicker';

type HouseId = Location['id'];

interface FormData {
  name: string;
  email: string;
  location: string;
  date: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  location?: string;
  date?: string;
  guests?: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  location: '',
  date: '',
  guests: '',
  message: '',
};

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9+'] as const;

function houseLabel(id: string): string {
  if (id === 'montmartre') return 'Montmartre';
  if (id === 'poissonniere') return 'Poissonnière';
  return id;
}

function validateForm(
  data: FormData,
  isFr: boolean,
  locationLocked: boolean,
): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = isFr ? 'Votre nom est requis' : 'Your name is required';
  }
  if (!data.email.trim()) {
    errors.email = isFr ? 'Votre email est requis' : 'Your email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = isFr ? 'Adresse email invalide' : 'Invalid email address';
  }
  if (!locationLocked && !data.location) {
    errors.location = isFr
      ? 'Veuillez choisir une maison'
      : 'Please choose a house';
  }
  if (!data.date) {
    errors.date = isFr ? 'Veuillez choisir une date' : 'Please choose a date';
  }
  if (!data.guests) {
    errors.guests = isFr
      ? 'Veuillez indiquer le nombre de convives'
      : 'Please indicate guest count';
  }
  return errors;
}

const fieldShell = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  backgroundColor: 'rgba(245,240,232,0.03)',
  border: `1px solid ${hasError ? '#e05a3a' : 'rgba(245,240,232,0.14)'}`,
  color: 'var(--primary-foreground)',
  fontSize: '0.9rem',
  letterSpacing: '0.03em',
  padding: '14px 16px',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.25s ease, background-color 0.25s ease',
});

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.55rem',
  letterSpacing: '0.22em',
  color: 'var(--primary)',
  marginBottom: '10px',
  fontFamily: 'inherit',
};

interface FieldProps {
  id: string;
  label: string;
  labelFr: string;
  error?: string;
  isFr: boolean;
  children: React.ReactNode;
}

function Field({ id, label, labelFr, error, isFr, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {isFr ? labelFr : label}
      </label>
      {children}
      {error ? (
        <p
          style={{
            marginTop: 8,
            fontSize: '0.68rem',
            color: '#e05a3a',
            letterSpacing: '0.04em',
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface InquiryFormProps {
  /** When set, reservation is locked to this house (no house selector). */
  houseId?: HouseId;
}

export default function InquiryForm({ houseId }: InquiryFormProps) {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const uid = useId();
  const locationLocked = Boolean(houseId);
  const lockedLocation = houseId ? getLocation(houseId) : null;
  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState<FormData>(() => ({
    ...initialData,
    location: houseId ?? '',
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  useEffect(() => {
    if (houseId) {
      setFormData((prev) => ({ ...prev, location: houseId }));
    }
  }, [houseId]);

  const handleChange = (field: keyof FormData, value: string) => {
    if (locationLocked && field === 'location') return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field] || field === 'location' || field === 'guests') {
      const next = { ...formData, [field]: value };
      const newErrors = validateForm(next, isFr, locationLocked);
      setErrors((prev) => ({
        ...prev,
        [field]: newErrors[field as keyof FormErrors],
      }));
      if (field === 'location' || field === 'guests') {
        setTouched((prev) => ({ ...prev, [field]: true }));
      }
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateForm(formData, isFr, locationLocked);
    setErrors((prev) => ({
      ...prev,
      [field]: newErrors[field as keyof FormErrors],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: FormData = {
      ...formData,
      location: houseId ?? formData.location,
    };
    const allTouched = Object.keys(payload).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Partial<Record<keyof FormData, boolean>>,
    );
    setTouched(allTouched);
    const newErrors = validateForm(payload, isFr, locationLocked);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setFormData(payload);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      ...initialData,
      location: houseId ?? '',
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const successHouse = `Momo House ${houseLabel(formData.location)}`;

  if (submitted) {
    return (
      <section
        id="reserve"
        className="relative overflow-hidden py-24 md:py-32"
        style={{ backgroundColor: 'var(--charcoal)' }}
        aria-label={isFr ? 'Formulaire de contact' : 'Inquiry form'}
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div
            className="mx-auto max-w-xl px-8 py-14 text-center md:px-12"
            style={{
              border: '1px solid rgba(245,240,232,0.12)',
              background:
                'linear-gradient(160deg, rgba(245,240,232,0.04) 0%, transparent 55%)',
            }}
          >
            <div
              className="mx-auto mb-8 flex items-center justify-center"
              style={{
                width: '56px',
                height: '56px',
                border: '1px solid var(--primary)',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className="text-annotation mb-4 block"
              style={{
                color: 'var(--primary)',
                letterSpacing: '0.25em',
                fontSize: '0.55rem',
              }}
            >
              {isFr ? 'MESSAGE REÇU' : 'MESSAGE RECEIVED'}
            </span>
            <h2
              className="font-display mb-5 uppercase"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                color: 'var(--primary-foreground)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
              }}
            >
              {isFr ? 'À BIENTÔT' : 'SEE YOU'}
              <br />
              <span style={{ color: 'var(--primary)' }}>
                {isFr ? 'À TABLE.' : 'AT THE TABLE.'}
              </span>
            </h2>
            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.55)',
                marginBottom: 8,
              }}
            >
              {isFr
                ? `Merci, ${formData.name}. Demande pour ${formData.guests} convive${parseInt(formData.guests, 10) > 1 || formData.guests === '9+' ? 's' : ''} à ${successHouse}.`
                : `Thank you, ${formData.name}. Inquiry for ${formData.guests} guest${parseInt(formData.guests, 10) > 1 || formData.guests === '9+' ? 's' : ''} at ${successHouse}.`}
            </p>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.32)',
                fontStyle: 'italic',
              }}
            >
              {isFr
                ? 'Confirmation sous 24 heures.'
                : 'Confirmation within 24 hours.'}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="text-annotation mt-10"
              style={{
                color: 'rgba(245,240,232,0.4)',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {isFr ? 'NOUVELLE DEMANDE' : 'NEW INQUIRY'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reserve"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundColor: 'var(--charcoal)',
        backgroundImage:
          'radial-gradient(ellipse 70% 50% at 15% 20%, rgba(196,113,74,0.12), transparent 55%)',
      }}
      aria-label={
        isFr
          ? 'Formulaire de demande de réservation'
          : 'Reservation inquiry form'
      }
    >
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-end justify-end overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            lineHeight: 0.85,
            color: 'var(--primary-foreground)',
            opacity: 0.025,
            letterSpacing: '-0.06em',
            whiteSpace: 'nowrap',
            paddingRight: '2vw',
            paddingBottom: '2vh',
          }}
        >
          RESERVE
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-10 max-w-2xl md:mb-12">
          <span
            className="text-annotation mb-3 block"
            style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
          >
            {locationLocked
              ? lockedLocation?.fullName ?? 'MOMO HOUSE'
              : isFr
                ? 'RÉSERVATION'
                : 'RESERVATION'}
          </span>
          <h2
            className="font-display mb-4 uppercase"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.75rem)',
              color: 'var(--primary-foreground)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            {isFr ? 'RÉSERVER' : 'PLAN YOUR'}{' '}
            <span style={{ color: 'var(--primary)' }}>
              {isFr ? 'VOTRE TABLE.' : 'VISIT.'}
            </span>
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.65,
              color: 'rgba(245,240,232,0.5)',
              maxWidth: '42ch',
            }}
          >
            {locationLocked
              ? isFr
                ? `Table à Momo House ${lockedLocation?.name}. Indiquez date et nombre de convives — nous confirmons rapidement.`
                : `Table at Momo House ${lockedLocation?.name}. Share your date and party size — we confirm quickly.`
              : isFr
                ? 'Choisissez une maison, une date et le nombre de convives. Réponse sous 24h.'
                : 'Choose a house, a date, and your party size. Reply within 24h.'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative"
          style={{
            border: '1px solid rgba(245,240,232,0.12)',
            background:
              'linear-gradient(165deg, rgba(245,240,232,0.045) 0%, rgba(28,28,26,0.65) 40%, rgba(28,28,26,0.9) 100%)',
            padding: 'clamp(1.5rem, 4vw, 2.75rem)',
          }}
        >
          {!locationLocked ? (
            <div className="mb-8">
              <p style={labelStyle}>
                {isFr ? 'MAISON' : 'HOUSE'}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {locations.map((loc) => {
                  const selected = formData.location === loc.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleChange('location', loc.id)}
                      className="text-left transition-all duration-300"
                      style={{
                        minHeight: 88,
                        padding: '1rem 1.1rem',
                        border: selected
                          ? '1px solid var(--primary)'
                          : '1px solid rgba(245,240,232,0.14)',
                        backgroundColor: selected
                          ? 'rgba(196,113,74,0.14)'
                          : 'rgba(245,240,232,0.03)',
                        cursor: 'pointer',
                      }}
                      aria-pressed={selected}
                    >
                      <span
                        className="text-annotation mb-2 block"
                        style={{
                          color: selected
                            ? 'var(--primary)'
                            : 'rgba(245,240,232,0.4)',
                          fontSize: '0.5rem',
                          letterSpacing: '0.16em',
                        }}
                      >
                        MOMO HOUSE
                      </span>
                      <span
                        className="font-display block"
                        style={{
                          color: 'var(--primary-foreground)',
                          fontSize: '1.15rem',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {loc.name}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          marginTop: 6,
                          fontSize: '0.7rem',
                          color: 'rgba(245,240,232,0.4)',
                        }}
                      >
                        {loc.address}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.location ? (
                <p
                  style={{
                    marginTop: 10,
                    fontSize: '0.68rem',
                    color: '#e05a3a',
                  }}
                >
                  {errors.location}
                </p>
              ) : null}
            </div>
          ) : (
            <div
              className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              style={{
                border: '1px solid rgba(245,240,232,0.14)',
                padding: '1rem 1.15rem',
                backgroundColor: 'rgba(196,113,74,0.1)',
              }}
            >
              <div>
                <p
                  className="text-annotation mb-1"
                  style={{
                    color: 'var(--primary)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.16em',
                  }}
                >
                  {isFr ? 'MAISON FIXÉE' : 'HOUSE LOCKED'}
                </p>
                <p
                  className="font-display"
                  style={{
                    color: 'var(--primary-foreground)',
                    fontSize: '1.2rem',
                  }}
                >
                  {lockedLocation?.name}
                </p>
                <p
                  style={{
                    color: 'rgba(245,240,232,0.45)',
                    fontSize: '0.75rem',
                    marginTop: 2,
                  }}
                >
                  {lockedLocation?.address}, {lockedLocation?.arrondissement}
                </p>
              </div>
              <input type="hidden" name="location" value={houseId} />
            </div>
          )}

          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              id={`${uid}-name`}
              label="FULL NAME"
              labelFr="NOM COMPLET"
              error={errors.name}
              isFr={isFr}
            >
              <input
                id={`${uid}-name`}
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder={isFr ? 'Votre nom' : 'Your name'}
                style={{
                  ...fieldShell(Boolean(errors.name)),
                  caretColor: 'var(--primary)',
                }}
                autoComplete="name"
              />
            </Field>

            <Field
              id={`${uid}-email`}
              label="EMAIL ADDRESS"
              labelFr="ADRESSE EMAIL"
              error={errors.email}
              isFr={isFr}
            >
              <input
                id={`${uid}-email`}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder={isFr ? 'votre@email.com' : 'your@email.com'}
                style={{
                  ...fieldShell(Boolean(errors.email)),
                  caretColor: 'var(--primary)',
                }}
                autoComplete="email"
              />
            </Field>

            <Field
              id={`${uid}-date`}
              label="DINING DATE"
              labelFr="DATE DU REPAS"
              error={errors.date}
              isFr={isFr}
            >
              <DatePicker
                id={`${uid}-date`}
                value={formData.date}
                min={today}
                hasError={Boolean(errors.date)}
                isFr={isFr}
                placeholder={isFr ? 'Choisir une date' : 'Choose a date'}
                onChange={(next) => handleChange('date', next)}
                onBlur={() => handleBlur('date')}
              />
            </Field>

            <div>
              <p style={labelStyle}>
                {isFr ? 'NOMBRE DE CONVIVES' : 'NUMBER OF GUESTS'}
              </p>
              <div className="flex flex-wrap gap-2">
                {GUEST_OPTIONS.map((n) => {
                  const selected = formData.guests === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleChange('guests', n)}
                      className="text-annotation transition-all duration-200"
                      style={{
                        minWidth: 44,
                        minHeight: 44,
                        padding: '0 12px',
                        border: selected
                          ? '1px solid var(--primary)'
                          : '1px solid rgba(245,240,232,0.14)',
                        backgroundColor: selected
                          ? 'var(--primary)'
                          : 'rgba(245,240,232,0.03)',
                        color: selected
                          ? 'var(--primary-foreground)'
                          : 'rgba(245,240,232,0.7)',
                        letterSpacing: '0.08em',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                      }}
                      aria-pressed={selected}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
              {errors.guests ? (
                <p
                  style={{
                    marginTop: 8,
                    fontSize: '0.68rem',
                    color: '#e05a3a',
                  }}
                >
                  {errors.guests}
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-message`} style={labelStyle}>
                {isFr ? 'MESSAGE (OPTIONNEL)' : 'MESSAGE (OPTIONAL)'}
              </label>
              <textarea
                id={`${uid}-message`}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder={
                  isFr
                    ? 'Allergies, occasions spéciales, demandes particulières…'
                    : 'Allergies, special occasions, particular requests…'
                }
                rows={3}
                style={{
                  ...fieldShell(false),
                  resize: 'vertical',
                  minHeight: 96,
                  caretColor: 'var(--primary)',
                }}
              />
            </div>
          </div>

          <div
            className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }}
          >
            <button
              type="submit"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 px-8 py-3.5 transition-opacity duration-300 hover:opacity-90 sm:w-auto"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: '1px solid var(--primary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
              }}
            >
              <span>{isFr ? 'ENVOYER LA DEMANDE' : 'SEND INQUIRY'}</span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
            <p
              style={{
                fontSize: '0.65rem',
                color: 'rgba(245,240,232,0.35)',
                letterSpacing: '0.06em',
                lineHeight: 1.5,
              }}
            >
              {isFr
                ? 'Réponse sous 24h · Walk-ins bienvenus · Aucune carte requise'
                : 'Reply within 24h · Walk-ins welcome · No card required'}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
