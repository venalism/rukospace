# Halaman: Login

## Deskripsi Umum
Halaman login untuk semua role (Tenant, Owner, Agent, Admin). Fungsi:
- Autentikasi user via email dan password
- Redirect berdasarkan role setelah login sukses
- Link ke halaman Register untuk user baru

## Status Desain
- **Kemiripan dengan Design Reference:** ~70% (setelah perbaikan, sebelumnya ~40%)
- **Design Reference:** Tidak ada design reference khusus — mengikuti design system umum (DESIGN.md)

## Elemen yang Sudah Sesuai ✅
- Centered card layout (max-w-md)
- Card styling: `bg-surface-container-lowest rounded-xl border border-border-subtle shadow-sm`
- Icon header (lock_open icon dalam circle background)
- Headline typography (`font-headline-lg-mobile text-trust-navy`)
- Input fields dengan Material Symbols icons (mail, lock)
- Input styling: `bg-surface-gray rounded-lg border focus-within:border-trust-navy`
- Label typography: `font-label-caps text-label-caps uppercase`
- Error state: `bg-error-container text-on-error-container` dengan error icon
- Submit button: `bg-trust-navy text-on-primary font-bold rounded-lg`
- Footer link ke Register dengan border-top separator

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **"Forgot Password" link**: Tidak ada, belum ada recovery flow
- **Social login**: Tidak ada Google/OAuth options
- **Remember me checkbox**: Tidak ada option persist session
- **Loading state**: Button tidak menampilkan spinner saat submitting
- **Password visibility toggle**: Tidak ada eye icon untuk show/hide password
- **Rate limiting feedback**: Tidak ada feedback jika terlalu banyak percobaan login

## Prioritas Perbaikan untuk Tim
1. Tambah loading spinner pada submit button
2. Implementasi password visibility toggle
3. Buat "Forgot Password" flow (jika backend support)
4. Tambah "Remember me" checkbox

## File Terkait
- Source: `frontend/src/pages/Login.tsx`
- Router: `frontend/src/App.tsx` (route: `/login`)
- Store: `frontend/src/store/authStore.ts` (setAuth function)
- API: `POST /auth/login`
