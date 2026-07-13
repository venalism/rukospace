# Halaman: Profil Pemilik Individu (Individual Owner Profile)

## Deskripsi Umum
Halaman profil publik untuk pemilik properti berjenis individu/perorangan. Fungsi:
- Menampilkan identitas pemilik (foto, nama, verified badge)
- Stats ringkas (listings count, rating, tenure)
- Bio/about section dengan CTA contact
- Managed properties listing (grid 2 kolom)
- Tenant reviews section

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/profil_pemilik_individu_budi_satria/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout (12-column Bento Grid)
- Top navbar: "RukoSpace" brand + navigation (Marketplace, Solutions, About)
- Grid: Left column (4 cols) + Right column (8 cols)

### Left Column: Profile Card & Bio
- **Identity Card:**
  - Gradient background overlay (`bg-gradient-to-b from-surface-container-low`)
  - Avatar: `w-32 h-32 rounded-full border-4 border-surface shadow-sm`
  - Name: `font-headline-lg text-trust-navy`
  - Title: "Independent Property Investor"
  - Verified badge: `bg-surface-container text-success-teal rounded-full` + verified_user icon (filled)
  - Stats row (3 columns with dividers):
    - 12 LISTINGS
    - 4.9 ⭐ RATING (star icon filled `text-action-amber`)
    - 5y TENURE
- **Bio & Contact Card:**
  - "About [Name]" heading
  - Bio text paragraph
  - 2 CTA buttons:
    - "Contact Owner" (`bg-trust-navy text-on-primary`)
    - "Book Consultation" (ghost: `border border-trust-navy text-trust-navy`)

### Right Column: Properties & Reviews
- **Managed Properties** heading + "View All" link (`text-action-amber`)
- Property grid (2 columns):
  - Cards: image + hover scale-105 + verified badge
  - Technical strip: sqm + VA
  - Price: "Rp 250M /yr"
  - Details button (ghost)
- **Recent Tenant Reviews:**
  - Star rating display (4.5 stars filled `text-action-amber`) + count "(24)"
  - Review cards:
    - Initials avatar circle (e.g., "AT", "KF")
    - Reviewer name + tenancy duration ("2 YEARS TENANCY")
    - Date
    - Review text (italic quotes)

### Mobile
- Mobile bottom nav (Explore, My Rentals, Messages, Profile)

## Prioritas Implementasi
1. Buat route `/profile/:id` atau `/owners/:id` (shared dengan bisnis, beda layout)
2. Buat identity card component (avatar + stats)
3. Bio section dengan contact CTAs
4. Property listing grid
5. Tenant reviews section

## Dependensi Teknis
- Backend API: `GET /users/:id/profile`
- Backend API: `GET /users/:id/properties`
- Backend API: `GET /users/:id/reviews`

## File Terkait
- Design Reference: `docs/design_reference/profil_pemilik_individu_budi_satria/screen.png`
- Related: `docs/design_reference/profil_pemilik_individu_budi_satria/code.html`
