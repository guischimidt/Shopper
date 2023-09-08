import ProductRepository from '../repositories/ProductRepository'
import PackRepository from '../repositories/PackRepository'
import { NotFoundError, ValidationError } from '../errors'

interface PriceUpdateRow {
  code: number
  new_price: number
}

class PriceUpdateUseCase {
  async updatePrices (data: PriceUpdateRow[]): Promise<{ message: string }> {
    for (const item of data) {
      if (!item.code || !item.new_price) {
        throw new ValidationError('Código ou preço não informados')
      } else if (isNaN(Number(item.new_price))) {
        throw new ValidationError('Preço precisa ser um número')
      }

      const product = await ProductRepository.findByCode(item.code)

      if (!product) {
        throw new NotFoundError('Produto não encontrado')
      } else {
        // Verifique se o produto é um pacote (pack)
        const productIsPack = await PackRepository.findByPackId(product.code)

        if (productIsPack.length === 1) {
          // Atualizar preço do componente
          const newIndividualPrice = item.new_price / productIsPack[0].qty

          const productPack = await ProductRepository.findByCode(productIsPack[0].product_id)

          productPack.sales_price = newIndividualPrice

          await ProductRepository.update(productPack)

          product.cost_price = productPack.cost_price * productIsPack[0].qty
        }

        const productInPack = await PackRepository.findProductInPack(product.code)

        if (productInPack.length > 0) {
          const productPack = await ProductRepository.findByCode(productInPack[0].pack_id)

          const priceDifference = (item.new_price - product.sales_price) * productInPack[0].qty
          productPack.sales_price = Number(productPack.sales_price) + priceDifference

          await ProductRepository.update(productPack)
        }

        product.sales_price = item.new_price
        console.log(product)
        await ProductRepository.update(product)
      }
    }

    return { message: 'Atualização em massa concluída com sucesso' }
  }
}

export default new PriceUpdateUseCase()
