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

  @column()
  measureUnitId: number

  @belongsTo(() => Document)
  public document: BelongsTo<typeof Document>

  @column()
  public documentId: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column()
  public productId: number

  @belongsTo(() => Dish)
  public dish: BelongsTo<typeof Dish>

  @column()
  public dishId: number

  //
  // ctrl + c & ctrl + v from RecipeStepProduct.ts
  // 
  public ingredient(isProduct: true): this['product']; 
  public ingredient(isProduct: false): this['product'];
  public ingredient(isProduct: boolean = false): this['product'] | this['dish'] {
    return (isProduct ? this.product : this.dish);
  }
}
