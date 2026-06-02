import { Router } from 'express'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getStats
} from '../controllers/userController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

// All routes require admin
router.use(authMiddleware, adminMiddleware)

router.get('/stats', getStats)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
