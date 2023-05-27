import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recipe_steps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.integer('step_number').unsigned().notNullable()
      table.float('active_time').unsigned().notNullable()
      table.float('passive_time').unsigned().notNullable()

      table
        .integer('dish_id')
        .unsigned()
        .references('dishes.id')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
