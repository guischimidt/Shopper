import ProductRepository from '../repositories/ProductRepository'

interface CsvRow {
  product_code: string
  new_price: string
}

interface ProcessedData {
  code: string | number
  name: string
  sales_price: number
  new_price: string
}

class CsvProcessingUseCase {
  async processCsv (rows: CsvRow[]): Promise<ProcessedData[]> {
    const productCodes = rows.map((row) => row.product_code)
    const products = await ProductRepository.findByCodes(productCodes)

    const processedData = rows.map((row) => {
      const product = products.find((p) => p.code === Number(row.product_code))

      return {
        code: product ? product.code : row.product_code,
        name: product ? product.name : 'Produto não encontrado',
        sales_price: product ? product.sales_price : 0,
        new_price: row.new_price
      }
    })

    return processedData
  }
}

export default new CsvProcessingUseCase()
