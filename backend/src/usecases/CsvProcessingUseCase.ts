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
      if (!row.product_code || !row.new_price) {
        errors.push('Código ou preço não informados')
      } else if (isNaN(Number(row.new_price))) {
        errors.push('Preço precisa ser um número')
      } else if (!product) {
        errors.push('Produto não encontrado')
      } else {
        if (Number(row.new_price) < Number(product.cost_price)) {
          errors.push('Novo preço menor que o custo')
        }
        const percentageThreshold = 0.1
        const priceDifference = Math.abs(Number(row.new_price) - Number(product.sales_price))

        if (Number(priceDifference) / Number(product.sales_price) > percentageThreshold) {
          errors.push('Reajuste maior que 10%')
        }
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
