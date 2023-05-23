import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tarefas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('criado_por')

      table
        .renameColumn('nome_tarefa', 'nome')
        .renameColumn('tarefa_concluida', 'concluida')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('criado_por')

      table
        .renameColumn('nome', 'nome_tarefa')
        .renameColumn('concluida', 'tarefa_concluida')
    })
  }
}
