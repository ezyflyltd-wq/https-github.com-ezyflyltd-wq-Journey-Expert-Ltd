# JOURNEY EXPERT LTD. — POLICY ADMINISTRATION & CERTIFICATE MODEL
**Part 56 Execution • Autonomous Engineering System**

---

## 1. Policy Lifecycle State Machine
Policies progress through strict transactional lifecycle states backed by carrier API confirmations:

```
+---------------+
|   REQUESTED   |
+---------------+
        |
        v
+---------------+
|  PROCESSING   |
+---------------+
        |
        +-----------------------+
        |                       |
        v                       v
+---------------+       +---------------+
|    ISSUED     |       |    FAILED     |
+---------------+       +---------------+
        |
        +-----------------------+
        |                       |
        v                       v
+---------------+       +---------------+
|   CANCELLED   |       |   EXPIRED     |
+---------------+       +---------------+
```

---

## 2. Policy Record & Digital Certificate Schema
- **Policy Identifiers**: Unique Policy Number assigned by the carrier + JEL Booking Reference.
- **Coverage Details**: Traveler Name(s), Passport Number, Effective Start Date, Expiry Date, Destination Country/Region, Total Premium, Taxes/Fees.
- **Digital Certificate Generation**: Instant PDF generation containing barcoded policy schedule, 24/7 assistance hotline, and policy wording download link.
- **Endorsement & Modifications**: Dates or traveler details modifications are dispatched directly to the insurer API for policy re-issuance.
