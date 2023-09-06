// src/repositories/ProductRepository.ts
import { type Model } from 'sequelize'
import Product from '../models/ProductModel'

class ProductRepository {
  async findByCode (code: number): Promise<Model | null> {
    const product = await Product.findOne({
      where: {
        code
      }
    })
    return product
  }

  async updateByCode (code: number, productData: {
    name: string
    cost_price: number
    sales_price: number
  }): Promise<[number, Model[]]> {
    const [rowsUpdated, [updatedProduct]] = await Product.update(productData, {
      where: {
        code
      },
      returning: true
    })
    return [rowsUpdated, [updatedProduct]]
  }

  async findAll (): Promise<Model[]> {
    const products = await Product.findAll()
    return products
  }
}

export default new ProductRepository()
