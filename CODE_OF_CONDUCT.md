# Code of Conduct — RukoSpace Development

> Panduan workflow dan standar kode untuk tim pengembang RukoSpace. Dokumen ini membantu mempermudah pengerjaan website dengan menyediakan groundwork yang mudah dipahami.

---

## 🏗️ Layout / Groundwork yang Sudah Disiapkan

### Apa yang Sudah Ada

1. **Design System** — Semua tokens (colors, typography, spacing, border-radius) sudah di-konfigurasi di `tailwind.config.js`
2. **Page Layout** — 8 halaman utama sudah memiliki layout yang mengikuti design reference
3. **Routing** — React Router sudah dikonfigurasi di `App.tsx` dengan semua routes
4. **Auth Store** — Zustand store untuk autentikasi sudah ada di `store/authStore.ts`
5. **Design References** — 15 design reference (HTML + screenshot) ada di `docs/design_reference/`
6. **Dokumentasi** — 8 file dokumentasi halaman ada di `docs/halaman_*.md`

### Apa yang Perlu Dikerjakan Tim

Lihat setiap file `docs/halaman_*.md` untuk detail gap analysis dan prioritas per halaman.

---

## 📐 Naming Conventions

### File & Folder
```
pages/NamaHalaman.tsx          # PascalCase untuk komponen React
store/namaStore.ts             # camelCase untuk stores
docs/halaman_nama_halaman.md   # snake_case untuk dokumentasi
```

### Komponen React
```tsx
// ✅ Good — PascalCase, export default
export default function PropertyDetail() { ... }

// ❌ Bad — arrow function export
export const propertyDetail = () => { ... }
```

### CSS Classes (Tailwind)
Gunakan design system tokens, **jangan hardcode values**:
```tsx
// ✅ Good — Design system tokens
className="bg-surface-container-lowest rounded-xl border border-border-subtle p-lg"

// ❌ Bad — Hardcoded values
className="bg-white rounded-[12px] border border-[#E2E8F0] p-6"
```

### Design System Color Usage
```
trust-navy      → Headers, primary nav, primary buttons
action-amber    → CTA buttons ("Cari Ruko", "Book Survey", "Generate QR")
success-teal    → Verified badges, success states
error-red       → Error messages, delete actions
surface-gray    → Page background
surface-container-lowest → Card backgrounds (white)
on-surface      → Primary text
on-surface-variant → Secondary text
outline         → Placeholder text, disabled icons
```

---

## 🎯 Cara Mengerjakan Halaman Baru

### Step 1: Lihat Design Reference
```
docs/design_reference/[nama_folder]/
├── code.html     ← Buka di browser untuk lihat visual
└── screen.png    ← Screenshot static
```

### Step 2: Buat File Halaman
```tsx
// frontend/src/pages/NamaHalaman.tsx
export default function NamaHalaman() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-lg pt-3xl pb-3xl">
      {/* Content */}
    </main>
  )
}
```

### Step 3: Tambahkan Route
```tsx
// frontend/src/App.tsx
import NamaHalaman from './pages/NamaHalaman'
// ...
<Route path="/nama-halaman" element={<NamaHalaman />} />
```

### Step 4: Sesuaikan dengan Design Reference
- Buka `code.html` di browser
- Inspect HTML structure dan Tailwind classes
- Port classes dari `class="..."` (HTML) ke `className="..."` (React)
- Ganti `<a href="#">` menjadi `<Link to="/path">`
- Ganti `style="font-variation-settings: 'FILL' 1;"` menjadi `style={{ fontVariationSettings: "'FILL' 1" }}`

### Step 5: Buat Dokumentasi
Buat file `docs/halaman_nama_halaman.md` dengan format:
```markdown
# Halaman: Nama Halaman
## Deskripsi Umum
## Status Desain
## Elemen yang Sudah Sesuai ✅
## Elemen yang Kurang / Perlu Diperbaiki ❌
## Prioritas Perbaikan
## File Terkait
```

---

## 🔄 Git Workflow

### Branch Naming
```
feature/nama-fitur        # Fitur baru
fix/deskripsi-bug          # Perbaikan bug
design/nama-halaman        # Perbaikan desain halaman
docs/nama-dokumen          # Update dokumentasi
```

### Commit Messages
```
feat: add payment page layout
fix: fix sidebar overflow on mobile
design: align property detail to reference
docs: update halaman_search documentation
```

### Pull Request Checklist
- [ ] TypeScript build passes (`npx tsc -b --noEmit`)
- [ ] Halaman baru menggunakan design system tokens (bukan hardcoded values)
- [ ] Material Symbols icons digunakan (bukan icon library lain)
- [ ] Responsive: works on mobile (375px) dan desktop (1280px)
- [ ] Dokumentasi halaman sudah dibuat / diupdate
- [ ] Tidak ada `console.log` debugging yang tertinggal

---

## 📦 Dependencies Yang Tersedia

### Sudah Terinstall
| Package | Kegunaan |
|---------|----------|
| `react-router-dom` | Routing halaman |
| `zustand` | State management |
| `react-leaflet` + `leaflet` | Peta interaktif |
| `lucide-react` | Icon library (alternatif Material Symbols) |
| `qrcode.react` | Generate QR code |
| `@tanstack/react-query` | Server state management |

### Cara Menggunakan React Query (Rekomendasi)
```tsx
import { useQuery } from '@tanstack/react-query'

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/properties`).then(r => r.json())
  })
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorState />
  return <PropertyList data={data} />
}
```

---

## ⚡ Quick Reference: Common Patterns

### Card Component Pattern
```tsx
<div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-lg shadow-sm hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow">
  {/* Card content */}
</div>
```

### Button Variants
```tsx
// Primary
<button className="bg-trust-navy text-on-primary px-lg py-md rounded-lg font-bold hover:opacity-90 transition-opacity">Primary</button>

// CTA (Action)
<button className="bg-action-amber text-trust-navy px-lg py-md rounded-lg font-bold hover:opacity-90 transition-opacity">CTA</button>

// Ghost
<button className="border border-trust-navy text-trust-navy px-lg py-md rounded-lg font-semibold hover:bg-surface-container-low transition-colors">Ghost</button>
```

### Input Field Pattern
```tsx
<div className="flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
  <span className="material-symbols-outlined text-outline mr-sm text-[20px]">icon_name</span>
  <input
    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
    placeholder="Placeholder..."
  />
</div>
```

### Empty State Pattern
```tsx
<div className="flex flex-col items-center justify-center py-2xl text-center gap-md">
  <span className="material-symbols-outlined text-[48px] text-outline">icon_name</span>
  <h3 className="font-title-md text-title-md text-on-surface-variant">No Data Title</h3>
  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Descriptive message.</p>
</div>
```

### Status Badge Pattern
```tsx
// Verified (green)
<span className="bg-success-teal text-on-primary px-sm py-xs rounded font-label-caps text-label-caps">VERIFIED</span>

// Pending (amber)
<span className="bg-action-amber text-trust-navy px-sm py-xs rounded font-label-caps text-label-caps">IN-REVIEW</span>

// Error (red)
<span className="bg-error-red text-on-error px-sm py-xs rounded font-label-caps text-label-caps">REJECTED</span>
```

---

## 📞 Kontak & Resources

- **PRD:** [`docs/rukospace_PRD.md`](docs/rukospace_PRD.md)
- **Sprint Plan:** [`docs/rukospace_sprintplan.md`](docs/rukospace_sprintplan.md)
- **Design System:** [`docs/design_reference/rukospace_pro/DESIGN.md`](docs/design_reference/rukospace_pro/DESIGN.md)
- **Tailwind Config:** [`frontend/tailwind.config.js`](frontend/tailwind.config.js)
