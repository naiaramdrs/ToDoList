import Route from '@ioc:Adonis/Core/Route'
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

Route.post('/api/cadastro', async ({ request }) => {
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
})
