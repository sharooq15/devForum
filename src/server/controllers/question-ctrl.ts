/* NOTE: All the Changes required for the question flow to work will be here i.e
- Create a Question
- Listing the Question
- Marking the correct answer for the questions
- Creating the question comment
*/
import { 
  generateUUID,
  docClient,
} from '../../api-utils';
import { 
  tableNames 
} from '../../common';

type CreateQuestionRequest = {
  body: {
    stem: string,
    description: string,
    ownerId: string,
  }
}

type QuestionDetails = {
  id: string,
  stem: string,
  description: string,
  ownerId: string,
}

type Question = {
  id: string,
  stem: string,
  description: string,
  votes: number,
  comments: string[],
}

type AddTagRequest = {
  body: {
    questionId: string,
    tags: string[]
  }
}

const createQuestion = async (
  req: CreateQuestionRequest, 
  res: any
): Promise<boolean> => {
  const {
    body: {
      stem,
      description,
      ownerId,
    }
  } = req;
  const response: QuestionDetails = {
    id: generateUUID(),
    stem,
    description,
    ownerId,
  }
  try{
    const input = {
      "id": response.id,
      "t": stem,
      "d": description,
      "uId": ownerId,
      /* NOTE: I'm making the answered status of the question false by default as no questions can be answerd during its creation.
      and comments to empty array followed by votes to 0
      */
      "anS": false,
      "c": [],
      "vt": 0
    };
    const params = {
      TableName: tableNames.QUESTION,
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

const addQuestionTags = (
  req:AddTagRequest, 
  res:any
) => {
  const {
    body: {
      questionId,
      tags
    }
  } = req;
  res.send(`Successfully added question tags for ${questionId}`);
}

const viewUnAnsweredQuestions = async(
  req:any, 
  res: any
): Promise<boolean> => {
  try {
    const params = {
      TableName: tableNames.QUESTION,
      FilterExpression: "anS = :anS",
      ExpressionAttributeValues: {
        ":anS": false
      }
    };
    const responseItems = await docClient.scan(params).promise();
    const questions: Question[] | undefined = responseItems.Items?.map((item) =>{
      const question: Question = {
        id: item.id,
        stem: item.t,
        description: item.d,
        votes: item.vt,
        comments: item.c,
      }
      return question;
    })
    if(res && questions && questions.length) {
      res.send(questions);
    } else if(res){
      res.send('All the questions are answered');
    }
  }catch(e){
    console.log('Error Getting Question', e);
  }
  return true;
}

export{
  createQuestion,
  viewUnAnsweredQuestions,
  addQuestionTags
}