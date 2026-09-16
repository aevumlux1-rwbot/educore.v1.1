# 09 — PRESENTATION FUNCTIONAL MVP

## Purpose

The presentation must feel like a **working school ERP**, not a collection of dashboards. The immediate target is not production persistence; it is a coherent transactional demo where actions performed by one role affect what another role sees.

Implementation branch: `feat/presentation-functional-mvp`.

The SaaS/multi-tenant core continues separately in `feat/saas-tenant-foundation`.

## Current diagnosis

The current frontend already contains many local interactions, but most are isolated inside individual React pages:

- teacher attendance can be marked locally and saved via toast;
- teacher grade inputs are editable locally;
- teacher can create assessments locally;
- secretary can create an enrollment in local component state;
- secretary can approve/reject an admission locally;
- finance can validate/reject payments locally;
- guardian can justify an absence locally;
- pedagogy can register an intervention locally;
- many other buttons still only show a toast or navigate.

This creates the impression of functionality, but not of a living ERP because the state generally does not propagate between roles.

## MVP rule

For presentation, a feature counts as FUNCTIONAL only when:

```text
ACTION
→ state changes
→ user receives feedback
→ change remains visible after navigation
→ related roles/screens reflect the change
→ activity/audit entry can be inspected
```

A toast alone does not count as a completed workflow.

## Demo transactional layer

Before backend integration, introduce a presentation-only domain layer that mirrors future API contracts:

```text
DemoStore / MockRepository
  ├─ students
  ├─ guardians
  ├─ enrollments
  ├─ classes
  ├─ attendance
  ├─ assessments
  ├─ grades
  ├─ finance
  ├─ interventions
  ├─ notifications
  └─ auditEvents
```

Requirements:
- seeded from current `mockData`;
- shared across all role pages;
- persisted to `localStorage` for the presentation session;
- reset-to-demo-state command;
- domain actions, not direct array mutation in pages;
- contracts shaped so the implementation can later be replaced by real API calls.

Do not make this store the production backend. It is a presentation bridge.

## Cross-role flows — mandatory

### FLOW A — Secretary: create/manage a student

1. Secretary creates enrollment/student.
2. Student appears in student registry.
3. Student appears in selected class/turma.
4. Guardian link can be assigned.
5. Pedagogy sees the student in academic lists.
6. Audit entry records the action.

MVP actions:
- create student/enrollment;
- edit core student data;
- change active/suspended/transferred state;
- assign class/turma;
- link guardian;
- do not hard-delete a student in the demo. Use status/deactivation. A destructive delete may exist only for synthetic draft records and requires confirmation.

### FLOW B — Teacher: attendance

1. Teacher selects class/subject/session.
2. Marks Present / Absent / Late.
3. Saves attendance.
4. Guardian sees the absence/late record.
5. Guardian can submit justification.
6. Pedagogy sees justification/status and attendance-risk change.
7. Audit event is recorded.

### FLOW C — Teacher → Pedagogy → Student/Guardian: assessment & grades

1. Teacher creates assessment.
2. Pedagogy sees approval request.
3. Pedagogy approves/rejects.
4. Approved assessment appears in student/guardian calendar.
5. Teacher enters grades.
6. Grades remain draft until publication/approval rule.
7. Published grades become visible to student/guardian.
8. Risk/average indicators update.

### FLOW D — Pedagogy: intervention

1. Pedagogy opens an at-risk student.
2. Creates intervention with type, note, owner and follow-up date.
3. Intervention remains in history.
4. Related guardian notification is generated where appropriate.
5. Direction can see aggregate risk/intervention status.

### FLOW E — Guardian: school follow-up

Guardian must do more than view:
- view linked students;
- justify an absence;
- acknowledge important notices;
- review grades/assessments;
- initiate/submit payment evidence or simulated payment;
- view payment status and receipt after finance validation;
- send/message school in demo flow.

### FLOW F — Finance: payment lifecycle

1. Guardian/student submits a simulated payment/evidence.
2. Finance sees it in validation queue.
3. Finance validates or rejects with reason.
4. Account balance updates.
5. Guardian/student sees new status.
6. Validated payment generates receipt preview.
7. Direction sees updated finance metrics.
8. Audit event is recorded.

### FLOW G — Direction

Direction is not a data-entry role for everyday operations. MVP actions:
- review approvals requiring executive decision;
- approve/reject selected high-level requests;
- inspect academic and finance summaries;
- inspect audit trail;
- drill down to problem areas;
- export/preview report.

## Role-by-role action baseline

| Role | Must be able to DO in MVP |
|---|---|
| Student | view grades/calendar; submit simulated payment; open content; send message; mark notification read |
| Guardian | switch educando; justify absence; submit payment; view receipt; acknowledge notice; message school |
| Teacher | take attendance; create assessment; enter/save grades; publish/submit grades; upload/create content; message class |
| Pedagogy | approve/reject assessments/grade publication; create intervention; review attendance justification; manage class/teacher assignment baseline |
| Direction | approve/reject executive requests; inspect audit; open reports; monitor academic/finance KPIs |
| Secretary | create enrollment/student; edit status/details; assign turma; link guardian; process admissions; generate document |
| Finance | validate/reject payment; create obligation/invoice baseline; view debtor account; issue/view receipt; register adjustment/reversal only if demo policy permits |

## What is NOT required for presentation MVP

- real payment gateway;
- real email/SMS/WhatsApp;
- production file upload/storage;
- real password/security model;
- production database;
- SaaS billing;
- full accounting package;
- every report;
- irreversible destructive operations.

These belong to backend/database/integration workstreams.

## Demo UX rules

- every mutation has confirmation/error feedback;
- dangerous action uses confirm dialog;
- save buttons show meaningful result/state;
- no button that looks active should only do nothing;
- no fake download unless it opens a real preview or creates a browser file;
- statuses must be consistent across screens;
- demo reset available from a non-prominent development/demo control;
- use realistic empty/loading/error states where possible.

## Presentation script target

The strongest demonstration should be a connected story:

```text
Secretary creates/activates a student
→ Teacher marks an absence
→ Guardian sees and justifies it
→ Pedagogy reviews the case
→ Teacher creates assessment and grades
→ Pedagogy approves publication
→ Guardian sees the grade
→ Guardian submits payment
→ Finance validates it
→ Guardian receives receipt
→ Direction sees updated overview/audit
```

This one story demonstrates that EduCore is an integrated ERP rather than seven disconnected dashboards.

## Delivery phases

### Phase 1 — Shared demo domain state
- central store/repository;
- persistence/reset;
- audit events;
- notifications.

### Phase 2 — Secretary + Student Registry
- create/edit/status/class/guardian link;
- admission → enrollment flow.

### Phase 3 — Teacher Attendance
- save session;
- guardian propagation;
- justification flow.

### Phase 4 — Assessments + Grades + Pedagogy approvals
- create/approve/publish;
- student/guardian propagation.

### Phase 5 — Finance lifecycle
- submit → validate/reject → balance → receipt.

### Phase 6 — Pedagogy/Direction action surfaces
- interventions;
- approvals;
- audit/report drill-down.

### Phase 7 — Demo QA
- reset seed;
- test all seven roles;
- cross-role consistency;
- mobile smoke check;
- build/tests.

## Definition of MVP success

A presenter can perform at least one meaningful mutation from each operational staff role, switch profiles, and show the consequence of that mutation in another role without reloading or manually editing mock data.
