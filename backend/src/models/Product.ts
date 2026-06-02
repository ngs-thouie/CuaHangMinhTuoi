import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: 'individual' | 'meal-set'
  occasion?: string // 'cung-ram', 'daily', etc.
  servings?: number // for meal sets
  components?: string[] // ingredients for meal sets
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  image?: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['individual', 'meal-set'], required: true },
  occasion: { type: String },
  servings: { type: Number },
  components: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  image: { type: String },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)
