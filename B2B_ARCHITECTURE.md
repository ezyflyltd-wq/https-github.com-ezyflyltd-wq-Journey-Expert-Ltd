# JOURNEY EXPERT LTD. — B2B TRAVEL DISTRIBUTION ARCHITECTURE
**Part 51 Execution • Autonomous Engineering System**

---

## 1. Executive Summary
Journey Expert Ltd.'s B2B Travel Distribution Platform converts the core OTA infrastructure into a multi-tenant wholesale distribution network powering travel agencies, sub-agent networks, corporate desks, destination management companies (DMCs), and white-label partners across Bangladesh and international markets.

---

## 2. Multi-Tier Distribution Hierarchy
```
+-------------------------------------------------------------------+
|               Journey Expert Core Inventory Engine                 |
|            (Sabre, Amadeus, Hotelbeds, Direct Contracts)          |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                 Hierarchical Pricing & Markup Rules               |
|  (Supplier Cost -> JEL Base -> Tenant Markup -> Sub-Agent Margin) |
+-------------------------------------------------------------------+
        |                         |                         |
        v                         v                         v
+---------------+        +---------------+        +---------------+
| Master Agent  |        | Corporate     |        | White-Label   |
| Portal        |        | CSBT Desk     |        | SaaS Tenant   |
+---------------+        +---------------+        +---------------+
        |                                                   |
        v                                                   v
+---------------+                                  +---------------+
| Sub-Agent     |                                  | End Retail    |
| Retail Desk   |                                  | Customer      |
+---------------+                                  +---------------+
```

---

## 3. Core B2B Modules
1. **Agent Onboarding & KYC**: Automated verification of trade licenses, tax compliance numbers (TIN/BIN), and IATA certifications.
2. **Real-Time Credit & Wallet Engine**: Supports pre-funded deposit wallets, credit limits with automated lock thresholds, and instant commission rollups.
3. **Multi-Level Commission Split**: Configurable commission rules for Master Agents, Sub-Agents, and sales representatives with automated reversal handling on cancellations.
4. **Commercial Privacy Shield**: Strict server-side masking ensuring wholesale supplier costs are never exposed to retail sub-agents or end customers.
