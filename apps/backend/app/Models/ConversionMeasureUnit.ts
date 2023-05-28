import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'

export default class ConversionMeasureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public coefficient: number

  // --------------------------------------------------------------------------
  // Relationships
  @belongsTo(() => MeasureUnit)
  public measureUnitFrom: BelongsTo<typeof MeasureUnit>
  
  @column()
  public measureUnitFromId: number

  @belongsTo(() => MeasureUnit)
  public measureUnitTo: BelongsTo<typeof MeasureUnit>

  @column()
  public measureUnitToId: number
}
