import { DataTypes, Model } from 'sequelize'
import sequelize from '../infra/mysql'

class Pack extends Model {
  public id!: number
  public pack_id!: number
  public product_id!: number
  public qty!: number
}

Pack.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    pack_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    qty: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Pack',
    tableName: 'packs',
    timestamps: false
  }
)

export default Pack
