import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.text('description')
      
      table.boolean('is_public')
        .notNullable()
        .defaultTo(false)

      table
        .integer('category_id')
        .unsigned()
        .references('product_categories.id')
        .onDelete('CASCADE')

      table
        .integer('author_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
