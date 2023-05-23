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
      
      table
        .integer('product_id')
        .unsigned()
        .references('recipe_step_products.id')
        .onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
