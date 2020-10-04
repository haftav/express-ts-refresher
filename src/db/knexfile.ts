const DB_HOST = process.env.DB_HOST || 'localhost';
const {DB_CONNECTION_STRING} = process.env;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const knexConfig: {[key: string]: any} = {
  development: {
    client: 'pg',
    connection: `postgres://${DB_HOST}:5432/babylon_api`,
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/dev',
    },
  },
  test: {
    client: 'pg',
    connection: `postgres://${DB_HOST}:5432/babylon_api_test`,
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/test',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: DB_CONNECTION_STRING,
      ssl: {
        ssl: true,
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/prod',
    },
  },
};

export const {development, test, production} = knexConfig;
