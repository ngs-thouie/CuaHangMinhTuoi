import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
  productId: string
  quantity: number
  price: number
}

export interface IOrder extends Document {
  orderCode: string
  items: IOrderItem[]
  totalAmount: number
  customerName: string
  customerPhone: string
  customerEmail?: string
  deliveryDate: Date
  deliveryTime: string
  deliveryAddress: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  paymentMethod: 'vietqr' | 'bank-transfer' | 'cash'
  receiptImage?: string
  notes?: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>({
  orderCode: { type: String, required: true, unique: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: String,
  deliveryDate: { type: Date, required: true },
  deliveryTime: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['vietqr', 'bank-transfer', 'cash'], 
    default: 'vietqr' 
  },
  receiptImage: String,
  notes: String,
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Order = mongoose.model<IOrder>('Order', OrderSchema)
