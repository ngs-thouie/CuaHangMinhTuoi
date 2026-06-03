import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Product } from '../types'
import { authService } from '../services/authService'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalAmount: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const getCartKey = () => {
  const user = authService.getCurrentUser()
  return `cart_${user?.id || 'guest'}`
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(getCartKey())
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  // Listen for auth changes to switch cart
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const savedCart = localStorage.getItem(getCartKey())
        setItems(savedCart ? JSON.parse(savedCart) : [])
      } catch {
        setItems([])
      }
    }
    window.addEventListener('auth-change', handleAuthChange)
    return () => window.removeEventListener('auth-change', handleAuthChange)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(getCartKey(), JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product._id)
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prevItems,
        {
          productId: product._id || '',
          product,
          quantity,
          price: product.price
        }
      ]
    })
  }

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalAmount,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
