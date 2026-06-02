import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useCart } from '../context/CartContext'

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalAmount, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-12">
          Giỏ Hàng
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-charcoal/50 mb-6">Giỏ hàng của bạn trống</p>
            <Link
              to="/menu"
              className="inline-block bg-primary text-white px-8 py-3 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <div
                  key={item.productId}
                  className="bg-white p-6 flex gap-6"
                >
                  <div className="w-24 h-24 bg-sand flex-shrink-0">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal/30 text-xs">
                        Ảnh
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-charcoal mb-1">
                      {item.product.name}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/50 mb-3">
                      {item.price.toLocaleString()}đ
                      {item.product.category === 'meal-set' && ` / ${item.product.servings} người`}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-sand text-charcoal/50 hover:border-charcoal/30 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-sans text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-sand text-charcoal/50 hover:border-charcoal/30 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="font-sans text-xs text-charcoal/40 hover:text-secondary transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-sans text-sm font-medium text-primary">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white p-8 sticky top-24">
                <h2 className="font-serif text-xl text-charcoal mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-charcoal/50">Số lượng:</span>
                    <span className="text-charcoal">{items.length} mặt hàng</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm font-medium text-primary pt-4 border-t border-sand">
                    <span>Tổng cộng:</span>
                    <span>{getTotalAmount().toLocaleString()}đ</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full bg-primary text-white py-3.5 text-center font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors mb-3"
                >
                  Tiếp tục Thanh Toán
                </Link>

                <button
                  onClick={clearCart}
                  className="block w-full border border-sand text-charcoal/60 py-3.5 text-center font-sans text-sm font-medium tracking-wide hover:border-charcoal/30 transition-colors"
                >
                  Xóa Giỏ Hàng
                </button>

                <Link
                  to="/menu"
                  className="block text-center mt-6 font-sans text-sm text-charcoal/40 hover:text-primary transition-colors"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
