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

  // --------------------------------------------------------------------------
  // Relationships

  @belongsTo(() => RecipeStep)
  public recipeStep: BelongsTo<typeof RecipeStep>
  
  @column()
  public recipeStepId: number;

  @belongsTo(() => MeasureUnit)
  public measureUnit: BelongsTo<typeof MeasureUnit>

  @column()
  public measureUnitId: number;

  @belongsTo(() => Product, {foreignKey: "productIngredientId"})
  public productIngredient: BelongsTo<typeof Product> // | null

  @column()
  public productIngredientId?: number;

  @belongsTo(() => Dish, {foreignKey: "dishIngredientId"})
  public dishIngredient: BelongsTo<typeof Dish> // | null

  @column()
  public dishIngredientId?: number;

  public ingredient(isDishIngredient: true): this['dishIngredient'];
  public ingredient(isDishIngredient: false): this['dishIngredient'];
  public ingredient(isDishIngredient: boolean = false): this['dishIngredient'] | this['productIngredient'] {
    return (isDishIngredient ? this.dishIngredient : this.productIngredient);
  }

  // @hasMany(() => RecipeProductAlternative)
  // public alternatives: HasMany<typeof RecipeProductAlternative>
}
