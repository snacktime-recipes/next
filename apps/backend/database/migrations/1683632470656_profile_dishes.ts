import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile_dishes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('profiles')
        .unsigned()
        .nullable()
        .references('profiles.id')
        .onDelete('CASCADE')
      
      table
        .integer('dishes')
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
