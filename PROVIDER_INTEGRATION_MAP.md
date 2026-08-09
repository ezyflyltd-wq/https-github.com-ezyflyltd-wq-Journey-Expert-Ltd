# JOURNEY EXPERT LTD. — PROVIDER INTEGRATION MAP & ADAPTER SPECIFICATION
**Part 49 Execution • Autonomous Engineering System**

---

## 1. Provider Adapter Architecture
The Journey Expert Ltd. platform decouples external API logic through a unified Provider Adapter interface (`FlightProviderAdapter`, `HotelProviderAdapter`, `PaymentProviderAdapter`):

```
+-----------------------------------------------------------------+
|                   Journey Expert Booking API                    |
+-----------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------+
|               Unified Provider Abstraction Layer                |
+-----------------------------------------------------------------+
        |                         |                         |
        v                         v                         v
+---------------+        +---------------+        +---------------+
| Sabre Adapter |        |Amadeus Adapter|        | Duffel NDC    |
+---------------+        +---------------+        +---------------+
```

---

## 2. Integrated Provider Directory

### Air Travel (GDS & NDC)
- **Sabre Web Services**: Primary GDS connector for international flight availability, PNR creation, and automated ticketing.
- **Amadeus Web Services**: Backup GDS connector for Middle East and European route optimization.
- **Travelport Galileo**: Regional South Asian and domestic flight inventory connector.
- **Duffel API**: Direct NDC connector for low-cost carriers (LCC) and airline direct deals.

### Hospitality & Accommodation
- **Hotelbeds**: Wholesale bedbank inventory spanning 180,000+ global properties.
- **Expedia Partner Solutions**: Secondary accommodation inventory with instant booking confirmation.
- **Direct Makkah & Madinah Contracting**: Proprietary JEL inventory for VIP Hajj & Umrah hotel suites.

### FinTech & Payment Gateways
- **SSLCommerz**: Primary Bangladeshi card and internet banking gateway.
- **bKash & Nagad Direct MFS**: Mobile financial services integration for micro-payments and instant deposits.
- **Stripe**: International credit card processing in USD, GBP, EUR, SAR, and AED.
