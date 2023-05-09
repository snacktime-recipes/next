import { BaseModel, HasOne, hasOne, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import RecipeStep from './RecipeStep'
import Product from './Product'
import Dish from './Dish'
import RecipeProductAlternative from './RecipeStepProductAlternative'
import MeasureUnit from './MeasureUnit'

export default class RecipeStepProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isDishIngredient: boolean

  @column()
  public count: number

  @belongsTo(() => MeasureUnit)
  public measure: BelongsTo<typeof MeasureUnit>

  @belongsTo(() => RecipeStep)
  public recipeStep: BelongsTo<typeof RecipeStep>

  @belongsTo(() => Product)
  public productIngredient: BelongsTo<typeof Product> // | null

  @belongsTo(() => Dish)
  public dishIngredient: BelongsTo<typeof Dish> // | null

  public ingredient(isDishIngredient: true): this['dishIngredient'];
  public ingredient(isDishIngredient: false): this['dishIngredient'];
  public ingredient(isDishIngredient: boolean = false): this['dishIngredient'] | this['productIngredient'] {
    return (isDishIngredient ? this.dishIngredient : this.productIngredient);
  }

  @hasMany(() => RecipeProductAlternative)
  public alternatives: HasMany<typeof RecipeProductAlternative>
}
