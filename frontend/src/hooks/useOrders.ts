import { useState } from 'react'
import { orderService } from '../services/orderService'
import { Order } from '../types'

export const useOrders = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createOrder = async (orderData: Omit<Order, '_id' | 'orderCode'>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await orderService.create(orderData)
      return result
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to create order'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const getOrder = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await orderService.getById(id)
      return result
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to fetch order'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const getOrderByCode = async (orderCode: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await orderService.getByCode(orderCode)
      return result
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to fetch order'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const updatePaymentStatus = async (id: string, paymentStatus: string, receiptImage?: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await orderService.updatePaymentStatus(id, paymentStatus, receiptImage)
      return result
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to update payment status'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    createOrder,
    getOrder,
    getOrderByCode,
    updatePaymentStatus,
    loading,
    error
  }
}
