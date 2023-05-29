import { BaseModel, HasMany, column, hasMany, beforeFind, ModelQueryBuilderContract, beforeFetch, beforePaginate, afterCreate, afterSave } from '@ioc:Adonis/Lucid/Orm'
import ConversionMeasureUnit from './ConversionMeasureUnit'
import Database from '@ioc:Adonis/Lucid/Database'

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
    //await query.preload('conversionMeasureUnits');
  };

  @afterSave()
  public static async conversionRelations(){
    let units = await Database.from('measure_units').select('*');

    if(units.length < 2) return;

    for(let from = 0; from < units.length; from++){
      for(let to = 0; to < units.length; to++){
        if(units[from].id === units[to].id) continue;

        let conversion = await ConversionMeasureUnit.query()
            .where('measureUnitFromId', units[from].id)
            .where('measureUnitToId', units[to].id)
            .first();
        if(conversion) continue;
        conversion = await ConversionMeasureUnit.create({
          measureUnitFromId: units[from].id,
          measureUnitToId: units[to].id,
          coefficient: 1
        })
      }
    }
  }
}
