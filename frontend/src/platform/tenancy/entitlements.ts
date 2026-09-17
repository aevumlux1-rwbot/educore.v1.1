import type { TenantConfig, TenantModule } from '@/types/tenant';

const PATH_MODULE_RULES: Array<{ match: RegExp; module: TenantModule }> = [
  { match: /\/finance|\/payments|\/receipts|\/invoices|\/debtors|\/treasury|\/penalties|\/accounts/, module: 'finance' },
  { match: /\/attendance/, module: 'attendance' },
  { match: /\/gradebook|\/grades/, module: 'gradebook' },
  { match: /\/assessments/, module: 'assessments' },
  { match: /\/schedule/, module: 'timetable' },
  { match: /\/admissions/, module: 'admissions' },
  { match: /\/enrollments|\/enrollment/, module: 'enrollment' },
  { match: /\/students/, module: 'student_registry' },
  { match: /\/documents/, module: 'documents' },
  { match: /\/chat|\/notifications|\/feed/, module: 'communication' },
  { match: /\/knowledge/, module: 'knowledge' },
  { match: /\/reports|\/analytics|\/audit/, module: 'reporting' },
  { match: /\/classes|\/subjects|\/academic|\/teachers|\/risk|\/approvals/, module: 'academic' },
];

export function moduleForPath(pathname: string): TenantModule | null {
  return PATH_MODULE_RULES.find((rule) => rule.match.test(pathname))?.module ?? null;
}

export function isPathEnabledForTenant(pathname: string, tenant: TenantConfig) {
  const requiredModule = moduleForPath(pathname);
  return requiredModule ? tenant.enabledModules.includes(requiredModule) : true;
}

export function isModuleEnabled(tenant: TenantConfig, module: TenantModule) {
  return tenant.enabledModules.includes(module);
}
