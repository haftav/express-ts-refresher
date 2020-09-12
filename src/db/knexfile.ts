import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

// const {DB_DATABASE, DB_PORT, DB_HOST} = process.env;

const knexConfig = {
  development: {
    client: 'pg',
    connection: 'postgres://@localhost:5432/babylon_api',
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  test: {
    client: 'pg',
    connection: 'postgres://@localhost:5432/babylon_api_test',
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
};

export const {development} = knexConfig;
