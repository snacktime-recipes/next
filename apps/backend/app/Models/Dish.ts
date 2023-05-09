import { DateTime } from 'luxon'
import { BaseModel, hasOne, HasOne, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import DishCategory from './DishCategory'
import RecipeStep from './RecipeStep'
import RecipeStepProduct from './RecipeStepProduct'

export default class Dish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string

  @column()
  public description: string

  @column()
  public cookTime: number

  @column()
  public cookDifficulty: number

  @column()
  public isPrivate: boolean

  @column()
  public isIngridient: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public author: HasOne<typeof Profile>

  @hasOne(() => DishCategory)
  public dishCategory: HasOne<typeof DishCategory>

  @hasMany(() => RecipeStep)
  public recipeSteps: HasMany<typeof RecipeStep>

  @hasMany(() => RecipeStepProduct)
  public recipeStepProducts: HasMany<typeof RecipeStepProduct>

  @manyToMany(() => Profile, {
    pivotTable: 'ProfileDish',
  })
  public profiles: ManyToMany<typeof Profile>
}
