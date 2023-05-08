import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string
  
  @hasOne(() => ProductCategory)
  public categoryParent: HasOne<typeof ProductCategory>
}
