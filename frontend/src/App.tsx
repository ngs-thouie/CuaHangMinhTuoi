import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { ChatWidget } from './components/ChatWidget'
import { AdminChatManager } from './components/AdminChatManager'

// Pages
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { PaymentPage } from './pages/PaymentPage'
import { OrderSuccessPage } from './pages/OrderSuccessPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AdminPage } from './pages/AdminPage'
import { EventsPage } from './pages/EventsPage'
import { ContactPage } from './pages/ContactPage'
import { ProfilePage } from './pages/ProfilePage'
import { MyOrdersPage } from './pages/MyOrdersPage'

import './App.css'

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
            <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <ChatWidget />
          <AdminChatManager />
        </Router>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
