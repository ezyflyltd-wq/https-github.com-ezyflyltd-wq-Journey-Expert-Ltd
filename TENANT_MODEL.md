# JOURNEY EXPERT LTD. — MULTI-TENANT ARCHITECTURE MODEL
**Part 58 Execution • Autonomous Engineering System**

---

## 1. Multi-Tenant Schema & Isolation
Every B2B partner, agency, corporate account, and white-label operator is isolated as a distinct tenant with dedicated row-level security (RLS) keys:

```
+-------------------------------------------------------------------+
|                           Tenant Entity                           |
|  (tenant_id, tenant_type, legal_name, brand_name, country, status)|
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Tenant Users & Roles                       |
|  (user_id, tenant_id, full_name, email, role_code, status)        |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                     Tenant Data Domain Isolation                  |
|  - Customers (customer_id WHERE tenant_id = current_tenant)       |
|  - Bookings (booking_id WHERE tenant_id = current_tenant)         |
|  - Wallet Ledger (ledger_id WHERE tenant_id = current_tenant)     |
+-------------------------------------------------------------------+
```

---

## 2. Tenant Types & Status Lifecycle
- **Tenant Types**: `TRAVEL_AGENCY`, `SUB_AGENT`, `RESELLER`, `CORPORATE`, `TOUR_OPERATOR`, `DMC`, `WHITE_LABEL_PARTNER`, `AFFILIATE`.
- **Status States**: `APPLICATION` -> `UNDER_REVIEW` -> `APPROVED` -> `ACTIVE` -> `SUSPENDED` -> `TERMINATED`.
