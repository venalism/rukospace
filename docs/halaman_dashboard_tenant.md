# Halaman: Dashboard Tenant (Penyewa)

## Deskripsi Umum
Dashboard untuk penyewa ruko. Halaman ini berfungsi untuk:
- Melihat overview rental aktif dan upcoming activities
- Mengelola survei yang dijadwalkan
- Melihat riwayat pembayaran
- Quick stats (active properties, pending invoices)
- Akses ke support / customer service

## Status Desain
- **Kemiripan dengan Design Reference:** ~55% (setelah perbaikan, sebelumnya ~15%)
- **Design Reference:** `docs/design_reference/dashboard_penyewa_rukospace/`

## Elemen yang Sudah Sesuai ✅
- Welcome header dengan nama user + CTA "Search more properties"
- Layout 12-kolom grid (8:4 split)
- Active Rentals section dengan icon header
- Upcoming Surveys section dengan calendar-style date cards (MONTH + DATE)
- Status badges (approved → green, pending → teal border, rejected → red)
- Quick Stats grid 2 kolom (Active Properties, Pending Invoices)
- Recent Payments section dengan "View All" link
- Support card (bg-surface-container + support_agent icon)
- Logout button
- Time display format WIB
- Semua design system tokens konsisten

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Active Rentals cards**: Design ref menampilkan property cards dengan image, specs (sqm, VA), payment info ("Due in 5 days"), saat ini empty state
- **Rental card details**: Property image, next payment amount, lease end date belum ditampilkan
- **Payment history table**: Design ref punya table dengan Invoice ID, Amount, Status columns, saat ini empty state
- **Reschedule button**: Design ref punya "Reschedule" + "Cancel" buttons pada survey items, saat ini hanya "Cancel"
- **Agent info badge**: Design ref menampilkan "Agent: Citra M." badge, belum diimplementasi
- **Top navbar search**: Design ref punya search input di navbar, belum ada
- **Renewal button**: Design ref punya "Renew" CTA pada rentals nearing expiry

## Prioritas Perbaikan untuk Tim
1. Fetch active rentals data dari API dan render property cards dengan images
2. Implementasi payment history table
3. Tambah "Reschedule" functionality pada survey items
4. Wire up "Contact Support" ke messaging system
5. Fetch real stats (active properties count, pending invoices)

## File Terkait
- Source: `frontend/src/pages/DashboardTenant.tsx`
- Router: `frontend/src/App.tsx` (route: `/dashboard/tenant`)
- Design Reference: `docs/design_reference/dashboard_penyewa_rukospace/screen.png`
- Store: `frontend/src/store/authStore.ts` (role check: tenant)
- API: `GET /bookings/mine` (untuk survey data)
