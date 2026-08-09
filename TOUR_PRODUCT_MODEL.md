# JOURNEY EXPERT LTD. — TOUR PRODUCT & PACKAGING MODEL
**Part 55 Execution • Autonomous Engineering System**

---

## 1. Tour Product Classification
Tour products support single-day excursions, multi-day guided packages, private VIP tours, and group travel:

```
+-------------------------------------------------------------------+
|                            Tour Product                           |
|  (id, title, destination_id, dmc_id, tour_type, duration_days)    |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                           Itinerary Days                          |
|  (id, tour_id, day_number, title, description, meals_included)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                         Included Activities                       |
|  (id, day_id, activity_id, start_time, location, guide_required)  |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                         Pricing Tiers                             |
|  (id, tour_id, adult_price, child_price, single_supp, valid_from) |
+-------------------------------------------------------------------+
```

---

## 2. Tour Categories & Features
- **Categories**: Private, Escorted Group, Family, Luxury, Honeymoon, Adventure, Cultural, Halal-Friendly, Medical Companion, MICE Incentive.
- **Inclusions & Exclusions**: Transparent itemization of included meals (Breakfast, Lunch, Dinner), hotel star rating, entrance fees, transport type, and local guide service.
- **Dynamic Capacity Management**: Supports fixed departure group sizes (e.g., Min 6 / Max 20 passengers) or guaranteed private departures.
