import CsvProcessingUseCase from './CsvProcessingUseCase'
import ProductRepository from '../repositories/ProductRepository'

// Mock do ProductRepository para evitar chamadas reais de banco de dados
jest.mock('../repositories/ProductRepository')

describe('CsvProcessingUseCase', () => {
  it('Ensure process CSV file', async () => {
    ProductRepository.findByCodes = jest.fn().mockResolvedValue([
      {
        code: 1,
        name: 'Produto A',
        cost_price: 10.0,
        sales_price: 20.0
      },
      {
        code: 2,
        name: 'Produto B',
        cost_price: 15.0,
        sales_price: 25.0
      }
    ])

    const csvData = [
      { product_code: '1', new_price: 22.0 },
      { product_code: '2', new_price: 18.0 }
    ]

    const processedData = await CsvProcessingUseCase.processCsv(csvData)

    expect(processedData).toHaveLength(2)

    expect(processedData[0]).toEqual({
      code: 1,
      name: 'Produto A',
      sales_price: 20.0,
      new_price: 22.0,
      errors: []
    })

    expect(processedData[1]).toEqual({
      code: 2,
      name: 'Produto B',
      sales_price: 25.0,
      new_price: 18.0,
      errors: ['Reajuste maior que 10%']
    })
  })

  it('Ensure all data is passed', async () => {
    ProductRepository.findByCodes = jest.fn().mockResolvedValue([])

    const csvData = [
      { product_code: '', new_price: 18.0 }
    ]

    const processedData = await CsvProcessingUseCase.processCsv(csvData)

    expect(processedData).toHaveLength(1)

    expect(processedData[0].errors).toContain('Código ou preço não informados')
  })

  it('Ensure product not found', async () => {
    ProductRepository.findByCodes = jest.fn().mockResolvedValue([])

    const csvData = [
      { product_code: '1', new_price: 22.0 }
    ]

    const processedData = await CsvProcessingUseCase.processCsv(csvData)

    expect(processedData).toHaveLength(1)

    expect(processedData[0].errors).toContain('Produto não encontrado')
  })

  it('Ensure new price lower than cost', async () => {
    ProductRepository.findByCodes = jest.fn().mockResolvedValue([
      {
        code: 1,
        name: 'Produto C',
        cost_price: 30.0,
        sales_price: 40.0
      }
    ])

    const csvData = [
      { product_code: '1', new_price: 25.0 }
    ]

    const processedData = await CsvProcessingUseCase.processCsv(csvData)

    expect(processedData).toHaveLength(1)

    expect(processedData[0].errors).toContain('Novo preço menor que o custo')
  })

  it('Ensure price adjust greater than 10%', async () => {
    ProductRepository.findByCodes = jest.fn().mockResolvedValue([
      {
        code: 1,
        name: 'Produto D',
        cost_price: 10.0,
        sales_price: 20.0
      }
    ])

    const csvData = [
      { product_code: '1', new_price: 30.0 }
    ]

    const processedData = await CsvProcessingUseCase.processCsv(csvData)

    expect(processedData).toHaveLength(1)

    expect(processedData[0].errors).toContain('Reajuste maior que 10%')
  })
})
