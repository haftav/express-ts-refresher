import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response, response} from 'express';
import Knex from 'knex';
import morgan from 'morgan';
import {Model} from 'objection';

import {routes} from './routes/v1';

const isProd = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const knex = Knex({
  client: 'pg',
  connection: isProd ? process.env.DATABASE_URL : connectionString,
});

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
