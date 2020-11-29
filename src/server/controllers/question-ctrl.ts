/* eslint-disable @typescript-eslint/ban-ts-comment */
/* NOTE: All the Changes required for the question flow to work will be here i.e
- Create a Question
- Listing the Question
- Marking the correct answer for the questions
- Creating the question comment
*/
import {
  generateUUID,
  docClient,
  getItemsFromQuestionTable,
} from '../../api-utils';
import { tableNames } from '../../common';

type CreateQuestionRequest = {
  body: {
    stem: string;
    description: string;
    ownerId: string;
    tags?: string[];
  };
};

type QuestionDetails = {
  id: string;
  stem: string;
  description: string;
  ownerId: string;
};

type Question = {
  id: string;
  stem: string;
  description: string;
  votes: number;
  comments: string[];
  tags: string[];
};

type AddTagRequest = {
  body: {
    questionId: string;
    tags: string[];
  };
};

type GetQuestionsByTag = {
  body: {
    tag: string;
  };
};

const createQuestion = async (
  req: CreateQuestionRequest,
  res: any
): Promise<boolean> => {
  const {
    body: { stem, description, ownerId, tags },
  } = req;
  const response: QuestionDetails = {
    id: generateUUID(),
    stem,
    description,
    ownerId,
  };
  try {
    const input = {
      id: response.id,
      t: stem,
      d: description,
      uId: ownerId,
      /* NOTE: I'm making the answered status of the question false by default as no questions can be answerd during its creation.
      and comments to empty array followed by votes to 0
      */
      anS: false,
      c: [],
      vt: 0,
      tgs: tags || [],
    };
    const params = {
      TableName: tableNames.QUESTION,
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

const addQuestionTags = async (
  req: AddTagRequest,
  res: any
): Promise<boolean> => {
  const {
    body: { questionId, tags },
  } = req;
  try {
    const params = {
      TableName: tableNames.QUESTION,
      Key: {
        id: questionId,
      },
      UpdateExpression:
        'set tgs = list_append(if_not_exists(tgs, :empty_list), :tgs)',
      ExpressionAttributeValues: {
        ':empty_list': [],
        ':tgs': tags,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    await docClient.update(params).promise();
    if (res) {
      res.send(`Successfully added question tags for ${questionId}`);
    }
  } catch (e) {
    console.log('Error Tagging Question', e);
    res.send('Error Tagging Question');
    return false;
  }
  return true;
};

const viewUnAnsweredQuestions = async (
  req: null,
  res: any
): Promise<boolean> => {
  try {
    const params = {
      TableName: tableNames.QUESTION,
      FilterExpression: 'anS = :anS',
      ExpressionAttributeValues: {
        ':anS': false,
      },
    };
    const responseItems = await docClient.scan(params).promise();
    const questions: Question[] | undefined = responseItems.Items?.map(
      (item) => {
        const question: Question = {
          id: item.id,
          stem: item.t,
          description: item.d,
          votes: item.vt,
          comments: item.c,
          tags: item.tgs,
        };
        return question;
      }
    );
    if (res && questions && questions.length) {
      res.send(questions);
    } else if (res) {
      res.send('All the questions are answered');
    }
  } catch (e) {
    console.log('Error Getting Question', e);
    res.send('Error Getting Question');
    return false;
  }
  return true;
};

const getQuestionsByTag = async (
  req: GetQuestionsByTag,
  res: any
): Promise<boolean> => {
  const {
    body: { tag },
  } = req;
  const responseItems = await getItemsFromQuestionTable();
  const questions: Question[] = [];
  responseItems.Items?.forEach((item) => {
    // @ts-ignore
    if (item && item.tgs && item.tgs.length) {
      // @ts-ignore
      if (item.tgs.includes(tag)) {
        const question: Question = {
          // @ts-ignore
          id: item.id,
          // @ts-ignore
          stem: item.t,
          // @ts-ignore
          description: item.d,
          // @ts-ignore
          votes: item.vt,
          // @ts-ignore
          comments: item.c,
          // @ts-ignore
          tags: item.tgs,
        };
        questions.push(question);
      }
    }
  });
  if (res && questions && questions.length) {
    res.send(questions);
  } else if (res) {
    res.send(`No Questions Exist for this tag - ${tag}`);
  }
  return true;
};

export type { Question };

export {
  createQuestion,
  viewUnAnsweredQuestions,
  addQuestionTags,
  getQuestionsByTag,
};
