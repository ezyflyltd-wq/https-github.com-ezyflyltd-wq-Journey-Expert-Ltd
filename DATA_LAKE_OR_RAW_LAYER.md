# JOURNEY EXPERT LTD. — DATA LAKE & RAW LAYER ARCHITECTURE
**Part 61 Execution • Autonomous Engineering System**

---

## 1. Data Lake Architecture (Bronze Layer)
The Data Lake Raw Layer serves as an immutable, append-only repository preserving all raw JSON payloads, database snapshots, and event logs exactly as emitted by source systems.

---

## 2. Immutable Raw Schema Metadata
Every record stored in the Raw Layer is wrapped with universal ingestion envelope metadata:

```json
{
  "_jel_ingestion_id": "ing_98234123",
  "_jel_source_system": "b2c_ota_booking_engine",
  "_jel_record_id": "bk_772134",
  "_jel_record_version": 1,
  "_jel_ingested_at": "2026-08-09T07:30:00.123Z",
  "_jel_tenant_id": "jel_master",
  "payload": {
    "bookingId": "bk_772134",
    "totalAmountUsd": 850.00,
    "currency": "USD",
    "customerEmail": "p.traveler@example.com"
  }
}
```

---

## 3. Storage Partitioning & Retention
- **Partitioning Strategy**: Partitioned by `/source_system/YYYY/MM/DD/HH/` for high-performance downstream batch loads and point-in-time replays.
- **Data Immutability**: Raw data is strictly read-only and immutable to guarantee forensic auditability and disaster recovery replays.
