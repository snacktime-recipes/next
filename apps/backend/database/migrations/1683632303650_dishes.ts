import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dishes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.text('description')
      table.integer('cookTime').notNullable()
      table.float('cookDifficulty').notNullable()
      table.boolean('isPublic').notNullable()
      table.boolean('isIngredient').notNullable()

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
