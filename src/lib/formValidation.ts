// Shared validation for the quote / reservation forms (QuoteModal + ReservationPage).
// The two forms are separate components with duplicated fields (no shared form
// component exists), so both import this pure helper instead of duplicating rules.
// Validation returns error KEYS; each form maps keys to localized strings via
// t.forms.formErrors. No validation rule is invented beyond the native
// constraints the forms already declared (required, type=email, min date,
// guests 1-100): noValidate disables the browser's native checks, so they are
// re-implemented here.

export type QuoteFormData = {
  clientName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
};

export type QuoteFormField = 'clientName' | 'email' | 'phone' | 'date' | 'guests';

export type QuoteFormErrorKey = 'required' | 'emailInvalid' | 'datePast' | 'guestsRange';

export type QuoteFormErrors = Partial<Record<QuoteFormField, QuoteFormErrorKey>>;

// Field order matches the DOM order in both forms (used to focus the first
// invalid field on submit).
export const QUOTE_FORM_FIELDS: readonly QuoteFormField[] = [
  'clientName',
  'email',
  'phone',
  'date',
  'guests',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuoteForm(data: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!data.clientName.trim()) {
    errors.clientName = 'required';
  }

  if (!data.email.trim()) {
    errors.email = 'required';
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'emailInvalid';
  }

  if (!data.phone.trim()) {
    errors.phone = 'required';
  }

  if (!data.date) {
    errors.date = 'required';
  } else {
    // Replaces the native min={today} constraint, which noValidate disables.
    // Parse as local time (bare "YYYY-MM-DD" would parse as UTC and shift a day).
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${data.date}T00:00:00`);
    if (!Number.isNaN(chosen.getTime()) && chosen < today) {
      errors.date = 'datePast';
    }
  }

  if (!Number.isFinite(data.guests) || data.guests < 1 || data.guests > 100) {
    errors.guests = 'guestsRange';
  }

  return errors;
}
