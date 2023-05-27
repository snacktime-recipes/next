import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import DishCategory from './DishCategory'
import RecipeStep from './RecipeStep'
import Product from './Product'

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

  @belongsTo(() => Profile, { localKey: 'id' })
  public author: BelongsTo<typeof Profile>

  @belongsTo(() => DishCategory, { localKey: 'id' })
  public category: BelongsTo<typeof DishCategory>

  @hasMany(() => RecipeStep)
  public recipeSteps: HasMany<typeof RecipeStep>

  public async getProducts(): Promise<Array<typeof Product>> {
    // todo implement
    // get all recipe steps, recursively fetch all RecipeStepProducts from them and then fetch all
    // RecipeSteProduct.product and return as an array
    
    return [];
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
