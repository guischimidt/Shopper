import PriceUpdateUseCase from './PriceUpdateUseCase'
import ProductRepository from '../repositories/ProductRepository'
import PackRepository from '../repositories/PackRepository'
import { NotFoundError, ValidationError } from '../errors'

// Mocks dos repositórios e das funções de atualização para evitar chamadas reais de banco de dados
jest.mock('../repositories/ProductRepository')
jest.mock('../repositories/PackRepository')

describe('PriceUpdateUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw ValidationError for missing code or new_price', async () => {
    const invalidData = [
      { code: null, new_price: 30.0 },
      { code: 2, new_price: null }
    ]
    expect(async () => await PriceUpdateUseCase.updatePrices(invalidData)).rejects.toThrow(ValidationError)
  })

  it('should throw NotFoundError for product not found', async () => {
    const notFoundData = [{ code: 3, new_price: 30.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValue(null)

    expect(async () => await PriceUpdateUseCase.updatePrices(notFoundData)).rejects.toThrow(NotFoundError)
  })

  it('should throw ValidationError for new_price less than cost price', async () => {
    const invalidPriceData = [{ code: 4, new_price: 15.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValue({ code: 4, cost_price: 20.0 })

    expect(async () => await PriceUpdateUseCase.updatePrices(invalidPriceData)).rejects.toThrow(ValidationError)
  })

  it('should throw ValidationError for price increase greater than 10%', async () => {
    const priceIncreaseData = [{ code: 6, new_price: 30.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValue({ code: 6, sales_price: 20.0 })
    PackRepository.findByPackId = jest.fn().mockResolvedValue([{ pack_id: 7, qty: 1 }])
    PackRepository.findProductInPack = jest.fn().mockResolvedValue([{ product_id: 8, qty: 1 }])

    expect(async () => await PriceUpdateUseCase.updatePrices(priceIncreaseData)).rejects.toThrow(ValidationError)
  })
})
