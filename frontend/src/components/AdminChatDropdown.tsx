import React, { useState, useEffect, useRef } from 'react'
import { messageService, Message } from '../services/messageService'
import { useAuth } from '../hooks/useAuth'

interface AdminChatDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminChatDropdown: React.FC<AdminChatDropdownProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const [threads, setThreads] = useState<any[]>([])

  // Fetch threads
  useEffect(() => {
    if (!isOpen || user?.role !== 'admin') return
    
    const fetchT = async () => {
      try {
        setThreads(await messageService.getChatThreads())
      } catch (e) {
        console.error('Error fetching chat threads', e)
      }
    }
    
    fetchT()
    const it = setInterval(fetchT, 10000)
    return () => clearInterval(it)
  }, [isOpen, user])

  const handleSelectUser = (user: any) => {
    // Dispatch event to open chat window in AdminChatManager
    const event = new CustomEvent('open-admin-chat', { detail: { user } });
    window.dispatchEvent(event);
    // Close dropdown
    onClose();
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-4 w-80 md:w-96 bg-white border border-sand shadow-2xl rounded-sm z-50 overflow-hidden animate-slide-up flex flex-col h-[500px]">
      <div className="bg-primary/10 px-4 py-3 border-b border-sand flex justify-between items-center">
        <h3 className="font-serif text-charcoal font-medium">Tin nhắn Khách hàng</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <p className="p-4 text-center font-sans text-sm text-charcoal/50 mt-10">Chưa có cuộc trò chuyện nào.</p>
        ) : (
          threads.map(t => (
            <button
              key={t._id}
              onClick={() => handleSelectUser(t)}
              className="w-full text-left p-4 border-b border-sand/50 hover:bg-cream/50 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-serif text-lg">
                {t.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-medium text-charcoal text-sm truncate">{t.name}</p>
                <p className="font-sans text-xs text-charcoal/60 truncate mt-0.5">{t.email}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
