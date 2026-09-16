# 00 — MASTER HANDOFF

## Produto

**EduCore — Multi-Tenant School ERP SaaS**

O produto deixa de ser definido como “ERP do Colégio Deus Connosco”. O **EduCore é o produto-base SaaS**. Cada instituição escolar é um **tenant** configurável. O **Colégio Deus Connosco é o primeiro tenant de referência / implementação piloto** e serve para validar branding, fluxos, permissões e módulos reais.

## Princípio central

```text
EDUCORE CORE PLATFORM
+ MULTI-TENANCY
+ TENANT CONFIGURATION
+ BRANDING / THEMING
+ MODULE ENTITLEMENTS
+ RBAC / PERMISSIONS
+ ERP DOMAINS
+ API / DATABASE / AUDIT
= SCHOOL ERP SAAS
```

Não criar uma aplicação separada para cada escola. Não duplicar código por cliente. As diferenças entre instituições devem ser resolvidas por **configuração, dados, permissões, feature flags, temas e extensões controladas**.

## Estado de verdade

- O frontend React já existe e é funcional para demonstração.
- O Colégio Deus Connosco está atualmente aplicado como identidade visual principal da demo.
- A autenticação atual é mock/local; não é autenticação de produção.
- Os dados principais são mocks; ainda não representam persistência real.
- As rotas por perfil e grande parte da UX interna já existem.
- Backend de produção: **NOT IMPLEMENTED**.
- Base de dados de produção: **NOT IMPLEMENTED**.
- Multi-tenancy de produção: **NOT IMPLEMENTED**.
- Tenant provisioning: **NOT IMPLEMENTED**.
- Billing/subscription SaaS: **NOT IMPLEMENTED**.
- Integrações reais: **NOT IMPLEMENTED**.

## Níveis de identidade

### Platform level
**EduCore** — produto SaaS, administração global, provisioning, módulos, planos, observabilidade e operações da plataforma.

### Tenant level
Ex.: **Colégio Deus Connosco** — logo, nome, cores, domínio/subdomínio, campus, ano letivo, utilizadores, módulos ativos, configurações e dados próprios.

### User level
Aluno, Encarregado, Professor, Pedagogia, Direcção, Secretaria, Finanças e futuros roles configuráveis.

## Multi-tenancy é requisito P0

A arquitetura deve assumir desde o início que existem várias instituições. Todas as entidades tenant-owned devem ter tenant scope explícito. O isolamento não pode depender apenas do frontend.

## Princípio de transformação

```text
FRONTEND EXISTENTE
→ TENANT-AWARE FRONTEND
→ DOMAIN CONTRACTS
→ TENANT-AWARE API
→ TENANT-SCOPED DATABASE
→ RBAC + ENTITLEMENTS
→ AUDIT + OBSERVABILITY
→ PROVISIONING
→ SAAS OPERATIONS
```

Migrar mock → real por domínio, preservando rotas e fluxos úteis. Não fazer big-bang.

## Prioridade

### P0 — SaaS Foundation
- tenant model;
- tenant resolution;
- tenant provisioning;
- platform admin vs tenant admin;
- autenticação real;
- RBAC/permissões tenant-scoped;
- institution/academic year/terms;
- tenant branding/config;
- module entitlements / feature flags;
- contratos API;
- audit trail;
- isolamento e segurança;
- migração progressiva de mocks.

### P1 — ERP Core
- alunos/encarregados;
- admissões/matrículas;
- turmas/disciplinas/professores;
- horários;
- presenças;
- avaliações/notas;
- obrigações/facturas/pagamentos/recibos;
- documentos;
- notificações.

### P2 — SaaS Operations + Advanced ERP
- tenant administration;
- planos/subscrições/billing da plataforma;
- quotas/limites;
- aprovações;
- risco académico;
- relatórios/analytics;
- tesouraria/devedores/multas;
- chat/comunicação;
- knowledge/content;
- integrations marketplace/adapters;
- platform analytics/support tooling.
