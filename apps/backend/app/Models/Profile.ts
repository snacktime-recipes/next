import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Dish from './Dish'
import Directory from './Directory'
import ProfileDish from './ProfileDish'
import ProfileProduct from './ProfileProduct'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public lastName?: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone?: string

  @attachment()
  public avatar: AttachmentContract

  @column()
  public rememberMeToken: string | null

  @beforeSave()
  public static async hashPassword (profile: Profile) {
    if (profile.$dirty.password) {
      profile.password = await Hash.make(profile.password)
    }
  }

  @hasMany(() => Dish)
  public profilesDishes: HasMany<typeof Dish> 

  @hasMany(() => Directory)
  public directories: HasMany<typeof Directory>

  @hasMany(() => ProfileDish)
  public dishes: HasMany<typeof ProfileDish>

  @hasMany(() => ProfileProduct)
  public products: HasMany<typeof ProfileProduct>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
