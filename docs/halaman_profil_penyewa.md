# Halaman: Profil Penyewa (Tenant Profile)

## Deskripsi Umum
Halaman profil untuk tenant/penyewa. Fungsi:
- Menampilkan identitas penyewa (foto, nama, verified badge, bisnis)
- Contact details (telepon, email, perusahaan NIB)
- Search preferences/requirements (zonasi, listrik, area, budget)
- Reliability score (completed leases, on-time payment rate)
- Rental portfolio (active lease + past rentals)

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/profil_penyewa_siska_putri/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout
- Desktop: Sidebar (w-64) + main content
- Sidebar: Brand "RukoSpace", navigation, user info card di bottom
- Active nav: `bg-surface-container-high text-trust-navy font-bold`

### Profile Header Bento (3-column grid)
- **Identity Card (2 cols):**
  - Avatar: `w-24 md:w-32 rounded-full border-4 border-surface shadow-sm`
  - Name: `font-display-lg text-trust-navy`
  - Verified badge: `bg-[#E6F4EA] text-success-teal rounded-full` + verified icon filled
  - Bio: "Founder of 'Brew & Bites' Cafe..."
  - 2 CTAs: "Message" (primary) + "Download Profile" (ghost)
- **Contact Details (1 col):**
  - Phone: phone_iphone icon
  - Email: email icon
  - Company: storefront icon + "NIB Verified"

### Requirements & Stats (2-column grid)
- **Search Preferences card:**
  - "Active Searching" status badge
  - Preference chips (bg-surface-gray border):
    - "F&B Allowed" (restaurant icon)
    - "Min 22,000 VA" (bolt icon)
    - "150 - 300 sqm" (straighten icon)
    - "South Jakarta, Central Jakarta" (location_city icon)
    - "Budget: Rp 300-500M / Yr" (payments icon)
- **Reliability Score card:**
  - Grid 2x: Completed Leases (3), On-Time Payment Rate (100%)
  - Score stats: `font-display-lg text-success-teal` / `text-trust-navy`

### Rental Portfolio
- "Rental Portfolio" heading + domain icon
- **Active Rental:**
  - Horizontal card: image (1/3) + details (2/3)
  - "Active Lease" badge: `bg-action-amber text-trust-navy`
  - Property name + address
  - Info chips: "Expires in 8 Months", "Landlord Rating: 5.0"
  - Landlord info + "View Details" button
- **Past Rental:**
  - Reduced opacity (opacity-80 hover:opacity-100)
  - "(Past)" label + completion date
  - Landlord testimonial (italic, border-l-2)

### Mobile
- Mobile header: Brand + hamburger menu
- Bottom nav: Explore, My Rentals, Messages, **Profile** (active)

## Prioritas Implementasi
1. Buat route `/profile/tenant/:id` atau `/tenants/:id`
2. Identity card component
3. Search preferences chips component
4. Reliability score stats
5. Rental portfolio (active + past cards)

## Dependensi Teknis
- Backend API: `GET /users/:id/profile`
- Backend API: `GET /users/:id/rentals` (active + completed)
- NIB verification status field

## File Terkait
- Design Reference: `docs/design_reference/profil_penyewa_siska_putri/screen.png`
- Related: `docs/design_reference/profil_penyewa_siska_putri/code.html`
