const {DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const knexConfig = {
  development: {
    client: 'pg',
    connection: {user: DB_USER, password: DB_PASSWORD, database: DB_DATABASE},
  },
};

export const {development} = knexConfig;
