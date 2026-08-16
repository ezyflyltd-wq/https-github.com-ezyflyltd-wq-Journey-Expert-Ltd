# Security Specification: Journey Expert Ltd. Firestore Rules

## 1. Data Invariants
1. **User Invariant**: A user profile document `/users/{userId}` can only be created or updated if `request.auth.uid == userId`. Users cannot escalate their role to `admin` or modify their `loyaltyPoints` or `walletBalanceBDT` directly via client writes without strict validation.
2. **Booking Invariant**: A booking document `/bookings/{bookingId}` must have `userId == request.auth.uid` and `userEmail == request.auth.token.email`. Once cancelled or completed, it cannot be modified by non-admin users.
3. **Visa Invariant**: A visa application `/visa_applications/{applicationId}` must belong to the authenticated user (`userId == request.auth.uid`). Once approved/rejected, terminal state locks apply.
4. **Wallet Transaction Invariant**: Transaction records are immutable after creation. Only authenticated owners can create transactions for their own account with valid amount boundaries.
5. **Support Ticket Invariant**: Tickets belong to the authenticated user. Only the ticket owner or admin can view or append messages.
6. **Inquiry Invariant**: Inquiries can be submitted by authenticated users or guest leads with strict field length and type constraints. Once status is `Closed` or `Converted`, non-admins cannot mutate.
7. **Query Enforcement Invariant**: `allow list` queries require explicit `resource.data.userId == request.auth.uid` evaluation to prevent blanket cross-tenant data scraping.

---

## 2. The "Dirty Dozen" Malicious Payloads

1. **Payload 1: Identity Hijack on User Document**
   - *Attack*: User `attacker_uid` attempts to overwrite `/users/victim_uid`.
   - *Result*: PERMISSION_DENIED.

2. **Payload 2: Role Escalation Attack**
   - *Attack*: Customer user attempts to set `role: "admin"` on `/users/{uid}`.
   - *Result*: PERMISSION_DENIED.

3. **Payload 3: Negative/Infinite Wallet Injection**
   - *Attack*: User creates a transaction with `amountBDT: -99999999` or `amountBDT: "infinity"`.
   - *Result*: PERMISSION_DENIED.

4. **Payload 4: Spoofed Booking Owner**
   - *Attack*: Authenticated user submits a booking with `userId: "other_user_id"`.
   - *Result*: PERMISSION_DENIED.

5. **Payload 5: Oversized Denial-of-Wallet Payload**
   - *Attack*: Submitting an inquiry with `message` exceeding 2000 characters or containing script injections.
   - *Result*: PERMISSION_DENIED.

6. **Payload 6: Terminal State Tampering on Bookings**
   - *Attack*: Regular user changing `status` from `Cancelled` to `Confirmed` or mutating `amountBDT`.
   - *Result*: PERMISSION_DENIED.

7. **Payload 7: Unauthenticated Ticket Scraping**
   - *Attack*: Unauthenticated guest attempting to list `/support_tickets` or fetch `/visa_applications/{id}`.
   - *Result*: PERMISSION_DENIED.

8. **Payload 8: ID Poisoning Attack**
   - *Attack*: Attempting to read/write with a document ID containing special exploit characters like `../../etc/passwd` or strings exceeding 128 characters.
   - *Result*: PERMISSION_DENIED.

9. **Payload 9: Ghost Field Injection (Shadow Fields)**
   - *Attack*: Submitting a booking with unauthorized shadow fields like `isAdminOverride: true` or `vipFreePass: true`.
   - *Result*: PERMISSION_DENIED via strict `hasAll` and `size()` boundaries.

10. **Payload 10: Email Spoofing Attack**
    - *Attack*: Using an unverified email token to read admin-level audit documents.
    - *Result*: PERMISSION_DENIED.

11. **Payload 11: Cross-Tenant Transaction Query Scraping**
    - *Attack*: Running a collection query across all `/wallet_transactions` without `where('userId', '==', auth.uid)`.
    - *Result*: PERMISSION_DENIED by query enforcer rule.

12. **Payload 12: Timestamp Tampering (Temporal Violation)**
    - *Attack*: Submitting a custom past or future client timestamp for `createdAt` instead of `request.time`.
    - *Result*: PERMISSION_DENIED.
