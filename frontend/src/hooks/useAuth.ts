import { useState, useCallback } from 'react'
import { authService } from '../services/authService'
import { User } from '../types'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = useCallback(async (email: string, password: string, name: string, phone?: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await authService.register(email, password, name, phone)
      setUser(result.user)
      return result
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Registration failed'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await authService.login(email, password)
      setUser(result.user)
      return result
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Login failed'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setError(null)
  }, [])

  const isAuthenticated = !!user

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    error
  }
}
