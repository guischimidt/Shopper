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

  it('should update prices for valid data', async () => {
    // Mock dos dados e produtos encontrados no banco de dados
    const validData = [{ code: 1, new_price: 30.0 }, { code: 2, new_price: 25.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValueOnce({ code: 1, sales_price: 20.0 }).mockResolvedValueOnce({ code: 2, sales_price: 22.0 })
    PackRepository.findByPackId = jest.fn().mockResolvedValue([])
    PackRepository.findProductInPack = jest.fn().mockResolvedValue([])

    const result = await PriceUpdateUseCase.updatePrices(validData)

    expect(result.message).toBe('Atualização em massa concluída com sucesso')
    expect(ProductRepository.update).toHaveBeenCalledTimes(2)
  })

  it('should throw ValidationError for invalid data', async () => {
    const invalidData = [{ code: null, new_price: 30.0 }, { code: 2, new_price: null }]
    expect(async () => await PriceUpdateUseCase.updatePrices(invalidData)).rejects.toThrow(ValidationError)
  })

  it('should throw NotFoundError for product not found', async () => {
    const notFoundData = [{ code: 3, new_price: 30.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValue(null)

    expect(async () => await PriceUpdateUseCase.updatePrices(notFoundData)).rejects.toThrow(NotFoundError)
  })

  it('should update individual price for pack', async () => {
    const packData = [{ code: 4, new_price: 30.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValue({ code: 4, sales_price: 20.0 })
    PackRepository.findByPackId = jest.fn().mockResolvedValue([{ product_id: 5, qty: 2 }])

    const result = await PriceUpdateUseCase.updatePrices(packData)

    expect(result.message).toBe('Atualização em massa concluída com sucesso')
    expect(ProductRepository.update).toHaveBeenCalledTimes(2) // Uma vez para o pacote e uma vez para o produto individual
  })

  it('should update pack price with price adjust greater than 10%', async () => {
    const priceIncreaseData = [{ code: 6, new_price: 30.0 }]
    ProductRepository.findByCode = jest.fn().mockResolvedValue({ code: 6, sales_price: 20.0 })
    PackRepository.findByPackId = jest.fn().mockResolvedValue([{ pack_id: 7, qty: 1 }])
    PackRepository.findProductInPack = jest.fn().mockResolvedValue([{ product_id: 8, qty: 1 }])

    const result = await PriceUpdateUseCase.updatePrices(priceIncreaseData)

    expect(result.message).toBe('Atualização em massa concluída com sucesso')
    expect(ProductRepository.update).toHaveBeenCalledTimes(3) // Uma vez para o pacote, uma vez para o produto no pacote e uma vez para o produto individual
  })
})
