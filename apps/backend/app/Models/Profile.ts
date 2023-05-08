import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public methodAuthentification: number // хз зачем число, Мичкивський сказал, мейби переделать в boolean?

  @column()
  public login: string

  @column()
  public password: string

  @column()
  public name: string

  @column()
  public lastName: string

  @column()
  public phone: string

  @column()
  public avatar: string // хз как буим реализовывать

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
