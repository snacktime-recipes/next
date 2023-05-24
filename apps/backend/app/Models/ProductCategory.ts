import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  // --------------------------------------------------------------------------
  // Relationships
  @belongsTo(() => ProductCategory, { foreignKey: "parentCategoryId" })
  public parentCategory: BelongsTo<typeof ProductCategory>

  @column()
  public parentCategoryId?: number;
}
