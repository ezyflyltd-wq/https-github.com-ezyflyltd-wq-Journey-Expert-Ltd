# JOURNEY EXPERT LTD. — TRAVEL INSURANCE PRODUCT CATALOG MODEL
**Part 56 Execution • Autonomous Engineering System**

---

## 1. Product Catalog Hierarchy
Insurance products are categorized by traveler segment, destination risk profile, and coverage scope:

```
+-------------------------------------------------------------------+
|                         Insurance Product                         |
| (id, insurer_id, product_name, traveler_category, max_trip_days)  |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Coverage Schedule                          |
| (id, product_id, benefit_name, max_limit_usd, deductible_usd)     |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                      Policy Terms & Exclusions                    |
| (id, product_id, policy_wording_url, exclusions_list, version)    |
+-------------------------------------------------------------------+
```

---

## 2. Product Categories & Benefits
1. **Comprehensive Travel Medical**: Emergency medical expenses ($50,000 - $1,000,000 USD), medical evacuation, repatriation of remains.
2. **Trip Cancellation & Interruption**: Reimburses non-refundable flight/hotel costs due to covered sickness, emergency, or severe weather.
3. **Student & Study Abroad Insurance**: Compliant with university requirements (UKVI, US F-1/I-20 benchmarks, Australian OSHC).
4. **Hajj & Umrah Pilgrim Protection**: Specialized coverage for pilgrimage medical emergencies, flight disruptions, and baggage loss in Saudi Arabia.
5. **Baggage & Flight Interruption**: Fixed compensation for lost luggage or flight delays exceeding 4-6 hours.
