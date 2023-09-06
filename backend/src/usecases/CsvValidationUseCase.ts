import ProductRepository from '../repositories/ProductRepository'

interface CsvRow {
  product_code: string
  new_price: string
}

class CsvValidationUseCase {
  async validateCsvRows (rows: CsvRow[]): Promise<string[]> {
    const errors: string[] = []

    // Validação dos campos obrigatórios
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (!row.product_code || !row.new_price) {
        errors.push(`Erro na linha ${i + 1}: Necessário preencher todos os dados.`)
      }
      // Validação do formato do new_price
      if (!/^\d+\.\d{2}$/.test(row.new_price)) {
        errors.push(`Erro na linha ${i + 1}: O novo preço deve ser númerico e estar no padrão correto`)
      }
    }

    // Validação se o código existe no BD
    const productCodes = Array.from(new Set(rows.map((row) => row.product_code)))

    try {
      const existingProducts = await ProductRepository.findByCodes(productCodes)

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const product = existingProducts.find((p) => p.code === Number(row.product_code))
        if (!product) {
          errors.push(`Erro na linha ${i + 1}: Código de produto não encontrado.`)
        }
      }
    } catch (error) {
      console.error('Erro ao buscar produtos no banco de dados:', error)
      errors.push('Erro ao buscar produtos no banco de dados.')
    }

    return errors
  }
}

export default new CsvValidationUseCase()
