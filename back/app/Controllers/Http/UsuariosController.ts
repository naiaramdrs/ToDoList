import { Exception } from '@adonisjs/core/build/standalone'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
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
    rules.minLength(6),
    rules.maxLength(25),
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
  nome: schema.string.optional(),
  sobrenome: schema.string.optional(),
  dataNascimento: schema.string.optional({}, [
    rules.regex(/\d{4}-\d{2}-\d{2}/) // YYYY-MM-DD
  ]),
  genero: schema.string.optional(),
})

export default class UsuariosController {
  public async cadastro({ request, auth }: HttpContextContract) {
    const valores = await request.validate({ schema: cadastroSchema })

    try {
      const user = await Usuario.create({
        nome: valores.nome,
        sobrenome: valores.sobrenome,
        email: valores.email,
        password: valores.senha,
        genero: valores.genero,
        dataNascimento: DateTime.fromISO(valores.dataNascimento),
      })

      await auth.use('web').login(user)

      return user
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        throw new Exception('Email já existe!', 400, 'E_EMAIL_EXISTE');
      } else {
        throw err;
      }
    }
  }

  public async login({ auth, request }: HttpContextContract) {
    const valores = await request.validate({ schema: loginSchema })

    await auth.use('web').attempt(valores.email, valores.senha)

    return auth.user!
  }

  public async info({ auth }: HttpContextContract) {
    await auth.use('web').authenticate();

    return auth.user!
  }

  public async editar({ auth, request }: HttpContextContract) {
    const valores = await request.validate({ schema: editarSchema })

    await auth.use('web').authenticate()

    await auth.user!.merge({
      nome: valores.nome,
      sobrenome: valores.sobrenome,
      dataNascimento: valores.dataNascimento ? DateTime.fromISO(valores.dataNascimento) : undefined,
      genero: valores.genero
    }).save();

    return auth.user!
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('web').logout()

    return {}
  }

  public async uploadFoto({ auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()

    const foto = request.file('foto', {
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png']
    })

    if (!foto || !foto.isValid) {
      return {
        errors: ['IMG_INVALIDA']
      }
    }

    auth.user!.fotoPerfil = Attachment.fromFile(foto)

    // necessario para que o Attachment não de erro dps,
    // mas tambem para salvar os dados no banco de dados
    await auth.user!.save()

    return {
      url: await auth.user!.fotoPerfil!.getSignedUrl()
    }
  }
}
