import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ProfileDish from './ProfileDish'
import Directory from './Directory'

export default class ProfileDishDirectory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => ProfileDish)
  public dish: BelongsTo<typeof ProfileDish>

  @belongsTo(() => Directory)
  public directory: BelongsTo<typeof Directory>
}
