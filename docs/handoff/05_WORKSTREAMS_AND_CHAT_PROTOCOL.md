# 05 — WORKSTREAMS & CHAT PROTOCOL

## Divisão oficial dos chats

### Product / ERP Architecture
Escopo, processos, estados, regras, dependências e ADRs.

### Internal Frontend
Portal autenticado, shell, dashboards, forms, tables, API integration e estados UI.

### Landing / Public
Landing, páginas públicas, branding e continuidade visual para login.

### Backend
API, auth, RBAC server-side, services, audit, jobs e integrations.

### Database
Schema, migrations, constraints, índices, histórico, ledger e retenção.

### QA / Security / Release
CI, testes, regressão, segurança, staging, observabilidade e releases.

### Integrations
Pagamentos, email/SMS/WhatsApp, storage e serviços externos.

## Prompt inicial para qualquer chat

```text
Leia primeiro:
docs/handoff/README.md
docs/handoff/00_MASTER_HANDOFF.md
docs/handoff/chats/<WORKSTREAM>.md

Use o repositório LIVE como fonte de verdade.
Não altere responsabilidades de outro workstream sem registrar decisão.
Não invente regras da escola a partir dos mocks.
```

## Regra de passagem entre chats

```text
DECISION
→ IMPACTED WORKSTREAMS
→ FILES/CONTRACTS AFFECTED
→ MIGRATION/COMPATIBILITY
→ OWNER
→ STATUS
```

## Branches recomendadas

```text
feat/erp-auth-foundation
feat/erp-student-registry
feat/erp-enrollment
feat/erp-academic-core
feat/erp-finance-core
refactor/internal-shell
public/landing-experience
```
