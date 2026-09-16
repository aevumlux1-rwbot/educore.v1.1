# 03 — ARCHITECTURE & BOUNDARIES

## Alvo

```text
LANDING/PUBLIC
    |
AUTH
    |
REACT ERP FRONTEND
    |
API CLIENT / QUERY LAYER
    |
BACKEND API
 ├ IAM/RBAC
 ├ Academic
 ├ Students/Enrollment
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

## Landing
Marketing/institucional. Não contém regras do ERP.

## Frontend interno
Responsável por UX, forms, tables, cache/query, visualização, chamadas API e estados de interface.

Não é autoridade para saldo financeiro, cálculo oficial de nota, autorização, auditoria, matrícula ou reconciliação.

## Backend
Autoridade sobre regras transacionais, autorização, auditoria e consistência.

## Database
Preserva integridade e histórico. O frontend nunca comunica diretamente com a DB.

## Estratégia de migração

```text
mock existente
→ interface/contract
→ API client
→ backend endpoint
→ persistência
→ testes
→ remover mock do fluxo
```

## Evolução recomendada no frontend

```text
src/
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
