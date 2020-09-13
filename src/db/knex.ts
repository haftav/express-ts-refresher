import Knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
import * as knexConfig from '../../knexfile';
const knex = Knex((knexConfig as {[key: string]: any})[environment]);

export default knex;
