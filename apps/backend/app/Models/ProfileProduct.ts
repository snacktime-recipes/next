import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Product from './Product'
import RestOfProduct from './RestOfProduct'
import ThrownIngredient from './ThrownIngredient'

export default class ProfileProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
  
  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @hasMany(() => RestOfProduct)
  public restOfProducts: HasMany<typeof RestOfProduct>

  @hasMany(() => ThrownIngredient)
  public thrownIngredients: HasMany<typeof ThrownIngredient>
}
