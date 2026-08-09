# JOURNEY EXPERT LTD. — MEDICAL CASE MANAGEMENT SPECIFICATION
**Part 54 Execution • Autonomous Engineering System**

---

## 1. Case Lifecycle State Machine
Patient cases transition through strict administrative states managed by assigned JEL International Patient Coordinators:

```
+---------------+
|   NEW_LEAD    |
+---------------+
        |
        v
+---------------+
| DOCS_PENDING  |
+---------------+
        |
        v
+---------------+
| PROVIDER_MATCH|
+---------------+
        |
        v
+---------------+
| QUOTE_PENDING |
+---------------+
        |
        v
+---------------+
| PATIENT_REVIEW|
+---------------+
        |
        v
+---------------+
| CONFIRMED_APT |
+---------------+
        |
        v
+---------------+
|  IN_TREATMENT |
+---------------+
        |
        v
+---------------+
|   DISCHARGED  |
+---------------+
        |
        v
+---------------+
|   FOLLOW_UP   |
+---------------+
```

---

## 2. Transition Guard Conditions
- **DOCS_PENDING -> PROVIDER_MATCH**: Requires patient consent sign-off and mandatory medical reports (recent blood panel, imaging report, doctor summary).
- **PROVIDER_MATCH -> QUOTE_PENDING**: Case file transmitted to selected partner hospital IPD teams for preliminary clinical evaluation.
- **QUOTE_PENDING -> PATIENT_REVIEW**: Partner hospital returns formal treatment plan, estimated hospital length-of-stay, and itemized cost breakdown.
- **PATIENT_REVIEW -> CONFIRMED_APT**: Patient accepts quote, pays deposit, and receives hospital appointment confirmation + visa letter.
