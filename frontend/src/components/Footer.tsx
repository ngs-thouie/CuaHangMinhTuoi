import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cream border-t border-sand">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center space-y-6">
          <h3 className="font-serif text-2xl italic text-charcoal">
            Cửa hàng Minh Tươi
          </h3>
          <div className="space-y-2">
            <p className="font-sans text-sm text-charcoal/50">
              Địa chỉ: Cửa hàng Minh Tươi, Phố Lạc Vệ, Huyện Tiên Du, Tỉnh Bắc Ninh
            </p>
            <p className="font-sans text-sm text-charcoal/50">
              Mở cửa: 07:00 – 21:00 (Tất cả các ngày trong tuần)
            </p>
            <p className="font-sans text-sm text-charcoal/50">
              Hotline: <a href="tel:0972955382" className="text-secondary hover:text-secondary-dark transition-colors">097 295 5382</a>
            </p>
          </div>

          <div className="pt-8 border-t border-sand">
            <p className="font-sans text-xs text-charcoal/30 uppercase tracking-wider">
              © 2026 Cửa hàng Minh Tươi
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
