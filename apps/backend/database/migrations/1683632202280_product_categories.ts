import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.text('description')
      
      table
        .integer('parent_category_id')
        .unsigned()
        .references('product_categories.id')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
