# JOURNEY EXPERT LTD. — INSURANCE COMMISSION & REVENUE MODEL
**Part 56 Execution • Autonomous Engineering System**

---

## 1. Multi-Tiered Commission Engine
Tracks distribution commissions across B2C direct sales, B2B sub-agent sales, corporate travel accounts, and white-label partners in full compliance with local insurance commission regulations.

---

## 2. Commission Ledger Schema
```
+-------------------------------------------------------------------+
|                        Commission Record                          |
| (id, policy_id, insurer_id, gross_premium, commission_rate_pct)   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                      Revenue Split Allocation                     |
| (jel_gross_commission, sub_agent_split, net_jel_revenue)          |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     Commission Ledger States                      |
|  [ EXPECTED ] -> [ APPROVED ] -> [ PAYABLE ] -> [ SETTLED ]       |
+-------------------------------------------------------------------+
```

---

## 3. Compliance & Reversals
- **Policy Cancellation Reversals**: Automatically reverses accrued agent commissions if a policy is cancelled within the statutory cooling-off window.
- **Auditable Reconciliation**: Syncs commission receivables directly with the central Part 50 financial ledger.
