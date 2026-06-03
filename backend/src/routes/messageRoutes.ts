import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'
import {
  getMessages,
  sendMessage,
  getChatThreads,
  getAdminMessages,
  sendAdminMessage,
  getUnreadCount
} from '../controllers/messageController.js'

const router = express.Router()

// Global unread count (for both customer and admin)
router.get('/unread-count', authMiddleware, getUnreadCount)

// Customer routes
router.get('/', authMiddleware, getMessages)
router.post('/', authMiddleware, sendMessage)

// Admin routes
router.get('/admin/threads', authMiddleware, adminMiddleware, getChatThreads)
router.get('/admin/:customerId', authMiddleware, adminMiddleware, getAdminMessages)
router.post('/admin/:customerId', authMiddleware, adminMiddleware, sendAdminMessage)

export default router
