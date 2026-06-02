import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175']
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/notifications', notificationRoutes)

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/cuahangminhttuoi'
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// Start server
const startServer = async () => {
  await connectDB()
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startServer().catch(error => {
  console.error('Failed to start server:', error)
  process.exit(1)
})

export default app
