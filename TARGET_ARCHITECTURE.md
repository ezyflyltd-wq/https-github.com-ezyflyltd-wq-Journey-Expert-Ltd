# JOURNEY EXPERT LTD. — TARGET ENTERPRISE ARCHITECTURE
**Part 46 Execution • Autonomous Engineering System**

---

## 1. High-Level Architecture Overview
Journey Expert Ltd. employs a 5-Layer Microservice & Event-Driven Architecture:

```
[ Omni-Channel Frontend Layer (Web, SuperApp, B2B Portal, Corporate Desk) ]
                                    ↓
[ API Gateway Layer (OAuth 2.0 / JWT, Rate Limiting, WAF, PCI-DSS Proxy) ]
                                    ↓
[ Microservices Layer (GDS, Hotels, Visas, Study Abroad, CRM, ERP, HRMS) ]
                                    ↓
[ AI & Autonomous Layer (Angela AI, Voice AI, Dynamic Pricing, Fraud AI) ]
                                    ↓
[ Database & Data Warehouse Layer (PostgreSQL Clusters, Redis, MDM) ]
```

---

## 2. Core Service Boundaries
- **Flight Engine Service**: Connects to Sabre, Amadeus, and Travelport NDC APIs with automated PNR creation, ticket issuance, and void/refund processing.
- **Accommodation Service**: Integrates Hotelbeds, Expedia, and direct Makkah/Madinah contracting for wholesale pricing.
- **Global Mobility Service**: Handles Study Abroad university databases, CAS letters, bank statement verification, and visa application checklists.
- **FinTech & ERP Service**: Multi-currency general ledger (BDT, USD, GBP, SAR, EUR) with NBR tax compliance and SSLCommerz/bKash/Stripe proxies.
- **Angela AI Orchestrator**: Uses Gemini 2.5/Flash and @google/genai SDK for intent parsing, autonomous itinerary creation, and customer support.

---

## 3. Security & Compliance Controls
- **Zero-Trust RBAC**: Role-Based Access Control enforcing granular scopes for Customers, Agents, Counselors, Corporate Approvers, and System Administrators.
- **Data Protection**: AES-256 field-level encryption for passports, academic transcripts, and financial records.
- **PCI-DSS Compliance**: Offloaded payment processing via secure hosted payment pages and server-side webhook validation.
