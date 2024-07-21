# Desafio Smart Back End

Este é um aplicativo back-end construído com NodeJS, TypeScript, ExpressJS, TypeORM, e PostgreSQL. Aqui você pode ver informações detalhadas sobre a instalação, execução, estrutura do projeto, contribuição e licença.

## Índice
--------

* **Instalação**: Fornece os comandos para clonar o repositório e instalar as dependências.
* **Executando o Projeto**: Explica como iniciar o projeto em modo de desenvolvimento.
* **Estrutura do Projeto**: Descreve a organização das pastas e arquivos do projeto.
* **Contribuição**: Orientações para contribuir com o projeto.
* **Licença**: Especifica a licença do projeto.


## Instalação
------------

Para começar a trabalhar com o projeto, você precisa clonar o repositório e instalar as dependências.

### Requisitos

* Node.js 14 ou superior
* PostgreSQL 15.7 ou superior

### Passos

1. **Clone o repositório:**

`git clone git clone https://bitbucket.org/fernandoforastieri/smart-desafio-back-end/src/main/`

2. **Navegue até o diretório do projeto:**

`cd nome do diretorio`

3. **Instale as dependências:**

`npm install`

### Criação e Configuração do Banco de Daos

1. **Crie e configure o arquivo ENV:**

Comando para criar o arquivo .ENV, onde estao as variaveis de ambiente da aplicação, a partir de um exemplo pré feito ja disponibilizado

`cp env.example`

Modifique a pasta de acordo com a necessidade do banco:

```
DB_USER=
DB_HOST=localhost
DB_NAME=shopping_cart
DB_PASS=
DB_PORT=5432
PORT=3001
```
2. **Crie um Novo Banco de Dados**

`CREATE DATABASE shopping_cart`

3. **Criando as Tabelas do Banco de Dados**

`npm run migrate`

4. **Populando o Banco de Dados**

`npm run seed`

## Executando o Projeto
------------

Para iniciar o projeto, use o comando abaixo. Isso iniciará o servidor de desenvolvimento e abrirá o aplicativo em seu navegador padrão.

`npm run start`

O aplicativo será acessível em http://localhost:3001.

## Executando o Projeto Back End
------------

O projeto possui os dados para a parte Front End do Desafio, ambos precisam estar funcionando ao mesmo tempo, voce pode encontrar o repositorio front end e como inicia-lo aqui: [Desafio Front End](https://bitbucket.org/fernandoforastieri/smart-desafio-front-end/src/main/)


## Estrutura do Projeto
---------------------

Aqui está uma visão geral da estrutura do projeto:

* **scripts/**: Contém arquivos importante para a configuração do Banco de Dados.
* **src/**: Contém o código-fonte do projeto, incluindo:
	+ Config: Arquivos de configuração que são utilizados para definir parâmetros.
	+ Controllers: Contem todos os arquivos que controlam a aplicação.
	+ Models: Estrutura dos dados e interagem diretamente com o banco de dados.
	+ Routes: São responsáveis por definir os endpoints da aplicação
	+ Services: São responsáveis por encapsular a lógica de negócios da aplicação.
* **app.ts**: Ponto de entrada da aplicação Express. Ele configura e inicializa o servidor, define middleware, e configura as rotas da aplicação.
* **.gitignore**: Especifica quais arquivos e pastas devem ser ignorados pelo Git.
* **package.json**: Gerencia as dependências e scripts do projeto.
* **tsconfig.json**: Configurações do TypeScript.
* **README.md**: Documentação do projeto.
* **ENV.example**: Exemplo para uma estrutura e valores padrão para as variáveis de ambiente.

## Contribuição
-------------

Se você deseja contribuir para o projeto, siga as etapas abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
3. Faça suas alterações e adicione commits (git commit -am 'Adiciona nova funcionalidade').
4. Envie sua branch para o repositório remoto (git push origin feature/nova-funcionalidade).
5. Abra um Pull Request.

## Licença
---------

Este projeto está licenciado sob a MIT License.