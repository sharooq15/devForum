/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Router as routerFactory } from 'express';
import { routerPaths } from '../../common';
import {
  isAlive,
  notFound,
  signup,
  createQuestion,
  addQuestionTags,
  createComment,
  castVote,
  writeAnswer,
  markAnswerAsCorrect,
  viewUnAnsweredQuestions,
  viewExistingAnswers,
  search,
  getQuestionsByTag,
} from '../controllers';

const router = routerFactory();

router.route(routerPaths['isAlive']).post(isAlive);

router.route(routerPaths['notFound']).post(notFound);

router.route(routerPaths['signup']).post(signup);

router.route(routerPaths['createQuestion']).post(createQuestion);

router.route(routerPaths['addQuestionTags']).post(addQuestionTags);

router.route(routerPaths['createComment']).post(createComment);

router.route(routerPaths['castVote']).post(castVote);

router.route(routerPaths['writeAnswer']).post(writeAnswer);

router.route(routerPaths['markAnswerAsCorrect']).post(markAnswerAsCorrect);

router
  .route(routerPaths['viewUnAnsweredQuestions'])
  .get(viewUnAnsweredQuestions);

router.route(routerPaths['viewExistingAnswers']).get(viewExistingAnswers);

router.route(routerPaths['search']).get(search);

router.route(routerPaths['getQuestionsByTag']).get(getQuestionsByTag);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const attachRoutes = (app: any) => {
  app.use(router);
};

export default attachRoutes;
