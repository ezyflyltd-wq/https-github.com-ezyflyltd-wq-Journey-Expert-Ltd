# JOURNEY EXPERT LTD. — TOUR GUIDE ROSTER & ASSIGNMENT MODEL
**Part 55 Execution • Autonomous Engineering System**

---

## 1. Tour Guide Roster Management
Indexes licensed, professional tour guides, historical experts, and multilingual tour escorts across key global and local destinations:

```
+-------------------------------------------------------------------+
|                            Tour Guide                             |
|  (id, full_name, license_number, destination_id, rating, status)  |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Languages Supported                        |
|  (id, guide_id, language_code, fluency_level)                     |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Specializations                            |
|  (id, guide_id, specialty_name - e.g. History, Culinary, Halal)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Assignments & Calendar                     |
|  (id, guide_id, booking_id, assignment_date, start_time, status)  |
+-------------------------------------------------------------------+
```

---

## 2. Guide Assignment & Mobile Portal
- **Automated Matching Engine**: Matches tour requests with guides based on destination, required language (Bangla, English, Arabic, Hindi, French, Japanese), and specialty knowledge.
- **Guide App / Web Portal**: Mobile dashboard for guides to view assigned groups, passenger rosters, pickup meeting points, and client special notes.
