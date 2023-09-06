// PriceUpdateController.ts
import { type Request, type Response } from 'express'
import PriceUpdateUseCase from '../usecases/PriceUpdateUseCase'

class PriceUpdateController {
  async updatePrices (req: Request, res: Response): Promise<void> {
    if (!req.body || !Array.isArray(req.body)) {
      res.status(400).json({ error: 'Dados inválidos no corpo da solicitação.' })
      return
    }

    try {
      const Data = req.body

      const result = await PriceUpdateUseCase.updatePrices(Data)

      res.status(200).json(result)
    } catch (error) {
      console.error('Erro ao atualizar preços em massa:', error)
      res.status(500).json({ error: 'Erro ao atualizar preços em massa.' })
    }
  }
}

export default new PriceUpdateController()
