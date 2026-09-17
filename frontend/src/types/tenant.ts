import type { UserRole } from '@/types/roles';

export type TenantStatus = 'draft' | 'active' | 'suspended';
export type TenantExperiencePreset = 'editorial' | 'institutional' | 'modern';

export type TenantModule =
  | 'student_registry'
  | 'admissions'
  | 'enrollment'
  | 'academic'
  | 'timetable'
  | 'attendance'
  | 'assessments'
  | 'gradebook'
  | 'finance'
  | 'treasury'
  | 'documents'
  | 'communication'
  | 'knowledge'
  | 'reporting'
  | 'commerce';

export interface TenantBranding {
  displayName: string;
  shortName: string;
  descriptor?: string;
  logo?: string;
  mark?: string;
  favicon?: string;
  primaryHsl: string;
  accentHsl: string;
  sidebarHsl: string;
  experiencePreset: TenantExperiencePreset;
}

export interface TenantPublicExperience {
  landingEnabled: boolean;
  applicationsEnabled: boolean;
  commerceEnabled: boolean;
  poweredByEduCore: boolean;
}

export interface TenantConfig {
  id: string;
  slug: string;
  status: TenantStatus;
  legalName: string;
  countryCode: string;
  locale: string;
  timezone: string;
  currency: string;
  branding: TenantBranding;
  enabledRoles: UserRole[];
  enabledModules: TenantModule[];
  publicExperience: TenantPublicExperience;
  createdAt: string;
}

export interface CreateTenantInput {
  legalName: string;
  displayName: string;
  shortName?: string;
  slug: string;
  primaryHsl?: string;
  accentHsl?: string;
  experiencePreset?: TenantExperiencePreset;
}
