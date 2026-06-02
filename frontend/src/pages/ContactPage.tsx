import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <p className="font-serif italic text-secondary text-sm mb-4">
            Kết nối với chúng tôi
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
            Liên Hệ Đặt Mâm
          </h1>
          <p className="font-sans text-base text-charcoal/50 max-w-xl mx-auto">
            Quý khách vui lòng gọi điện hoặc nhắn tin Zalo để được tư vấn mâm cơm
            chay phù hợp cho gia đình, dịp lễ hoặc cúng dường.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotline Card */}
            <div className="bg-white border border-sand p-10 text-center">
              <div className="space-y-4">
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/50">
                  Hotline Đặt Mâm
                </h3>
                <p className="font-serif text-3xl lg:text-4xl text-charcoal">
                  090 123 4567
                </p>
                <a
                  href="tel:0972955382"
                  className="inline-block font-sans text-xs uppercase tracking-[0.15em] text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  BẤM ĐỂ GỌI
                </a>
              </div>
            </div>

            {/* Zalo Card */}
            <div className="bg-white border border-sand p-10 text-center">
              <div className="space-y-4">
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/50">
                  Nhắn Tin Zalo
                </h3>
                <p className="font-serif text-3xl lg:text-4xl text-charcoal">
                  Zalo An Nhiên
                </p>
                <a
                  href="https://zalo.me/0972955382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-sans text-xs uppercase tracking-[0.15em] text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  BẤM ĐỂ CHAT
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address & Hours */}
      <section className="bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-sand pt-12">
            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-charcoal">
                Địa chỉ
              </h3>
              <p className="font-sans text-base text-charcoal/60 leading-relaxed">
                Cửa hàng Minh Tươi, Phố Lạc Vệ, Huyện Tiên Du, Tỉnh Bắc Ninh
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-charcoal">
                Giờ mở cửa
              </h3>
              <p className="font-sans text-base text-charcoal/60 leading-relaxed">
                07:00 – 21:00 (Tất cả các ngày trong tuần)
              </p>
              <p className="font-sans text-sm text-charcoal/40 italic">
                Riêng ngày Rằm & mùng Một mở cửa từ 06:00.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
