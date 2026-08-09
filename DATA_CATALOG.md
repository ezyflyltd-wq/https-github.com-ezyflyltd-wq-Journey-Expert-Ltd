# JOURNEY EXPERT LTD. — ENTERPRISE DATA CATALOG
**Part 61 Execution • Autonomous Engineering System**

---

## 1. Enterprise Data Catalog Architecture
The Data Catalog maintains a centralized, searchable registry of all datasets, warehouse tables, dimension attributes, fact measures, pipelines, owners, freshness SLAs, and data sensitivity classifications.

---

## 2. Dataset Metadata Record Schema
Every dataset registered in the platform includes standardized metadata attributes:

```json
{
  "dataset_id": "dw_fact_booking",
  "dataset_name": "FactBooking",
  "schema_type": "Fact Table (Star Schema)",
  "description": "Stores confirmed, cancelled, and pending travel bookings with financial metrics",
  "owner": "Data Engineering & Finance BI Team",
  "source_tables": ["raw_b2c_bookings", "raw_b2b_bookings", "raw_corp_bookings"],
  "update_frequency": "Hourly Batch / Near-Real-Time Stream",
  "freshness_sla_minutes": 60,
  "sensitivity_level": "RESTRICTED",
  "row_count_estimate": 4500000
}
```

---

## 3. Catalog Search & Discovery
- **Self-Service Discovery**: Allows analysts, developers, and AI agents to discover schemas, inspect column descriptions, verify freshness SLAs, and request dataset access.
