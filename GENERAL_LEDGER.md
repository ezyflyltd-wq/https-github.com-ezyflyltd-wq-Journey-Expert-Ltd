# JOURNEY EXPERT LTD. — GENERAL LEDGER & CHART OF ACCOUNTS MODEL
**Part 62 Execution • Autonomous Engineering System**

---

## 1. Enterprise Chart of Accounts (CoA)
The Chart of Accounts organizes financial transactions into standard accounting classes across assets, liabilities, equity, revenue, cost of sales, and operating expenses:

```
1000 - ASSETS
  ├── 1010 Cash & Bank Accounts (BDT, USD, EUR, GBP, SAR, AED)
  ├── 1020 Payment Gateway Receivables (Stripe, SSLCommerz, bKash)
  ├── 1030 B2B Accounts Receivable & Corporate Credit Lines
  └── 1040 Prepaid Supplier Deposits & Float

2000 - LIABILITIES
  ├── 2010 B2B Agency Digital Wallet Balances
  ├── 2020 Supplier Payables (Airlines BSP, Hotels, DMCs)
  ├── 2030 Unearned Customer Revenue / Advance Bookings
  └── 2040 Tax Payable (VAT, AIT, Statutory Taxes)

3000 - EQUITY
  └── 3010 Retained Earnings & Share Capital

4000 - REVENUE
  ├── 4010 Flight Sales Revenue & Markup
  ├── 4020 Hotel Booking Commission & Markup
  ├── 4030 Study Abroad & Visa Service Fees
  └── 4040 Hajj, Umrah & Medical Tourism Revenue

5000 - COST OF SALES
  ├── 5010 Net Supplier Flight Costs
  ├── 5020 Net Supplier Hotel Costs
  ├── 5030 B2B Agent Commission Expenses
  └── 5040 Payment Gateway Processing Fees

6000 - OPERATING EXPENSES
  ├── 6010 Technology Infrastructure & API Costs
  ├── 6020 Personnel & Operational Payroll
  └── 6030 Administrative & Marketing Expenses
```

---

## 2. Journal Entry Schema & Double-Entry Control
Every journal entry contains balanced debit/credit line items:

```json
{
  "journalId": "je_9012384",
  "bookingRef": "bk_881203",
  "postingDate": "2026-08-09T07:35:00Z",
  "status": "POSTED",
  "lines": [
    { "accountCode": "1020", "accountName": "Payment Gateway Receivable", "debitUsd": 1200.00, "creditUsd": 0.00 },
    { "accountCode": "2020", "accountName": "Supplier Airline Payable", "debitUsd": 0.00, "creditUsd": 1050.00 },
    { "accountCode": "4010", "accountName": "Flight Revenue & Service Fee", "debitUsd": 0.00, "creditUsd": 150.00 }
  ],
  "totalDebitUsd": 1200.00,
  "totalCreditUsd": 1200.00
}
```
