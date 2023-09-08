import Pack from '../models/PackModel'

class PackRepository {
  private async findPacksByFilter (filter: Record<string, any>): Promise<Pack[]> {
    try {
      const packs = await Pack.findAll({
        where: filter
      })

      return packs
    } catch (error) {
      throw new Error(`Erro ao buscar pack: ${error.message}`)
    }
  }

  async findByPackId (pack_id: number): Promise<Pack[]> {
    return await this.findPacksByFilter({ pack_id })
  }

  async findProductInPack (product_id: number): Promise<Pack[]> {
    return await this.findPacksByFilter({ product_id })
  }
}

export default new PackRepository()
