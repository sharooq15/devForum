/*
Answer related API are implemented here
*/

import { GetItemOutput } from "aws-sdk/clients/dynamodb";
import { 
  docClient,
  generateUUID 
} from "../../api-utils";

import { 
  tableNames 
} from "../../common";

type WriteAnswerRequest = {
  body:{
    text: string,
    questionId: string,
    questionOwnerId: string,
  }
}

type AnswerDetails = {
  id: string,
  text: string,
}

type MarkAnswerAsCorrectRequest = {
  body: {
    answerId: string,
    currentUserId: string,
  }
}

const writeAnswer = async (
  req: WriteAnswerRequest, 
  res: any
): Promise<boolean> => {
  const {
    body: {
      text,
      questionId,
      questionOwnerId
    }
  } = req;
  const response: AnswerDetails = {
    id: generateUUID(),
    text,
  }
  try{
    const input = {
      "id": response.id,
      "t": text,
      "qId": questionId,
      "uId": questionOwnerId,
      /* NOTE: I'm making the isCorrect status to be  false by default as the question creator should mark it correct.
      and comments to empty array followed by votes to 0
      */
      "isC": false,
      "c": [],
      "vt": 0
    };
    const params = {
      TableName: tableNames.ANSWER,
      Item: input
    };
    await docClient.put(params).promise();
  }catch(e){
    console.log('Error Creating Question Record', e);
  }
  if(res){
    res.send(response);
  }
  return true;
}

const markAnswerAsCorrect = async(
  req:MarkAnswerAsCorrectRequest,
  res: any
): Promise<boolean> => {
  const {
    body: {
      answerId,
      currentUserId,
    }
  } = req
  try{
    const params = {
      TableName : tableNames.ANSWER,
      Key: {
        id: answerId
      }
    };
    const responseItem: GetItemOutput = await docClient.get(params).promise();
    const {
      Item:{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 
        uId, qId
      }
    } = responseItem;
    if(uId === currentUserId){
      const markAnswerAsCorrectParams = {
        TableName: tableNames.ANSWER,
        Key: {
          "id": answerId,
        },
        UpdateExpression: "set isC = :isC",
        ExpressionAttributeValues: {
          ":isC": true,
        },
        ReturnValues: "UPDATED_NEW"
      };

      const markQuestionAsAnsweredParams = {
        TableName: tableNames.QUESTION,
        Key: {
          "id": qId,
        },
        UpdateExpression: "set anS = :anS",
        ExpressionAttributeValues: {
          ":anS": true,
        },
        ReturnValues: "UPDATED_NEW"
      };

      await docClient.update(markAnswerAsCorrectParams).promise();
      await docClient.update(markQuestionAsAnsweredParams).promise();
      if(res){
        res.send('Successfully Marked the Answer As Correct')
      }
    } else{
      if(res){
        res.send('Only Owners Can Mark Answer As Correct')
      }
    }
  }catch(e){
    console.log('Error Marking Answer as correct', e);
  }
  return true;
}
export {
  writeAnswer,
  markAnswerAsCorrect,
}