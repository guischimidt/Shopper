<table>
  <tr>
    <td><h1>Teste Técnico Shopper</h1></td>
  </tr>
</table>

## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto

É uma ferramenta desenvolvida com o intuito de realizar a atualização em massa dos preços dos produtos cadastrados. <br />
Esta aplicação conta com recursos adicionais para evitar erros que possam prejudicar o negócio.<br />
É composta por um backend em __Node.js__ e um frontend em __React__, ambos com a utilização de __Typescript__.<br />
A API trabalha com banco de dados __MySQL__.<br />
<br />

### Rotas da API

| Método | Caminho da Rota | Descrição da Rota |
|---|---|---|
| POST | /api/upload-csv | Recebe um arquivo CSV com uma Key "csvFile" e faz sua validação |
| POST| /api/update-prices | Realiza a atualização massiva dos preços no BD |



## :hammer_and_wrench: Tecnologias
* Back-end
  * __Node.js__
  * __Sequelize ORM__ para acessar o banco
  * __Cors__ para liberar acesso à API
  * __Multer__ para fazer upload do CSV
  * __Jest__ para realização de testes
* Front-end
  * __React__
  * __React-Router-DOM__ para rotas
  * __Axios__ para acessar API
  * __Material UI__ para criação dos componentes visuais


## :car: Iniciando a aplicação
Baixe o repositório com git clone e entre na pasta do projeto.
```bash
$ git clone https://github.com/guischimidt/Shopper
```


### __Back-end__
  Na pasta backend, instale as dependências
```bash
$ cd backend
$ npm install
```
Crie um arquivo na raiz da pasta com o nome .env e defina as seguintes variáveis:

```bash
DB_HOST=Seu host
DB_USERNAME=usuário do banco de dados
DB_PASSWORD=senha do banco de dados
DB_DATABASE=tabela do banco de dados
```
Por fim, inicie o servidor
```bash
$ npm start
```
### __Front-end__
  Na pasta frontend, instale as dependências.
```bash
$ cd ..
$ cd frontend
$ npm install
```
Crie um arquivo na raiz da pasta com o nome .env e defina as seguintes variáveis:

```bash
VITE_API_URL=Caminho base da sua api
```
Por fim, realize a build para subir seu Front-end
```bash
$ npm run build
```