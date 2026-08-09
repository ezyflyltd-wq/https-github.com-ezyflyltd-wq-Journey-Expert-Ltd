# JOURNEY EXPERT AI — TOOL REGISTRY & CLASSIFICATION
**Part 60 Execution • Autonomous Engineering System**

---

## 1. Centralized Tool Registry
The Tool Registry exposes verified JEL API capabilities to agents as structured tools with schema validation:

```
+-------------------------------------------------------------------+
|                           Tool Registry                           |
|  (tool_id, tool_name, description, input_schema, action_type)     |
+-------------------------------------------------------------------+
```

---

## 2. Action Classification Matrix
- `READ`: Read-only queries (e.g. `search_flights`, `search_hotels`, `get_booking_status`).
- `RECOMMEND`: Generates recommendations or draft itineraries (e.g. `build_itinerary`, `recommend_packages`).
- `PREPARE`: Pre-fills booking forms or prepares quote requests (e.g. `prepare_flight_booking`, `generate_quote`).
- `TRANSACTIONAL`: Executes financial or binding bookings (e.g. `issue_ticket`, `debit_wallet`, `issue_policy`).
- `FINANCIAL`: Modifies credit limits, approves refunds, or alters bank details (e.g. `approve_refund`, `adjust_credit_limit`).
