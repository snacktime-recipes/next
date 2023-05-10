import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dishes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.text('description').nullable()
      table.integer('cookTime')
      table.float('cookDifficulty')
      table.boolean('isPrivate')
      table.boolean('isIngredient')

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

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
