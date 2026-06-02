# Cửa hàng Minh Tươi - Development Guidelines

## Project Overview
Full-stack vegetarian restaurant ordering system with:
- Product catalog (individual items & meal sets)
- Shopping cart & order booking
- VietQR payment demo
- Admin dashboard for order/content management
- Event notifications & Zalo integration

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Auth**: JWT

## Project Structure
```
frontend/          → React app (port 5173)
backend/           → Express API (port 5000)
.github/           → Configs
```

## Key Features
1. Product catalog with categories (individual items vs meal sets)
2. Search & filter by type, price, occasion
3. Shopping cart with order booking (date/time required for meal sets)
4. VietQR auto-generated QR codes for payment
5. Upload receipt image confirmation
6. Admin dashboard (order management, content management)
7. Event banners & notifications

## Development Commands
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run dev

# Both (from root)
npm run dev:all
```
