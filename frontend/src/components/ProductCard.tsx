import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

interface ProductCardProps {
  product: Product
  onClick?: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { success } = useToast()
  const [quantity, setQuantity] = React.useState(1)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, quantity)
    setQuantity(1)
    success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, quantity)
    navigate('/checkout')
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/5] overflow-hidden mb-4 bg-sand">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal/30 font-sans text-sm">
            Chưa có hình ảnh
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {product.category === 'meal-set' && product.servings && (
          <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider">
            Phục vụ {product.servings} người
          </p>
        )}

        <p className="font-sans text-sm text-charcoal/50 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="font-sans text-sm font-medium text-primary">
            {product.price.toLocaleString()}đ
            {product.category === 'meal-set' && ' / mâm'}
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 flex items-center justify-center border border-sand text-charcoal/50 hover:border-charcoal/30 transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center font-sans text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 flex items-center justify-center border border-sand text-charcoal/50 hover:border-charcoal/30 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white border border-primary text-primary py-2.5 font-sans text-xs sm:text-sm font-medium tracking-wide hover:bg-primary/5 transition-colors duration-300"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-primary border border-primary text-white py-2.5 font-sans text-xs sm:text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}
