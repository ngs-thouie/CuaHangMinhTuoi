import { Request, Response } from 'express'
import { Order } from '../models/Order.js'
import { User } from '../models/User.js'
import { generateVietQRPayload } from '../utils/vietqr.js'

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, customerName, customerPhone, customerEmail, deliveryDate, deliveryTime, deliveryAddress, notes } = req.body

    // Calculate total amount
    let totalAmount = 0
    items.forEach((item: any) => {
      totalAmount += item.price * item.quantity
    })

    // Generate unique order code
    const orderCode = `MT${Date.now()}`

    const order = new Order({
      orderCode,
      items,
      totalAmount,
      customerName,
      customerPhone,
      customerEmail,
      deliveryDate,
      deliveryTime,
      deliveryAddress,
      notes,
      paymentStatus: 'pending',
      status: 'pending'
    })

    await order.save()

    // Generate VietQR payload for payment
    const vietqrPayload = generateVietQRPayload({
      bankBin: '970416',
      accountNumber: process.env.BANK_ACCOUNT || '0123456789',
      amount: totalAmount,
      description: `Thanh toan don hang ${orderCode}`,
      accountName: 'Cua hang Minh Tuoi'
    })

    res.status(201).json({
      order,
      vietqrPayload
    })
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' })
  }
}

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const order = await Order.findById(id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    // Generate VietQR payload for payment
    const vietqrPayload = generateVietQRPayload({
      bankBin: '970416',
      accountNumber: process.env.BANK_ACCOUNT || '0123456789',
      amount: order.totalAmount,
      description: `Thanh toan don hang ${order.orderCode}`,
      accountName: 'Cua hang Minh Tuoi'
    })

    res.json({
      order,
      vietqrPayload
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
}

export const getOrderByCode = async (req: Request, res: Response) => {
  try {
    const { orderCode } = req.params
    const order = await Order.findOne({ orderCode })

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    // Generate VietQR payload for payment
    const vietqrPayload = generateVietQRPayload({
      bankBin: '970416',
      accountNumber: process.env.BANK_ACCOUNT || '0123456789',
      amount: order.totalAmount,
      description: `Thanh toan don hang ${order.orderCode}`,
      accountName: 'Cua hang Minh Tuoi'
    })

    res.json({
      order,
      vietqrPayload
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json(order)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order' })
  }
}

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { paymentStatus, receiptImage } = req.body

    const updateData: any = { paymentStatus }
    if (receiptImage) {
      updateData.receiptImage = receiptImage
    }

    const order = await Order.findByIdAndUpdate(id, updateData, { new: true })

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json(order)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update payment status' })
  }
}

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate } = req.query
    let filter: any = {}

    if (status) {
      filter.status = status
    }

    if (startDate || endDate) {
      filter.deliveryDate = {}
      if (startDate) {
        filter.deliveryDate.$gte = new Date(startDate as string)
      }
      if (endDate) {
        filter.deliveryDate.$lte = new Date(endDate as string)
      }
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
}

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find orders by user's email or phone
    const orders = await Order.find({
      $or: [
        { customerEmail: user.email },
        { customerPhone: user.phone }
      ]
    }).sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    console.error('Failed to fetch user orders', error)
    res.status(500).json({ error: 'Failed to fetch user orders' })
  }
}
