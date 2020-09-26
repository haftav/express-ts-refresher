import 'express-async-errors';

import cookieParser from 'cookie-parser';
import express, {ErrorRequestHandler, NextFunction, Request, Response} from 'express';
// import Knex from 'knex';
import morgan from 'morgan';
import {Model} from 'objection';

import knex from './db/knex';
import {routes} from './routes/v1';
import {HttpError, NotFoundError} from './utils/httpError';
import {createErrorResponse} from './utils/httpResponse';

// initialize Objection models
Model.knex(knex);

const app = express();

// properties
app.set('port', process.env.PORT || 3030);

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  // TODO: Update allowed origins
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// routes
app.use('/api', routes());

// not found handler
app.use((req, res, next) => {
  next(new NotFoundError());
});

// error handling
app.use(((err: HttpError | Error, req, res) => {
  console.error('ERROR:', err.message);
  console.error('STACK:', err.stack);

  const statusCode: number = err instanceof HttpError ? err.statusCode : 500;

  res.status(statusCode).json(createErrorResponse(err, statusCode)); // All HTTP requests must have a response, so let's send back an error with its status code and message
}) as ErrorRequestHandler);

export default app;
