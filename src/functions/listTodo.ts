import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../libs/dynamodb";

interface ITodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  // http://localhost:3000/todo/{user_id}
  const { user_id } = event.pathParameters;

  const response = await document
    .query({
      IndexName: "userIdIndex",
      TableName: "users_todo",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
      ScanIndexForward: false,
    })
    .promise();

  const todos = response.Items as ITodo[];

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};
