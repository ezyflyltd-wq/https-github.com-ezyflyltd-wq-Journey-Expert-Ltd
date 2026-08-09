# JOURNEY EXPERT LTD. — DOCUMENT VAULT ARCHITECTURE
**Part 52 Execution • Autonomous Engineering System**

---

## 1. Secure Document Storage Model
The JEL Document Vault protects sensitive student identity, academic, and financial documents through private cloud storage and granular access controls.

---

## 2. Document Classification Directory
1. **Identity & Travel**: Passport copies, National ID (NID), Birth Certificate, Digital Photographs.
2. **Academic Credentials**: Secondary School Certificate (SSC), Higher Secondary Certificate (HSC), Bachelor's Degree, Semester Transcripts.
3. **English Proficiency**: IELTS Official Test Report Form (TRF), PTE Academic Score Report, TOEFL iBT.
4. **Statement & Recommendations**: Statement of Purpose (SOP), Academic Letters of Recommendation (LOR), Work Experience Certificates.
5. **Financial & Sponsorship Evidence**: Bank Solvency Certificate, 6-Month Bank Statement, Tax Return Certificates (TIN), Property Evaluation, Sponsor Affidavit.
6. **Immigration & Visa Documents**: CAS Letter, I-20 Form, Tuberculosis (TB) Test Clearance, VFS/TLS Biometric Appointment Slip.

---

## 3. Vault Security Rules
- **Encrypted Storage**: All uploaded files are encrypted at rest using AES-256.
- **Signed Private URLs**: Document download links are time-limited signed URLs expiring after 15 minutes.
- **Role-Based Access Control**: Students access only their own vault; Assigned Counselors access assigned students; University partners access authorized application documents.
- **Document Versioning**: Replaced or updated documents preserve historical versions with audit logs (`uploaded_by`, `timestamp`, `review_status`).
