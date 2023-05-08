import { BaseModel, hasOne, HasOne, column } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Product from './Product'

export default class ProfileProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Product)
  public product: HasOne<typeof Product>
  
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>
}
