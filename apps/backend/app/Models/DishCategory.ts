import { BaseModel, HasMany, HasOne, column, hasOne, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'

export default class DishCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string
  
  @hasOne(() => DishCategory)
  public categoryParent: HasOne<typeof DishCategory>

  @hasMany(() => Dish)
  public dishes: HasMany<typeof Dish>
}
