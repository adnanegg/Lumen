/**
 * Currency formatting utilities.
 *
 * All monetary values in Lumen are stored as integers in the smallest
 * currency unit (e.g., cents for USD). These helpers convert between
 * display format and storage format.
 */

/** Convert cents to a display string (e.g., 1999 → "$19.99") */
export function formatCurrency(
  amountInCents: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string {
  const amount = amountInCents / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Convert a decimal amount to cents (e.g., 19.99 → 1999) */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

/** Convert cents to decimal (e.g., 1999 → 19.99) */
export function fromCents(cents: number): number {
  return cents / 100;
}
