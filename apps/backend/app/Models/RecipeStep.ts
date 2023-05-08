import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'

export default class RecipeStep extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string

  @column()
  public activeTime: DateTime

  @column()
  public passiveTime: DateTime

  @hasOne(() => Dish)
  public dish: HasOne<typeof Dish>
}
