# Halaman: Customer Service Chat (Admin)

## Deskripsi Umum
Halaman chat customer service untuk admin/super admin platform. Fungsi:
- Mengelola percakapan real-time dengan pengguna (tenant, owner, agent)
- Menampilkan daftar active chats dengan filter (All, Urgent, Unread)
- Menampilkan chat window dengan histori pesan lengkap
- Menyediakan property context card di dalam chat
- Quick responses dan booking survey shortcuts

**Halaman ini BELUM diimplementasi di frontend.**

## Status Desain
- **Kemiripan dengan Frontend:** 0% (halaman belum ada)
- **Design Reference:** `docs/design_reference/customer_service_chat_admin_rukospace/`

## Elemen Design Reference yang Harus Diimplementasi

### Layout
- Full-height layout (100vh) dengan fixed sidebar kiri
- Grid 12-kolom: conversations list (4 cols) + chat window (8 cols)
- Fixed admin sidebar `bg-primary` (dark navy) dengan nav icons

### Panel Kiri: Active Chats List
- Header "Active Chats" dengan badge count (e.g., "12 Active")
- Tab filter: All | Urgent | Unread
- Conversation items:
  - Avatar (rounded-full) + online status indicator (green dot)
  - Nama user + timestamp ("2m ago")
  - Preview text (line-clamp-1)
  - Category badges: "Listing Inquiry" (secondary-fixed), "Verification" (tertiary-fixed), "Closed" (surface-container-highest)
  - Ticket ID badge (e.g., "#8821")
- Active item: `bg-primary-container/5` + `border-l-4 border-l-primary`

### Panel Kanan: Chat Window
- Chat header: avatar + nama + online status + "Property Seeker" label
- Action buttons: call, video, more_vert
- Messages area:
  - Date dividers (rounded pill badges: "Yesterday", "Today")
  - User messages: `bg-white border` + `rounded-2xl rounded-tl-none`
  - Admin messages: `bg-primary text-on-primary` + `rounded-2xl rounded-tr-none`
  - Timestamps + read status
  - In-chat property context card (image + specs + verified badge)
- Input area:
  - Attachment buttons (add_circle, image, attach_file)
  - Auto-resize textarea
  - Send button (`bg-primary text-on-primary rounded-lg`)
  - Quick Responses + Book Survey shortcuts
  - "Auto-save active" indicator

### Admin Sidebar
- Brand: "RukoSpace" + "Super Admin" label
- Navigation: Dashboard, User Management, Property Listings, **Customer Support** (active), System Settings
- "Verify Listings" CTA button (secondary-container)
- Logout button
- Active state: `border-l-4 border-secondary-container`

## Prioritas Implementasi
1. Buat route `/admin/support` atau embed di DashboardAdmin
2. Implementasi conversation list dengan WebSocket/polling
3. Implementasi chat interface (send/receive messages)
4. Buat property context card component (reusable)
5. Quick responses + booking shortcut integration

## Dependensi Teknis
- WebSocket atau polling mechanism untuk real-time chat
- Backend API: `GET /admin/conversations`, `POST /admin/messages`, `GET /conversations/:id/messages`
- User online status tracking

## File Terkait
- Design Reference: `docs/design_reference/customer_service_chat_admin_rukospace/screen.png`
- Related: `docs/design_reference/customer_service_chat_admin_rukospace/code.html`
