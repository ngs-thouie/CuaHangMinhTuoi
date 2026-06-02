# 📡 API Documentation - Cửa Hàng Minh Tươi

**Base URL:** `http://localhost:5000/api`

---

## 🔐 Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0901234567",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "customer",
    "phone": "0901234567"
  }
}
```

---

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

---

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "customer",
  "phone": "0901234567"
}
```

---

### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "0909876543"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "name": "Jane Doe",
  "phone": "0909876543",
  "role": "customer"
}
```

---

## 🛍️ Products

### List All Products
```http
GET /products
```

**Query Parameters:**
- `category`: `individual` | `meal-set` (optional)
- `occasion`: `prayer-day` | `tet` | `family` | `daily` (optional)
- `priceMin`: number (optional)
- `priceMax`: number (optional)
- `search`: string (optional, searches name/description)

**Example:**
```http
GET /products?category=individual&occasion=daily&priceMin=20000&priceMax=50000
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Cơm Chay Lương Thực",
    "description": "Cơm dẻo kèm rau xào",
    "price": 35000,
    "category": "individual",
    "occasion": "daily",
    "servings": 1,
    "nutrition": {
      "calories": 350,
      "protein": 8,
      "carbs": 45,
      "fat": 12
    },
    "image": "https://...",
    "available": true,
    "createdAt": "2024-01-01T10:00:00Z"
  }
]
```

---

### Get Product by ID
```http
GET /products/:id
```

**Response (200):** Same as single product object above

---

### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 25000,
  "category": "individual",
  "occasion": "daily",
  "servings": 1,
  "components": ["Ingredient 1", "Ingredient 2"],
  "nutrition": {
    "calories": 250,
    "protein": 6,
    "carbs": 40,
    "fat": 8
  },
  "image": "https://via.placeholder.com/300",
  "available": true
}
```

**Response (201):**
```json
{
  "_id": "new_id",
  "name": "New Product",
  ...
}
```

---

### Update Product (Admin Only)
```http
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 30000,
  "available": false
}
```

**Response (200):** Updated product object

---

### Delete Product (Admin Only)
```http
DELETE /products/:id
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 🛒 Orders

### Create Order
```http
POST /orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 35000
    }
  ],
  "totalAmount": 70000,
  "customerName": "Nguyen Van A",
  "customerPhone": "0901234567",
  "customerEmail": "customer@example.com",
  "deliveryDate": "2024-12-25",
  "deliveryTime": "12:00",
  "deliveryAddress": "123 Nguyen Hue, HCMC",
  "notes": "No onions please"
}
```

**Response (201):**
```json
{
  "order": {
    "_id": "507f2f77bcf86cd799439012",
    "orderCode": "MinhTuoi_507f2f77bcf86cd799439012_1704321600",
    "items": [...],
    "totalAmount": 70000,
    "customerName": "Nguyen Van A",
    "customerPhone": "0901234567",
    "deliveryDate": "2024-12-25T00:00:00Z",
    "deliveryTime": "12:00",
    "deliveryAddress": "123 Nguyen Hue, HCMC",
    "paymentStatus": "pending",
    "status": "pending",
    "createdAt": "2024-01-01T10:00:00Z"
  },
  "vietqrPayload": "https://api.vietqr.io/image/970416/0123456789/70000/Thanh%20toan%20don%20hang%20MinhTuoi_507f2f77bcf86cd799439012_1704321600?accountName=Cua%20hang%20Minh%20Tuoi"
}
```

---

### Get Order by ID
```http
GET /orders/:id
```

**Response (200):**
```json
{
  "order": {
    "_id": "507f2f77bcf86cd799439012",
    "orderCode": "MinhTuoi_507f2f77bcf86cd799439012_1704321600",
    ...
  },
  "vietqrPayload": "https://api.vietqr.io/..."
}
```

---

### Get Order by Code
```http
GET /orders/code/:orderCode
```

**Example:**
```http
GET /orders/code/MinhTuoi_507f2f77bcf86cd799439012_1704321600
```

**Response (200):** Same as Get Order by ID

---

### Update Order Status (Admin Only)
```http
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending` - Chờ xác nhận
- `confirmed` - Đã xác nhận
- `preparing` - Đang chuẩn bị
- `ready` - Sẵn sàng giao
- `completed` - Hoàn thành
- `cancelled` - Hủy

**Response (200):**
```json
{
  "message": "Order status updated",
  "order": {
    "_id": "507f2f77bcf86cd799439012",
    "status": "confirmed",
    ...
  }
}
```

---

### Update Payment Status (Admin Only)
```http
PUT /orders/:id/payment
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "paymentStatus": "completed",
  "receiptImage": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

**Valid Payment Status:**
- `pending` - Chưa thanh toán
- `completed` - Đã thanh toán
- `failed` - Thanh toán thất bại

**Response (200):**
```json
{
  "message": "Payment status updated",
  "order": {
    "_id": "507f2f77bcf86cd799439012",
    "paymentStatus": "completed",
    "receiptImage": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    ...
  }
}
```

---

### Get All Orders (Admin Only)
```http
GET /orders
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status`: Filter by status (optional)
- `paymentStatus`: Filter by payment status (optional)
- `dateFrom`: ISO date string (optional)
- `dateTo`: ISO date string (optional)

**Example:**
```http
GET /orders?status=pending&paymentStatus=pending
```

**Response (200):**
```json
[
  {
    "_id": "507f2f77bcf86cd799439012",
    "orderCode": "MinhTuoi_507f2f77bcf86cd799439012_1704321600",
    "totalAmount": 70000,
    "customerName": "Nguyen Van A",
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-01T10:00:00Z"
  }
]
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Order not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 🔒 Authentication Headers

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

Token is obtained from `/auth/register` or `/auth/login` response.

Store in frontend localStorage:
```javascript
localStorage.setItem('token', response.data.token)
```

Axios interceptor automatically adds this header:
```javascript
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## 📊 Database Models

### User
- `_id`: ObjectId
- `email`: String (unique)
- `password`: String (hashed with bcrypt)
- `name`: String
- `phone`: String
- `role`: 'admin' | 'customer' (default: 'customer')
- `createdAt`: Date
- `updatedAt`: Date

### Product
- `_id`: ObjectId
- `name`: String
- `description`: String
- `price`: Number
- `category`: 'individual' | 'meal-set'
- `occasion`: String (optional)
- `servings`: Number (optional)
- `components`: [String]
- `nutrition`: { calories, protein, carbs, fat }
- `image`: String (URL)
- `available`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Order
- `_id`: ObjectId
- `orderCode`: String (unique)
- `items`: [{ productId, product, quantity, price }]
- `totalAmount`: Number
- `customerName`: String
- `customerPhone`: String
- `customerEmail`: String
- `deliveryDate`: Date
- `deliveryTime`: String
- `deliveryAddress`: String
- `paymentStatus`: 'pending' | 'completed' | 'failed'
- `paymentMethod`: 'vietqr' | 'bank-transfer' | 'cash'
- `receiptImage`: String (base64 or URL)
- `notes`: String
- `status`: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
- `createdAt`: Date
- `updatedAt`: Date

---

## 🧪 Example cURL Commands

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0901234567",
    "password": "123456"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products?category=individual&price Max=50000
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 35000
    }],
    "totalAmount": 70000,
    "customerName": "Test",
    "customerPhone": "0901234567",
    "customerEmail": "test@example.com",
    "deliveryDate": "2024-12-25",
    "deliveryTime": "12:00",
    "deliveryAddress": "123 Street"
  }'
```

---

Generated at: 2024-01-01 | API Version 1.0
