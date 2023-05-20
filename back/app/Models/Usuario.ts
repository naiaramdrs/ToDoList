import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
