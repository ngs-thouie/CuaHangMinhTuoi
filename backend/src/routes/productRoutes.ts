import { Router } from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin
} from '../controllers/productController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

// Public routes
router.get('/', getProducts)

// Admin routes (must be before /:id to avoid matching 'admin' as id)
router.get('/admin/all', authMiddleware, adminMiddleware, getAllProductsAdmin)

// Public detail route
router.get('/:id', getProductById)
router.post('/', authMiddleware, adminMiddleware, createProduct)
router.put('/:id', authMiddleware, adminMiddleware, updateProduct)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct)

export default router
