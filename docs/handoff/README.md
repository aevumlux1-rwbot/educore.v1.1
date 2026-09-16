# EDUCORE — MULTI-TENANT SCHOOL ERP SAAS — HANDOFF V2

**Data:** 2026-09-16  
**Repositório:** `rightware-corporations/eudcore`  
**Branch de referência:** `presentation/colegio-deus-connosco`

## Objetivo

Este handoff é a fonte de continuidade do **EduCore como produto SaaS multi-tenant**.

O **Colégio Deus Connosco não é o produto-base**. É o primeiro tenant de referência, usado para validar identidade, fluxos, módulos e operação real da plataforma.

Cada novo chat/workstream deve começar por este `README.md`, depois pelo `00_MASTER_HANDOFF.md`, pelo `08_SAAS_MULTI_TENANCY_CORE.md` e pelo ficheiro específico em `chats/`.

## Regra principal

A prioridade passa a ser construir o **core do EduCore** para suportar várias instituições sem duplicação de código.

As diferenças por escola devem ser tratadas com:
- tenant configuration;
- branding/theming;
- módulos ativos;
- feature flags/entitlements;
- permissões;
- dados tenant-scoped;
- integrações configuráveis;
- extensões controladas.

A landing do Colégio Deus Connosco continua no projeto como implementação pública de um tenant e deixa de definir a arquitetura global do produto.

## Ordem de leitura

1. `00_MASTER_HANDOFF.md`
2. `01_CURRENT_SYSTEM.md`
3. `02_ERP_SCOPE_AND_MODULES.md`
4. `03_ARCHITECTURE_AND_BOUNDARIES.md`
5. `04_BACKEND_AND_DATABASE_PLAN.md`
6. `05_WORKSTREAMS_AND_CHAT_PROTOCOL.md`
7. `06_QA_SECURITY_RELEASE.md`
8. `07_DECISIONS_AND_OPEN_QUESTIONS.md`
9. `08_SAAS_MULTI_TENANCY_CORE.md`
10. ficheiro correspondente em `chats/`
