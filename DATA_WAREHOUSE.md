# JOURNEY EXPERT LTD. — ANALYTICAL DATA WAREHOUSE & STAR SCHEMA
**Part 61 Execution • Autonomous Engineering System**

---

## 1. Enterprise Data Warehouse Architecture
The Data Warehouse (Gold Layer) organizes clean transactional records into optimized dimensional star schemas (Facts & Dimensions) designed for ultra-fast query performance across reporting dashboards and BI tools.

---

## 2. Fact & Dimension Schema Layout
```
                          +-------------------------+
                          |      DimCustomer        |
                          | (customer_key, email)   |
                          +-------------------------+
                                       |
                                       |
+----------------------+               v               +-----------------------+
|     DimProduct       | ---->  FactBooking  <---- |     DimDestination    |
| (product_key, type)  |       (booking_key,          | (destination_key, city|
+----------------------+        gross_amount_usd,     +-----------------------+
                                net_revenue_usd,
+----------------------+        margin_usd)            +-----------------------+
|      DimChannel      | ---->                    <----|        DimDate        |
| (channel_key, name)  |                               | (date_key, quarter)   |
+----------------------+                               +-----------------------+
```

---

## 3. Core Fact Tables
1. **FactBooking**: Tracks booking line items, gross booking value (GBV), supplier costs, commission, markups, and status.
2. **FactPayment**: Logs payment attempts, settlement status, payment gateway fees, and transaction reference codes.
3. **FactRefund**: Tracks processed refunds, partial cancellations, and supplier penalty deductions.
4. **FactRevenue**: Records realized net revenue after travel completion, supplier settlements, and tax allocations.
5. **FactCommission**: Tracks B2B master agent splits, sub-agent shares, and affiliate referral payouts.
6. **FactLead & FactApplication**: Tracks Study Abroad and Visa lead conversions and university application funnels.

---

## 4. Core Dimension Tables
- **DimCustomer**: Master customer profile, segmentation tier, lifetime value (LTV), and sign-up channel.
- **DimPartner**: B2B agency, corporate account, DMC, or white-label partner metadata and credit limits.
- **DimSupplier**: Airline, hotel chain, tour operator, or GDS supplier profiles.
- **DimProduct**: Product category (Flight, Hotel, Tour, Visa, Study Abroad, Insurance, Hajj/Umrah).
- **DimDate & DimTime**: Fiscal calendar dimensions including holidays, high/low travel seasons, and weekdays.
- **DimCurrency**: Multi-currency conversion rates, reporting currency equivalents, and FX timestamps.
