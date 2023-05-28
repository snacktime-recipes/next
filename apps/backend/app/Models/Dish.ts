import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, BelongsTo, belongsTo, beforeFind, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import DishCategory from './DishCategory'
import RecipeStep from './RecipeStep'
import Product from './Product'

type Dishquery = ModelQueryBuilderContract<typeof Dish>

export default class Dish extends BaseModel {
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


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
