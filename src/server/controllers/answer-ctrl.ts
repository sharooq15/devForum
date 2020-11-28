/*
Answer related API are implemented here
*/

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

export {
  writeAnswer
}