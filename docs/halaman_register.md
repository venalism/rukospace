# Halaman: Register (Pendaftaran)

## Deskripsi Umum
Halaman registrasi user baru. Fungsi:
- Pendaftaran akun baru dengan nama, email, telepon, password
- Pemilihan role (Tenant, Owner, Agent) melalui visual card selector
- Redirect ke halaman Login setelah registrasi berhasil

## Status Desain
- **Kemiripan dengan Design Reference:** ~70% (setelah perbaikan, sebelumnya ~40%)
- **Design Reference:** Tidak ada design reference khusus — mengikuti design system umum (DESIGN.md)

## Elemen yang Sudah Sesuai ✅
- Centered card layout (max-w-md)
- Card styling konsisten dengan Login page
- Icon header (person_add icon dalam circle background)
- Headline typography dan sub-description
- 5 input fields semua dengan Material Symbols icons:
  - Nama Lengkap (person icon)
  - Email (mail icon)
  - Telepon (phone icon)
  - Password (lock icon)
  - Role selection (visual cards)
- **Role selector visual cards** — improvement dari dropdown menjadi card-based selection:
  - Setiap role punya icon, label, dan deskripsi
  - Selected state: `border-trust-navy bg-surface-container-low` + check_circle icon
  - Unselected state: `border-border-subtle bg-surface-gray`
- Label typography: `font-label-caps text-label-caps uppercase`
- Error state menggunakan `bg-error-container`
- Footer link ke Login

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Terms & Conditions checkbox**: Tidak ada agreement checkbox sebelum daftar
- **Password strength indicator**: Tidak ada visual feedback kekuatan password
- **Phone validation**: Tidak ada validasi format nomor telepon Indonesia
- **Email verification**: Tidak ada flow verifikasi email setelah daftar
- **Loading state**: Button tidak menampilkan spinner saat submitting
- **Success toast**: Tidak ada notifikasi sukses sebelum redirect

## Prioritas Perbaikan untuk Tim
1. Tambah loading spinner pada submit button
2. Implementasi password strength indicator
3. Validasi format telepon (regex: 08xxx atau +62xxx)
4. Tambah Terms & Conditions checkbox + link

## File Terkait
- Source: `frontend/src/pages/Register.tsx`
- Router: `frontend/src/App.tsx` (route: `/register`)
- API: `POST /auth/register`
