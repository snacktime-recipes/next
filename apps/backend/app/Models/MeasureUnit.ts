import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ConversionMeasureUnit from './ConversionMeasureUnit'

export default class MeasureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @hasMany(() => ConversionMeasureUnit)
  public conversionMeasureUnits: HasMany<typeof ConversionMeasureUnit>
}
