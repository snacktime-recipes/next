import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile_dish_directories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('profile_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')
        .notNullable()
      
      table
        .integer('dish_id')
        .unsigned()
        .references('dishes.id')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('directory_id')
        .unsigned()
        .references('directories.id')
        .onDelete('CASCADE')
        .notNullable()
      
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
