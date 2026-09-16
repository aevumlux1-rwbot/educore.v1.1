# 10 — CLIENT SURFACES: WEB, DESKTOP AND FUTURE MOBILE

## Product rule

EduCore is one platform with one domain model, one backend API and multiple client surfaces.

```text
                    EDUCORE BACKEND / API
                           |
          +----------------+----------------+
          |                |                |
     PUBLIC WEB       PORTAL WEB       DESKTOP ERP
          |                |                |
      visitors        students /        staff-heavy
      prospects       guardians /       operations
                       some staff
```

No client owns business truth. Authorization, financial rules, grade publication, enrollment rules, audit and tenant isolation remain server-side.

## Surface 1 — Public Web

Purpose: public institutional experience and tenant branding.

Includes:
- tenant landing;
- school information;
- admissions/application entry points;
- contact/public documents where applicable;
- tenant-aware login entry;
- SEO/public content;
- EduCore corporate SaaS website as a separate brand surface.

Must remain web-first because it is public, linkable and indexable.

## Surface 2 — Web Portal

Purpose: zero-install access for users who should not be forced to install desktop software.

Primary audiences:
- students;
- guardians;
- teachers when away from school;
- management for quick remote access;
- support for selected browser workflows.

Primary capabilities:
- grades;
- attendance visibility / justification;
- schedule;
- assessments;
- communication;
- notifications;
- finance visibility and payment submission;
- documents;
- selected teacher actions;
- responsive access from laptop/tablet/mobile browser.

The web portal is not a reduced fake product. It consumes the same API and domain contracts as desktop, but exposes workflows suited to browser usage.

## Surface 3 — Desktop ERP

Purpose: intensive operational work inside the school.

Primary audiences:
- Secretaria;
- Finanças;
- Pedagogia;
- Direcção;
- Professores for high-frequency operational workflows.

Best-suited capabilities:
- high-density tables and keyboard workflows;
- bulk enrollment/import;
- student registry administration;
- class/subject allocation;
- attendance entry;
- gradebook;
- finance validation and reconciliation;
- receipt/document printing;
- report exports;
- local file selection/scanning integrations;
- background sync/jobs UI;
- multi-window or task-oriented workflows when justified;
- OS notifications;
- automatic updates;
- secure local credential/session storage.

## Shared frontend architecture

Do not create separate business implementations for web and desktop.

Recommended target:

```text
apps/
  public-web/          # landing / tenant public experience
  portal-web/          # authenticated browser client
  desktop/             # desktop shell

packages/
  domain/              # types, value objects, shared rules safe for clients
  api-client/          # typed HTTP client / contracts
  auth-client/         # session/membership/tenant client logic
  tenant/              # TenantContext, theme/config contracts
  ui/                  # shared design system
  features/
    students/
    enrollment/
    attendance/
    assessments/
    gradebook/
    finance/
    documents/
    communication/
```

The same feature package may be used by `portal-web` and `desktop` when the workflow is the same. Desktop-only capabilities belong behind explicit adapters, never inside generic domain components.

## Desktop technology decision

Candidate for ADR: **Tauri 2 + existing React/TypeScript frontend**.

Why it is a strong candidate:
- reuses the current React/TypeScript investment;
- lighter desktop runtime than bundling a full browser engine per app;
- native file/print/OS integration through controlled commands/plugins;
- signed installers and updater can be part of release engineering;
- clear security boundary between web UI and privileged native operations when designed correctly.

Electron remains a valid alternative if later requirements depend on its ecosystem or browser consistency. This is an ADR decision, not an irreversible assumption.

## Platform adapters

Features must depend on interfaces rather than platform-specific APIs.

```text
FileService
  ├─ BrowserFileAdapter
  └─ DesktopFileAdapter

PrintService
  ├─ BrowserPrintAdapter
  └─ DesktopPrintAdapter

SecureStorage
  ├─ WebSessionAdapter
  └─ DesktopSecureStorageAdapter

NotificationService
  ├─ WebNotificationAdapter
  └─ DesktopNotificationAdapter
```

No component should call Tauri/Electron native APIs directly unless it is inside the desktop platform adapter layer.

## Auth and security

### Web
- secure HTTP-only cookies/session strategy preferred for production;
- no long-lived credentials in localStorage;
- tenant membership resolved server-side.

### Desktop
- authenticate against the same backend;
- secure refresh/session material using OS secure storage when needed;
- do not embed privileged API secrets in the executable;
- desktop app never bypasses server authorization;
- tenant context remains validated server-side;
- local cached data must have an explicit encryption/retention policy before offline mode is enabled.

## Offline policy

Do not build broad offline-first behavior in V1.

Potential later offline-capable workflows:
- attendance capture;
- draft grade entry;
- selected cached rosters/schedules.

Any offline feature requires:
- versioned local schema;
- encryption strategy;
- conflict resolution;
- idempotent commands;
- sync audit trail;
- clear stale-data indicators.

Until those are designed, desktop remains online-first.

## What stays web-first

- tenant landing / branding;
- EduCore SaaS marketing site;
- public application/admissions entry;
- student self-service;
- guardian self-service;
- payment submission/receipt access;
- notifications/communication;
- quick teacher access;
- remote dashboards.

## What is desktop-first

- secretary operational ERP;
- finance operations;
- pedagogy administration;
- high-volume gradebook/attendance;
- bulk data operations;
- printing/scanning/document generation;
- intensive reporting/export workflows;
- future hardware/local integrations.

Desktop-first does **not** mean desktop-only unless there is a concrete security or native capability reason.

## Migration from current frontend

Phase 1 — keep current React app working; extract production-shaped domain/repository contracts.

Phase 2 — separate public branding from authenticated portal boundaries.

Phase 3 — extract shared `packages/ui`, `packages/domain`, `packages/api-client`, `packages/tenant`.

Phase 4 — create `apps/desktop` shell and mount shared internal features.

Phase 5 — optimize desktop-only operational screens and native integrations.

## Non-negotiable rules

- no separate backend for desktop;
- no duplicated ERP business rules between web and desktop;
- no direct database access from desktop;
- no client-side privilege escalation;
- no tenant secrets embedded in desktop builds;
- no `if (isDesktop)` scattered across feature code; use adapters/capabilities;
- no offline mode until data protection and sync semantics are specified.
