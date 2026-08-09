# JOURNEY EXPERT LTD. — CORPORATE TRAVEL POLICY ENGINE
**Part 57 Execution • Autonomous Engineering System**

---

## 1. Policy Engine Architecture
The Corporate Travel Policy Engine evaluates search results and travel requests against company rules before booking execution.

---

## 2. Policy Rule Evaluation Workflow
```
+-------------------------------------------------------------------+
|               Travel Request / Search Selection                   |
| (Flight Cabin, Fare, Hotel Nightly Rate, Advance Window, Vendor)  |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Corporate Policy Rule Set Evaluation                |
|  - Cabin Class (Economy vs Business by flight duration/tier)      |
|  - Hotel Nightly Cap (Max $200/night in NYC, $150 in London)      |
|  - Advance Purchase Requirement (Minimum 7 or 14 days in advance) |
|  - Preferred Airline / Preferred Hotel Chain Alignment           |
+-------------------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            | (All Rules Pass)                          | (Violation Detected)
            v                                           v
+-----------------------------------+       +-----------------------+
|  Result: COMPLIANT                |       | Result: NON_COMPLIANT /|
|  -> Direct Auto-Booking Approved  |       | REQUIRES_APPROVAL     |
+-----------------------------------+       | (Detailed Reason Log) |
                                            +-----------------------+
```

---

## 3. Explicit Reason Logging
When a booking violates policy, the engine logs clear, human-readable explanations (e.g. *"Hotel rate of $250/night exceeds corporate London cap of $180/night by $70"*), ensuring transparency for approvers.
