import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'

export default class ConversionMeasureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => MeasureUnit)
  public measureUnitFrom: BelongsTo<typeof MeasureUnit>

  @belongsTo(() => MeasureUnit)
  public measureUnitTo: BelongsTo<typeof MeasureUnit>

  @column()
  public coefficient: number
}
