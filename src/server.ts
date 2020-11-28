import http from 'http';
import nconf from 'nconf';
import express from 'express';
import cookieParser from 'cookie-parser';
import attachRoutes from './server/routes';
import * as middleware from './server/middlewares';

nconf.argv().env().file({
  file: `${process.cwd()}/config.json`
});

const app = express(),
  env = nconf.get('env') || 'development',
  host = nconf.get('host') || 'localhost',
  protocol = nconf.get('protocol') || 'http',
  port = process.env.PORT || nconf.get('port');

// attaching middlewares
app.use(cookieParser());
app.use([middleware.rawBodyParser, middleware.encodedBodyParser, middleware.jsonBodyParser]);

// attaching routes
attachRoutes(app);

// error handling
app.use(middleware.errorHandler);

//create http server
const httpServer= http.createServer(app);

// start server
httpServer.listen(port, function() {
  console.info(`Server Config: ${env}`);
  console.info(`Server Port: ${port}`);
  console.info(`Server URL: ${protocol}://${host}:${port}`);
});
httpServer.timeout = 900000;