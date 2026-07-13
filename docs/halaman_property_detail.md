# Halaman: Property Detail

## Deskripsi Umum
Halaman detail properti menampilkan informasi lengkap satu ruko untuk calon penyewa. Fungsi utama:
- Menampilkan galeri foto properti (hero image)
- Menampilkan spesifikasi teknis (listrik, air, zonasi, parkir) dalam bento grid
- Menampilkan deskripsi dan detail area
- Menyediakan widget booking survei dengan pilihan tanggal dan waktu
- Menampilkan harga sewa dan CTA "Sewa Sekarang"
- Menampilkan QR code untuk on-site scanning

## Status Desain
- **Kemiripan dengan Design Reference:** ~65% (setelah perbaikan, sebelumnya ~30%)
- **Design Reference:** `docs/design_reference/detail_ruko_menteng_strategic/`

## Elemen yang Sudah Sesuai ✅
- Layout 12-kolom grid (8:4) — Left: detail, Right: actions
- Breadcrumb navigation
- Hero gallery dengan verified/in-review badge overlay
- Gallery dan 360° View buttons di hero image
- Technical specifications bento grid (4 kolom: Electricity, Water, Zoning, Parking)
- Pricing card dengan "Lease Rate" dan "Sewa Sekarang" CTA
- Booking widget dengan date picker dan time slot selector (10:00, 13:00, 15:00)
- QR Code section dengan dark inverse-surface background + hover animation
- Sticky sidebar (top-[100px])
- Semua design system tokens (typography, colors, spacing, borders)

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Image gallery**: Hanya placeholder, belum ada image carousel/lightbox
- **Map section**: Design reference punya "Location Context" map, belum diimplementasi
- **Property images dari API**: Belum fetch dan render property photos
- **Floor count**: Design reference menampilkan "3.5 floors", belum ada field ini di data model
- **Secure Escrow badge**: Sudah ada UI-nya, tapi belum ada backend logic
- **Share/Save buttons**: Tidak ada tombol share/bookmark
- **Responsive hero**: Image height bisa terlalu tinggi di tablet landscape

## Prioritas Perbaikan untuk Tim
1. Implementasi image gallery dengan carousel (gunakan property.Images dari API)
2. Tambah Location Context map menggunakan react-leaflet
3. Tambah share/save buttons di header area
4. Wire up "Sewa Sekarang" button ke flow pembayaran

## File Terkait
- Source: `frontend/src/pages/PropertyDetail.tsx`
- Router: `frontend/src/App.tsx` (route: `/properties/:id`)
- Design Reference: `docs/design_reference/detail_ruko_menteng_strategic/screen.png`
- Store: `frontend/src/store/authStore.ts` (untuk auth saat booking)
