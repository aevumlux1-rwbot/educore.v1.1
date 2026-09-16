# CHAT BRIEF — PRESENTATION FUNCTIONAL MVP

## Mission

Make the current multi-role EduCore demo behave like a living school ERP for presentations, without pretending that local demo state is the production backend.

## Read first

- `docs/handoff/README.md`
- `docs/handoff/00_MASTER_HANDOFF.md`
- `docs/handoff/09_PRESENTATION_MVP_FUNCTIONALITY.md`
- `docs/handoff/08_SAAS_MULTI_TENANCY_CORE.md`

## Implementation branch

`feat/presentation-functional-mvp`

## Core principle

A feature is not complete because a page exists. A meaningful action must change shared state and be visible to the roles/screens affected by that action.

## First implementation order

1. shared demo repository/store + persistence + reset;
2. audit events + notifications;
3. secretary student/enrollment lifecycle;
4. teacher attendance → guardian/pedagogy propagation;
5. assessment/grade approval/publishing flow;
6. guardian payment submission → finance validation → receipt;
7. pedagogy interventions/approvals;
8. direction audit/report drill-down;
9. full seven-role QA.

## Constraints

- preserve existing routes and branding;
- do not re-redesign the landing;
- do not add backend/database in this workstream;
- do not hard-code Colégio Deus Connosco assumptions into future SaaS core abstractions;
- no irreversible deletion for real-looking student/finance records;
- actions should use domain service/repository functions, not page-local mutations where cross-role behavior is needed.

## First acceptance story

Secretary creates/activates student → teacher marks absence → guardian justifies → pedagogy reviews → teacher creates/publishes grade through approval → guardian sees grade → guardian submits payment → finance validates → receipt appears → direction sees audit/updated summary.
