import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useOrders } from '../hooks/useOrders'

export const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { getOrder, updatePaymentStatus } = useOrders()
  const [order, setOrder] = useState<any>(null)
  const [step, setStep] = useState<'qr' | 'upload'>('qr')
  const [receiptImage, setReceiptImage] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [qrCode, setQrCode] = useState<string>('')

  useEffect(() => {
    if (!orderId) return

    const fetchOrder = async () => {
      try {
        const result = await getOrder(orderId)
        setOrder(result.order)
        
        // Generate VietQR code from the payload
        const qrUrl = result.vietqrPayload
        setQrCode(qrUrl)
      } catch (err) {
        console.error('Error fetching order:', err)
      }
    }

    fetchOrder()
  }, [orderId, getOrder])

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setReceiptImage(e.target.files[0])
    }
  }

  const handleConfirmPayment = async () => {
    if (!receiptImage) {
      alert('Vui lòng chọn ảnh chứng thư')
      return
    }

    setUploading(true)
    try {
      // Convert image to base64 for demo (in production, upload to cloud storage)
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64 = reader.result as string
        
        if (!orderId) return
        
        await updatePaymentStatus(orderId, 'completed', base64)
        alert('Thanh toán thành công! Chúng tôi sẽ xác nhận đơn hàng của bạn trong 24h')
        navigate('/')
      }
      reader.readAsDataURL(receiptImage)
    } catch (err) {
      console.error('Error confirming payment:', err)
    } finally {
      setUploading(false)
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <p className="font-sans text-charcoal/50">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-12">
          Thanh Toán Qua VietQR
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Payment Steps */}
          <div className="lg:col-span-2">
            {step === 'qr' && (
              <div className="bg-white p-8 lg:p-10">
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Bước 1: Quét Mã QR
                </h2>

                <div className="text-center mb-8">
                  <p className="font-sans text-sm text-charcoal/50 mb-8">
                    Hãy quét mã QR bên dưới bằng app ngân hàng hoặc ứng dụng hỗ trợ VietQR
                  </p>

                  <div className="bg-cream p-8 inline-block mb-8">
                    {qrCode ? (
                      <img src={qrCode} alt="VietQR Code" className="w-64 h-64" />
                    ) : (
                      <div className="w-64 h-64 flex items-center justify-center text-charcoal/30 font-sans text-sm">
                        Đang tạo mã QR...
                      </div>
                    )}
                  </div>

                  <div className="bg-cream border border-sand p-6 text-left mb-8">
                    <h3 className="font-sans text-sm font-medium text-charcoal mb-4">
                      Thông tin chuyển khoản:
                    </h3>
                    <div className="space-y-2 font-sans text-sm">
                      <p className="text-charcoal/60">
                        <span className="text-charcoal/40">Ngân hàng:</span>{' '}
                        <span className="text-charcoal">SCB (Sacombank)</span>
                      </p>
                      <p className="text-charcoal/60">
                        <span className="text-charcoal/40">Tài khoản:</span>{' '}
                        <span className="text-charcoal">0123456789</span>
                      </p>
                      <p className="text-charcoal/60">
                        <span className="text-charcoal/40">Tên TK:</span>{' '}
                        <span className="text-charcoal">Cua hang Minh Tuoi</span>
                      </p>
                      <p className="text-charcoal/60">
                        <span className="text-charcoal/40">Số tiền:</span>{' '}
                        <span className="text-primary font-medium">{order.totalAmount.toLocaleString()}đ</span>
                      </p>
                      <p className="text-charcoal/60">
                        <span className="text-charcoal/40">Nội dung:</span>{' '}
                        <span className="text-charcoal">Thanh toan don hang {order.orderCode}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('upload')}
                  className="w-full bg-primary text-white py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300"
                >
                  Tôi đã thanh toán, tiếp tục →
                </button>
              </div>
            )}

            {step === 'upload' && (
              <div className="bg-white p-8 lg:p-10">
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Bước 2: Xác Nhận Thanh Toán
                </h2>

                <div className="mb-8">
                  <p className="font-sans text-sm text-charcoal/50 mb-6">
                    Vui lòng tải lên ảnh chứng thư chuyển khoản để xác nhận thanh toán
                  </p>

                  <div className="border-2 border-dashed border-sand p-10 text-center">
                    {receiptImage ? (
                      <div>
                        <img
                          src={URL.createObjectURL(receiptImage)}
                          alt="Receipt preview"
                          className="max-w-xs mx-auto max-h-40 mb-4"
                        />
                        <p className="font-sans text-sm text-charcoal/50 mb-4">{receiptImage.name}</p>
                        <label className="inline-block cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleReceiptUpload}
                            className="hidden"
                          />
                          <span className="font-sans text-sm text-primary hover:text-primary-dark transition-colors">
                            Chọn ảnh khác
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-12 h-12 mx-auto text-charcoal/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="font-sans text-sm text-charcoal/50 mb-4">
                          Nhấn để chọn ảnh chứng thư
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleReceiptUpload}
                            className="hidden"
                          />
                          <span className="inline-block bg-primary text-white px-6 py-2.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors">
                            Chọn Ảnh
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('qr')}
                    className="flex-1 border border-sand text-charcoal/60 py-3.5 font-sans text-sm font-medium tracking-wide hover:border-charcoal/30 transition-colors"
                  >
                    ← Quay Lại
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    disabled={!receiptImage || uploading}
                    className="flex-1 bg-primary text-white py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
                  >
                    {uploading ? 'Đang xử lý...' : 'Xác Nhận Thanh Toán'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-8 sticky top-24">
              <h2 className="font-serif text-xl text-charcoal mb-6">
                Tóm Tắt Đơn Hàng
              </h2>

              <div className="mb-6 pb-6 border-b border-sand">
                <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mb-1">
                  Mã đơn hàng
                </p>
                <p className="font-sans text-lg font-medium text-primary">
                  {order.orderCode}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {order.items.map((item: any) => (
                  <div key={item.productId} className="flex justify-between font-sans text-sm">
                    <span className="text-charcoal/60">
                      {item.product?.name || 'Sản phẩm'} x{item.quantity}
                    </span>
                    <span className="text-charcoal">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand pt-4">
                <div className="flex justify-between font-sans text-sm font-medium text-primary">
                  <span>Tổng:</span>
                  <span>{order.totalAmount.toLocaleString()}đ</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sand">
                <p className="font-sans text-xs text-charcoal/40 text-center">
                  Đơn hàng sẽ được xác nhận khi thanh toán thành công
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
