import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tarefas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('data', { useTz: true })
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('data')
    })
  }
}
