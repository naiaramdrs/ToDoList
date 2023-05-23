import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Tarefa extends BaseModel {

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public idCriador: number

  @column()
  public criadoPor: string

  @column()
  public nomeTarefa: string

  @column()
  public descricao: string

  @column()
  public tarefaConcluida: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Usuario, {
    localKey: 'criadoPor',
  })
  
  public criador: BelongsTo<typeof Usuario>
  
}
