interface CsvRow {
  product_code: string
  new_price: string
}

class CsvValidationUseCase {
  validateCsvRows (rows: CsvRow[]): string[] {
    const errors: string[] = []

    rows.forEach((row, index) => {
      if (!row.product_code || !row.new_price) {
        errors.push(`Erro na linha ${index + 1}: Necessário preencher todos os dados.`)
      }
    })

    return errors
  }
}

export default new CsvValidationUseCase()
