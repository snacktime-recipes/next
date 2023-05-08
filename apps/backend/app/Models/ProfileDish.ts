import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'
import Profile from './Profile'

export default class ProfileDish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bookmark: boolean

  @column()
  public like: boolean

  @hasOne(() => Dish)
  public dish: HasOne<typeof Dish>

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>
}
