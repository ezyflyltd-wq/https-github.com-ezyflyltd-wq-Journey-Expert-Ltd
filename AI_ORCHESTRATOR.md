# JOURNEY EXPERT AI — CENTRAL AGENTIC ORCHESTRATOR MODEL
**Part 60 Execution • Autonomous Engineering System**

---

## 1. Orchestrator Architecture
The Central AI Orchestrator receives user prompts, classifies underlying intent, extracts trip context, selects the appropriate specialist agent(s), checks tool permissions, executes agentic steps, and synthesizes grounded responses.

---

## 2. Multi-Agent Dispatch Workflow
```
+-------------------------------------------------------------------+
|               User Prompt: "Plan a 5-day corporate trip to Dubai  |
|               with flight, 5-star hotel, and Desert Safari"       |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Central AI Orchestrator Intent Decomposition        |
+-------------------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            |                     |                     |
            v                     v                     v
+-----------------------+ +-------------------+ +-------------------+
| Flight Agent          | | Hotel Agent       | | DMC Activity Agent|
| (GDS/NDC Search)      | | (Corporate Rate)  | | (Safari Booking)  |
+-----------------------+ +-------------------+ +-------------------+
            |                     |                     |
            +---------------------+---------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Corporate Policy Agent Validation Check             |
|   (Validates flight fare and hotel rate against corporate caps)   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|         Synthesize Consolidated Itinerary & Present Quote         |
+-------------------------------------------------------------------+
```

---

## 3. Structured Handoff Context
When delegating across specialist agents, the orchestrator passes structured context:
```json
{
  "userId": "usr_98123",
  "corporateAccountId": "corp_7721",
  "intent": "CORPORATE_TRIP_PLANNING",
  "destination": "DXB",
  "dates": { "start": "2026-10-15", "end": "2026-10-20" },
  "budgetCapUsd": 2500,
  "confidenceScore": 0.98
}
```
