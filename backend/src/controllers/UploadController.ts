import { type Request, type Response } from 'express'
import CsvParserService from '../services/CsvParserService'
import CsvValidationUseCase from '../usecases/CsvValidationUseCase'
import CsvProcessingUseCase from '../usecases/CsvProcessingUseCase'

interface MulterRequest extends Request {
  file: {
    buffer: Buffer
  }
}

class UploadController {
  async uploadCsv (req: MulterRequest, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo CSV enviado.' })
      return
    }

    try {
      const csvData = await CsvParserService.parseCsv(req.file.buffer)
      const validationErrors = await CsvValidationUseCase.validateCsvRows(csvData)

      if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors })
        return
      }

      const processedData = CsvProcessingUseCase.processCsv(csvData)

      res.status(200).json({ message: 'Arquivo CSV processado com sucesso.', processedData })
    } catch (error) {
      console.error('Erro ao processar o arquivo CSV:', error)
      res.status(500).json({ error: 'Erro ao processar o arquivo CSV.' })
    }
  }
}

export default new UploadController()
