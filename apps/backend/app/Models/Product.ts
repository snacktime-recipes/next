import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column, scope, afterSave } from '@ioc:Adonis/Lucid/Orm'
import SearchableModel from './abstract/SearchableModel'
import ProductCategory from './ProductCategory'
import Profile from './Profile'
import Logger from "@ioc:Adonis/Core/Logger";
import AbstractModelSearchProvider from 'App/Search/AbstractModelSearchProvider'

type SearchableProductData = {
  documentId: number,
  authorId: number,

  name: string,
  description?: string,
  isPublic: boolean,

  category: {
    id: number,
    name: string,
  },
};

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
    return this._getSearchInstanceWrapper<SearchableProductData>({
      // search schema
      documentId: "number",
      authorId: "number",
      
      name: "string",
      description: "string",
      isPublic: "boolean",

      category: {
        id: "number",
        name: "string",
      },
    });
  };

  @afterSave()
  public static async insertToSearchIndex(document: Product) {
    const instance = await this.getSearchInstance();

    await document.load('category');

    // Adding this document to search index
    await instance.insert({
      documentId: document.id,
      authorId: document.authorId!,

      name: document.name,
      description: document.description,
      isPublic: document.isPublic,

      category: {
        id: document.category.id,
        name: document.category.name,
      }
    });

    Logger.debug(`[${ this.name } insertToSearchIndex] Added/Updated document ${ JSON.stringify(document.toJSON()) } to search index`);
  };

  public static async reconlinceSearchDocuments(instance: AbstractModelSearchProvider<SearchableProductData>): Promise<void> {
    // Fetching all Product documents and adding them to our search
    // database
    const documents = await this.query();

    for (const document of documents) {
      await document.load('category');

      await instance.insert({
        documentId: document.id,
        authorId: document.authorId!,
        
        name: document.name,
        description: document.description ?? undefined,
        isPublic: document.isPublic,

        category: {
          id: document.categoryId!,
          name: document.category.name,
        }
      });

      Logger.debug(`[${ this.name } search reconcile] Added document ${ JSON.stringify(document.toJSON()) } to search index`);
    };
  }
}
