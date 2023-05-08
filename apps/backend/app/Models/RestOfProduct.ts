import { DateTime } from 'luxon'
import { BaseModel, hasOne, HasOne, column } from '@ioc:Adonis/Lucid/Orm'
import MesureUnit from './MesureUnit'
import ProfileProduct from './ProfileProduct'

export default class RestOfProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public count: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => MesureUnit)
  public mesureUnit: HasOne<typeof MesureUnit>

  @hasOne(() => ProfileProduct)
  public profileDish: HasOne<typeof ProfileProduct>
}
