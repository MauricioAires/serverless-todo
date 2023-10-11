# ![Cover](.github/assets/cover.png)

## Sobre o projeto

Serverless TODO criar e listar tarefas

Busca de dados utilizando index `src/functions/listTodo.ts`

## Tecnologias

- [Serverless](https://www.serverless.com/)
- [Dynamodb](https://www.serverless.com/guides/dynamodb)
- [Serverless Offline](https://www.serverless.com/plugins/serverless-offline)

## Instalação

```sh
yarn
```

## Comandos

```bash
# Criar projeto
$ serverless create --template [template] --path [project-name]
$ serverless create --template aws-nodejs-typescript --path serverless-todo

# Executar lambas em modo de desenvolvimento localmente
$ serverless offline

# instalar o dynamodb localmente
$ serverless dynamodb install

# Executar o dynamodb localmente
$ serverless dynamodb start

```

## Contribuição

Contribuições são bem-vindas! Para contribuir, basta abrir uma issue ou pull request neste repositório.

## Autor

Feito por Mauricio Aires 👋🏽
