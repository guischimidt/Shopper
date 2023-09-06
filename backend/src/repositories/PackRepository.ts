import { type Model } from 'sequelize'
import Pack from '../models/PackModel'

class PackRepository {
  async findById (id: number): Promise<Model | null> {
    const pack = await Pack.findByPk(id)
    return pack
  }

  async updateById (id: number, packData: {
    pack_id: number
    product_id: number
    qty: number
  }): Promise<[number, Model[]]> {
    const [rowsUpdated, [updatedPack]] = await Pack.update(packData, {
      where: {
        id
      },
      returning: true
    })
    return [rowsUpdated, [updatedPack]]
  }

  async findAll (): Promise<Model[]> {
    const packs = await Pack.findAll()
    return packs
  }
}

export default new PackRepository()
