/**
 * User domain types.
 * Users are platform-level accounts (business owners, staff, admins).
 */

import type { AuditableEntity, EntityId } from './common';

export type UserRole = 'platform_admin' | 'owner' | 'manager' | 'staff';

export interface User extends AuditableEntity {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: UserRole;
  readonly tenantId?: EntityId;
  readonly avatarUrl?: string;
  readonly isEmailVerified: boolean;
  readonly lastLoginAt?: string;
}

export interface UserProfile {
  readonly userId: EntityId;
  readonly phone?: string;
  readonly bio?: string;
  readonly timezone?: string;
  readonly locale?: string;
}
