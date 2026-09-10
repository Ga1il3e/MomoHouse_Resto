'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

type DatePickerProps = {
  id?: string;
  value: string; // yyyy-mm-dd
  onChange: (value: string) => void;
  onBlur?: () => void;
  min?: string; // yyyy-mm-dd
  hasError?: boolean;
  isFr?: boolean;
  placeholder?: string;
};

function parseISODate(iso: string): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDisplay(iso: string, isFr: boolean): string {
  const date = parseISODate(iso);
  if (!date) return '';
  return new Intl.DateTimeFormat(isFr ? 'fr-FR' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function monthLabel(date: Date, isFr: boolean): string {
  return new Intl.DateTimeFormat(isFr ? 'fr-FR' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function buildCalendarDays(viewMonth: Date): Date[] {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = first.getDay(); // Sun=0
  const gridStart = new Date(year, month, 1 - startOffset);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

export default function DatePicker({
  id,
  value,
  onChange,
  onBlur,
  min,
  hasError = false,
  isFr = false,
  placeholder,
}: DatePickerProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = parseISODate(value);
  const minDate = parseISODate(min ?? '') ?? startOfDay(new Date());
  const today = startOfDay(new Date());

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    () => selected ?? today,
  );

  useEffect(() => {
    const parsed = parseISODate(value);
    if (parsed) setViewMonth(parsed);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onBlur]);

  const days = buildCalendarDays(viewMonth);
  const weekdays = isFr
    ? ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const canGoPrev = (() => {
    const prevMonthEnd = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth(),
      0,
    );
    return prevMonthEnd >= minDate;
  })();

  const selectDay = (day: Date) => {
    if (startOfDay(day) < minDate) return;
    onChange(toISODate(day));
    setOpen(false);
    onBlur?.();
  };

  const display =
    formatDisplay(value, isFr) ||
    placeholder ||
    (isFr ? 'Choisir une date' : 'Choose a date');

  return (
    <div ref={rootRef} className="relative">
      <button
        id={fieldId}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left transition-colors duration-200"
        style={{
          width: '100%',
          backgroundColor: 'rgba(245,240,232,0.03)',
          border: `1px solid ${hasError ? '#e05a3a' : open ? 'var(--primary)' : 'rgba(245,240,232,0.14)'}`,
          color: value
            ? 'var(--primary-foreground)'
            : 'rgba(245,240,232,0.35)',
          fontSize: '0.9rem',
          letterSpacing: '0.03em',
          padding: '14px 16px',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span>{display}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="1"
            stroke="var(--primary)"
            strokeWidth="1.4"
          />
          <path
            d="M3 10h18M8 3v4M16 3v4"
            stroke="var(--primary)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={isFr ? 'Choisir une date' : 'Choose a date'}
          className="absolute left-0 z-50 mt-2 w-full min-w-[280px] sm:w-[320px]"
          style={{
            backgroundColor: '#1C1C1A',
            border: '1px solid rgba(245,240,232,0.16)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
            padding: '1rem',
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={!canGoPrev}
              onClick={() =>
                setViewMonth(
                  new Date(
                    viewMonth.getFullYear(),
                    viewMonth.getMonth() - 1,
                    1,
                  ),
                )
              }
              aria-label={isFr ? 'Mois précédent' : 'Previous month'}
              className="flex h-9 w-9 items-center justify-center"
              style={{
                border: '1px solid rgba(245,240,232,0.14)',
                color: canGoPrev
                  ? 'var(--primary-foreground)'
                  : 'rgba(245,240,232,0.2)',
                background: 'transparent',
                cursor: canGoPrev ? 'pointer' : 'default',
                opacity: canGoPrev ? 1 : 0.45,
              }}
            >
              ‹
            </button>
            <p
              className="font-display uppercase"
              style={{
                color: 'var(--primary-foreground)',
                fontSize: '0.95rem',
                letterSpacing: '0.04em',
              }}
            >
              {monthLabel(viewMonth, isFr)}
            </p>
            <button
              type="button"
              onClick={() =>
                setViewMonth(
                  new Date(
                    viewMonth.getFullYear(),
                    viewMonth.getMonth() + 1,
                    1,
                  ),
                )
              }
              aria-label={isFr ? 'Mois suivant' : 'Next month'}
              className="flex h-9 w-9 items-center justify-center"
              style={{
                border: '1px solid rgba(245,240,232,0.14)',
                color: 'var(--primary-foreground)',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              ›
            </button>
          </div>

          <div
            className="mb-2 grid grid-cols-7 gap-1"
            style={{ textAlign: 'center' }}
          >
            {weekdays.map((d) => (
              <span
                key={d}
                className="text-annotation py-1"
                style={{
                  color: 'rgba(245,240,232,0.35)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.12em',
                }}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const inMonth = day.getMonth() === viewMonth.getMonth();
              const disabled = startOfDay(day) < minDate;
              const isSelected = selected ? sameDay(day, selected) : false;
              const isToday = sameDay(day, today);

              return (
                <button
                  key={toISODate(day)}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className="flex aspect-square items-center justify-center transition-colors duration-150"
                  style={{
                    fontSize: '0.78rem',
                    fontVariantNumeric: 'tabular-nums',
                    border: isSelected
                      ? '1px solid var(--primary)'
                      : isToday
                        ? '1px solid rgba(196,113,74,0.45)'
                        : '1px solid transparent',
                    backgroundColor: isSelected
                      ? 'var(--primary)'
                      : 'transparent',
                    color: disabled
                      ? 'rgba(245,240,232,0.18)'
                      : isSelected
                        ? 'var(--primary-foreground)'
                        : inMonth
                          ? 'rgba(245,240,232,0.85)'
                          : 'rgba(245,240,232,0.28)',
                    cursor: disabled ? 'default' : 'pointer',
                  }}
                  aria-current={isToday ? 'date' : undefined}
                  aria-pressed={isSelected}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div
            className="mt-4 flex items-center justify-between gap-3 pt-3"
            style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }}
          >
            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
                onBlur?.();
              }}
              className="text-annotation"
              style={{
                color: 'rgba(245,240,232,0.45)',
                fontSize: '0.55rem',
                letterSpacing: '0.14em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {isFr ? 'EFFACER' : 'CLEAR'}
            </button>
            <button
              type="button"
              disabled={today < minDate}
              onClick={() => selectDay(today)}
              className="text-annotation"
              style={{
                color: today < minDate ? 'rgba(245,240,232,0.25)' : 'var(--primary)',
                fontSize: '0.55rem',
                letterSpacing: '0.14em',
                background: 'none',
                border: 'none',
                cursor: today < minDate ? 'default' : 'pointer',
                padding: 0,
              }}
            >
              {isFr ? "AUJOURD'HUI" : 'TODAY'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
