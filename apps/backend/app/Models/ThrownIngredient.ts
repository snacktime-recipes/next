import { DateTime } from 'luxon'
import { BaseModel, hasOne, HasOne, column } from '@ioc:Adonis/Lucid/Orm'
import MesureUnit from './MesureUnit'
import ProfileDish from './ProfileDish'
import ProfileProduct from './ProfileProduct'

export default class ThrownIngredient extends BaseModel {
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

  @hasOne(() => ProfileDish)
  public profileDishIngridient: HasOne<typeof ProfileDish> // | null
  
  @hasOne(() => ProfileProduct)
  public profileProductIngridient: HasOne<typeof ProfileProduct> // | null
}
