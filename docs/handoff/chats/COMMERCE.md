# CHAT BRIEF — COMMERCE / SCHOOL STORE

## Mission

Build the optional EduCore tenant commerce module for school products and services without coupling it to a single institution.

## Read first

- `../00_MASTER_HANDOFF.md`
- `../08_SAAS_MULTI_TENANCY_CORE.md`
- `../10_CLIENT_SURFACES_WEB_DESKTOP.md`
- `../11_TENANT_COMMERCE_STORE.md`

## Scope

Public/portal storefront:
- catalogue;
- product detail;
- variants/sizes;
- cart;
- checkout;
- orders;
- receipts.

Internal ERP/Desktop:
- product/catalogue management;
- prices;
- variants;
- inventory;
- order processing;
- fulfilment;
- returns/refunds;
- reporting.

Backend/domain:
- tenant-scoped product/order/inventory models;
- order state machine;
- payment adapter integration;
- audit trail;
- permissions/entitlements.

## Important boundary

Do not merge commerce with tuition/student-account finance. They may share payment infrastructure and receipts, but remain separate domains and ledgers.

## First vertical slice

`Product → Variant/Stock → Publish → Cart → Order → Payment Adapter → Paid → Inventory Movement → Receipt → Order History`.

## Rule

Mocks are seeds/fixtures only. Runtime behavior must use production-shaped contracts and repository/service boundaries that can be replaced by API adapters.
