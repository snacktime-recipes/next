import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recipe_step_product_alternatives'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.float('count').notNullable()

      table
        .integer('measure_unit_id')
        .unsigned()
        .references('measure_units.id')
        .onDelete('CASCADE')
        
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')
      
      table
        .integer('dish_id')
        .unsigned()
        .references('dishes.id')
        .onDelete('CASCADE')
        
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
