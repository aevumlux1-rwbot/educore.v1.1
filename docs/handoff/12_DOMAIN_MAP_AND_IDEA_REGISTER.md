# 12 — DOMAIN MAP & IDEA REGISTER

## Purpose

This file is the single structured register for product ideas, domain boundaries and future work discussed across chats. It exists to prevent important decisions from being scattered across conversations.

Every substantial new idea should be recorded here or in a linked domain document before implementation.

## Product identity

EduCore is a multi-tenant School ERP SaaS.

Colégio Deus Connosco is the first reference tenant / pilot implementation.

## Client surfaces

### Public Web
- tenant landing / branding;
- public institutional information;
- public admissions/contact when enabled;
- tenant commerce storefront when enabled;
- login entry point.

### Portal Web
- student;
- guardian;
- remote teacher access;
- notifications;
- academic visibility;
- finance visibility/payments;
- documents;
- communication;
- commerce account/orders when enabled.

### Desktop ERP
Desktop-first operational experience for intensive staff workflows:
- secretary;
- finance;
- pedagogy;
- executive;
- teacher intensive operations;
- bulk entry;
- printing;
- files/scanner integrations where justified;
- operational reporting.

All clients use the same EduCore API/domain model. No direct DB access from clients.

## SaaS / platform domains

### Tenant Management
- tenants;
- lifecycle;
- provisioning;
- tenant resolution;
- domains/subdomains;
- tenant configuration.

### Identity & Access
- users;
- memberships;
- platform roles;
- tenant roles;
- permissions;
- sessions;
- support access/audit.

### Entitlements
- module catalog;
- plans;
- feature flags;
- tenant module assignments;
- quotas later.

### Branding / Tenant Experience
- logo;
- colours;
- typography;
- favicon;
- public landing;
- public content configuration;
- tenant theme.

### Platform Operations
- tenant health;
- observability;
- platform audit;
- deployment/versioning;
- SaaS billing later.

## ERP domains

### Student Registry
- students;
- guardians;
- relationships;
- contacts;
- status/history.

### Admissions
- application;
- documents;
- review;
- decision;
- admission history.

### Enrollment
- enrolment;
- renewal;
- class assignment;
- academic-year relation;
- status transitions.

### Academic Structure
- grade levels;
- classes;
- subjects;
- teachers;
- assignments;
- rooms/campuses.

### Timetable
- schedules;
- rooms;
- teacher/class conflicts;
- timetable publication.

### Attendance
- attendance sessions;
- present/absent/late;
- guardian justification;
- pedagogy review;
- alerts;
- audit.

### Assessment & Gradebook
- assessment creation;
- approval where required;
- grade drafts;
- submission;
- publication;
- correction/history;
- guardian/student visibility;
- risk calculation inputs.

### Pedagogy / Student Support
- academic risk;
- interventions;
- review workflows;
- teacher/class monitoring;
- approval flows.

### School Finance
- financial obligations;
- invoices;
- payments;
- validation/reconciliation;
- allocation;
- student accounts;
- receipts;
- debtors;
- penalties;
- treasury.

School Finance is separate from EduCore SaaS Billing and separate from Commerce orders/inventory.

### Documents
- templates;
- generated documents;
- certificates/declarations;
- attachments;
- printing;
- history.

### Communication
- messages/chat;
- announcements;
- notification events;
- external channels through adapters.

### Knowledge / Content
- subject resources;
- teacher content;
- student access.

### Reporting & Analytics
- operational reports;
- management reports;
- academic analytics;
- finance analytics;
- exports.

### Audit
- actor;
- tenant;
- action;
- resource;
- before/after or event metadata where appropriate;
- timestamp/request context.

## Commerce / School Store

Optional tenant module.

Scope:
- permitted products;
- uniforms;
- stationery/materials where allowed;
- school merchandise;
- permitted supplementary publications;
- activities/services/events;
- product variants;
- stock;
- carts;
- orders;
- fulfilment;
- returns/refunds;
- receipts/payments integration.

### Mozambique primary textbook compliance

Do not model official primary-school textbooks in Mozambique as ordinary sellable store products.

Default product rule:

```text
official_primary_textbook
+ jurisdiction = MZ
→ blocked by default
```

Any future exception requires verified legal/policy basis and explicit compliance configuration.

Commerce must have jurisdiction/product eligibility controls so restricted educational products cannot be published simply because a tenant admin created them.

## Production-shaped MVP principle

A page does not count as implemented merely because it exists visually.

A functional vertical slice must include:
- domain state;
- command/use case;
- permission;
- state transition;
- shared result visible to relevant roles;
- audit/event where appropriate;
- repository contract;
- path to the real API without rebuilding the UI.

Mocks may only be seeds/fixtures/tests, not the runtime source of truth architecture.

## Priority functional journeys

### Student lifecycle
Secretary creates/updates student → guardian link → enrolment → class assignment → visible to teacher/pedagogy.

### Attendance
Teacher marks attendance → guardian sees absence → guardian submits justification → pedagogy reviews → status propagates.

### Assessment
Teacher creates assessment → pedagogy approval when required → teacher enters grades → publication → student/guardian sees grades → analytics/risk updates.

### Payments
Guardian/payment source submits payment → finance reviews/validates → allocation → balance updates → receipt → guardian and management visibility.

### Commerce
Staff creates permitted product → compliance check → stock/price → publish → cart/order → payment → stock movement → receipt → fulfilment.

## Architecture principles

- no code fork per school;
- tenant isolation server-side;
- one backend/domain model for web and desktop;
- public landing belongs to tenant branding/public experience;
- desktop and web are different clients, not different ERP products;
- domain rules live outside React pages;
- no client directly accesses database;
- no destructive deletion for critical academic/financial history;
- jurisdiction-specific compliance is an explicit domain concern;
- all major product ideas must be documented before they become scattered implementation assumptions.

## Idea register

### Accepted / active
- Multi-tenant EduCore SaaS core.
- Colégio Deus Connosco as reference tenant.
- Tenant branding including landing.
- Seven initial tenant roles.
- Production-shaped MVP instead of disposable demo.
- Shared domain/contracts across web and future desktop.
- Desktop-first internal ERP workflows.
- Tauri 2 as candidate desktop shell, pending ADR.
- Tenant commerce module.
- Jurisdiction-aware commerce compliance.

### Planned / not yet implemented
- real backend;
- PostgreSQL schema;
- real auth/session;
- real tenant resolution;
- provisioning;
- API contracts implementation;
- repository adapters;
- desktop app shell;
- payment integrations;
- custom domains;
- SaaS plans/billing;
- offline/sync strategy;
- commerce production workflows.

### Needs ADR / policy confirmation
- backend framework;
- ORM/data layer;
- auth/session model;
- tenancy DB isolation model;
- desktop framework final choice;
- offline support scope;
- grading rules;
- payment/reversal ledger model;
- local payment providers;
- Mozambique product/legal compliance rules by category;
- school-specific operational policies.

## Maintenance rule

When a new idea appears in a chat:

1. classify it as platform, tenant, ERP domain, client surface, integration or compliance;
2. add/update the appropriate handoff document;
3. add it to this register if it affects product scope or architecture;
4. mark it accepted, planned or needing decision;
5. only then translate it into implementation backlog.
