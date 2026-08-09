# JOURNEY EXPERT LTD. — GOVERNED SEMANTIC LAYER & METRIC CATALOG
**Part 61 Execution • Autonomous Engineering System**

---

## 1. Governed Semantic Layer Architecture
The Semantic Layer sits between the analytical data warehouse and BI tools/AI assistants. It defines business metrics once, guaranteeing that every dashboard, report, and natural language query calculates figures identically.

---

## 2. Core Business Metric Formulas
```
+-------------------------------------------------------------------+
|                     Governed Metric Definitions                   |
+-------------------------------------------------------------------+

1. Gross Booking Value (GBV)
   Formula: SUM(FactBooking.gross_amount_usd) WHERE status = 'CONFIRMED'

2. Net Revenue
   Formula: GBV - Supplier_Cost - Payment_Gateway_Fees - Disallowed_Discounts

3. Gross Margin %
   Formula: (Net_Revenue / GBV) * 100

4. Average Order Value (AOV)
   Formula: GBV / Total_Confirmed_Bookings

5. Customer Acquisition Cost (CAC)
   Formula: Total_Marketing_Spend / Total_New_Customer_Acquisitions

6. Customer Lifetime Value (LTV)
   Formula: Average_Customer_Margin * Customer_Lifespan_Years
```

---

## 3. Metric Drift Prevention
- **Centralized Metric Store**: Changes to metric definitions require peer review and pull request approval. Individual BI dashboards are forbidden from defining custom SQL aggregations that override governed metrics.
