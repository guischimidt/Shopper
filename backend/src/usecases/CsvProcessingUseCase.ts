import ProductRepository from '../repositories/ProductRepository'

interface CsvRow {
  product_code: string
  new_price: number
}

interface ProcessedData {
  code: string | number
  name: string
  sales_price: number
  new_price: number
  errors: string[]
}

class CsvProcessingUseCase {
  async processCsv (rows: CsvRow[]): Promise<ProcessedData[]> {
    const productCodes = rows.map((row) => row.product_code)
    const products = await ProductRepository.findByCodes(productCodes)

    const processedData = rows.map((row) => {
      const errors: string[] = []
      const product = products.find((p) => p.code === Number(row.product_code))
      const percentageThreshold = 0.1
      const priceDifference = Math.abs(row.new_price - product.sales_price)

      if (!row.product_code || !row.new_price) {
        errors.push('Código ou preço não informados')
      } else if (isNaN(Number(row.new_price))) {
        errors.push('Preço precisa ser um número')
      } else if (!product) {
        errors.push('Produto não encontrado')
      } else if (row.new_price < product.cost_price) {
        errors.push('O novo preço não pode ser menor que o preço de custo')
      } else if (priceDifference / product.sales_price > percentageThreshold) {
        errors.push('O novo preço deve ser no máximo 10% maior ou menor que o preço de venda atual')
      }

      return {
        code: product ? product.code : row.product_code,
        name: product ? product.name : 'Produto não encontrado',
        sales_price: product ? product.sales_price : 0,
        new_price: row.new_price,
        errors
      }
    })

    return processedData
  }
}

export default new CsvProcessingUseCase()
