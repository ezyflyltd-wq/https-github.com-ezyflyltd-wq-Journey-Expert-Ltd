# JOURNEY EXPERT LTD. — ENTERPRISE DATA PLATFORM & BI ARCHITECTURE
**Part 61 Execution • Autonomous Engineering System**

---

## 1. Executive Summary
Journey Expert Ltd.'s Enterprise Data Platform unifies data streams from all operational business systems (B2C OTA, B2B Marketplace, Corporate Travel, Flight, Hotel, Tour, Activity, Transfer, Insurance, Visa, Study Abroad, Hajj/Umrah, Medical Tourism, DMC, CRM, Finance, Payment, Wallet, Loyalty, AI Gateway, and Marketing) into a single, highly governed, real-time analytics and business intelligence ecosystem.
It empowers executive decision-making, operational optimization, automated financial reconciliation, predictive forecasting, anomaly detection, and conversational AI business intelligence.

---

## 2. Integrated Data Architecture
```
+-------------------------------------------------------------------+
|               ALL OPERATIONAL BUSINESS & TRANSACTION SYSTEMS      |
| (B2C, B2B, Corporate, Flights, Hotels, Visa, Study Abroad, etc.)  |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               DATA INGESTION & EVENT STREAMING LAYER              |
|   (REST APIs, Webhooks, CDC, Event Streams, Files, Database Sync) |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               RAW DATA LAYER / DATA LAKE (Bronze Layer)           |
| (Preserves source data with metadata, timestamps, & event IDs)    |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|             CLEAN & CURATED DATA LAYER (Silver Layer)             |
|   (Data Quality Engine, Validation Rules, MDM Master Entities)    |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               ANALYTICAL DATA WAREHOUSE (Gold Layer)              |
|     (Star Schema: FactBooking, FactPayment, DimCustomer, etc.)    |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                   GOVERNED SEMANTIC & KPI LAYER                   |
| (Single Source of Truth for GBV, Revenue, Margin, LTV, CAC, AOV)  |
+-------------------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            |                     |                     |
            v                     v                     v
+-----------------------+ +-------------------+ +-------------------+
| Executive BI Dashboards| | Real-Time Events  | | JEL AI Data       |
| (CEO/CFO/COO/CMO/B2B) | | & Alert Engine    | | Analyst Assistant |
+-----------------------+ +-------------------+ +-------------------+
```

---

## 3. Core Architectural Pillars
- **Single Source of Truth**: Establishes authoritative enterprise definitions for gross booking value (GBV), net revenue, profit margins, customer profiles, and supplier performance.
- **Strict Data Governance & Lineage**: Every KPI traces back through the semantic layer, transformation pipelines, and raw sources with full data cataloging.
- **Tenant & PII Security**: Row-level security (RLS) ensures multi-tenant B2B and corporate isolation, with PII masking across analytics and reporting outputs.
