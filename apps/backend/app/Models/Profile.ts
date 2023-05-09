import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Dish from './Dish'
import Directory from './Directory'
import ProfileDish from './ProfileDish'
import ProfileProduct from './ProfileProduct'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public authenticationMethod: string

  @column()
  public login: string

  @column()
  public password: string

  @column()
  public name: string

  @column()
  public lastName?: string

  @column()
  public phone?: string

  @attachment()
  public avatar: AttachmentContract

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
