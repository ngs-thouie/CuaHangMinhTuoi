import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'
import { getNotifications, createNotification } from '../controllers/notificationController.js'

const router = express.Router()

// Public/Customer routes
router.get('/', getNotifications)

// Admin routes
router.post('/', authMiddleware, adminMiddleware, createNotification)

export default router
