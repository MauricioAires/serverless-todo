import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "serverless-todo",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-dynamodb", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {
    createTodo: {
      handler: "src/functions/createTodo.handler",
      events: [
        {
          http: {
            path: "todo",
            method: "post",
            cors: true,
          },
        },
      ],
    },
    listTodo: {
      handler: "src/functions/listTodo.handler",
      events: [
        {
          http: {
            path: "todo/{user_id}",
            method: "get",
            cors: true,
          },
        },
      ],
    },
  },
  package: { individually: false },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
  },
  resources: {
    Resources: {
      dbUsersTodo: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "users_todo",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5, // Requisições por segundo
            WriteCapacityUnits: 5, // Inserções por segundo
          },
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "user_id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "userIdIndex",
              KeySchema: [
                {
                  AttributeName: "user_id",
                  KeyType: "HASH",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
