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

export interface EventData {
  dateNumber: string
  dateDetail: string
  type: string
  typeColor: string
  title: string
  description: string
  active: boolean
}

export const eventService = {
  getAll: async () => {
    const response = await API.get('/events')
    return response.data
  },

  getAllAdmin: async () => {
    const response = await API.get('/events/all')
    return response.data
  },

  getById: async (id: string) => {
    const response = await API.get(`/events/${id}`)
    return response.data
  },

  create: async (event: EventData) => {
    const response = await API.post('/events', event)
    return response.data
  },

  update: async (id: string, event: Partial<EventData>) => {
    const response = await API.put(`/events/${id}`, event)
    return response.data
  },

  delete: async (id: string) => {
    await API.delete(`/events/${id}`)
  }
}
