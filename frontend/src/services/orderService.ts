import axios from 'axios'
import { Order } from '../types'

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

export const orderService = {
  create: async (orderData: Omit<Order, '_id' | 'orderCode'>) => {
    const response = await API.post('/orders', orderData)
    return response.data
  },

  getById: async (id: string) => {
    const response = await API.get(`/orders/${id}`)
    return response.data
  },

  getMyOrders: async () => {
    const response = await API.get('/orders/my-orders')
    return response.data
  },

  getByCode: async (orderCode: string) => {
    const response = await API.get(`/orders/code/${orderCode}`)
    return response.data
  },

  updateStatus: async (id: string, status: string) => {
    const response = await API.put(`/orders/${id}/status`, { status })
    return response.data
  },

  updatePaymentStatus: async (id: string, paymentStatus: string, receiptImage?: string) => {
    const response = await API.put(`/orders/${id}/payment`, {
      paymentStatus,
      receiptImage
    })
    return response.data
  },

  getAll: async (status?: string) => {
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    
    const response = await API.get(`/orders?${params}`)
    return response.data
  }
}
