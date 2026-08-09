# JOURNEY EXPERT LTD. — MULTI-TIER LOYALTY & POINTS ENGINE
**Part 59 Execution • Autonomous Engineering System**

---

## 1. Loyalty Program Architecture
The JEL Loyalty Engine calculates points earned per booking, tracks point expiration, and manages customer tier progression (`Explorer` -> `Silver` -> `Gold` -> `Platinum` -> `VIP`).

---

## 2. Tier Progression & Point Calculation Workflow
```
+-------------------------------------------------------------------+
|               Completed Booking Transaction (Flight/Hotel)        |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Calculate Points Earned (Base Rate x Tier Multiplier)|
|  - Explorer: 1 Point per $1 Spend                                 |
|  - Silver:   1.25 Points per $1 Spend                             |
|  - Gold:     1.5 Points per $1 Spend                              |
|  - Platinum: 2.0 Points per $1 Spend                              |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|            Update Loyalty Ledger & Recheck Tier Upgrade           |
| (If Annual Spend >= $5,000 -> Auto-Upgrade Customer to Gold Tier) |
+-------------------------------------------------------------------+
```

---

## 3. Point Expiration Ledger
- **Expiration Policy**: Loyalty points expire after 12-24 months of inactive account status. Customers receive automated expiration warnings 60 days prior to point forfeiture.
