import Pack from '../models/PackModel'

class PackRepository {
  async findByPackId (pack_id: number): Promise<Pack[]> {
    try {
      const pack = await Pack.findAll({
        where: {
          pack_id
        }
      })

      return pack
    } catch (error) {
      throw new Error(`Erro ao buscar pack por código: ${error.message}`)
    }
  }

  async findProductInPack (product_id: number): Promise<Pack[]> {
    try {
      const pack = await Pack.findAll({
        where: {
          product_id
        }
      })

      return pack
    } catch (error) {
      throw new Error(`Erro ao buscar pack por código: ${error.message}`)
    }
  }
}

export default new PackRepository()
