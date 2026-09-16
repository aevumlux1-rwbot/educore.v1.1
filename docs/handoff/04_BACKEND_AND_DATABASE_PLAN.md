# 04 — BACKEND & DATABASE PLAN

## Estado

**BACKEND: NOT IMPLEMENTED**  
**PRODUCTION DATABASE: NOT IMPLEMENTED**

## Decisão técnica a fazer por ADR

Proposta inicial a avaliar:
- Node.js + TypeScript;
- NestJS ou Fastify modular;
- REST versionada + OpenAPI;
- PostgreSQL;
- Prisma ou Drizzle;
- auth com cookies HttpOnly / sessão ou access-refresh model;
- object storage compatível com S3.

Nada disso é aprovado até ADR.

## Entidades-base propostas

Identity: `users`, `roles`, `permissions`, `user_roles`, `sessions`.

Institution: `institutions`, `academic_years`, `terms`, `campuses`, `rooms`.

People: `students`, `guardians`, `student_guardians`, `staff`, `teachers`.

Academic: `grade_levels`, `classes`, `subjects`, `class_subjects`, `teacher_assignments`, `timetables`.

Attendance: `attendance_sessions`, `attendance_records`, `attendance_justifications`.

Assessment: `assessments`, `assessment_components`, `grades`, `grade_publications`.

Enrollment: `applications`, `application_documents`, `enrollments`, `enrollment_status_history`.

Finance: `student_accounts`, `financial_obligations`, `invoices`, `invoice_lines`, `payments`, `payment_allocations`, `receipts`, `penalties`, `treasury_movements`.

Communication: `conversations`, `conversation_members`, `messages`, `notifications`.

Documents: `document_templates`, `generated_documents`, `attachments`.

Governance: `approval_requests`, `approval_actions`, `audit_events`.

## Regras de modelação
- estratégia global de IDs;
- timestamps e actor em operações críticas;
- `institution_id` nas entidades relevantes;
- histórico financeiro não destrutivo;
- notas publicadas e decisões críticas com histórico;
- migrations versionadas;
- constraints/índices de domínio.

## Primeira sequência sugerida
Auth/IAM → Institution → Student Registry → Enrollment → Academic Core → Finance → Communication/Reporting.
