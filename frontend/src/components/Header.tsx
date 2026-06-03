import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import { notificationService, Notification } from '../services/notificationService'
import { messageService } from '../services/messageService'
import { AdminChatDropdown } from './AdminChatDropdown'

export const Header: React.FC = () => {
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const notifRef = useRef<HTMLDivElement>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchN = async () => { try { setNotifications(await notificationService.getNotifications()) } catch(e){} }
    const fetchU = async () => {
      if (user?.role === 'admin') {
        try { setUnreadCount(await messageService.getUnreadCount()) } catch(e){}
      }
    }
    fetchN()
    fetchU()
    const int = setInterval(() => { fetchN(); fetchU() }, 5000)
    return () => clearInterval(int)
  }, [user])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setChatOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-cream/95 backdrop-blur-sm sticky top-0 z-50 border-b border-sand/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-charcoal whitespace-nowrap">
              Cửa hàng Minh Tươi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-charcoal hover:text-primary transition-colors duration-300"
            >
              Trang chủ
            </Link>
            <Link
              to="/menu"
              className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-charcoal hover:text-primary transition-colors duration-300"
            >
              Thực đơn
            </Link>
            <Link
              to="/events"
              className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-charcoal hover:text-primary transition-colors duration-300"
            >
              Sự kiện
            </Link>
            <Link
              to="/contact"
              className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-charcoal hover:text-primary transition-colors duration-300"
            >
              Liên hệ
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-charcoal hover:text-primary transition-colors duration-300"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Actions & Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 outline-none">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-serif text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-sans text-charcoal hidden lg:block">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block animate-fade-in z-50">
                  <div className="bg-white border border-sand shadow-lg py-2 rounded-sm">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-charcoal hover:bg-cream/50 transition-colors">Hồ sơ cá nhân</Link>
                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-charcoal hover:bg-cream/50 transition-colors">Lịch sử đơn hàng</Link>
                    <div className="h-px bg-sand my-1"></div>
                    <button onClick={() => { logout(); success('Đăng xuất thành công'); navigate('/'); }} className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream/50 transition-colors">Đăng xuất</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-sans font-medium text-charcoal hover:text-primary transition-colors"
              >
                Đăng nhập
              </Link>
            )}
            </div>

            {/* Admin Message Icon */}
            {user?.role === 'admin' && (
              <div className="relative" ref={chatRef}>
                <button onClick={() => setChatOpen(!chatOpen)} className="relative group p-1 flex items-center" title="Tin nhắn">
                  <svg className="w-5 h-5 text-charcoal group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                  {unreadCount > 0 && (
                    <>
                      {/* Red dot for mobile */}
                      <span className="absolute -top-1 -right-1 md:hidden bg-red-500 text-white rounded-full w-2.5 h-2.5 shadow-sm border border-white"></span>
                      {/* Badge with number for desktop */}
                      <span className="absolute -top-1.5 -right-1.5 hidden md:flex bg-red-500 text-white rounded-full min-w-[18px] h-[18px] text-[10px] items-center justify-center font-sans font-medium px-1 shadow-sm border border-white">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    </>
                  )}
                </button>
                <AdminChatDropdown isOpen={chatOpen} onClose={() => setChatOpen(false)} />
              </div>
            )}

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative group p-1 flex items-center">
                <svg className="w-5 h-5 text-charcoal group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-2 h-2"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute top-full -right-12 sm:right-0 mt-4 w-[85vw] sm:w-80 bg-white border border-sand shadow-2xl rounded-sm z-50 overflow-hidden animate-slide-up">
                  <div className="bg-primary/10 px-4 py-3 border-b border-sand">
                    <h3 className="font-serif text-charcoal font-medium">Thông báo từ cửa hàng</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center font-sans text-sm text-charcoal/50">Chưa có thông báo nào.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n._id} className="p-4 border-b border-sand/50 hover:bg-cream/50 transition-colors">
                          <p className="font-sans font-medium text-charcoal text-sm">{n.title}</p>
                          <p className="font-sans text-xs text-charcoal/70 mt-1">{n.message}</p>
                          <p className="font-sans text-[10px] text-charcoal/40 mt-2">{new Date(n.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative group p-1 flex items-center">
              <svg
                className="w-5 h-5 text-charcoal group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-6 border-t border-sand/50">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="font-sans text-sm uppercase tracking-[0.15em] text-charcoal" onClick={() => setMenuOpen(false)}>
                Trang chủ
              </Link>
              <Link to="/menu" className="font-sans text-sm uppercase tracking-[0.15em] text-charcoal" onClick={() => setMenuOpen(false)}>
                Thực đơn
              </Link>
              <Link to="/events" className="font-sans text-sm uppercase tracking-[0.15em] text-charcoal" onClick={() => setMenuOpen(false)}>
                Sự kiện
              </Link>
              <Link to="/contact" className="font-sans text-sm uppercase tracking-[0.15em] text-charcoal" onClick={() => setMenuOpen(false)}>
                Liên hệ
              </Link>
              <div className="pt-4 border-t border-sand/50">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-serif text-sm shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-charcoal">{user.name}</span>
                    </div>
                    <Link to="/profile" className="font-sans text-sm text-charcoal/70" onClick={() => setMenuOpen(false)}>Hồ sơ cá nhân</Link>
                    <Link to="/my-orders" className="font-sans text-sm text-charcoal/70" onClick={() => setMenuOpen(false)}>Lịch sử đơn hàng</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="font-sans text-sm font-bold text-primary" onClick={() => setMenuOpen(false)}>Quản trị (Admin)</Link>
                    )}
                    <button onClick={() => { setMenuOpen(false); logout(); success('Đăng xuất thành công'); navigate('/'); }} className="text-left font-sans text-sm text-charcoal/70">Đăng xuất</button>
                  </div>
                ) : (
                  <Link to="/login" className="text-sm text-charcoal">Đăng nhập</Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
