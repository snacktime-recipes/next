import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conversion_measure_units'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('measure_unit_from_id')
        .unsigned()
        .references('measure_units.id')
        .onDelete('CASCADE')
      
      table
        .integer('measure_unit_to_id')
        .unsigned()
        .references('measure_units.id')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
