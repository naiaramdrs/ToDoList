import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Tarefa from './Tarefa'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column()
  public nome: string

  @column()
  public sobrenome: string

  @column()
  public email: string

  @column({ serializeAs: null, columnName: 'senha' })
  public password: string

  @column()
  public genero: string

  @column.date()
  public dataNascimento: DateTime

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Tarefa, {
    foreignKey: 'idCriador'
  })
  public tarefas: HasMany<typeof Tarefa>

  @attachment({ preComputeUrl: true, serializeAs: null })
  public fotoPerfil: AttachmentContract | null

  // a biblioteca de attachment não respeita o metodo serialize, então utilizamos
  // uma propriedade computada como alternativa.
  @computed({ serializeAs: 'foto_perfil' })
  public get computedFotoPerfilUrl() {
    return this.fotoPerfil ? this.fotoPerfil.url.replace(/^\/api/, '') : this.fotoPerfil;
  }
}
