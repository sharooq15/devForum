/* NOTE: All the Changes required for the question flow to work will be here i.e
- Create a Question
- Listing the Question
- Marking the correct answer for the questions
- Creating the question comment
*/
import { 
  generateUUID
} from '../../api-utils';

type CreateQuestionRequest = {
  body: {
    stem: string,
    description: string,
    ownerId: string,
    tags?: string[],
    votes?: number,
  }
}

type QuestionDetails = {
  id: string,
  stem: string,
  description: string,
  ownerId: string,
  tags?: string[],
  votes?: number,
}

type AddTagRequest = {
  body: {
    questionId: string,
    tags: string[]
  }
}

const createQuestion = (
  req: CreateQuestionRequest, 
  res: any
): void => {
  const {
    body: {
      stem,
      description,
      ownerId,
      tags,
      votes,
    }
  } = req;
  console.log(req,'req');
  const response: QuestionDetails = {
    id: generateUUID(),
    stem,
    description,
    ownerId,
    tags,
    votes,
  }
  res.send(response);
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

export{
  createQuestion,
  addQuestionTags
}