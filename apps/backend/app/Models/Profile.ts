import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Dish from './Dish'
import Directory from './Directory'
import ProfileDish from './ProfileDish'
import ProfileProduct from './ProfileProduct'
import Hash from '@ioc:Adonis/Core/Hash'
import { ProfileModel, ProfileStatus } from '@snacktime/types';

export default class Profile extends BaseModel implements ProfileModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public lastName: string | undefined

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone: string | undefined

  @attachment()
  public avatar: AttachmentContract

  @column()
  public rememberMeToken: string | null

  @column()
  public status: ProfileStatus

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
