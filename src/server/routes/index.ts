/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Router as routerFactory } from 'express';
import { 
  isAlive,
  notFound,
  signup,
  createQuestion,
  addQuestionTags,
  createComment,
  castVote
} from '../controllers';

const router = routerFactory();

router.route('/api/isAlive')
  .post(isAlive);

router.route('/api/notFound')
  .post(notFound);

router.route('/api/signup')
  .post(signup);

router.route('/api/createQuestion')
  .post(createQuestion);

router.route('/api/addQuestionTags')
  .post(addQuestionTags);

router.route('/api/comment')
  .post(createComment);

router.route('/api/vote')
  .post(castVote);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const  attachRoutes = (app: any) => {
  app.use(router);
}

export default attachRoutes;