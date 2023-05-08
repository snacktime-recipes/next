import { DateTime } from 'luxon'
import { BaseModel, HasOne, hasOne, column } from '@ioc:Adonis/Lucid/Orm'
import RecipeStep from './RecipeStep'
import Product from './Product'
import Dish from './Dish'

export default class RecipeStepProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public typeIngridient: boolean

  @column()
  public stepNumber: number

  @column()
  public count: number

  @hasOne(() => RecipeStep)
  public recipeStep: HasOne<typeof RecipeStep>

  @hasOne(() => Product)
  public productIngredient: HasOne<typeof Product> // | null

  @hasOne(() => Dish)
  public dishIngredient: HasOne<typeof Dish> // | null
}
