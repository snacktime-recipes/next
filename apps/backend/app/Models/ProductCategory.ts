import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string
  
  @hasOne(() => ProductCategory)
  public parentCategory: HasOne<typeof ProductCategory>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>
}
