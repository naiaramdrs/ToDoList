import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tarefas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('criadoPor')

      table
        .renameColumn('nomeTarefa', 'nome')
        .renameColumn('tarefaConcluida', 'concluida')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('criadoPor')

      table
        .renameColumn('nome', 'nomeTarefa')
        .renameColumn('concluida', 'tarefaConcluida')
    })
  }
}
