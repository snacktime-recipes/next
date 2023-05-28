import { BaseModel, HasMany, column, hasMany, beforeFind, ModelQueryBuilderContract, beforeFetch, beforePaginate } from '@ioc:Adonis/Lucid/Orm'
import ConversionMeasureUnit from './ConversionMeasureUnit'

export default class MeasureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @hasMany(() => ConversionMeasureUnit, { foreignKey: "measureUnitFromId" })
  public conversionMeasureUnits: HasMany<typeof ConversionMeasureUnit>

  // --------------------------------------------------------------------------
  // Hooks
  @beforeFind()
  public static async preloadConversionsSingle(query: ModelQueryBuilderContract<typeof MeasureUnit>) {
    await query.preload('conversionMeasureUnits');
  };

  @beforeFetch()
  public static async preloadConversionsMultiple(query: ModelQueryBuilderContract<typeof MeasureUnit>) {
    await query.preload('conversionMeasureUnits');
  };

  @beforePaginate()
  public static async preloadConversionsPaginate(query: ModelQueryBuilderContract<typeof MeasureUnit>) {
    await query.preload('conversionMeasureUnits');
  };
}
