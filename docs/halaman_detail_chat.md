# Halaman: Detail Chat (Tenant/Owner Messaging)

## Deskripsi Umum
Halaman detail chat antara tenant dan owner/landlord mengenai properti tertentu. Fungsi:
- Real-time messaging antara tenant dan owner
- Property context panel di sebelah kanan (desktop)
- Quick actions: jadwalkan survei, lihat detail ruko
- Mobile-friendly dengan back button

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/detail_chat_rukospace/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout (3-column)
- Desktop: Sidebar (w-64) + Chat Interface (flex-1) + Context Panel (w-80)
- Mobile: Full-screen chat dengan back button

### Chat Header
- Avatar (w-12 h-12 rounded-full) + nama contact
- Verified badge: `material-symbols-outlined fill text-success-teal`
- Online status: green dot + "Online" text
- Subject line: "Mengenai: Senopati Strategic"
- Action buttons: search, more_vert

### Chat History Area
- Background: `bg-surface-gray`
- Date divider: `bg-surface border rounded-full font-label-caps` + "Hari Ini, 09:45 AM"
- **Received messages (from landlord):**
  - Avatar kiri (w-8 h-8 rounded-full)
  - Bubble: `bg-surface border text-on-surface rounded-xl rounded-tl-sm shadow-sm`
  - Timestamp di bawah bubble
- **Sent messages (from user):**
  - Avatar kanan (w-8 h-8 rounded-full)
  - Bubble: `bg-trust-navy text-on-primary rounded-xl rounded-tr-sm shadow-sm`
  - Timestamp + read indicator (done_all icon `text-success-teal`)
  - Layout: `flex-row-reverse space-x-reverse`

### Chat Input Area
- Background: `bg-surface border-t`
- Attachment button (add icon)
- Textarea: `bg-surface-gray border rounded-xl resize-none`
- Send button: `bg-action-amber text-on-secondary-container rounded-lg`
- Placeholder: "Ketik pesan..."

### Right Context Panel (Desktop only)
- Title: "Context Properti"
- Property card:
  - Image (h-40) + verified badge
  - Property name + location
  - Technical strip (sqm + VA)
  - Price ("Rp 250 Jt / tahun")
- Quick actions:
  - "Jadwalkan Survei" (`bg-trust-navy text-on-primary`)
  - "Lihat Detail Ruko" (`border border-trust-navy text-trust-navy`)
- Trust warning: "Transaksi aman. Jangan melakukan pembayaran di luar platform RukoHub."

## Prioritas Implementasi
1. Buat route `/messages/:conversationId` atau `/chat/:id`
2. Implementasi chat UI (bubbles, timestamps, read status)
3. Implementasi property context sidebar
4. Quick actions integration (link ke booking + property detail)
5. Real-time messaging via WebSocket

## Dependensi Teknis
- WebSocket untuk real-time messaging
- Backend API: `GET /conversations/:id/messages`, `POST /conversations/:id/messages`
- Read receipt tracking
- File/image upload support

## File Terkait
- Design Reference: `docs/design_reference/detail_chat_rukospace/screen.png`
- Related: `docs/design_reference/detail_chat_rukospace/code.html`
- Linked from: Daftar Pesan → klik chat item
