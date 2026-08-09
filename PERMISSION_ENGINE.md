# JOURNEY EXPERT AI — TOOL PERMISSION ENGINE & ACTION POLICY
**Part 60 Execution • Autonomous Engineering System**

---

## 1. Tool Permission Engine
Enforces strict policy rules governing which actions an AI agent can execute autonomously versus actions requiring human confirmation:

```
+-------------------------------------------------------------------+
|               Agent Proposes Tool Action (e.g., issue_ticket)     |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Evaluate Action Classification                      |
+-------------------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            | (READ / RECOMMEND / PREPARE)              | (TRANSACTIONAL / FINANCIAL / HIGH-IMPACT)
            v                                           v
+-----------------------------------+       +-----------------------+
|  Autonomous Execution Permitted   |       | Require Explicit User |
|  -> Execute Tool & Return Result  |       | Confirmation in UI    |
+-----------------------------------+       | (Display Summary)     |
                                            +-----------------------+
```

---

## 2. Hard Financial Safety Rules
- **Zero Independent Refunds**: The AI engine cannot independently approve refunds, alter wallet balances, or change bank account credentials.
- **Mandatory Revalidation**: Before asking a user for booking confirmation, the engine executes a live price check to guarantee fare accuracy.
