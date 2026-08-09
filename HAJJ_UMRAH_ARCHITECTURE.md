# JOURNEY EXPERT LTD. — HAJJ, UMRAH & HALAL TOURISM PLATFORM ARCHITECTURE
**Part 53 Execution • Autonomous Engineering System**

---

## 1. Executive Summary
Journey Expert Ltd.'s Hajj, Umrah, and Halal Tourism platform delivers an enterprise religious travel management system integrated into JEL's core OTA, FinTech, and B2B distribution infrastructure.
The platform automates pilgrim lifecycle CRM, custom package building, group bus & hotel rooming allocations, Nusuk Saudi portal integration, emergency dispatch ops, and AI-assisted pilgrim guidance across Bangladesh, Middle East, UK, USA, and global diaspora markets.

---

## 2. Platform Architecture
```
+-------------------------------------------------------------------+
|               Pilgrim Registration & Profile Intake               |
|      (Passport Details, Mahram Info, Health & Special Needs)      |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                 Modular Religious Package Engine                  |
| (Flight Seats + Makkah/Madinah Hotels + Transport + Ziyarat Tours)|
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|             Group Management & Operational Allocation             |
|   (Rooming Lists, Bus Manifests, Group Leaders, Muallim Assignment|
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|             Nusuk & Saudi Ministry Portal Compliance              |
| (Umrah Visa, Rawdah Permit, Hajj Quota Registration & Verification|
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|              24/7 Ground Ops & Emergency Dispatch                 |
|   (Guide App Check-Ins, Medical Incident Alerts, Lost Pilgrim Ops)|
+-------------------------------------------------------------------+
```

---

## 3. Core Architectural Pillars
- **Versioned Regulatory Compliance**: Ministry of Hajj & Umrah guidelines, Nusuk permit rules, and vaccination protocols are versioned, date-stamped, and source-linked.
- **Unified Inventory Integration**: Leverages JEL's central flight GDS engine, direct Makkah/Madinah hotel contracting inventory, and local transport operator networks.
- **Double-Entry Financial Tracking**: Connects pilgrim installments, group deposits, B2B agent commissions, and supplier payables directly to the Part 50 financial ledger.
