import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conversion_measure_units'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.double('coefficient').notNullable()

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

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
