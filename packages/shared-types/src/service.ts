/**
 * Service domain types.
 * A service is what a business offers (e.g., haircut, consultation, repair).
 */

import type { AuditableEntity, CurrencyAmount, EntityId } from './common';

export interface Service extends AuditableEntity {
  readonly tenantId: EntityId;
  readonly name: string;
  readonly description?: string;
  readonly durationMinutes: number;
  readonly bufferBeforeMinutes: number;
  readonly bufferAfterMinutes: number;
  readonly price: CurrencyAmount;
  readonly currency: string;
  readonly isActive: boolean;
  readonly categoryId?: EntityId;
  readonly maxBookingsPerSlot: number;
  readonly requiresResource: boolean;
}

export interface ServiceCategory extends AuditableEntity {
  readonly tenantId: EntityId;
  readonly name: string;
  readonly sortOrder: number;
}
