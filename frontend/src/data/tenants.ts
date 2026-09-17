import schoolLogo from '@/assets/brand/colegio-deus-connosco-logo.png';
import schoolMark from '@/assets/brand/colegio-deus-connosco-mark.png';
import { PASCOA_LOGO } from '@/tenants/colegio-pascoa/media/pascoa_logo';
import type { TenantConfig, TenantModule } from '@/types/tenant';
import type { UserRole } from '@/types/roles';

export const ALL_TENANT_ROLES: UserRole[] = [
  'student',
  'guardian',
  'teacher',
  'pedagogy',
  'executive',
  'secretary',
  'finance',
];

export const CORE_TENANT_MODULES: TenantModule[] = [
  'student_registry',
  'admissions',
  'enrollment',
  'academic',
  'timetable',
  'attendance',
  'assessments',
  'gradebook',
  'finance',
  'treasury',
  'documents',
  'communication',
  'knowledge',
  'reporting',
];

export const DEFAULT_TENANTS: TenantConfig[] = [
  {
    id: 'tenant-cdc-001',
    slug: 'colegio-deus-connosco',
    status: 'active',
    legalName: 'Colégio Deus Connosco',
    countryCode: 'MZ',
    locale: 'pt-MZ',
    timezone: 'Africa/Maputo',
    currency: 'MZN',
    branding: {
      displayName: 'Colégio Deus Connosco',
      shortName: 'Deus Connosco',
      descriptor: 'Colégio',
      logo: schoolLogo,
      mark: schoolMark,
      favicon: schoolMark,
      primaryHsl: '213 78% 20%',
      accentHsl: '28 91% 54%',
      sidebarHsl: '213 78% 20%',
      experiencePreset: 'editorial',
    },
    enabledRoles: ALL_TENANT_ROLES,
    enabledModules: CORE_TENANT_MODULES,
    publicExperience: {
      landingEnabled: true,
      applicationsEnabled: true,
      commerceEnabled: false,
      poweredByEduCore: true,
    },
    createdAt: '2026-09-16T00:00:00.000Z',
  },
  {
    id: 'tenant-pascoa-002',
    slug: 'colegio-pascoa',
    status: 'active',
    legalName: 'Colégio Páscoa',
    countryCode: 'MZ',
    locale: 'pt-MZ',
    timezone: 'Africa/Maputo',
    currency: 'MZN',
    branding: {
      displayName: 'Colégio Páscoa',
      shortName: 'Páscoa',
      descriptor: 'Colégio',
      logo: PASCOA_LOGO,
      mark: PASCOA_LOGO,
      favicon: PASCOA_LOGO,
      primaryHsl: '158 100% 30%',
      accentHsl: '355 100% 45%',
      sidebarHsl: '158 63% 20%',
      experiencePreset: 'modern',
    },
    enabledRoles: ALL_TENANT_ROLES,
    enabledModules: CORE_TENANT_MODULES,
    publicExperience: {
      landingEnabled: true,
      applicationsEnabled: true,
      commerceEnabled: false,
      poweredByEduCore: true,
    },
    createdAt: '2026-09-17T00:00:00.000Z',
  },
];
