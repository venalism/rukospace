# Halaman: Home / Landing Page

## Deskripsi Umum
Landing page RukoSpace adalah halaman utama yang menjadi entry point bagi semua pengunjung. Halaman ini berfungsi untuk:
- Memperkenalkan platform RukoSpace sebagai marketplace penyewaan ruko
- Menyediakan search bar untuk pencarian lokasi dan tipe bisnis
- Menampilkan keunggulan platform (QR Scan, 360° Tour, Verified Specs)
- Menampilkan listing ruko pilihan (featured)
- CTA untuk pemilik ruko yang ingin memasarkan properti

## Status Desain
- **Kemiripan dengan Design Reference:** ~85%
- **Design Reference:** `docs/design_reference/landing_page_rukospace/`

## Elemen yang Sudah Sesuai ✅
- Hero section dengan radial gradient background dan search bar (lokasi + tipe bisnis)
- Features bento grid 3 kolom (QR Scan, 360° Tours, Verified Specs)
- Featured listings dengan property cards (image + verified badge + technical strip + price)
- CTA section "Punya Ruko Kosong?" dengan decorative background
- Mobile floating QR scanner button
- Typography system (display-lg, headline-lg, title-md, body-md, body-sm, technical-data)
- Color tokens (trust-navy, action-amber, success-teal, surface variants)
- Hover shadow transitions pada cards
- Footer dengan navigation links

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Property card images**: Menggunakan external Google CDN URLs, belum ada fallback lokal
- **Search functionality**: Search bar belum terhubung ke filter backend sesungguhnya
- **Trust indicators**: Belum ada statistik "10,000+ ruko terdaftar" atau social proof
- **Mobile nav**: Hamburger menu belum diimplementasi untuk navigasi mobile
- **Animations**: Belum ada entrance animations / scroll-triggered transitions
- **Property card "View Details" button**: Belum link ke `/properties/:id`

## Prioritas Perbaikan untuk Tim
1. Hubungkan search bar ke halaman Search dengan query params
2. Buat property cards klikabel menuju `/properties/:id`
3. Implementasi hamburger menu mobile
4. Tambah entrance animations (fade-in-up) untuk sections

## File Terkait
- Source: `frontend/src/pages/Home.tsx`
- Router: `frontend/src/App.tsx` (route: `/`)
- Design Reference: `docs/design_reference/landing_page_rukospace/screen.png`
