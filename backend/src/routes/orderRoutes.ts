import { Router } from 'express'
import {
  createOrder,
  getOrder,
  getOrderByCode,
  updateOrderStatus,
  updatePaymentStatus,
  getAllOrders,
  getMyOrders
} from '../controllers/orderController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

// Public routes
router.post('/', createOrder)
router.get('/code/:orderCode', getOrderByCode)

// Protected routes
router.get('/my-orders', authMiddleware, getMyOrders)
router.get('/:id', getOrder)

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllOrders)
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus)
router.put('/:id/payment', authMiddleware, adminMiddleware, updatePaymentStatus)

export default router
