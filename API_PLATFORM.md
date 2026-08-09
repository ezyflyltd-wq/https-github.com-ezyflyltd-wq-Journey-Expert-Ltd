# JOURNEY EXPERT LTD. — B2B TRAVEL API & WEBHOOK PLATFORM
**Part 58 Execution • Autonomous Engineering System**

---

## 1. Developer API Platform
Exposes REST and Webhook endpoints allowing external agencies and developers to integrate JEL flight, hotel, tour, and insurance inventories directly into their custom apps.

---

## 2. API Security & Rate Limiting
- **Authentication**: API Key + HMAC Secret Request Signing.
- **Rate Limiting**: Enforces tier-based rate limits (e.g., 600 requests/minute for Master Agencies; 120 requests/minute for Sub-Agents).
- **Webhooks**: Dispatches real-time event notifications (`booking.created`, `ticket.issued`, `payment.confirmed`, `flight.delayed`) with signature verification headers (`X-JEL-Signature`).
