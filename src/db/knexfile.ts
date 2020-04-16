import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

const {DB_DATABASE, DB_PORT, DB_HOST} = process.env;

const knexConfig = {
  development: {
    client: 'pg',
    connection: `postgres://@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
};

export const {development} = knexConfig;
