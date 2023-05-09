import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import RecipeStepProduct from './RecipeStepProduct'
import RestOfProduct from './RestOfProduct'
import RestOfDish from './RestOfDish'
import ThrownIngredient from './ThrownIngredient'
import CoockedDish from './CoockedDish'
import ConversionMesureUnit from './ConversionMesureUnit'

export default class MesureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string

  @hasMany(() => ConversionMesureUnit)
  public conversionMesureUnits: HasMany<typeof ConversionMesureUnit>

  @hasMany(() => RecipeStepProduct)
  public recipeStepProducts: HasMany<typeof RecipeStepProduct>

  @hasMany(() => RestOfProduct)
  public restOfProducts: HasMany<typeof RestOfProduct>

  @hasMany(() => RestOfDish)
  public restOfDishes: HasMany<typeof RestOfDish>

  @hasMany(() => ThrownIngredient)
  public thrownIngridients: HasMany<typeof ThrownIngredient>

  @hasMany(() => CoockedDish)
  public coockedDishes: HasMany<typeof CoockedDish>

}
