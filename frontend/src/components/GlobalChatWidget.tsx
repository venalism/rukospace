import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import ChatWindow from './ChatWindow'

export default function GlobalChatWidget() {
  const { user } = useAuthStore()
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Only show the global widget if the user is logged in
  if (!user) return null

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 99999 }}
          className="bg-trust-navy text-on-primary px-lg py-md rounded-full shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-sm group border-4 border-surface-container-lowest"
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">forum</span>
          <span className="font-title-md font-bold text-[18px]">Chat</span>
          
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-error-red border-2 border-surface-container-lowest"></span>
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      <ChatWindow open={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
