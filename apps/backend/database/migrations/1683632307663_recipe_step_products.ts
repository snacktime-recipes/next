import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recipe_step_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('is_dish_ingredient').notNullable()
      table.float('count').notNullable()

      table
        .integer('measure_unit_id')
        .unsigned()
        .references('measure_units.id')
        .onDelete('CASCADE')

      table
        .integer('product_ingredient_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')
      
      table
        .integer('dish_ingredient_id')
        .unsigned()
        .references('dishes.id')
        .onDelete('CASCADE')

      table
        .integer('recipe_step_id')
        .unsigned()
        .references('recipe_steps.id')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
