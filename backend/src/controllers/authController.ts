import { Request, Response } from 'express'
import { User } from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      phone,
      role: 'customer'
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id.toString(), user.role)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.role)

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId

    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const { name, phone } = req.body

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' })
  }
}
