import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import ProductDishDocument from './ProductDishDocument'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string //purchaced, cooked, thrown
  
  @column()
  public number: number

  @column()
  public income: number  // +1 || -1 depence in document type

  @column()
  public description?: string 

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @column()
  public profileId: number

  @hasMany(()=> ProductDishDocument)
  public productDishDocuments: HasMany<typeof ProductDishDocument>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
