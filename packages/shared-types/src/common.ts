/**
 * Common domain primitives used across the Lumen platform.
 */

/** Branded type for UUID-based identifiers */
export type EntityId = string & { readonly __brand: unique symbol };

/** ISO 8601 date string (e.g. "2026-05-08") */
export type ISODate = string & { readonly __brand: 'ISODate' };

/** ISO 8601 datetime string (e.g. "2026-05-08T14:30:00Z") */
export type ISODateTime = string & { readonly __brand: 'ISODateTime' };

/** Currency amount in smallest unit (cents) */
export type CurrencyAmount = number & { readonly __brand: 'CurrencyAmount' };

/** Common pagination parameters */
export interface PaginationParams {
  readonly page: number;
  readonly pageSize: number;
}

/** Paginated API response wrapper */
export interface PaginatedResponse<T> {
  readonly items: readonly T[];
  readonly totalCount: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/** Standard API error response */
export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, string[]>;
}

/** Discriminated union for operation results */
export type Result<T, E = ApiError> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

/** Base entity with audit fields */
export interface AuditableEntity {
  readonly id: EntityId;
  readonly createdAt: ISODateTime;
  readonly updatedAt: ISODateTime;
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc';

/** Generic sort parameter */
export interface SortParam {
  readonly field: string;
  readonly direction: SortDirection;
}
