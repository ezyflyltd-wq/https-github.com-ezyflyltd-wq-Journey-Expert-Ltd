# JOURNEY EXPERT LTD. — FINANCIAL & LEDGER ARCHITECTURE SPECIFICATION
**Part 50 Execution • Autonomous Engineering System**

---

## 1. Financial Ledger Architecture
The Journey Expert Ltd. platform employs a double-entry financial ledger for accounting precision and auditability:

```
+-------------------------------------------------------------------+
|                        Customer Order                             |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                    Server-Side Pricing Engine                     |
|  (Supplier Cost + Markup + Service Fee + NBR VAT - Discount)      |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                PCI-DSS Tokenized Payment Gateway Proxy             |
|        [ SSLCommerz | bKash / Nagad MFS | Stripe Checkout ]       |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                  Immutable Double-Entry Ledger                    |
|  Debit: Gateway Clearing Account   |  Credit: Recognized Revenue  |
|  Debit: B2B Agent Wallet Debit     |  Credit: Supplier Payable    |
|  Debit: Tax Expense Account        |  Credit: NBR VAT Payable     |
+-------------------------------------------------------------------+
```

---

## 2. Chart of Accounts Structure
1. **Assets**:
   - `1010` Cash & Bank Accounts (BRAC Bank, Eastern Bank Ltd, City Bank)
   - `1020` Payment Gateway Clearing Accounts (SSLCommerz, bKash, Stripe)
   - `1030` Customer Accounts Receivable
2. **Liabilities**:
   - `2010` Supplier Accounts Payable (Sabre, Amadeus, Hotelbeds, Makkah Hotels)
   - `2020` Agent Wallet Balances Payable
   - `2030` NBR VAT & Tax Payable
   - `2040` Refund Liabilities
3. **Equity & Revenue**:
   - `3010` Retained Earnings
   - `4010` Gross Booking Revenue (Flights, Hotels, Visas, Study Abroad)
   - `4020` Service Fee & Convenience Revenue
4. **Expenses**:
   - `5010` Supplier Direct Inventory Cost
   - `5020` B2B Agent Commission Expense
   - `5030` Gateway Processing Fees

---

## 3. FX Multi-Currency Engine
- **Base Ledger Currency**: BDT (Bangladeshi Taka).
- **Supported Exchange Currencies**: USD, GBP, EUR, SAR, AED, CAD, AUD.
- **FX Rate Reference**: Centralized rate table updated hourly with source attribution (`FX_CENTRAL_BANK_BD`, `FX_OANDA_API`).
- **Real-Time Conversion**: Ensures multi-currency customer quotes align with supplier settlement liabilities.
