import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export const MenuPage: React.FC = () => {
  const { products } = useProducts('')
  const mealSets = products.filter(p => p.category === 'meal-set')
  const individualItems = products.filter(p => p.category === 'individual')

  // Placeholder meal set data
  const placeholderMealSets = [
    {
      name: 'Mâm Cỗ Ăn Lạc (9 món)',
      description: 'Set mâm cỗ cúng đầy đủ – hương – vị, phù hợp cho ngày Rằm, mừng Mật và các dịp lễ Phượng.',
      price: '1.200.000đ / mâm',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'
    },
    {
      name: 'Mâm Cỗ Vu Lan Báo Hiếu',
      description: 'Món cỗ chay 11 món đồng kính dâng cho mẹ trong mùa Vu Lan – đặt trước tối thiểu 3 ngày.',
      price: '1.800.000đ / mâm',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'
    }
  ]

  // Placeholder individual items
  const placeholderIndividual = [
    {
      name: 'Giải Ngộ Sen Tiền Vua',
      description: 'Giả ngôumont sen tước, kết hợp cùng đậu hũ và rau thơm vật nhỉ, nước trên thanh chay tịnh đỗ.',
      price: '120.000đ',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
    },
    {
      name: 'Dứa Hũ Chiên Sả Ớt',
      description: 'Váng giòn bên ngoài, mềm mịn bên trong, đậm hương thơm nồng vị cay nhè nhẹ của ớt sả.',
      price: '85.000đ',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'
    },
    {
      name: 'Cơm Hấp Lá Sen',
      description: 'Gạo nếp nh傒 hấp trong lá sen, đậu xanh nhộng là sen tươi, giữ trọn hương đồng cỏ nội.',
      price: '95.000đ',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'
    },
    {
      name: 'Lẩu Nấm Hoàng Kim',
      description: 'Bí loại nấm quý cùng nước dùng thảo dược thanh ngọt tự nhiên, ấm áp cho mùa đông sum vầy.',
      price: '450.000đ',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
    },
    {
      name: 'Nem Chay Vàng Ơm',
      description: 'Vỏ bánh giòn rụm bọc lấy nhân nấm – mộc nhỉ – rau củ, chấm cùng tương ớt chay nhau.',
      price: '75.000đ',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'
    },
    {
      name: 'Canh Chua Nấm Đậu Hũ',
      description: 'Vị chua dịu của me, ngọt thanh tự thơm của cà chua, quyện cùng nấm mềm và đậu hũ.',
      price: '95.000đ',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'
    }
  ]

  // Placeholder desserts
  const placeholderDesserts = [
    {
      name: 'Chè Hạt Sen Long Nhãn',
      description: 'Hạt sen bở nhỏ hoà cùng long nhãn ngọt thanh, làn nước trong vào giải nhiệt thân tâm.',
      price: '55.000đ',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
    }
  ]

  const displayMealSets = mealSets.length > 0 ? mealSets : placeholderMealSets
  const displayIndividual = individualItems.length > 0 ? individualItems : placeholderIndividual

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-serif italic text-secondary text-sm mb-4">
            Thực đơn chay tịnh
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
            Mỗi món ăn là một bài kinh nhớ
          </h1>
          <p className="font-sans text-base text-charcoal/50 max-w-xl mx-auto">
            Chúng tôi chọn nguyên liệu theo mùa, không sử dụng phụ gia tổng hợp, chế biến với lòng từ bi
            để giữ trọn năng lượng thanh tịnh trong từng món ăn.
          </p>
        </div>
      </section>

      {/* Mâm Cỗ Cúng Dường Section */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            Mâm Cỗ Cúng Dường
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayMealSets.map((item: any, index) => (
              item._id ? (
                <ProductCard key={item._id} product={item} />
              ) : (
                <Link key={index} to="/menu" className="group">
                  <div className="aspect-[4/3] overflow-hidden mb-5 bg-sand">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/50 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-sans text-sm font-medium text-primary">
                    {item.price}
                  </p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Món Lẻ Tinh Tế Section */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            Món Lẻ Tinh Tế
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {displayIndividual.map((item: any, index) => (
              item._id ? (
                <ProductCard key={item._id} product={item} />
              ) : (
                <Link key={index} to="/menu" className="group">
                  <div className="aspect-[4/5] overflow-hidden mb-5 bg-sand">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/50 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-sans text-sm font-medium text-primary">
                    {item.price}
                  </p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Tráng Miệng & Chè Section */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            Tráng Miệng & Chè
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {placeholderDesserts.map((item, index) => (
              <Link key={index} to="/menu" className="group">
                <div className="aspect-[4/5] overflow-hidden mb-5 bg-sand">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                  />
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="font-sans text-sm text-charcoal/50 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <p className="font-sans text-sm font-medium text-primary">
                  {item.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 border-t border-sand">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Liên hệ đặt mâm cơm
          </h2>
          <p className="font-sans text-base text-charcoal/50 mb-10">
            Quý khách vui lòng đặt trước tối thiểu 1 ngày để bếp chuẩn bị nguyên liệu
            tươi sạch và phục vụ chu đáo nhất.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0972955382"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-secondary-dark transition-colors duration-300"
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
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
