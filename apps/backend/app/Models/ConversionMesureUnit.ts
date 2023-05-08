import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import MesureUnit from './MesureUnit'

export default class ConversionMesureUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => MesureUnit)
  public mesureUnitFrom: HasOne<typeof MesureUnit>

  @hasOne(() => MesureUnit)
  public mesureUnitTo: HasOne<typeof MesureUnit>

  @column()
  public coefficient: number
}
