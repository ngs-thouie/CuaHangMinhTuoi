import { useState, useCallback } from 'react'
import { userService } from '../services/userService'

interface Stats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalRevenue: number
}

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await userService.getAll()
      setUsers(data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const data = await userService.getStats()
      setStats(data)
    } catch (err: any) {
      console.error('Failed to fetch stats:', err)
    }
  }, [])

  const updateUser = useCallback(async (id: string, data: { name?: string; email?: string; phone?: string; role?: string }) => {
    try {
      const updated = await userService.update(id, data)
      setUsers(prev => prev.map(u => u._id === id ? updated : u))
      return updated
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update user')
    }
  }, [])

  const deleteUser = useCallback(async (id: string) => {
    try {
      await userService.delete(id)
      setUsers(prev => prev.filter(u => u._id !== id))
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to delete user')
    }
  }, [])

  return {
    users,
    stats,
    loading,
    error,
    fetchUsers,
    fetchStats,
    updateUser,
    deleteUser
  }
}
