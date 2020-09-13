import Knex from 'knex';

import * as knexConfig from './knexfile';

const knex = Knex((knexConfig as {[key: string]: any})[process.env.NODE_ENV]);

beforeEach(async (done) => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
  done();
});

afterAll(async (done) => {
  await knex.migrate.rollback();
  await knex.destroy();
  done();
});
