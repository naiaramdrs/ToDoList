import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tarefas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('idCriador')//.notNullable().references('id').inTable('usuarios').onUpdate('CASCADE')
      table.string('criado_por')//.notNullable().references('nome').inTable('usuarios')
      table.string('nome_tarefa').notNullable()
      table.string('descricao').nullable()
      table.boolean('tarefa_concluida')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
