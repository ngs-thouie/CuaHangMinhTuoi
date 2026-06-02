import { Router } from 'express'
import {
  getEvents,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

// Public routes
router.get('/', getEvents)

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, getAllEvents)
router.get('/:id', authMiddleware, adminMiddleware, getEventById)
router.post('/', authMiddleware, adminMiddleware, createEvent)
router.put('/:id', authMiddleware, adminMiddleware, updateEvent)
router.delete('/:id', authMiddleware, adminMiddleware, deleteEvent)

export default router
