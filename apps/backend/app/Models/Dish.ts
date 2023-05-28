import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, BelongsTo, belongsTo, beforeFind, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import DishCategory from './DishCategory'
import RecipeStep from './RecipeStep'
import Product from './Product'
import SearchableModel from './abstract/SearchableModel'
import AbstractModelSearchProvider from 'App/Search/AbstractModelSearchProvider'
import Logger from "@ioc:Adonis/Core/Logger";

type Dishquery = ModelQueryBuilderContract<typeof Dish>

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

type SearchabaleIngredientData = {
  isDishIngredient: boolean,
  count: number,

  measureUnit: {
    id: number,
    name: string,
    description?: string
  }

  productIngredient?: SearchableProductData,
  dishIngredient?: SearchableDishData
}

type SearchabaleStepData = {
  name: string,
  activeTime: number,
  passiveTime: number,
  ingredients: string[]
}

type SearchableDishData = {
  documentId: number,
  authorId: number,

  name: string,
  description?: string,
  cookTime: number,
  cookDifficulty: number,
  isPublic: boolean,
  isIngredient: boolean,

  category: {
    id: number,
    name: string,
  },
  recipeSteps: string[]
};

export default class Dish extends SearchableModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @column()
  public cookTime: number

  @column()
  public cookDifficulty: number

  @column()
  public isPublic: boolean

  @column()
  public isIngredient: boolean

  // --------------------------------------------------------------------------
  // Relationships

  @belongsTo(() => Profile, { foreignKey: "authorId" })
  public author: BelongsTo<typeof Profile>

  @column()
  public authorId?: number;

  @belongsTo(() => DishCategory, { foreignKey: "categoryId" })
  public category: BelongsTo<typeof DishCategory>

  @column()
  public categoryId?: number;

  @hasMany(() => RecipeStep)
  public recipeSteps: HasMany<typeof RecipeStep>

  public async getProducts(): Promise<Array<typeof Product>> {
    // todo implement
    // get all recipe steps, recursively fetch all RecipeStepProducts from them and then fetch all
    // RecipeSteProduct.product and return as an array
    
    return [];
  }
  // --------------------------------------------------------------------------
  // Hooks

  @beforeFind()
  public static async preloadData(query: Dishquery){
    query.preload('author');
    query.preload('category');
    query.preload('recipeSteps', (recipeStepsQuery) =>{
      recipeStepsQuery.preload('ingredients', (ingredientsQuery)=>{
        ingredientsQuery
          .preload('measureUnit')
          .preload('productIngredient')
          .preload('dishIngredient');
          
      });
    });
  }
  // --------------------------------------------------------------------------
  // Search-related

  public static getSearchInstance() {
    return this._getSearchInstanceWrapper<SearchableProductData>({
      // search schema
      documentId: "number",
      authorId: "number",
      
      name: "string",
      description: "string",
      cookTime: "number",
      cookDifficulty: "number",
      isIngredient: "boolean",
      isPublic: "boolean",

      category: {
        id: "number",
        name: "string",
      },

      recipeSteps: "string[]",
    });
  };

  public static async reconlinceSearchDocuments(instance: AbstractModelSearchProvider<SearchableDishData>): Promise<void> {
    // Fetching all Product documents and adding them to our search
    // database
    const documents = await this.query();

    for (const document of documents) {
      await document.load('category');
      await document.load('recipeSteps', (stepQuery)=>{
        stepQuery.preload('ingredients', (ingredientQuery)=>{
          ingredientQuery
            .preload('measureUnit')
            .preload('productIngredient')
            .preload('dishIngredient')

        })
      });

      const recipeStepsString = new Array<string>;
      for(let step in document.recipeSteps){
        recipeStepsString.push(`<${}>,<${}>`)
      }

      await instance.insert({
        documentId: document.id,
        authorId: document.authorId!,
        
        name: document.name,
        description: document.description ?? undefined,
        cookTime: document.cookTime,
        cookDifficulty: document.cookDifficulty,
        isPublic: document.isPublic,
        isIngredient: document.isIngredient,

        category: {
          id: document.categoryId!,
          name: document.category.name,
        },
        recipeSteps: recipeStepsString
      });

      Logger.debug(`[${ this.name } search reconcile] Added document ${ JSON.stringify(document.toJSON()) } to search index`);
    };
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  

}
