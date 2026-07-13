# RukoSpace — Marketplace Penyewaan Ruko

> Platform tepercaya untuk mencari dan menyewakan ruang komersial (ruko/shophouse) dengan data teknis yang terverifikasi.

---

## 📋 Deskripsi

RukoSpace menghubungkan tiga kelompok pengguna dalam satu platform:
- **Tenant (Penyewa)** — Mencari ruko berdasarkan lokasi, spesifikasi teknis, dan jadwal survei
- **Owner / Agent (Pemilik / Agen)** — Memasarkan properti dengan data terverifikasi dan QR code on-site
- **Admin** — Mengelola verifikasi listing dan kualitas data platform

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Vite 8 |
| **Styling** | TailwindCSS v4 + PostCSS |
| **State Management** | Zustand |
| **Routing** | React Router v7 |
| **Map** | React-Leaflet + OpenStreetMap |
| **Icons** | Material Symbols Outlined (Google Fonts) |
| **Backend** | Go + Fiber framework |
| **Database** | PostgreSQL |
| **Containerization** | Docker + Docker Compose |

## 📁 Struktur Folder

```
rukospace/
├── backend/               # Go Fiber API server
├── frontend/              # React SPA
│   ├── src/
│   │   ├── pages/         # Halaman-halaman utama
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── Search.tsx           # Pencarian + peta
│   │   │   ├── PropertyDetail.tsx   # Detail properti
│   │   │   ├── Login.tsx            # Login
│   │   │   ├── Register.tsx         # Registrasi
│   │   │   ├── DashboardOwner.tsx   # Dashboard pemilik
│   │   │   ├── DashboardTenant.tsx  # Dashboard penyewa
│   │   │   └── DashboardAdmin.tsx   # Dashboard admin
│   │   ├── store/
│   │   │   └── authStore.ts         # Auth state (Zustand)
│   │   ├── App.tsx          # Router + layout (nav + footer)
│   │   ├── App.css          # Utility CSS classes
│   │   ├── index.css        # Tailwind imports + base styles
│   │   └── main.tsx         # Entry point
│   ├── tailwind.config.js   # Design system tokens
│   ├── index.html           # HTML entry + font imports
│   └── package.json
├── docs/
│   ├── design_reference/    # 15 design reference (HTML + PNG)
│   ├── halaman_*.md         # Dokumentasi per halaman
│   ├── rukospace_PRD.md     # Product Requirements Document
│   ├── rukospace_laporan.md # Laporan proyek
│   └── rukospace_sprintplan.md # Sprint plan
├── uploads/                 # File uploads (property images)
├── docker-compose.yml       # Docker orchestration
└── README.md                # Dokumen ini
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 20+
- Go 1.22+
- Docker & Docker Compose
- PostgreSQL (atau gunakan Docker)

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### Backend Development

```bash
cd backend
go mod download
go run main.go
```

### Full Stack (Docker)

```bash
docker-compose up --build
```

### Environment Variables

Buat file `.env` di folder `frontend/`:
```env
VITE_API_URL=http://localhost:8080/api
```

## 🎨 Design System

Design system RukoSpace ("RukoSpace Pro") didokumentasikan lengkap di:
- **Spec:** [`docs/design_reference/rukospace_pro/DESIGN.md`](docs/design_reference/rukospace_pro/DESIGN.md)
- **Design References:** 15 halaman di [`docs/design_reference/`](docs/design_reference/)

### Prinsip Utama:
- **Trust Navy** (#0F4C81) — Warna utama, header, navigasi
- **Action Amber** (#F59E0B) — CTA buttons, highlight
- **Success Teal** (#10B981) — Verified badges, status success
- **Inter** — Font eksklusif untuk semua teks
- **4px base unit** — Spacing system (xs=4, sm=8, md=16, lg=24, xl=32)

### Mapping Halaman → Design Reference

| Halaman | Design Reference Folder | Kemiripan |
|---------|------------------------|-----------|
| Home (Landing) | `landing_page_rukospace` | ~85% |
| Login | — (design system umum) | ~70% |
| Register | — (design system umum) | ~70% |
| Property Detail | `detail_ruko_menteng_strategic` | ~65% |
| Search | `preview_ruko_senopati_strategic` | ~55% |
| Dashboard Owner | `dashboard_pemilik_rukospace` | ~55% |
| Dashboard Tenant | `dashboard_penyewa_rukospace` | ~55% |
| Dashboard Admin | `manajemen_ruko_admin_rukospace` | ~45% |

### Halaman yang Belum Diimplementasi

| Design Reference | Deskripsi |
|-----------------|-----------|
| `customer_service_chat_admin_rukospace` | Chat admin CS |
| `daftar_pesan_rukospace` | Daftar pesan |
| `detail_chat_rukospace` | Detail chat |
| `pembayaran_sewa_rukospace` | Halaman pembayaran |
| `profil_pemilik_bisnis_citra_holdings` | Profil pemilik bisnis |
| `profil_pemilik_individu_budi_satria` | Profil pemilik individu |
| `profil_penyewa_siska_putri` | Profil penyewa |

## 📖 Dokumentasi Per Halaman

Dokumentasi lengkap setiap halaman (desain, fungsi, gap analysis) tersedia di:

| Halaman | Dokumentasi |
|---------|------------|
| Home | [`docs/halaman_home.md`](docs/halaman_home.md) |
| Property Detail | [`docs/halaman_property_detail.md`](docs/halaman_property_detail.md) |
| Dashboard Owner | [`docs/halaman_dashboard_owner.md`](docs/halaman_dashboard_owner.md) |
| Dashboard Tenant | [`docs/halaman_dashboard_tenant.md`](docs/halaman_dashboard_tenant.md) |
| Dashboard Admin | [`docs/halaman_dashboard_admin.md`](docs/halaman_dashboard_admin.md) |
| Login | [`docs/halaman_login.md`](docs/halaman_login.md) |
| Register | [`docs/halaman_register.md`](docs/halaman_register.md) |
| Search | [`docs/halaman_search.md`](docs/halaman_search.md) |

Setiap file berisi: deskripsi fungsi, % kemiripan, elemen yang sudah sesuai, gap analysis, dan prioritas perbaikan.

## 🤝 Kontribusi

Lihat [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) untuk panduan workflow, naming conventions, dan code review checklist.

## 📄 Referensi

- [Product Requirements Document](docs/rukospace_PRD.md)
- [Sprint Plan](docs/rukospace_sprintplan.md)
- [Laporan Proyek](docs/rukospace_laporan.md)
