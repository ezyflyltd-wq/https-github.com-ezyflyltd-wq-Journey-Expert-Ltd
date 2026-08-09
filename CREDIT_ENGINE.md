# JOURNEY EXPERT LTD. — B2B CREDIT CONTROL & OVERDUE ENGINE
**Part 58 Execution • Autonomous Engineering System**

---

## 1. Credit Control Engine
Manages post-paid credit lines granted to verified agencies and corporate clients with strict risk thresholds and automated overdue blocks.

---

## 2. Credit Monitoring Workflow
```
+-------------------------------------------------------------------+
|                   Agency Initiates New B2B Booking                |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Real-Time Credit & Overdue Evaluation               |
|  - Is Total Debt + Booking Cost <= Approved Credit Limit?        |
|  - Are any unpaid invoices past payment due date (e.g. >15 days)? |
+-------------------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            | (Within Credit & No Overdue Invoices)      | (Credit Exceeded / Overdue)
            v                                           v
+-----------------------------------+       +-----------------------+
|  Approve Credit Booking           |       | Block Booking & Notify|
|  -> Debit Available Credit Line   |       | Agency Finance Desk   |
+-----------------------------------+       +-----------------------+
```

---

## 3. Override Safeguards
- **Manual Authorizations**: Emergency overrides require sign-off by a JEL Senior Finance Officer with immutable audit logging.
