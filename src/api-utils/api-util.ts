import { v4 as UUIDv4 } from 'uuid';
import AWS from 'aws-sdk';
import { awsConfig, tableNames } from '../common';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';

AWS.config.update(awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const generateUUID = (): string => UUIDv4();

const getTableName = (input: string): string =>
  input === 'Question' ? tableNames.QUESTION : tableNames.ANSWER;

const getItemsFromQuestionTable = async (): Promise<ScanOutput> => {
  const params = {
    TableName: tableNames.QUESTION,
  };
  const responseItems = await docClient.scan(params).promise();
  return responseItems;
};
export { generateUUID, docClient, getTableName, getItemsFromQuestionTable };
