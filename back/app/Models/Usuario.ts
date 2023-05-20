import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public nome: string

  @column()
  public sobrenome: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public senha: string

  @column()
  public genero: string

  @column.date()
  public dataNascimento: DateTime

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.senha) {
      user.senha = await Hash.make(user.senha)
    }
  }
}
