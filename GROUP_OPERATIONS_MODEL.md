# JOURNEY EXPERT LTD. — GROUP OPERATIONS & MANIFEST MODEL
**Part 53 Execution • Autonomous Engineering System**

---

## 1. Group Operations Management
Hajj and Umrah pilgrimages are managed as structured group cohorts (`Group ID`, `Group Name`, `Departure Date`, `Group Leader / Muallim`, `Total Pilgrim Count`).

---

## 2. Group Manifest Model
```
+-------------------------------------------------------------------+
|                          Group Manifest                           |
|  (group_id, group_name, departure_date, leader_id, status)        |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Group Pilgrim Linkage                      |
|  (pilgrim_id, passport_num, room_type, bus_num, seat_num, pnr)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                       Operational Milestones                      |
|  (milestone_name, scheduled_time, actual_time, guide_signoff)     |
+-------------------------------------------------------------------+
```

---

## 3. Operations Features
- **Group Leader Portal**: Mobile-responsive dashboard for Muallims and Group Leaders to check in pilgrims, send group announcements, and view schedule updates.
- **Automated Manifest Exports**: Instant PDF and Excel export of bus passenger manifests, flight passenger lists, and hotel check-in forms.
