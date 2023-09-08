import { type Request, type Response } from 'express'
import PriceUpdateUseCase from '../usecases/PriceUpdateUseCase'
import { NotFoundError, ValidationError } from '../errors'

class PriceUpdateController {
  async updatePrices (req: Request, res: Response): Promise<void> {
    if (!req.body || !Array.isArray(req.body)) {
      res.status(400).json({ error: 'Dados inválidos no corpo da solicitação.' })
      return
    }

    try {
      const data = req.body
      const result = await PriceUpdateUseCase.updatePrices(data)
      res.status(200).json(result)
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.getStatusCode()).json({ error: error.message })
      } else if (error instanceof ValidationError) {
        res.status(error.getStatusCode()).json({ error: error.message })
      } else {
        console.error(error)
        res.status(500).json(error)
      }
    }
  }
}

export default new PriceUpdateController()
