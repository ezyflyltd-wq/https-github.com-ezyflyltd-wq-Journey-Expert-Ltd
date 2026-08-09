# JOURNEY EXPERT LTD. — CORPORATE BOOKING & PNR MANAGEMENT MODEL
**Part 57 Execution • Autonomous Engineering System**

---

## 1. Corporate Booking Model
Tracks corporate PNR flight reservations, hotel vouchers, chauffeur transfers, and corporate travel insurance policies linked to corporate accounts and cost centers.

---

## 2. Corporate Booking Record Schema
```
+-------------------------------------------------------------------+
|                        Corporate Trip Booking                     |
|  (id, company_id, traveler_id, cost_center_code, total_cost_usd)  |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                         Flight PNR Segment                        |
|  (id, trip_id, pnr_code, airline, cabin_class, fare_type, status) |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                         Hotel Voucher Segment                     |
|  (id, trip_id, hotel_name, checkin, checkout, room_type, rate)    |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                       Chauffeur Transfer Segment                  |
|  (id, trip_id, vehicle_class, pickup_location, driver_contact)    |
+-------------------------------------------------------------------+
```

---

## 3. Disruption & Rebooking Operations
- **24/7 TMC Rebooking Desk**: Dedicated corporate desk handles flight cancellations, delays, and schedule changes with priority carrier re-ticketing.
