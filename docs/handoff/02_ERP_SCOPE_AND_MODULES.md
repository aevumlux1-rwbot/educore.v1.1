# 02 — ERP SCOPE & MODULE MAP

| Domínio | Capacidade | Perfis principais | Prioridade |
|---|---|---|---|
| Identity & Access | utilizadores, roles, permissões, sessões | todos | P0 |
| Institution | escola, ano letivo, períodos, config | Direcção | P0 |
| Student Registry | alunos, encarregados, estado | Secretaria/Pedagogia | P0/P1 |
| Admissions | candidatura, revisão, decisão | Secretaria/Direcção | P1 |
| Enrollment | matrícula, renovação, turma | Secretaria/Direcção | P1 |
| Academic Structure | classes, turmas, disciplinas, docentes | Pedagogia | P1 |
| Timetable | horários, salas, conflitos | Pedagogia/Professor | P1 |
| Attendance | presenças, faltas, justificações | Professor/Pedagogia/Família | P1 |
| Assessment | avaliações e calendário | Professor/Pedagogia | P1 |
| Gradebook | lançamento, revisão, publicação | Professor/Pedagogia | P1 |
| Finance | obrigações, facturas, pagamentos, recibos | Finanças/Família | P1 |
| Treasury | caixa, reconciliação, movimentos | Finanças/Direcção | P2 |
| Documents | declarações, certificados, templates | Secretaria | P1/P2 |
| Approvals | workflows de aprovação | Staff | P2 |
| Communication | chat/avisos | todos | P2 |
| Notifications | eventos e alertas | todos | P1/P2 |
| Knowledge | conteúdos por disciplina/turma | Professor/Aluno | P2 |
| Reporting | relatórios e analytics | Gestão | P2 |
| Audit | quem fez o quê e quando | Direcção/Admin | P0 |

## Workflows críticos

### Matrícula
candidato/aluno → documentos → validação → decisão → matrícula → ano/turma → obrigações financeiras → ativo.

### Nota
avaliação → rascunho → revisão → publicação → visibilidade → histórico/auditoria.

### Pagamento
obrigação → pagamento → validação/reconciliação → alocação → recibo → saldo → auditoria.

### Presença
aula/sessão → chamada → estado → justificação → validação → agregação/alerta.

## Regra
Antes de programar um módulo real: definir **entidades + estados + permissões + eventos + erros + audit trail**.
