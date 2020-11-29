/*
Answer related API are implemented here
*/

import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { docClient, generateUUID } from '../../api-utils';

import { tableNames } from '../../common';

type WriteAnswerRequest = {
  body: {
    text: string;
    questionId: string;
    questionOwnerId: string;
  };
};

type AnswerDetails = {
  id: string;
  text: string;
};

type Answer = {
  id: string;
  text: string;
  questionId: string;
  votes: number;
  comments: string[];
};

type MarkAnswerAsCorrectRequest = {
  body: {
    answerId: string;
    currentUserId: string;
  };
};

type ViewExistingAnswersRequest = {
  body: {
    questionId: string;
  };
};

const writeAnswer = async (
  req: WriteAnswerRequest,
  res: any
): Promise<boolean> => {
  const {
    body: { text, questionId, questionOwnerId },
  } = req;
  const response: AnswerDetails = {
    id: generateUUID(),
    text,
  };
  try {
    const input = {
      id: response.id,
      t: text,
      qId: questionId,
      uId: questionOwnerId,
      /* NOTE: I'm making the isCorrect status to be  false by default as the question creator should mark it correct.
      and comments to empty array followed by votes to 0
      */
      isC: false,
      c: [],
      vt: 0,
    };
    const params = {
      TableName: tableNames.ANSWER,
      Item: input,
    };
    await docClient.put(params).promise();
  } catch (e) {
    console.log('Error Creating Question Record', e);
    res.send('Error Creating Question Record');
    return false;
  }
  if (res) {
    res.send(response);
  }
  return true;
};

const markAnswerAsCorrect = async (
  req: MarkAnswerAsCorrectRequest,
  res: any
): Promise<boolean> => {
  const {
    body: { answerId, currentUserId },
  } = req;
  try {
    const params = {
      TableName: tableNames.ANSWER,
      Key: {
        id: answerId,
      },
    };
    const responseItem: GetItemOutput = await docClient.get(params).promise();
    const {
      Item: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        uId,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        qId,
      },
    } = responseItem;
    if (uId === currentUserId) {
      const markAnswerAsCorrectParams = {
        TableName: tableNames.ANSWER,
        Key: {
          id: answerId,
        },
        UpdateExpression: 'set isC = :isC',
        ExpressionAttributeValues: {
          ':isC': true,
        },
        ReturnValues: 'UPDATED_NEW',
      };

      const markQuestionAsAnsweredParams = {
        TableName: tableNames.QUESTION,
        Key: {
          id: qId,
        },
        UpdateExpression: 'set anS = :anS',
        ExpressionAttributeValues: {
          ':anS': true,
        },
        ReturnValues: 'UPDATED_NEW',
      };

      await docClient.update(markAnswerAsCorrectParams).promise();
      await docClient.update(markQuestionAsAnsweredParams).promise();
      if (res) {
        res.send('Successfully Marked the Answer As Correct');
      }
    } else {
      if (res) {
        res.send('Only Owners Can Mark Answer As Correct');
      }
    }
  } catch (e) {
    console.log('Error Marking Answer as correct', e);
    console.log('Error Marking Answer as Correct');
    return false;
  }
  return true;
};

const viewExistingAnswers = async (
  req: ViewExistingAnswersRequest,
  res: any
): Promise<boolean> => {
  const {
    body: { questionId },
  } = req;
  try {
    const params = {
      TableName: tableNames.ANSWER,
      FilterExpression: 'qId = :qId',
      ExpressionAttributeValues: {
        ':qId': questionId,
      },
    };
    const responseItems = await docClient.scan(params).promise();
    const answers: Answer[] | undefined = responseItems.Items?.map((item) => {
      const answer: Answer = {
        id: item.id,
        text: item.t,
        questionId: item.qId,
        votes: item.vt,
        comments: item.c,
      };
      return answer;
    });
    if (res && answers && answers.length) {
      res.send(answers);
    } else if (res) {
      res.send('There are no existing answers');
    }
  } catch (e) {
    console.log('Error Getting the Answers for the Question', e);
    res.send('Error getting the Answers for the Question');
    return false;
  }
  return true;
};

export { writeAnswer, markAnswerAsCorrect, viewExistingAnswers };
