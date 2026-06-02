import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here'

export const generateToken = (userId: string, role: string, expiresIn: string | number = '7d') => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn } as any)
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
