# Desafio Técnico

Criar uma aplicação Full Stack para gestão de telecomunicações, onde seja possível gerenciar contratos de operadoras, faturas e consumo de telecom, utilizando .NET Core, Angular e boas práticas de desenvolvimento.

## Tecnologias Utilizadas

### Back-end (backend)

- ASP.NET Core Web API (.NET 8)
- C#
- Entity Framework Core (InMemoryDatabase)
- AutoMapper
- Arquitetura MVC com uso de DTOs e Services
- Swagger para documentação e testes de API
- CORS configurado para Angular
- Front-end Angular embutido na pasta `wwwroot`

### Front-end (frontend)

- Angular 19+
- Angular Material 19.2.18

### Banco de Dados (database)

- EF Core InMemoryDatabase (persistência temporária durante execução)
- Estrutura original pensada para Oracle 21c XE

## Funcionalidades

- Listagem de Operadoras com opção de ordenação por coluna
- Adicionar, visualizar, editar e excluir Operadora
- Listagem de Contratos de acordo com a Operadora selecionada
- Adicionar, visualizar, editar e excluir Contratos

## Como executar o projeto

### 1. Clone o repositório

```
git clone https://github.com/alexgikeda/desafio-tecnico.git
```

