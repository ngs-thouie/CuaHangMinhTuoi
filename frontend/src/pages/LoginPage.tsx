import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading, error: authError } = useAuth()
  const { success, error: toastError } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
      success('Đăng nhập thành công')
      navigate('/')
    } catch (err: any) {
      console.error('Login failed:', err)
      toastError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.')
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-charcoal mb-4">Đăng Nhập</h1>
            <p className="font-sans text-sm text-charcoal/50">
              Chào mừng bạn quay trở lại
            </p>
          </div>

          {authError && (
            <div className="bg-secondary/10 border border-secondary/20 px-6 py-4 mb-8">
              <p className="font-sans text-sm text-secondary">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">
                Mật Khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 mt-8"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <p className="text-center mt-8 font-sans text-sm text-charcoal/50">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dark transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
