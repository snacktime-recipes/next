import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dishes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.text('description')
      table.integer('cook_time').notNullable()
      table.float('cook_difficulty').notNullable()
      table.boolean('is_public').notNullable()
      table.boolean('is_ingredient').notNullable()

      table
        .integer('author_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')
      
      table
        .integer('category_id')
        .unsigned()
        .references('dish_categories.id')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
