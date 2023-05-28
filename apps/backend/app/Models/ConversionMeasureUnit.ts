import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'

export default class ConversionMeasureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public coefficient: number

  // --------------------------------------------------------------------------
  // Relationships
  @belongsTo(() => MeasureUnit, {foreignKey: "measureUnitFromId"})
  public measureUnitFrom: BelongsTo<typeof MeasureUnit>
  
  @column()
  public measureUnitFromId

  @belongsTo(() => MeasureUnit, {foreignKey: "measureUnitToId"})
  public measureUnitTo: BelongsTo<typeof MeasureUnit>

  @column()
  public measureUnitToId

}
