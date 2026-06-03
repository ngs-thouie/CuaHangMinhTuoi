import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { authService } from '../services/authService'
import { messageService, Message } from '../services/messageService'

export const ChatWidget: React.FC = () => {
  const [user, setUser] = useState(authService.getCurrentUser())
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const location = useLocation()
  
  // Re-evaluate user on navigation
  useEffect(() => {
    setUser(authService.getCurrentUser())
  }, [location])

  // Polling for messages
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    
    if (user && isOpen && user.role === 'customer') {
      const fetchMsgs = async () => {
        try {
          const msgs = await messageService.getMessages()
          setMessages(msgs)
        } catch (error) {
          console.error('Error fetching messages', error)
        }
      }
      
      fetchMsgs()
      interval = setInterval(fetchMsgs, 5000) // Poll every 5s
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [user, isOpen])

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (user?.role === 'admin') {
    return null // Hide if is admin
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    try {
      const newMsg = await messageService.sendMessage(input)
      setMessages(prev => [...prev, newMsg])
      setInput('')
    } catch (error) {
      console.error('Failed to send message', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-all transform hover:scale-105 z-50"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-0 sm:right-6 w-[100vw] sm:w-80 md:w-96 bg-white border-t border-x sm:border border-sand shadow-2xl sm:rounded-sm overflow-hidden z-50 flex flex-col h-[70vh] sm:h-[500px] max-h-[80vh] animate-slide-up">
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-serif text-lg">Hỗ Trợ Khách Hàng</h3>
          </div>
          
          {!user ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-cream/30 text-center">
              <svg className="w-16 h-16 text-primary/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h4 className="font-serif text-lg text-charcoal mb-2">Xin chào!</h4>
              <p className="font-sans text-sm text-charcoal/70 mb-6">
                Vui lòng đăng nhập để có thể nhắn tin với cửa hàng và theo dõi tình trạng đơn hàng của bạn.
              </p>
              <a href="/login" className="bg-primary text-white px-6 py-2.5 rounded-full font-sans text-sm font-medium hover:bg-primary-dark transition-colors">
                Đăng nhập ngay
              </a>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/30">
                {messages.length === 0 ? (
                  <p className="text-center font-sans text-sm text-charcoal/40 my-8">
                    Chào bạn, Cửa hàng Minh Tươi có thể giúp gì cho bạn?
                  </p>
                ) : (
                  messages.map(msg => (
                    <div key={msg._id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2 rounded-2xl font-sans text-sm ${msg.senderId === user.id ? 'bg-primary text-white rounded-br-none' : 'bg-sand text-charcoal rounded-bl-none'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-3 bg-white border-t border-sand flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 bg-cream border border-sand rounded-full px-4 py-2 font-sans text-sm focus:outline-none focus:border-primary"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-50 transition-colors"
                >
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
