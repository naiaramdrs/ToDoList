import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Tarefa from 'App/Models/Tarefa'
import { DateTime } from 'luxon';

export default class TarefasController {
  public async index({ auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const tarefas = await auth.user!.related('tarefas').query();

    return tarefas;
  }

  public async store({ request, auth }: HttpContextContract) {
    const dados = request.only(['nome', 'data'])

    await auth.use('web').authenticate()

    const tarefa = await auth.user!.related('tarefas').create({
      nome: dados.nome,
      concluida: false,
      data: DateTime.fromISO(dados.data),
    })

    return tarefa
  }

  public async show({ params, auth }: HttpContextContract) {
    const tarefa = await Tarefa.findOrFail(params.id)

    await auth.use('web').authenticate()

    if (tarefa.idCriador !== auth.user!.id) {
      throw new Error("Usuário não autorizado.")
    }

    return tarefa
  }

  public async update({ request, auth }: HttpContextContract) {
    const body = request.only(['nome', 'concluida', 'data'])

    await auth.use('web').authenticate()

    const tarefaId = request.param('id')
    const tarefa = await Tarefa.findOrFail(tarefaId)

    if (tarefa.idCriador !== auth.user!.id) {
      throw new Error("Usuário não autorizado.")
    }

    await tarefa.merge({
      nome: body.nome,
      concluida: body.concluida,
      data: body.data ? DateTime.fromISO(body.data) : body.data
    }).save()

    return tarefa
  }

  public async destroy({ request, auth }: HttpContextContract) {
    await auth.use('web').authenticate()

    const tarefaId = request.param('id')
    const tarefa = await Tarefa.findOrFail(tarefaId)

    if (tarefa.idCriador !== auth.user!.id) {
      throw new Error("Usuário não autorizado.")
    }

    await tarefa.delete()

    return {}
  }
}
