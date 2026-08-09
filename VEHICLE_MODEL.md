# JOURNEY EXPERT LTD. — VEHICLE FLEET & CAPACITY MODEL
**Part 55 Execution • Autonomous Engineering System**

---

## 1. Fleet & Vehicle Classification
Manages vehicle fleet inventories across DMC partners and ground transport operators:

```
+-------------------------------------------------------------------+
|                         Vehicle Category                          |
|  (id, name, max_passengers, max_luggage, class - Sedan/Van/Bus)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                          Physical Fleet                           |
|  (id, category_id, supplier_id, license_plate, model_year)        |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                       Schedule & Dispatch                         |
|  (id, vehicle_id, driver_id, booking_id, departure_time, status)  |
+-------------------------------------------------------------------+
```

---

## 2. Vehicle Classes & Capacity Matrix
1. **Sedan / Executive Car**: 1-3 Passengers | 2 Luggage (Toyota Camry, Mercedes E-Class).
2. **Minivan / SUV**: 4-6 Passengers | 4-6 Luggage (Toyota Alphard, HiAce, GMC Yukon).
3. **Coaster / Mini Bus**: 7-18 Passengers | 15 Luggage (Toyota Coaster, Mitsubishi Fuso).
4. **VIP Coach / Full Bus**: 19-45 Passengers | 40 Luggage (Volvo Coach, Scania VIP Bus).
