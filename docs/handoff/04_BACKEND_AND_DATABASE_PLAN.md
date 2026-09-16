# 04 — BACKEND & DATABASE PLAN

## Estado

**BACKEND: NOT IMPLEMENTED**  
**PRODUCTION DATABASE: NOT IMPLEMENTED**  
**MULTI-TENANCY: NOT IMPLEMENTED**  
**TENANT PROVISIONING: NOT IMPLEMENTED**

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

## Decisão de multi-tenancy

Multi-tenancy deixa de ser opcional. Deve ser tratada como requisito P0.

Default a avaliar em ADR:

```text
shared PostgreSQL database
+ shared schema
+ tenant_id on tenant-owned records
+ strict server-side tenant context
+ isolation tests
+ database safeguards where practical
```

Schema-per-tenant ou DB-per-tenant podem ser avaliados mais tarde para necessidades enterprise/compliance, mas não devem ser assumidos agora.

## Entidades platform-level

- `tenants`
- `tenant_domains`
- `tenant_settings`
- `tenant_branding`
- `module_catalog`
- `tenant_entitlements`
- `plans`
- `subscriptions` (future SaaS billing)
- `platform_users`
- `platform_roles`
- `platform_audit_events`

## Entidades tenant-level propostas

Identity:
- `users`
- `tenant_memberships`
- `roles`
- `permissions`
- `role_permissions`
- `membership_roles`
- `sessions`

Institution:
- `institutions`
- `academic_years`
- `terms`
- `campuses`
- `rooms`

People:
- `students`
- `guardians`
- `student_guardians`
- `staff`
- `teachers`

Academic:
- `grade_levels`
- `classes`
- `subjects`
- `class_subjects`
- `teacher_assignments`
- `timetables`

Attendance:
- `attendance_sessions`
- `attendance_records`
- `attendance_justifications`

Assessment:
- `assessments`
- `assessment_components`
- `grades`
- `grade_publications`

Enrollment:
- `applications`
- `application_documents`
- `enrollments`
- `enrollment_status_history`

Finance:
- `student_accounts`
- `financial_obligations`
- `invoices`
- `invoice_lines`
- `payments`
- `payment_allocations`
- `receipts`
- `penalties`
- `treasury_movements`

Communication:
- `conversations`
- `conversation_members`
- `messages`
- `notifications`

Documents:
- `document_templates`
- `generated_documents`
- `attachments`

Governance:
- `approval_requests`
- `approval_actions`
- `audit_events`

## Regras de modelação multi-tenant

- estratégia global de IDs;
- tenant-owned entities com tenant scope explícito;
- FKs não podem criar relações cross-tenant;
- unique constraints tenant-specific incluem `tenant_id`;
- server services recebem tenant context confiável;
- caches, queues e object storage usam namespace por tenant;
- timestamps e actor em operações críticas;
- histórico financeiro não destrutivo;
- notas publicadas e decisões críticas com histórico;
- migrations versionadas;
- constraints/índices de domínio;
- audit events incluem tenant, actor e request correlation.

## Auth model a resolver

A sessão deve resolver:

```text
user
→ memberships
→ active tenant
→ tenant roles
→ permissions
→ module entitlements
→ allowed actions
```

Um utilizador poderá futuramente pertencer a mais de um tenant; a modelação não deve impedir esse cenário.

## API platform-level proposta

```text
/platform/tenants/*
/platform/modules/*
/platform/plans/*
/platform/health/*
```

Acesso apenas por roles de plataforma.

## API tenant-level proposta

```text
/auth/*
/me
/tenant
/tenant/config
/students/*
/guardians/*
/enrollments/*
/classes/*
/subjects/*
/timetables/*
/attendance/*
/assessments/*
/grades/*
/finance/*
/documents/*
/notifications/*
/audit/*
```

## Primeira sequência sugerida

1. Tenant model + tenant resolution;
2. Auth/IAM + memberships;
3. Tenant branding/config + module entitlements;
4. Institution + academic year;
5. Student Registry;
6. Enrollment;
7. Academic Core;
8. Finance;
9. Communication/Reporting;
10. control plane/provisioning automation.
