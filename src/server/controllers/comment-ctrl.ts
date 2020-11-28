/*
Comment changes will be here
- Creating comments that are related to question and answers will be done here
*/

import { 
  generateUUID
} from '../../api-utils';

import type {
  QuestionOrAnswer
} from '../../common'

type CreateCommentRequest = {
  body: {
    comment: string,
    commentFor: QuestionOrAnswer,
  }
}

const createComment = (req:CreateCommentRequest, res:any) => {
  const {
    body:{
      comment,
      commentFor,
    }
  } = req;
  // TODO: Based on commentFor we can change the comments to either question or answer
}

export {
  createComment
}