import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import Profile from './Profile'
import RecipeStep from './RecipeStep'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => ProductCategory)
  public productCategory: HasOne<typeof ProductCategory>

  @manyToMany(() => RecipeStep, {
    pivotTable: 'RecipeStepProduct',
  })
  public recipeSteps: ManyToMany<typeof RecipeStep>

  @manyToMany(() => Profile, {
    pivotTable: 'ProfileProduct',
  })
  public profiles: ManyToMany<typeof Profile>
}
