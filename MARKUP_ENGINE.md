# JOURNEY EXPERT LTD. — HIERARCHICAL MARKUP ENGINE
**Part 58 Execution • Autonomous Engineering System**

---

## 1. Multi-Tiered Markup Hierarchy
Allows master agencies, sub-agents, and resellers to add custom markup rules (percentage or fixed fee) on top of JEL net rates.

---

## 2. Pricing Cascade Workflow
```
+-------------------------------------------------------------------+
|               JEL Net Supplier Cost (Flight / Hotel)             |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Tier 1: JEL Platform Margin / Service Fee           |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|            Tier 2: Master Agency Markup (Fixed or % Rule)         |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|            Tier 3: Sub-Agent / Reseller Markup (Optional)          |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                   Final Customer Retail Selling Price             |
+-------------------------------------------------------------------+
```

---

## 3. Negative-Margin Guardrail
- **Safety Rule**: The engine validates that `Customer Price >= Net Supplier Cost + Mandatory Taxes`. Negative margins trigger immediate configuration rejection.
