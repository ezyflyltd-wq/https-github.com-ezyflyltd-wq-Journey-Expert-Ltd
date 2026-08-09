# JOURNEY EXPERT LTD. — PAID MEMBERSHIP SUBSCRIPTION ENGINE
**Part 59 Execution • Autonomous Engineering System**

---

## 1. Membership Subscription Model
Powers paid subscription tiers (`JEL Basic`, `JEL Plus`, `JEL Premium`, `JEL Elite`) providing subscribers with exclusive benefits:

```
+-------------------------------------------------------------------+
|                     Paid Membership Subscription                  |
| (subscription_id, customer_id, plan_code, billing_cycle, status)  |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Subscribed Benefits                        |
|  - Zero JEL Service Fees on Flight & Hotel Bookings              |
|  - Free Airport Meet & Greet Passes (2 per year)                 |
|  - Priority 24/7 VIP Customer Support Queue                       |
|  - Double Loyalty Points Multiplier on All Purchases             |
+-------------------------------------------------------------------+
```

---

## 2. Subscription Billing Lifecycle
- **Billing Cycles**: Monthly or Annual recurring subscription billing with automated retry and grace periods (`ACTIVE` -> `PAST_DUE` -> `EXPIRED` -> `CANCELLED`).
