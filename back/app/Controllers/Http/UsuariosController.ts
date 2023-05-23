import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Usuario from 'App/Models/Usuario'
import { DateTime } from 'luxon'

const cadastroSchema = schema.create({
  nome: schema.string(),
  sobrenome: schema.string(),
  email: schema.string({}, [
    rules.email()
  ]),
  senha: schema.string({}, [
    rules.confirmed(),
    rules.minLength(6)
  ]),
  genero: schema.string(),
  dataNascimento: schema.string({}, [
    rules.regex(/\d{4}-\d{2}-\d{2}/) // YYYY-MM-DD
  ]),
})

const loginSchema = schema.create({
  email: schema.string({}, [
    rules.email()
  ]),
  senha: schema.string(),
})

const editarSchema = schema.create({
  nome: schema.string(),
  sobrenome: schema.string(),
})

export default class UsuariosController {
  public async cadastro({ request }: HttpContextContract) {
    const valores = await request.validate({ schema: cadastroSchema })

    // FIXME: sql solta uma exceção quando tem dois emails iguais
    const user = await Usuario.create({
      nome: valores.nome,
      sobrenome: valores.sobrenome,
      email: valores.email,
      password: valores.senha,
      genero: valores.genero,
      dataNascimento: DateTime.fromISO(valores.dataNascimento),
    })

    return {
      usuario: user.paraFront()
    }
  }

  public async login({ auth, request }: HttpContextContract) {
    const valores = await request.validate({ schema: loginSchema })

    await auth.use('web').attempt(valores.email, valores.senha)

    return {
      usuario: auth.user!.paraFront()
    }
  }

  public async info({ auth }: HttpContextContract) {
    await auth.use('web').authenticate();

    const user = auth.user!;

    return {
      usuario: {
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        dataNascimento: user.dataNascimento,
      }
    }
  }

  public async editar({ auth, request }: HttpContextContract) {
    const valores = await request.validate({ schema: editarSchema })

    await auth.use('web').authenticate()

    auth.user!.merge({
      nome: valores.nome,
      sobrenome: valores.sobrenome
    }).save();

    return {
      usuario: auth.user!.paraFront()
    }
  }
}
