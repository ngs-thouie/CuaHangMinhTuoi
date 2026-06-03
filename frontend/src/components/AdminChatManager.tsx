import React, { useState, useEffect, useRef } from 'react'
import { messageService, Message } from '../services/messageService'
import { useAuth } from '../hooks/useAuth'

export type ChatWindowData = {
  user: any;
  isOpen: boolean;
}

// ----------------------------------------------------
// Individual Chat Window Component
// ----------------------------------------------------
const ChatWindowBox: React.FC<{
  targetUser: any;
  onClose: () => void;
  onMinimize: () => void;
  adminId: string;
}> = ({ targetUser, onClose, onMinimize, adminId }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch messages
  useEffect(() => {
    const fetchM = async () => {
      try {
        setMessages(await messageService.getAdminMessages(targetUser._id))
      } catch (e) {
        console.error('Error fetching admin messages', e)
      }
    }
    
    fetchM()
    const im = setInterval(fetchM, 5000)
    return () => clearInterval(im)
  }, [targetUser._id])

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    setLoading(true)
    try {
      const newM = await messageService.sendAdminMessage(targetUser._id, input)
      setMessages(prev => [...prev, newM])
      setInput('')
    } catch (error) {
      console.error('Failed to send admin message', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[100vw] sm:w-[330px] h-[70vh] sm:h-[450px] max-h-[80vh] bg-white border-t border-x border-sand shadow-2xl sm:rounded-t-lg flex flex-col overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-primary px-3 py-2 flex items-center justify-between shadow-sm z-10 cursor-pointer" onClick={onMinimize}>
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-white/20 text-white flex items-center justify-center font-serif">
            {targetUser.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="font-sans text-sm font-medium text-white truncate leading-tight">{targetUser.name}</h3>
            <span className="font-sans text-[10px] text-white/80 truncate">Khách hàng</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-cream/30">
        {messages.length === 0 ? (
          <p className="text-center font-sans text-xs text-charcoal/40 mt-10">Chưa có tin nhắn</p>
        ) : (
          messages.map(msg => {
            const isAdmin = msg.senderId === adminId;
            return (
              <div key={msg._id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl font-sans text-sm break-words ${isAdmin ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-sand text-charcoal rounded-bl-none shadow-sm'}`}>
                  {msg.content}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-2 bg-white border-t border-sand flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-cream border border-sand rounded-full px-3 py-2 font-sans text-sm focus:outline-none focus:border-primary"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-9 h-9 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-50 transition-colors"
        >
          <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}

// ----------------------------------------------------
// Global Manager Component
// ----------------------------------------------------
export const AdminChatManager: React.FC = () => {
  const { user } = useAuth()
  const [activeChats, setActiveChats] = useState<ChatWindowData[]>([])
  
  useEffect(() => {
    if (user?.role !== 'admin') return;

    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetUser = customEvent.detail.user;
      
      setActiveChats(prev => {
        const existingIdx = prev.findIndex(c => c.user._id === targetUser._id);
        if (existingIdx >= 0) {
          const newChats = [...prev];
          newChats[existingIdx].isOpen = true;
          return collapseOldChats(newChats);
        }
        
        const newChats = [...prev, { user: targetUser, isOpen: true }];
        return collapseOldChats(newChats);
      });
    };

    window.addEventListener('open-admin-chat', handleOpenChat);
    return () => window.removeEventListener('open-admin-chat', handleOpenChat);
  }, [user]);

  const collapseOldChats = (chats: ChatWindowData[]) => {
    let openCount = 0;
    for (let i = chats.length - 1; i >= 0; i--) {
      if (chats[i].isOpen) {
        openCount++;
        if (openCount > 3) {
          chats[i].isOpen = false;
        }
      }
    }
    return chats;
  };

  const closeChat = (userId: string) => {
    setActiveChats(prev => prev.filter(c => c.user._id !== userId));
  };

  const toggleMinimize = (userId: string) => {
    setActiveChats(prev => {
      const newChats = [...prev];
      const chat = newChats.find(c => c.user._id === userId);
      if (chat) {
        chat.isOpen = !chat.isOpen;
      }
      return collapseOldChats(newChats);
    });
  };

  if (user?.role !== 'admin' || activeChats.length === 0) return null;

  const openChats = activeChats.filter(c => c.isOpen);
  const closedChats = activeChats.filter(c => !c.isOpen);

  return (
    <>
      {/* Container for Bubbles */}
      <div className="fixed bottom-24 right-6 flex flex-col-reverse gap-3 z-[9999]">
        {closedChats.map(c => (
          <button 
            key={c.user._id} 
            onClick={() => toggleMinimize(c.user._id)}
            className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center font-serif text-2xl hover:bg-primary-dark transition-all animate-fade-in relative group border-2 border-white"
            title={c.user.name}
          >
            {c.user.name?.charAt(0).toUpperCase()}
            {/* Close bubble button */}
            <span 
              onClick={(e) => { e.stopPropagation(); closeChat(c.user._id); }}
              className="absolute -top-1 -right-1 bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              ✕
            </span>
          </button>
        ))}
      </div>

      {/* Container for Open Windows */}
      <div className="fixed bottom-0 right-0 sm:right-28 flex flex-row-reverse gap-4 z-[9999] items-end pointer-events-none">
        {openChats.map(c => (
          <div key={c.user._id} className="pointer-events-auto">
            <ChatWindowBox 
              targetUser={c.user} 
              onClose={() => closeChat(c.user._id)}
              onMinimize={() => toggleMinimize(c.user._id)}
              adminId={user.id!}
            />
          </div>
        ))}
      </div>
    </>
  );
};
