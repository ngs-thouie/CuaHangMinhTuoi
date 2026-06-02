import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const { success, error: toastError } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    // Load existing data
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || ''
    })
  }, [user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.updateProfile(formData.name, formData.phone)
      
      // Update local storage and dispatch event to force update
      const updatedUser = { ...user, name: formData.name, phone: formData.phone }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      // Soft refresh is needed to update the Header, but since Header uses useAuth, it will update on navigation
      // or we can just reload the page for a quick hack since it's a profile update
      
      success('Cập nhật hồ sơ thành công')
      
      // Short delay before reload to show the toast
      setTimeout(() => {
        window.location.reload()
      }, 1000)

    } catch (err: any) {
      console.error('Update profile failed:', err)
      toastError(err.message || 'Cập nhật thất bại. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col md:flex-row gap-10">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white p-6 shadow-sm border border-sand rounded-sm text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-serif text-4xl shadow-sm mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-serif text-xl text-charcoal font-medium">{user.name}</h2>
            <p className="font-sans text-sm text-charcoal/60 mt-1">{user.email}</p>
            <div className="mt-6 pt-6 border-t border-sand">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-sans text-xs rounded-full uppercase tracking-wider font-medium">
                {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="bg-white p-8 lg:p-10 shadow-sm border border-sand rounded-sm">
            <h1 className="font-serif text-2xl text-charcoal mb-6 pb-4 border-b border-sand">Hồ Sơ Cá Nhân</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
              <div>
                <label className="block font-sans text-sm text-charcoal/80 mb-2">
                  Họ và Tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-cream/50 border border-sand px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-primary transition-colors rounded-sm"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-charcoal/80 mb-2">
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-cream/50 border border-sand px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-primary transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-charcoal/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full bg-sand/30 border border-sand/50 px-4 py-3 font-sans text-sm text-charcoal/50 cursor-not-allowed rounded-sm"
                  disabled
                />
                <p className="font-sans text-xs text-charcoal/50 mt-1">Email không thể thay đổi.</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-8 py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 rounded-sm"
                >
                  {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
