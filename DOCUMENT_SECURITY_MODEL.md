# JOURNEY EXPERT LTD. — MEDICAL DOCUMENT SECURITY & PRIVACY MODEL
**Part 54 Execution • Autonomous Engineering System**

---

## 1. Secure Medical Vault Architecture
Protected Health Information (PHI), diagnostic imaging files (DICOM/JPEG/PDF), pathology reports, and prescriptions are handled under enhanced data security controls adhering to global medical privacy regulations (HIPAA, GDPR, Bangladesh Data Protection Regulations).

---

## 2. Document Classification
1. **Diagnostic & Imaging Records**: MRI scans, CT scans, X-Rays, Ultrasound, ECG/ECHO, Biopsy Reports.
2. **Clinical Summaries**: Doctor Referral Letters, Hospital Discharge Summaries, Current Medication Prescriptions.
3. **Identity & Travel**: Passport Copies, Patient/Companion Photographs, National ID.
4. **Financial & Insurance**: Hospital Cost Estimates, Guarantee Letters, Insurance Approval Documents, Payment Receipts.
5. **Hospital & Visa Forms**: Official Medical Visa Invitation Letters, Fit-to-Fly Certificates.

---

## 3. Security Implementation
- **AES-256 Storage Encryption**: Files stored in private cloud buckets with zero public access.
- **Signed Short-Lived Access**: Downloads authorized via signed URLs expiring strictly within 15 minutes.
- **Granular Role-Based Access Control**:
  - `PATIENT`: Accesses own uploaded vault.
  - `CASE_COORDINATOR`: Accesses assigned active patient cases.
  - `HOSPITAL_IPC_USER`: Accesses files explicitly consented for hospital evaluation.
- **Immutable Audit Logging**: Logs every view, download, or sharing action with `user_id`, `role`, `timestamp`, `ip_address`, and `purpose`.
