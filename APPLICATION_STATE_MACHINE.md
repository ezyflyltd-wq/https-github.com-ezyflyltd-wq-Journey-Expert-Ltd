# JOURNEY EXPERT LTD. — APPLICATION STATE MACHINE SPECIFICATION
**Part 52 Execution • Autonomous Engineering System**

---

## 1. Application State Machine
University applications undergo strict state transitions enforced by server-side business rules:

```
+---------------+
|     DRAFT     |
+---------------+
        |
        v
+---------------+
| DOCS_PENDING  |
+---------------+
        |
        v
+---------------+
|  READY_REVIEW |
+---------------+
        |
        v
+---------------+
|   SUBMITTED   |
+---------------+
        |
        +-----------------------+-----------------------+
        |                       |                       |
        v                       v                       v
+---------------+       +---------------+       +---------------+
|  CONDITIONAL  |       | UNCONDITIONAL |       |   REJECTED    |
|     OFFER     |       |     OFFER     |       +---------------+
+---------------+       +---------------+
        |                       |
        +-----------+-----------+
                    |
                    v
          +---------------+
          | DEPOSIT_PAID  |
          +---------------+
                    |
                    v
          +---------------+
          |  CAS_I20_COE  |
          |    ISSUED     |
          +---------------+
```

---

## 2. Transition Guard Conditions
- **DRAFT -> DOCS_PENDING**: Triggered when a course is selected and required document slots are defined.
- **DOCS_PENDING -> READY_REVIEW**: Requires student upload of mandatory documents (Passport, Transcript, English Score).
- **READY_REVIEW -> SUBMITTED**: Counselor verifies document accuracy and submits to university admissions portal.
- **OFFER RECEIVED -> DEPOSIT_PAID**: University offer letter uploaded, conditional criteria satisfied, deposit fee paid.
- **DEPOSIT_PAID -> CAS_I20_COE**: University issues official immigration document (CAS for UK, I-20 for USA, COE for Australia).
