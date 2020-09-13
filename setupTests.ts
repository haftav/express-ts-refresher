import Knex from 'knex';

import knex from './src/db/knex';

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
