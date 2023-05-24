import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Tarefa extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
