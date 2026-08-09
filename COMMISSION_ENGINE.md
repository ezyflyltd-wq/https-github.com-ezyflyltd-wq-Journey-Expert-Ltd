# JOURNEY EXPERT LTD. — B2B COMMISSION & SETTLEMENT ENGINE
**Part 58 Execution • Autonomous Engineering System**

---

## 1. Commission Engine Architecture
Calculates supplier commissions, master agent splits, sub-agent shares, and affiliate referral fees for every completed booking.

---

## 2. Commission Ledger & Settlement Schema
```
+-------------------------------------------------------------------+
|                        Commission Record                          |
|  (id, booking_id, supplier_commission_usd, agency_share_usd)      |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                     Sub-Agent Split Allocation                    |
|  (id, master_agent_share_usd, sub_agent_share_usd, status)        |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Settlement Statement                       |
|  (statement_id, tenant_id, period_end, total_commission_paid)     |
+-------------------------------------------------------------------+
```

---

## 3. Reversal & Cooling-off
- **Automated Reversals**: If a booking is cancelled within the permitted refund window, accrued commissions are automatically reversed in the wallet ledger.
