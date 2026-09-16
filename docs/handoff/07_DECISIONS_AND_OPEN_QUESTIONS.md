# 07 — DECISIONS & OPEN QUESTIONS

## Decisões firmes

- **Produto-base: EduCore.**
- **Modelo: SaaS multi-tenant.**
- **Colégio Deus Connosco: primeiro tenant de referência/piloto, não o core do produto.**
- Não haverá code fork por escola como estratégia normal.
- Branding, módulos e diferenças por instituição devem vir de tenant configuration, entitlements, permissions e extension points controlados.
- Sete contextos atuais de acesso do tenant: Aluno, Encarregado, Professor, Pedagogia, Direcção, Secretaria e Finanças.
- Landing deixa de ser prioridade principal.
- Frontend interno existente é preservado e migrado progressivamente.
- Backend, DB e SaaS Platform são workstreams próprios.
- Handoff no repositório é a fonte de continuidade.
- School Finance e EduCore SaaS Billing são domínios separados.

## ADRs pendentes

- ADR-001 backend framework;
- ADR-002 ORM/query layer;
- ADR-003 auth/session strategy;
- ADR-004 tenancy storage model: shared-schema vs alternatives;
- ADR-005 tenant resolution: subdomain/custom domain/selector;
- ADR-006 user membership model across one or multiple tenants;
- ADR-007 platform admin/support access model;
- ADR-008 module entitlements / feature flags;
- ADR-009 tenant configuration versioning;
- ADR-010 grade calculation/publication;
- ADR-011 school finance ledger/reversals;
- ADR-012 notification channels;
- ADR-013 file/document storage;
- ADR-014 tenant provisioning/deprovisioning;
- ADR-015 EduCore SaaS billing model when commercially required.

## Perguntas SaaS a fechar cedo

- um utilizador pode pertencer a várias instituições desde V1 ou apenas futuramente?;
- resolução do tenant por subdomínio, domínio customizado, seleção após login ou combinação?;
- que configurações o tenant pode editar sozinho?;
- que configurações exigem intervenção da plataforma?;
- quais módulos são core e quais são opcionais?;
- planos comerciais afetam módulos, quotas, utilizadores, armazenamento ou suporte?;
- como suspender tenant sem perder dados?;
- como fazer exportação/portabilidade de dados?;
- modelo de backup/restore por tenant;
- acesso de suporte a dados de tenant: quando, como e com que auditoria?;
- política para customizações específicas sem criar forks.

## Perguntas ERP por tenant

- níveis/classes suportados;
- ano letivo/períodos;
- processo real de admissão/matrícula;
- regras de avaliação;
- estados de presença/justificação;
- estrutura de obrigações escolares;
- métodos de pagamento;
- quem valida pagamentos;
- documentos da secretaria;
- aprovações obrigatórias;
- relatórios necessários;
- permissões reais por função.

Não inferir estas respostas a partir dos mocks ou de um único tenant.
