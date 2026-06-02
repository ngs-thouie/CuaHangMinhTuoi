# 🧪 Testing Guide - Cửa Hàng Minh Tươi

## Prerequisites
- Node.js 16+ installed
- MongoDB running locally or accessible via connection string
- Two terminal windows (one for backend, one for frontend)

## 🚀 Quick Start

### Terminal 1: Backend
```bash
cd backend
npm install  # if not already done
npm run dev
```
✅ Should see: `Server running on http://localhost:5000`

### Terminal 2: Frontend
```bash
cd frontend
npm install  # if not already done
npm run dev
```
✅ Should see: `VITE v5.0.0 ready in XXX ms`

## 🧬 Test Flows

### 1️⃣ Basic Product Browsing (No Login Required)
1. Open http://localhost:5173
2. Click "Xem Menu" or navigate to `/menu`
3. Should see product list from database
4. Filter by "Đồ lẻ" (individual items) or "Mâm cỗ" (meal sets)
5. Click on product card to see details

**Expected:** Products display, filtering works

---

### 2️⃣ Shopping Cart Flow
1. From Menu page, click product card
2. Use quantity selector (+/-) to adjust quantity
3. Click "Thêm vào giỏ" button
4. Navigate to `/cart`
5. Should see cart items with quantity controls
6. Try removing item or clearing cart

**Expected:** Cart updates correctly, persists on page reload

---

### 3️⃣ Customer Registration & Login
1. Navigate to `/register`
2. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `0901234567`
   - Password: `123456`
   - Confirm: `123456`
3. Click "Đăng Ký"
4. Should redirect to `/login`
5. Login with email and password

**Expected:** User account created, JWT token saved to localStorage

---

### 4️⃣ Checkout Flow
1. Add products to cart (see flow #2)
2. Click "Thanh Toán" button
3. On `/checkout` page, fill form:
   - Name: `Tester`
   - Phone: `0901234567`
   - Email: `test@example.com`
   - Address: `123 Nguyen Hue, HCMC`
   - Delivery Date: Any future date
   - Delivery Time: `12:00`
   - Notes: (optional)
4. Click "Tạo Đơn Hàng"

**Expected:** 
- Order created with unique order code (e.g., `MinhTuoi_507f1f77bcf86cd799439011_1704321600`)
- Redirected to `/payment/:orderId`
- Order summary displayed

---

### 5️⃣ Payment with VietQR
1. From checkout, order page should show
2. Step 1: "Quét Mã QR"
   - QR code image should display
   - Bank details shown: SCB, 0123456789, amount, etc.
3. Click "Tôi đã thanh toán, tiếp tục →"
4. Step 2: "Xác Nhận Thanh Toán"
   - Choose image file (any image works for demo)
   - Click "Xác Nhận Thanh Toán"
   - Wait for upload

**Expected:**
- Success message: "Thanh toán thành công..."
- Redirected to home page
- Order status in database changes to "completed"

---

### 6️⃣ Admin Dashboard
1. Create admin account in MongoDB:
```javascript
db.users.insertOne({
  email: "admin@minhttuoi.com",
  password: <bcrypt_hash>, // Can login with "123456" if using pre-hashed
  name: "Admin",
  role: "admin",
  phone: "0123456789"
})
```

2. Login as admin
3. Navigate to `/admin`
4. Should see orders table with:
   - Order code
   - Customer name
   - Phone
   - Delivery date
   - Total amount
   - Status dropdown

5. Test status update:
   - Change any order from "pending" → "confirmed"
   - Should see success message

**Expected:** Admin can view and update order statuses

---

## 📊 API Testing (Optional - Using Postman/Insomnia)

### Create Product (Admin)
```
POST http://localhost:5000/api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Test Product",
  "description": "A delicious test product",
  "price": 25000,
  "category": "individual",
  "occasion": "daily",
  "image": "https://via.placeholder.com/300",
  "available": true
}
```

### Create Order
```
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "<product_id>",
      "product": {...},
      "quantity": 2,
      "price": 25000
    }
  ],
  "totalAmount": 50000,
  "customerName": "Test",
  "customerPhone": "0901234567",
  "customerEmail": "test@example.com",
  "deliveryDate": "2024-12-25",
  "deliveryTime": "12:00",
  "deliveryAddress": "123 Street",
  "notes": "No onions"
}
```

### Get Order with VietQR
```
GET http://localhost:5000/api/orders/<order_id>
```

Response includes `vietqrPayload` URL for QR code generation.

---

## 🐛 Debugging Tips

### Check Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Network tab shows API requests/responses

### Check Backend Logs
- Terminal should show Express logs
- Look for errors in request handling
- Verify MongoDB connection

### Common Issues

| Issue | Solution |
|-------|----------|
| CORS Error | Ensure backend CORS_ORIGIN matches frontend URL |
| 404 on API | Check route spelling, ensure backend running |
| Token expired | Clear localStorage, login again |
| MongoDB connection | Verify MongoDB service running, check connection string |
| Product not showing | Create sample products via API POST |

---

## ✅ Test Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Products display on menu page
- [ ] Add to cart works
- [ ] Cart persists on page reload
- [ ] User registration successful
- [ ] User login successful
- [ ] Checkout creates order
- [ ] Payment page displays VietQR
- [ ] Receipt upload works
- [ ] Admin can view orders
- [ ] Admin can update order status
- [ ] All pages responsive on mobile (F12 → Toggle device toolbar)

---

## 📝 Sample Test Data

### Product Example
```javascript
{
  name: "Cơm Chay Lương Thực",
  description: "Cơm dẻo kèm rau xào và canh",
  price: 35000,
  category: "individual",
  occasion: "daily",
  servings: 1,
  components: ["Gạo", "Rau xào", "Canh"],
  nutrition: {
    calories: 350,
    protein: 8,
    carbs: 45,
    fat: 12
  }
}
```

---

## 🎯 Next Steps (If Needed)

- [ ] Set up production MongoDB Atlas account
- [ ] Deploy backend to Heroku/Railway/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Setup real VietQR merchant account
- [ ] Integrate Zalo notifications
- [ ] Add email confirmation for orders
- [ ] Implement real image upload (AWS S3/Cloudinary)
- [ ] Add inventory management
- [ ] Setup order notifications for customers

---

Need help? Check the console errors and let me know! 🚀
