import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'thrown_ingredients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('number').unsigned()
      table.float('count').unsigned()

      table
        .integer('measure_unit_id')
        .unsigned()
        .references('measure_units.id')
        .onDelete('CASCADE')
      
      table
        .integer('dish_Ingredient_id')
        .unsigned()
        .nullable()
        .references('profile_dishes.id')
        .onDelete('CASCADE')
      
      table
        .integer('product_Ingredient_id')
        .unsigned()
        .nullable()
        .references('profile_products.id')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
