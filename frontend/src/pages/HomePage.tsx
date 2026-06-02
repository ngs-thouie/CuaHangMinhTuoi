import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export const HomePage: React.FC = () => {
  const { products } = useProducts('')
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-sans text-sm uppercase tracking-[0.2em] text-primary font-medium">
                  Ẩm thực từ tâm
                </p>
                <h1 className="font-serif text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1]">
                  Mâm cơm chay
                  <br />
                  <span className="italic">Thanh tịnh & Trọn vẹn</span>
                </h1>
                <p className="font-sans text-base text-charcoal/60 max-w-md leading-relaxed">
                  Gửi gắm sự bình an trong từng nguyên liệu tươi sạch,
                  chúng tôi chuẩn bị các mâm cỗ chay cung kính và cơm
                  chay gia đình đậm đà bản sắc Việt.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0972955382"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300"
                >
                  Gọi đặt ngay: 090 123 4567
                </a>
                <a
                  href="https://zalo.me/0972955382"
                  className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal px-8 py-3.5 font-sans text-sm font-medium tracking-wide hover:border-charcoal/40 transition-colors duration-300"
                >
                  Chat Zalo
                </a>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80"
                  alt="Mâm cơm chay thanh tịnh"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Menu Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-4">
                Thực Đơn Đặc Sắc
              </h2>
              <p className="font-sans text-base text-charcoal/50 max-w-lg">
                Từ những món lẻ tinh tế đến các set mâm cỗ trang trọng cho ngày Lễ,
                Rằm, mừng Mật.
              </p>
            </div>
            <Link
              to="/menu"
              className="hidden md:inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.15em] text-primary hover:text-primary-dark transition-colors"
            >
              Xem toàn bộ thực đơn
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              // Placeholder content when no products
              <>
                {[
                  {
                    name: 'Giải Ngộ Sen Tiền Vua',
                    desc: 'Giả ngôumont sen tước, kết hợp cùng đậu hũ và rau thơm vật nhỉ, nước trên trên thanh chay tịnh đỗ.',
                    price: '120.000đ',
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
                  },
                  {
                    name: 'Mâm Cỗ Ăn Lạc (9 món)',
                    desc: 'Set 9 món cúng đầy đủ – hương – vị, phù hợp cho ngày Rằm, mừng Mật và các dịp lễ Phượng.',
                    price: '1.200.000đ / mâm',
                    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'
                  },
                  {
                    name: 'Dứa Hũ Chiên Sả Ớt',
                    desc: 'Váng giòn bên ngoài, mềm mịn bên trong, đậm hương thơm nồng vị cay nhè nhẹ của ớt sả.',
                    price: '85.000đ',
                    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'
                  }
                ].map((item, index) => (
                  <Link
                    key={index}
                    to="/menu"
                    className="group"
                  >
                    <div className="aspect-[4/5] overflow-hidden mb-6 bg-sand">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/50 mb-4 line-clamp-2">
                      {item.desc}
                    </p>
                    <p className="font-sans text-sm font-medium text-primary">
                      {item.price}
                    </p>
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.15em] text-primary"
            >
              Xem toàn bộ thực đơn
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Event Info */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/60 border border-white/20 px-4 py-2">
                  Lịch Chay Sắp Tới
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
                  Đại Lễ Vu Lan &
                  <br />
                  <span className="italic">Khóa Tu Mùa Hè</span>
                </h2>
                <p className="font-sans text-base text-white/60 max-w-md leading-relaxed">
                  Chào đón tháng 7 âm lịch, Cửa hàng Minh Tươi tổ chức các buổi giảng
                  dạy cảm chay và nhận đặt mâm cỗ gởi về cho gia đình.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <span className="font-sans text-sm font-medium text-white/80 w-12">
                    15/07
                  </span>
                  <span className="font-sans text-sm text-white/60 uppercase tracking-wider">
                    Đại Lễ Vu Lan Báo Hiếu
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-sans text-sm font-medium text-white/80 w-12">
                    01/08
                  </span>
                  <span className="font-sans text-sm text-white/60 uppercase tracking-wider">
                    Khóa Tu Tịnh Tâm Đầu Tháng
                  </span>
                </div>
              </div>

              <Link
                to="/menu"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors"
              >
                Xem toàn bộ sự kiện
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right: Event Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
                  alt="Đại Lễ Vu Lan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
