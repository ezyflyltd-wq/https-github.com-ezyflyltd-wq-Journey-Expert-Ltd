# JOURNEY EXPERT LTD. — GROUND TRANSFERS & LOGISTICS MODEL
**Part 55 Execution • Autonomous Engineering System**

---

## 1. Ground Transfer Architecture
Manages airport pick-up/drop-off, hotel-to-hotel transfers, intercity road transfers, and private chauffeur bookings:

```
+-------------------------------------------------------------------+
|                           Transfer Route                          |
|  (id, origin_type, origin_id, dest_type, dest_id, distance_km)    |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Vehicle Rate Matrix                        |
|  (id, route_id, vehicle_category_id, supplier_cost, retail_price) |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                         Pickup Dispatch                           |
|  (id, booking_id, flight_num, pickup_time, driver_id, status)     |
+-------------------------------------------------------------------+
```

---

## 2. Transfer Types & Airport Integration
- **Transfer Categories**: Airport Arrival Meet & Greet, Airport Departure, Point-to-Point Urban, Intercity Scenic Route, Hourly Chauffeur Hire.
- **Flight Number Tracking**: Real-time flight status sync (ETA updates, delay detection) for driver pickup timing adjustment.
- **Accessible & Family Vehicles**: Options for wheelchair accessibility (RAMP/LIFT) and child safety seat installation.
