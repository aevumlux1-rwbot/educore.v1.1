# 08 — SAAS MULTI-TENANCY CORE

## Product model

EduCore is a **multi-tenant School ERP SaaS**.

```text
Platform: EduCore
  ├─ Tenant A: Colégio Deus Connosco
  ├─ Tenant B: Escola X
  ├─ Tenant C: Escola Y
  └─ ...
```

A tenant is an institution/customer boundary. Each tenant has its own configuration, users, roles, branding, academic structure, financial data and operational records.

## Mandatory SaaS boundaries

### Platform scope
Owned by EduCore operations:
- tenants;
- tenant lifecycle;
- plans/subscriptions;
- module catalog;
- platform admins/support;
- platform-level feature flags;
- usage/quotas;
- platform audit/observability;
- deployment/versioning;
- EduCore corporate/marketing website.

### Tenant scope
Owned by a school/institution:
- institution profile;
- branding;
- **public landing/site experience**;
- campuses;
- academic years and terms;
- students/guardians/staff;
- classes/subjects;
- attendance;
- assessments/grades;
- finance;
- documents;
- communication;
- tenant users/roles/permissions;
- tenant integrations/configuration.

## Tenant identity and routing

Candidate resolution strategies:

1. subdomain: `colegio-x.educore.app`;
2. custom domain: `portal.colegio-x.co.mz`;
3. tenant selector after platform login;
4. combination of the above.

The chosen strategy must be formalized in an ADR. Tenant identity must never be trusted solely from a client-supplied `tenant_id`.

## Data isolation

Default recommendation: shared PostgreSQL database with **shared schema + explicit `tenant_id`** for tenant-owned rows, combined with strict server-side authorization and database-level safeguards where practical.

Alternatives such as schema-per-tenant or database-per-tenant may be evaluated for enterprise/compliance tiers later.

Rules:
- every tenant-owned aggregate has tenant scope;
- all queries are tenant-scoped by server context;
- unique constraints that are tenant-specific include tenant scope;
- foreign keys must not allow cross-tenant relationships;
- background jobs carry immutable tenant context;
- audit events record tenant, actor and request context;
- object-storage paths/policies are tenant-scoped;
- caches and queues include tenant namespace.

## Platform roles vs tenant roles

### Platform roles
Examples:
- platform_owner;
- platform_admin;
- support_agent;
- billing_operator.

Platform roles do not automatically grant access to tenant educational data. Support access should be explicit, time-bound and audited when introduced.

### Tenant roles
Initial product roles:
- student;
- guardian;
- teacher;
- pedagogy;
- executive;
- secretary;
- finance.

Future design should support configurable role-permission mappings without making every role fully arbitrary in V1.

## Tenant configuration

A tenant configuration layer should support at minimum:

```text
identity
  name
  legal/display name
  logo/mark/favicon
  primary/secondary/accent colors
  locale/timezone/currency

public_site
  enabled
  domain/subdomain
  theme
  navigation
  hero/media
  section configuration
  public pages
  CTA links
  SEO metadata

academic
  active academic year
  terms/semesters
  grading model reference
  attendance rules reference

modules
  academic enabled
  finance enabled
  communication enabled
  knowledge enabled
  admissions enabled
  ...

experience
  enabled roles
  navigation policy
  feature flags

integrations
  payment provider config reference
  email/SMS/WhatsApp config reference
  storage config reference
```

Secrets must not live directly in tenant-readable configuration records.

## Branding architecture

The current Colégio Deus Connosco branding must be refactored from hard-coded product identity into a **tenant theme**.

Desired hierarchy:

```text
EduCore default design tokens
→ TenantTheme override
→ semantic UI tokens
→ components
```

Brand overrides must not replace semantic colors such as error/success/warning indiscriminately.

### Public landing belongs to branding

The tenant landing is part of the tenant's **branding/public-experience layer**, not an ERP business module.

```text
EduCore corporate site
≠ tenant public landing
≠ tenant authenticated ERP portal
```

The current Colégio Deus Connosco landing is the reference implementation for this layer. The target is to migrate its hard-coded school identity/content into tenant configuration progressively.

V1 should favor controlled public-page templates/sections over a fully open website builder. A tenant may enable/disable its public site, use a custom domain and configure approved content/media without forking the codebase.

## Module catalog / entitlements

EduCore should be modular. A school may not license or use every ERP module.

Potential module keys:
- student_registry;
- admissions;
- enrollment;
- academic;
- timetable;
- attendance;
- assessments;
- gradebook;
- finance;
- treasury;
- documents;
- communication;
- knowledge;
- reporting;
- advanced_analytics.

The frontend may hide unavailable modules for UX, but the backend must enforce entitlements.

The public landing itself should not be confused with the operational module catalog; it is a tenant branding/public-experience capability.

## Tenant provisioning

V1 provisioning target:

```text
create tenant
→ assign slug/domain
→ create base tenant config
→ apply plan/module entitlements
→ create first tenant admin
→ create academic-year baseline
→ upload branding
→ configure optional public site
→ verify isolation
→ activate tenant
```

Provisioning should become idempotent and automated before scale.

## SaaS control plane

EduCore needs a control plane distinct from the school ERP experience.

Future platform console capabilities:
- tenant list/status;
- create/suspend/reactivate tenant;
- plan and module assignments;
- usage and health;
- domain verification;
- tenant admin bootstrap;
- configuration/version status;
- safe support tools;
- audit events.

This control plane is **not** the same thing as the Direcção role inside a tenant.

## SaaS billing

School finance and SaaS billing are different domains.

- **School Finance** = fees, invoices, payments and receipts belonging to students/guardians inside a tenant.
- **EduCore Billing** = subscription/contract between EduCore and the institution.

Do not mix these ledgers or permissions.

## Migration from current demo

Phase 1:
- introduce `TenantContext` in frontend;
- move Colégio Deus Connosco identity into tenant config;
- move public landing branding/content toward tenant config;
- keep existing routes stable.

Phase 2:
- create tenant-aware API contracts;
- auth session resolves memberships + active tenant;
- module entitlements and tenant permissions.

Phase 3:
- tenant-scoped persistence domain by domain;
- remove hard-coded institution assumptions.

Phase 4:
- platform control plane;
- provisioning automation;
- custom domains;
- SaaS plans/quotas/billing as required.

## Non-negotiable rules

- no code fork per school;
- no database query without tenant scope for tenant data;
- no frontend-only tenant isolation;
- no tenant branding hard-coded into core components;
- no separate landing application per tenant;
- no ERP business rules inside public landing pages;
- no mixing school finance with EduCore subscription billing;
- no support impersonation without audit and explicit controls;
- no custom-client feature that bypasses the module/config architecture without an ADR.
