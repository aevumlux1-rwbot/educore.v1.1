# 03 — ARCHITECTURE & BOUNDARIES

## Alvo

```text
                 EDUCORE CONTROL PLANE
        tenants / plans / modules / provisioning
                         |
                         v
PUBLIC TENANT EXPERIENCE / LOGIN
                         |
                  AUTH + TENANT RESOLUTION
                         |
                 REACT ERP FRONTEND
                         |
              API CLIENT / QUERY LAYER
                         |
                    BACKEND API
 ├ Platform / Tenant Management
 ├ IAM / RBAC / Memberships
 ├ Academic
 ├ Students / Enrollment
 ├ Finance
 ├ Documents
 ├ Communication
 ├ Reporting
 └ Audit
                         |
         POSTGRESQL + OBJECT STORAGE
                         |
                    INTEGRATIONS
```

## Platform boundary

EduCore owns tenant lifecycle, module catalog, entitlements, platform administration, usage/health and future SaaS billing. Platform administration is not the same as a school Direcção account.

## Tenant boundary

Each institution is an isolation boundary for identity memberships, configuration, branding, ERP data and integrations.

The Colégio Deus Connosco is a tenant configuration, not a fork of the product.

## Landing / Public

The public experience can be tenant-branded. It contains no ERP authority. Custom tenant domain/subdomain may resolve tenant context before login.

## Frontend interno

Responsible for UX, forms, tables, cache/query, visualisation, API calls and interface states.

It should become tenant-aware through resolved tenant configuration/context, but it is not the authority for tenant isolation or permission enforcement.

It is not authority for balances, official grade calculations, authorization, audit, enrollment decisions or payment reconciliation.

## Backend

Authority for tenant resolution, authorization, entitlements, transactional rules, audit and consistency.

Every request touching tenant-owned data must carry a trusted tenant context derived from authenticated membership/domain/session rules, not merely a user-provided ID.

## Database

Preserves integrity, isolation and history. Tenant-owned rows are tenant-scoped. The frontend never communicates directly with the DB.

## Configuration boundary

Use configuration instead of client forks:

```text
EduCore defaults
→ plan/module entitlements
→ tenant configuration
→ tenant branding/theme
→ user role/permissions
→ UI and workflow availability
```

## Estratégia de migração

```text
hard-coded tenant/mock
→ interface/contract
→ tenant context
→ API client
→ tenant-aware backend endpoint
→ tenant-scoped persistence
→ tests/isolation checks
→ remove hard-coded/mock path
```

## Evolução recomendada no frontend

```text
src/
  platform/
    tenant/
    entitlements/
  api/
    client.ts
    contracts/
  features/
    students/
    enrollment/
    attendance/
    assessment/
    finance/
  pages/
  components/
  shared/
```

Migrar progressivamente, não em big-bang.
