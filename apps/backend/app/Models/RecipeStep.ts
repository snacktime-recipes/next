import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'
import RecipeStepProduct from './RecipeStepProduct'

export default class RecipeStep extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public stepNumber: number

  @column()
  public activeTime: number

  @column()
  public passiveTime: number

  @belongsTo(() => Dish)
  public dish: BelongsTo<typeof Dish>

  @hasMany(() => RecipeStepProduct, {
    onQuery(query) {
      query.preload('dishIngredient');
      query.preload('productIngredient');
    }
  })
  public products: HasMany<typeof RecipeStepProduct>
}
