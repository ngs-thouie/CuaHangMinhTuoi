# Hướng dẫn Chạy Dự án Cửa hàng Minh Tươi

## 📋 Yêu cầu hệ thống

- **Node.js**: v18 hoặc cao hơn
- **npm**: v8 hoặc cao hơn
- **MongoDB**: Local (cài đặt sẵn) hoặc MongoDB Cloud (Atlas)

## 🚀 Bước 1: Chuẩn bị môi trường

### 1.1 MongoDB Setup

**Option A: MongoDB Local**
```bash
# Windows - Chạy MongoDB Server
mongod

# Kiểm tra kết nối
mongo
```

**Option B: MongoDB Cloud (Atlas)**
1. Truy cập https://www.mongodb.com/cloud/atlas
2. Tạo account và tạo cluster
3. Lấy connection string
4. Cập nhật vào `.env` file

### 1.2 Cấu hình Environment

Tạo file `.env` trong thư mục `backend/`:
```bash
cp backend/.env.example backend/.env
```

Chỉnh sửa `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cuahangminhttuoi
JWT_SECRET=your_secret_key_here_change_this
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
BANK_ACCOUNT=0123456789
```

## 🏃 Bước 2: Chạy dự án

### Cách 1: Chạy từng phần riêng

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend sẽ chạy tại: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

### Cách 2: Chạy cả hai cùng lúc

**Cài đặt concurrently (nếu chưa có):**
```bash
npm install concurrently
```

**Từ thư mục root:**
```bash
npm run dev
```

## ✅ Kiểm tra hoạt động

### 1. Health Check
```bash
curl http://localhost:5000/health
# Phản hồi: {"status":"Server is running"}
```

### 2. Test API Products
```bash
curl http://localhost:5000/api/products
```

### 3. Truy cập Frontend
Mở browser và truy cập: `http://localhost:5173`

## 📝 API Endpoints Chính

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Products
- `GET /api/products` - Danh sách sản phẩm
- `GET /api/products?category=individual` - Lọc theo loại
- `GET /api/products/:id` - Chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (Admin)

### Orders
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `GET /api/orders/code/:orderCode` - Tìm đơn hàng theo mã
- `PUT /api/orders/:id/status` - Cập nhật trạng thái (Admin)

## 🔧 Lệnh hữu ích

### Backend
```bash
# Phát triển
npm run dev

# Build
npm run build

# Build production
npm run build
```

### Frontend
```bash
# Phát triển
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## 🗄️ Cấu trúc MongoDB Collections

### Products
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: "individual" | "meal-set",
  occasion: String,
  servings: Number,
  components: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  image: String,
  available: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders
```javascript
{
  _id: ObjectId,
  orderCode: String,
  items: [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  deliveryDate: Date,
  deliveryTime: String,
  deliveryAddress: String,
  paymentStatus: "pending" | "completed" | "failed",
  paymentMethod: "vietqr" | "bank-transfer" | "cash",
  receiptImage: String,
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled",
  createdAt: Date,
  updatedAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB không kết nối
- Kiểm tra MongoDB service đang chạy
- Kiểm tra MONGODB_URI trong .env
- Kiểm tra firewall settings

### Port 5000/5173 đã được sử dụng
```bash
# Tìm process sử dụng port 5000
lsof -i :5000

# Kill process (trên Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Dependencies lỗi
```bash
# Xóa node_modules và package-lock
rm -r node_modules package-lock.json
npm install
```

## 📚 Tài liệu thêm

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## ❓ Cần hỗ trợ?

Tham khảo các files:
- `README.md` - Tổng quan dự án
- `.github/copilot-instructions.md` - Hướng dẫn phát triển
- `backend/.env.example` - Biến môi trường mẫu
