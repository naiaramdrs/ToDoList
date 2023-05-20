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
})

Route.post('/api/cadastro', async ({ request }) => {
  const valores = await request.validate({ schema: cadastroSchema })

  const user = await Usuario.create({
    nome: valores.nome,
    sobrenome: valores.sobrenome,
    email: valores.email,
    senha: valores.senha,
    genero: 'Ok',
    dataNascimento: DateTime.now()
  })

  return {
    id: user.id,
  }
})
