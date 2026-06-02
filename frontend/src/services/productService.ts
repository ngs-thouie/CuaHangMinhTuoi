import axios from 'axios'
import { Product } from '../types'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const productService = {
  getAll: async (category?: string, search?: string) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (search) params.append('search', search)
    
    const response = await API.get(`/products?${params}`)
    return response.data
  },

  getAllAdmin: async () => {
    const response = await API.get('/products/admin/all')
    return response.data
  },

  getById: async (id: string) => {
    const response = await API.get(`/products/${id}`)
    return response.data
  },

  create: async (product: Product) => {
    const response = await API.post('/products', product)
    return response.data
  },

  update: async (id: string, product: Product) => {
    const response = await API.put(`/products/${id}`, product)
    return response.data
  },

  delete: async (id: string) => {
    await API.delete(`/products/${id}`)
  }
}
