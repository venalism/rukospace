# Halaman: Pembayaran Sewa (Secure Checkout)

## Deskripsi Umum
Halaman checkout/pembayaran sewa untuk tenant. Ini adalah transactional flow page (bukan dashboard). Fungsi:
- Menampilkan order summary (property details + pricing breakdown)
- Memilih metode pembayaran (Virtual Account, Credit Card, e-Wallet)
- Escrow secure checkout dengan terms agreement
- Proses pembayaran final

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/pembayaran_sewa_rukospace/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout
- Simplified header (bukan full navbar) — transactional checkout flow
- Header: back button + "Secure Checkout" title + "ESCROW SECURED" badge (success-teal)
- Grid 12-kolom: Left (7 cols) payment details + Right (5 cols) sticky action card

### Header Bar
- `bg-surface border-b fixed top-0`
- Back button: arrow_back icon
- Title: `font-title-md text-trust-navy`
- Escrow badge: `text-success-teal bg-success-teal/10 rounded-full` + lock icon (filled)

### Left Column: Order Summary + Payment Methods

#### Order Summary Card (`glass-card`)
- "Order Summary" heading
- Property row: image thumbnail (w-32 h-24 rounded-lg) + details
  - "RUKO LEASE" badge (`bg-primary-fixed/30 text-trust-navy`)
  - Property name + address
  - Technical strip: electricity VA + area sqm
- Pricing breakdown (`bg-surface-gray rounded-lg p-md`):
  - Annual Lease Base (1 Year): Rp 350.000.000
  - Security Deposit: Rp 35.000.000 (+ info icon tooltip)
  - Platform Fee (0.5%): Rp 1.750.000
  - Divider
  - **Total Due:** `font-headline-lg text-trust-navy` — Rp 386.750.000

#### Payment Method Section (`glass-card`)
- "Select Payment Method" heading
- Radio card options:
  - **Virtual Account (VA)** — checked by default
    - Bank logos (BCA, Mandiri, BNI) as small badges
    - Description: "Instant confirmation. Highest success rate for corporate limits."
    - Selected state: `border-trust-navy bg-surface`
  - **Credit / Debit Card**
    - Credit card icon
    - "+2% processing fee" note
  - **e-Wallet** — disabled (`opacity-60 cursor-not-allowed`)
    - "Exceeds Limit" badge
    - Description: "Transaction amount exceeds maximum e-Wallet limits."
- Custom radio styling: `w-5 h-5 rounded-full border-2` + inner dot animation

### Right Column: Sticky Action Card
- `sticky top-[100px]`
- Border-top accent: `border-t-4 border-t-trust-navy`
- **Escrow info box:** Shield icon (filled) + "RukoSpace Secure Escrow" explanation
- **Terms checkbox:** "I agree to the Lease Agreement, Terms of Service, and Cancellation Policy" (links)
- **Pay button:**
  - `bg-action-amber text-trust-navy font-title-md py-md rounded-lg`
  - Lock icon + "Pay Rp 386.750.000"
  - Hover: `translateY(-0.5px) shadow-md`
- **SSL indicator:** encrypted icon + "256-bit SSL Encrypted Transaction"

### Styling khusus
- `glass-card` class: `background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px)`
- Custom radio CSS: `.radio-custom:checked + div` border + background change

## Prioritas Implementasi
1. Buat route `/checkout/:propertyId` atau `/payment/:bookingId`
2. Order summary component (property info + pricing breakdown)
3. Payment method selector (radio cards)
4. Escrow action card (terms + pay button)
5. Payment gateway integration (Midtrans / Xendit)

## Dependensi Teknis
- Backend API: `POST /payments/initiate`, `GET /payments/:id/status`
- Payment gateway SDK (Midtrans / Xendit)
- Escrow logic di backend
- Terms of Service + Lease Agreement content

## Catatan Penting
> ⚠️ **Regulatory dependency:** Menurut PRD, payment processing dan escrow memiliki ketergantungan regulasi dan integrasi third-party yang tidak bisa diselesaikan dalam satu hari sprint. Fitur ini di-scope ke post-sprint roadmap.

## File Terkait
- Design Reference: `docs/design_reference/pembayaran_sewa_rukospace/screen.png`
- Related: `docs/design_reference/pembayaran_sewa_rukospace/code.html`
- PRD Reference: `docs/rukospace_PRD.md` (Section: Post-Sprint Backlog)
