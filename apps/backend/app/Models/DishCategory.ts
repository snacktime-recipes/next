import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class DishCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fullName: string
  
  @hasOne(() => DishCategory)
  public categoryParent: HasOne<typeof DishCategory>
}
