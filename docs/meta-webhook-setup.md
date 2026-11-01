# Meta webhook setup (Messenger, Instagram, WhatsApp)

Angela answers customer messages from Facebook Messenger, Instagram DMs and WhatsApp.
This setup is scoped to the user-approved Journey Expert BD Facebook Page (ID 1183671364826520), its linked @journeyexpertltd Instagram account, and the approved Journey Expert WhatsApp number. Do not attach other pages or phone numbers without updating the recipient allowlist and reviewing permissions.

    https://journeyexpertltd.com/api/meta/webhook

The code lives in `workers/meta-webhook.js` and is served by the existing `journey-expert-ltd-main` Worker.

## 1. Secrets (Cloudflare dashboard -> Workers -> journey-expert-ltd-main -> Settings -> Variables and Secrets)

Add each as a **Secret**. Never paste these into chat, GitHub or the repo.

| Name | Required | Purpose |
|---|---|---|
| `META_VERIFY_TOKEN` | yes | Any random string you invent. Type the same string into Meta's webhook form. |
| `META_APP_SECRET` | yes | Meta app -> Settings -> Basic -> App secret. Used to verify every request. Without it all POSTs are rejected. |
| `META_PAGE_ACCESS_TOKEN` | for Messenger/Instagram replies | Page access token (long-lived / system-user token). |
| `META_WHATSAPP_TOKEN` | for WhatsApp replies | WhatsApp Cloud API token (system-user token). |
| `META_AUTO_REPLY` | optional | Defaults to disabled. Set to `true` only after an explicit decision to let Angela process and answer messages. |
| `META_ALLOWED_RECIPIENT_IDS` | required for Messenger/Instagram/WhatsApp replies | Comma-separated approved Page ID, Instagram professional account ID and WhatsApp phone-number ID. Replies to other assets are rejected. |
| `HANDOFF_WEBHOOK_URL` | optional | Already used by Angela. Receives `angela.meta_handoff` events when a human must follow up. |

## 2. Meta for Developers

1. Create (or open) the app, add the **Messenger**, **Instagram** and **WhatsApp** products.
2. Webhooks -> set Callback URL to the URL above and Verify token to `META_VERIFY_TOKEN`.
3. Subscribe: `page` -> `messages`; `instagram` -> `messages`; `whatsapp_business_account` -> `messages`.
4. Subscribe the Page to the app. Link the Instagram professional account to the Page.
5. Messages from people who are not app admins/testers only arrive after Meta **App Review** grants
   `pages_messaging`, `instagram_manage_messages` and `whatsapp_business_messaging`. Until then, test with admin/tester accounts.

## 3. Storing leads in D1 (optional)

If a D1 binding named `META_DB` exists, inbound message content and sender IDs are stored in `meta_message_events` (the table is created automatically). No database is bound by this integration. Do not bind one until the privacy notice, retention and deletion process have been reviewed. Without D1 and with auto-reply disabled, webhook events are acknowledged and discarded.

Bind it in the dashboard: Worker -> Settings -> Bindings -> Add -> D1 database -> variable name `META_DB`.

Note: `deploy-angela-worker.yml` deploys with the CLI and no wrangler config, so a dashboard-added binding
may be dropped by the next deploy. If that happens the webhook keeps working (it just stops storing); the
durable fix is declaring the binding in a wrangler config used by that workflow, which is a change to a
production-sensitive file and needs your explicit review.

## Behaviour and safeguards

- Every POST must carry a valid `X-Hub-Signature-256`; otherwise 401.
- Meta re-deliveries are de-duplicated by message id (needs `META_DB`).
- Medical emergencies and document-fraud requests get a fixed safety response only when auto-reply is explicitly enabled.
- Replies reuse Angela's verified-knowledge rules: no invented prices, visa outcomes or bookings.
- Auto-reply is off by default. While off, message text is not sent to Gemini or the handoff destination.
- Before enabling replies, set `META_ALLOWED_RECIPIENT_IDS` to the exact approved receiving asset IDs.
- Attachments/non-text messages are handled only when auto-reply is explicitly enabled.
- A sender is rate-limited to 12 messages per minute (needs `META_DB`).
- When explicitly enabled, replies are sent after the customer's message, inside Meta's 24-hour reply window.
- Customer messages are personal data. Keep the privacy policy and data-deletion page accurate for Meta review.
