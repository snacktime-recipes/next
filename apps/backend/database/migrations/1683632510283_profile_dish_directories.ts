import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile_dish_directories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('profile_dish_id')
        .unsigned()
        .references('profile_dishes.id')
        .onDelete('CASCADE')
      
      table
        .integer('directory_id')
        .unsigned()
        .references('directories.id')
        .onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
