# Cửa hàng Minh Tươi - Vegetarian Restaurant Ordering System

A full-stack web application for managing vegetarian restaurant orders, featuring product catalog, shopping cart, online booking, and admin dashboard.

## Features

### Customer Features
- 🛒 **Product Catalog**: Browse individual items and meal sets
- 🔍 **Search & Filter**: Find products by category, price, and occasion
- 📦 **Shopping Cart**: Add/remove items from cart
- 📅 **Order Booking**: Select delivery date and time
- 💳 **Payment**: VietQR integrated payment with auto-generated QR codes
- 📱 **Receipt Upload**: Confirm payment by uploading transaction receipt
- 🔔 **Notifications**: Event banners and updates

### Admin Features
- 📊 **Dashboard**: Overview of orders and statistics
- 📋 **Order Management**: Track and manage orders by date
- 📝 **Content Management**: Update menu, events, and banners
- 👥 **User Management**: Manage admin accounts

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Demo**: VietQR (auto-generated QR codes)

## Project Structure

```
CuaHangMinhTuoi/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                   # Express API server
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Helper functions
│   │   └── index.ts         # Entry point
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── .github/
│   └── copilot-instructions.md
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or cloud)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install

# Create .env file from .env.example
cp .env.example .env

# Edit .env with your MongoDB URI and configuration
npm run dev
```

Backend will be available at `http://localhost:5000`

## Development Commands

### Run both frontend and backend
```bash
# From root directory (if npm script is configured)
npm run dev:all
```

### Frontend only
```bash
cd frontend && npm run dev
```

### Backend only
```bash
cd backend && npm run dev
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products?category=individual` - Filter by category
- `GET /api/products?type=meal-set` - Filter meal sets

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

## Key Features Implementation

### 1. Product Catalog
- Separate categories for individual items and meal sets
- Filters by price, occasion, and availability
- Product details with images and nutrition info

### 2. Shopping Cart & Booking
- Cart persistence
- Date/time selection for delivery (mandatory for meal sets)
- Order summary before payment

### 3. VietQR Payment Demo
- Auto-generated QR codes with amount and content
- Receipt image upload for confirmation
- Payment tracking

### 4. Admin Dashboard
- Daily order overview
- Order status management
- Content/menu updates
- Event banner management

### 5. Notifications
- Event banners (Rằm, Tết, etc.)
- Zalo OA integration (placeholder)
- Email notifications (to be integrated)

## Environment Variables

Create `.env` file in backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cuahangminhttuoi
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Database Models

### Product
- name, description, price
- category (individual/meal-set)
- occasion, servings
- components, nutrition info
- image, availability

### Order
- orderCode, items, totalAmount
- customer info (name, phone, email)
- delivery date/time/address
- payment status and method
- receipt image upload
- order status tracking

### User
- email, password, name
- role (admin/customer)
- phone number

## Future Enhancements

- [ ] Email notifications
- [ ] Zalo OA integration
- [ ] Payment gateway integration
- [ ] User reviews and ratings
- [ ] Inventory management
- [ ] Delivery tracking
- [ ] Monthly reports

## License

This project is proprietary to Cửa hàng Minh Tươi.

## Support

For support, contact: [contact info]
