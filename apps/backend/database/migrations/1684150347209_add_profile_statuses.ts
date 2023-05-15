import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ProfileStatus } from '@snacktime/types'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('status', Object.values(ProfileStatus))
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status');
    })
  }
}
