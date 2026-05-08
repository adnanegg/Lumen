/**
 * Date and time utilities.
 *
 * Thin wrappers around Intl.DateTimeFormat for consistent
 * date/time display across the platform.
 */

/** Format a date string for display (e.g., "May 8, 2026") */
export function formatDate(
  isoDate: string,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(isoDate);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
}

/** Format a time string for display (e.g., "2:30 PM") */
export function formatTime(
  isoDateTime: string,
  locale: string = 'en-US',
  use24Hour: boolean = false,
): string {
  const date = new Date(isoDateTime);

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  }).format(date);
}

/** Format a datetime for display (e.g., "May 8, 2026 at 2:30 PM") */
export function formatDateTime(
  isoDateTime: string,
  locale: string = 'en-US',
): string {
  const date = new Date(isoDateTime);

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/** Format a duration in minutes to human-readable (e.g., 90 → "1h 30m") */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/** Get a relative time string (e.g., "2 hours ago", "in 3 days") */
export function formatRelativeTime(isoDateTime: string, locale: string = 'en-US'): string {
  const date = new Date(isoDateTime);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffDays) >= 1) return rtf.format(diffDays, 'day');
  if (Math.abs(diffHours) >= 1) return rtf.format(diffHours, 'hour');
  if (Math.abs(diffMinutes) >= 1) return rtf.format(diffMinutes, 'minute');

  return rtf.format(diffSeconds, 'second');
}
