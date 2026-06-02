import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register, loading, error: authError } = useAuth()
  const { success, error: toastError } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Mật khẩu không khớp')
      return
    }

    if (formData.password.length < 6) {
      setValidationError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    try {
      await register(formData.email, formData.password, formData.name, formData.phone)
      success('Đăng ký tài khoản thành công')
      navigate('/')
    } catch (err: any) {
      console.error('Registration failed:', err)
      toastError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.')
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-charcoal mb-4">Đăng Ký</h1>
            <p className="font-sans text-sm text-charcoal/50">
              Tạo tài khoản để bắt đầu đặt hàng
            </p>
          </div>

          {(authError || validationError) && (
            <div className="bg-secondary/10 border border-secondary/20 px-6 py-4 mb-8">
              <p className="font-sans text-sm text-secondary">{authError || validationError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">
                Họ Tên *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">
                Email *
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
                Số Điện Thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">
                Mật Khẩu *
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

            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">
                Xác Nhận Mật Khẩu *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </button>
          </form>

          <p className="text-center mt-8 font-sans text-sm text-charcoal/50">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
