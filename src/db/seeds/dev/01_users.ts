import {eachSeries} from 'async';
import bcrypt from 'bcrypt';
import * as Knex from 'knex';

import users from '../../data/users';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  await eachSeries(users, async (user, callback) => {
    const {username, password} = user;
    const hashedpassword = await bcrypt.hash(password, 10);

    await knex('users').insert({
      username,
      hashedpassword,
    });

    callback();
  });
}
