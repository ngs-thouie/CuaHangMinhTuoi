import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-xl w-full bg-white p-10 lg:p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="font-serif text-3xl lg:text-4xl text-charcoal mb-4">
            Đặt Hàng Thành Công
          </h1>
          
          <p className="font-sans text-base text-charcoal/60 mb-2">
            Mã đơn hàng của bạn: <span className="font-semibold text-charcoal">{orderId}</span>
          </p>
          <p className="font-sans text-base text-charcoal/60 mb-10 leading-relaxed">
            Cửa hàng Minh Tươi đã nhận được yêu cầu đặt mâm của bạn. Chúng tôi sẽ liên hệ lại qua số điện thoại bạn cung cấp để xác nhận trong thời gian sớm nhất. Xin hoan hỷ cảm ơn!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300"
            >
              Tiếp Tục Đặt Món
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto border border-charcoal/20 text-charcoal px-8 py-3.5 font-sans text-sm font-medium tracking-wide hover:border-charcoal/40 transition-colors duration-300"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
