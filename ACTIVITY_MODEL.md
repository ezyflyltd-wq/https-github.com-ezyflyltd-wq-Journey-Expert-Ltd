# JOURNEY EXPERT LTD. — ACTIVITIES & EXCURSIONS MODEL
**Part 55 Execution • Autonomous Engineering System**

---

## 1. Activity & Excursion Structure
Manages single-day, ticketed, or experience-based activities (museum entry passes, desert safaris, river cruises, theme park tickets, cooking classes):

```
+-------------------------------------------------------------------+
|                           Activity Item                           |
|  (id, name, city_id, supplier_id, category, duration_hours)       |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                           Time Slots                              |
|  (id, activity_id, slot_time, max_capacity, booked_count)         |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Rate & Age Rules                           |
|  (id, activity_id, rate_code, adult_fee, child_fee, infant_fee)   |
+-------------------------------------------------------------------+
```

---

## 2. Key Activity Attributes
- **Meeting Point & GPS Instructions**: Clear address, landmark reference, map coordinates, and pickup instructions.
- **Cancellation & Voucher Policy**: Instant confirmation vouchers with QR/Barcode scanning for operator verification at entry gates.
- **Age & Health Restrictions**: Configurable age boundaries (e.g. Child 3-11 years, Infant 0-2 years) and physical fitness requirements.
