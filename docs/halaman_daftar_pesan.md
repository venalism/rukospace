# Halaman: Daftar Pesan (Message List)

## Deskripsi Umum
Halaman daftar semua percakapan/pesan untuk user (tenant/owner). Fungsi:
- Menampilkan inbox pesan yang dikelompokkan per properti
- Search bar untuk mencari nama properti atau pengirim
- Filter tabs: Semua | Belum Dibaca | Arsip
- Navigasi ke detail chat individual

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/daftar_pesan_rukospace/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout
- Desktop: Sidebar kiri (w-64) + main content area
- Mobile: Full-width dengan bottom nav bar
- Sidebar profile card (avatar + nama + "Verified Tenant" badge)
- "Find New Property" CTA di sidebar (action-amber)

### Sidebar Navigation
- Dashboard, Listings, Bookings, Transactions, **Direct Messages** (active), Settings
- Active state: `bg-primary-container text-on-primary-container font-semibold`
- Footer: Help Center + Logout

### Header & Controls
- Title: "Pesan Saya" (`font-headline-lg text-trust-navy`)
- Search bar: `bg-surface-container-lowest border rounded-lg` + search icon
- Filter pills (rounded-full):
  - Active: `bg-trust-navy text-on-primary`
  - Inactive: `border border-border-subtle bg-surface-container-lowest`

### Chat Items (Card-based list)
- **Unread item:**
  - Left blue bar indicator (`w-1 bg-trust-navy rounded-l-xl`)
  - Property image thumbnail (w-16 h-16 rounded-lg)
  - Property title (`font-title-md text-trust-navy`)
  - Sender line: person icon + nama
  - Preview text (font-semibold untuk unread)
  - Unread dot indicator (`w-2.5 h-2.5 bg-error-red rounded-full`)
  - Category badge (e.g., "INQUIRY")
  - Time stamp (`font-label-caps`)
- **Read item:**
  - Sama tapi tanpa blue bar dan red dot
  - Title color: `text-on-surface` (bukan trust-navy)
  - Preview text: normal weight, text-on-surface-variant
  - Category badges: "SURVEY", "SYSTEM"
- **System message item:**
  - Icon placeholder (apartment icon) sebagai thumbnail
  - Double-check icon (done_all) + text

### Mobile Bottom Nav
- 5 tabs: Search, Saved, **Chat** (active), Manage, Profile
- Active tab: `bg-secondary-container scale-95`

## Prioritas Implementasi
1. Buat route `/messages` atau `/inbox`
2. Implementasi message list dari API
3. Buat chat item component (reusable)
4. Implementasi search + filter tabs
5. Mobile bottom nav bar (shared component)

## Dependensi Teknis
- Backend API: `GET /messages/conversations`
- Unread count tracking
- Real-time notification untuk new messages

## File Terkait
- Design Reference: `docs/design_reference/daftar_pesan_rukospace/screen.png`
- Related: `docs/design_reference/daftar_pesan_rukospace/code.html`
