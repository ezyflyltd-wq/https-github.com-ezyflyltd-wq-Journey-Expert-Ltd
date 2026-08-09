# JOURNEY EXPERT LTD. — EMPLOYEE & BUSINESS TRAVELLER PROFILE MODEL
**Part 57 Execution • Autonomous Engineering System**

---

## 1. Employee Traveller Profile Schema
Stores encrypted employee identities, passport details, travel preferences, and loyalty program memberships:

```
+-------------------------------------------------------------------+
|                        Employee Profile                           |
|  (id, company_id, employee_number, full_name, email, department)  |
+-------------------------------------------------------------------+
                                  |
                                  +-----------------------+
                                  |                       |
                                  v                       v
+-----------------------------------+   +-----------------------------------+
|      Travel Identity Vault        |   |       Travel Preferences          |
|  (passport_num, expiry, visa_data)|   | (seat_pref, meal_type, cabin_class|
+-----------------------------------+   +-----------------------------------+
                                  |                       |
                                  +-----------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                   Frequent Traveler & Hotel Loyalty               |
|  (id, employee_id, program_name, membership_number, tier_status)  |
+-------------------------------------------------------------------+
```

---

## 2. Privacy & Delegated Booking
- **Role-Based Access Control**: Sensitive passport and contact data are accessible only by the employee, authorized executive assistants, and designated JEL corporate travel agents.
- **Delegated Booker Permission**: Executive assistants and department bookers can initiate travel requests on behalf of multiple designated employees while preserving individual preference profiles.
