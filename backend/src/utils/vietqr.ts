// VietQR Utility for generating payment QR codes
// Format: VietQR code for transfer with specific bank info

export interface VietQRPayload {
  bankBin: string
  accountNumber: string
  amount: number
  description: string
  accountName?: string
}

/**
 * Generate VietQR payment data
 * This creates the data structure for VietQR code generation
 * The actual QR code rendering is done on frontend using qrcode library
 */
export const generateVietQRPayload = (payload: VietQRPayload): string => {
  // VietQR format: https://api.vietqr.io/
  // This returns a string that can be used to fetch QR code from VietQR API
  
  const {
    bankBin = '970416', // SCB Bank BIN example
    accountNumber,
    amount,
    description,
    accountName = 'Cua hang Minh Tuoi'
  } = payload

  // URL encode the parameters
  const params = new URLSearchParams({
    accountNo: accountNumber,
    accountName: accountName,
    acqId: bankBin,
    amount: amount.toString(),
    addInfo: description
  })

  // Return VietQR API URL
  return `https://api.vietqr.io/image/${bankBin}/${accountNumber}/${amount}/${encodeURIComponent(description)}?accountName=${encodeURIComponent(accountName)}`
}

/**
 * Alternative: Generate QR code data for use with qrcode library
 * This format can be used with front-end QR code libraries
 */
export const generateQRCodeData = (payload: VietQRPayload): string => {
  const {
    bankBin = '970416',
    accountNumber,
    amount,
    description,
    accountName = 'Cua hang Minh Tuoi'
  } = payload

  // Format: bank-number-amount-description
  return `${bankBin}|${accountNumber}|${amount}|${description}`
}

/**
 * Generate order code for VietQR description
 */
export const generateOrderCode = (orderId: string): string => {
  return `MinhTuoi_${orderId}_${Date.now()}`
}
