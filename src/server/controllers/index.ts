import { isAlive, notFound } from './app-ctrl'

import {
  createQuestion,
  addQuestionTags,
  viewUnAnsweredQuestions,
  getQuestionsByTag,
} from './question-ctrl';

import type { UserCreationRequest, UserDetails } from './user-ctrl'

import { signup } from './user-ctrl'

import { createComment } from './comment-ctrl'

import { castVote } from './vote-ctrl'

import {
  writeAnswer,
  markAnswerAsCorrect,
  viewExistingAnswers,
} from './answer-ctrl'

import { search } from './search-ctrl'

export type { UserCreationRequest, UserDetails }

export {
  castVote,
  createComment,
  isAlive,
  notFound,
  signup,
  createQuestion,
  addQuestionTags,
  writeAnswer,
  markAnswerAsCorrect,
  viewUnAnsweredQuestions,
  viewExistingAnswers,
  search,
  getQuestionsByTag,
};
