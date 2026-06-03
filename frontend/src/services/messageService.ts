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

export interface Message {
  _id: string
  senderId: string
  receiverId: string | null
  content: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export const messageService = {
  getUnreadCount: async () => {
    const res = await API.get('/messages/unread-count')
    return res.data.count
  },

  // Customer routes
  getMessages: async (): Promise<Message[]> => {
    const response = await API.get('/messages')
    return response.data
  },

  sendMessage: async (content: string): Promise<Message> => {
    const response = await API.post('/messages', { content })
    return response.data
  },

  // Admin routes
  getChatThreads: async () => {
    const response = await API.get('/messages/admin/threads')
    return response.data // Returns users
  },

  getAdminMessages: async (customerId: string): Promise<Message[]> => {
    const response = await API.get(`/messages/admin/${customerId}`)
    return response.data
  },

  sendAdminMessage: async (customerId: string, content: string): Promise<Message> => {
    const response = await API.post(`/messages/admin/${customerId}`, { content })
    return response.data
  }
}
