import { type Buffer } from 'buffer'
import csvParser from 'csv-parser'
import { Readable } from 'stream'

class CsvParserService {
  async parseCsv (buffer: Buffer): Promise<any[]> {
    return await new Promise((resolve, reject) => {
      const csvData: any[] = []
      const stream = Readable.from([buffer])

      stream
        .pipe(csvParser())
        .on('data', (data) => {
          csvData.push(data)
        })
        .on('end', () => {
          resolve(csvData)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }
}

export default new CsvParserService()
