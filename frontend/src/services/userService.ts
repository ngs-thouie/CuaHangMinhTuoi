import axios from 'axios'

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

export const userService = {
  getStats: async () => {
    const response = await API.get('/users/stats')
    return response.data
  },

  getAll: async () => {
    const response = await API.get('/users')
    return response.data
  },

  getById: async (id: string) => {
    const response = await API.get(`/users/${id}`)
    return response.data
  },

  update: async (id: string, data: { name?: string; email?: string; phone?: string; role?: string }) => {
    const response = await API.put(`/users/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await API.delete(`/users/${id}`)
  }
}
