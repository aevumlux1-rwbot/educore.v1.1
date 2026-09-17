# 13 — TENANT FOUNDATION V1 — EXECUTION

## Objective

Close the tenant foundation quickly enough to support multiple school presentations without forking the EduCore project.

EduCore remains the product. Colégio Deus Connosco is the first reference tenant.

## Implemented in `feat/saas-tenant-foundation`

- tenant domain types;
- reference tenant configuration for Colégio Deus Connosco;
- tenant registry/context with preview persistence;
- active tenant resolution;
- tenant branding/theme application;
- visual experience presets (`editorial`, `institutional`, `modern`);
- module entitlements;
- route-level module blocking in the current frontend shell;
- tenant-aware shared brand components;
- tenant-aware generic public landing for new tenants;
- tenant-aware generic login for new tenants;
- preserved custom Colégio Deus Connosco landing/login as its reference tenant experience;
- EduCore attribution surfaced in tenant experiences;
- platform Super Admin console at `/platform`;
- tenant creation, activation/suspension, module toggles and tenant switching from the platform console.

## Current MVP boundary

The tenant registry is persisted in browser storage for the current presentation MVP. This is an adapter-level temporary persistence choice, not the production source of truth.

Production migration target:

```text
Platform Console
→ Platform API
→ Tenant Service
→ PostgreSQL
```

The UI/domain model should survive that migration.

## Super Admin security boundary

`/platform` is currently a presentation/control-plane preview and MUST NOT be treated as production-secure authentication.

Before production:

- platform IAM must be separate from tenant roles;
- platform super-admin authorization must be server-side;
- tenant creation/update must be API-backed and audited;
- support/impersonation must be explicit and audited;
- no tenant user can gain platform privileges through tenant role assignment.

## Distinct tenant experiences

Tenant differentiation must not be reduced to logo/color replacement.

Allowed tenant-level differences include:

- brand assets;
- typography/theme tokens;
- experience preset/layout density;
- public landing composition/content;
- enabled roles;
- enabled modules;
- navigation policy;
- tenant-specific configuration;
- module-level feature flags;
- approved extension points.

Forbidden strategy:

- code fork per school;
- hard-coded `if school === X` business logic;
- copied project directories per tenant.

A specialized reference experience may exist temporarily (for example the current Colégio Deus Connosco public landing), but long-term differentiation must be configuration/extension driven.

## Today: adding another school

1. Pull `feat/saas-tenant-foundation`.
2. Run the frontend.
3. Open `/platform`.
4. Create the institution tenant.
5. Choose a distinct experience preset and brand HSL values.
6. Disable modules not relevant to that presentation.
7. Open the tenant from the Super Admin console.
8. Verify landing → login → role portal.
9. Add the new school's real assets/content once provided; do not reuse Colégio Deus Connosco photography/claims.

## Next production tasks

P0:

1. replace preview tenant persistence with `TenantRepository` contract + API adapter;
2. introduce real platform IAM and `PlatformRole` separate from `UserRole`;
3. move tenant resolution to domain/subdomain/server context;
4. apply entitlements to navigation and server authorization;
5. create tenant branding/content configuration model;
6. create audit events for platform operations;
7. keep the functional ERP MVP workstream moving in parallel.

## Release rule

Do not delay the functional ERP MVP to build the complete SaaS control plane. Tenant Foundation V1 exists to unblock multi-school presentation and correct architectural direction; deeper SaaS infrastructure follows incrementally.
