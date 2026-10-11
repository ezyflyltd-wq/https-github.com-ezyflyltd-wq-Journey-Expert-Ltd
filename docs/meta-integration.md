# Angela Meta messaging activation

App: JEL Angela Customer Assistant, 2390658631341269.
Business portfolio: 843551278154167.
Callback: https://journeyexpertltd.com/angela/meta-webhook

## Implemented

- GET challenge with a server-only verification token.
- SHA-256 HMAC over raw POST bytes with the Meta app secret.
- Explicit Page, Instagram, WABA and WhatsApp phone ID allowlists.
- Text-only customer-initiated replies; echoes, receipts and stale messages ignored.
- Existing bilingual Angela chat handler; no template or marketing messages.
- D1 atomic delivery claims; ambiguous sends are retained as `uncertain` for manual investigation rather than retried.
- D1 stores only hashed event keys, state, random claims and timestamps. Thirty-day cleanup runs on deliveries. No full message or sender ID storage.
- Automatic replies disabled until configuration and testing are complete.

## Production secrets (Cloudflare Pages)

Enter secrets directly in Cloudflare; never place them in chat, source code, browser JavaScript, URLs or VITE variables.

| Variable | Purpose |
| --- | --- |
| META_APP_SECRET | Signature verification for this Meta app |
| META_VERIFY_TOKEN | Random webhook setup token, identical in Meta and Cloudflare |
| META_PAGE_ACCESS_TOKEN | Page-scoped Messenger token |
| META_INSTAGRAM_ACCESS_TOKEN | Instagram token for the Facebook Login integration |
| META_WHATSAPP_ACCESS_TOKEN | WhatsApp Cloud API token, if Cloud API is provisioned |

Non-secret variables: META_PAGE_ID, META_INSTAGRAM_ID, META_WABA_ID, META_WHATSAPP_PHONE_ID, META_GRAPH_VERSION (verify the supported version in the app dashboard), META_AUTO_REPLY_ENABLED.
D1 binding: META_EVENTS. Schema: migrations/meta-events.sql.

Do not assume the existing WhatsApp Business mobile app account is a Cloud API phone. Confirm supported onboarding/coexistence and avoid deregistering the live number.

## Review and activation gates

1. Business verification submitted; wait for Meta's decision.
2. Configure the public privacy policy and data-deletion instructions in App settings.
3. Configure verified callback and subscribe Page/Instagram message fields and the appropriate assets.
4. Confirm permissions and generate scoped access tokens through the user's approval flow.
5. Test with app roles while unpublished; record a genuine working demo for App Review.
6. Submit only permissions actually used. Do not claim global access, background marketing or completed human handoff.
7. Activate one channel at a time after testing. Outbound failures need operator follow-up; delivery is not guaranteed.

## Limitations

No live credentials or Graph version are configured by this change. No production customer messages have been sent. Transport currently has no conversation memory, attachment handling, inbox pause toggle, operator alerting or confirmed agent handover. AI quota limits still apply. Sending synchronously can exceed Meta's delivery timeout; D1 claims protect concurrent retries, but a durable queue is preferable before large-scale traffic.
