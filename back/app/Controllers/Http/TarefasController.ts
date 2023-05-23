import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Tarefa from 'App/Models/Tarefa'
import Usuario from 'App/Models/Usuario'
import Database from '@ioc:Adonis/Lucid/Database';


export default class TarefasController {
  public async index({}: HttpContextContract) {
    const tarefas = await Tarefa.all()
    return tarefas;

  }

  public async store({request, auth}: HttpContextContract) {
    const dados = request.only(['criadoPor', 'nomeTarefa', 'descricao'])

    const tarefa = await Tarefa.create({
      //idCriador: auth.user?.id,
      criadoPor: dados.criadoPor,
      nomeTarefa: dados.nomeTarefa,
      descricao: dados.descricao
    })

    return tarefa
  }

  public async show({params}: HttpContextContract) {
    const tarefa = await Tarefa.findOrFail(params.id)

    return tarefa
  }

  public async update({request, auth}: HttpContextContract) {
    const body = request.only(['nomeTarefa', 'descricao', 'tarefa_concluida'])
    //const idCriador = auth.user?.id
    const tarefaId = request.param('id')
    const tarefa = await Tarefa.findOrFail(tarefaId)

    await tarefa.merge(body).save()
    return tarefa
  }

  public async destroy({request}: HttpContextContract) {
    const tarefaId = request.param('id')
    const tarefa = await Tarefa.findOrFail(tarefaId)

    await tarefa.delete()
  }
}
