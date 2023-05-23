import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/usuario/cadastro', 'UsuariosController.cadastro')
Route.post('/api/usuario/login', 'UsuariosController.login')
