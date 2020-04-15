import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response, response} from 'express';
import Knex from 'knex';
import morgan from 'morgan';
import {Model} from 'objection';

import {development} from './db/knexfile';
import {routes} from './routes/v1';

// will need to update when going to prod
const knex = Knex(development);

Model.knex(knex);

const app = express();

// properties
app.set('port', process.env.PORT || 3030);

// middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    return response.status(200).json({});
  }
  next();
});

// routes
app.use('/api', routes());

export default app;
