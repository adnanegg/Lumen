/**
 * Tenant domain types.
 * A tenant represents a single business using the Lumen platform.
 */

import type { AuditableEntity, EntityId } from './common';

export type TenantStatus = 'active' | 'suspended' | 'trial' | 'cancelled';

export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';

export interface Tenant extends AuditableEntity {
  readonly name: string;
  readonly slug: string;
  readonly status: TenantStatus;
  readonly subscriptionTier: SubscriptionTier;
  readonly ownerId: EntityId;
  readonly logoUrl?: string;
  readonly timezone: string;
  readonly currency: string;
  readonly locale: string;
}

export interface TenantBranding {
  readonly tenantId: EntityId;
  readonly primaryColor?: string;
  readonly logoUrl?: string;
  readonly faviconUrl?: string;
  readonly businessName: string;
}
