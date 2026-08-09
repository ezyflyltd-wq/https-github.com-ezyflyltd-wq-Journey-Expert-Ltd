# JOURNEY EXPERT LTD. — CUSTOMER PROFILE & SAVED TRAVELLERS VAULT
**Part 59 Execution • Autonomous Engineering System**

---

## 1. Profile & Saved Travellers Schema
Stores personal details, travel preferences, and saved profiles for family members, companions, or employees:

```
+-------------------------------------------------------------------+
|                        Customer Profile                           |
|  (customer_id, full_name, dob, nationality, passport_number)      |
+-------------------------------------------------------------------+
                                  |
                                  +-----------------------+
                                  |                       |
                                  v                       v
+-----------------------------------+   +-----------------------------------+
|     Saved Companions / Family     |   |      Encrypted Document Vault     |
| (companion_id, name, relationship)|   | (doc_type, file_url, expiry_date) |
+-----------------------------------+   +-----------------------------------+
```

---

## 2. Automated Expiry Reminders
- **Document Expiry Engine**: Sends automated notifications 180 days, 90 days, and 30 days prior to passport or visa expiration to prevent airport check-in rejections.
