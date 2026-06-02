import { Request, Response } from 'express'
import { Notification } from '../models/Notification.js'

// Get all notifications (Public/Customer)
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20)
    res.json(notifications)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Create a new broadcast notification (Admin only)
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body

    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' })
    }

    const notification = await Notification.create({ title, message })
    res.status(201).json(notification)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
