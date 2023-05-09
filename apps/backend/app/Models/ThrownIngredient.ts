import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import MeasureUnit from './MeasureUnit'
import ProfileDish from './ProfileDish'
import ProfileProduct from './ProfileProduct'

export default class ThrownIngredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public count: number

  @belongsTo(() => MeasureUnit)
  public measureUnit: BelongsTo<typeof MeasureUnit>

  @belongsTo(() => ProfileDish)
  public dishIngredient: BelongsTo<typeof ProfileDish> // | null
  
  @belongsTo(() => ProfileProduct)
  public productIngredient: BelongsTo<typeof ProfileProduct> // | null

  public ingredient(isDishIngredient: true): this['dishIngredient'];
  public ingredient(isDishIngredient: false): this['dishIngredient'];
  public ingredient(isDishIngredient: boolean = false): this['dishIngredient'] | this['productIngredient'] {
    return (isDishIngredient ? this.dishIngredient : this.productIngredient);
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
