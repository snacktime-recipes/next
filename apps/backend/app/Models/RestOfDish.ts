import { DateTime } from 'luxon'
import { BaseModel, hasOne, HasOne, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'
import ProfileDish from './ProfileDish'

export default class RestOfDish extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public number: number

  @column()
  public count: number

  @hasOne(() => MeasureUnit)
  public measureUnit: HasOne<typeof MeasureUnit>

  @belongsTo(() => ProfileDish)
  public dish: BelongsTo<typeof ProfileDish>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
