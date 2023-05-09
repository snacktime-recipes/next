import { BaseModel, HasMany, HasOne, ManyToMany, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'
import Profile from './Profile'
import RestOfDish from './RestOfDish'
import ThrownIngredient from './ThrownIngredient'
import CoockedDish from './CoockedDish'
import Directory from './Directory'

export default class ProfileDish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bookmark: boolean

  @column()
  public like: boolean

  @hasOne(() => Dish)
  public dish: HasOne<typeof Dish>

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => RestOfDish)
  public restOfDishes: HasMany<typeof RestOfDish>

  @hasMany(() => ThrownIngredient)
  public thrownIngridients: HasMany<typeof ThrownIngredient>

  @hasMany(() => CoockedDish)
  public coockedDishes: HasMany<typeof CoockedDish>

  @manyToMany(() => Directory, {
    pivotTable: 'ProfileDishDirectory',
  })
  public directories: ManyToMany<typeof Directory>
}
