import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/usuario/cadastro', 'UsuariosController.cadastro')
Route.post('/api/usuario/login', 'UsuariosController.login')
Route.get('/api/usuario/info', 'UsuariosController.info')
Route.post('/api/usuario/editar', 'UsuariosController.editar')
Route.post('/api/usuario/logout', 'UsuariosController.logout')
Route.post('/api/usuario/upload_foto', 'UsuariosController.uploadFoto')

Route.resource('/api/tarefas/', 'TarefasController').apiOnly()
