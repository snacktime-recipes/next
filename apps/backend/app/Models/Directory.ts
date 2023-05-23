import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany, beforeSave, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import { locate as locateIcon } from '@iconify/json';
import Dish from './Dish';

export default class Directory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public icon: string

  @column()
  public name: string

  @column()
  public description?: string

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @manyToMany(() => Dish, {
    pivotTable: 'ProfileDishDirectory',
    // onQuery(query) {
    //   query.preload('dish');
    // }
  })
  public dishes: ManyToMany<typeof Dish>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // 
  // Hooks
  // 
  @beforeSave()
  public static async iconCheck(directory: Directory) {
    const defaultIcon = 'lucide:accessibility';

    if (directory.icon == null) {
      // Default icon
      directory.icon = defaultIcon;
    } else {
      if (directory.$dirty.icon) {
        // Checking if @iconify/json contains this icon
        if (!locateIcon(directory.$dirty.icon)) {
          directory.icon = defaultIcon;
        };
      };
    };
  }
}
