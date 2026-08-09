# JOURNEY EXPERT LTD. — UNIVERSAL CUSTOMER IDENTITY & MFA MODEL
**Part 59 Execution • Autonomous Engineering System**

---

## 1. Universal Identity Model
Links all customer interactions across web, mobile app, B2B referrals, and corporate desks into a single master profile:

```
+-------------------------------------------------------------------+
|                     Universal Customer Master                     |
|  (customer_id, primary_email, mobile_phone, preferred_currency)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                     Authentication & MFA Credentials              |
|  (hash_password, mfa_enabled, oauth_google_id, passkey_data)      |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                    Cross-Product Linked Identifiers               |
|  - B2C OTA Profile (b2c_profile_id)                               |
|  - Corporate Account Employee Link (corporate_employee_id)        |
|  - Hajj & Umrah Pilgrim Registration (pilgrim_crm_id)            |
|  - Study Abroad Applicant Record (student_case_id)                |
|  - Medical Tourism Patient Case (patient_case_id)                 |
+-------------------------------------------------------------------+
```

---

## 2. Account Security & Session Controls
- **Multi-Factor Authentication (MFA)**: Supports SMS OTP, Email OTP, TOTP Authenticator apps, and biometric Passkeys.
- **Device & Session Management**: Tracks active devices, IP addresses, and login history with one-click remote session revocation.
