# JOURNEY EXPERT LTD. — CORPORATE ACCOUNT & ORGANIZATION MODEL
**Part 57 Execution • Autonomous Engineering System**

---

## 1. Corporate Organization Hierarchy
Corporate accounts are structured into multi-tiered organizational entities powering cost allocation, approval routing, and expense reporting:

```
+-------------------------------------------------------------------+
|                         Corporate Account                         |
|  (id, company_name, vat_number, credit_limit_usd, status)         |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Divisions / Branches                       |
|  (id, company_id, division_name, country_code, primary_contact)   |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                        Departments & Teams                        |
|  (id, division_id, department_code, manager_employee_id)         |
+-------------------------------------------------------------------+
                                  |
                                  | 1 : N
                                  v
+-------------------------------------------------------------------+
|                     Cost Centers & Projects                       |
|  (id, department_id, cost_center_code, project_budget_usd)        |
+-------------------------------------------------------------------+
```

---

## 2. Account Lifecycle & Roles
- **Account Status**: `PROSPECT` -> `ONBOARDING` -> `ACTIVE` -> `SUSPENDED` -> `CLOSED`.
- **Corporate User Roles**: `Corporate Admin`, `Travel Manager`, `Booker`, `Approver`, `Employee/Traveller`, `Finance Manager`, `Expense Manager`, `Executive Assistant`.
- **Credit Limit & Controls**: Real-time credit monitoring blocks new bookings when account credit limit is exceeded or payments are past due.
