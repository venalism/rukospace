# Halaman: Dashboard Admin

## Deskripsi Umum
Dashboard untuk administrator platform RukoSpace. Halaman ini berfungsi untuk:
- Melihat overview platform (pending verifications, total properties, total users)
- Mengelola verification queue (approve/reject listing)
- Memonitor recent activity
- Melihat system status

## Status Desain
- **Kemiripan dengan Design Reference:** ~45% (setelah perbaikan, sebelumnya ~10%)
- **Design Reference:** `docs/design_reference/manajemen_ruko_admin_rukospace/` dan `docs/design_reference/manajemen_user_admin_rukospace/`

## Elemen yang Sudah Sesuai ✅
- Sidebar navigation dengan Material Symbols icons (Verification Queue, All Properties, User Management, Analytics, Settings)
- Section labels (MANAGEMENT, SYSTEM)
- Stats overview grid 4 kolom (Pending Verification, Verified Properties, Total Properties, Total Users)
- Background icon decorative pada stats cards
- Hover-elevate animations
- Verification Queue table dengan column headers (PROPERTY, OWNER, SUBMITTED, ACTION)
- Recent Activity widget
- System Status card (trust-navy background dengan API/Database status indicators)
- Logout button dengan error-red styling

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Verification table rows**: Design ref menampilkan property data di table rows dengan approve/reject buttons, saat ini empty state
- **User Management view**: Ada design reference khusus (`manajemen_user_admin_rukospace`) yang belum terimplementasi — perlu sub-tab/view switching
- **Property detail modal**: Admin seharusnya bisa klik property di queue dan lihat detail sebelum approve/reject
- **Bulk actions**: Belum ada checkbox untuk bulk approve/reject
- **Search & Filter**: Tidak ada search bar di sidebar untuk filter properties/users
- **Pagination**: Table akan butuh pagination saat data banyak
- **Customer service chat**: Ada design reference `customer_service_chat_admin_rukospace`, halaman ini belum dibuat
- **Real data**: Semua stats menampilkan 0, belum fetch dari API

## Prioritas Perbaikan untuk Tim
1. Implementasi API fetch untuk verification queue (`GET /admin/properties/pending`)
2. Buat approve/reject actions pada queue items
3. Buat User Management sub-view (tab switching)
4. Tambah search/filter di verification table
5. Implementasi halaman baru: Customer Service Chat

## File Terkait
- Source: `frontend/src/pages/DashboardAdmin.tsx`
- Router: `frontend/src/App.tsx` (route: `/dashboard/admin`)
- Design Reference:
  - `docs/design_reference/manajemen_ruko_admin_rukospace/screen.png`
  - `docs/design_reference/manajemen_user_admin_rukospace/screen.png`
- Store: `frontend/src/store/authStore.ts` (role check: admin)
