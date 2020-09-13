import Knex from 'knex';

import * as knexConfig from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const knex = Knex((knexConfig as {[key: string]: any})[environment]);

export default knex;
