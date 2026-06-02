import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useOrders } from '../hooks/useOrders'
import { useAuth } from '../hooks/useAuth'
import { Order } from '../types'

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, getTotalAmount, clearCart } = useCart()
  const { createOrder, loading, error } = useOrders()
  const { error: toastError, success: toastSuccess } = useToast()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerPhone: user?.phone || '',
    customerEmail: user?.email || '',
    deliveryDate: '',
    deliveryTime: '12:00',
    deliveryAddress: '',
    notes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customerName || !formData.customerPhone || !formData.deliveryDate || !formData.deliveryAddress) {
      toastError('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    if (items.length === 0) {
      toastError('Giỏ hàng trống')
      return
    }

    try {
      const orderData: Omit<Order, '_id' | 'orderCode'> = {
        items: items.map(item => ({
          productId: item.productId,
          product: item.product,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotalAmount(),
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        deliveryDate: new Date(formData.deliveryDate),
        deliveryTime: formData.deliveryTime,
        deliveryAddress: formData.deliveryAddress,
        paymentStatus: 'pending',
        paymentMethod: 'cod',
        notes: formData.notes,
        status: 'pending'
      }

      const result = await createOrder(orderData)

      // Clear cart and navigate to order success
      clearCart()
      toastSuccess('Đặt hàng thành công!')
      navigate(`/order-success/${result.order._id}`)
    } catch (err) {
      console.error('Error creating order:', err)
      toastError('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <p className="font-sans text-charcoal/50 mb-6">Giỏ hàng trống, vui lòng chọn sản phẩm</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-primary text-white px-8 py-3 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors"
          >
            Quay lại Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-12">
          Thanh Toán Đơn Hàng
        </h1>

        {error && (
          <div className="bg-secondary/10 border border-secondary/20 px-6 py-4 mb-8">
            <p className="font-sans text-sm text-secondary">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {!user && (
              <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="font-sans text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Lưu ý khách vãng lai!</p>
                    <p>Bạn đang đặt hàng mà chưa đăng nhập. Bạn sẽ không thể theo dõi trực tuyến trạng thái đơn hàng này và không thể nhắn tin trực tiếp với cửa hàng. Vui lòng đăng nhập nếu bạn đã có tài khoản.</p>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-10">
              <h2 className="font-serif text-2xl text-charcoal mb-8">
                Thông Tin Khách Hàng
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Tên Khách Hàng *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Số Điện Thoại *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Địa Chỉ Giao Hàng *
                  </label>
                  <textarea
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors resize-none"
                    required
                  />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Ngày Giao Hàng *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Giờ Giao Hàng
                  </label>
                  <select
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors"
                  >
                    {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2">
                    Ghi Chú (Tuỳ Chọn)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-transparent border-b border-sand px-0 py-3 font-sans text-charcoal focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Ví dụ: Cúng dạo của gia đình..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3.5 mt-10 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Tiếp tục sang Thanh Toán'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white p-8 sticky top-24">
              <h2 className="font-serif text-xl text-charcoal mb-6">
                Tóm Tắt Đơn Hàng
              </h2>

              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.productId} className="flex justify-between font-sans text-sm">
                    <span className="text-charcoal/60">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium text-charcoal">{(item.price * item.quantity).toLocaleString()}đ</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand pt-4">
                <div className="flex justify-between font-sans text-sm font-medium text-primary">
                  <span>Tổng cộng:</span>
                  <span>{getTotalAmount().toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
