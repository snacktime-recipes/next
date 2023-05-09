import { BaseModel, BelongsTo, HasMany, HasOne, ManyToMany, belongsTo, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'
import Profile from './Profile'
import RestOfDish from './RestOfDish'
import ThrownIngredient from './ThrownIngredient'
import CookedDish from './CookedDish'
import Directory from './Directory'

export default class ProfileDish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isBookmarked: boolean

  @column()
  public isLiked: boolean

  @belongsTo(() => Dish)
  public dish: BelongsTo<typeof Dish>

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @hasMany(() => RestOfDish)
  public restOfDishes: HasMany<typeof RestOfDish>

  @hasMany(() => ThrownIngredient)
  public thrownIngredients: HasMany<typeof ThrownIngredient>

  @hasMany(() => CookedDish)
  public coockedDishes: HasMany<typeof CookedDish>

  @manyToMany(() => Directory, {
    pivotTable: 'ProfileDishDirectory',
  })
  public directories: ManyToMany<typeof Directory>
}
