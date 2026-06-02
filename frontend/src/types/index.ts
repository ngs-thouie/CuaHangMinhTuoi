export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  category: 'individual' | 'meal-set'
  occasion?: string
  servings?: number
  components?: string[]
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  image?: string
  available: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
}

export interface Order {
  _id?: string
  orderCode: string
  items: CartItem[]
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
  createdAt?: Date
  updatedAt?: Date
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
  phone?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Event {
  _id?: string
  dateNumber: string
  dateDetail: string
  type: string
  typeColor: string
  title: string
  description: string
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}
