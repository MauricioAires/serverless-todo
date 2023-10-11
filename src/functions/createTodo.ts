import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../libs/dynamodb";

interface ICreateTodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { deadline, done, id, title, user_id } = JSON.parse(
    event.body,
  ) as ICreateTodo;

  await document
    .put({
      TableName: "users_todo",
      Item: {
        deadline: new Date(deadline).toISOString(),
        done,
        id,
        title,
        user_id,
      },
    })
    .promise();

  const response = await document
    .query({
      TableName: "users_todo",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  const createdTodo = response.Items[0];

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo created successfully",
      data: createdTodo,
    }),
  };
};
