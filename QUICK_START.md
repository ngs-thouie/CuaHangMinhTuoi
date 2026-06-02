# 🚀 Dự Án Cửa Hàng Minh Tươi - Hướng Dẫn Chạy Nhanh

## ✅ Những gì đã hoàn thành

### Backend (100% ✓)
- ✅ Models: Product, Order, User
- ✅ Controllers: auth, product, order
- ✅ Routes: /api/auth, /api/products, /api/orders
- ✅ Middleware: authentication, authorization
- ✅ VietQR utils
- ✅ Hoàn toàn TypeScript

### Frontend (100% ✓)
- ✅ Pages: Home, Menu, Cart, Checkout, Payment, Login, Register, Admin Dashboard
- ✅ Components: Header, ProductCard
- ✅ Services: API services (auth, products, orders)
- ✅ Context: CartContext (quản lý giỏ hàng)
- ✅ Hooks: useAuth, useProducts, useOrders
- ✅ React Router: Toàn bộ navigation
- ✅ TailwindCSS: Design responsive đầy đủ

## 🎯 Chạy Dự Án

### Bước 1: Install Dependencies (nếu chưa có)

```bash
# Frontend
cd frontend
npm install

# Backend (trong terminal khác)
cd backend
npm install
```

### Bước 2: Chạy Backend

```bash
cd backend
npm run dev
```

Server sẽ chạy tại: **http://localhost:5000**

### Bước 3: Chạy Frontend (trong terminal mới)

```bash
cd frontend
npm run dev
```

App sẽ chạy tại: **http://localhost:5173**

## 📝 Các Trang & Chức Năng

| Trang | URL | Chức Năng |
|-------|-----|---------|
| Trang Chủ | `/` | Giới thiệu + CTA |
| Thực Đơn | `/menu` | Danh sách sản phẩm, lọc theo loại |
| Giỏ Hàng | `/cart` | Xem/cập nhật/xóa sản phẩm |
| Thanh Toán | `/checkout` | Nhập thông tin khách hàng + ngày giao |
| Thanh Toán VietQR | `/payment/:id` | QR code + upload chứng thư |
| Đăng Nhập | `/login` | Login account |
| Đăng Ký | `/register` | Tạo account |
| Admin | `/admin` | Quản lý đơn hàng |

## 🔐 Test Account

### Admin Account (tạo thủ công trong MongoDB)
```javascript
{
  email: "admin@minhttuoi.com",
  password: "123456",
  name: "Admin",
  role: "admin"
}
```

### Customer Account (đăng ký từ register page)
- Tạo tài khoản qua `/register`

## 📊 API Endpoints

### Auth
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user
- `PUT /api/auth/profile` - Cập nhật profile

### Products
- `GET /api/products` - Danh sách sản phẩm
- `GET /api/products?category=individual` - Lọc theo loại
- `GET /api/products/:id` - Chi tiết sản phẩm

### Orders
- `POST /api/orders` - Tạo đơn hàng (có VietQR)
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `GET /api/orders/code/:orderCode` - Tìm theo mã
- `PUT /api/orders/:id/status` - Cập nhật trạng thái (Admin)
- `PUT /api/orders/:id/payment` - Xác nhận thanh toán (Admin)

## 🧪 Test VietQR Payment

### Cách thanh toán demo:
1. Chọn sản phẩm → Thêm vào giỏ
2. Checkout → Nhập thông tin
3. Trang thanh toán → Quét QR hoặc nhập thông tin ngân hàng
   - **Ngân hàng**: SCB (Sacombank)
   - **TK**: 0123456789
   - **Tên TK**: Cua hang Minh Tuoi
   - **Số tiền**: (tự động tính)
4. Upload ảnh chứng thư (có thể upload ảnh bất kỳ để demo)

## 🛠️ Troubleshooting

### "Cannot find module"
```bash
cd backend
npm install

cd frontend
npm install
```

### MongoDB Connection Error
```bash
# Kiểm tra MongoDB đang chạy
# Windows: có thể start từ Services hoặc chạy mongod.exe
# hoặc update MONGODB_URI trong .env sang MongoDB Cloud
```

### Port đã được sử dụng
```bash
# Kill process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 📁 Cấu Trúc Thư Mục

```
CuaHangMinhTuoi/
├── frontend/
│   ├── src/
│   │   ├── pages/          # 8 pages
│   │   ├── components/     # Header, ProductCard
│   │   ├── services/       # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # CartContext
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Routes
│   └── ...
├── backend/
│   ├── src/
│   │   ├── controllers/    # Auth, Product, Order
│   │   ├── models/        # Schemas
│   │   ├── routes/        # Endpoints
│   │   ├── middleware/    # Auth middleware
│   │   └── index.ts       # Server
│   └── ...
├── .github/
│   └── copilot-instructions.md
└── README.md & SETUP_GUIDE.md
```

## ✨ Features Đã Có

✅ Full-stack React + Express + MongoDB  
✅ Product catalog với category (đồ lẻ vs mâm cỗ)  
✅ Shopping cart với state management  
✅ Checkout với thông tin khách hàng + ngày giao  
✅ VietQR payment integration (demo)  
✅ Authentication & Authorization (JWT)  
✅ Admin dashboard để quản lý đơn hàng  
✅ Receipt image upload cho thanh toán  
✅ Responsive design với TailwindCSS  
✅ Comprehensive error handling  
✅ TypeScript type-safe  

## 🎉 Bạn đã sẵn sàng!

App đã hoàn chỉnh 100%, bạn có thể:
1. Chạy `npm run dev:all` từ root để test toàn bộ
2. Tạo sản phẩm test trong MongoDB
3. Tạo admin account để quản lý
4. Test toàn bộ flow từ mua hàng → thanh toán

---

**Cần thêm tính năng gì khác không? Tôi sẵn sàng mở rộng!** 🚀
