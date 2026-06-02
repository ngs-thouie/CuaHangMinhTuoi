import { Request, Response } from 'express'
import { Message } from '../models/Message.js'
import { User } from '../models/User.js'
import mongoose from 'mongoose'

// Get messages for a specific customer (either they sent to admin, or admin sent to them)
export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ createdAt: 1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Customer sends a message to Admin
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const { content } = req.body

    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    if (!content) return res.status(400).json({ error: 'Content is required' })

    const message = await Message.create({
      senderId: userId,
      receiverId: null, // null means sent to admin
      content
    })

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// ---------------- Admin Routes ----------------

// Get all unique customers who have messaged
export const getChatThreads = async (req: Request, res: Response) => {
  try {
    // Find all users who are senders or receivers in the Message collection
    const threadUserIds = await Message.distinct('senderId')
    const receiverIds = await Message.distinct('receiverId', { receiverId: { $ne: null } })
    
    const uniqueUserIds = [...new Set([...threadUserIds.map(id => id.toString()), ...receiverIds.map(id => id.toString())])]

    const users = await User.find({
      _id: { $in: uniqueUserIds },
      role: 'customer'
    }).select('name email')

    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Admin gets messages with a specific user
export const getAdminMessages = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId

    const messages = await Message.find({
      $or: [
        { senderId: customerId },
        { receiverId: customerId }
      ]
    }).sort({ createdAt: 1 })

    // Mark as read
    await Message.updateMany(
      { senderId: customerId, read: false },
      { $set: { read: true } }
    )

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Admin sends message to customer
export const sendAdminMessage = async (req: Request, res: Response) => {
  try {
    const adminId = req.userId
    const customerId = req.params.customerId
    const { content } = req.body

    if (!content) return res.status(400).json({ error: 'Content is required' })

    const message = await Message.create({
      senderId: adminId,
      receiverId: customerId,
      content
    })

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
