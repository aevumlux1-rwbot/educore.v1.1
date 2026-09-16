# 05 — WORKSTREAMS & CHAT PROTOCOL

## Divisão oficial dos chats

### SaaS Platform / Multi-Tenancy
Tenant model, provisioning, platform admin, entitlements, tenant config, domains, isolation, SaaS billing boundaries.

### Product / ERP Architecture
Escopo, processos, estados, regras, dependências e ADRs dos módulos ERP.

### Internal Frontend
Portal autenticado, shell, dashboards, forms, tables, tenant context, API integration e estados UI.

### Landing / Public
Landing, páginas públicas, tenant branding e continuidade visual para login.

### Backend
API, auth, tenant resolution, RBAC server-side, entitlements, services, audit, jobs e integrations.

### Database
Schema, tenant isolation, migrations, constraints, índices, histórico, ledger e retenção.

### QA / Security / Release
CI, testes, regressão, tenant-isolation tests, segurança, staging, observabilidade e releases.

### Integrations
Pagamentos, email/SMS/WhatsApp, storage e serviços externos por adapters/config tenant-aware.

## Prompt inicial para qualquer chat

```text
Leia primeiro:
docs/handoff/README.md
docs/handoff/00_MASTER_HANDOFF.md
docs/handoff/08_SAAS_MULTI_TENANCY_CORE.md
docs/handoff/chats/<WORKSTREAM>.md

Use o repositório LIVE como fonte de verdade.
EduCore é o produto SaaS; Colégio Deus Connosco é um tenant de referência.
Não altere responsabilidades de outro workstream sem registrar decisão.
Não invente regras de uma escola a partir dos mocks.
Não introduza lógica client-specific como fork do core sem ADR.
```

## Regra de passagem entre chats

```text
DECISION
→ SCOPE: PLATFORM ou TENANT
→ IMPACTED WORKSTREAMS
→ FILES/CONTRACTS AFFECTED
→ MIGRATION/COMPATIBILITY
→ SECURITY/ISOLATION IMPACT
→ OWNER
→ STATUS
```

## Branches recomendadas

```text
feat/saas-tenant-foundation
feat/saas-provisioning
feat/erp-auth-foundation
feat/erp-student-registry
feat/erp-enrollment
feat/erp-academic-core
feat/erp-finance-core
refactor/internal-shell
public/tenant-landing-experience
```

## Regra estrutural

Não criar branches por cliente como estratégia permanente. Branding e comportamento específicos de uma instituição devem entrar via tenant config, entitlements, permissions ou extension point aprovado.
