import axios from 'axios'
import { AuthResponse } from '../types'

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

export const authService = {
  register: async (email: string, password: string, name: string, phone?: string) => {
    const response = await API.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
      phone
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      window.dispatchEvent(new Event('auth-change'))
    }
    return response.data
  },

  login: async (email: string, password: string) => {
    const response = await API.post<AuthResponse>('/auth/login', {
      email,
      password
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      window.dispatchEvent(new Event('auth-change'))
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('auth-change'))
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  getProfile: async () => {
    const response = await API.get('/auth/me')
    return response.data
  },

  updateProfile: async (name: string, phone?: string) => {
    const response = await API.put('/auth/profile', { name, phone })
    return response.data
  }
}
