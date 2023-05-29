import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ModelQueryBuilderContract, beforeFind, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import ProductOrDishDocument from './ProductDishDocument'
import DocumentType from 'App/Types/Document/DocumentType'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: DocumentType
  
  @column()
  public number: number

  @column()
  public description?: string 

  // --------------------------------------------------------------------------
  // Relations
  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @column()
  public profileId: number

  @hasMany(()=> ProductOrDishDocument)
  public documents: HasMany<typeof ProductOrDishDocument>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // --------------------------------------------------------------------------
  // Hooks
  @beforeFind()
  public static beforeFindHook(query: ModelQueryBuilderContract<typeof Document>) {
    query.preload('documents');
  };
}
