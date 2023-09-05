import { type Request, type Response } from 'express'
import CsvParserService from '../services/CsvParserService'

interface MulterRequest extends Request {
  file: {
    buffer: Buffer
  }
}

class UploadController {
  async uploadCsv (req: MulterRequest, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo CSV enviado.' })
    }

    try {
      const csvData = await CsvParserService.parseCsv(req.file.buffer)
      return res.status(200).json(csvData)
    } catch (error) {
      console.error('Erro ao processar o arquivo CSV:', error)
      return res.status(500).json({ error: 'Erro ao processar o arquivo CSV.' })
    }
  }
}

export default new UploadController()
