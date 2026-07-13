# Halaman: Profil Pemilik Bisnis (Business Owner Profile)

## Deskripsi Umum
Halaman profil publik untuk pemilik properti berjenis badan usaha/perusahaan. Fungsi:
- Menampilkan identitas perusahaan (logo, nama, verified badge)
- Cover image section (company building/office)
- Portfolio overview (total properties, years active, response rate)
- Featured shophouses listing (grid 2 kolom)
- Office headquarters location (dengan map)

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/profil_pemilik_bisnis_citra_holdings/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout
- Desktop: Sidebar (w-64) + Main content (full-width with max-w-5xl)
- Sidebar: Brand, company avatar + "Verified Landlord" badge, navigation
- Pattern background: grid pattern `24px x 24px` + `bg-surface-gray`

### Profile Header Section
- Cover image: `h-48 md:h-64` dengan gradient overlay
- Company avatar: `w-24 md:w-32 rounded-xl border-4 border-white shadow-md` — overlapping cover (-mt-12)
- Company info card: `bg-white/90 backdrop-blur-sm border rounded-lg p-md shadow-sm`
  - Company name: `font-headline-lg text-trust-navy`
  - Verified badge: `bg-white text-success-teal rounded-full border border-success-teal/20`
  - Company description text
- Action buttons: "Contact" (ghost) + "Follow" (primary)

### Bento Grid (12-column)
- **Left column (4 cols):**
  - Portfolio Overview card: Total Properties (12), Years Active (5), Response Rate (98% with bolt icon)
  - Headquarters card: Map image (grayscale) + location pin + address
- **Right column (8 cols):**
  - "Featured Shophouses" title + "View All (12)" link
  - Property grid (2 cols):
    - Property cards dengan image + hover-elevate + scale-105 transition
    - Verified/In-Review status badges
    - Technical strips: sqm + VA + Floors + Parking
    - Lease rate + Details button

### Mobile
- Mobile top app bar (brand + notification icon)
- Mobile bottom nav (Explore, My Rentals, Messages, Profile)
- Profile active state: `bg-secondary-container rounded-full`

## Prioritas Implementasi
1. Buat route `/profile/business/:id` atau `/owners/:id`
2. Buat profile header component (cover + avatar + info)
3. Portfolio overview stats card
4. Property listing grid (reuse existing property card component)
5. Headquarters/location card

## Dependensi Teknis
- Backend API: `GET /users/:id/profile` (public profile data)
- Backend API: `GET /users/:id/properties` (user's listed properties)
- Cover image upload support

## File Terkait
- Design Reference: `docs/design_reference/profil_pemilik_bisnis_citra_holdings/screen.png`
- Related: `docs/design_reference/profil_pemilik_bisnis_citra_holdings/code.html`
