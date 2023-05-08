import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Dish from './Dish'
import RecipeStepProduct from './RecipeStepProduct'

export default class RecipeProductAlternative extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public count: number

  @hasOne(() => Product)
  public productIngredient: HasOne<typeof Product> // | null

  @hasOne(() => Dish)
  public dishIngredient: HasOne<typeof Dish> // | null

  @hasOne(() => RecipeStepProduct)
  public recipeStepProduct: HasOne<typeof RecipeStepProduct>
}
