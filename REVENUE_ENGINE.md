# JOURNEY EXPERT LTD. — REVENUE RECOGNITION & COST OF SALES ENGINE
**Part 62 Execution • Autonomous Engineering System**

---

## 1. Revenue Recognition Architecture
Supports IFRS 15 / ASC 606 compliant revenue recognition rules based on fulfillment events (e.g., flight departure, hotel check-in, visa issuance, or study abroad placement completion).

---

## 2. Revenue Recognition Workflow
```
+-------------------------------------------------------------------+
|               Booking Confirmed & Payment Captured               |
|  (Cash Debited -> Unearned Customer Revenue Liability Credited)   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Fulfillment Event Triggered (e.g., Flight Departs)   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Execute Revenue Recognition Journal Entry           |
|  - Debit: Unearned Customer Revenue Liability                    |
|  - Credit: Recognized Revenue (Flight / Hotel / Visa Fees)        |
|  - Debit: Cost of Sales (Supplier Net Cost)                       |
|  - Credit: Supplier Payable Liability                             |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Calculate Recognized Gross & Net Profit Margin      |
+-------------------------------------------------------------------+
```

---

## 3. Margin & Gross Profit Analysis
- **Gross Profit Formula**: `Gross Profit = Recognized Revenue - Net Supplier Cost - Direct Gateway Processing Fees`.
- **Contribution Margin**: Calculates net margin after deducting variable partner commissions and referral costs.
