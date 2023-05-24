import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import SearchableModel from './abstract/SearchableModel'
import ProductCategory from './ProductCategory'
import Profile from './Profile'
import Logger from "@ioc:Adonis/Core/Logger";
import AbstractModelSearchProvider from 'App/Search/AbstractModelSearchProvider'

export default class Product extends SearchableModel {
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

  // --------------------------------------------------------------------------
  // Search-related
  public static getSearchInstance() {
    return this._getSearchInstanceWrapper<{ productId: number, name: string, description?: string }>({
      // search schema
      documentId: "number",
      name: "string",
      description: "string",
    });
  };

  public static async reconlinceSearchDocuments(instance: AbstractModelSearchProvider): Promise<void> {
    // Fetching all Product documents and adding them to our search
    // database
    const documents = await this.query();

    for (const document of documents) {
      await instance.insert({
        productId: document.id,
        name: document.name,
        description: document.description ?? undefined,
      });

      Logger.info(`[${ this.name } search reconcile] Added document ${ document.toJSON() } to search index`);
    };
  }
}
