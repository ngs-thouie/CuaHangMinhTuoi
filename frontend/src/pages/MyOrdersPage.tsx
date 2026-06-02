import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useAuth } from '../hooks/useAuth'
import { orderService } from '../services/orderService'

export const MyOrdersPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, navigate])

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Đang chờ xử lý'
      case 'confirmed': return 'Đã xác nhận'
      case 'preparing': return 'Đang chuẩn bị'
      case 'ready': return 'Sẵn sàng giao'
      case 'completed': return 'Đã hoàn thành'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-teal-100 text-teal-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 lg:px-12 py-12 lg:py-20">
        <h1 className="font-serif text-3xl text-charcoal mb-8">Lịch Sử Đơn Hàng</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-sand shadow-sm rounded-sm">
            <div className="w-16 h-16 bg-sand/30 rounded-full flex items-center justify-center mx-auto mb-4 text-charcoal/40">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-2">Chưa có đơn hàng nào</h3>
            <p className="font-sans text-sm text-charcoal/60 mb-6">Bạn chưa đặt mâm cỗ nào từ Cửa hàng Minh Tươi.</p>
            <Link to="/menu" className="inline-block bg-primary text-white px-8 py-3 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors rounded-sm">
              Xem Thực Đơn
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white border border-sand shadow-sm rounded-sm overflow-hidden">
                <div className="bg-sand/20 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-sand">
                  <div>
                    <p className="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-1">Mã đơn hàng</p>
                    <p className="font-sans font-medium text-charcoal">{order.orderCode}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-1">Ngày đặt</p>
                      <p className="font-sans text-sm text-charcoal">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-sans text-xs font-medium uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center pb-4 border-b border-sand/50 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <p className="font-sans font-medium text-charcoal text-sm">{item.product?.name || 'Sản phẩm'}</p>
                          <p className="font-sans text-xs text-charcoal/60 mt-1">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="font-sans font-medium text-charcoal text-sm">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-sand gap-4">
                    <div>
                      <p className="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-1">Trạng thái thanh toán</p>
                      <p className="font-sans text-sm font-medium capitalize">
                        {order.paymentStatus === 'completed' ? (
                          <span className="text-green-600">Đã thanh toán</span>
                        ) : order.paymentStatus === 'failed' ? (
                          <span className="text-red-600">Thất bại</span>
                        ) : (
                          <span className="text-yellow-600">Chờ thanh toán</span>
                        )}
                        <span className="text-charcoal/40 ml-2">({order.paymentMethod})</span>
                      </p>
                    </div>
                    
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-1">Tổng tiền</p>
                      <p className="font-serif text-2xl text-primary">{order.totalAmount.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
