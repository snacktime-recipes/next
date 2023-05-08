import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProfileDish from './ProfileDish'
import Directory from './Directory'

export default class ProfileDishDirectory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => ProfileDish)
  public profileDish: HasOne<typeof ProfileDish>

  @hasOne(() => Directory)
  public directory: HasOne<typeof Directory>
}
