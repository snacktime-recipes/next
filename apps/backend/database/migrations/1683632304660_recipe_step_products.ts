import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recipe_step_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('isDishIngredient')
      table.float('count')

      table
        .integer('measure_unit_id')
        .unsigned()
        .references('measure_units.id')
        .onDelete('CASCADE')
      
      table
        .integer('product_id')
        .unsigned()
        .nullable()
        .references('products.id')
        .onDelete('CASCADE')
      
      table
        .integer('dish_id')
        .unsigned()
        .nullable()
        .references('dishes.id')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
