# 02 — ERP SCOPE & MODULE MAP

## Platform capabilities

| Domínio | Capacidade | Scope | Prioridade |
|---|---|---|---|
| Tenant Management | criar, suspender, reativar instituições | EduCore Platform | P0 |
| Tenant Resolution | domínio/subdomínio/active tenant | EduCore Platform | P0 |
| Platform IAM | admins/support/billing operators | EduCore Platform | P0 |
| Tenant IAM | memberships, roles, permissions, sessions | Tenant | P0 |
| Tenant Branding | logo, cores, nome, domínio, locale | Tenant | P0 |
| Module Entitlements | módulos/feature availability por tenant | Platform + Tenant | P0 |
| Tenant Configuration | defaults e configurações operacionais | Tenant | P0 |
| Provisioning | bootstrap de novo tenant | EduCore Platform | P0/P1 |
| SaaS Billing | contrato/subscrição EduCore↔instituição | EduCore Platform | P2 |
| Platform Audit | operações da plataforma e suporte | EduCore Platform | P0/P1 |

## ERP tenant modules

| Domínio | Capacidade | Perfis principais | Prioridade |
|---|---|---|---|
| Institution | escola, ano letivo, períodos, config | Direcção/Admin tenant | P0 |
| Student Registry | alunos, encarregados, estado | Secretaria/Pedagogia | P0/P1 |
| Admissions | candidatura, revisão, decisão | Secretaria/Direcção | P1 |
| Enrollment | matrícula, renovação, turma | Secretaria/Direcção | P1 |
| Academic Structure | classes, turmas, disciplinas, docentes | Pedagogia | P1 |
| Timetable | horários, salas, conflitos | Pedagogia/Professor | P1 |
| Attendance | presenças, faltas, justificações | Professor/Pedagogia/Família | P1 |
| Assessment | avaliações e calendário | Professor/Pedagogia | P1 |
| Gradebook | lançamento, revisão, publicação | Professor/Pedagogia | P1 |
| School Finance | obrigações, facturas, pagamentos, recibos | Finanças/Família | P1 |
| Treasury | caixa, reconciliação, movimentos | Finanças/Direcção | P2 |
| Documents | declarações, certificados, templates | Secretaria | P1/P2 |
| Approvals | workflows de aprovação | Staff | P2 |
| Communication | chat/avisos | todos | P2 |
| Notifications | eventos e alertas | todos | P1/P2 |
| Knowledge | conteúdos por disciplina/turma | Professor/Aluno | P2 |
| Reporting | relatórios e analytics | Gestão | P2 |
| Tenant Audit | quem fez o quê e quando | Direcção/Admin tenant | P0 |

## Regra de configuração

Uma instituição não precisa ter todos os módulos ativos. O catálogo do EduCore define capacidades; `tenant_entitlements` define quais estão disponíveis para cada tenant.

O frontend pode esconder módulos indisponíveis, mas **o backend também deve bloquear a operação**.

## Workflows críticos

### Provisionar tenant
instituição criada → slug/domínio → branding/config base → módulos/plano → primeiro admin → ano letivo base → isolamento validado → tenant ativo.

### Matrícula
candidato/aluno → documentos → validação → decisão → matrícula → ano/turma → obrigações financeiras → ativo.

### Nota
avaliação → rascunho → revisão → publicação → visibilidade → histórico/auditoria.

### Pagamento escolar
obrigação → pagamento → validação/reconciliação → alocação → recibo → saldo → auditoria.

### Presença
aula/sessão → chamada → estado → justificação → validação → agregação/alerta.

## Separação crítica

**School Finance** e **EduCore SaaS Billing** são domínios diferentes.

- School Finance: dinheiro da escola, aluno/encarregado e obrigações académicas.
- SaaS Billing: contrato/subscrição da instituição com a plataforma EduCore.

Não misturar tabelas, permissões, dashboards ou regras.

## Regra

Antes de programar um módulo real: definir **tenant scope + entidades + estados + permissões + entitlements + eventos + erros + audit trail**.
