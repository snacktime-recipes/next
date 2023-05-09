import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'

export default class ConversionMeasureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => MeasureUnit)
  public measureUnitFrom: HasOne<typeof MeasureUnit>

  @hasOne(() => MeasureUnit)
  public measureUnitTo: HasOne<typeof MeasureUnit>

  @column()
  public coefficient: number
}
