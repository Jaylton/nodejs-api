# Transaction API

Esta é uma API simples construída com Node.js, Fastify e Knex para gerenciar transações. A API permite criar transações, listar transações de um usuário por meio de cookies, obter uma transação específica pelo ID e calcular o valor total de transações.

## Funcionalidades

- **Criar transação:** Cria uma nova transação no banco de dados.
- **Listar transações do usuário:** Retorna todas as transações associadas a um usuário, identificado por cookies.
- **Obter transação específica:** Retorna os detalhes de uma transação específica, usando o ID.
- **Somar valor total das transações:** Calcula e retorna a soma total de todas as transações.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Knex.js](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/) (ou qualquer outro banco de dados suportado pelo Knex)
- [Vitest](https://vitest.dev/) (para testes)

## Instalação

1. Clone o repositório:

   ```
   git clone https://github.com/seu-usuario/transaction-api.git
   ```
   
2. Acesse a pasta do projeto:

    ```
    cd transaction-api
    ```

3. Instale as dependências:

    ```
    npm install
    ```

4. Execute as migrações do banco de dados:

    ```
    npx knex migrate:latest
    ```

## Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados.
1. Crie o arquivo .env (ou copie do .env.example como base):

    ```
    cp .env.example .env
    ```
2. Crie o arquivo .env.test (ou copie do .env.example como base):

    ```
    cp .env.example .env.test
    ```
3. Configure as variáveis de ambiente no .env.test para corresponder ao seu ambiente de testes. Um exemplo de configuração para o SQLite:

    ```
    DATABASE_URL="./db/test.db"
    ```

## Uso
1. Inicie o servidor de desenvolvimento:

    ```
    npm run dev
    ```
2. A API estará disponível em http://localhost:3000.

## Endpoints
### Criar uma transação
### POST /transactions

 - Descrição: Cria uma nova transação.

 - Body Exemplo:

    ```
    {
      "title": "Compra no supermercado",
      "amount": 150.75,
      "type": "expense"
    }
    ```

 - Resposta:

    ```
    {
      "id": 1,
      "title": "Compra no supermercado",
      "amount": 150.75,
      "type": "expense",
      "created_at": "2024-10-05T12:00:00.000Z"
    }
    ```

### Listar transações do usuário
### GET /transactions

 - Descrição: Retorna todas as transações associadas ao usuário que está fazendo a requisição (identificado por cookie).

 - Resposta:

    ```
    [
      {
        "id": 1,
        "title": "Compra no supermercado",
        "amount": 150.75,
        "type": "expense",
        "created_at": "2024-10-05T12:00:00.000Z"
      },
      {
        "id": 2,
        "title": "Salário",
        "amount": 3000.00,
        "type": "income",
        "created_at": "2024-10-01T09:30:00.000Z"
      }
    ]
    ```

### Obter uma transação específica
### GET /transactions/:id

 - Descrição: Retorna os detalhes de uma transação específica, usando o ID.

 - Resposta:
    ```
    {
      "id": 1,
      "title": "Compra no supermercado",
      "amount": 150.75,
      "type": "expense",
      "created_at": "2024-10-05T12:00:00.000Z"
    }
    ```
    
### Somar o valor total das transações
### GET /transactions/total

- Descrição: Retorna a soma total de todas as transações do usuário.

 - Resposta:
    ```
    {
      "totalAmount": 3150.75
    }
    ```

## Testes
Os testes foram implementados utilizando o Vitest. Para rodar os testes:
1. Execute o comando:
    ```
    npm run test
    ```

2. Para rodar os testes com watch (testes em tempo real durante o desenvolvimento):
    ```
    npm run test:watch
    ```
