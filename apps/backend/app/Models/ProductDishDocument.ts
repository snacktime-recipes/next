import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'
import Product from './Product'
import Dish from './Dish'
import Document from './Document'

export default class ProductDishDocument extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public count: number

  @column()
  public isProduct: boolean

  @belongsTo(() => MeasureUnit)
  public measureUnit: BelongsTo<typeof MeasureUnit>

  @belongsTo(() => Document)
  public document: BelongsTo<typeof Document>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Dish)
  public dish: BelongsTo<typeof Dish>

  //
  // ctrl + c & ctrl + v from RecipeStepProduct.ts
  // 
  public ingredient(isProduct: true): this['product']; 
  public ingredient(isProduct: false): this['product'];
  public ingredient(isProduct: boolean = false): this['product'] | this['dish'] {
    return (isProduct ? this.product : this.dish);
  }
}
