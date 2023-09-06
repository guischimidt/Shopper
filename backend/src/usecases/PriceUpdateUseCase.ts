import ProductRepository from '../repositories/ProductRepository'

interface PriceUpdateRow {
  product_code: number
  new_price: number
}

class PriceUpdateUseCase {
  async updatePrices (data: PriceUpdateRow[]): Promise<{ message: string }> {
    try {
      for (const item of data) {
        const product = await ProductRepository.findByCode(item.product_code)

        if (product) {
          product.sales_price = item.new_price
          await ProductRepository.update(product)
        }
      }

      return { message: 'Atualização em massa concluída com sucesso' }
    } catch (error) {
      console.error('Erro ao atualizar preços em massa:', error)
      throw new Error('Erro ao atualizar preços em massa.')
    }
  }
}

export default new PriceUpdateUseCase()
