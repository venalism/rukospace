# Halaman: Dashboard Owner (Pemilik Ruko)

## Deskripsi Umum
Dashboard untuk pemilik ruko / agen properti. Halaman ini berfungsi untuk:
- Melihat overview bisnis (revenue, QR scans, active bookings)
- Mengelola listing properti
- Melihat jadwal kunjungan survei
- Mengelola kontrak digital (SPSM)
- Generate QR code untuk listing baru

## Status Desain
- **Kemiripan dengan Design Reference:** ~55% (setelah perbaikan, sebelumnya ~15%)
- **Design Reference:** `docs/design_reference/dashboard_pemilik_rukospace/`

## Elemen yang Sudah Sesuai ✅
- Sidebar navigation dengan Material Symbols icons dan section labels (MANAGEMENT, ACCOUNT)
- Welcome header dengan nama user dan deskripsi
- CTA button "Generate QR for New Listing" (action-amber)
- Analytics bento grid 3 kolom:
  - Projected Revenue (dengan background icon decorative)
  - Total On-site Scans
  - Active Bookings (trust-navy card dengan radial gradient)
- Recent Properties section dengan "View All" link
- Upcoming Visits calendar widget
- Digital Contracts (SPSM) widget
- Hover-elevate animation pada cards
- Logout button di sidebar

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Property cards horizontal**: Design reference punya horizontal card (image + specs + manage button), saat ini hanya empty state
- **Real data**: Semua analytics menampilkan "0" / empty state, belum fetch real data
- **Calendar items**: Design ref menampilkan visitor name + property + time, belum ada data
- **Contract items**: Design ref menampilkan tenant name + status (PENDING SIG / EXECUTED)
- **Create listing form**: Sebelumnya ada form, sekarang hanya empty state + CTA
- **Mobile sidebar**: Sidebar hidden di mobile, belum ada hamburger/bottom nav alternative
- **Dark mode support**: Design reference punya dark mode classes, belum aktif

## Prioritas Perbaikan untuk Tim
1. Fetch real property data dan tampilkan di "Recent Properties" sebagai horizontal cards
2. Fetch booking data untuk "Upcoming Visits"
3. Implementasi "Add Property" flow (form atau modal)
4. Buat mobile navigation (bottom tab bar atau hamburger menu)
5. Wire analytics ke real backend data

## File Terkait
- Source: `frontend/src/pages/DashboardOwner.tsx`
- Router: `frontend/src/App.tsx` (route: `/dashboard/owner`)
- Design Reference: `docs/design_reference/dashboard_pemilik_rukospace/screen.png`
- Store: `frontend/src/store/authStore.ts` (role check: owner/agent)
