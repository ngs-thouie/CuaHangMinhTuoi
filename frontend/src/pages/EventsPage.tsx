import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { eventService } from '../services/eventService'

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await eventService.getAll()
        setEvents(data)
      } catch {
        console.error('Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <p className="font-serif italic text-secondary text-sm mb-4">
            Lịch chay &amp; thông báo
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
            Sự Kiện Tâm Linh
          </h1>
          <p className="font-sans text-base text-charcoal/50 max-w-xl mx-auto">
            Cập nhật các ngày lễ Phật giáo, lịch cúng dường và những khóa tu được tổ chức tại Cửa hàng Minh Tươi trong năm.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-20">
          {loading ? (
            <p className="text-center py-12 font-sans text-charcoal/50">Đang tải sự kiện...</p>
          ) : events.length === 0 ? (
            <p className="text-center py-12 font-sans text-charcoal/50">Chưa có sự kiện nào.</p>
          ) : (
            <div className="space-y-0">
              {events.map((event, index) => (
                <div
                  key={event._id || index}
                  className="flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-t border-sand"
                >
                  {/* Date */}
                  <div className="flex-shrink-0 md:w-32">
                    <p className="font-serif text-4xl lg:text-5xl text-charcoal leading-none">
                      {event.dateNumber}
                    </p>
                    <p className="font-sans text-[10px] text-charcoal/50 mt-2 uppercase tracking-wider">
                      {event.dateDetail}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <span className={`font-sans text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 ${event.typeColor}`}>
                      {event.type}
                    </span>
                    <h3 className="font-serif text-xl lg:text-2xl text-charcoal">
                      {event.title}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/60 leading-relaxed max-w-2xl">
                      {event.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0 flex items-start">
                    <a
                      href="#"
                      className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-primary hover:text-primary-dark transition-colors"
                    >
                      ĐĂNG KÝ
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Kitchen Notice Section */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 border border-white/20 px-4 py-2 inline-block">
                Thông báo từ nhà bếp
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-white leading-tight">
                Mâm cơm chay mỗi ngày
                <br />
                <span className="italic">được chuẩn bị từ tâm</span>
              </h2>
              <p className="font-sans text-base text-white/60 max-w-md leading-relaxed">
                Trong các ngày Rằm và mùng Một, lượng đặt mâm rất đông.
                Quý khách vui lòng đặt trước tối thiểu 2 ngày để
                Cửa hàng Minh Tươi phục vụ chu đáo và đầy đủ nhất.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80"
                  alt="Hoa sen"
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
