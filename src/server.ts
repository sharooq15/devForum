import http from 'http';
import nconf from 'nconf';
import express from 'express';
import cookieParser from 'cookie-parser';
import attachRoutes from './server/routes';
import * as middleware from './server/middlewares';
import { routerPaths } from './common';

nconf
  .argv()
  .env()
  .file({
    file: `${process.cwd()}/config.json`,
  });

const app = express(),
  env = nconf.get('env') || 'development',
  host = nconf.get('host') || 'localhost',
  protocol = nconf.get('protocol') || 'http',
  port = process.env.PORT || nconf.get('port');

// attaching middlewares
app.use(cookieParser());
app.use([
  middleware.rawBodyParser,
  middleware.encodedBodyParser,
  middleware.jsonBodyParser,
]);

// attaching routes
attachRoutes(app);

// error handling
app.use(middleware.errorHandler);

//create http server
const httpServer = http.createServer(app);

// start server
httpServer.listen(port, function () {
  console.info(`Server Config: ${env}`);
  console.info(`Server Port: ${port}`);
  console.info(
    `To Signup: ${protocol}://${host}:${port}${routerPaths['signup']}`
  );
  console.info(
    `Create Question: ${protocol}://${host}:${port}${routerPaths['createQuestion']}`
  );
  console.info(
    `Create Comment: ${protocol}://${host}:${port}${routerPaths['createComment']}`
  );
  console.info(
    `Cast Vote: ${protocol}://${host}:${port}${routerPaths['castVote']}`
  );
  console.info(
    `Write Answer: ${protocol}://${host}:${port}${routerPaths['writeAnswer']}`
  );
  console.info(
    `Mark Answer As Correct: ${protocol}://${host}:${port}${routerPaths['markAnswerAsCorrect']}`
  );
  console.info(
    `View Unanswered Question: ${protocol}://${host}:${port}${routerPaths['viewUnAnsweredQuestions']}`
  );
  console.info(
    `View Existing Answers: ${protocol}://${host}:${port}${routerPaths['viewExistingAnswers']}`
  );
  console.info(
    `View Questions by Tags: ${protocol}://${host}:${port}${routerPaths['getQuestionsByTag']}`
  );
});
httpServer.timeout = 900000;
