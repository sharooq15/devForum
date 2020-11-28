import { v4 as UUIDv4 } from 'uuid'
import AWS from 'aws-sdk';
import { 
  awsConfig, 
  tableNames
} from '../common'

AWS.config.update(awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const generateUUID = (): string => UUIDv4();

const getTableName = (input: string): string => input === 'Question' ? tableNames.QUESTION: tableNames.ANSWER

export { 
  generateUUID,
  docClient,
  getTableName,
}