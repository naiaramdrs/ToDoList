import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
  // ignorando os valores, por enquanto
  await request.validate({ schema: cadastroSchema })
  return {}
})
