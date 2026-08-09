# JOURNEY EXPERT LTD. — MULTI-TENANT & WHITE-LABEL SAAS ARCHITECTURE
**Part 51 Execution • Autonomous Engineering System**

---

## 1. Multi-Tenant Isolation Model
The Journey Expert Ltd. platform utilizes a logical multi-tenant data architecture where every tenant-aware database record includes a mandatory `organization_id` and `tenant_id` foreign key bound to strict PostgreSQL Row Level Security (RLS) policies.

---

## 2. White-Label Customization Capabilities
- **Custom Domain Routing**: Automatic SSL certificate generation and dynamic domain mapping (`travel.partneragency.com` -> JEL Tenant Engine).
- **Dynamic Brand Theme**: Custom CSS variable injection for brand primary/secondary colors, logos, favicons, and typography.
- **Tenant-Specific Product Catalog**: Toggleable feature flags enabling or disabling Flights, Hotels, Tour Packages, Visas, Study Abroad, or Hajj & Umrah.
- **Independent Currency & Markup Rules**: Define default display currencies (BDT, USD, GBP, EUR, SAR, AED) and custom profit margins per product category.

---

## 3. Security & Data Protection
- **Cross-Tenant Access Prevention**: Server-side verification enforces tenant context on every REST API request, blocking cross-tenant query injection or IDOR vulnerabilities.
- **Tenant Isolation Testing**: Continuous security regression testing ensures tenant A cannot access tenant B's customer profiles, booking references, or financial statements.
