'use client';

import React, { useState, useId } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

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

function validateForm(data: FormData, isFr: boolean): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = isFr ? 'Votre nom est requis' : 'Your name is required';
  }
  if (!data.email.trim()) {
    errors.email = isFr ? 'Votre email est requis' : 'Your email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = isFr ? 'Adresse email invalide' : 'Invalid email address';
  }
  if (!data.location) {
    errors.location = isFr ? 'Veuillez choisir une maison' : 'Please choose a house';
  }
  if (!data.date) {
    errors.date = isFr ? 'Veuillez choisir une date' : 'Please choose a date';
  }
  if (!data.guests) {
    errors.guests = isFr ? 'Veuillez indiquer le nombre de convives' : 'Please indicate guest count';
  }
  return errors;
}

const inputBase: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(245,240,232,0.15)',
  color: 'var(--primary-foreground)',
  fontSize: '0.85rem',
  letterSpacing: '0.04em',
  padding: '12px 0',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.3s ease',
};

const labelBase: React.CSSProperties = {
  display: 'block',
  fontSize: '0.5rem',
  letterSpacing: '0.25em',
  color: 'var(--primary)',
  marginBottom: '6px',
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
      <label htmlFor={id} style={labelBase}>
        {isFr ? labelFr : label}
        {error && (
          <span style={{ color: '#e05a3a', marginLeft: '8px', fontStyle: 'italic', letterSpacing: '0.1em' }}>
            — {error}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function InquiryForm() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const isFr = language === 'fr';
  const uid = useId();

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...formData, [field]: value }, isFr);
      setErrors(prev => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validateForm(formData, isFr);
    setErrors(prev => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Partial<Record<keyof FormData, boolean>>
    );
    setTouched(allTouched);
    const newErrors = validateForm(formData, isFr);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const focusStyle = (field: keyof FormErrors): React.CSSProperties => ({
    ...inputBase,
    borderBottomColor: errors[field] ? '#e05a3a' : 'rgba(245,240,232,0.15)',
  });

  if (submitted) {
    return (
      <section
        className="relative py-24 md:py-36 overflow-hidden"
        style={{ backgroundColor: 'var(--charcoal)' }}
        aria-label={isFr ? 'Formulaire de contact' : 'Inquiry form'}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success icon */}
            <div
              className="mx-auto mb-10 flex items-center justify-center"
              style={{
                width: '64px',
                height: '64px',
                border: '1px solid var(--primary)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <span
              className="text-annotation block mb-4"
              style={{ color: 'var(--primary)', letterSpacing: '0.25em', fontSize: '0.55rem' }}
            >
              {isFr ? 'MESSAGE REÇU' : 'MESSAGE RECEIVED'}
            </span>

            <h2
              className="font-display uppercase mb-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: 'var(--primary-foreground)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
              }}
            >
              {isFr ? 'À BIENTÔT' : 'SEE YOU'}
              <br />
              <span style={{ color: 'var(--primary)' }}>{isFr ? 'À TABLE.' : 'AT THE TABLE.'}</span>
            </h2>

            <p
              style={{
                fontSize: '0.82rem',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.55)',
                letterSpacing: '0.02em',
                marginBottom: '8px',
              }}
            >
              {isFr
                ? `Merci, ${formData.name}. Nous avons bien reçu votre demande pour ${formData.guests} convive${parseInt(formData.guests) > 1 ? 's' : ''} à Momo House ${formData.location === 'montmartre' ? 'Montmartre' : 'Poissonnière'}.`
                : `Thank you, ${formData.name}. We've received your inquiry for ${formData.guests} guest${parseInt(formData.guests) > 1 ? 's' : ''} at Momo House ${formData.location === 'montmartre' ? 'Montmartre' : 'Poissonnière'}.`}
            </p>
            <p
              style={{
                fontSize: '0.72rem',
                lineHeight: 1.6,
                color: 'rgba(245,240,232,0.3)',
                letterSpacing: '0.02em',
                fontStyle: 'italic',
              }}
            >
              {isFr
                ? 'Notre équipe vous contactera dans les 24 heures pour confirmer votre réservation.' :'Our team will be in touch within 24 hours to confirm your reservation.'}
            </p>

            <button
              onClick={handleReset}
              className="mt-10 text-annotation transition-all duration-300"
              style={{
                color: 'rgba(245,240,232,0.35)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {isFr ? 'ENVOYER UNE AUTRE DEMANDE' : 'SEND ANOTHER INQUIRY'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--charcoal)' }}
      aria-label={isFr ? 'Formulaire de demande de réservation' : 'Reservation inquiry form'}
    >
      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(6rem, 22vw, 20rem)',
            lineHeight: 0.85,
            color: 'var(--primary-foreground)',
            opacity: 0.018,
            letterSpacing: '-0.06em',
            whiteSpace: 'nowrap',
            paddingRight: '2vw',
          }}
        >
          RESERVE
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 items-start">
          {/* Left — heading column */}
          <div className="md:col-span-5">
            <span
              className="text-annotation block mb-4"
              style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
            >
              {isFr ? 'NOUS CONTACTER' : 'GET IN TOUCH'}
            </span>
            <h2
              className="font-display uppercase mb-8"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 7rem)',
                color: 'var(--primary-foreground)',
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
              }}
            >
              {isFr ? 'RÉSERVER' : 'PLAN YOUR'}
              <br />
              <span style={{ color: 'var(--primary)' }}>{isFr ? 'VOTRE TABLE.' : 'VISIT.'}</span>
            </h2>

            <p
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.75,
                color: 'rgba(245,240,232,0.45)',
                letterSpacing: '0.02em',
                maxWidth: '340px',
              }}
            >
              {isFr
                ? 'Dites-nous quand vous souhaitez venir, combien vous serez, et quelle maison vous attire. Nous nous occupons du reste.' :'Tell us when you\'d like to come, how many you\'ll be, and which house calls to you. We\'ll take care of the rest.'}
            </p>

            {/* Bilingual note */}
            <div
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }}
            >
              <p
                style={{
                  fontSize: '0.62rem',
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.25)',
                  letterSpacing: '0.08em',
                  fontStyle: 'italic',
                }}
              >
                {isFr
                  ? 'Walk-ins bienvenus. Réservation recommandée pour le service du soir.' :'Walk-ins welcome. Reservations recommended for dinner service.'}
              </p>
              <p
                style={{
                  fontSize: '0.58rem',
                  lineHeight: 1.6,
                  color: 'rgba(245,240,232,0.15)',
                  letterSpacing: '0.06em',
                  fontStyle: 'italic',
                  marginTop: '4px',
                }}
              >
                {isFr
                  ? 'Walk-ins welcome. Reservations recommended for dinner service.'
                  : 'Walk-ins bienvenus. Réservation recommandée pour le service du soir.'}
              </p>
            </div>
          </div>

          {/* Right — form column */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                {/* Name */}
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
                    onChange={e => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder={isFr ? 'Votre nom' : 'Your name'}
                    style={{
                      ...focusStyle('name'),
                      caretColor: 'var(--primary)',
                    }}
                    autoComplete="name"
                  />
                </Field>

                {/* Email */}
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
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder={isFr ? 'votre@email.com' : 'your@email.com'}
                    style={{
                      ...focusStyle('email'),
                      caretColor: 'var(--primary)',
                    }}
                    autoComplete="email"
                  />
                </Field>

                {/* Location preference */}
                <Field
                  id={`${uid}-location`}
                  label="LOCATION PREFERENCE"
                  labelFr="MAISON PRÉFÉRÉE"
                  error={errors.location}
                  isFr={isFr}
                >
                  <select
                    id={`${uid}-location`}
                    value={formData.location}
                    onChange={e => handleChange('location', e.target.value)}
                    onBlur={() => handleBlur('location')}
                    style={{
                      ...focusStyle('location'),
                      appearance: 'none',
                      cursor: 'pointer',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(245,240,232,0.3)' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 4px center',
                      paddingRight: '24px',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a' }}>
                      {isFr ? 'Choisir une maison' : 'Choose a house'}
                    </option>
                    <option value="montmartre" style={{ backgroundColor: '#1a1a1a' }}>
                      {isFr ? 'Montmartre — 2e arrondissement' : 'Montmartre — 2nd arrondissement'}
                    </option>
                    <option value="poissonniere" style={{ backgroundColor: '#1a1a1a' }}>
                      {isFr ? 'Poissonnière — 10e arrondissement' : 'Poissonnière — 10th arrondissement'}
                    </option>
                    <option value="no-preference" style={{ backgroundColor: '#1a1a1a' }}>
                      {isFr ? 'Sans préférence' : 'No preference'}
                    </option>
                  </select>
                </Field>

                {/* Dining date */}
                <Field
                  id={`${uid}-date`}
                  label="DINING DATE"
                  labelFr="DATE DU REPAS"
                  error={errors.date}
                  isFr={isFr}
                >
                  <input
                    id={`${uid}-date`}
                    type="date"
                    value={formData.date}
                    onChange={e => handleChange('date', e.target.value)}
                    onBlur={() => handleBlur('date')}
                    style={{
                      ...focusStyle('date'),
                      colorScheme: 'dark',
                      caretColor: 'var(--primary)',
                    }}
                  />
                </Field>

                {/* Guest count */}
                <Field
                  id={`${uid}-guests`}
                  label="NUMBER OF GUESTS"
                  labelFr="NOMBRE DE CONVIVES"
                  error={errors.guests}
                  isFr={isFr}
                >
                  <select
                    id={`${uid}-guests`}
                    value={formData.guests}
                    onChange={e => handleChange('guests', e.target.value)}
                    onBlur={() => handleBlur('guests')}
                    style={{
                      ...focusStyle('guests'),
                      appearance: 'none',
                      cursor: 'pointer',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(245,240,232,0.3)' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 4px center',
                      paddingRight: '24px',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a' }}>
                      {isFr ? 'Nombre de convives' : 'Number of guests'}
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={String(n)} style={{ backgroundColor: '#1a1a1a' }}>
                        {n} {isFr ? (n === 1 ? 'convive' : 'convives') : (n === 1 ? 'guest' : 'guests')}
                      </option>
                    ))}
                    <option value="9+" style={{ backgroundColor: '#1a1a1a' }}>
                      {isFr ? '9+ convives (groupe)' : '9+ guests (group)'}
                    </option>
                  </select>
                </Field>

                {/* Message — full width */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor={`${uid}-message`}
                    style={labelBase}
                  >
                    {isFr ? 'MESSAGE (OPTIONNEL)' : 'MESSAGE (OPTIONAL)'}
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    value={formData.message}
                    onChange={e => handleChange('message', e.target.value)}
                    placeholder={isFr ? 'Allergies, occasions spéciales, demandes particulières…' : 'Allergies, special occasions, particular requests…'}
                    rows={3}
                    style={{
                      ...inputBase,
                      resize: 'none',
                      caretColor: 'var(--primary)',
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4" style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }}>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    padding: '14px 32px',
                    border: '1px solid var(--primary)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
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
                    fontSize: '0.55rem',
                    color: 'rgba(245,240,232,0.25)',
                    letterSpacing: '0.08em',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  {isFr
                    ? 'Réponse sous 24h · Aucune carte bancaire requise' :'Response within 24h · No card required'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
