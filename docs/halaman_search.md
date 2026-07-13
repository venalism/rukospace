# Halaman: Search (Pencarian Ruko)

## Deskripsi Umum
Halaman pencarian ruko dengan peta interaktif dan daftar hasil. Fungsi:
- Menampilkan peta OpenStreetMap dengan marker properti
- Split-view layout (peta kiri, daftar kanan)
- Auto-fetch properties berdasarkan viewport peta
- Property cards dengan informasi ringkas dan link ke detail

## Status Desain
- **Kemiripan dengan Design Reference:** ~55% (setelah perbaikan, sebelumnya ~25%)
- **Design Reference:** `docs/design_reference/preview_ruko_senopati_strategic/` (partial match)

## Elemen yang Sudah Sesuai ✅
- Split-view layout: Map (2/3) + Results list (1/3)
- Search header bar dengan search input + Filter + Sort buttons
- Input styling: `bg-surface-gray rounded-lg border focus-within:border-trust-navy`
- Material Symbols icons (search, tune, sort)
- Property cards dengan:
  - Image placeholder area + Verified badge overlay
  - Title dengan `font-title-md text-trust-navy`
  - Address dengan location_on icon
  - Technical strip (sqm + electricity)
  - Price display + "View Details" ghost button
- Empty state dengan icon dan helpful message
- Auto-fetch berdasarkan map bounds (getBounds API)
- Result count display (font-label-caps)
- Cards klikable sebagai Link ke `/properties/:id`

## Elemen yang Kurang / Perlu Diperbaiki ❌
- **Search functionality**: Search input belum terhubung ke query/filter
- **Filter panel**: Design ref punya filter sidebar (price range, area, zoning, etc.), belum diimplementasi
- **Sort functionality**: Sort button ada tapi belum fungsional
- **Custom map pins**: Menggunakan default Leaflet marker, belum custom pin trust-navy
- **Property images**: Card images masih placeholder, belum render real images
- **Map popup styling**: Popup basic, belum styled sesuai design system
- **Infinite scroll / pagination**: List tidak punya pagination
- **Saved search / favorites**: Tidak ada bookmark functionality
- **Water source chip**: Technical strip hanya sqm dan electricity, belum ada water source

## Prioritas Perbaikan untuk Tim
1. Implementasi filter panel (sidebar atau dropdown)
2. Hubungkan search input ke backend query (keyword search)
3. Render property images dari API
4. Custom map markers (trust-navy pins)
5. Tambah pagination atau infinite scroll
6. Style map popups sesuai design system

## File Terkait
- Source: `frontend/src/pages/Search.tsx`
- Router: `frontend/src/App.tsx` (route: `/search`)
- Design Reference: `docs/design_reference/preview_ruko_senopati_strategic/screen.png`
- Dependencies: `react-leaflet`, `leaflet` (map library)
- API: `GET /properties?min_lat=&max_lat=&min_lng=&max_lng=`
