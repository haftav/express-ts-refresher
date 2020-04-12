import dotenv from 'dotenv';
import express from 'express';
import Knex from 'knex';
import {Model} from 'objection';

import {routes} from './routes';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const knex = Knex({
  client: 'pg',
  connection: isProd ? process.env.DATABASE_URL : connectionString,
});

Model.knex(knex);

const app = express();

app.set('port', process.env.PORT || 3030);

app.use(routes());

export default app;
