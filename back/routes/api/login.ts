import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const loginSchema = schema.create({
  email: schema.string({}, [
    rules.email()
  ]),
  senha: schema.string(),
})

Route.post('/api/login', async ({ auth, request }) => {
  const valores = await request.validate({ schema: loginSchema })

  await auth.use('web').attempt(valores.email, valores.senha)

  return auth.user!;
})
