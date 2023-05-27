A API desse projeto é voltada somente para a utilização no front. Portanto, utiliza-se de cookies como forma de autenticação, então devem ser guardados entre requests.

# Usuário

## Objeto do usuário
Utilizado em várias rotas, isso é uma representação em JSON do usuário.
| chave | tipo | extra |
|-|-|-|
|id|number|
|nome|string|
|sobrenome|string|
|email|string|
|genero|string|
|data_nascimento|string| No formato `YYYY-MM-DD`, onde Y é ano, M é mês e D é dia. |
|foto_perfil|string| URL da foto de perfil relativo a url da api. Pode ser `null` |

---

## POST - Cadastrar usuário
> `/api/usuario/cadastro`

Cadastra um novo usuário no sistema.

Essa rota retorna cookies que autenticam o usuário nas outras rotas.

### Request Body
Os dados devem ser enviados no formato `application/json`
| chave | tipo | extra |
|-|-|-|
|nome|string|
|sobrenome|string|
|email|string|
|senha|string| Tem tamanho 6 no minimo. |
|senha_confirmation|string| acho que vou tirar esse
|genero|string|
|dataNascimento|string| No formato `YYYY-MM-DD`, onde Y é ano, M é mês e D é dia. |

### Response
[Objeto do usuário](#objeto-do-usuário)

---

## POST - Login usuário
> `/api/usuario/login`

Essa rota retorna cookies que autenticam o usuário nas outras rotas.

### Request Body
Os dados devem ser enviados no formato `application/json`.

| chave | tipo | extra |
|-|-|-|
|email|string|
|senha|string|

### Response
[Objeto do usuário](#objeto-do-usuário)

---

## GET - Informações do usuário
> `/api/usuario/info`

Essa rota retorna informações sobre o usuário que está autenticado no momento.

### Response
[Objeto do usuário](#objeto-do-usuário)

---

## POST - Editar usuário
> `/api/usuario/editar`

### Request Body
Os dados devem ser enviados no formato `application/json`.

| chave | tipo | extra |
|-|-|-|
|nome|string?| Opcional.
|sobrenome|string?| Opcional.
|dataNascimento|string?| Opcional. No formato `YYYY-MM-DD`
|genero|string?| Opcional.

### Response
[Objeto do usuário](#objeto-do-usuário)

---

## POST - Fazer logout
> `/api/usuario/logout`

Essa rota faz logout do usuário autenticado

---

## POST - Upload de foto de perfil
> `/api/usuario/upload_foto`

### Request Body
Os dados devem ser enviados no formato `multipart/form-data`.

| chave | tipo | extra |
|-|-|-|
|foto|File| A foto dever ser em formato jpg ou png, e ser menor do que 2mb. |

### Response
Retorna a url da foto, relativo a url da api.
```json
{
    "url": "/uploads/algumacoisa.png?signature=asoidjsaoisjads"
}
```

---

# Tarefas

Todas as rotas da api de tarefas necessitam de um usuário autenticado.

## Objeto de tarefa
Utilizado em várias rotas, isso é uma representação em JSON da tarefa.
| chave | tipo | extra |
|-|-|-|
|id|number|
|nome|string|
|concluida|boolean|
|data|string| No formato `YYYY-MM-DD`, onde Y é ano, M é mês e D é dia.

---

## POST - Criar uma tarefa
> `/api/tarefas`

Deleta uma tarefa do usuário pelo seu id.

### Request Body
Os dados devem ser enviados no formato `application/json`.

| chave | tipo | extra |
|-|-|-|
|nome|string|
|data|string| No formato `YYYY-MM-DD`

### Response
[Objeto de tarefa](#objeto-de-tarefa)

---

## GET - Listar todas as tarefas
> `/api/tarefas`

Lista todas as tarefas do usuário.

### Response
Uma array de [Objeto de tarefa](#objeto-de-tarefa)

---

## GET - Listar tarefa
> `/api/tarefas/:id`

Mostra uma tarefa do usuário pelo seu id.

### Response
[Objeto de tarefa](#objeto-de-tarefa)

---

## DELETE - Deletar uma tarefa
> `/api/tarefas/:id`

Deleta uma tarefa do usuário pelo seu id.

---

## PUT - Atualizar uma tarefa
> `/api/tarefas/:id`

Atualiza uma tarefa existente pelo id.

### Request Body
Os dados devem ser enviados no formato `application/json`.

| chave | tipo | extra |
|-|-|-|
|nome|string?| Opcional.
|concluida|boolean?| Opcional.
|data|string?| Opcional. No formato `YYYY-MM-DD`

### Response
[Objeto de tarefa](#objeto-de-tarefa)