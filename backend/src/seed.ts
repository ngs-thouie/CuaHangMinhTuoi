import mongoose from 'mongoose'
import { Product } from './models/Product.js'
import { User } from './models/User.js'
import { Order } from './models/Order.js'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cuahangminhttuoi'

const sampleProducts = [
  // Meal Sets
  {
    name: 'Mâm Cỗ An Lạc (9 món)',
    description: 'Set mâm cỗ cúng đầy đủ hương vị, phù hợp cho ngày Rằm, mùng Một và các dịp lễ Phật.',
    price: 1200000,
    category: 'meal-set',
    occasion: 'cung-ram',
    servings: 9,
    components: ['Canh chua chay', 'Đậu hũ chiên sả', 'Rau xào thập cẩm', 'Nem chay', 'Cơm sen', 'Chè hạt sen', 'Gỏi sen', 'Nấm xào', 'Chả giò chay'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    available: true
  },
  {
    name: 'Mâm Cỗ Vu Lan Báo Hiếu',
    description: 'Mâm cỗ chay 11 món dành riêng cho mùa Vu Lan – kính dâng cha mẹ. Đặt trước tối thiểu 3 ngày.',
    price: 1800000,
    category: 'meal-set',
    occasion: 'vu-lan',
    servings: 11,
    components: ['Canh măng chay', 'Đậu hũ sốt cà chua', 'Rau muống xào tỏi', 'Bánh xèo chay', 'Cơm dẻo', 'Chè đậu xanh', 'Gỏi cuốn chay', 'Nấm hương xào', 'Chả giò rế', 'Bún xào chay', 'Trái cây tươi'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    available: true
  },
  {
    name: 'Mâm Cỗ Ngày Thường (6 món)',
    description: 'Mâm cỗ chay đơn giản cho gia đình hàng ngày, đầy đủ dinh dưỡng và hương vị.',
    price: 650000,
    category: 'meal-set',
    occasion: 'daily',
    servings: 6,
    components: ['Canh rau ngọt', 'Đậu hũ kho', 'Rau xào', 'Cơm trắng', 'Trái cây', 'Chè đậu'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    available: true
  },
  {
    name: 'Mâm Cỗ Phật Đản (7 món)',
    description: 'Mâm cỗ chay thanh tịnh cho đại lễ Phật Đản, chế biến hoàn toàn từ nguyên liệu hữu cơ.',
    price: 950000,
    category: 'meal-set',
    occasion: 'phat-dan',
    servings: 7,
    components: ['Canh bí đỏ', 'Đậu hũ hấp nấm', 'Rau luộc', 'Xôi gấc', 'Chè sen', 'Gỏi bưởi', 'Bánh ít chay'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    available: true
  },
  // Individual Items
  {
    name: 'Gỏi Ngó Sen Đậu Hũ',
    description: 'Gỏi ngó sen giòn tươi, kết hợp cùng đậu hũ chiên và rau thơm, nước trộn thanh chua dịu ngọt.',
    price: 120000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    available: true
  },
  {
    name: 'Đậu Hũ Chiên Sả Ớt',
    description: 'Vỏ giòn bên ngoài, mềm mịn bên trong, đậm hương thơm nồng cùng vị cay nhè nhẹ của sả ớt.',
    price: 85000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    available: true
  },
  {
    name: 'Cơm Hấp Lá Sen',
    description: 'Gạo nếp thơm hấp trong lá sen, điểm thêm đậu xanh và hạt sen tươi, giữ trọn hương đồng cỏ nội.',
    price: 95000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    available: true
  },
  {
    name: 'Lẩu Nấm Hoàng Kim',
    description: 'Bảy loại nấm quý cùng nước dùng thảo dược thanh ngọt tự nhiên, ấm áp cho mùa đông sum vầy.',
    price: 450000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    available: true
  },
  {
    name: 'Nem Chay Giòn Rụm',
    description: 'Vỏ bánh giòn rụm bọc lấy nhân nấm mộc nhĩ rau củ, chấm cùng tương ớt chua ngọt.',
    price: 75000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    available: true
  },
  {
    name: 'Canh Chua Nấm Đậu Hũ',
    description: 'Vị chua dịu của me, ngọt thanh của cà chua, quyện cùng nấm mềm và đậu hũ non.',
    price: 95000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    available: true
  },
  // Desserts
  {
    name: 'Chè Hạt Sen Long Nhãn',
    description: 'Hạt sen bùi bở hoà cùng long nhãn ngọt thanh, giải nhiệt thân tâm.',
    price: 55000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    available: true
  },
  {
    name: 'Bánh Flan Cà Phê Chay',
    description: 'Bánh flan mềm mịn vị cà phê đậm đà, lớp caramel ngọt dịu. Hoàn toàn từ nguyên liệu thực vật.',
    price: 45000,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    available: true
  }
]

const sampleOrders = [
  {
    orderCode: 'ANT-20260601-001',
    items: [
      { productId: 'placeholder1', quantity: 1, price: 1200000 },
      { productId: 'placeholder2', quantity: 2, price: 120000 }
    ],
    totalAmount: 1440000,
    customerName: 'Nguyễn Văn An',
    customerPhone: '0912345678',
    customerEmail: 'an@email.com',
    deliveryDate: new Date('2026-06-15'),
    deliveryTime: '10:00',
    deliveryAddress: '123 Đường Lê Lợi, Quận 1, TP. HCM',
    paymentStatus: 'completed',
    paymentMethod: 'vietqr',
    status: 'confirmed'
  },
  {
    orderCode: 'ANT-20260601-002',
    items: [
      { productId: 'placeholder3', quantity: 1, price: 1800000 }
    ],
    totalAmount: 1800000,
    customerName: 'Trần Thị Bình',
    customerPhone: '0987654321',
    deliveryDate: new Date('2026-07-15'),
    deliveryTime: '09:00',
    deliveryAddress: '456 Đường Nguyễn Huệ, Quận 3, TP. HCM',
    paymentStatus: 'pending',
    paymentMethod: 'bank-transfer',
    notes: 'Cần giao trước 10h sáng',
    status: 'pending'
  },
  {
    orderCode: 'ANT-20260601-003',
    items: [
      { productId: 'placeholder4', quantity: 3, price: 85000 },
      { productId: 'placeholder5', quantity: 2, price: 95000 }
    ],
    totalAmount: 445000,
    customerName: 'Lê Minh Cường',
    customerPhone: '0909123456',
    deliveryDate: new Date('2026-06-10'),
    deliveryTime: '12:00',
    deliveryAddress: '789 Đường Võ Văn Tần, Quận 3, TP. HCM',
    paymentStatus: 'completed',
    paymentMethod: 'cash',
    status: 'completed'
  },
  {
    orderCode: 'ANT-20260601-004',
    items: [
      { productId: 'placeholder6', quantity: 1, price: 650000 },
      { productId: 'placeholder7', quantity: 1, price: 75000 }
    ],
    totalAmount: 725000,
    customerName: 'Phạm Thị Dung',
    customerPhone: '0933456789',
    customerEmail: 'dung@email.com',
    deliveryDate: new Date('2026-06-20'),
    deliveryTime: '11:00',
    deliveryAddress: '321 Đường Cách Mạng Tháng 8, Quận 10, TP. HCM',
    paymentStatus: 'pending',
    paymentMethod: 'vietqr',
    status: 'preparing'
  }
]

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    console.log('Clearing existing data...')
    await Product.deleteMany({})
    await User.deleteMany({})
    await Order.deleteMany({})

    // Seed products
    console.log('Seeding products...')
    const products = await Product.insertMany(sampleProducts)
    console.log(`Seeded ${products.length} products`)

    // Seed admin user
    console.log('Seeding admin user...')
    const adminUser = new User({
      email: 'admin@anhhientu.com',
      password: 'admin123',
      name: 'Admin An Nhiên',
      role: 'admin',
      phone: '0901234567'
    })
    await adminUser.save()
    console.log('Seeded admin user: admin@anhhientu.com / admin123')

    // Seed customer user
    console.log('Seeding customer user...')
    const customerUser = new User({
      email: 'customer@email.com',
      password: 'customer123',
      name: 'Nguyễn Văn Khách',
      role: 'customer',
      phone: '0912345678'
    })
    await customerUser.save()
    console.log('Seeded customer user: customer@email.com / customer123')

    // Seed orders with real product IDs
    console.log('Seeding orders...')
    const ordersWithIds = sampleOrders.map((order) => ({
      ...order,
      items: order.items.map((item, itemIndex) => ({
        ...item,
        productId: products[itemIndex % products.length]._id.toString()
      }))
    }))
    const orders = await Order.insertMany(ordersWithIds)
    console.log(`Seeded ${orders.length} orders`)

    // Seed events (if Event model exists)
    try {
      const { Event } = await import('./models/Event.js')
      await Event.deleteMany({})
      const sampleEvents = [
        {
          dateNumber: '15.07',
          dateDetail: '15 THÁNG 7 ÂM LỊCH',
          type: 'ĐẠI LỄ',
          typeColor: 'bg-secondary text-white',
          title: 'Đại Lễ Vu Lan Báo Hiếu',
          description: 'Đại lễ cúng dường cha mẹ ông bà. Cửa hàng Minh Tươi nhận đặt mâm cơm trọn gói tận nhà, tặng kẹo sen và hoa cúng. Vui lòng đặt trước 3 ngày.',
          active: true
        },
        {
          dateNumber: '01.08',
          dateDetail: 'MÙNG 1 THÁNG 8 ÂM LỊCH',
          type: 'KHÓA TU',
          typeColor: 'bg-primary text-white',
          title: 'Khóa Tu Tịnh Tâm Đầu Tháng',
          description: 'Một ngày tu tập – thiền hành – nghe pháp thoại tại quán. Số lượng giới hạn 30 người, miễn phí cơm trưa chay.',
          active: true
        },
        {
          dateNumber: '01',
          dateDetail: 'MÙNG 1 HÀNG THÁNG ÂM LỊCH',
          type: 'THƯỜNG KỲ',
          typeColor: 'bg-charcoal/10 text-charcoal',
          title: 'Ngày Chay Tịnh Mùng Một',
          description: 'Ưu đãi 15% cho tất cả mâm cơm chay đặt cúng tại gia. Giao hàng nội thành miễn phí từ 5km.',
          active: true
        },
        {
          dateNumber: '15',
          dateDetail: 'RẰM 15 HÀNG THÁNG ÂM LỊCH',
          type: 'THƯỜNG KỲ',
          typeColor: 'bg-charcoal/10 text-charcoal',
          title: 'Ngày Rằm Cúng Chay',
          description: 'Thực đơn rằm với 7 món chay đặc biệt, cân bằng ngũ hành. Đặt trước 2 ngày để bếp chuẩn bị nguyên liệu tươi.',
          active: true
        },
        {
          dateNumber: '08.04',
          dateDetail: '08 THÁNG 4 ÂM LỊCH',
          type: 'ĐẠI LỄ',
          typeColor: 'bg-secondary text-white',
          title: 'Đại Lễ Phật Đản',
          description: 'Tiệc buffet chay ngoài trời tại khuôn viên quán, mỗi gia đình cùng gieo duyên. Tặng đèn hoa sen cho mỗi gia đình.',
          active: true
        }
      ]
      const events = await Event.insertMany(sampleEvents)
      console.log(`Seeded ${events.length} events`)
    } catch {
      console.log('Event model not found, skipping event seeding')
    }

    console.log('\n=== Seed Complete ===')
    console.log('Admin login: admin@anhhientu.com / admin123')
    console.log('Customer login: customer@email.com / customer123')
    console.log(`Products: ${products.length}`)
    console.log(`Orders: ${orders.length}`)

    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

seed()
