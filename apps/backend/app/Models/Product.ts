import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import Profile from './Profile'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string
  
  @column()
  public isPublic: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // --------------------------------------------------------------------------
  // Relationships

  @belongsTo(() => ProductCategory, { foreignKey: "categoryId" })
  public category: BelongsTo<typeof ProductCategory>

  @column()
  public categoryId?: number;

  @belongsTo(() => Profile, { foreignKey: "authorId" })
  public author: BelongsTo<typeof Profile>

  @column()
  public authorId?: number;

  // --------------------------------------------------------------------------
  // Query scopes
  public static public = scope((query) => {
    query.where('isPublic', true);
  });

  public static authoredBy = scope((query, profile: Profile) => {
    query.where('authorId', profile.id);
  });
}
