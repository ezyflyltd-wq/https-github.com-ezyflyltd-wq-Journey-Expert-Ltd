# JOURNEY EXPERT LTD. — DESIGN SYSTEM PLAN & TOKENS
**Part 48 Execution • Autonomous Engineering System**

---

## 1. Design Philosophy
The Journey Expert Ltd. Design System is modeled after Stripe-quality precision, Apple-inspired clarity, and Airbnb-level usability.

---

## 2. Token Definitions

### Color Tokens
```css
:root {
  --jel-primary: #0B5D3B;
  --jel-primary-hover: #08472D;
  --jel-secondary: #C8A14A;
  --jel-secondary-hover: #B28E3B;
  --jel-accent: #D62828;
  --jel-bg-light: #FFFFFF;
  --jel-bg-dark: #081C15;
  --jel-text-dark: #1A1A1A;
  --jel-text-light: #F4F4F0;
}
```

### Typography Tokens
- **Display Headings**: `font-serif` or `font-display` (Manrope / Space Grotesk)
- **Body & UI**: `font-sans` (Inter)
- **RTL Arabic**: System Arabic Sans-Serif (`Noto Sans Arabic` fallback)

---

## 3. Core Component Patterns
1. **Search Cards**: Multi-tabbed inputs for Flights, Hotels, Tours, Visas, and Study Abroad with smooth tab transition animations.
2. **Product Cards**: Soft elevated borders (`border border-emerald-900/10 dark:border-emerald-500/20`), subtle hover lift, clear price breakdowns.
3. **Status Badges**: Color-coded pill tags for Instant Confirmation, Visa Checklist Ready, CAS Issued, and Booking Ticketed.
4. **Angela AI Floating Chat Widget**: Glassmorphism backdrop blur with pulse animation when idle.
