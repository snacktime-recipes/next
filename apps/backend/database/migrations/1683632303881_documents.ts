import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('type').notNullable() // purchaced, cooked, thrown
      table.integer('number').notNullable()
      table.integer('income').notNullable() // +1 || -1
      table.string('description')

      table
        .integer('profile_id')
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
