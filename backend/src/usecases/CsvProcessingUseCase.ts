interface CsvRow {
  product_code: string
  new_price: string
}

class CsvProcessingUseCase {
  processCsv (rows: CsvRow[]): CsvRow[] {
    return rows
  }
}

export default new CsvProcessingUseCase()
