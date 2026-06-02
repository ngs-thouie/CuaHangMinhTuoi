import { Request, Response } from 'express'
import { Product } from '../models/Product.js'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, occasion, priceMin, priceMax, search } = req.query

    let filter: any = { available: true }

    if (category) {
      filter.category = category
    }

    if (occasion) {
      filter.occasion = occasion
    }

    if (priceMin || priceMax) {
      filter.price = {}
      if (priceMin) filter.price.$gte = Number(priceMin)
      if (priceMax) filter.price.$lte = Number(priceMax)
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
}

export const getAllProductsAdmin = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}
