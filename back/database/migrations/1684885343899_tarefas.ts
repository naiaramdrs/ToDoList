import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tarefas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('idCriador', 'id_criador')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('id_criador', 'idCriador')
    })
  }
}
