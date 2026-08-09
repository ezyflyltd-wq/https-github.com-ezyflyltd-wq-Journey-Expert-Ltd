# JOURNEY EXPERT LTD. — BOOKING ENGINE AUDIT REPORT
**Part 49 Execution • Autonomous Engineering System**

---

## 1. Executive Summary
Journey Expert Ltd.'s unified booking engine provides a provider-agnostic transactional core powering Flights, Hotels, Tour Packages, Visas, Hajj & Umrah pilgrimages, Medical Escorts, and Travel Insurance across B2C, B2B Agent, Corporate CSBT, and White-Label channels.

---

## 2. Core Architectural Pillars
1. **Provider Abstraction Layer**: Isolates GDS (Sabre, Amadeus, Travelport) and bedbank (Hotelbeds, Expedia) payload differences into standardized internal TypeScript models.
2. **Server-Side Pricing & Revalidation**: Enforces strict server-side fare calculation and pre-payment availability checks to prevent price tampering or stale inventory claims.
3. **Transactional State Machine**: Enforces rigid transitions (`DRAFT` -> `SEARCHED` -> `REVALIDATED` -> `PENDING_PAYMENT` -> `PAYMENT_PROCESSING` -> `CONFIRMED` -> `TICKETED` -> `COMPLETED`).
4. **Idempotency & Fraud Mitigation**: Prevents duplicate ticketing or double-charging via unique idempotency keys per checkout session.

---

## 3. Supported Product Engines
- **Flight Engine**: One-Way, Round-Trip, and Multi-City search with cabin class selection, ancillary baggage add-ons, and automated PNR issuance.
- **Hotel Engine**: Real-time room inventory, rate plan comparison, cancellation deadline tracking, and voucher PDF generation.
- **Tour Engine**: Fixed-departure and custom itinerary builder with daily schedules, inclusions/exclusions list, and group deposit support.
- **Multi-Product Cart**: Consolidated checkout for flights, hotel stays, airport transfers, and travel insurance in a single transaction.
