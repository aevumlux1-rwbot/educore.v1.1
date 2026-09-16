# CHAT BRIEF — SAAS PLATFORM / MULTI-TENANCY

## Missão

Transformar o EduCore num produto SaaS capaz de servir várias instituições com isolamento forte, configuração por tenant e operação de plataforma.

## Leia antes

- `../README.md`
- `../00_MASTER_HANDOFF.md`
- `../03_ARCHITECTURE_AND_BOUNDARIES.md`
- `../04_BACKEND_AND_DATABASE_PLAN.md`
- `../08_SAAS_MULTI_TENANCY_CORE.md`
- `../07_DECISIONS_AND_OPEN_QUESTIONS.md`

## Princípio

**EduCore é o produto. Colégio Deus Connosco é um tenant de referência.**

Não transformar decisões de um tenant em hard-code global.

## P0

1. definir tenant entity/lifecycle;
2. escolher tenant resolution strategy;
3. modelar users + memberships + active tenant;
4. separar platform roles e tenant roles;
5. definir tenant configuration schema;
6. definir branding/theme contract;
7. definir module catalog + tenant entitlements;
8. definir data-isolation strategy;
9. definir provisioning workflow;
10. definir audit/support access model.

## Entregáveis da primeira fase

- ADR de tenancy storage model;
- ADR de tenant resolution;
- ADR de membership/auth context;
- tenant lifecycle state machine;
- `TenantConfig` contract;
- `TenantBranding` contract;
- `ModuleEntitlement` contract;
- provisioning sequence;
- isolation threat model;
- migration plan para remover hard-code do Colégio Deus Connosco do core.

## Não fazer

- não criar um repositório/app por tenant;
- não duplicar rotas por escola;
- não confiar em `tenant_id` enviado pelo browser sem validação de contexto;
- não misturar Direcção do tenant com Platform Admin;
- não misturar School Finance com EduCore SaaS Billing;
- não começar billing SaaS antes da fundação de tenancy estar correta.

## Primeira pergunta de trabalho

`Qual é o menor multi-tenant core que permite criar um segundo tenant sem alterar código?`

A resposta deve orientar toda a arquitetura.
