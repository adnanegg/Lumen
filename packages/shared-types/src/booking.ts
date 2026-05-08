/**
 * Booking domain types.
 * Core scheduling entity — represents an appointment or reservation.
 */

import type { AuditableEntity, CurrencyAmount, EntityId, ISODateTime } from './common';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'paid' | 'refunded' | 'partially_refunded';

export interface Booking extends AuditableEntity {
  readonly tenantId: EntityId;
  readonly serviceId: EntityId;
  readonly customerId: EntityId;
  readonly staffId: EntityId;
  readonly resourceId?: EntityId;
  readonly status: BookingStatus;
  readonly paymentStatus: PaymentStatus;
  readonly startTime: ISODateTime;
  readonly endTime: ISODateTime;
  readonly price: CurrencyAmount;
  readonly notes?: string;
  readonly cancellationReason?: string;
}

export interface BookingSummary {
  readonly id: EntityId;
  readonly serviceName: string;
  readonly customerName: string;
  readonly staffName: string;
  readonly status: BookingStatus;
  readonly startTime: ISODateTime;
  readonly endTime: ISODateTime;
}
