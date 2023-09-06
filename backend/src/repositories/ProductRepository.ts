import { Op } from 'sequelize'
import Product from '../models/ProductModel'

class ProductRepository {
  async findAll (): Promise<Product[]> {
    try {
      const products = await Product.findAll()
      return products
    } catch (error) {
      throw new Error(`Erro ao buscar todos os produtos: ${error.message}`)
    }
  }

  async updateByCode (code: number, productData: {
    name: string
    cost_price: number
    sales_price: number
  }): Promise<[number, Product[]]> {
    try {
      const [rowsUpdated, [updatedProduct]] = await Product.update(productData, {
        where: {
          code
        },
        returning: true
      })

      return [rowsUpdated, [updatedProduct]]
    } catch (error) {
      throw new Error(`Erro ao atualizar produto por código: ${error.message}`)
    }
  }

  async findByCode (code: number): Promise<Product | null> {
    try {
      const product = await Product.findOne({
        where: {
          code
        }
      })

      return product
    } catch (error) {
      throw new Error(`Erro ao buscar produto por código: ${error.message}`)
    }
  }

  async findByCodes (codes: string[]): Promise<Product[]> {
    try {
      const products = await Product.findAll({
        where: {
          code: {
            [Op.in]: codes.map((code) => Number(code))
          }
        }
      })

      return products
    } catch (error) {
      throw new Error(`Erro ao buscar produtos por códigos: ${error.message}`)
    }
  }
}

export default new ProductRepository()
