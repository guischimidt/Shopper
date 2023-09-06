import ProductRepository from '../repositories/ProductRepository'
import PackRepository from '../repositories/PackRepository'

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
          // Verifique se o produto é um pacote (pack)
          const productIsPack = await PackRepository.findByPackId(product.code)

          if (productIsPack.length === 1) {
            const newIndividualPrice = item.new_price / productIsPack[0].qty

            const productPack = await ProductRepository.findByCode(productIsPack[0].product_id)

            productPack.sales_price = newIndividualPrice

            await ProductRepository.update(productPack)
          }

          const productInPack = await PackRepository.findProductInPack(product.code)

          if (productInPack) {
            const productPack = await ProductRepository.findByCode(productInPack[0].pack_id)

            const priceDifference = (item.new_price - product.sales_price) * productInPack[0].qty
            productPack.sales_price = Number(productPack.sales_price) + priceDifference

            await ProductRepository.update(productPack)
          }

          // Atualize o preço do próprio pacote
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
