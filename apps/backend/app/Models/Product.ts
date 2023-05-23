import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import Profile from './Profile'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @belongsTo(() => ProductCategory, {
    foreignKey: "id"
  })
  public category: BelongsTo<typeof ProductCategory>

  @belongsTo(() => Profile, { localKey: 'id' })
  public author: BelongsTo<typeof Profile>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
