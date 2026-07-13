import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../store/authStore'

export default function ChatWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { token, user } = useAuthStore()
  const [chats, setChats] = useState<any[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const apiBase = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (open && token) {
      fetchChats()
    }
  }, [open, token])

  useEffect(() => {
    if (activeChatId) {
      fetchMessages(activeChatId)
      const interval = setInterval(() => fetchMessages(activeChatId), 5000)
      return () => clearInterval(interval)
    }
  }, [activeChatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchChats = async () => {
    try {
      const res = await fetch(`${apiBase}/chats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setChats(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error("Failed to fetch chats", err)
    }
  }

  const fetchMessages = async (chatId: string) => {
    try {
      const res = await fetch(`${apiBase}/chats/${chatId}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error("Failed to fetch messages", err)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeChatId) return

    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/chats/${activeChatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newMessage })
      })
      if (res.ok) {
        setNewMessage('')
        fetchMessages(activeChatId)
      }
    } catch (err) {
      console.error("Failed to send message", err)
    }
    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-trust-navy/50 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex overflow-hidden border border-border-subtle animate-in fade-in zoom-in-95">
        
        {/* Left Pane - Chat List */}
        <div className={`w-full md:w-1/3 border-r border-border-subtle bg-surface-container-lowest flex flex-col ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-md border-b border-border-subtle flex justify-between items-center bg-surface">
            <h2 className="font-title-lg text-title-lg text-trust-navy font-bold">Messages</h2>
            <button onClick={onClose} className="md:hidden text-on-surface-variant p-sm rounded-full hover:bg-surface-gray">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-sm space-y-xs">
            {chats.length === 0 ? (
              <div className="p-md text-center text-on-surface-variant font-body-sm mt-xl">No active conversations.</div>
            ) : (
              chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full text-left p-md rounded-xl transition-colors flex items-center gap-md ${
                    activeChatId === chat.id ? 'bg-trust-navy text-on-primary shadow-sm' : 'hover:bg-surface-gray text-on-surface'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[16px] shrink-0 ${
                    activeChatId === chat.id ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {chat.other_user_name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-title-sm text-title-sm truncate font-semibold">{chat.other_user_name}</div>
                    <div className={`font-body-xs text-body-xs truncate opacity-80 uppercase tracking-wider mt-xs`}>
                      {chat.other_user_role}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Pane - Active Chat */}
        <div className={`w-full md:w-2/3 flex flex-col bg-surface ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
          {activeChatId ? (
            <>
              {/* Chat Header */}
              <div className="p-md border-b border-border-subtle flex items-center gap-md bg-surface shadow-sm z-10">
                <button onClick={() => setActiveChatId(null)} className="md:hidden p-sm text-on-surface-variant rounded-full hover:bg-surface-gray">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="font-title-md text-title-md text-trust-navy font-bold flex-1">
                  {chats.find(c => c.id === activeChatId)?.other_user_name}
                </div>
                <button onClick={onClose} className="hidden md:block p-sm text-on-surface-variant rounded-full hover:bg-surface-gray transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-lg space-y-md bg-surface-gray/50">
                {messages.length === 0 ? (
                  <div className="text-center text-on-surface-variant font-body-sm mt-xl">Say hello!</div>
                ) : (
                  messages.map(msg => {
                    const isMe = msg.sender_id === user?.id
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-md rounded-2xl ${
                          isMe 
                            ? 'bg-trust-navy text-on-primary rounded-tr-sm' 
                            : 'bg-surface-container-lowest text-on-surface border border-border-subtle rounded-tl-sm'
                        }`}>
                          <p className="font-body-md text-body-md whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                          <div className={`text-[10px] mt-xs font-medium ${isMe ? 'text-primary-fixed-dim' : 'text-on-surface-variant'} text-right`}>
                            {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-md border-t border-border-subtle bg-surface">
                <form onSubmit={sendMessage} className="flex gap-sm">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-surface-gray border border-transparent focus:border-trust-navy focus:ring-0 rounded-xl px-md py-sm font-body-md text-on-surface transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || loading}
                    className="bg-action-amber text-trust-navy w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant gap-md bg-surface-gray/30 relative">
               <button onClick={onClose} className="absolute top-md right-md p-sm text-on-surface-variant rounded-full hover:bg-surface-gray transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-md shadow-inner">
                <span className="material-symbols-outlined text-[48px] text-outline">forum</span>
              </div>
              <p className="font-title-md text-title-md text-trust-navy mt-md">Your Messages</p>
              <p className="font-body-sm text-body-sm max-w-[300px] text-center mt-sm">Select a conversation from the left to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
