# CHAT BRIEF — DESKTOP APP

## Mission

Build the EduCore desktop client as a production client of the same SaaS platform, not as a separate ERP.

## Read first
- `../README.md`
- `../00_MASTER_HANDOFF.md`
- `../08_SAAS_MULTI_TENANCY_CORE.md`
- `../10_CLIENT_SURFACES_WEB_DESKTOP.md`
- `../09_PRODUCTION_MVP_FUNCTIONALITY.md` when working from the production-MVP branch/workstream.

## Primary users
- Secretaria
- Finanças
- Pedagogia
- Direcção
- Professores for intensive workflows

## Core rules
- same backend API as web;
- same tenant/membership model;
- same domain contracts;
- reuse shared React feature packages;
- native capabilities only behind platform adapters;
- no direct database connection;
- no embedded service credentials;
- online-first until offline sync is formally designed.

## First technical decision

Produce an ADR comparing Tauri 2 and Electron for the actual EduCore requirements. Tauri 2 is the current preferred candidate because the existing product is React/TypeScript and the desktop client should remain lightweight, but the ADR must test printing, file access, updater/signing, Windows deployment, deep links/auth, native notifications and required device integrations.

## First implementation milestone

1. establish workspace/monorepo boundaries without breaking the existing frontend;
2. extract shared API/domain/tenant contracts;
3. create a minimal desktop shell;
4. authenticate against the same environment as portal-web;
5. load active tenant and permissions;
6. render one shared operational feature inside desktop;
7. implement secure storage adapter;
8. add build/sign/update strategy documentation;
9. validate Windows packaging.

## Definition of done for first slice

The same user and tenant can open one functional ERP workflow in browser and desktop, both reading/writing through the same API contract, with no duplicated business logic.
