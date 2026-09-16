# CHAT BRIEF — LANDING / PUBLIC BRANDING

## Mission

The landing/public experience belongs to the **tenant branding layer**, not to the ERP core.

EduCore remains the SaaS product. Each school tenant may have its own public experience using the same platform foundation.

## Model

```text
EduCore platform marketing site
  ≠
Tenant public landing
  ≠
Tenant authenticated ERP portal
```

### EduCore marketing site
Owned by the EduCore SaaS/platform team. Explains the product, plans, modules and onboarding.

### Tenant public landing
Owned by the institution/tenant experience. It may use tenant branding, photography, content, navigation and public calls-to-action. Example: Colégio Deus Connosco public site.

### Tenant ERP portal
Authenticated operational product. Uses tenant branding but preserves the shared EduCore application architecture and module rules.

## Landing as branding configuration

The tenant public experience should be driven by configuration/content instead of a code fork per school.

Possible tenant public configuration:

```text
public_site
  enabled
  domain/subdomain
  theme
  logo/mark/favicon
  typography policy
  navigation
  hero content/media
  section configuration
  public pages
  CTA configuration
  contact/application links
  SEO metadata
```

The exact level of page-builder flexibility is an ADR/product decision. V1 should prefer controlled templates/sections over an unrestricted website builder.

## Focus

- institutional branding;
- real/validated photography;
- tenant theme;
- responsive composition;
- performance;
- accessibility;
- SEO/public metadata;
- clear transition `Landing → Login → role → ERP`;
- tenant-specific public content only when validated.

## Rules

- no hard-coded school identity inside EduCore core components;
- no separate React application per school;
- no invented claims, statistics, fees, contacts or campaigns;
- no ERP business rules in the landing;
- no direct database access from public pages;
- public forms must use backend APIs and tenant context;
- tenant landing customisation must not bypass platform security or module boundaries.

## Colégio Deus Connosco

The current landing is the **reference implementation of the tenant branding/public-experience layer**. It should become data/config driven progressively rather than remaining a special-case implementation.

## First deliverable for this workstream

Audit the current Deus Connosco landing and map:

```text
hard-coded tenant identity
→ tenant branding token/config

hard-coded public content
→ tenant content/config

public route/action
→ tenant-aware API or destination
```

Then keep only the minimum code that is truly shared across all tenant public experiences.
