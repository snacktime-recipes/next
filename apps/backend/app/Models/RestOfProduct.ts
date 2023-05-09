import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'
import ProfileProduct from './ProfileProduct'

export default class RestOfProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public count: number

  @belongsTo(() => MeasureUnit)
  public measureUnit: BelongsTo<typeof MeasureUnit>

  @belongsTo(() => ProfileProduct)
  public profileDish: BelongsTo<typeof ProfileProduct>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
