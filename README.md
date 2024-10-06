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
      "type": "credit"
    }
    ```


### Listar transações do usuário
### GET /transactions

 - Descrição: Retorna todas as transações associadas ao usuário que está fazendo a requisição (identificado por cookie).

 - Resposta:

    ```
    {
        "transactions": [
            {
                "id": "418156fa-e7b2-4dbc-a438-52d7e49a5293",
                "title": "Test transaction",
                "amount": -645,
                "created_at": "2024-10-05 23:23:57",
                "session_id": "5713b351-5aac-4dd7-8c14-d329a71d71dd"
            },
            {
                "id": "66e5414e-de7d-412c-b323-b7820173e6b5",
                "title": "Trasanction 2",
                "amount": 14645,
                "created_at": "2024-10-05 23:25:37",
                "session_id": "5713b351-5aac-4dd7-8c14-d329a71d71dd"
            }
        ]
    }
    ```

### Obter uma transação específica
### GET /transactions/:id

 - Descrição: Retorna os detalhes de uma transação específica, usando o ID.

 - Resposta:
    ```
    {
        "transaction": {
            "id": "418156fa-e7b2-4dbc-a438-52d7e49a5293",
            "title": "Trasanction 2",
            "amount": -645,
            "created_at": "2024-10-05 23:23:57",
            "session_id": "5713b351-5aac-4dd7-8c14-d329a71d71dd"
        }
    }
    ```
    
### Somar o valor total das transações
### GET /transactions/summary

- Descrição: Retorna a soma total de todas as transações do usuário.

 - Resposta:
    ```
    {
      "total": {
        "total": 14000
        }
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
