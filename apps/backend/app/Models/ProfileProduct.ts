import { BaseModel, hasOne, HasOne, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Product from './Product'
import RestOfProduct from './RestOfProduct'
import ThrownIngredient from './ThrownIngredient'

export default class ProfileProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Product)
  public product: HasOne<typeof Product>
  
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => RestOfProduct)
  public restOfProducts: HasMany<typeof RestOfProduct>

  @hasMany(() => ThrownIngredient)
  public thrownIngredients: HasMany<typeof ThrownIngredient>
}
