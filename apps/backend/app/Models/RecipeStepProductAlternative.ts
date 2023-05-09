import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Dish from './Dish'
import MeasureUnit from './MeasureUnit'

export default class RecipeProductAlternative extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public count: number

  @belongsTo(() => MeasureUnit)
  public measure: BelongsTo<typeof MeasureUnit>

  @hasOne(() => Product)
  public productIngredient: HasOne<typeof Product> // | null

  @hasOne(() => Dish)
  public dishIngredient: HasOne<typeof Dish> // | null

  public ingredient(isDishIngredient: true): this['dishIngredient'];
  public ingredient(isDishIngredient: false): this['dishIngredient'];
  public ingredient(isDishIngredient: boolean = false): this['dishIngredient'] | this['productIngredient'] {
    return (isDishIngredient ? this.dishIngredient : this.productIngredient);
  }
}
