import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Tarefa extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public idCriador: number

  @belongsTo(() => Usuario, {
    localKey: 'idCriador',
  })
  public criador: BelongsTo<typeof Usuario>

  @column()
  public nome: string

  @column()
  public descricao: string

  @column()
  public concluida: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
