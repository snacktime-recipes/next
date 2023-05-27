import { BaseModel, HasMany, column, hasMany, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'

export default class DishCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string
  
  // --------------------------------------------------------------------------
  // Relationships
  @belongsTo(() => DishCategory, { foreignKey: "parentCategoryId" })
  public parentCategory: BelongsTo<typeof DishCategory>

  @column()
  public parentCategoryId?: number;

  @hasMany(() => Dish)
  public dishes: HasMany<typeof Dish>
}
