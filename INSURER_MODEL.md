# JOURNEY EXPERT LTD. — INSURER & UNDERWRITER DIRECTORY MODEL
**Part 56 Execution • Autonomous Engineering System**

---

## 1. Insurer Directory & Governance Schema
The Insurer Directory manages licensed insurance companies, brokers, and MGAs powering travel protection products across Bangladesh, Middle East, UK, USA, Australia, and global markets:

```
+-------------------------------------------------------------------+
|                           Insurer Entity                          |
| (id, company_name, country, license_ref, status, contact_email)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Regulatory Compliance                      |
| (id, insurer_id, regulator_name, license_valid_until, status)     |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                          API Endpoint Spec                        |
| (id, insurer_id, quote_url, issue_url, cancel_url, auth_token)    |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                       Assistance Center Link                      |
| (id, insurer_id, hotline_number, emergency_email, 24x7_ops_desk)  |
+-------------------------------------------------------------------+
```

---

## 2. Insurer Verification & Auditing
- **Verification Workflow**: Insurers undergo manual compliance checks (`PENDING` -> `VERIFIED` -> `ACTIVE` -> `SUSPENDED`).
- **Source Tracking**: Stores official regulatory license numbers (e.g. IDRA Bangladesh license, FCA UK approval, UAE CBUAE registration).
- **Service Level Agreements**: Monitors insurer API uptime, quote turnaround time, and policy generation latency.
