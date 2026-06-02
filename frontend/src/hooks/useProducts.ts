import { useState, useEffect } from 'react'
import { productService } from '../services/productService'
import { Product } from '../types'

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await productService.getAll(category)
        setProducts(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  return { products, loading, error }
}

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await productService.getById(id)
        setProduct(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}
