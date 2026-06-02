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

export interface Notification {
  _id: string
  title: string
  message: string
  createdAt: string
}

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await API.get('/notifications')
    return response.data
  },

  createNotification: async (title: string, message: string): Promise<Notification> => {
    const response = await API.post('/notifications', { title, message })
    return response.data
  }
}
