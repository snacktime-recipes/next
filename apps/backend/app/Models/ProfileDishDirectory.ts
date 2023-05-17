import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Directory from './Directory'
import Dish from './Dish'
import Profile from './Profile'

export default class ProfileDishDirectory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Dish)
  public dish: BelongsTo<typeof Dish>

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @belongsTo(() => Directory)
  public directory: BelongsTo<typeof Directory>
}
