// const {DB_DATABASE, DB_PORT, DB_HOST} = process.env;

const knexConfig: {[key: string]: any} = {
  development: {
    client: 'pg',
    connection: 'postgres://@localhost:5432/babylon_api',
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/dev',
    },
  },
  test: {
    client: 'pg',
    connection: 'postgres://@localhost:5432/babylon_api_test',
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/test',
    },
  },
};

export const {development, test} = knexConfig;
