import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'
import ProfileDish from './ProfileDish'

export default class CookedDish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public count: number

  @belongsTo(() => MeasureUnit)
  public measureUnit: BelongsTo<typeof MeasureUnit>

  @belongsTo(() => ProfileDish)
  public dish: BelongsTo<typeof ProfileDish>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
