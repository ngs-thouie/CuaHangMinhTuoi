import { Request, Response } from 'express'
import { User } from '../models/User.js'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email, phone, role } = req.body

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, phone, role },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}

export const getStats = async (req: Request, res: Response) => {
  try {
    const { Order } = await import('../models/Order.js')
    const { Product } = await import('../models/Product.js')

    const totalUsers = await User.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()
    
    const pendingOrders = await Order.countDocuments({ status: 'pending' })
    const completedOrders = await Order.countDocuments({ status: 'completed' })
    
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}
