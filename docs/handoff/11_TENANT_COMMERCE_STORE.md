# 11 — TENANT COMMERCE / SCHOOL STORE

## Position in EduCore

Commerce is an **optional tenant module** inside EduCore. It is not a separate product and must not be implemented as a fork per school.

```text
EduCore
  └─ Tenant
      ├─ ERP Core
      ├─ School Finance
      └─ Commerce / Store
```

The first use case is a school store for uniforms, books, school supplies and other products/services sold by the institution.

## Surfaces

### Public Web / Tenant Landing
Can expose a tenant storefront when the commerce module is enabled:
- catalogue;
- product detail;
- variants/sizes;
- availability;
- cart;
- checkout entry point.

### Portal Web
Authenticated families/students can:
- buy products linked to their tenant;
- choose student/beneficiary where relevant;
- view orders;
- download receipts;
- track pickup/delivery status;
- reuse approved payment methods/integrations.

### Desktop ERP / Internal Web
Staff can:
- create/edit/archive products;
- manage categories;
- manage SKUs/variants/sizes;
- control stock;
- receive/fulfil/cancel orders;
- process returns/refunds according to policy;
- generate receipts;
- view sales and inventory reports.

## Domain boundary

Commerce and School Finance are related but distinct domains.

- **School Finance**: tuition/fees, obligations, invoices, student accounts, payments, receipts.
- **Commerce**: products, inventory, carts, orders, fulfilment, returns.

A commerce order may create a payment/receipt through shared payment infrastructure, but it must not be treated as a student tuition obligation unless the institution explicitly configures such a workflow.

## Core entities

Proposed initial model:

```text
products
product_categories
product_variants
inventory_items
inventory_movements
carts
cart_items
orders
order_items
order_status_history
fulfilments
returns
refunds
```

Tenant scope is mandatory for all tenant-owned commerce data.

## Product model

A product can represent:
- uniform piece;
- school book;
- stationery/material;
- event ticket;
- activity/service;
- other school merchandise.

Variants support cases such as:

```text
Uniforme Escolar
  ├─ Camisa / XS
  ├─ Camisa / S
  ├─ Camisa / M
  ├─ Calça / 10
  └─ Calça / 12
```

## Order lifecycle

Initial state machine:

```text
DRAFT
→ PENDING_PAYMENT
→ PAID
→ PROCESSING
→ READY_FOR_PICKUP / SHIPPED
→ COMPLETED
```

Exceptional states:

```text
CANCELLED
REFUNDED
PARTIALLY_REFUNDED
```

Exact transitions and permissions must be defined before production.

## Inventory rules

- stock changes are append-only inventory movements;
- avoid directly overwriting stock without an auditable reason;
- reserve stock during checkout only when payment/timeout rules are defined;
- negative stock behavior must be tenant-configurable or explicitly forbidden;
- product archival is preferred over destructive deletion when referenced by historical orders.

## Payment integration

Commerce should reuse the EduCore payment abstraction/adapters, but maintain separate order/payment references.

Possible flow:

```text
Cart
→ Checkout
→ Order
→ Payment Intent
→ Payment Confirmation
→ Order Paid
→ Receipt
→ Fulfilment
```

Payment providers may later include local bank/mobile-money/card integrations, but provider selection remains a tenant/integration concern.

## Tenant configuration

Possible commerce configuration:

```text
commerce.enabled
commerce.publicStoreEnabled
commerce.currency
commerce.pickupLocations
commerce.deliveryEnabled
commerce.stockPolicy
commerce.orderNumberPrefix
commerce.taxPolicyReference
commerce.receiptTemplate
commerce.paymentMethods
```

## Module entitlement

Suggested module key:

```text
commerce
```

Optional sub-features later:

```text
commerce_inventory
commerce_delivery
commerce_advanced_reporting
commerce_promotions
```

The frontend can hide unavailable capabilities, but the backend must enforce entitlements.

## Production-shaped MVP

The first version should not be a visual-only shop. Minimum real vertical slice:

```text
Create product
→ define variant/price/stock
→ publish product
→ add to cart
→ create order
→ simulate or process payment via adapter
→ update order state
→ decrement/record inventory movement
→ generate receipt
→ show order to guardian/student
```

Mocks may seed initial products only. Runtime state must go through domain services/repository contracts so the same UI can later use the real API without redesign.

## Non-negotiable rules

- no hard-coded store per school;
- no separate checkout implementation for every tenant;
- no direct database access from web/desktop clients;
- no mixing tuition ledger with commerce inventory/order state;
- no destructive deletion of financially relevant order history;
- no stock updates without auditable inventory movement;
- no payment success based only on client-side state in production.
