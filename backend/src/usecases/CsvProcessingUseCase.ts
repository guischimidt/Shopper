interface CsvRow {
  product_code: string
  new_price: string
}

class CsvProcessingUseCase {
  processCsv (rows: CsvRow[]): void {
  }
}

export default new CsvProcessingUseCase()
